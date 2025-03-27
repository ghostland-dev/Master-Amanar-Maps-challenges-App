
import jsPDF from "jspdf";

import { PdfGenerationOptions } from "./types";

/**
 * Creates a new PDF document with standard configuration
 */
export const createPdfDocument = (options: PdfGenerationOptions = {}) => {
  const {
    orientation = "portrait",
    format = "a4",
    title = "FinQuest Document",
    subject = "FinQuest Financial Document",
    author = "FinQuest App",
  } = options;

  // Initialize PDF document
  const pdf = new jsPDF({
    orientation,
    unit: "mm",
    format,
  });

  // Set document metadata
  pdf.setProperties({
    title,
    subject,
    author,
    creator: "FinQuest App",
  });

  return pdf;
};

/**
 * Adds the standard header to a PDF document
 */
export const addPdfHeader = (pdf: jsPDF, title: string, includeDate = true) => {
  // Add header
  pdf.setFontSize(18);
  pdf.setTextColor(0, 83, 235); // Primary blue color
  pdf.text(title, 14, 20);
  
  if (includeDate) {
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 14, 27);
  }
};

/**
 * Adds the standard footer to a PDF document
 */
export const addPdfFooter = (pdf: jsPDF) => {
  const pageCount = pdf.getNumberOfPages();
  pdf.setFontSize(8);
  pdf.setTextColor(100, 100, 100);
  
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.text(
      "Généré par FinQuest - Votre coach financier",
      pdf.internal.pageSize.getWidth() / 2,
      pdf.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }
};

/**
 * Saves the PDF document with the given filename
 */
export const savePdfDocument = (pdf: jsPDF, filename = "finquest-document.pdf") => {
  pdf.save(filename);
  return true;
};
