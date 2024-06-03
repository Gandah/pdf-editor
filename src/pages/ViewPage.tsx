// import { useEffect, useRef } from "react";
// import { Viewer } from '@pdfme/ui';
// import { useInitTemplate } from "../Hooks/useTemplate";
// // import { template, inputs } from "../constants/template";

// const View = () => {
//   const containerRef = useRef(null);
//   const template = useInitTemplate();

//   useEffect(() => {
//     // Ensure the container div is present
//     const domContainer = containerRef.current

//     try {
//       let inputs = template.sampledata ?? [{}];
//       const inputsString = localStorage.getItem("inputs");
//       if (inputsString) {
//         inputs = JSON.parse(inputsString);
//       }
      
//       if (domContainer) {
//          new Viewer({
//           domContainer, // Use the ref here
//           template, 
//           inputs // Make sure you have your template defined or imported
//         })}

//     }catch {
//       localStorage.removeItem("inputs");
//       console.error("Failed to load inputs.");
//       alert("Failed to load inputs. Inputs have been reset.");
//     }

   
//     }, []); // The empty dependency array means this effect runs once after initial render

 
//   return ( 
//       <div ref={containerRef}>
 
//       </div>
   
//   );
// }

// export default View


import { useEffect, useRef } from "react";
import { Viewer } from '@pdfme/ui';
import { useInitTemplate } from "../Hooks/useTemplate";
import { useTempStates } from "../Context/StateContext";

const View = () => {
  const containerRef = useRef(null);
  const { template, inputs} = useTempStates();
  // const template = useInitTemplate();

  useEffect(() => {
    // Attempt to initialize the Viewer
    const initViewer = () => {
      const domContainer = containerRef.current;
      if (!domContainer) {
        return; // Early return if the container is not yet available
      }

      try {
        // let inputs = template.sampledata ?? [{}];
        // const inputsString = localStorage.getItem("inputs");
        // if (inputsString) {
        //   inputs = JSON.parse(inputsString);
        // }
        // console.log("inputs:", inputs)

        // Create Viewer instance
        const viewerInstance = new Viewer({
          domContainer,
          template, 
          inputs
        });

        // Cleanup function to destroy viewer instance when the component unmounts or re-renders
        return () => {
          viewerInstance.destroy?.();
        };

      } catch (error) {
        localStorage.removeItem("inputs");
        console.error("Failed to load inputs:", error);
        alert("Failed to load inputs. Inputs have been reset.");
      }
    };

    // Execute initViewer and handle cleanup
    return initViewer();
  }, [template, inputs]); // Dependency on `template` if it might change, otherwise this can be []

  return <div ref={containerRef}></div>;
}

export default View;
