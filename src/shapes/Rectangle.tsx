import { Rect } from 'fabric';
import IconRec from ".././assets/icons/rectangle.png"
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

const Rectangle: React.FC<RectangleProps> = ({ activeCanvasId, canvasInstances, options }) => {

    const addRectangle = () => {
        if (activeCanvasId !== null && canvasInstances[activeCanvasId]) {
            const canvas = canvasInstances[activeCanvasId];
            const rect = new Rect({
                top: options.top || 100,
                left: options.left || 50,
                width: options.width || 100,
                height: options.height || 100,
                fill: options.fill || "#5856D6",
            });
            canvas.add(rect);
            canvas.renderAll();
        }
    }

    return (
        <>
            <button className='icon' onClick={addRectangle}><img src={IconRec} alt="" /></button>
        </>
    )
};

export default Rectangle;

