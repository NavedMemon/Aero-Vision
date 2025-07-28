// import { NextResponse } from "next/server";
// import { PDFDocument, rgb } from "pdf-lib";
// import { execSync } from "child_process";
// import fs from "fs/promises";
// import path from "path";

// export async function POST(req) {
//   try {
//     const { booking } = await req.json();
//     if (!booking) {
//       return NextResponse.json(
//         { error: "Booking data required" },
//         { status: 400 }
//       );
//     }

//     // Constructing LaTeX document
//     const latexContent = `
// \\documentclass[a4paper,10pt]{article}
// \\usepackage[utf8]{inputenc}
// \\usepackage{geometry}
// \\geometry{a4paper, margin=1.5cm}
// \\usepackage{graphicx}
// \\usepackage{qrcode}
// \\usepackage{xcolor}
// \\usepackage{titlesec}
// \\usepackage{enumitem}
// \\usepackage{fancyhdr}
// \\usepackage{noto}

// \\definecolor{headerblue}{RGB}{37,99,235}
// \\definecolor{accentpurple}{RGB}{139,92,246}

// \\pagestyle{fancy}
// \\fancyhf{}
// \\fancyhead[C]{\\color{headerblue}\\Large\\textbf{Aero-Vision Flight Ticket}}
// \\fancyfoot[C]{\\thepage}

// \\titleformat{\\section}{\\large\\bfseries\\color{headerblue}}{}{0em}{}
// \\titleformat{\\subsection}{\\normalsize\\bfseries\\color{accentpurple}}{}{0em}{}

// \\begin{document}

// \\vspace*{-1cm}
// \\begin{center}
//   \\includegraphics[width=0.2\\textwidth]{/uploads/aero-vision-logo.png.jpg}
//   \\vspace{0.5cm}
//   \\Huge\\textbf{Flight Ticket}
//   \\vspace{0.5cm}
//   \\qrcode[height=2cm]{${booking._id}}
//   \\vspace{0.5cm}
//   \\small Booking ID: ${booking._id}
// \\end{center}

// \\section*{Flight Details}
// \\begin{description}[leftmargin=0cm, font=\\normalfont]
//   \\item[Flight Number:] ${booking.flight.flightNumber}
//   \\item[Airline:] ${booking.flight.airline.name}
//   \\item[From:] ${booking.flight.from}
//   \\item[To:] ${booking.flight.to}
//   \\item[Departure:] ${new Date(booking.flight.departure).toLocaleString()}
//   \\item[Gate:] ${booking.flight.gate?.gateNumber || "N/A"}
//   \\item[Baggage Allowance:] ${booking.flight.baggageAllowance || "N/A"}
// \\end{description}

// \\section*{Passenger Details}
// \\begin{enumerate}[leftmargin=*]
// ${booking.passengers
//   .map(
//     (p, i) =>
//       `  \\item ${p.name} (${p.gender}, DOB: ${new Date(
//         p.dob
//       ).toLocaleDateString()})`
//   )
//   .join("\n")}
// \\end{enumerate}

// \\section*{Booking Details}
// \\begin{description}[leftmargin=0cm, font=\\normalfont]
//   \\item[Seats:] ${booking.seats.join(", ")}
//   \\item[Total Paid:] ₹${booking.totalPrice}
//   \\item[Status:] ${booking.status}
//   \\item[Booking Date:] ${new Date(booking.createdAt).toLocaleDateString()}
// \\end{description}

// \\vspace{1cm}
// \\begin{center}
//   \\color{accentpurple}\\small Thank you for choosing Aero-Vision!
// \\end{center}

// \\end{document}
// `;

//     const tempDir = path.join(process.cwd(), "temp");
//     await fs.mkdir(tempDir, { recursive: true });
//     const texFile = path.join(tempDir, `ticket_${booking._id}.tex`);
//     await fs.writeFile(texFile, latexContent);

//     // Assuming latexmk and texlive-full are installed
//     execSync(`latexmk -pdf -outdir=${tempDir} ${texFile}`, {
//       stdio: "inherit",
//     });

//     const pdfPath = path.join(tempDir, `ticket_${booking._id}.pdf`);
//     const pdfBytes = await fs.readFile(pdfPath);
//     const pdfBase64 = pdfBytes.toString("base64");

