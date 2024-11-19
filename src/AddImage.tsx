import React, { useState } from 'react';
import * as fabric  from 'fabric';


interface AddImageButtonProps {
  activeCanvasId: number | null;
  canvasInstances: any[];
}

const AddImageButton: React.FC<AddImageButtonProps> = ({ activeCanvasId, canvasInstances }) => {
  const [imageUrl, setImageUrl] = useState(''); // Estado para armazenar a URL da imagem

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const handleAddImage = () => {
    if (activeCanvasId === null) {
      console.error('Canvas ativo não encontrado');
      return;
    }

    const canvas = canvasInstances[activeCanvasId];

    if (!canvas) {
      console.error('Canvas não encontrado');
      return;
    }

    if (!imageUrl) {
      alert('Por favor, insira uma URL de imagem válida.');
      return;
    }

    // A correção do uso do fromURL
    fabric.FabricImage.fromURL(imageUrl, (img: fabric.FabricImage) => {
      // Definir propriedades da imagem
      img.set({
        left: 100,  // Posição X
        top: 100,   // Posição Y
        scaleX: 0.5,  // Escala horizontal
        scaleY: 0.5,  // Escala vertical
      });

      // Adicionar imagem ao canvas
      canvas.add(img);
      canvas.renderAll();
    });
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Insira a URL da imagem" 
        value={imageUrl}
        onChange={handleInputChange}
      />
      <button onClick={handleAddImage}>Adicionar Imagem</button>
    </div>
  );
};

export default AddImageButton;
