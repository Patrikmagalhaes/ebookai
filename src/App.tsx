import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Canvas } from 'fabric';
import CircleComponent from './shapes/Circle';
import Rectangle from './shapes/Rectangle';
import AddCanvas from './AddCanvas';
import MoveCanvas from './MoveCanvas';
import DeleteCanvas from './DeleteCanvas';
import Toolbar from './Toolbar';

function App() {
  const canvasContainerRef = useRef(null);
  const [canvases, setCanvases] = useState<number[]>([]);
  const [canvasInstances, setCanvasInstances] = useState<any[]>([]);
  const [activeCanvasId, setActiveCanvasId] = useState<number | null>(null);

  useEffect(() => {
    canvases.forEach((canvasId: number) => {
      const canvasElement: HTMLElement | any = document.getElementById(`canvas-${canvasId}`) as HTMLElement;
      if (canvasElement && !canvasInstances[canvasId]) {
        const newCanvas = new Canvas(canvasElement, { width: 500, height: 800, backgroundColor: "pink" });
        newCanvas.renderAll();
        const updatedInstances = [...canvasInstances];
        updatedInstances[canvasId] = newCanvas;
        setCanvasInstances(updatedInstances);
        console.log('Canvas created for ID:', canvasId);
        console.log(updatedInstances)
      }
    });
  }, [canvases]);

  return (
    <>
      <div>
        <AddCanvas
          setCanvases={setCanvases}
          canvases={canvases}
          setCanvasInstances={setCanvasInstances}
          setActiveCanvasId={setActiveCanvasId}
        />
        <CircleComponent activeCanvasId={activeCanvasId} canvasInstances={canvasInstances} options={{ top: 100, left: 100, radius: 50, fill: "#42D84D" }} />
        <Rectangle activeCanvasId={activeCanvasId} canvasInstances={canvasInstances} options={{ top: 50, left: 50, width: 100, height: 100, fill: "#D84D42" }} />
      </div>
      <div className='container-canvas' ref={canvasContainerRef}>
        {canvases.map((canvasId) => (
          <div className='border-canvas' key={canvasId} onClick={() => setActiveCanvasId(canvasId)}
            style={{
              cursor: 'pointer',
              borderBottom: activeCanvasId === canvasId ? '1px solid red' : 'none',
              borderLeft: activeCanvasId === canvasId ? '1px solid red' : 'none'
            }}>
            <canvas id={`canvas-${canvasId}`}></canvas>
            <MoveCanvas canvasId={canvasId} canvases={canvases} setCanvases={setCanvases} />
            <DeleteCanvas
              canvasId={canvasId}
              canvases={canvases}
              setCanvases={setCanvases}
              canvasInstances={canvasInstances}
              setCanvasInstances={setCanvasInstances}
            />
            <Toolbar activeCanvasId={activeCanvasId} canvasInstances={canvasInstances} />
          </div>
        ))}
      </div>
    </>
  );

}

export default App;