//     // Clean up
//     await fs.unlink(texFile);
//     await fs.unlink(pdfPath);
//     await fs
//       .unlink(path.join(tempDir, `ticket_${booking._id}.aux`))
//       .catch(() => {});
//     await fs
//       .unlink(path.join(tempDir, `ticket_${booking._id}.log`))
//       .catch(() => {});
//     await fs
//       .unlink(path.join(tempDir, `ticket_${booking._id}.fdb_latexmk`))
//       .catch(() => {});
//     await fs
//       .unlink(path.join(tempDir, `ticket_${booking._id}.fls`))
//       .catch(() => {});

//     return NextResponse.json({ pdfBase64 }, { status: 200 });
//   } catch (error) {
//     console.error("Generate ticket error:", error.message);
//     return NextResponse.json(
//       { error: "Failed to generate ticket" },
//       { status: 500 }
//     );
//   }
// }

// import { exec } from "child_process";
// import fs from "fs/promises";
// import path from "path";
// import util from "util";
// import dbConnect from "@/lib/db";
// import mongoose from "mongoose";

// const execPromise = util.promisify(exec);

// // Temporary PATH fix (remove after system PATH is confirmed)
// process.env.PATH = `C:\\Strawberry\\perl\\bin;C:\\Program Files\\MiKTeX\\miktex\\bin\\x64;${process.env.PATH}`;

// export async function POST(request) {
//   try {
//     const { flightId } = await request.json();
//     console.log("Received flightId:", flightId);

//     // Validate flightId
//     if (
//       !flightId ||
//       typeof flightId !== "string" ||
//       !mongoose.isValidObjectId(flightId)
//     ) {
//       return new Response(
//         JSON.stringify({
//           error: "Invalid flightId",
//           details: "flightId must be a valid ObjectId string",
//         }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // Connect to MongoDB
//     await dbConnect();

//     // Fetch all bookings for the flight, populating flight details
//     const Booking =
//       mongoose.models.Booking ||
//       mongoose.model("Booking", new mongoose.Schema({}));
//     const bookings = await Booking.find({
//       flight: new mongoose.Types.ObjectId(flightId),
//     })
//       .populate({
//         path: "flight",
//         populate: [
//           { path: "airline", select: "name logo" },
//           { path: "gate", select: "gateNumber" },
//         ],
//       })
//       .exec();
//     console.log(
//       "Bookings found:",
//       bookings.length,
//       JSON.stringify(bookings, null, 2)
//     );

//     if (!bookings.length) {
//       return new Response(
//         JSON.stringify({ error: "No bookings found for this flight" }),
//         { status: 404, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const tempDir = path.join(process.cwd(), "temp");
//     const texFilePath = path.join(tempDir, `flight_tickets_${flightId}.tex`);
//     const pdfPath = path.join(tempDir, `flight_tickets_${flightId}.pdf`);
//     console.log("Temp directory:", tempDir);
//     console.log("TeX file path:", texFilePath);
//     console.log("PDF file path:", pdfPath);

//     // Ensure temp directory exists
//     await fs.mkdir(tempDir, { recursive: true }).catch((err) => {
//       console.error("Failed to create temp directory:", err.message);
//     });

//     // Verify logo exists
//     const logoPath = path.join(
//       process.cwd(),
//       "public",
//       "uploads",
//       "aero-vision-logo.png"
//     );
//     let logoCommand = "";
//     try {
//       await fs.access(logoPath);
//       console.log("Logo found at:", logoPath);
//       // Use absolute path for LaTeX, converting backslashes to forward slashes
//       const latexLogoPath = logoPath.replace(/\\/g, "/");
//       logoCommand = `\\includegraphics[width=0.2\\textwidth]{${latexLogoPath}}`;
//     } catch (error) {
//       console.error("Logo not found, skipping:", error.message);
//       logoCommand = `% Logo skipped: ${error.message}`;
//     }

//     // Sanitize strings to prevent LaTeX errors
//     const sanitizeLatex = (str) =>
//       String(str || "")
//         .replace(/[!#$%&*+?^_{|}]/g, "")
//         .replace(/([\\{}])/g, "\\$1");

//     // Generate LaTeX content for all bookings
//     const latexContent = `
//     \\documentclass[a4paper,12pt]{article}
//     \\usepackage{lmodern}
//     \\usepackage{graphicx}
//     \\usepackage{qrcode}
//     \\usepackage{xcolor}
//     \\usepackage{titlesec}
//     \\usepackage{enumitem}
//     \\usepackage{fancyhdr}
//     \\pagestyle{fancy}
//     \\fancyhf{}
//     \\cfoot{\\thepage}
//     \\begin{document}

