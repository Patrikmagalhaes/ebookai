import React, { useEffect, useState } from "react";
import { Object as FabricObject } from "fabric/fabric-impl";

interface CircleSettingsProps {
  activeObject: FabricObject;
  setActiveObject: React.Dispatch<React.SetStateAction<FabricObject | null>>;
  canvas: any;
}

const CircleSettings: React.FC<CircleSettingsProps> = ({
  activeObject,
  setActiveObject,
  canvas,
}) => {
  const [diameter, setDiameter] = useState<number>(0);
  const [color, setColor] = useState<string>("");

  // Atualiza os inputs com as propriedades do objeto selecionado
  useEffect(() => {
    if (activeObject && activeObject.type === "circle") {
      setDiameter((activeObject.width! || 0) * activeObject.scaleX!);
      setColor(activeObject.fill as string);
    }
  }, [activeObject]);

  // Atualiza o objeto quando as propriedades mudam nos inputs
  const handleDiameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDiameter = parseFloat(e.target.value);
    setDiameter(newDiameter);
    activeObject.scaleToWidth(newDiameter); // Mantém proporção para altura
    activeObject.scaleToHeight(newDiameter);
    canvas.renderAll();
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    activeObject.set("fill", newColor);
    canvas.renderAll();
  };

  return (
    <div className="circle-settings">
      <h3>Settings for Selected Circle</h3>
      <label>
        Diameter:
        <input type="number" value={diameter} onChange={handleDiameterChange} />
      </label>
      <label>
        Color:
        <input type="color" value={color} onChange={handleColorChange} />
      </label>
    </div>
  );
};

export default CircleSettings;