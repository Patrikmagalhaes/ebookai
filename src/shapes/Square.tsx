import { Rect } from 'fabric';
import IconSquare from ".././assets/icons/square.png"
import './Shapes.css'

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

const Square: React.FC<RectangleProps> = ({ activeCanvasId, canvasInstances, options }) => {

    const addSquare = () => {
        if (activeCanvasId !== null && canvasInstances[activeCanvasId]) {
            const canvas = canvasInstances[activeCanvasId];
            const rect = new Rect({
                top: options.top || 100,
                left: options.left || 50,
                width: options.width || 100,
                height: options.height || 100,
                fill: options.fill || "red",
            });
            canvas.add(rect);
            canvas.renderAll();
        }
    }

    return (
        <>
            <button className='icon' onClick={addSquare}><img src={IconSquare} alt="" /></button>
        </>
    )
};

export default Square;

