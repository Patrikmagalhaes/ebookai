/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Canvas } from "fabric";
import CircleComponent from "./shapes/Circle";
import Rectangle from "./shapes/Rectangle";
import AddCanvas from "./AddCanvas";
import MoveCanvas from "./MoveCanvas";
import DeleteCanvas from "./DeleteCanvas";
import Settings from "./Toolbar";
import CircleSettings from "./CircleSettings";
import AddTextButton from "./TextComponent";
import TextEditorToolbar from "./TextEditorToolbar";

function App() {
  const canvasContainerRef = useRef(null);
  const [canvases, setCanvases] = useState<number[]>([]);
  const [canvasInstances, setCanvasInstances] = useState<any[]>([]);
  const [activeCanvasId, setActiveCanvasId] = useState<number | null>(null);
  const [activeObject, setActiveObject] = useState<any>(null); // Objeto ativo

  useEffect(() => {
    canvases.forEach((canvasId: number) => {
      const canvasElement: HTMLElement | any = document.getElementById(
        `canvas-${canvasId}`
      ) as HTMLElement;
      if (canvasElement && !canvasInstances[canvasId]) {
        const newCanvas = new Canvas(canvasElement, {
          width: 500,
          height: 800,
          backgroundColor: "pink",
        });
        newCanvas.renderAll();
        const updatedInstances = [...canvasInstances];
        updatedInstances[canvasId] = newCanvas;
        setCanvasInstances(updatedInstances);

        // Ouve seleção de objetos
        newCanvas.on("selection:created", (event) =>
          setActiveObject(event.selected[0])
        );
        newCanvas.on("selection:updated", (event) =>
          setActiveObject(event.selected[0])
        );
        newCanvas.on("selection:cleared", () => setActiveObject(null));

        console.log("Canvas created for ID:", canvasId);
      }
    });
  }, [canvases]);

  return (
    <>
      <div className="app">
        <div className="header">
          <h1>Header</h1>
        </div>
        <div className="container">
          <div className="sidebar-left">
            <div>
              <AddCanvas
                setCanvases={setCanvases}
                canvases={canvases}
                setCanvasInstances={setCanvasInstances}
                setActiveCanvasId={setActiveCanvasId}
              />
              <CircleComponent
                activeCanvasId={activeCanvasId}
                canvasInstances={canvasInstances}
                options={{ top: 100, left: 100, radius: 50, fill: "#42D84D" }}
              />
              <Rectangle
                activeCanvasId={activeCanvasId}
                canvasInstances={canvasInstances}
                options={{
                  top: 50,
                  left: 50,
                  width: 100,
                  height: 100,
                  fill: "#D84D42",
                }}
              />
            </div>
          </div>

          <div className="container-canvas" ref={canvasContainerRef}>
            {canvases.map((canvasId) => (
              <div
                className="border-canvas"
                key={canvasId}
                onClick={() => setActiveCanvasId(canvasId)}
                style={{
                  cursor: "pointer",
                  borderBottom:
                    activeCanvasId === canvasId ? "1px solid red" : "none",
                  borderLeft:
                    activeCanvasId === canvasId ? "1px solid red" : "none",
                }}
              >
                <canvas id={`canvas-${canvasId}`}></canvas>
                <MoveCanvas
                  canvasId={canvasId}
                  canvases={canvases}
                  setCanvases={setCanvases}
                />
                <DeleteCanvas
                  canvasId={canvasId}
                  canvases={canvases}
                  setCanvases={setCanvases}
                  canvasInstances={canvasInstances}
                  setCanvasInstances={setCanvasInstances}
                />
              </div>
            ))}
          </div>

          <div className="sidebar-right">
            <AddTextButton
              activeCanvasId={activeCanvasId}
              canvasInstances={canvasInstances}
            />
            <TextEditorToolbar
              activeObject={activeObject}
              canvas={canvasInstances[activeCanvasId as number]}
            />
          </div>
        </div>
        {/* Componente de configurações para objetos ativos */}
        {activeObject &&
          (activeObject.type === "circle" ? (
            <CircleSettings
              activeObject={activeObject}
              setActiveObject={setActiveObject}
              canvas={canvasInstances[activeCanvasId as number]}
            />
          ) : (
            <Settings
              activeObject={activeObject}
              setActiveObject={setActiveObject}
              canvas={canvasInstances[activeCanvasId as number]}
            />
          ))}
      </div>
    </>
  );
}

export default App;
