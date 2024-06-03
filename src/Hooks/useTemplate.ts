import { useEffect, useState } from "react";
import { Template, checkTemplate } from "@pdfme/common";
import {  getTemplate } from "../utils/helpers";


export const useInitTemplate = (): Template => {
    const [template, setTemplate] = useState<Template>(getTemplate());
  
    useEffect(() => {
      try {
        const templateString = localStorage.getItem("template");
        if (templateString) {
          const templateJson: Template = JSON.parse(templateString);
          checkTemplate(templateJson);
          setTemplate(templateJson);
        }
      } catch (error) {
        localStorage.removeItem("template");
        console.error("Failed to load template:", error);
        alert("Failed to load template. The template has been reset.");
      }
    }, []);
  
    return template;
  };