//     ${bookings
//       .map(
//         (booking, index) => `
//       \\begin{center}
//         {\\LARGE \\textbf{Aero-Vision Flight Ticket \\#${index + 1}}} \\\\
//         \\vspace{0.5cm}
//         ${logoCommand}
//       \\end{center}
//       \\vspace{0.5cm}
//       \\qrcode{https://example.com/booking/${sanitizeLatex(booking._id)}}
//       \\section*{Flight Details}
//       \\begin{itemize}
//         \\item \\textbf{Flight Number}: \\texttt{${sanitizeLatex(
//           booking.flight?.flightNumber || "N/A"
//         )}}
//         \\item \\textbf{Airline}: \\texttt{${sanitizeLatex(
//           booking.flight?.airline?.name || "N/A"
//         )}}
//         \\item \\textbf{From}: \\texttt{${sanitizeLatex(
//           booking.flight?.from || "N/A"
//         )}}
//         \\item \\textbf{To}: \\texttt{${sanitizeLatex(
//           booking.flight?.to || "N/A"
//         )}}
//         \\item \\textbf{Departure}: \\texttt{${
//           booking.flight?.departure
//             ? new Date(booking.flight.departure).toLocaleString()
//             : "N/A"
//         }}
//         \\item \\textbf{Gate}: \\texttt{${sanitizeLatex(
//           booking.flight?.gate?.gateNumber || "N/A"
//         )}}
//         \\item \\textbf{Baggage Allowance}: \\texttt{${sanitizeLatex(
//           booking.flight?.baggageAllowance || "N/A"
//         )}}
//       \\end{itemize}
//       \\section*{Passenger Details}
//       \\begin{itemize}
//         ${booking.passengers
//           .map(
//             (p) => `
//           \\item \\textbf{Name}: \\texttt{${sanitizeLatex(p.name)}}
//           \\item \\textbf{DOB}: \\texttt{${
//             p.dob ? new Date(p.dob).toLocaleDateString() : "N/A"
//           }}
//           \\item \\textbf{Gender}: \\texttt{${sanitizeLatex(p.gender)}}
//         `
//           )
//           .join("")}
//       \\end{itemize}
//       \\section*{Booking Details}
//       \\begin{itemize}
//         \\item \\textbf{Seats}: \\texttt{${booking.seats
//           .map((s) => sanitizeLatex(s))
//           .join(", ")}}
//         \\item \\textbf{Total Paid}: ₹${Number(booking.totalPrice || 0).toFixed(
//           2
//         )}
//         \\item \\textbf{Status}: \\texttt{${sanitizeLatex(booking.status)}}
//         \\item \\textbf{Booking Date}: \\texttt{${new Date(
//           booking.createdAt
//         ).toLocaleString()}}
//       \\end{itemize}
//       \\newpage
//     `
//       )
//       .join("")}

//     \\end{document}
//     `;

//     await fs.writeFile(texFilePath, latexContent);
//     console.log("TeX file written successfully:", texFilePath);

//     // Verify Perl and latexmk are available
//     try {
//       const perlResult = await execPromise("perl --version");
//       console.log("Perl is available:", perlResult.stdout);
//       const latexmkResult = await execPromise("latexmk --version");
//       console.log("latexmk is available:", latexmkResult.stdout);
//     } catch (error) {
//       console.error("latexmk or Perl not found:", error.message);
//       return new Response(
//         JSON.stringify({
//           error: "Failed to generate tickets",
//           details: `latexmk or Perl is not installed or not in PATH. Ensure C:\\Strawberry\\perl\\bin and C:\\Program Files\\MiKTeX\\miktex\\bin\\x64 are in your system PATH. Error: ${error.message}`,
//         }),
//         { status: 500, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // Compile LaTeX to PDF
//     const latexCommand = `latexmk -pdf -outdir="${tempDir}" "${texFilePath}"`;
//     console.log("Executing command:", latexCommand);
//     let stdout, stderr;
//     try {
//       ({ stdout, stderr } = await execPromise(latexCommand));
//       console.log("latexmk stdout:", stdout);
//       if (stderr) console.error("latexmk stderr:", stderr);
//     } catch (error) {
//       console.error("latexmk execution error:", error.message);
//       return new Response(
//         JSON.stringify({
//           error: "Failed to generate tickets",
//           details: `latexmk failed: ${error.message}`,
//         }),
//         { status: 500, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // Verify PDF exists
//     try {
//       await fs.access(pdfPath);
//       console.log("PDF generated at:", pdfPath);
//     } catch (error) {
//       console.error("PDF not found:", error.message);
//       return new Response(
//         JSON.stringify({
//           error: "Failed to generate tickets",
//           details: `PDF file was not created: ${error.message}`,
//         }),
//         { status: 500, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const pdfBuffer = await fs.readFile(pdfPath);
//     const pdfBase64 = pdfBuffer.toString("base64");

