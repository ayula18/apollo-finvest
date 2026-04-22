import { PDFParse } from "pdf-parse";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return Response.json({ error: "No file provided." }, { status: 400 });
    }
    if (file.type !== "application/pdf") {
      return Response.json({ error: "File must be a PDF." }, { status: 400 });
    }
    if (file.size > 10 * 1024 * 1024) {
      return Response.json({ error: "File too large. Maximum 10 MB." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    // Strip the "-- N of M --" page markers pdfjs inserts between pages
    const text = (result.text ?? "")
      .replace(/--\s*\d+\s*of\s*\d+\s*--/gi, "")
      .trim();

    if (text.length < 50) {
      return Response.json(
        { error: "Could not extract text from this PDF. The file may be a scanned image rather than a text-based PDF." },
        { status: 422 }
      );
    }

    return Response.json({ text });
  } catch (err) {
    console.error("PDF extraction failed:", err);
    return Response.json(
      { error: "PDF extraction failed. Make sure the file is a valid bank statement PDF." },
      { status: 500 }
    );
  }
}
