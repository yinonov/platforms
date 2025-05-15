import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
//@ts-ignore
import fontkit from "@pdf-lib/fontkit";

// Pure function: generates PDF bytes from text
export async function textToPdf(content: string): Promise<Uint8Array> {
  // Load font as an implementation detail
  const res = await fetch(
    "/fonts/OpenSans/static/OpenSans_Condensed-Regular.ttf"
  );
  if (!res.ok) throw new Error("Font file not found or not accessible");
  const fontBytes = new Uint8Array(await res.arrayBuffer());

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  let page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(fontBytes);
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
    lines.push("");
  });

  let y = height - margin;
  for (const line of lines) {
    if (y < margin + fontSize) {
      page = pdfDoc.addPage();
      y = height - margin;
    }
    const textWidth = font.widthOfTextAtSize(line, fontSize);
    page.drawText(line, {
      x: width - margin - textWidth,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    y -= fontSize + 4;
  }
  return await pdfDoc.save();
}

function uint8ToBase64(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

/**
 * Accepts a PDF (Uint8Array or ArrayBuffer) and returns a base64 string.
 * @param pdfBytes The PDF file as Uint8Array or ArrayBuffer
 * @returns base64-encoded PDF string
 */
export async function pdfToBase64(
  pdfBytes: Uint8Array | ArrayBuffer
): Promise<string> {
  const bytes =
    pdfBytes instanceof Uint8Array ? pdfBytes : new Uint8Array(pdfBytes);
  return uint8ToBase64(bytes);
}

/**
 * Accepts a PDF (Uint8Array or ArrayBuffer) and triggers a download in the browser.
 * @param pdfBytes The PDF file as Uint8Array or ArrayBuffer
 */
export async function pdfDownload(pdfBytes: Uint8Array | ArrayBuffer) {
  const bytes =
    pdfBytes instanceof Uint8Array ? pdfBytes : new Uint8Array(pdfBytes);
  const blob = new Blob([bytes], { type: "application/pdf" });
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
