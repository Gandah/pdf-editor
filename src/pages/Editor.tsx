import React, { useState, useEffect, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { EmbedPDF } from '@simplepdf/react-embed-pdf';

const Editor = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>("");
//   const editorRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      const pdfBytes = reader.result;
      setPdfFile(pdfBytes);

      // Create a URL for the PDF file for preview
    //   const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    //   const url = URL.createObjectURL(blob);
    //   setPdfUrl(url);
    };
  };

  const createFillablePDF = async (pdfBytes) => {
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const jsonSchema = [
      {
        "name": "First Day of Enrollment",
        "type": "text",
        "rect": [198, 344, 244, 354],
        "page": 0
      },
      {
        "name": "Today’s Date",
        "type": "text",
        "rect": [796, 358, 849, 378],
        "page": 0
      },
      {
        "name": "Infant 0-18 Months: Extended Only",
        "type": "checkbox",
        "rect": [1042, 358, 1078, 383],
        "page": 0
      },
      {
        "name": "Toddler 19-35 Months: Half 12:30pm",
        "type": "checkbox",
        "rect": [199, 422, 264, 442],
        "page": 0
      },
      {
        "name": "Toddler 19-35 Months: Full 2:30pm",
        "type": "checkbox",
        "rect": [273, 422, 339, 442],
        "page": 0
      },
      {
        "name": "Toddler 19-35 Months: Extended 7pm",
        "type": "checkbox",
        "rect": [684, 422, 727, 442],
        "page": 0
      },
      {
        "name": "Days/Week (Toddler)",
        "type": "number",
        "rect": [737, 422, 804, 442],
        "page": 0
      },
      {
        "name": "Pre-K 36 Months & Up: Half 12:30pm",
        "type": "checkbox",
        "rect": [199, 486, 261, 505],
        "page": 0
      },
      {
        "name": "Pre-K 36 Months & Up: Full 2:30pm",
        "type": "checkbox",
        "rect": [199, 550, 306, 575],
        "page": 0
      },
      {
        "name": "Pre-K 36 Months & Up: Extended 7pm",
        "type": "checkbox",
        "rect": [1042, 550, 1078, 575],
        "page": 0
      }
    ];

    for (const field of jsonSchema) {
      const { name, type, rect, page } = field;
      const [x, y, width, height] = rect;

      const form = pdfDoc.getForm();

      if (type === 'text') {
        const textField = form.createTextField(name);
        textField.setText('');
        textField.addToPage(pdfDoc.getPages()[page], { x, y, width: width - x, height: height - y });
      } else if (type === 'checkbox') {
        const checkBox = form.createCheckBox(name);
        checkBox.check();
        checkBox.addToPage(pdfDoc.getPages()[page], { x, y, width: width - x, height: height - y });
      }
    }

    const pdfBytesModified = await pdfDoc.save();

   
    const blob = new Blob([pdfBytesModified], { type: 'application/pdf' });
    // saveAs(blob, 'fillable_form.pdf');  // Download the modified PDF
    const url = URL.createObjectURL(blob); 
  
    setPdfUrl(url);
  };

  const handleCreateFillablePDF = async () => {
    if (pdfFile) {
      await createFillablePDF(pdfFile);
    }
  };

//   useEffect(() => {
//     if (pdfUrl && editorRef.current) {
//       Initialize SimplePDF Embed
//       window.simplePDF.openEditor({ url: pdfUrl });
//       window.SimplePDF.embed({
//         url: pdfUrl,
//         container: editorRef.current,
//         enableFormFields: true,
//       });
//     }
//   }, [pdfUrl]);

  return (
    <div>
      <h1>PDF Form Field Adder with SimplePDF</h1>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />
      <button onClick={handleCreateFillablePDF}>Create Fillable PDF</button>
      {pdfUrl && (<EmbedPDF
        mode="inline"
        style={{ width: "100%", minHeight: "calc(100dvh - 30px)" }}
        documentURL={pdfUrl}
        />)}
    </div>
  );
};

export default Editor;
