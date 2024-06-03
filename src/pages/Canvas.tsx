import React, { useRef, useState } from 'react';
import PdfComponent from './PdfComponent';
import CanvasComponent from './CanvasComponent';

function Canvas() {
  const [jsonData, setJsonData] = useState(null);
  const canvasRef = useRef(null);

  const handleFileUpload = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = JSON.parse(e.target.result);
      setJsonData(data);
    };
    fileReader.readAsText(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileUpload} />
      {jsonData && <CanvasComponent jsonData={jsonData} canvasRef={canvasRef} />}
      {jsonData && <PdfComponent canvasRef={canvasRef} />}
    </div>
  );
}

export default Canvas;