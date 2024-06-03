import { EmbedPDF } from "@simplepdf/react-embed-pdf";




const SimplePdf = () => {
  return (
    // The PDF picker is displayed when rendering the component
        <EmbedPDF
        mode="inline"
        style={{ width: "100%", height: "100dvh" }}
        
        />
  )
}

export default SimplePdf