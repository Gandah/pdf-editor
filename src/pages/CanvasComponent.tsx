import React, { useEffect } from 'react';

const CanvasComponent = ({ jsonData, canvasRef }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    jsonData.pages.forEach(page => {
      page.elements.forEach(element => {
        drawElement(context, element);
      });
    });
  }, [jsonData, canvasRef]);

  const drawElement = (context, element) => {
    if (element.type === 'paragraph') {
      element.kids.forEach(kid => drawElement(context, kid));
    } else if (element.type === 'line' || element.type === 'word' || element.type.startsWith('form')) {
      const rect = element.rect;
      context.beginPath();
      context.rect(rect[0], rect[1], rect[2] - rect[0], rect[3] - rect[1]);
      context.stroke();
    }
  };

  return (
    <canvas ref={canvasRef} width={604} height={782} style={{ border: '1px solid black' }} />
  );
};

export default CanvasComponent;
