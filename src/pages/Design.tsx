// import { useEffect, useRef, useState} from 'react'
// import { Designer } from '@pdfme/ui';

// import { Template, checkTemplate, Lang } from "@pdfme/common";

// import { useInitTemplate } from '../Hooks/useTemplate';
// import { getPlugins } from '../utils/helpers';

// const Design = () => {
//  // Use useRef to get a reference to the container div
// //  const containerRef = useRef(null);
//   const containerRef = useRef<HTMLDivElement | null>(null);
//    const [lang, setLang] = useState<Lang>('en');
//    const template: Template = useInitTemplate();

//  useEffect(() => {
//    // Ensure the container div is present
//    const domContainer = containerRef.current
//    if (domContainer) {
//       new Designer({
//        domContainer, // Use the ref here
//        template,  // Make sure you have your template defined or imported

//                options: {
//             // font,
//             lang,
//             labels: {
//               addNewField: 'Add new field', // Update existing labels
//               'clear': '🗑️', // Add custom labels to consume them in your own plugins
//             },
//             theme: {
//               token: {
//                 colorPrimary: '#25c2a0',
//               },
//             },
//           },
//           plugins: getPlugins(),
//      });

//    }
//  }, []); // The empty dependency array means this effect runs once after initial render

//  return ( 
//      <div ref={containerRef} id="container">

//      </div>
  
//  );
// }

// export default Design


//Version 2


// import { useRef, useState } from "react";
// import { Template, checkTemplate, Lang } from "@pdfme/common";
// import { Designer } from "@pdfme/ui";
// import { useInitTemplate } from "../Hooks/useTemplate";
// import {
//   getFontsData,
//   getTemplate,
//   readFile,
//   cloneDeep,
//   getPlugins,
//   handleLoadTemplate,
//   generatePDF,
//   downloadJsonFile,
// } from "../utils/helpers";

// const headerHeight = 65;

// function Design() {
//   const designerRef = useRef<HTMLDivElement | null>(null);
//   const designer = useRef<Designer | null>(null);
//   const [lang, setLang] = useState<Lang>('en');
//   const [prevDesignerRef, setPrevDesignerRef] = useState<Designer | null>(null);
 

//   const template: Template = useInitTemplate();

//   const buildDesigner = () => {
//     // try {
//     //   const templateString = localStorage.getItem("template");
//     //   const templateJson = templateString
//     //     ? JSON.parse(templateString)
//     //     : getTemplate();
//     //   checkTemplate(templateJson);
//     //   template = templateJson as Template;
//     // } catch {
//     //   localStorage.removeItem("template");
//     // }

//     getFontsData().then((font) => {
//       if (designerRef.current) {
//         designer.current = new Designer({
//           domContainer: designerRef.current,
//           template,
//           options: {
//             font,
//             lang,
//             labels: {
//               addNewField: 'Update', // Update existing labels
//               'clear': '🗑️', // Add custom labels to consume them in your own plugins
//             },
//             theme: {
//               token: {
//                 colorPrimary: '#25c2a0',
//               },
//             },
//           },
//           plugins: getPlugins(),
//         });
//         designer.current.onSaveTemplate(onSaveTemplate);
//       }
//     });
//   }

//   const onChangeBasePDF = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target && e.target.files) {
//       readFile(e.target.files[0], "dataURL").then(async (basePdf) => {
//         if (designer.current) {
//           designer.current.updateTemplate(
//             Object.assign(cloneDeep(designer.current.getTemplate()), {
//               basePdf,
//             })
//           );
//         }
//       });
//     }
//   };

//   const onDownloadTemplate = () => {
//     if (designer.current) {
//       downloadJsonFile(designer.current.getTemplate(), "template");
//       console.log(designer.current.getTemplate());
//     }
//   };

//   const onSaveTemplate = (template?: Template) => {
//     if (designer.current) {
//       localStorage.setItem(
//         "template",
//         JSON.stringify(template || designer.current.getTemplate())
//       );
//       alert("Saved!");
//     }
//   };

//   const onResetTemplate = () => {
//     if (designer.current) {
//       designer.current.updateTemplate(getTemplate());
//       localStorage.removeItem("template");
//     }
//   };
  
  
//   if (designerRef != prevDesignerRef) {
//     if (prevDesignerRef && designer.current) {
//       designer.current.destroy();
//     }
//     buildDesigner();
//     setPrevDesignerRef(designerRef);
//   }

//   return (
//     <div>
//       <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginRight: 120, }}>
//         <strong>Designer</strong>
//         <span style={{ margin: "0 1rem" }}>:</span>
//         <select onChange={(e) => {
//           setLang(e.target.value as Lang)
//           if (designer.current) {
//             designer.current.updateOptions({ lang: e.target.value as Lang })
//           }
//         }} value={lang}>
//           <option value="en">English</option>
//           <option value="ja">Japanese</option>
//           <option value="ar">Arabic</option>
//           <option value="th">Thai</option>
//           <option value="pl">Polish</option>
//           <option value="it">Italian</option>
//           <option value="de">German</option>
//         </select>
//         <span style={{ margin: "0 1rem" }}>/</span>
//         <label style={{ width: 180 }}>
//           Change BasePDF
//           <input type="file" accept="application/pdf" onChange={onChangeBasePDF} />
//         </label>
//         <span style={{ margin: "0 1rem" }}>/</span>
//         <label style={{ width: 180 }}>
//           Load Template
//           <input type="file" accept="application/json" onChange={(e) => handleLoadTemplate(e, designer.current)} />
//         </label>
//         <span style={{ margin: "0 1rem" }}>/</span>
//         <button onClick={onDownloadTemplate}>Download Template</button>
//         <span style={{ margin: "0 1rem" }}>/</span>
//         <button onClick={() => onSaveTemplate()}>Save Template</button>
//         <span style={{ margin: "0 1rem" }}>/</span>
//         <button onClick={onResetTemplate}>Reset Template</button>
//         <span style={{ margin: "0 1rem" }}>/</span>
//         <button onClick={() => generatePDF(designer.current)}>Generate PDF</button>
//       </header>
//       <div ref={designerRef} style={{ width: '100%', height: `calc(100vh - ${headerHeight}px)` }} />
//     </div>
//   );
// }

