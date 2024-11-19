// MoveCanvas.tsx
import IconUp from "./assets/icons/up.png"
import IconDown from "./assets/icons/down.png"
import './index.css'
interface MoveCanvasProps {
    canvasId: number;
    canvases: number[];
    setCanvases: React.Dispatch<React.SetStateAction<number[]>>;
}

const MoveCanvas: React.FC<MoveCanvasProps> = ({ canvasId, canvases, setCanvases }) => {
    const moveCanvasUp = () => {
        setCanvases((prev) => {
            const index = prev.indexOf(canvasId);
            if (index > 0) {
                const newCanvases = [...prev];
                [newCanvases[index], newCanvases[index - 1]] = [newCanvases[index - 1], newCanvases[index]];
                return newCanvases;
            }
            return prev;
        });
    };

    const moveCanvasDown = () => {
        setCanvases((prev) => {
            const index = prev.indexOf(canvasId);
            if (index < prev.length - 1) {
                const newCanvases = [...prev];
                [newCanvases[index], newCanvases[index + 1]] = [newCanvases[index + 1], newCanvases[index]];
                return newCanvases;
            }
            return prev;
        });
    };

    return (
        <div className="move-canvas">
            <button onClick={moveCanvasUp} disabled={canvases.indexOf(canvasId) === 0}> <img src={IconUp} /></button>
            <button onClick={moveCanvasDown} disabled={canvases.indexOf(canvasId) === canvases.length - 1}> <img src={IconDown} /> </button>
        </div>
    );
};

export default MoveCanvas;
