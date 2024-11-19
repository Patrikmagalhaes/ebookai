import { Circle } from 'fabric';
import IconCircle from ".././assets/icons/circle.png"
import './Shapes.css'
interface CircleProps {
    activeCanvasId: number | null;
    canvasInstances: any[];
    options: {
        top?: number;
        left?: number;
        radius?: number;
        fill?: string;
    };
}

const CircleComponent: React.FC<CircleProps> = ({ activeCanvasId, canvasInstances, options }) => {
    const addCircle = () => {
        if (activeCanvasId !== null && canvasInstances[activeCanvasId]) {
            const canvas = canvasInstances[activeCanvasId];
            const circle = new Circle({
                top: options.top || 100,
                left: options.left || 50,
                radius: options.radius || 50,
                fill: options.fill || "#42D84D",
            });
            canvas.add(circle);
            canvas.renderAll();
        }
    }

    return (
        <>
            <button className='icon' onClick={addCircle}><img src={IconCircle} alt="" /></button>
        </>
    )
};

export default CircleComponent;