import IconDelete from "./assets/icons/delete.svg"
import './DeleteElement.css'
interface DeleteButtonProps {
    canvasInstance: any;
    activeObject: any;
    setActiveObject: React.Dispatch<React.SetStateAction<any>>;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ canvasInstance, activeObject, setActiveObject }) => {
    // Função para apagar o objeto selecionado
    const deleteSelectedObject = () => {
        if (activeObject) {
            canvasInstance.remove(activeObject); // Remove o objeto ativo do canvas
            setActiveObject(null); // Limpa o estado do objeto ativo
        } else {
            alert("Nenhum objeto selecionado para apagar.");
        }
    };

    return <button className="delete-element" onClick={deleteSelectedObject}> <span>Excluir elemento</span><img src={IconDelete} alt="" /></button>;
};

export default DeleteButton;
