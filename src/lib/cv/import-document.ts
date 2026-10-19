export async function readCVFile(file: File): Promise<string> {
  if (!file.size || file.size > 10 * 1024 * 1024) throw new Error("Choisissez un document non vide de moins de 10 Mo.");
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (ext === "txt") return file.text();
  if (ext === "docx") {
    const mammoth = await import("mammoth/mammoth.browser");
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    return result.value;
  }
  if (ext === "pdf") {
    const pdf = await import("pdfjs-dist");
    const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
    pdf.GlobalWorkerOptions.workerSrc = worker.default;
    const document = await pdf.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
    try {
      const pages: string[] = [];
      for (let i = 1; i <= document.numPages; i++) {
        const page = await document.getPage(i);
        const content = await page.getTextContent();
        pages.push(content.items.map(item => "str" in item ? item.str : "").join(" "));
      }
      const text = pages.join("\n").trim();
      if (!text) throw new Error("Ce PDF est une image sans texte. Dictez votre parcours ou collez son contenu.");
      return text;
    } finally { await document.cleanup(); }
  }
  throw new Error("Formats acceptés : PDF avec texte, Word (.docx) et texte (.txt).");
}
