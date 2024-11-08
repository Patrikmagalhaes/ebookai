// AddTextButton.tsx
import React, { useState } from "react";
import * as fabric  from "fabric";

interface AddTextButtonProps {
  activeCanvasId: number | null;
  canvasInstances: any[];
}

const AddTextButton: React.FC<AddTextButtonProps> = ({
  activeCanvasId,
  canvasInstances,
}) => {
  const [textStyle, setTextStyle] = useState<"h1" | "h2" | "h3" | "p">("p");

  const handleAddText = () => {
    if (activeCanvasId !== null && canvasInstances[activeCanvasId]) {
      const canvas = canvasInstances[activeCanvasId];

      // Definindo estilos de acordo com o tipo de texto escolhido
      const styleOptions = {
        h1: { fontSize: 32, fontWeight: "bold" },
        h2: { fontSize: 28, fontWeight: "bold" },
        h3: { fontSize: 24, fontWeight: "bold" },
        p: { fontSize: 18, fontWeight: "normal" },
      };

      const { fontSize, fontWeight } = styleOptions[textStyle];

      const text = new fabric.Textbox("Texto de exemplo", {
        left: 100,
        top: 100,
        width: 200,
        fontSize,
        fontWeight,
        fill: "black",
      });

      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
    }
  };

  return (
    <div style={{ margin: "10px" }}>
      <select
        value={textStyle}
        onChange={(e) => setTextStyle(e.target.value as "h1" | "h2" | "h3" | "p")}
        style={{ marginRight: "10px" }}
      >
        <option value="h1">H1</option>
        <option value="h2">H2</option>
        <option value="h3">H3</option>
        <option value="p">Parágrafo</option>
      </select>
      <button onClick={handleAddText}>Adicionar Texto</button>
    </div>
  );
};

export default AddTextButton;
