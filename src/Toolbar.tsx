// Toolbar.tsx
import React, { useEffect, useState } from 'react';
import fabric from 'fabric';

interface ToolbarProps {
  activeCanvasId: number | null;
  canvasInstances: fabric.Canvas[];
}

const Toolbar: React.FC<ToolbarProps> = ({ activeCanvasId, canvasInstances }) => {
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [color, setColor] = useState<string>('#000000');
  const [diameter, setDiameter] = useState<number>(0);

  useEffect(() => {
    if (activeCanvasId !== null && canvasInstances[activeCanvasId]) {
      const canvas = canvasInstances[activeCanvasId];

      const handleObjectSelection = (object: fabric.Object | null) => {
        if (object) {
          setSelectedObject(object);
          if (object.type === 'circle') {
            const circle = object as fabric.Circle; // Type assertion
            setDiameter(circle.radius! * 2);
            setColor(circle.fill as string);
          } else if (object.type === 'rect') {
            const rect = object as fabric.Rect; // Type assertion
            setWidth(rect.width!);
            setHeight(rect.height!);
            setColor(rect.fill as string);
          }
        } else {
          clearSettings();
        }
      };

      const clearSettings = () => {
        setWidth(0);
        setHeight(0);
        setColor('#000000');
        setDiameter(0);
        setSelectedObject(null);
      };

      canvas.on('selection:created', (e: any) => handleObjectSelection(e.target));
      canvas.on('selection:updated', (e: any) => handleObjectSelection(e.target));
      canvas.on('selection:cleared', clearSettings);
      canvas.on('object:modified', (e: any) => handleObjectSelection(e.target));

      return () => {
        canvas.off('selection:created');
        canvas.off('selection:updated');
        canvas.off('selection:cleared');
        canvas.off('object:modified');
      };
    }
  }, [activeCanvasId, canvasInstances]);

  const updateWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = Number(e.target.value);
    setWidth(newWidth);
    if (selectedObject && selectedObject.type === 'rect') {
      (selectedObject as fabric.Rect).set({ width: newWidth });
      selectedObject.setCoords();
      canvasInstances[activeCanvasId!].renderAll();
    }
  };

  const updateHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = Number(e.target.value);
    setHeight(newHeight);
    if (selectedObject && selectedObject.type === 'rect') {
      (selectedObject as fabric.Rect).set({ height: newHeight });
      selectedObject.setCoords();
      canvasInstances[activeCanvasId!].renderAll();
    }
  };

  const updateColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    if (selectedObject) {
      selectedObject.set({ fill: newColor });
      selectedObject.setCoords();
      canvasInstances[activeCanvasId!].renderAll();
    }
  };

  const updateDiameter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDiameter = Number(e.target.value);
    setDiameter(newDiameter);
    if (selectedObject && selectedObject.type === 'circle') {
      (selectedObject as fabric.Circle).set({ radius: newDiameter / 2 });
      selectedObject.setCoords();
      canvasInstances[activeCanvasId!].renderAll();
    }
  };

  return (
    <div className="toolbar">
      {selectedObject ? (
        <>
          {selectedObject.type === 'circle' ? (
            <>
              <label>Diâmetro:</label>
              <input type="number" value={diameter} onChange={updateDiameter} />
            </>
          ) : (
            <>
              <label>Largura:</label>
              <input type="number" value={width} onChange={updateWidth} />
              <label>Altura:</label>
              <input type="number" value={height} onChange={updateHeight} />
            </>
          )}
          <label>Cor:</label>
          <input type="color" value={color} onChange={updateColor} />
        </>
      ) : (
        <p>Nenhum objeto selecionado</p>
      )}
    </div>
  );
};

export default Toolbar;
