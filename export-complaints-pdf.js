import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { exec } from "child_process";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import path from "path";

const execAsync = promisify(exec);

export async function POST(req) {
  await connectDB();
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      console.error("No token provided");
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      console.error("No id in decoded token");
      return NextResponse.json(
        { error: "Unauthorized: Missing id in token" },
        { status: 401 }
      );
    }

    if (decoded.role !== "admin") {
      console.error(`Invalid role: ${decoded.role}`);
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    const { complaints } = await req.json();
    if (!complaints || !Array.isArray(complaints)) {
      console.error("Invalid complaints data");
      return NextResponse.json(
        { error: "Invalid complaints data" },
        { status: 400 }
      );
    }

    const latexContent = `
\\documentclass[a4paper,12pt]{article}
\\usepackage{geometry}
\\usepackage{longtable}
\\usepackage{booktabs}
\\usepackage{pdflscape}
\\usepackage{enumitem}
\\usepackage{xcolor}
\\definecolor{pending}{RGB}{234,179,8}
\\definecolor{resolved}{RGB}{34,197,94}
\\definecolor{cancelled}{RGB}{239,68,68}
\\definecolor{inprogress}{RGB}{59,130,246}
\\definecolor{high}{RGB}{255,99,71}
\\definecolor{medium}{RGB}{255,165,0}
\\definecolor{low}{RGB}{144,238,144}
\\geometry{margin=1in}
\\begin{document}
\\section*{Complaint Report}
\\begin{landscape}
\\begin{longtable}{p{1cm}|p{2cm}|p{2cm}|p{3cm}|p{2cm}|p{6cm}|p{2cm}|p{2cm}|p{3cm}}
\\toprule
\\textbf{Type} & \\textbf{Email} & \\textbf{Name} & \\textbf{Title} & \\textbf{Category} & \\textbf{Description} & \\textbf{Status} & \\textbf{Priority} & \\textbf{Submitted At} \\\\
\\midrule
${complaints
  .map(
    (c) =>
      `${c.type} & ${c.id?.email || "N/A"} & ${
        c.name || "N/A"
      } & ${c.title.replace(/&/g, "\\&")} & ${
        c.category || "N/A"
      } & ${c.description.replace(/&/g, "\\&")} & \\textcolor{${c.status
        .toLowerCase()
        .replace(/\s/g, "")}}{${
        c.status
      }} & \\textcolor{${c.priority.toLowerCase()}}{${c.priority}} & ${new Date(
        c.submittedAt
      ).toLocaleString()} \\\\`
  )
  .join("\n")}
\\bottomrule
\\end{longtable}
\\end{landscape}
\\end{document}
    `;

    const tempDir = path.join(process.cwd(), "temp");
    await fs.mkdir(tempDir, { recursive: true });
    const fileName = `complaints_report_${Date.now()}`;
    const texFile = path.join(tempDir, `${fileName}.tex`);
    const pdfFile = path.join(tempDir, `${fileName}.pdf`);

    await fs.writeFile(texFile, latexContent);

    try {
      await execAsync(`latexmk -pdf -outdir=${tempDir} ${texFile}`);
    } catch (error) {
      console.error("LaTeX compilation error:", error.message);
      return NextResponse.json(
        { error: "Failed to generate PDF" },
        { status: 500 }
      );
    }

    const pdfBuffer = await fs.readFile(pdfFile);
    await fs.unlink(texFile).catch(() => {});
    await fs.unlink(pdfFile).catch(() => {});
    await fs.rm(tempDir, { recursive: true, force: true }).catch(() => {});

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF export error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
