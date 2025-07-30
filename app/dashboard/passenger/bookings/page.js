// "use client";
// import React, { useState, useEffect } from "react";
// import Sidebar from "../Sidebar";
// import "./bookings.css";
// import "../passenger.css";
// import { useSearchParams } from "next/navigation";
// import { MdAirlineSeatReclineNormal } from "react-icons/md";

// const allSeats = Array.from({ length: 30 }, (_, i) => `S${i + 1}`);

// const BookingsPage = () => {
//   const searchParams = useSearchParams();

//   const [flightData, setFlightData] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     aadhar: null,
//   });
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   useEffect(() => {
//     const airline = searchParams.get("airline");
//     const from = searchParams.get("from");
//     const to = searchParams.get("to");
//     const time = searchParams.get("time");
//     const price = searchParams.get("price");
//     const type = searchParams.get("type");

//     if (airline && from && to && time && price && type) {
//       setFlightData({ airline, from, to, time, price, type });
//     }
//   }, [searchParams]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, aadhar: e.target.files[0] }));
//   };

//   const toggleSeat = (seat) => {
//     if (selectedSeats.includes(seat)) {
//       setSelectedSeats(selectedSeats.filter((s) => s !== seat));
//     } else if (selectedSeats.length < 6) {
//       setSelectedSeats([...selectedSeats, seat]);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (
//       !formData.name ||
//       !formData.email ||
//       !formData.phone ||
//       !formData.aadhar
//     ) {
//       alert("Please fill all fields and upload document.");
//       return;
//     }
//     if (selectedSeats.length === 0) {
//       alert("Please select at least one seat.");
//       return;
//     }
//     alert("✅ Booking Confirmed for " + flightData.airline);
//   };

//   return (
//     <div className="passenger-dashboard-new-container">
//       <Sidebar />
//       <div className="passenger-dashboard-main-bright bookings-container">
//         {flightData ? (
//           <>
//             {/* LEFT FORM SECTION */}
//             <div className="booking-form-section">
//               <h2>🛫 {flightData.airline} Booking</h2>
//               <div className="flight-info-box">
//                 <p>
//                   <strong>From:</strong> {flightData.from} <br />
//                   <strong>To:</strong> {flightData.to} <br />
//                   <strong>Time:</strong> {flightData.time} <br />
//                   <strong>Price:</strong> {flightData.price}
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Full Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Phone Number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />
//                 <label className="upload-label">Upload Aadhar / ID:</label>
//                 <input type="file" onChange={handleFileChange} />
//                 <button type="submit" className="submit-booking-btn">
//                   Confirm Booking
//                 </button>
//               </form>
//             </div>

//             {/* RIGHT SEAT SECTION */}
//             <div className="booking-seat-section">
//               <h2>🪑 Select Your Seats</h2>
//               <div className="seat-grid">
//                 {allSeats.map((seat) => (
//                   <button
//                     key={seat}
//                     className={`seat ${
//                       selectedSeats.includes(seat) ? "selected" : ""
//                     }`}
//                     onClick={() => toggleSeat(seat)}
//                     disabled={
//                       !selectedSeats.includes(seat) && selectedSeats.length >= 6
//                     }
//                   >
//                     <MdAirlineSeatReclineNormal size={18} /> {seat}
//                   </button>
//                 ))}
//               </div>
//               <p className="selected-seats-text">
//                 Selected: {selectedSeats.join(", ") || "None"} (Max 6)
//               </p>
//             </div>
//           </>
//         ) : (
//           <div className="booking-form-section">
//             <h2>📄 Your Previous Bookings</h2>
//             <div className="previous-bookings-list">
//               <div className="booking-card">
//                 <div className="booking-logo">
//                   <img src="/images/airindia.png" alt="Air India" />
//                 </div>
//                 <div className="booking-info">
//                   <h3>Air India</h3>
//                   <p>Delhi ✈ Bangalore</p>
//                   <p>
//                     Seats: <strong>S2, S3</strong>
//                   </p>
//                   <span className="booking-status completed">Completed</span>
//                 </div>
//                 <div className="booking-actions">
//                   <button className="booking-action-btn">View Ticket</button>
//                   <button className="booking-action-btn danger">Cancel</button>
//                 </div>
//               </div>

//               <div className="booking-card">
//                 <div className="booking-logo">
//                   <img src="/images/indigologo.png" alt="IndiGo" />
//                 </div>
//                 <div className="booking-info">
//                   <h3>IndiGo</h3>
//                   <p>Mumbai ✈ Dubai</p>
//                   <p>
//                     Seats: <strong>S10</strong>
//                   </p>
//                   <span className="booking-status upcoming">Upcoming</span>
//                 </div>
//                 <div className="booking-actions">
//                   <button className="booking-action-btn">View Ticket</button>
//                   <button className="booking-action-btn danger">Cancel</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingsPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import Sidebar from "../Sidebar";
// import "./bookings.css";
// import "../passenger.css";
// import { useSearchParams } from "next/navigation";
// import { MdAirlineSeatReclineNormal } from "react-icons/md";

// const allSeats = Array.from({ length: 30 }, (_, i) => `S${i + 1}`);

// const BookingsPage = () => {
//   const searchParams = useSearchParams();

//   const [flightData, setFlightData] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     aadhar: null,
//   });
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [showTicket, setShowTicket] = useState(false);
//   const [cancelPopup, setCancelPopup] = useState(false);

//   useEffect(() => {
//     const airline = searchParams.get("airline");
//     const from = searchParams.get("from");
//     const to = searchParams.get("to");
//     const time = searchParams.get("time");
//     const price = searchParams.get("price");
//     const type = searchParams.get("type");

//     if (airline && from && to && time && price && type) {
//       setFlightData({ airline, from, to, time, price, type });
//     }
//   }, [searchParams]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, aadhar: e.target.files[0] }));
//   };

//   const toggleSeat = (seat) => {
//     if (selectedSeats.includes(seat)) {
//       setSelectedSeats(selectedSeats.filter((s) => s !== seat));
//     } else if (selectedSeats.length < 6) {
//       setSelectedSeats([...selectedSeats, seat]);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (
//       !formData.name ||
//       !formData.email ||
//       !formData.phone ||
//       !formData.aadhar
//     ) {
//       alert("Please fill all fields and upload document.");
//       return;
//     }
//     if (selectedSeats.length === 0) {
//       alert("Please select at least one seat.");
//       return;
//     }
//     setShowPaymentModal(true);
//   };

//   return (
//     <div className="passenger-dashboard-new-container">
//       <Sidebar />
//       <div className="passenger-dashboard-main-bright bookings-container">
//         {flightData ? (
//           <>
//             {/* LEFT FORM SECTION */}
//             <div className="booking-form-section">
//               <h2>🛫 {flightData.airline} Booking</h2>
//               <div className="flight-info-box">
//                 <p>
//                   <strong>From:</strong> {flightData.from} <br />
//                   <strong>To:</strong> {flightData.to} <br />
//                   <strong>Time:</strong> {flightData.time} <br />
//                   <strong>Price:</strong> {flightData.price}
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Full Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Phone Number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />
//                 <label className="upload-label">Upload Aadhar / ID:</label>
//                 <input type="file" onChange={handleFileChange} />
//                 <button type="submit" className="submit-booking-btn">
//                   Confirm Booking
//                 </button>
//               </form>
//             </div>

//             {/* RIGHT SEAT SECTION */}
//             <div className="booking-seat-section">
//               <h2>🪑 Select Your Seats</h2>
//               <div className="seat-grid">
//                 {allSeats.map((seat) => (
//                   <button
//                     key={seat}
//                     className={`seat ${
//                       selectedSeats.includes(seat) ? "selected" : ""
//                     }`}
//                     onClick={() => toggleSeat(seat)}
//                     disabled={
//                       !selectedSeats.includes(seat) && selectedSeats.length >= 6
//                     }
//                   >
//                     <MdAirlineSeatReclineNormal size={18} /> {seat}
//                   </button>
//                 ))}
//               </div>
//               <p className="selected-seats-text">
//                 Selected: {selectedSeats.join(", ") || "None"} (Max 6)
//               </p>
//             </div>
//           </>
//         ) : (
//           <div className="booking-form-section">
//             <h2>📄 Your Previous Bookings</h2>
//             <div className="previous-bookings-list">
//               <div className="booking-card">
//                 <div className="booking-logo">
//                   <img src="/images/airindia.png" alt="Air India" />
//                 </div>
//                 <div className="booking-info">
//                   <h3>Air India</h3>
//                   <p>Delhi ✈ Bangalore</p>
//                   <p>
//                     Seats: <strong>S2, S3</strong>
//                   </p>
//                   <span className="booking-status completed">Completed</span>
//                 </div>
//                 <div className="booking-actions">
//                   <button
//                     className="booking-action-btn"
//                     onClick={() => setShowTicket(true)}
//                   >
//                     View Ticket
//                   </button>
//                   <button
//                     className="booking-action-btn danger"
//                     onClick={() => setCancelPopup(true)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>

//               <div className="booking-card">
//                 <div className="booking-logo">
//                   <img src="/images/indigologo.png" alt="IndiGo" />
//                 </div>
//                 <div className="booking-info">
//                   <h3>IndiGo</h3>
//                   <p>Mumbai ✈ Dubai</p>
//                   <p>
//                     Seats: <strong>S10</strong>
//                   </p>
//                   <span className="booking-status upcoming">Upcoming</span>
//                 </div>
//                 <div className="booking-actions">
//                   <button
//                     className="booking-action-btn"
//                     onClick={() => setShowTicket(true)}
//                   >
//                     View Ticket
//                   </button>
//                   <button
//                     className="booking-action-btn danger"
//                     onClick={() => setCancelPopup(true)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Payment Modal */}
//         {showPaymentModal && (
//           <div className="custom-modal">
//             <div className="modal-box">
//               <h3>💳 Payment Gateway</h3>
//               <p>
//                 Total Amount: <strong>{flightData.price}</strong>
//               </p>
//               <p>
//                 Confirm payment for <strong>{selectedSeats.length}</strong>{" "}
//                 seat(s)?
//               </p>
//               <button
//                 onClick={() => {
//                   setShowPaymentModal(false);
//                   alert("✅ Booking confirmed!");
//                 }}
//               >
//                 Pay Now
//               </button>
//               <button
//                 className="danger"
//                 onClick={() => setShowPaymentModal(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         {/* View Ticket */}
//         {showTicket && (
//           <div className="custom-modal">
//             <div className="modal-box ticket-modal">
//               <h3>🎫 Flight Ticket</h3>
//               <p>
//                 <strong>Passenger:</strong> Sarjil Sheth
//               </p>
//               <p>
//                 <strong>Flight:</strong> Air India
//               </p>
//               <p>
//                 <strong>From:</strong> Delhi → <strong>To:</strong> Bangalore
//               </p>
//               <p>
//                 <strong>Time:</strong> 10:30 AM
//               </p>
//               <p>
//                 <strong>Seats:</strong> S2, S3
//               </p>
//               <button onClick={() => setShowTicket(false)}>Close</button>
//             </div>
//           </div>
//         )}

//         {/* Cancel Popup */}
//         {cancelPopup && (
//           <div className="custom-modal">
//             <div className="modal-box">
//               <h3>❌ Cancel Booking?</h3>
//               <p>This action cannot be undone. Are you sure?</p>
//               <button
//                 className="danger"
//                 onClick={() => {
//                   alert("Booking cancelled!");
//                   setCancelPopup(false);
//                 }}
//               >
//                 Yes, Cancel
//               </button>
//               <button onClick={() => setCancelPopup(false)}>No</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingsPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import Sidebar from "../Sidebar";
// import "./bookings.css";
// import "../passenger.css";
// import { useSearchParams, useRouter } from "next/navigation";
// import { FaPlane } from "react-icons/fa";

// const allSeats = Array.from({ length: 30 }, (_, i) => `A${i + 1}`);

// const BookingsPage = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [flightData, setFlightData] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [formData, setFormData] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [bookedSeats, setBookedSeats] = useState([]);
//   const [paymentDetails, setPaymentDetails] = useState({
//     cardNumber: "",
//     expiry: "",
//     cvv: "",
//   });
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [showTicket, setShowTicket] = useState(null);
//   const [cancelPopup, setCancelPopup] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         setLoading(true);
//         const tokenResponse = await fetch("/api/get-token", {
//           method: "GET",
//           credentials: "include",
//         });
//         if (!tokenResponse.ok) throw new Error("Not authenticated");
//         const { token } = await tokenResponse.json();
//         if (!token) throw new Error("No token found");

//         const response = await fetch("/api/passenger/bookings", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           credentials: "include",
//         });
//         if (!response.ok) {
//           const data = await response.json();
//           throw new Error(data.error || "Failed to fetch bookings");
//         }
//         const data = await response.json();
//         console.log(
//           "Fetched bookings:",
//           JSON.stringify(data.bookings, null, 2)
//         );
//         setBookings(data.bookings);

//         if (searchParams.get("flightNumber")) {
//           const flightId = searchParams.get("flightId");
//           const seatsResponse = await fetch(
//             `/api/passenger/bookings/seats/${flightId}`,
//             {
//               method: "GET",
//               headers: { Authorization: `Bearer ${token}` },
//               credentials: "include",
//             }
//           );
//           if (seatsResponse.ok) {
//             const seatsData = await seatsResponse.json();
//             setBookedSeats(seatsData.bookedSeats);
//           }
//         }
//       } catch (err) {
//         setError(err.message || "Unable to load bookings");
//         console.error("Fetch bookings error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();

//     const flightId = searchParams.get("flightId");
//     const flightNumber = searchParams.get("flightNumber");
//     const airline = searchParams.get("airline");
//     const from = searchParams.get("from");
//     const to = searchParams.get("to");
//     const departure = searchParams.get("departure");
//     const status = searchParams.get("status");
//     const type = searchParams.get("type");
//     const price = searchParams.get("price")?.replace("₹", "");
//     const baggageAllowance = searchParams.get("baggageAllowance");
//     const gate = searchParams.get("gate");

//     if (
//       flightId &&
//       flightNumber &&
//       airline &&
//       from &&
//       to &&
//       departure &&
//       price
//     ) {
//       setFlightData({
//         flightId,
//         flightNumber,
//         airline,
//         from,
//         to,
//         departure,
//         status,
//         type,
//         price: parseFloat(price),
//         baggageAllowance,
//         gate,
//       });
//     }
//   }, [searchParams]);

//   const handlePassengerChange = (index, field, value) => {
//     setFormData((prev) => {
//       const newFormData = [...prev];
//       newFormData[index] = { ...newFormData[index], [field]: value };
//       return newFormData;
//     });
//   };

//   const handleFileChange = (index, file) => {
//     setFormData((prev) => {
//       const newFormData = [...prev];
//       newFormData[index] = { ...newFormData[index], document: file };
//       return newFormData;
//     });
//   };

//   const handlePaymentChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   const toggleSeat = (seat) => {
//     if (bookedSeats.includes(seat)) return;
//     if (selectedSeats.includes(seat)) {
//       setSelectedSeats(selectedSeats.filter((s) => s !== seat));
//       setFormData(formData.slice(0, -1));
//     } else if (selectedSeats.length < 5) {
//       setSelectedSeats([...selectedSeats, seat]);
//       setFormData([
//         ...formData,
//         { name: "", dob: "", gender: "", document: null },
//       ]);
//     }
//   };

//   const validateForm = () => {
//     if (selectedSeats.length < 1) {
//       setError("Please select at least one seat");
//       return false;
//     }
//     for (let i = 0; i < formData.length; i++) {
//       const { name, dob, gender, document } = formData[i];
//       if (!name?.trim() || !dob || !gender || !document) {
//         setError(`Please fill all fields for passenger ${i + 1}`);
//         return false;
//       }
//       if (new Date(dob) >= new Date()) {
//         setError(`Invalid date of birth for passenger ${i + 1}`);
//         return false;
//       }
//     }
//     // Fake payment: accept any non-empty input
//     if (
//       !paymentDetails.cardNumber ||
//       !paymentDetails.expiry ||
//       !paymentDetails.cvv
//     ) {
//       setError("Please fill all payment fields");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (!validateForm()) return;

//     try {
//       const tokenResponse = await fetch("/api/get-token", {
//         method: "GET",
//         credentials: "include",
//       });
//       if (!tokenResponse.ok) throw new Error("Not authenticated");
//       const { token } = await tokenResponse.json();
//       if (!token) throw new Error("No token found");

//       const formDataToSend = new FormData();
//       formDataToSend.append("flightId", flightData.flightId);
//       formDataToSend.append("seats", JSON.stringify(selectedSeats));
//       formDataToSend.append("passengers", JSON.stringify(formData));
//       formDataToSend.append(
//         "totalPrice",
//         flightData.price * selectedSeats.length
//       );
//       formData.forEach((passenger, index) => {
//         formDataToSend.append(`document${index}`, passenger.document);
//       });

//       const response = await fetch("/api/passenger/bookings", {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         credentials: "include",
//         body: formDataToSend,
//       });
//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.error || "Failed to create booking");
//       }
//       setShowPaymentModal(true);
//     } catch (err) {
//       setError(err.message || "Unable to create booking");
//       console.error("Booking error:", err);
//     }
//   };

//   const handleCancelBooking = async (bookingId) => {
//     try {
//       const tokenResponse = await fetch("/api/get-token", {
//         method: "GET",
//         credentials: "include",
//       });
//       if (!tokenResponse.ok) throw new Error("Not authenticated");
//       const { token } = await tokenResponse.json();
//       if (!token) throw new Error("No token found");

//       const response = await fetch("/api/passenger/bookings", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//         body: JSON.stringify({ bookingId }),
//       });
//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.error || "Failed to cancel booking");
//       }
//       alert("Booking deleted!");
//       setBookings(bookings.filter((b) => b._id !== bookingId));
//       setCancelPopup(null);
//     } catch (err) {
//       setError(err.message || "Unable to delete booking");
//       console.error("Cancel booking error:", err);
//     }
//   };

//   const handleDownloadTickets = async (flightId) => {
//     try {
//       const response = await fetch("/api/passenger/bookings/ticket", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ flightId }),
//       });
//       const data = await response.json();
//       if (data.error) {
//         alert(data.error + ": " + data.details);
//         return;
//       }
//       const link = document.createElement("a");
//       link.href = `data:application/pdf;base64,${data.pdfBase64}`;
//       link.download = `flight_tickets_${flightId}.pdf`;
//       link.click();
//     } catch (error) {
//       console.error("Error downloading tickets:", error);
//       alert("Failed to download tickets");
//     }
//   };

//   // Example button for flight S125R
//   <button onClick={() => handleDownloadTickets("6884aa51c63e498cd472f1ec")}>
//     Download All Tickets for Flight S125R
//   </button>;

//   return (
//     <div className="passenger-dashboard-new-container">
//       <Sidebar />
//       <div className="passenger-dashboard-main-bright bookings-container">
//         {loading ? (
//           <p className="loading-text">Loading bookings...</p>
//         ) : error ? (
//           <p className="error-text">{error}</p>
//         ) : flightData ? (
//           <>
//             <div className="booking-form-section">
//               <h2 className="section-title">🛫 {flightData.airline} Booking</h2>
//               <div className="flight-info-box">
//                 <p>
//                   <strong>Flight:</strong> {flightData.flightNumber} <br />
//                   <strong>From:</strong> {flightData.from} <br />
//                   <strong>To:</strong> {flightData.to} <br />
//                   <strong>Departure:</strong>{" "}
//                   {new Date(flightData.departure).toLocaleString()} <br />
//                   <strong>Price per Seat:</strong> ₹{flightData.price} <br />
//                   <strong>Total:</strong> ₹
//                   {flightData.price * selectedSeats.length} <br />
//                   <strong>Baggage:</strong> {flightData.baggageAllowance} <br />
//                   <strong>Gate:</strong> {flightData.gate}
//                 </p>
//               </div>

//               {selectedSeats.length > 0 && (
//                 <form onSubmit={handleSubmit}>
//                   {formData.map((passenger, index) => (
//                     <div key={index} className="passenger-form">
//                       <h3>Passenger {index + 1}</h3>
//                       <input
//                         type="text"
//                         placeholder="Full Name"
//                         value={passenger.name}
//                         onChange={(e) =>
//                           handlePassengerChange(index, "name", e.target.value)
//                         }
//                         required
//                       />
//                       <input
//                         type="date"
//                         placeholder="Date of Birth"
//                         value={passenger.dob}
//                         onChange={(e) =>
//                           handlePassengerChange(index, "dob", e.target.value)
//                         }
//                         required
//                       />
//                       <select
//                         value={passenger.gender}
//                         onChange={(e) =>
//                           handlePassengerChange(index, "gender", e.target.value)
//                         }
//                         required
//                       >
//                         <option value="">Select Gender</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                       </select>
//                       <label className="upload-label">
//                         Upload ID (Aadhar/Passport):
//                       </label>
//                       <input
//                         type="file"
//                         onChange={(e) =>
//                           handleFileChange(index, e.target.files[0])
//                         }
//                         required
//                       />
//                     </div>
//                   ))}
//                   <div className="payment-form">
//                     <h3>💳 Payment Details (Fake)</h3>
//                     <input
//                       type="text"
//                       name="cardNumber"
//                       placeholder="Card Number (Any)"
//                       value={paymentDetails.cardNumber}
//                       onChange={handlePaymentChange}
//                       required
//                     />
//                     <input
//                       type="text"
//                       name="expiry"
//                       placeholder="MM/YY (Any)"
//                       value={paymentDetails.expiry}
//                       onChange={handlePaymentChange}
//                       required
//                     />
//                     <input
//                       type="text"
//                       name="cvv"
//                       placeholder="CVV (Any)"
//                       value={paymentDetails.cvv}
//                       onChange={handlePaymentChange}
//                       required
//                     />
//                   </div>
//                   <button type="submit" className="submit-booking-btn">
//                     Confirm Booking
//                   </button>
//                 </form>
//               )}
//             </div>

//             <div className="booking-seat-section">
//               <h2 className="section-title">🪑 Select Your Seats (1-5)</h2>
//               <div className="seat-grid">
//                 {allSeats.map((seat) => (
//                   <button
//                     key={seat}
//                     className={`seat ${
//                       selectedSeats.includes(seat) ? "selected" : ""
//                     } ${bookedSeats.includes(seat) ? "booked" : ""}`}
//                     onClick={() => toggleSeat(seat)}
//                     disabled={
//                       bookedSeats.includes(seat) ||
//                       (selectedSeats.length >= 5 &&
//                         !selectedSeats.includes(seat))
//                     }
//                   >
//                     <FaPlane size={18} /> {seat}
//                   </button>
//                 ))}
//               </div>
//               <p className="selected-seats-text">
//                 Selected: {selectedSeats.join(", ") || "None"} (Max 5)
//               </p>
//             </div>
//           </>
//         ) : bookings.length === 0 ? (
//           <div className="booking-form-section">
//             <h2 className="section-title">📄 Your Bookings</h2>
//             <p className="no-bookings">No bookings found.</p>
//           </div>
//         ) : (
//           <div className="booking-form-section">
//             <h2 className="section-title">📄 Your Previous Bookings</h2>
//             <div className="previous-bookings-list">
//               {bookings.map((booking) => (
//                 <div key={booking._id} className="booking-card">
//                   <div className="booking-logo">
//                     <img
//                       src={booking.flight.airline.logo}
//                       alt={booking.flight.airline.name}
//                     />
//                   </div>
//                   <div className="booking-info">
//                     <h3>{booking.flight.airline.name}</h3>
//                     <p>Flight: {booking.flight.flightNumber}</p>
//                     <p>
//                       {booking.flight.from} ✈ {booking.flight.to}
//                     </p>
//                     <p>
//                       <strong>Seats:</strong> {booking.seats.join(", ")}
//                     </p>
//                     <span
//                       className={`booking-status ${booking.status.toLowerCase()}`}
//                     >
//                       {booking.status}
//                     </span>
//                   </div>
//                   <div className="booking-actions">
//                     <button
//                       className="booking-action-btn"
//                       onClick={() => setShowTicket(booking)}
//                     >
//                       View Ticket
//                     </button>
//                     {booking.status === "Confirmed" && (
//                       <button
//                         className="booking-action-btn danger"
//                         onClick={() => setCancelPopup(booking._id)}
//                       >
//                         Cancel
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {showPaymentModal && (
//           <div className="custom-modal">
//             <div className="modal-box">
//               <h3>💳 Payment Confirmation</h3>
//               <p>
//                 Total Amount:{" "}
//                 <strong>₹{flightData?.price * selectedSeats.length}</strong>
//               </p>
//               <p>
//                 Confirm payment for <strong>{selectedSeats.length}</strong>{" "}
//                 seat(s)?
//               </p>
//               <button
//                 onClick={async () => {
//                   setShowPaymentModal(false);
//                   alert("✅ Booking confirmed!");
//                   setFlightData(null);
//                   setSelectedSeats([]);
//                   setFormData([]);
//                   router.push("/dashboard/passenger/bookings");
//                   const tokenResponse = await fetch("/api/get-token", {
//                     credentials: "include",
//                   });
//                   const { token } = await tokenResponse.json();
//                   const response = await fetch("/api/passenger/bookings", {
//                     headers: { Authorization: `Bearer ${token}` },
//                     credentials: "include",
//                   });
//                   const data = await response.json();
//                   setBookings(data.bookings);
//                 }}
//               >
//                 Confirm Payment
//               </button>
//               <button
//                 className="danger"
//                 onClick={() => setShowPaymentModal(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         {showTicket && (
//           <div className="custom-modal">
//             <div className="modal-box ticket-modal">
//               <h3>🎫 Flight Ticket</h3>
//               <p>
//                 <strong>Flight:</strong> {showTicket.flight.flightNumber} (
//                 {showTicket.flight.airline.name})
//               </p>
//               <p>
//                 <strong>From:</strong> {showTicket.flight.from} →{" "}
//                 <strong>To:</strong> {showTicket.flight.to}
//               </p>
//               <p>
//                 <strong>Departure:</strong>{" "}
//                 {new Date(showTicket.flight.departure).toLocaleString()}
//               </p>
//               <p>
//                 <strong>Seats:</strong> {showTicket.seats.join(", ")}
//               </p>
//               <p>
//                 <strong>Passengers:</strong>
//                 <ul>
//                   {showTicket.passengers.map((p, i) => (
//                     <li key={i}>
//                       {p.name} ({p.gender}, DOB:{" "}
//                       {new Date(p.dob).toLocaleDateString()})
//                     </li>
//                   ))}
//                 </ul>
//               </p>
//               <p>
//                 <strong>Total Paid:</strong> ₹{showTicket.totalPrice}
//               </p>
//               <div className="ticket-actions">
//                 <button
//                   className="download-ticket-btn"
//                   onClick={() => handleDownloadTickets(showTicket)}
//                 >
//                   Download Ticket
//                 </button>
//                 <button onClick={() => setShowTicket(null)}>Close</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {cancelPopup && (
//           <div className="custom-modal">
//             <div className="modal-box">
//               <h3>❌ Delete Booking?</h3>
//               <p>This action cannot be undone. Are you sure?</p>
//               <button
//                 className="danger"
//                 onClick={() => handleCancelBooking(cancelPopup)}
//               >
//                 Yes, Delete
//               </button>
//               <button onClick={() => setCancelPopup(null)}>No</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingsPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import Sidebar from "../Sidebar";
// import "./bookings.css";
// import "../passenger.css";
// import { useSearchParams, useRouter } from "next/navigation";
// import { FaPlane } from "react-icons/fa";
// import Ticket from "@/components/Ticket";

// const allSeats = Array.from({ length: 30 }, (_, i) => `A${i + 1}`);

// const BookingsPage = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [flightData, setFlightData] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [formData, setFormData] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [bookedSeats, setBookedSeats] = useState([]);
//   const [paymentDetails, setPaymentDetails] = useState({
//     cardNumber: "",
//     expiry: "",
//     cvv: "",
//   });
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [showTicket, setShowTicket] = useState(null);
//   const [cancelPopup, setCancelPopup] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         setLoading(true);
//         const tokenResponse = await fetch("/api/get-token", {
//           method: "GET",
//           credentials: "include",
//         });
//         if (!tokenResponse.ok) throw new Error("Not authenticated");
//         const { token } = await tokenResponse.json();
//         if (!token) throw new Error("No token found");

//         const response = await fetch("/api/passenger/bookings", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           credentials: "include",
//         });
//         if (!response.ok) {
//           const data = await response.json();
//           throw new Error(data.error || "Failed to fetch bookings");
//         }
//         const data = await response.json();
//         console.log(
//           "Fetched bookings:",
//           JSON.stringify(data.bookings, null, 2)
//         );
//         setBookings(data.bookings);

//         if (searchParams.get("flightNumber")) {
//           const flightId = searchParams.get("flightId");
//           const seatsResponse = await fetch(
//             `/api/passenger/bookings/seats/${flightId}`,
//             {
//               method: "GET",
//               headers: { Authorization: `Bearer ${token}` },
//               credentials: "include",
//             }
//           );
//           if (seatsResponse.ok) {
//             const seatsData = await seatsResponse.json();
//             setBookedSeats(seatsData.bookedSeats);
//           }
//         }
//       } catch (err) {
//         setError(err.message || "Unable to load bookings");
//         console.error("Fetch bookings error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();

//     const flightId = searchParams.get("flightId");
//     const flightNumber = searchParams.get("flightNumber");
//     const airline = searchParams.get("airline");
//     const from = searchParams.get("from");
//     const to = searchParams.get("to");
//     const departure = searchParams.get("departure");
//     const status = searchParams.get("status");
//     const type = searchParams.get("type");
//     const price = searchParams.get("price")?.replace("₹", "");
//     const baggageAllowance = searchParams.get("baggageAllowance");
//     const gate = searchParams.get("gate");

//     if (
//       flightId &&
//       flightNumber &&
//       airline &&
//       from &&
//       to &&
//       departure &&
//       price
//     ) {
//       setFlightData({
//         flightId,
//         flightNumber,
//         airline,
//         from,
//         to,
//         departure,
//         status,
//         type,
//         price: parseFloat(price),
//         baggageAllowance,
//         gate,
//       });
//     }
//   }, [searchParams]);

//   const handlePassengerChange = (index, field, value) => {
//     setFormData((prev) => {
//       const newFormData = [...prev];
//       newFormData[index] = { ...newFormData[index], [field]: value };
//       return newFormData;
//     });
//   };

//   const handleFileChange = (index, file) => {
//     setFormData((prev) => {
//       const newFormData = [...prev];
//       newFormData[index] = { ...newFormData[index], document: file };
//       return newFormData;
//     });
//   };

//   const handlePaymentChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   const toggleSeat = (seat) => {
//     if (bookedSeats.includes(seat)) return;
//     if (selectedSeats.includes(seat)) {
//       setSelectedSeats(selectedSeats.filter((s) => s !== seat));
//       setFormData(formData.slice(0, -1));
//     } else if (selectedSeats.length < 5) {
//       setSelectedSeats([...selectedSeats, seat]);
//       setFormData([
//         ...formData,
//         { name: "", dob: "", gender: "", document: null },
//       ]);
//     }
//   };

//   const validateForm = () => {
//     if (selectedSeats.length < 1) {
//       setError("Please select at least one seat");
//       return false;
//     }
//     for (let i = 0; i < formData.length; i++) {
//       const { name, dob, gender, document } = formData[i];
//       if (!name?.trim() || !dob || !gender || !document) {
//         setError(`Please fill all fields for passenger ${i + 1}`);
//         return false;
//       }
//       if (new Date(dob) >= new Date()) {
//         setError(`Invalid date of birth for passenger ${i + 1}`);
//         return false;
//       }
//     }
//     if (
//       !paymentDetails.cardNumber ||
//       !paymentDetails.expiry ||
//       !paymentDetails.cvv
//     ) {
//       setError("Please fill all payment fields");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (!validateForm()) return;

//     try {
//       const tokenResponse = await fetch("/api/get-token", {
//         method: "GET",
//         credentials: "include",
//       });
//       if (!tokenResponse.ok) throw new Error("Not authenticated");
//       const { token } = await tokenResponse.json();
//       if (!token) throw new Error("No token found");

//       const formDataToSend = new FormData();
//       formDataToSend.append("flightId", flightData.flightId);
//       formDataToSend.append("seats", JSON.stringify(selectedSeats));
//       formDataToSend.append("passengers", JSON.stringify(formData));
//       formDataToSend.append(
//         "totalPrice",
//         flightData.price * selectedSeats.length
//       );
//       formData.forEach((passenger, index) => {
//         formDataToSend.append(`document${index}`, passenger.document);
//       });

//       const response = await fetch("/api/passenger/bookings", {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         credentials: "include",
//         body: formDataToSend,
//       });
//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.error || "Failed to create booking");
//       }
//       setShowPaymentModal(true);
//     } catch (err) {
//       setError(err.message || "Unable to create booking");
//       console.error("Booking error:", err);
//     }
//   };

//   const handleCancelBooking = async (bookingId) => {
//     try {
//       const tokenResponse = await fetch("/api/get-token", {
//         method: "GET",
//         credentials: "include",
//       });
//       if (!tokenResponse.ok) throw new Error("Not authenticated");
//       const { token } = await tokenResponse.json();
//       if (!token) throw new Error("No token found");

//       const response = await fetch("/api/passenger/bookings", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//         body: JSON.stringify({ bookingId }),
//       });
//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.error || "Failed to cancel booking");
//       }
//       alert("Booking deleted!");
//       setBookings(bookings.filter((b) => b._id !== bookingId));
//       setCancelPopup(null);
//     } catch (err) {
//       setError(err.message || "Unable to delete booking");
//       console.error("Cancel booking error:", err);
//     }
//   };

//   const handleDownloadTickets = async (flightId) => {
//     try {
//       if (!flightId || typeof flightId !== "string") {
//         alert("Invalid flight ID");
//         return;
//       }
//       const response = await fetch("/api/passenger/bookings/ticket", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ flightId }),
//       });
//       const data = await response.json();
//       if (data.error) {
//         alert(data.error + ": " + data.details);
//         return;
//       }
//       const link = document.createElement("a");
//       link.href = `data:application/pdf;base64,${data.pdfBase64}`;
//       link.download = `flight_tickets_${flightId}.pdf`;
//       link.click();
//     } catch (error) {
//       console.error("Error downloading tickets:", error);
//       alert("Failed to download tickets");
//     }
//   };

//   return (
//     <div className="passenger-dashboard-new-container">
//       <Sidebar />
//       <div className="passenger-dashboard-main-bright bookings-container">
//         {loading ? (
//           <p className="loading-text">Loading bookings...</p>
//         ) : error ? (
//           <p className="error-text">{error}</p>
//         ) : flightData ? (
//           <>
//             <div className="booking-form-section">
//               <h2 className="section-title">🛫 {flightData.airline} Booking</h2>
//               <div className="flight-info-box">
//                 <p>
//                   <strong>Flight:</strong> {flightData.flightNumber} <br />
//                   <strong>From:</strong> {flightData.from} <br />
//                   <strong>To:</strong> {flightData.to} <br />
//                   <strong>Departure:</strong>{" "}
//                   {new Date(flightData.departure).toLocaleString()} <br />
//                   <strong>Price per Seat:</strong> ₹{flightData.price} <br />
//                   <strong>Total:</strong> ₹
//                   {flightData.price * selectedSeats.length} <br />
//                   <strong>Baggage:</strong> {flightData.baggageAllowance} <br />
//                   <strong>Gate:</strong> {flightData.gate}
//                 </p>
//               </div>

//               {selectedSeats.length > 0 && (
//                 <form onSubmit={handleSubmit}>
//                   {formData.map((passenger, index) => (
//                     <div key={index} className="passenger-form">
//                       <h3>Passenger {index + 1}</h3>
//                       <input
//                         type="text"
//                         placeholder="Full Name"
//                         value={passenger.name}
//                         onChange={(e) =>
//                           handlePassengerChange(index, "name", e.target.value)
//                         }
//                         required
//                       />
//                       <input
//                         type="date"
//                         placeholder="Date of Birth"
//                         value={passenger.dob}
//                         onChange={(e) =>
//                           handlePassengerChange(index, "dob", e.target.value)
//                         }
//                         required
//                       />
//                       <select
//                         value={passenger.gender}
//                         onChange={(e) =>
//                           handlePassengerChange(index, "gender", e.target.value)
//                         }
//                         required
//                       >
//                         <option value="">Select Gender</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                       </select>
//                       <label className="upload-label">
//                         Upload ID (Aadhar/Passport):
//                       </label>
//                       <input
//                         type="file"
//                         onChange={(e) =>
//                           handleFileChange(index, e.target.files[0])
//                         }
//                         required
//                       />
//                     </div>
//                   ))}
//                   <div className="payment-form">
//                     <h3>💳 Payment Details (Fake)</h3>
//                     <input
//                       type="text"
//                       name="cardNumber"
//                       placeholder="Card Number (Any)"
//                       value={paymentDetails.cardNumber}
//                       onChange={handlePaymentChange}
//                       required
//                     />
//                     <input
//                       type="text"
//                       name="expiry"
//                       placeholder="MM/YY (Any)"
//                       value={paymentDetails.expiry}
//                       onChange={handlePaymentChange}
//                       required
//                     />
//                     <input
//                       type="text"
//                       name="cvv"
//                       placeholder="CVV (Any)"
//                       value={paymentDetails.cvv}
//                       onChange={handlePaymentChange}
//                       required
//                     />
//                   </div>
//                   <button type="submit" className="submit-booking-btn">
//                     Confirm Booking
//                   </button>
//                 </form>
//               )}
//             </div>

//             <div className="booking-seat-section">
//               <h2 className="section-title">🪑 Select Your Seats (1-5)</h2>
//               <div className="seat-grid">
//                 {allSeats.map((seat) => (
//                   <button
//                     key={seat}
//                     className={`seat ${
//                       selectedSeats.includes(seat) ? "selected" : ""
//                     } ${bookedSeats.includes(seat) ? "booked" : ""}`}
//                     onClick={() => toggleSeat(seat)}
//                     disabled={
//                       bookedSeats.includes(seat) ||
//                       (selectedSeats.length >= 5 &&
//                         !selectedSeats.includes(seat))
//                     }
//                   >
//                     <FaPlane size={18} /> {seat}
//                   </button>
//                 ))}
//               </div>
//               <p className="selected-seats-text">
//                 Selected: {selectedSeats.join(", ") || "None"} (Max 5)
//               </p>
//             </div>
//           </>
//         ) : bookings.length === 0 ? (
//           <div className="booking-form-section">
//             <h2 className="section-title">📄 Your Bookings</h2>
//             <p className="no-bookings">No bookings found.</p>
//           </div>
//         ) : (
//           <div className="booking-form-section">
//             <h2 className="section-title">📄 Your Previous Bookings</h2>
//             <div className="previous-bookings-list">
//               {bookings.map((booking) => (
//                 <div key={booking._id} className="booking-card">
//                   <div className="booking-logo">
//                     <img
//                       src={booking.flight.airline.logo}
//                       alt={booking.flight.airline.name}
//                     />
//                   </div>
//                   <div className="booking-info">
//                     <h3>{booking.flight.airline.name}</h3>
//                     <p>Flight: {booking.flight.flightNumber}</p>
//                     <p>
//                       {booking.flight.from} ✈ {booking.flight.to}
//                     </p>
//                     <p>
//                       <strong>Seats:</strong> {booking.seats.join(", ")}
//                     </p>
//                     <span
//                       className={`booking-status ${booking.status.toLowerCase()}`}
//                     >
//                       {booking.status}
//                     </span>
//                   </div>
//                   <div className="booking-actions">
//                     <button
//                       className="booking-action-btn"
//                       onClick={() => setShowTicket(booking)}
//                     >
//                       View Ticket
//                     </button>
//                     {booking.status === "Confirmed" && (
//                       <button
//                         className="booking-action-btn danger"
//                         onClick={() => setCancelPopup(booking._id)}
//                       >
//                         Cancel
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//               {/* Button for flight A1ZEX */}
//               <button
//                 onClick={() =>
//                   handleDownloadTickets("6884aa00c63e498cd472f1e1")
//                 }
//               >
//                 Download All Tickets for Flight A1ZEX
//               </button>
//             </div>
//           </div>
//         )}

//         {showPaymentModal && (
//           <div className="custom-modal">
//             <div className="modal-box">
//               <h3>💳 Payment Confirmation</h3>
//               <p>
//                 Total Amount:{" "}
//                 <strong>₹{flightData?.price * selectedSeats.length}</strong>
//               </p>
//               <p>
//                 Confirm payment for <strong>{selectedSeats.length}</strong>{" "}
//                 seat(s)?
//               </p>
//               <button
//                 onClick={async () => {
//                   setShowPaymentModal(false);
//                   alert("✅ Booking confirmed!");
//                   setFlightData(null);
//                   setSelectedSeats([]);
//                   setFormData([]);
//                   router.push("/dashboard/passenger/bookings");
//                   const tokenResponse = await fetch("/api/get-token", {
//                     credentials: "include",
//                   });
//                   const { token } = await tokenResponse.json();
//                   const response = await fetch("/api/passenger/bookings", {
//                     headers: { Authorization: `Bearer ${token}` },
//                     credentials: "include",
//                   });
//                   const data = await response.json();
//                   setBookings(data.bookings);
//                 }}
//               >
//                 Confirm Payment
//               </button>
//               <button
//                 className="danger"
//                 onClick={() => setShowPaymentModal(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         {showTicket && (
//           <div className="custom-modal">
//             <div className="modal-box ticket-modal">
//               <h3>🎫 Flight Ticket</h3>
//               <p>
//                 <strong>Flight:</strong> {showTicket.flight.flightNumber} (
//                 {showTicket.flight.airline.name})
//               </p>
//               <p>
//                 <strong>From:</strong> {showTicket.flight.from} →{" "}
//                 <strong>To:</strong> {showTicket.flight.to}
//               </p>
//               <p>
//                 <strong>Departure:</strong>{" "}
//                 {new Date(showTicket.flight.departure).toLocaleString()}
//               </p>
//               <p>
//                 <strong>Seats:</strong> {showTicket.seats.join(", ")}
//               </p>
//               <p>
//                 <strong>Passengers:</strong>
//                 <ul>
//                   {showTicket.passengers.map((p, i) => (
//                     <li key={i}>
//                       {p.name} ({p.gender}, DOB:{" "}
//                       {new Date(p.dob).toLocaleDateString()})
//                     </li>
//                   ))}
//                 </ul>
//               </p>
//               <p>
//                 <strong>Total Paid:</strong> ₹{showTicket.totalPrice}
//               </p>
//               <div className="ticket-actions">
//                 <button
//                   className="download-ticket-btn"
//                   onClick={() => handleDownloadTickets(showTicket.flight._id)}
//                 >
//                   Download Ticket
//                 </button>
//                 <button onClick={() => setShowTicket(null)}>Close</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {cancelPopup && (
//           <div className="custom-modal">
//             <div className="modal-box">
//               <h3>❌ Delete Booking?</h3>
//               <p>This action cannot be undone. Are you sure?</p>
//               <button
//                 className="danger"
//                 onClick={() => handleCancelBooking(cancelPopup)}
//               >
//                 Yes, Delete
//               </button>
//               <button onClick={() => setCancelPopup(null)}>No</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingsPage;
"use client";
import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../Sidebar";
import "./bookings.css";
import "../passenger.css";
import { useSearchParams, useRouter } from "next/navigation";
import { FaPlane } from "react-icons/fa";
import dynamic from "next/dynamic";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Dynamically import Ticket component with SSR disabled
const Ticket = dynamic(() => import("@/components/Ticket"), { ssr: false });

const allSeats = Array.from({ length: 30 }, (_, i) => `A${i + 1}`);

const PaymentForm = ({ flightData, selectedSeats, formData, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setPaymentError("");
    setPaymentLoading(true);

    try {
      // Create Payment Intent
      const response = await fetch("/api/stripe/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: flightData.price * selectedSeats.length,
          currency: "inr",
          flightId: flightData.flightId,
          seats: selectedSeats,
          passengers: formData,
        }),
      });
      const { clientSecret, error } = await response.json();
      if (error) throw new Error(error);

      // Confirm payment
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (confirmError) {
        setPaymentError(confirmError.message);
        setPaymentLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        await onSuccess(paymentIntent.id);
      } else {
        setPaymentError("Payment failed. Please try again.");
      }
    } catch (err) {
      setPaymentError(err.message || "Payment failed. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <form onSubmit={handlePaymentSubmit} className="payment-form">
      <h3>💳 Payment Details</h3>
      <div className="stripe-card-element">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#333",
                "::placeholder": { color: "#aaa" },
              },
              invalid: { color: "#dc3545" },
            },
          }}
        />
      </div>
      {paymentError && <p className="error-text">{paymentError}</p>}
      <button type="submit" className="submit-booking-btn" disabled={paymentLoading}>
        {paymentLoading ? "Processing..." : "Confirm Payment"}
      </button>
      <button type="button" className="danger" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

const BookingsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ticketRef = useRef();
  const [flightData, setFlightData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showTicket, setShowTicket] = useState(null);
  const [cancelPopup, setCancelPopup] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const tokenResponse = await fetch("/api/get-token", {
          method: "GET",
          credentials: "include",
        });
        if (!tokenResponse.ok) throw new Error("Not authenticated");
        const { token } = await tokenResponse.json();
        if (!token) throw new Error("No token found");

        const response = await fetch("/api/passenger/bookings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to fetch bookings");
        }
        const data = await response.json();
        console.log("Fetched bookings:", JSON.stringify(data.bookings, null, 2));
        setBookings(data.bookings);

        if (searchParams.get("flightNumber")) {
          const flightId = searchParams.get("flightId");
          const seatsResponse = await fetch(`/api/passenger/bookings/seats/${flightId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
          });
          if (seatsResponse.ok) {
            const seatsData = await seatsResponse.json();
            setBookedSeats(seatsData.bookedSeats);
          }
        }
      } catch (err) {
        setError(err.message || "Unable to load bookings");
        console.error("Fetch bookings error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [searchParams]);

  useEffect(() => {
    const flightId = searchParams.get("flightId");
    const flightNumber = searchParams.get("flightNumber");
    const airline = searchParams.get("airline");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const departure = searchParams.get("departure");
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const price = searchParams.get("price")?.replace("₹", "");
    const baggageAllowance = searchParams.get("baggageAllowance");
    const gate = searchParams.get("gate");

    if (flightId && flightNumber && airline && from && to && departure && price) {
      setFlightData({
        flightId,
        flightNumber,
        airline: { name: airline }, // Adjusted for Ticket.js compatibility
        from,
        to,
        departure,
        status,
        type,
        price: parseFloat(price),
        baggageAllowance,
        gate,
      });
    }
  }, [searchParams]);

  useEffect(() => {
    if (showTicket && ticketRef.current) {
      console.log("ticketRef bound:", ticketRef.current);
    } else if (showTicket) {
      console.log("ticketRef not bound yet");
    }
  }, [showTicket]);

  const handlePassengerChange = (index, field, value) => {
    setFormData((prev) => {
      const newFormData = [...prev];
      newFormData[index] = { ...newFormData[index], [field]: value };
      return newFormData;
    });
  };

  const handleFileChange = (index, file) => {
    setFormData((prev) => {
      const newFormData = [...prev];
      newFormData[index] = { ...newFormData[index], document: file };
      return newFormData;
    });
  };

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      setFormData(formData.slice(0, -1));
    } else if (selectedSeats.length < 5) {
      setSelectedSeats([...selectedSeats, seat]);
      setFormData([
        ...formData,
        { name: "", dob: "", gender: "", document: null },
      ]);
    }
  };

  const validateForm = () => {
    if (selectedSeats.length < 1) {
      setError("Please select at least one seat");
      return false;
    }
    for (let i = 0; i < formData.length; i++) {
      const { name, dob, gender, document } = formData[i];
      if (!name?.trim() || !dob || !gender || !document) {
        setError(`Please fill all fields for passenger ${i + 1}`);
        return false;
      }
      if (new Date(dob) >= new Date()) {
        setError(`Invalid date of birth for passenger ${i + 1}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;
    setShowPaymentModal(true);
  };

  const handleConfirmBooking = async (paymentIntentId) => {
    try {
      const tokenResponse = await fetch("/api/get-token", {
        method: "GET",
        credentials: "include",
      });
      if (!tokenResponse.ok) throw new Error("Not authenticated");
      const { token } = await tokenResponse.json();
      if (!token) throw new Error("No token found");

      const formDataToSend = new FormData();
      formDataToSend.append("flightId", flightData.flightId);
      formDataToSend.append("seats", JSON.stringify(selectedSeats));
      formDataToSend.append("passengers", JSON.stringify(formData));
      formDataToSend.append("totalPrice", flightData.price * selectedSeats.length);
      formDataToSend.append("paymentIntentId", paymentIntentId);
      formData.forEach((passenger, index) => {
        formDataToSend.append(`document${index}`, passenger.document);
      });

      const response = await fetch("/api/passenger/bookings", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
        body: formDataToSend,
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create booking");
      }
      const data = await response.json();
      alert("✅ Booking confirmed!");
      setShowPaymentModal(false);
      setFlightData(null);
      setSelectedSeats([]);
      setFormData([]);
      router.push("/dashboard/passenger/bookings");
      const bookingsResponse = await fetch("/api/passenger/bookings", {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
      const bookingsData = await bookingsResponse.json();
      setBookings(bookingsData.bookings);
    } catch (err) {
      setError(err.message || "Unable to create booking");
      console.error("Booking error:", err);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const tokenResponse = await fetch("/api/get-token", {
        method: "GET",
        credentials: "include",
      });
      if (!tokenResponse.ok) throw new Error("Not authenticated");
      const { token } = await tokenResponse.json();
      if (!token) throw new Error("No token found");

      const response = await fetch("/api/passenger/bookings", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ bookingId }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to cancel booking");
      }
      alert("Booking deleted!");
      setBookings(bookings.filter((b) => b._id !== bookingId));
      setCancelPopup(null);
    } catch (err) {
      setError(err.message || "Unable to delete booking");
      console.error("Cancel booking error:", err);
    }
  };

  const handleViewTicket = async (booking, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      console.log("Fetching ticket for booking:", booking._id);
      const tokenResponse = await fetch("/api/get-token", {
        method: "GET",
        credentials: "include",
      });
      if (!tokenResponse.ok) throw new Error("Not authenticated");
      const { token } = await tokenResponse.json();
      if (!token) throw new Error("No token found");

      const response = await fetch("/api/passenger/bookings/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ flightId: booking.flight._id }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch ticket data");
      }
      const data = await response.json();
      console.log("Ticket data received:", JSON.stringify(data, null, 2));
      setShowTicket({ ...data.booking, qrCode: data.qrCode });
    } catch (error) {
      console.error("Error fetching ticket:", error);
      setError("Failed to load ticket: " + error.message);
    }
  };

  const handleDownloadTicket = async () => {
    try {
      if (typeof window === "undefined") {
        console.error("Cannot generate PDF server-side");
        alert("PDF generation is only supported in the browser");
        return;
      }
      const element = ticketRef.current;
      if (!element) {
        console.error("Ticket element not found");
        alert("Error: Ticket content not found");
        return;
      }
      const html2pdf = (await import("html2pdf.js")).default;
      console.log("html2pdf imported:", html2pdf);
      console.log("Generating PDF for ticket element:", element);
      const opt = {
        margin: [5, 5, 5, 5],
        filename: `ticket_${showTicket?.flight?.flightNumber || "unknown"}_${showTicket?._id || "unknown"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: true,
          windowWidth: 190 * 3.78,
          windowHeight: 287 * 3.78,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };
      await html2pdf().set(opt).from(element).save();
      console.log("PDF generation successful");
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Failed to generate PDF: " + error.message);
    }
  };

  return (
    <div className="passenger-dashboard-container">
      <div className="dashboard-layout">
        <Sidebar />
        <div className="passenger-dashboard-main bookings-container">
          {loading ? (
            <p className="loading-text">Loading bookings...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : flightData ? (
            <>
              <div className="booking-form-section">
                <h2 className="section-title">🛫 {flightData.airline.name} Booking</h2>
                <div className="flight-info-box">
                  <p>
                    <strong>Flight:</strong> {flightData.flightNumber} <br />
                    <strong>From:</strong> {flightData.from} <br />
                    <strong>To:</strong> {flightData.to} <br />
                    <strong>Departure:</strong> {new Date(flightData.departure).toLocaleString()} <br />
                    <strong>Price per Seat:</strong> ₹{flightData.price} <br />
                    <strong>Total:</strong> ₹{flightData.price * selectedSeats.length} <br />
                    <strong>Baggage:</strong> {flightData.baggageAllowance} <br />
                    <strong>Gate:</strong> {flightData.gate}
                  </p>
                </div>

                {selectedSeats.length > 0 && (
                  <form onSubmit={handleSubmit}>
                    {formData.map((passenger, index) => (
                      <div key={index} className="passenger-form">
                        <h3>Passenger {index + 1}</h3>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={passenger.name}
                          onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
                          required
                        />
                        <input
                          type="date"
                          placeholder="Date of Birth"
                          value={passenger.dob}
                          onChange={(e) => handlePassengerChange(index, "dob", e.target.value)}
                          required
                        />
                        <select
                          value={passenger.gender}
                          onChange={(e) => handlePassengerChange(index, "gender", e.target.value)}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        <label className="upload-label">Upload ID (Aadhar/Passport):</label>
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(index, e.target.files[0])}
                          required
                        />
                      </div>
                    ))}
                    <button type="submit" className="submit-booking-btn">
                      Proceed to Payment
                    </button>
                  </form>
                )}
              </div>

              <div className="booking-seat-section">
                <h2 className="section-title">🪑 Select Your Seats (1-5)</h2>
                <div className="seat-grid">
                  {allSeats.map((seat) => (
                    <button
                      key={seat}
                      className={`seat ${selectedSeats.includes(seat) ? "selected" : ""} ${bookedSeats.includes(seat) ? "booked" : ""}`}
                      onClick={() => toggleSeat(seat)}
                      disabled={bookedSeats.includes(seat) || (selectedSeats.length >= 5 && !selectedSeats.includes(seat))}
                    >
                      <FaPlane size={18} /> {seat}
                    </button>
                  ))}
                </div>
                <p className="selected-seats-text">
                  Selected: {selectedSeats.join(", ") || "None"} (Max 5)
                </p>
              </div>
            </>
          ) : bookings.length === 0 ? (
            <div className="booking-form-section">
              <h2 className="section-title">📄 Your Bookings</h2>
              <p className="no-bookings">No bookings found.</p>
            </div>
          ) : (
            <div className="booking-form-section">
              <h2 className="section-title">📄 Your Previous Bookings</h2>
              <div className="previous-bookings-list">
                {bookings.map((booking) => (
                  <div key={booking._id} className="booking-card">
                    <div className="booking-logo">
                      <img src={booking.flight.airline.logo} alt={booking.flight.airline.name} />
                    </div>
                    <div className="booking-info">
                      <h3>{booking.flight.airline.name}</h3>
                      <p>Flight: {booking.flight.flightNumber}</p>
                      <p>{booking.flight.from} ✈ {booking.flight.to}</p>
                      <p><strong>Seats:</strong> {booking.seats.join(", ")}</p>
                      <span className={`booking-status ${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="booking-actions">
                      <button
                        type="button"
                        className="booking-action-btn"
                        onClick={(e) => handleViewTicket(booking, e)}
                      >
                        View Ticket
                      </button>
                      {booking.status === "Confirmed" && (
                        <button
                          type="button"
                          className="booking-action-btn danger"
                          onClick={() => setCancelPopup(booking._id)}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showPaymentModal && (
        <div className="custom-modal">
          <div className="modal-box">
            <h3>💳 Payment Confirmation</h3>
            <p>
              Total Amount: <strong>₹{flightData?.price * selectedSeats.length}</strong>
            </p>
            <p>Confirm payment for <strong>{selectedSeats.length}</strong> seat(s)?</p>
            <Elements stripe={stripePromise}>
              <PaymentForm
                flightData={flightData}
                selectedSeats={selectedSeats}
                formData={formData}
                onSuccess={handleConfirmBooking}
                onCancel={() => setShowPaymentModal(false)}
              />
            </Elements>
          </div>
        </div>
      )}

      {showTicket && (
        <div className="custom-modal">
          <div className="modal-box ticket-modal-box">
            <h3>🎫 Flight Ticket</h3>
            <div className="ticket-info">
              <p><strong>Flight:</strong> {showTicket.flight?.flightNumber || "N/A"}</p>
              <p><strong>Airline:</strong> {showTicket.flight?.airline?.name || "Aero-Vision"}</p>
              <p><strong>From:</strong> {showTicket.flight?.from || "N/A"}</p>
              <p><strong>To:</strong> {showTicket.flight?.to || "N/A"}</p>
              <p>
                <strong>Departure:</strong>{" "}
                {showTicket.flight?.departure
                  ? new Date(showTicket.flight.departure).toLocaleString()
                  : "N/A"}
              </p>
              <p><strong>Seats:</strong> {showTicket.seats?.join(", ") || "N/A"}</p>
              <p>
                <strong>Passenger:</strong> {showTicket.passengers?.[0]?.name || "N/A"}
              </p>
            </div>
            <div className="modal-buttons">
              <button onClick={handleDownloadTicket}>Download Ticket</button>
              <button className="danger" onClick={() => setShowTicket(null)}>
                Close
              </button>
            </div>
          </div>
          <div style={{ position: "absolute", left: "-9999px" }}>
            <Ticket
              booking={showTicket}
              qrCode={showTicket.qrCode}
              onClose={() => setShowTicket(null)}
              ref={ticketRef}
            />
          </div>
        </div>
      )}

      {cancelPopup && (
        <div className="custom-modal">
          <div className="modal-box">
            <h3>❌ Delete Booking?</h3>
            <p>This action cannot be undone. Are you sure?</p>
            <button className="danger" onClick={() => handleCancelBooking(cancelPopup)}>
              Yes, Delete
            </button>
            <button onClick={() => setCancelPopup(null)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;