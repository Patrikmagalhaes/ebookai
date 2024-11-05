// MoveCanvas.tsx
import React from 'react';

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
        <div>
            <button onClick={moveCanvasUp} disabled={canvases.indexOf(canvasId) === 0}>↑</button>
            <button onClick={moveCanvasDown} disabled={canvases.indexOf(canvasId) === canvases.length - 1}>↓</button>
        </div>
    );
};

export default MoveCanvas;
