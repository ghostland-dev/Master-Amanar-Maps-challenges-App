
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { PdfGenerationOptions } from "./types";
import { 
  createPdfDocument, 
  addPdfHeader, 
  addPdfFooter, 
  savePdfDocument 
} from "./core";

/**
 * Generates a PDF from an HTML element
 */
export const generatePdfFromElement = async (
  element: HTMLElement,
  options: PdfGenerationOptions = {}
) => {
  const {
    title = "FinQuest Document",
    filename = "finquest-document.pdf",
    orientation = "portrait",
    includeDate = true,
    includeAppName = true,
  } = options;

  try {
    // Capture the element as canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    // Calculate dimensions
    const imgWidth = orientation === "portrait" ? 210 : 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF document
    const pdf = createPdfDocument(options);

    // Add header
    addPdfHeader(pdf, title, includeDate);

    // Add the captured element image
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 10, 35, imgWidth - 20, imgHeight);

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