//     // Clean up temporary files
//     await fs
//       .unlink(texFilePath)
//       .catch(() => console.log("TeX file cleanup failed"));
//     await fs
//       .unlink(pdfPath)
//       .catch(() => console.log("PDF file cleanup failed"));
//     console.log("Temporary files cleaned up");

//     return new Response(JSON.stringify({ pdfBase64 }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Generate tickets error:", error.message, error.stack);
//     return new Response(
//       JSON.stringify({
//         error: "Failed to generate tickets",
//         details: error.message,
//       }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

// import { exec } from "child_process";
// import fs from "fs/promises";
// import path from "path";
// import util from "util";
// import dbConnect from "@/lib/db";
// import mongoose from "mongoose";

// const execPromise = util.promisify(exec);

// // Temporary PATH fix for Node.js
// process.env.PATH = `C:\\Strawberry\\perl\\bin;C:\\Program Files\\MiKTeX\\miktex\\bin\\x64;${process.env.PATH}`;

// export async function POST(request) {
//   try {
//     console.log("Starting POST /api/passenger/bookings/ticket");
//     console.log("Node.js PATH:", process.env.PATH); // Log PATH for debugging
//     const { flightId } = await request.json();
//     console.log("Received flightId:", flightId);

//     // Validate flightId
//     if (
//       !flightId ||
//       typeof flightId !== "string" ||
//       !mongoose.isValidObjectId(flightId)
//     ) {
//       console.log("Invalid flightId detected");
//       return new Response(
//         JSON.stringify({
//           error: "Invalid flightId",
//           details: "flightId must be a valid ObjectId string",
//         }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // Connect to MongoDB
//     console.log("Connecting to MongoDB");
//     await dbConnect();
//     console.log("MongoDB connected");

//     // Fetch all bookings for the flight, populating flight details
//     const Booking =
//       mongoose.models.Booking ||
//       mongoose.model("Booking", new mongoose.Schema({}));
//     console.log("Querying bookings for flightId:", flightId);
//     const bookings = await Booking.find({
//       flight: new mongoose.Types.ObjectId(flightId),
//     })
//       .populate({
//         path: "flight",
//         populate: [
//           { path: "airline", select: "name logo" },
//           { path: "gate", select: "gateNumber" },
//         ],
//       })
//       .exec();
//     console.log(
//       "Bookings found:",
//       bookings.length,
//       JSON.stringify(bookings, null, 2)
//     );

//     if (!bookings.length) {
//       console.log("No bookings found for flightId:", flightId);
//       return new Response(
//         JSON.stringify({ error: "No bookings found for this flight" }),
//         { status: 404, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const tempDir = path.join(process.cwd(), "temp");
//     const texFilePath = path.join(tempDir, `flight_tickets_${flightId}.tex`);
//     const pdfPath = path.join(tempDir, `flight_tickets_${flightId}.pdf`);
//     console.log("Temp directory:", tempDir);
//     console.log("TeX file path:", texFilePath);
//     console.log("PDF file path:", pdfPath);

//     // Ensure temp directory exists
//     console.log("Creating temp directory if not exists");
//     await fs.mkdir(tempDir, { recursive: true }).catch((err) => {
//       console.error("Failed to create temp directory:", err.message);
//     });

//     // Verify logo exists
//     const logoPath = path.join(
//       process.cwd(),
//       "public",
//       "uploads",
//       "aero-vision-logo.png"
//     );
//     let logoCommand = "";
//     try {
//       await fs.access(logoPath);
//       console.log("Logo found at:", logoPath);
//       // Use absolute path for LaTeX, converting backslashes to forward slashes
//       const latexLogoPath = logoPath.replace(/\\/g, "/");
//       logoCommand = `\\includegraphics[width=0.2\\textwidth]{${latexLogoPath}}`;
//     } catch (error) {
//       console.error("Logo not found, skipping:", error.message);
//       logoCommand = `% Logo skipped: ${error.message}`;
//     }

