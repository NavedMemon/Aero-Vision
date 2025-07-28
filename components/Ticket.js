// "use client";
// import React, { useRef, useEffect, useState } from "react";
// import html2pdf from "html2pdf.js";
// import styles from "./Ticket.module.css";

// export default function Ticket({ booking, qrCode, onClose }) {
//   const ticketRef = useRef();
//   const [imagesLoaded, setImagesLoaded] = useState(false);

//   // Preload images for PDF
//   useEffect(() => {
//     console.log("Ticket Component Props:", { booking, qrCode });
//     const preloadImages = async () => {
//       try {
//         const logo = new Image();
//         logo.src = "/Uploads/aero-vision-logo.png";
//         logo.crossOrigin = "anonymous";
//         const qr = new Image();
//         qr.src = qrCode;
//         qr.crossOrigin = "anonymous";

//         await Promise.all([
//           new Promise((resolve, reject) => {
//             logo.onload = resolve;
//             logo.onerror = () => reject(new Error("Logo load failed"));
//           }),
//           new Promise((resolve, reject) => {
//             qr.onload = resolve;
//             qr.onerror = () => reject(new Error("QR code load failed"));
//           }),
//         ]);
//         console.log("Images preloaded successfully");
//         setImagesLoaded(true);
//       } catch (error) {
//         console.error("Image preload error:", error);
//         setImagesLoaded(true); // Proceed to avoid blocking PDF
//       }
//     };
//     preloadImages();
//   }, [qrCode]);

