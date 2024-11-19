import IconDelete from "./assets/icons/delete.svg"

interface DeleteCanvasProps {
    canvasId: number;
    canvases: number[];
    setCanvases: React.Dispatch<React.SetStateAction<number[]>>;
    canvasInstances: any[];
    setCanvasInstances: React.Dispatch<React.SetStateAction<any[]>>;
}

const DeleteCanvas: React.FC<DeleteCanvasProps> = ({
    canvasId,
    canvases,
    setCanvases,
    canvasInstances,
    setCanvasInstances,
}) => {
    const handleDelete = () => {
        // Verifica se a instância do canvas existe
        const canvasInstance = canvasInstances[canvasId];
        if (canvasInstance) {
            canvasInstance.dispose(); // Destrói a instância do canvas
        }

        // Atualiza as canvases removendo o canvasId
        const updatedCanvases = canvases.filter(id => id !== canvasId);
        setCanvases(updatedCanvases);

        // Atualiza as instâncias, definindo o índice para null
        setCanvasInstances(prevInstances => {
            const updatedInstances = [...prevInstances];
            updatedInstances[canvasId] = null; // Define como null ao invés de remover
            return updatedInstances;
        });

        console.log('Deleting canvas ID:', canvasId);
        console.log('Updated Canvases:', updatedCanvases);
        console.log('Updated Canvas Instances:', canvasInstances);
    };

    return (
        <button className="delete-canvas" onClick={handleDelete}>
       <img src={IconDelete} alt="" />
        </button>
    );
};

export default DeleteCanvas;
