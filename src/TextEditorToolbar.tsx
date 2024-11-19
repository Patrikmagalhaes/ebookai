// TextEditorToolbar.tsx
import React, { useState } from "react";
import * as fabric from "fabric";
import "./css/TextEditorToolbar.css";
import AlignLeft from "./assets/text/align-text-left.svg";
import AlignCenter from "./assets/text/align-text-center.svg";
import AlignRight from "./assets/text/align-text-right.svg";
import Bold from "./assets/text/text-bold.svg";
import Italic from "./assets/text/text-italic.svg";
import Underline from "./assets/text/text-underline.svg";
import List from "./assets/text/list.svg";
interface TextEditorToolbarProps {
  activeObject: fabric.Textbox | null;
  canvas: fabric.Canvas | null;
}

const TextEditorToolbar: React.FC<TextEditorToolbarProps> = ({
  activeObject,
  canvas,
}) => {
  const [fontSize, setFontSize] = useState<number>(18);
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [textColor, setTextColor] = useState<string>("#000000"); // Cor do texto
  const [backgroundColor, setBackgroundColor] = useState<string>("transparent"); // Cor de fundo do texto

  // Função para atualizar o estilo do texto ativo
  const updateTextStyle = (style: string, value: any) => {
    if (activeObject && canvas) {
      activeObject.set(style, value);
      canvas.renderAll();
    }
  };

  return (
    <div  style={{ display: "flex", flexDirection: "column" }}>
      <div className="text-style" >
        {/* Botão Negrito */}
        <button
          onClick={() =>
            updateTextStyle(
              "fontWeight",
              activeObject?.fontWeight === "bold" ? "normal" : "bold"
            )
          }
        >
          <img className="align-icon" src={Bold} />
        </button>

        {/* Botão Itálico */}
        <button
          onClick={() =>
            updateTextStyle(
              "fontStyle",
              activeObject?.fontStyle === "italic" ? "normal" : "italic"
            )
          }
        >
          <img className="align-icon" src={Italic} />
        </button>

        {/* Botão Sublinhado */}
        <button
          onClick={() => updateTextStyle("underline", !activeObject?.underline)}
        >
          <img className="align-icon" src={Underline} />
        </button>
      </div>

      <div  className="font-style" >
        {/* Seleção de Fonte */}
        <select
          value={fontFamily}
          onChange={(e) => {
            setFontFamily(e.target.value);
            updateTextStyle("fontFamily", e.target.value);
          }}
        >
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>

        {/* Seleção de Tamanho da Fonte */}
        <input
          type="number"
          value={fontSize}
          onChange={(e) => {
            const size = parseInt(e.target.value);
            setFontSize(size);
            updateTextStyle("fontSize", size);
          }}
          style={{ width: "50px" }}
        />
      </div>

      {/* Cor do Texto */}
      <div  className="color-style" >
        <input
          type="color"
          value={textColor}
          onChange={(e) => {
            setTextColor(e.target.value);
            updateTextStyle("fill", e.target.value);
          }}
          title="Cor do Texto"
          id="text"
        />
        

        {/* Cor de Fundo do Texto */}
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => {
            setBackgroundColor(e.target.value);
            updateTextStyle("backgroundColor", e.target.value);
          }}
          title="Cor de Fundo do Texto"
        />

      </div>
      <div className="align-style" >
        {/* Botão para Alinhar à Esquerda */}
        <button onClick={() => updateTextStyle("textAlign", "left")}>
          <img className="align-icon" src={AlignLeft} />
        </button>

        {/* Botão para Centralizar */}
        <button onClick={() => updateTextStyle("textAlign", "center")}>
          <img className="align-icon" src={AlignCenter} />
        </button>

        {/* Botão para Alinhar à Direita */}
        <button onClick={() => updateTextStyle("textAlign", "right")}>
          <img className="align-icon" src={AlignRight} />
        </button>

        {/* Botão para Lista (Adiciona Marcadores) */}
        <button
          onClick={() =>
            updateTextStyle(
              "text",
              activeObject?.text
                ?.split("\n")
                .map((line) => `• ${line}`)
                .join("\n")
            )
          }
        >
          <img className="align-icon" src={List} />
        </button>
      </div>
    </div>
  );
};

export default TextEditorToolbar;
