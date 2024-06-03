import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';


const PdfFormConverter = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      const pdfBytes = reader.result;
      setPdfFile(pdfBytes);

     
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

    // Download the modified PDF
    const blob = new Blob([pdfBytesModified], { type: 'application/pdf' });
    // saveAs(blob, 'fillable_form.pdf');
     // Create a URL for the PDF file for preview
     const url = URL.createObjectURL(blob);
     setPdfUrl(url);
  };

  const handleCreateFillablePDF = async () => {
    if (pdfFile) {
      await createFillablePDF(pdfFile);
    }
  };

  return (
    <div>
      <h1>PDF Form Field Adder</h1>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />
      <button onClick={handleCreateFillablePDF}>Create Fillable PDF</button>
      {pdfUrl && <iframe src={pdfUrl} width="100%" height="900" title="pdf"></iframe>}
    </div>
  );
};

export default PdfFormConverter;
