interface AddCanvasProps {
    canvases: number[];
    setCanvases: React.Dispatch<React.SetStateAction<number[]>>;
    setCanvasInstances: React.Dispatch<React.SetStateAction<any[]>>;
    setActiveCanvasId: React.Dispatch<React.SetStateAction<number | null>>;
}

const AddCanvas: React.FC<AddCanvasProps> = ({ canvases, setCanvases, setCanvasInstances, setActiveCanvasId }) => {
    const addNewCanvas = () => {
        const newCanvasId = canvases.length; // Calcula o novo ID do canvas
        setCanvases((prev) => [...prev, newCanvasId]);
        setCanvasInstances((prev) => [...prev, null]);
        setActiveCanvasId(newCanvasId); // Define o novo canvas como ativo
    };

    return (
        <button onClick={addNewCanvas}>Novo</button>
    );
};

export default AddCanvas;