//   const downloadPDF = async () => {
//     try {
//       const element = ticketRef.current;
//       if (!element) {
//         console.error("Ticket element not found");
//         alert("Error: Ticket content not found");
//         return;
//       }
//       if (!imagesLoaded) {
//         console.warn("Images not yet loaded, waiting...");
//         alert("Please wait, images are still loading");
//         return;
//       }
//       console.log("Generating PDF for ticket element:", element);
//       const opt = {
//         margin: [5, 5, 5, 5], // mm: [top, left, bottom, right]
//         filename: `ticket_${booking?.flight?.flightNumber || "unknown"}_${
//           booking?._id || "unknown"
//         }.pdf`,
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: {
//           scale: 2,
//           useCORS: true,
//           logging: true,
//           windowWidth: 190 * 3.78, // 190mm to pixels (1mm ≈ 3.78px at 96dpi)
//           windowHeight: 287 * 3.78, // A4 height minus margins
//         },
//         jsPDF: {
//           unit: "mm",
//           format: "a4",
//           orientation: "portrait",
//         },
//       };
//       await html2pdf().set(opt).from(element).save();
//       console.log("PDF generation successful");
//     } catch (error) {
//       console.error("PDF generation error:", error);
//       alert("Failed to generate PDF: " + error.message);
//     }
//   };

//   // Fallback for missing data
//   if (!booking || !qrCode) {
//     return (
//       <div className={styles.ticketContainer}>
//         <div className={styles.error}>
//           <p>
//             Error: Unable to display ticket.{" "}
//             {booking ? "QR code missing." : "Booking data missing."}
//           </p>
//           <div className={styles.buttonContainer}>
//             <button
//               className={styles.closeBtn}
//               onClick={() => {
//                 console.log("Close button clicked");
//                 onClose();
//               }}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Handle gate as object or string
//   const gateDisplay =
//     booking.flight?.gate?.gateNumber || booking.flight?.gate || "N/A";

//   return (
//     <div className={styles.ticketContainer}>
//       <div ref={ticketRef} className={styles.ticket}>
//         <div className={styles.header}>
//           <h1>
//             {booking.flight?.airline?.name || "Aero-Vision"} Boarding Pass
//           </h1>
//         </div>
//         <div className={styles.logo}>
//           <img
//             src="/Uploads/aero-vision-logo.png"
//             alt="Aero-Vision Logo"
//             crossOrigin="anonymous"
//             onError={(e) => console.error("Logo load error:", e)}
//           />
//         </div>
//         <div className={styles.qr}>
//           <img
//             src={qrCode}
//             alt="QR Code"
//             crossOrigin="anonymous"
//             onError={(e) => console.error("QR code load error:", e)}
//           />
//           <p>Scan to Verify</p>
//         </div>
//         <div className={styles.section}>
//           <h2>Flight Details</h2>
//           <table className={styles.table}>
//             <tbody>
//               <tr>
//                 <td>Flight Number</td>
//                 <td>{booking.flight?.flightNumber || "N/A"}</td>
//               </tr>
//               <tr>
//                 <td>Airline</td>
//                 <td>{booking.flight?.airline?.name || "Aero-Vision"}</td>
//               </tr>
//               <tr>
//                 <td>From</td>
//                 <td>{booking.flight?.from || "N/A"}</td>
//               </tr>
//               <tr>
//                 <td>To</td>
//                 <td>{booking.flight?.to || "N/A"}</td>
//               </tr>
//               <tr>
//                 <td>Departure</td>
//                 <td>
//                   {booking.flight?.departure
//                     ? new Date(booking.flight.departure).toLocaleString()
//                     : "N/A"}
//                 </td>
//               </tr>
//               <tr>
//                 <td>Gate</td>
//                 <td>{gateDisplay}</td>
//               </tr>
//               <tr>
//                 <td>Baggage Allowance</td>
//                 <td>{booking.flight?.baggageAllowance || "N/A"}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//         <div className={styles.section}>
//           <h2>Passenger Details</h2>
//           <table className={styles.table}>
//             <tbody>
//               {booking.passengers?.map((p, i) => (
//                 <React.Fragment key={i}>
//                   <tr>
//                     <td>Name</td>
//                     <td>{p.name || "N/A"}</td>
//                   </tr>
//                   <tr>
//                     <td>DOB</td>
//                     <td>
//                       {p.dob ? new Date(p.dob).toLocaleDateString() : "N/A"}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>Gender</td>
//                     <td>{p.gender || "N/A"}</td>
//                   </tr>
//                 </React.Fragment>
//               )) || (
//                 <tr>
//                   <td colSpan="2">No passenger data available</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//         <div className={styles.section}>
//           <h2>Booking Details</h2>
//           <table className={styles.table}>
//             <tbody>
//               <tr>
//                 <td>Seats</td>
//                 <td>{booking.seats?.join(", ") || "N/A"}</td>
//               </tr>
//               <tr>
//                 <td>Total Paid</td>
//                 <td>Rs.{Number(booking.totalPrice || 0).toFixed(2)}</td>
//               </tr>
//               <tr>
//                 <td>Status</td>
//                 <td>{booking.status || "N/A"}</td>
//               </tr>
//               <tr>
//                 <td>Booking Date</td>
//                 <td>
//                   {booking.createdAt
//                     ? new Date(booking.createdAt).toLocaleString()
//                     : "N/A"}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//         <div className={styles.footer}>
//           <p>Embark on a Timeless Journey with Aero-Vision</p>
//         </div>
//         <div className={styles.stub}>
//           <p>Boarding Pass Stub</p>
//           <p>
//             {booking.flight?.flightNumber || "N/A"} |{" "}
//             {booking.seats?.join(", ") || "N/A"}
//           </p>
//         </div>
//       </div>
//       <div className={styles.buttonContainer}>
//         <button
//           className={styles.downloadBtn}
//           onClick={() => {
//             console.log("Download button clicked");
//             downloadPDF();
//           }}
//           disabled={!imagesLoaded}
//         >
//           Download Ticket
//         </button>
//         <button
//           className={styles.closeBtn}
//           onClick={() => {
//             console.log("Close button clicked");
//             onClose();
//           }}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import styles from "./Ticket.module.css";

const Ticket = React.forwardRef(({ booking, qrCode, onClose }, ref) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images for PDF
  useEffect(() => {
    console.log("Ticket Component Props:", { booking, qrCode });
    const preloadImages = async () => {
      try {
        const logo = new Image();
        logo.src = "/Uploads/aero-vision-logo.png";
        logo.crossOrigin = "anonymous";
        const qr = new Image();
        qr.src = qrCode;
        qr.crossOrigin = "anonymous";

        await Promise.all([
          new Promise((resolve, reject) => {
            logo.onload = resolve;
            logo.onerror = () => reject(new Error("Logo load failed"));
          }),
          new Promise((resolve, reject) => {
            qr.onload = resolve;
            qr.onerror = () => reject(new Error("QR code load failed"));
          }),
        ]);
        console.log("Images preloaded successfully");
        setImagesLoaded(true);
      } catch (error) {
        console.error("Image preload error:", error);
        setImagesLoaded(true); // Proceed to avoid blocking
      }
    };
    preloadImages();
  }, [qrCode]);

  // Fallback for missing data
  if (!booking || !qrCode) {
    return (
      <div className={styles.ticketContainer}>
        <div className={styles.error}>
          <p>
            Error: Unable to display ticket.{" "}
            {booking ? "QR code missing." : "Booking data missing."}
          </p>
          <div className={styles.buttonContainer}>
            <button
              className={styles.closeBtn}
              onClick={() => {
                console.log("Close button clicked");
                onClose();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle gate as object or string
  const gateDisplay =
    booking.flight?.gate?.gateNumber || booking.flight?.gate || "N/A";

  return (
    <div className={styles.ticketContainer}>
      <div ref={ref} className={styles.ticket}>
        <div className={styles.header}>
          <h1>
            {booking.flight?.airline?.name || "Aero-Vision"} Boarding Pass
          </h1>
        </div>
        <div className={styles.logo}>
          <img
            src="/Uploads/aero-vision-logo.png"
            alt="Aero-Vision Logo"
            crossOrigin="anonymous"
            onError={(e) => console.error("Logo load error:", e)}
          />
        </div>
        <div className={styles.qr}>
          <img
            src={qrCode}
            alt="QR Code"
            crossOrigin="anonymous"
            onError={(e) => console.error("QR code load error:", e)}
          />
          <p>Scan to Verify</p>
        </div>
        <div className={styles.section}>
          <h2>Flight Details</h2>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>Flight Number</td>
                <td>{booking.flight?.flightNumber || "N/A"}</td>
              </tr>
              <tr>
                <td>Airline</td>
                <td>{booking.flight?.airline?.name || "Aero-Vision"}</td>
              </tr>
              <tr>
                <td>From</td>
                <td>{booking.flight?.from || "N/A"}</td>
              </tr>
              <tr>
                <td>To</td>
                <td>{booking.flight?.to || "N/A"}</td>
              </tr>
              <tr>
                <td>Departure</td>
                <td>
                  {booking.flight?.departure
                    ? new Date(booking.flight.departure).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Gate</td>
                <td>{gateDisplay}</td>
              </tr>
              <tr>
                <td>Baggage Allowance</td>
                <td>{booking.flight?.baggageAllowance || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.section}>
          <h2>Passenger Details</h2>
          <table className={styles.table}>
            <tbody>
              {booking.passengers?.map((p, i) => (
                <React.Fragment key={i}>
                  <tr>
                    <td>Name</td>
                    <td>{p.name || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>DOB</td>
                    <td>
                      {p.dob ? new Date(p.dob).toLocaleDateString() : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{p.gender || "N/A"}</td>
                  </tr>
                </React.Fragment>
              )) || (
                <tr>
                  <td colSpan="2">No passenger data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={styles.section}>
          <h2>Booking Details</h2>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>Seats</td>
                <td>{booking.seats?.join(", ") || "N/A"}</td>
              </tr>
              <tr>
                <td>Total Paid</td>
                <td>Rs.{Number(booking.totalPrice || 0).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{booking.status || "N/A"}</td>
              </tr>
              <tr>
                <td>Booking Date</td>
                <td>
                  {booking.createdAt
                    ? new Date(booking.createdAt).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.footer}>
          <p>Embark on a Timeless Journey with Aero-Vision</p>
        </div>
        <div className={styles.stub}>
          <p>Boarding Pass Stub</p>
          <p>
            {booking.flight?.flightNumber || "N/A"} |{" "}
            {booking.seats?.join(", ") || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
});

Ticket.displayName = "Ticket";

export default Ticket;
