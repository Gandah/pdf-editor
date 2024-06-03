import { createContext, useContext } from "react";
import { useInitTemplate } from "../Hooks/useTemplate";
import { getInputs } from "../utils/inputs";

import { Template } from "@pdfme/common";
import { PropsWithChildren } from "react";


interface TempStatesContextType {
  template: Template | undefined; // Assuming useInitTemplate returns a Template or undefined
  inputs?: any | undefined,
}

// Define a default context value matching the expected structure
const defaultContextValue: TempStatesContextType = {
  template: undefined,
  
};

const TempStates = createContext<TempStatesContextType>(defaultContextValue);

export const useTempStates = () => useContext(TempStates);

export const StatesProvider = ({ children } : PropsWithChildren) => {
    const template = useInitTemplate();
    const inputs = getInputs(template)


  return <TempStates.Provider value={{template, inputs}}>{children}</TempStates.Provider>;
};
