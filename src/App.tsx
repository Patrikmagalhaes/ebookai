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
import Square from "./shapes/Square";
import DeleteButton from "./DeleteElement";
import AddImageButton from "./AddImage";

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
            <div className="add-delete">
              <AddCanvas
                setCanvases={setCanvases}
                canvases={canvases}
                setCanvasInstances={setCanvasInstances}
                setActiveCanvasId={setActiveCanvasId}
              />

              {activeCanvasId !== null && (
                <DeleteButton
                  canvasInstance={canvasInstances[activeCanvasId]}
                  activeObject={activeObject}
                  setActiveObject={setActiveObject}
                />
              )}
            </div>
            <div className="shapes">
              <span>Formas</span>
              <div className="shapes-content">
                <CircleComponent
                  activeCanvasId={activeCanvasId}
                  canvasInstances={canvasInstances}
                  options={{ top: 100, left: 100, radius: 50, fill: "#007AFF" }}
                />
                <Rectangle
                  activeCanvasId={activeCanvasId}
                  canvasInstances={canvasInstances}
                  options={{
                    top: 50,
                    left: 50,
                    width: 150,
                    height: 100
                  }}

                />
                <Square activeCanvasId={activeCanvasId}
                  canvasInstances={canvasInstances}
                  options={{
                    top: 50,
                    left: 50,
                    width: 100,
                    height: 100,
                    fill: "#FF3B30",
                  }} />
              </div>
            </div>
            <div>
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
            <AddImageButton
              activeCanvasId={activeCanvasId} // Passando activeCanvasId
              canvasInstances={canvasInstances}
            />
          </div>

          <div className="container-canvas" ref={canvasContainerRef}>
            {canvases.map((canvasId) => (
              <>
                <div
                  className="border-canvas"
                  key={canvasId}
                  onClick={() => setActiveCanvasId(canvasId)}
                  style={{
                    cursor: "pointer",
                    boxShadow: activeCanvasId === canvasId ? "1px -1px 27px 16px rgba(88,74,143,0.78)" : "none",
                    WebkitBoxShadow: activeCanvasId === canvasId ? "1px -1px 27px 16px rgba(88,74,143,0.78)" : "none",
                    margin: "0px", padding: "0px"
                  }}
                >

                  <canvas id={`canvas-${canvasId}`}></canvas>

                </div>
                <div className="canvas-settings">
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
              </>
            ))}
          </div>

          <div className="sidebar-right">
            <span>Texto</span>
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

      </div>
    </>
  );
}

export default App;
