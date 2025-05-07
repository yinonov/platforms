import jsPDF from "jspdf";

/**
 * Converts a plain text contract to a PDF and returns a base64 string.
 * @param content The contract text content
 * @returns base64-encoded PDF string
 */
export function textToPdfBase64(content: string): string {
  const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
  const margin = 10;
  const maxWidth = 190; // A4 width - margins
  const lines = doc.splitTextToSize(content, maxWidth);
  doc.text(lines, margin, margin + 10);
  const pdfBase64 = doc.output("datauristring").split(",")[1];
  return pdfBase64;
}
