import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
//@ts-ignore
import fontkit from "@pdf-lib/fontkit";

/**
 * Converts a plain text contract to a PDF and returns a base64 string.
 * @param content The contract text content
 * @returns base64-encoded PDF string
 */
export async function textToPdfBase64(content: string): Promise<string> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;
  const margin = 40;
  const maxWidth = width - margin * 2;

  // Split text into lines that fit the page width
  const lines: string[] = [];
  let currentLine = "";
  content.split(/\r?\n/).forEach((paragraph) => {
    let words = paragraph.split(" ");
    words.forEach((word) => {
      const testLine = currentLine ? currentLine + " " + word : word;
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (testWidth > maxWidth) {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    if (currentLine) lines.push(currentLine);
    currentLine = "";
    // Add empty line for paragraph break
    lines.push("");
  });

  let y = height - margin;
  for (const line of lines) {
    if (y < margin + fontSize) {
      // Add new page if needed
      page.drawText("...", {
        x: margin,
        y,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
      break;
    }
    page.drawText(line, {
      x: margin,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    y -= fontSize + 4;
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes).toString("base64");
}

/**
 * Converts a plain text contract to a PDF and downloads it.
 * @param content The contract text content
 */
export async function textToPdfDownload(content: string) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  const fontUrl = "/fonts/OpenSans-Static/OpenSans_Condensed-ExtraBold.ttf";
  const OpenSans = await fetch(fontUrl).then((res) => res.arrayBuffer());
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(OpenSans);
  const fontSize = 12;
  const margin = 40;
  const maxWidth = width - margin * 2;

  // Split text into lines that fit the page width
  const lines: string[] = [];
  let currentLine = "";
  content.split(/\r?\n/).forEach((paragraph) => {
    let words = paragraph.split(" ");
    words.forEach((word) => {
      const testLine = currentLine ? currentLine + " " + word : word;
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (testWidth > maxWidth) {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    if (currentLine) lines.push(currentLine);
    currentLine = "";
    // Add empty line for paragraph break
    lines.push("");
  });

  let y = height - margin;
  for (const line of lines) {
    if (y < margin + fontSize) {
      // Add new page if needed
      page.drawText("...", {
        x: margin,
        y,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
      break;
    }
    page.drawText(line, {
      x: margin,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    y -= fontSize + 4;
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "contract.pdf";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}
