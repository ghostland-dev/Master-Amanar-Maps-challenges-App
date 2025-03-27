
/**
 * Options for PDF generation
 */
export interface PdfGenerationOptions {
  /**
   * PDF title (document metadata and document header)
   */
  title?: string;
  
  /**
   * Filename for the downloaded PDF
   */
  filename?: string;
  
  /**
   * PDF orientation - 'portrait' or 'landscape'
   */
  orientation?: 'portrait' | 'landscape';
  
  /**
   * PDF format - e.g., 'a4', 'letter'
   */
  format?: string;
  
  /**
   * Document subject metadata
   */
  subject?: string;
  
  /**
   * Document author metadata
   */
  author?: string;
  
  /**
   * Whether to include the current date in the PDF header
   */
  includeDate?: boolean;
  
  /**
   * Whether to include the app name in the footer
   */
  includeAppName?: boolean;
}
