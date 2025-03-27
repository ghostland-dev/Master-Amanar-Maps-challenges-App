
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface PdfGenerationOptions {
  title?: string;
  filename?: string;
  orientation?: "portrait" | "landscape";
  format?: string;
  includeDate?: boolean;
  includeAppName?: boolean;
  subject?: string;
  author?: string;
}

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
    format = "a4",
    includeDate = true,
    includeAppName = true,
    subject = "FinQuest Financial Document",
    author = "FinQuest App",
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

    // Add header
    pdf.setFontSize(18);
    pdf.setTextColor(0, 83, 235); // Primary blue color
    pdf.text(title, 14, 20);
    
    if (includeDate) {
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Date: ${new Date().toLocaleDateString()}`, 14, 27);
    }

    // Add the captured element image
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 10, 35, imgWidth - 20, imgHeight);

    // Add footer
    if (includeAppName) {
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
    }

    // Save the PDF
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error("Erreur lors de la génération du PDF:", error);
    return false;
  }
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
    orientation = "portrait",
    format = "a4",
    includeDate = true,
    includeAppName = true,
    subject = "FinQuest Financial Document",
    author = "FinQuest App",
  } = options;

  try {
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

    // Add header
    pdf.setFontSize(18);
    pdf.setTextColor(0, 83, 235); // Primary blue color
    pdf.text(title, 14, 20);
    
    if (includeDate) {
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Date: ${new Date().toLocaleDateString()}`, 14, 27);
    }

    // Start position for data
    let y = 40;
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

    // Add footer
    if (includeAppName) {
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
    }

    // Save the PDF
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error("Erreur lors de la génération du PDF:", error);
    return false;
  }
};
