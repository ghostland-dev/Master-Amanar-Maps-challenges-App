
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
