import { Rect } from 'fabric';

interface RectangleProps {
    activeCanvasId: number | null;
    canvasInstances: any[];
    options: {
        top?: number;
        left?: number;
        width?: number;
        height?: number;
        fill?: string;
    };
}

const Rectangle: React.FC<RectangleProps> = ({ activeCanvasId, canvasInstances, options }) => {

    const addRectangle = () => {
        if (activeCanvasId !== null && canvasInstances[activeCanvasId]) {
            const canvas = canvasInstances[activeCanvasId];
            const rect = new Rect({
                top: options.top || 100,
                left: options.left || 50,
                width: options.width || 100,
                height: options.height || 100,
                fill: options.fill || "#D84D42",
            });
            canvas.add(rect);
            canvas.renderAll();
        }
    }

    return (
        <>
            <button onClick={addRectangle}>Retangulo</button>
        </>
    )
};

export default Rectangle;