//     // Sanitize strings to prevent LaTeX errors
//     const sanitizeLatex = (str) =>
//       String(str || "")
//         .replace(/[!#$%&*+?^_{|}]/g, "") // Remove special characters
//         .replace(/([\\{}])/g, "\\$1") // Escape LaTeX special characters
//         .replace(/₹/g, "Rs."); // Replace Rupee symbol with Rs.

//     // Generate LaTeX content for all bookings
//     console.log("Generating LaTeX content");
//     const latexContent = `
//     \\documentclass[a4paper,12pt]{article}
//     \\usepackage{lmodern}
//     \\usepackage{graphicx}
//     \\usepackage{qrcode}
//     \\usepackage{xcolor}
//     \\usepackage{titlesec}
//     \\usepackage{enumitem}
//     \\usepackage{fancyhdr}
//     \\pagestyle{fancy}
//     \\fancyhf{}
//     \\cfoot{\\thepage}
//     \\begin{document}

//     ${bookings
//       .map(
//         (booking, index) => `
//       \\begin{center}
//         {\\LARGE \\textbf{Aero-Vision Flight Ticket \\#${index + 1}}} \\\\
//         \\vspace{0.5cm}
//         ${logoCommand}
//       \\end{center}
//       \\vspace{0.5cm}
//       \\qrcode{https://example.com/booking/${sanitizeLatex(booking._id)}}
//       \\section*{Flight Details}
//       \\begin{itemize}
//         \\item \\textbf{Flight Number}: \\texttt{${sanitizeLatex(
//           booking.flight?.flightNumber || "N/A"
//         )}}
//         \\item \\textbf{Airline}: \\texttt{${sanitizeLatex(
//           booking.flight?.airline?.name || "N/A"
//         )}}
//         \\item \\textbf{From}: \\texttt{${sanitizeLatex(
//           booking.flight?.from || "N/A"
//         )}}
//         \\item \\textbf{To}: \\texttt{${sanitizeLatex(
//           booking.flight?.to || "N/A"
//         )}}
//         \\item \\textbf{Departure}: \\texttt{${
//           booking.flight?.departure
//             ? new Date(booking.flight.departure).toLocaleString()
//             : "N/A"
//         }}
//         \\item \\textbf{Gate}: \\texttt{${sanitizeLatex(
//           booking.flight?.gate?.gateNumber || "N/A"
//         )}}
//         \\item \\textbf{Baggage Allowance}: \\texttt{${sanitizeLatex(
//           booking.flight?.baggageAllowance || "N/A"
//         )}}
//       \\end{itemize}
//       \\section*{Passenger Details}
//       \\begin{itemize}
//         ${booking.passengers
//           .map(
//             (p) => `
//           \\item \\textbf{Name}: \\texttt{${sanitizeLatex(p.name)}}
//           \\item \\textbf{DOB}: \\texttt{${
//             p.dob ? new Date(p.dob).toLocaleDateString() : "N/A"
//           }}
//           \\item \\textbf{Gender}: \\texttt{${sanitizeLatex(p.gender)}}
//         `
//           )
//           .join("")}
//       \\end{itemize}
//       \\section*{Booking Details}
//       \\begin{itemize}
//         \\item \\textbf{Seats}: \\texttt{${booking.seats
//           .map((s) => sanitizeLatex(s))
//           .join(", ")}}
//         \\item \\textbf{Total Paid}: Rs.${Number(
//           booking.totalPrice || 0
//         ).toFixed(2)}
//         \\item \\textbf{Status}: \\texttt{${sanitizeLatex(booking.status)}}
//         \\item \\textbf{Booking Date}: \\texttt{${new Date(
//           booking.createdAt
//         ).toLocaleString()}}
//       \\end{itemize}
//       \\newpage
//     `
//       )
//       .join("")}

//     \\end{document}
//     `;

//     console.log("Writing TeX file");
//     await fs.writeFile(texFilePath, latexContent);
//     console.log("TeX file written successfully:", texFilePath);

