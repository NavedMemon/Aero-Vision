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

"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import "./bookings.css";
import "../passenger.css";
import { useSearchParams } from "next/navigation";
import { MdAirlineSeatReclineNormal } from "react-icons/md";

const allSeats = Array.from({ length: 30 }, (_, i) => `S${i + 1}`);

const BookingsPage = () => {
  const searchParams = useSearchParams();

  const [flightData, setFlightData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    aadhar: null,
  });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [cancelPopup, setCancelPopup] = useState(false);

  useEffect(() => {
    const airline = searchParams.get("airline");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const time = searchParams.get("time");
    const price = searchParams.get("price");
    const type = searchParams.get("type");

    if (airline && from && to && time && price && type) {
      setFlightData({ airline, from, to, time, price, type });
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, aadhar: e.target.files[0] }));
  };

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else if (selectedSeats.length < 6) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.aadhar
    ) {
      alert("Please fill all fields and upload document.");
      return;
    }
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    setShowPaymentModal(true);
  };

  return (
    <div className="passenger-dashboard-new-container">
      <Sidebar />
      <div className="passenger-dashboard-main-bright bookings-container">
        {flightData ? (
          <>
            {/* LEFT FORM SECTION */}
            <div className="booking-form-section">
              <h2>🛫 {flightData.airline} Booking</h2>
              <div className="flight-info-box">
                <p>
                  <strong>From:</strong> {flightData.from} <br />
                  <strong>To:</strong> {flightData.to} <br />
                  <strong>Time:</strong> {flightData.time} <br />
                  <strong>Price:</strong> {flightData.price}
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <label className="upload-label">Upload Aadhar / ID:</label>
                <input type="file" onChange={handleFileChange} />
                <button type="submit" className="submit-booking-btn">
                  Confirm Booking
                </button>
              </form>
            </div>

            {/* RIGHT SEAT SECTION */}
            <div className="booking-seat-section">
              <h2>🪑 Select Your Seats</h2>
              <div className="seat-grid">
                {allSeats.map((seat) => (
                  <button
                    key={seat}
                    className={`seat ${
                      selectedSeats.includes(seat) ? "selected" : ""
                    }`}
                    onClick={() => toggleSeat(seat)}
                    disabled={
                      !selectedSeats.includes(seat) && selectedSeats.length >= 6
                    }
                  >
                    <MdAirlineSeatReclineNormal size={18} /> {seat}
                  </button>
                ))}
              </div>
              <p className="selected-seats-text">
                Selected: {selectedSeats.join(", ") || "None"} (Max 6)
              </p>
            </div>
          </>
        ) : (
          <div className="booking-form-section">
            <h2>📄 Your Previous Bookings</h2>
            <div className="previous-bookings-list">
              <div className="booking-card">
                <div className="booking-logo">
                  <img src="/images/airindia.png" alt="Air India" />
                </div>
                <div className="booking-info">
                  <h3>Air India</h3>
                  <p>Delhi ✈ Bangalore</p>
                  <p>
                    Seats: <strong>S2, S3</strong>
                  </p>
                  <span className="booking-status completed">Completed</span>
                </div>
                <div className="booking-actions">
                  <button
                    className="booking-action-btn"
                    onClick={() => setShowTicket(true)}
                  >
                    View Ticket
                  </button>
                  <button
                    className="booking-action-btn danger"
                    onClick={() => setCancelPopup(true)}
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <div className="booking-card">
                <div className="booking-logo">
                  <img src="/images/indigologo.png" alt="IndiGo" />
                </div>
                <div className="booking-info">
                  <h3>IndiGo</h3>
                  <p>Mumbai ✈ Dubai</p>
                  <p>
                    Seats: <strong>S10</strong>
                  </p>
                  <span className="booking-status upcoming">Upcoming</span>
                </div>
                <div className="booking-actions">
                  <button
                    className="booking-action-btn"
                    onClick={() => setShowTicket(true)}
                  >
                    View Ticket
                  </button>
                  <button
                    className="booking-action-btn danger"
                    onClick={() => setCancelPopup(true)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="custom-modal">
            <div className="modal-box">
              <h3>💳 Payment Gateway</h3>
              <p>
                Total Amount: <strong>{flightData.price}</strong>
              </p>
              <p>
                Confirm payment for <strong>{selectedSeats.length}</strong>{" "}
                seat(s)?
              </p>
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  alert("✅ Booking confirmed!");
                }}
              >
                Pay Now
              </button>
              <button
                className="danger"
                onClick={() => setShowPaymentModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* View Ticket */}
        {showTicket && (
          <div className="custom-modal">
            <div className="modal-box ticket-modal">
              <h3>🎫 Flight Ticket</h3>
              <p>
                <strong>Passenger:</strong> Sarjil Sheth
              </p>
              <p>
                <strong>Flight:</strong> Air India
              </p>
              <p>
                <strong>From:</strong> Delhi → <strong>To:</strong> Bangalore
              </p>
              <p>
                <strong>Time:</strong> 10:30 AM
              </p>
              <p>
                <strong>Seats:</strong> S2, S3
              </p>
              <button onClick={() => setShowTicket(false)}>Close</button>
            </div>
          </div>
        )}

        {/* Cancel Popup */}
        {cancelPopup && (
          <div className="custom-modal">
            <div className="modal-box">
              <h3>❌ Cancel Booking?</h3>
              <p>This action cannot be undone. Are you sure?</p>
              <button
                className="danger"
                onClick={() => {
                  alert("Booking cancelled!");
                  setCancelPopup(false);
                }}
              >
                Yes, Cancel
              </button>
              <button onClick={() => setCancelPopup(false)}>No</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
