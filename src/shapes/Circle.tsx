import { Circle } from 'fabric';

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
            <button onClick={addCircle}>Circulo</button>
        </>
    )
};

export default CircleComponent;