//     // Verify Perl and latexmk are available
//     console.log("Verifying Perl and latexmk availability");
//     try {
//       const perlResult = await execPromise("perl --version", { timeout: 5000 });
//       console.log("Perl is available:", perlResult.stdout);
//       const latexmkResult = await execPromise("latexmk --version", {
//         timeout: 5000,
//       });
//       console.log("latexmk is available:", latexmkResult.stdout);
//     } catch (error) {
//       console.error("latexmk or Perl not found:", error.message);
//       return new Response(
//         JSON.stringify({
//           error: "Failed to generate tickets",
//           details: `latexmk or Perl is not installed or not in PATH. Ensure C:\\Strawberry\\perl\\bin and C:\\Program Files\\MiKTeX\\miktex\\bin\\x64 are in your system PATH. Error: ${error.message}`,
//         }),
//         { status: 500, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // Compile LaTeX to PDF with timeout
//     const latexCommand = `latexmk -pdf -outdir="${tempDir}" "${texFilePath}"`;
//     console.log("Executing latexmk command:", latexCommand);
//     let stdout, stderr;
//     try {
//       ({ stdout, stderr } = await execPromise(latexCommand, {
//         timeout: 30000,
//       }));
//       console.log("latexmk stdout:", stdout);
//       if (stderr) console.error("latexmk stderr:", stderr);
//     } catch (error) {
//       console.error("latexmk execution error:", error.message);
//       return new Response(
//         JSON.stringify({
//           error: "Failed to generate tickets",
//           details: `latexmk failed: ${error.message}`,
//         }),
//         { status: 500, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // Verify PDF exists
//     console.log("Verifying PDF existence");
//     try {
//       await fs.access(pdfPath);
//       console.log("PDF generated at:", pdfPath);
//     } catch (error) {
//       console.error("PDF not found:", error.message);
//       return new Response(
//         JSON.stringify({
//           error: "Failed to generate tickets",
//           details: `PDF file was not created: ${error.message}`,
//         }),
//         { status: 500, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     console.log("Reading PDF file");
//     const pdfBuffer = await fs.readFile(pdfPath);
//     const pdfBase64 = pdfBuffer.toString("base64");

//     // Clean up temporary files
//     console.log("Cleaning up temporary files");
//     await fs
//       .unlink(texFilePath)
//       .catch(() => console.log("TeX file cleanup failed"));
//     await fs
//       .unlink(pdfPath)
//       .catch(() => console.log("PDF file cleanup failed"));
//     console.log("Temporary files cleaned up");

//     console.log("Returning PDF response");
//     return new Response(JSON.stringify({ pdfBase64 }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Generate tickets error:", error.message, error.stack);
//     return new Response(
//       JSON.stringify({
//         error: "Failed to generate tickets",
//         details: error.message,
//       }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

// import { exec } from "child_process";
// import fs from "fs/promises";
// import path from "path";
// import util from "util";
// import dbConnect from "@/lib/db";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import QRCode from "qrcode";

// const execPromise = util.promisify(exec);
// const JWT_SECRET =
//   process.env.JWT_SECRET || "aerovisionaerovisionaerovisonproject";

// process.env.PATH = `C:\\Strawberry\\perl\\bin;C:\\Program Files\\MiKTeX\\miktex\\bin\\x64;${process.env.PATH}`;

// export async function POST(request) {
//   try {
//     console.log("Starting POST /api/passenger/bookings/ticket");

//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       console.log("No token found");
//       return new Response(
//         JSON.stringify({ error: "Unauthorized", details: "No token found" }),
//         {
//           status: 401,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }

//     let decoded;
//     try {
//       decoded = jwt.verify(token, JWT_SECRET);
//       if (decoded.role !== "passenger") {
//         console.log("User is not a passenger");
//         return new Response(
//           JSON.stringify({
//             error: "Forbidden",
//             details: "User is not a passenger",
//           }),
//           {
//             status: 403,
//             headers: { "Content-Type": "application/json" },
//           }
//         );
//       }
//     } catch (error) {
//       console.log("Invalid token:", error.message);
//       return new Response(
//         JSON.stringify({ error: "Unauthorized", details: "Invalid token" }),
//         {
//           status: 401,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }

//     const { flightId } = await request.json();
//     if (
//       !flightId ||
//       typeof flightId !== "string" ||
//       !mongoose.isValidObjectId(flightId)
//     ) {
//       console.log("Invalid flightId");
//       return new Response(
//         JSON.stringify({
//           error: "Invalid flightId",
//           details: "flightId must be a valid ObjectId",
//         }),
//         {
//           status: 400,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }

