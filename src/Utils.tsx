// canvasUtils.ts
import { Rect, Circle } from 'fabric';

// Define a interface para as opções de um retângulo
interface RectangleOptions {
    top?: number;
    left?: number;
    width?: number;
    height?: number;
    fill?: string;
}

// Define a interface para as opções de um círculo
interface CircleOptions {
    top?: number;
    left?: number;
    radius?: number;
    fill?: string;
}

// Atualiza a função para adicionar um retângulo
export const addRectangle = (canvas: any | null, options: RectangleOptions = {}) => {
    if (canvas) {
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
};

// Atualiza a função para adicionar um círculo
export const addCircle = (canvas: any | null, options: CircleOptions = {}) => {
    if (canvas) {
        const circle = new Circle({
            top: options.top || 100,
            left: options.left || 50,
            radius: options.radius || 50,
            fill: options.fill || "#42D84D",
        });
        canvas.add(circle);
        canvas.renderAll();
    }
};
