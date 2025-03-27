
import jsPDF from "jspdf";

import { PdfGenerationOptions } from "./types";
import { 
  createPdfDocument, 
  addPdfHeader, 
  addPdfFooter, 
  savePdfDocument 
} from "./core";

/**
 * Adds structured data content to a PDF
 */
export const addDataContent = (
  pdf: jsPDF, 
  data: Record<string, any>, 
  startY = 40
) => {
  let y = startY;
  const leftMargin = 14;

  // Add data sections
  Object.entries(data).forEach(([key, value]) => {
    // Section title
    pdf.setFontSize(12);
    pdf.setTextColor(60, 60, 60);
    pdf.text(key, leftMargin, y);
    y += 7;

    // If value is an object, iterate through its properties
    if (typeof value === "object" && !Array.isArray(value)) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        pdf.setFontSize(10);
        pdf.setTextColor(80, 80, 80);

        // Format the value based on its type
        const formattedValue = typeof subValue === "number" 
          ? subValue.toLocaleString("fr-FR", { maximumFractionDigits: 2 })
          : String(subValue);

        pdf.text(`${subKey}: ${formattedValue}`, leftMargin + 5, y);
        y += 6;
      });
    } else if (Array.isArray(value)) {
      // Handle arrays
      value.forEach((item, index) => {
        pdf.setFontSize(10);
        pdf.setTextColor(80, 80, 80);
        
        if (typeof item === "object") {
          pdf.text(`Item ${index + 1}:`, leftMargin + 5, y);
          y += 6;
          
          Object.entries(item).forEach(([itemKey, itemValue]) => {
            const formattedValue = typeof itemValue === "number" 
              ? itemValue.toLocaleString("fr-FR", { maximumFractionDigits: 2 })
              : String(itemValue);
              
            pdf.text(`- ${itemKey}: ${formattedValue}`, leftMargin + 10, y);
            y += 6;
          });
        } else {
          pdf.text(`- ${String(item)}`, leftMargin + 5, y);
          y += 6;
        }
      });
    } else {
      // Simple values
      pdf.setFontSize(10);
      pdf.setTextColor(80, 80, 80);
      pdf.text(String(value), leftMargin + 5, y);
      y += 6;
    }

    // Add some space after each section
    y += 5;
  });
  
  return y; // Return the new Y position
};

/**
 * Generates a PDF from structured data
 */
export const generatePdfFromData = (
  data: Record<string, any>,
  options: PdfGenerationOptions = {}
) => {
  const {
    title = "FinQuest Document",
    filename = "finquest-document.pdf",
    includeDate = true,
    includeAppName = true,
  } = options;

  try {
    // Create PDF document
    const pdf = createPdfDocument(options);

    // Add header
    addPdfHeader(pdf, title, includeDate);

    // Add content from data
    addDataContent(pdf, data);

    // Add footer if needed
    if (includeAppName) {
      addPdfFooter(pdf);
    }

    // Save the PDF
    return savePdfDocument(pdf, filename);
  } catch (error) {
    console.error("Erreur lors de la génération du PDF:", error);
    return false;
  }
};