//     await dbConnect();
//     const Booking =
//       mongoose.models.Booking ||
//       mongoose.model("Booking", new mongoose.Schema({}));
//     const booking = await Booking.findOne({
//       flight: new mongoose.Types.ObjectId(flightId),
//       passenger: new mongoose.Types.ObjectId(decoded.id),
//       status: "Confirmed",
//     })
//       .populate({
//         path: "flight",
//         populate: [
//           { path: "airline", select: "name logo" },
//           { path: "gate", select: "gateNumber" },
//         ],
//       })
//       .exec();

//     if (!booking) {
//       console.log("No booking found");
//       return new Response(
//         JSON.stringify({
//           error: "No booking found for this passenger and flight",
//         }),
//         {
//           status: 404,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }

//     const tempDir = path.join(process.cwd(), "temp");
//     const texFilePath = path.join(
//       tempDir,
//       `flight_ticket_${flightId}_${decoded.id}.tex`
//     );
//     const pdfPath = path.join(
//       tempDir,
//       `flight_ticket_${flightId}_${decoded.id}.pdf`
//     );
//     const qrCodePath = path.join(tempDir, `qr_${flightId}_${decoded.id}.png`);

//     await fs.mkdir(tempDir, { recursive: true });

//     await QRCode.toFile(
//       qrCodePath,
//       `https://example.com/booking/${booking._id}`,
//       {
//         errorCorrectionLevel: "H",
//         width: 100,
//         margin: 1,
//         color: { dark: "#000000", light: "#FFFFFF" },
//       }
//     );

//     const logoPath = path.join(
//       process.cwd(),
//       "public",
//       "Uploads",
//       "aero-vision-logo.png"
//     );
//     let logoCommand = "";
//     try {
//       await fs.access(logoPath, fs.constants.R_OK);
//       const latexLogoPath = logoPath.replace(/\\/g, "/");
//       logoCommand = `\\includegraphics[width=0.1\\textwidth]{${latexLogoPath}}`;
//     } catch {
//       logoCommand = `{\\color{red}\\sffamily\\small [Aero-Vision Logo]}`;
//     }

//     const sanitizeLatex = (str) =>
//       String(str || "")
//         .replace(/[!#$%&*+?^_{|}]/g, "")
//         .replace(/([\\{}])/g, "\\$1")
//         .replace(/₹/g, "Rs.");

//     const latexContent = `
// \\documentclass[a4paper,10pt]{article}
// \\usepackage[utf8]{inputenc}
// \\usepackage{fontspec}
// \\setmainfont[Path=C:/Users/mgshe/AppData/Roaming/MiKTeX/fonts/Cinzel/,Extension=.ttf]{Cinzel-VariableFont_wght}
// \\usepackage{geometry}
// \\geometry{a4paper,left=1cm,right=1cm,top=1cm,bottom=1cm}
// \\usepackage{graphicx}
// \\usepackage{xcolor}
// \\definecolor{primaryBlue}{HTML}{2563EB}
// \\begin{document}
// \\begin{center}
//   ${logoCommand}
//   \\vspace{0.2cm}
//   \\includegraphics[width=2cm]{${qrCodePath.replace(/\\/g, "/")}}
//   \\vspace{0.2cm}
//   \\textbf{\\color{primaryBlue}Flight Ticket}
// \\end{center}
// \\textbf{Flight Details:}\\\\
// Flight Number: ${sanitizeLatex(booking.flight?.flightNumber || "N/A")}\\\\
// Airline: ${sanitizeLatex(booking.flight?.airline?.name || "Aero-Vision")}\\\\
// From: ${sanitizeLatex(booking.flight?.from || "N/A")}\\\\
// To: ${sanitizeLatex(booking.flight?.to || "N/A")}\\\\
// Departure: ${
//       booking.flight?.departure
//         ? new Date(booking.flight.departure).toLocaleString()
//         : "N/A"
//     }\\\\
// Gate: ${sanitizeLatex(booking.flight?.gate?.gateNumber || "N/A")}\\\\
// Baggage: ${sanitizeLatex(booking.flight?.baggageAllowance || "N/A")}\\\\
// \\textbf{Passenger Details:}\\\\
// ${booking.passengers
//   .map(
//     (p) => `
// Name: ${sanitizeLatex(p.name)}\\\\
// DOB: ${p.dob ? new Date(p.dob).toLocaleDateString() : "N/A"}\\\\
// Gender: ${sanitizeLatex(p.gender)}\\\\
// `
//   )
//   .join("")}
// \\textbf{Booking Details:}\\\\
// Seats: ${booking.seats.map((s) => sanitizeLatex(s)).join(", ")}\\\\
// Total Paid: Rs.${Number(booking.totalPrice || 0).toFixed(2)}\\\\
// Status: ${sanitizeLatex(booking.status)}\\\\
// Booking Date: ${new Date(booking.createdAt).toLocaleString()}\\\\
// \\end{document}
// `;

