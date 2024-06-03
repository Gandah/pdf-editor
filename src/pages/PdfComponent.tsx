import React from 'react';
import { PDFDownloadLink, Page, Image, Document, StyleSheet } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';

const PdfComponent = ({ canvasRef }) => {
  const captureCanvas = () => {
    return html2canvas(canvasRef.current).then(canvas => {
      return canvas.toDataURL('image/png');
    });
  };

  const MyDocument = ({ imageData }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={imageData} style={styles.image} />
      </Page>
    </Document>
  );

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    image: {
      width: '100%',
      height: 'auto',
    },
  });

  return (
    <PDFDownloadLink
      document={<MyDocument imageData={captureCanvas()} />}
      fileName="canvas.pdf"
    >
      {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
    </PDFDownloadLink>
  );
};

export default PdfComponent;
