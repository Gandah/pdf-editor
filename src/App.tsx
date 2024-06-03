import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Designer from './pages/Design';
import Viewer from './pages/ViewPage';
import FormPage from './pages/FormPage';
import Canvas from './pages/Canvas';
import SimplePdf from './pages/SimplePdf';
import PdfFormConverter from './pages/FormFiller';
import Editor from './pages/Editor';

function App() {


  return ( 
    <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="design" element={<Designer />} />
            <Route path="view" element={<Viewer />} />
            <Route path="form" element={<FormPage />} />
            <Route path="canvas" element={<Canvas />} />
            <Route path="pdf" element={<SimplePdf />} />
            <Route path="filler" element={<PdfFormConverter />} />
            <Route path="editor" element={<Editor />} />
            {/* Optionally, define a catch-all route for unmatched paths */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Route>
        </Routes>
    </Router>
  );
}

export default App;

