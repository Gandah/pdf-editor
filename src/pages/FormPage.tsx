// import { useEffect, useRef } from "react";
// import { Form } from "@pdfme/ui";
// import { useInitTemplate } from "../Hooks/useTemplate";
// // import { inputs } from "../constants/template";
// // import { Template, checkTemplate } from "@pdfme/common";
// import {
//   getFontsData,
//   getTemplate,
//   handleLoadTemplate,
//   generatePDF,
//   getPlugins,
//   isJsonString,
// } from "../utils/helpers";

// const FormPage = () => {
//   const containerRef = useRef(null);
//   const template = useInitTemplate();

  

//   useEffect(() => {
//     const domContainer = containerRef.current

//     const fontData = async () => {
//       const response = await getFontsData()
//       return response;
//     }
//    const loadedFont =  fontData()

//     console.log("font: ", loadedFont)
     
//     //inputs
//     let inputs = template.sampledata ?? [{}];
//     try {
//       const inputsString = localStorage.getItem("inputs");
//       if (inputsString) {
//         inputs = JSON.parse(inputsString);
//       }
//     } catch {
//       localStorage.removeItem("inputs");
//       console.error("Failed to load inputs.");
//       alert("Failed to load inputs. Inputs have been reset.");
//     }


//     if (domContainer) {
//        new Form({
//         domContainer, 
//         template, 
//         inputs,
//         options: {
//           loadedFont,
//               labels: { 'clear': '消去' },
//               theme: {
//                 token: {
//                   colorPrimary: '#25c2a0',
//                 },
//               },
//             },
//             plugins: getPlugins(),
        
//       });
 
//     }

//   }, [template]); // The empty dependency array means this effect runs once after initial render
 
//   return ( 
//       <div ref={containerRef}>
 
//       </div>
//   );
// }

// export default FormPage

//******PDFME code */

// import { useRef, useState } from "react";
// import { Template, checkTemplate } from "@pdfme/common";
// import { Form, Viewer } from "@pdfme/ui";
// import {
//   getFontsData,
//   getTemplate,
//   handleLoadTemplate,
//   generatePDF,
//   getPlugins,
//   isJsonString,
// } from "../utils/helpers";

// const headerHeight = 65;

// type Mode = "form" | "viewer";

// const initTemplate = () => {
//   let template: Template = getTemplate();
//   try {
//     const templateString = localStorage.getItem("template");
//     const templateJson = templateString
//       ? JSON.parse(templateString)
//       : getTemplate();
//     checkTemplate(templateJson);
//     template = templateJson as Template;
//   } catch {
//     localStorage.removeItem("template");
//   }
//   return template;
// };


// function FormPage() {
//   const uiRef = useRef<HTMLDivElement | null>(null);
//   const ui = useRef<Form | Viewer | null>(null);
//   const [prevUiRef, setPrevUiRef] = useState<Form | Viewer | null>(null);


//   const [mode, setMode] = useState<Mode>(
//     (localStorage.getItem("mode") as Mode) ?? "form"
//   );

//   const buildUi = (mode: Mode) => {
//     const template = initTemplate();
//     let inputs = template.sampledata ?? [{}];
//     try {
//       const inputsString = localStorage.getItem("inputs");
//       const inputsJson = inputsString
//         ? JSON.parse(inputsString)
//         : template.sampledata ?? [{}];
//       inputs = inputsJson;
//     } catch {
//       localStorage.removeItem("inputs");
//     }

//     getFontsData().then((font: any) => {
//       if (uiRef.current) {
//         ui.current = new (mode === "form" ? Form : Viewer)({
//           domContainer: uiRef.current,
//           template,
//           inputs,
//           options: {
//             font,
//             labels: { 'clear': '消去' },
//             theme: {
//               token: {
//                 colorPrimary: '#25c2a0',
//               },
//             },
//           },
//           plugins: getPlugins(),
//         });
//       }
//     });
//   };

//   const onChangeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value as Mode;
//     setMode(value);
//     localStorage.setItem("mode", value);
//     buildUi(value);
//   };

//   const onGetInputs = () => {
//     if (ui.current) {
//       const inputs = ui.current.getInputs();
//       alert(JSON.stringify(inputs, null, 2));
//       alert("Dumped as console.log");
//       console.log(inputs);
//     }
//   };