//     await fs.writeFile(texFilePath, latexContent);

//     const latexCommand = `xelatex -output-directory="${tempDir}" "${texFilePath}"`;
//     try {
//       const { stdout, stderr } = await execPromise(latexCommand, {
//         timeout: 60000,
//       });
//       console.log("xelatex stdout:", stdout);
//       if (stderr) console.error("xelatex stderr:", stderr);
//     } catch (error) {
//       console.error("xelatex error:", error.message);
//       return new Response(
//         JSON.stringify({
//           error: "Failed to generate ticket",
//           details: `xelatex failed: ${error.message}`,
//         }),
//         { status: 500, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     try {
//       await fs.access(pdfPath, fs.constants.R_OK);
//     } catch {
//       return new Response(
//         JSON.stringify({
//           error: "Failed to generate ticket",
//           details: "PDF file was not created",
//         }),
//         { status: 500, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const pdfBuffer = await fs.readFile(pdfPath);
//     const pdfBase64 = pdfBuffer.toString("base64");

//     await fs.unlink(texFilePath).catch(() => {});
//     await fs.unlink(pdfPath).catch(() => {});
//     await fs.unlink(qrCodePath).catch(() => {});

//     return new Response(JSON.stringify({ pdfBase64 }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error:", error.message);
//     return new Response(
//       JSON.stringify({
//         error: "Failed to generate ticket",
//         details: error.message,
//       }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";
import util from "util";
import dbConnect from "@/lib/db";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";

const JWT_SECRET =
  process.env.JWT_SECRET || "aerovisionaerovisionaerovisonproject";

export async function POST(request) {
  try {
    console.log("Starting POST /api/passenger/bookings/ticket");

    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.log("No token found");
      return new Response(
        JSON.stringify({ error: "Unauthorized", details: "No token found" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
      if (decoded.role !== "passenger") {
        console.log("User is not a passenger");
        return new Response(
          JSON.stringify({
            error: "Forbidden",
            details: "User is not a passenger",
          }),
          {
            status: 403,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    } catch (error) {
      console.log("Invalid token:", error.message);
      return new Response(
        JSON.stringify({ error: "Unauthorized", details: "Invalid token" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { flightId } = await request.json();
    if (
      !flightId ||
      typeof flightId !== "string" ||
      !mongoose.isValidObjectId(flightId)
    ) {
      console.log("Invalid flightId");
      return new Response(
        JSON.stringify({
          error: "Invalid flightId",
          details: "flightId must be a valid ObjectId",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await dbConnect();
    const Booking =
      mongoose.models.Booking ||
      mongoose.model("Booking", new mongoose.Schema({}));
    const booking = await Booking.findOne({
      flight: new mongoose.Types.ObjectId(flightId),
      passenger: new mongoose.Types.ObjectId(decoded.id),
      status: "Confirmed",
    })
      .populate({
        path: "flight",
        populate: [
          { path: "airline", select: "name logo" },
          { path: "gate", select: "gateNumber" },
        ],
      })
      .exec();

    if (!booking) {
      console.log("No booking found");
      return new Response(
        JSON.stringify({
          error: "No booking found for this passenger and flight",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const tempDir = path.join(process.cwd(), "temp");
    const qrCodePath = path.join(tempDir, `qr_${flightId}_${decoded.id}.png`);

    await fs.mkdir(tempDir, { recursive: true });

    await QRCode.toFile(
      qrCodePath,
      `https://example.com/booking/${booking._id}`,
      {
        errorCorrectionLevel: "H",
        width: 100,
        margin: 1,
        color: { dark: "#000000", light: "#FFFFFF" },
      }
    );

    const qrBuffer = await fs.readFile(qrCodePath);
    const qrBase64 = qrBuffer.toString("base64");

    await fs.unlink(qrCodePath).catch(() => {});

    return new Response(
      JSON.stringify({
        booking,
        qrCode: `data:image/png;base64,${qrBase64}`,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({
        error: "Failed to generate ticket data",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
