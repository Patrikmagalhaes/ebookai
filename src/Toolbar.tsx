import React, { useEffect, useState } from 'react';
import { Object as FabricObject } from 'fabric/fabric-impl';
import './RectangleSettings.css'

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
    <>
      <div className="settings">
        <h3>Settings for Selected Object</h3>
        <div className='div-input'>
          <label>
            Largura:
          </label>
          <input type="number" value={width.toFixed(0)} onChange={handleWidthChange} />
        </div>

        <div className='div-input'>
          <label>
            Altura
          </label>
          <input type="number" value={height.toFixed(0)} onChange={handleHeightChange} />
        </div>
        <div  className='div-input'>
          <label>
            Cor:

          </label>
          <input type="color" value={color} onChange={handleColorChange} />
        </div>
      </div>
    </>
  );
};

export default Settings;