// export default Design;


import { useRef, useState, useEffect } from "react";
import { Template, Lang } from "@pdfme/common";
import { Designer } from "@pdfme/ui";
import { useInitTemplate } from "../Hooks/useTemplate";

import { getPlugins, readFile, downloadJsonFile, handleLoadTemplate, generatePDF } from "../utils/helpers";
import { useTempStates } from "../Context/StateContext";

const Design = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [lang, setLang] = useState<Lang>('en');
  const designerRef = useRef<Designer | null>(null);
  // const template: Template = useInitTemplate();

  const { template, inputs} = useTempStates();

  useEffect(() => {
    if (containerRef.current) {
      designerRef.current = new Designer({
        domContainer: containerRef.current,
        template,
        options: {
          // The font data loading and setting will need to be integrated here, similar to the original setup.
          lang,
          labels: {
            addNewField: 'Add New Field',
            clear: '🗑️',
          },
          theme: {
            token: {
              colorPrimary: '#25c2a0',
            },
          },
        },
        plugins: getPlugins(),
      });

      // Attach event listeners or any other initialization logic here
      designerRef.current.onSaveTemplate(onSaveTemplate);

    }
    // Cleanup function to ensure we properly destroy the Designer instance
    // to prevent memory leaks or other side effects.
    return () => {
      if (designerRef.current) {
        designerRef.current.destroy();
      }
    };
  }, []);


    const onSaveTemplate = (template?: Template) => {
    if (designerRef.current) {
      localStorage.setItem(
        "template",
        JSON.stringify(template || designerRef.current.getTemplate())
      );
      alert("Saved!");
    }
  };

  const onChangeBasePDF = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && designerRef.current) {
      const basePdf = await readFile(event.target.files[0], "dataURL");
      designerRef.current.updateTemplate({
        ...designerRef.current.getTemplate(),
        basePdf,
      });
    }
  };

  // const onLanguageChange = (newLang: Lang) => {
  //   setLang(newLang);
  //   if (designerRef.current) {
  //     designerRef.current.updateOptions({ lang: newLang });
  //   }
  // };

  // Implement the onSaveTemplate, onDownloadTemplate, onResetTemplate, etc. functionalities here
  // similar to the original setup, utilizing designerRef.current to access the Designer instance.

    const onDownloadTemplate = () => {
    if (designerRef.current) {
      downloadJsonFile(designerRef.current.getTemplate(), "template");
      console.log(designerRef.current.getTemplate());
    }
  };

 
  const onResetTemplate = () => {
    if (designerRef.current) {
      designerRef.current.updateTemplate(designerRef.current.getTemplate());
      localStorage.removeItem("template");
    }
  };

  return (
    <div>
      {/* Implement UI elements here, such as language selector, file inputs for base PDF and template loading,
          and buttons for template saving, downloading, resetting, and PDF generation. */}

     <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginRight: 120, }}>
        <strong>Designer</strong>
        <span style={{ margin: "0 1rem" }}>:</span>
        <select onChange={(e) => {
          setLang(e.target.value as Lang)
          if (designerRef.current) {
            designerRef.current.updateOptions({ lang: e.target.value as Lang })
          }
        }} value={lang}>
          <option value="en">English</option>
          <option value="ja">Japanese</option>
          <option value="ar">Arabic</option>
          <option value="th">Thai</option>
          <option value="pl">Polish</option>
          <option value="it">Italian</option>
          <option value="de">German</option>
        </select>
        <span style={{ margin: "0 1rem" }}>/</span>
        <label style={{ width: 180 }}>
          Change BasePDF
          <input type="file" accept="application/pdf" onChange={onChangeBasePDF} />
        </label>
        <span style={{ margin: "0 1rem" }}>/</span>
        <label style={{ width: 180 }}>
          Load Template
          <input type="file" accept="application/json" onChange={(e) => handleLoadTemplate(e, designerRef.current)} />
        </label>
        <span style={{ margin: "0 1rem" }}>/</span>
        <button onClick={onDownloadTemplate}>Download Template</button>
        <span style={{ margin: "0 1rem" }}>/</span>
        <button onClick={() => onSaveTemplate()}>Save Template</button>
        <span style={{ margin: "0 1rem" }}>/</span>
        <button onClick={onResetTemplate}>Reset Template</button>
        <span style={{ margin: "0 1rem" }}>/</span>
        <button onClick={() => generatePDF(designerRef.current)}>Generate PDF</button>
      </header>
      <div ref={containerRef} style={{ width: '100%', height: `calc(100vh - 65px)` }} />
    </div>
  );
};

export default Design;
