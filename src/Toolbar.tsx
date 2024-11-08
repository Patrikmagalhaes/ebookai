import React, { useEffect, useState } from 'react';
import { Object as FabricObject } from 'fabric/fabric-impl';


interface SettingsProps {
  activeObject: FabricObject;
  setActiveObject: React.Dispatch<React.SetStateAction<FabricObject | null>>;
  canvas: any;
}

const Settings: React.FC<SettingsProps> = ({ activeObject, setActiveObject, canvas }) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [color, setColor] = useState<string>("");

  // Atualiza os inputs com as propriedades do objeto selecionado
  useEffect(() => {
    if (activeObject) {
      setWidth(activeObject.width! * activeObject.scaleX!);
      setHeight(activeObject.height! * activeObject.scaleY!);
      setColor(activeObject.fill as string);
    }
  }, [activeObject]);

  // Atualiza o objeto quando as propriedades mudam nos inputs
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseFloat(e.target.value);
    setWidth(newWidth);
    activeObject.scaleToWidth(newWidth);
    canvas.renderAll();
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseFloat(e.target.value);
    setHeight(newHeight);
    activeObject.scaleToHeight(newHeight);
    canvas.renderAll();
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    activeObject.set('fill', newColor);
    canvas.renderAll();
  };

  return (
    <div className="settings">
      <h3>Settings for Selected Object</h3>
      <label>
        Width:
        <input type="number" value={width} onChange={handleWidthChange} />
      </label>
      <label>
        Height:
        <input type="number" value={height} onChange={handleHeightChange} />
      </label>
      <label>
        Color:
        <input type="color" value={color} onChange={handleColorChange} />
      </label>
    </div>
  );
};

export default Settings;