//   const onSetInputs = () => {
//     if (ui.current) {
//       const prompt = window.prompt("Enter Inputs JSONString") || "";
//       try {
//         const json = isJsonString(prompt) ? JSON.parse(prompt) : [{}];
//         ui.current.setInputs(json);
//       } catch (e) {
//         alert(e);
//       }
//     }
//   };

//   const onSaveInputs = () => {
//     if (ui.current) {
//       const inputs = ui.current.getInputs();
//       localStorage.setItem("inputs", JSON.stringify(inputs));
//       alert("Saved!");
//     }
//   };

//   const onResetInputs = () => {
//     localStorage.removeItem("inputs");
//     if (ui.current) {
//       const template = initTemplate();
//       ui.current.setInputs(template.sampledata ?? [{}]);
//     }
//   };

//   if (uiRef != prevUiRef) {
//     if (prevUiRef && ui.current) {
//       ui.current.destroy();
//     }
//     buildUi(mode);
//     setPrevUiRef(uiRef);
//   }

//   return (
//     <div>
//       <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginRight: 120, }}>
//         <strong>Form, Viewer</strong>
//         <span style={{ margin: "0 1rem" }}>:</span>
//         <div>
//           <input type="radio" onChange={onChangeMode} id="form" value="form" checked={mode === "form"} />
//           <label htmlFor="form">Form</label>
//           <input type="radio" onChange={onChangeMode} id="viewer" value="viewer" checked={mode === "viewer"} />
//           <label htmlFor="viewer">Viewer</label>
//         </div>
//         <label style={{ width: 180 }}>
//           Load Template
//           <input type="file" accept="application/json" onChange={(e) => handleLoadTemplate(e, ui.current)} />
//         </label>
//         <span style={{ margin: "0 1rem" }}>/</span>
//         <button onClick={onGetInputs}>Get Inputs</button>
//         <span style={{ margin: "0 1rem" }}>/</span>
//         <button onClick={onSetInputs}>Set Inputs</button>
//         <span style={{ margin: "0 1rem" }}>/</span>
//         <button onClick={onSaveInputs}>Save Inputs</button>
//         <span style={{ margin: "0 1rem" }}>/</span>
//         <button onClick={onResetInputs}>Reset Inputs</button>
//         <span style={{ margin: "0 1rem" }}>/</span>
//         <button onClick={() => generatePDF(ui.current)}>Generate PDF</button>
//       </header>
//       <div ref={uiRef} style={{ width: '100%', height: `calc(100vh - ${headerHeight}px)` }} />
//     </div>
//   );
// }

// export default FormPage;


import { useEffect, useRef } from "react";
import { Form } from "@pdfme/ui";
// import { useInitTemplate } from "../Hooks/useTemplate";
import { useTempStates } from "../Context/StateContext";
// import { Template, checkTemplate } from "@pdfme/common";
import {
  getFontsData,
  // getTemplate, // Unused import based on provided snippet
  // handleLoadTemplate,
  // generatePDF,
  getPlugins,
  // isJsonString, // Unused import based on provided snippet
} from "../utils/helpers";

const FormPage = () => {
  const containerRef = useRef(null);
  const { template, inputs } = useTempStates()
  // const template = useInitTemplate();


  useEffect(() => {
    const initForm = async () => {
      const domContainer = containerRef.current;
      if (!domContainer) return;

      try {
        const loadedFont = await getFontsData();

        

        // let inputs = template.sampledata ?? [{}];
        // const inputsString = localStorage.getItem("inputs");
        // if (inputsString) {
        //   inputs = JSON.parse(inputsString);
        // }
        // console.log("inputs: ", inputs);

        new Form({
          domContainer, 
          template, 
          inputs,
          options: {
            loadedFont, // Assuming font data goes here
            labels: { 'clear': '消去' },
            theme: {
              token: {
                colorPrimary: '#25c2a0',
              },
            },
          },
          plugins: getPlugins(),
        });
      } catch (error) {
        localStorage.removeItem("inputs");
        console.error("Failed to load inputs:", error);
        alert("Failed to load inputs. Inputs have been reset.");
      }
    };

    initForm();
  }, [template, inputs]); // This effect depends on `template` and runs whenever `template` changes.
 
  return ( 
      <div ref={containerRef}></div>
  );
}

export default FormPage;
