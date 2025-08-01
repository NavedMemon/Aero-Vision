// "use client";
// import React, { useState, useEffect } from "react";
// import AdminSidebar from "../AdminSidebar";
// import "../admin.css";
// import "./passengers.css";
// import { FaEye, FaTrash, FaTimes } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// const mockBookings = new Array(12).fill(0).map((_, i) => ({
//   id: i,
//   passengerName: `Passenger ${i + 1}`,
//   flightNumber: `FL${100 + i}`,
//   airline: i % 2 === 0 ? "IndiGo" : "Air India",
//   logo: i % 2 === 0 ? "/images/indigologo.png" : "/images/airindia.png",
//   from: i % 2 === 0 ? "Mumbai" : "Delhi",
//   to: i % 2 === 0 ? "Dubai" : "Bangalore",
//   departure: `2025-07-21T${10 + i}:00:00`,
//   status: i % 3 === 0 ? "Confirmed" : i % 3 === 1 ? "Pending" : "Cancelled",
//   type: i % 2 === 0 ? "International" : "Domestic",
//   price: `₹${4500 + i * 300}`,
// }));

// const PassengerPage = () => {
//   const router = useRouter();
//   const [hasMounted, setHasMounted] = useState(false);
//   const [bookings, setBookings] = useState(mockBookings);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [airlineFilter, setAirlineFilter] = useState("All");
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   const bookingsPerPage = 8;

//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, filter, airlineFilter]);

//   if (!hasMounted) return null;

//   const filteredBookings = bookings.filter((booking) => {
//     const matchesSearch =
//       booking.passengerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.to.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter =
//       filter === "All" || booking.type.toLowerCase() === filter.toLowerCase();
//     const matchesAirline =
//       airlineFilter === "All" ||
//       booking.airline.toLowerCase() === airlineFilter.toLowerCase();
//     return matchesSearch && matchesFilter && matchesAirline;
//   });

//   const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

//   const paginated = filteredBookings.slice(
//     (currentPage - 1) * bookingsPerPage,
//     currentPage * bookingsPerPage
//   );

//   const handleCancelBooking = (id) => {
//     if (confirm("Are you sure you want to cancel this booking?")) {
//       setBookings((prev) =>
//         prev.map((booking) =>
//           booking.id === id ? { ...booking, status: "Cancelled" } : booking
//         )
//       );
//     }
//   };

//   const closeModal = () => setSelectedBooking(null);

//   return (
//     <div className="admin-dashboard-new-container">
//       <AdminSidebar />
//       <div className="admin-dashboard-main-bright">
//         <h1 className="admin-passenger-title">🧳 Manage Passenger Bookings</h1>

//         <div className="admin-passenger-controls">
//           <input
//             type="text"
//             placeholder="Search bookings..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <select value={filter} onChange={(e) => setFilter(e.target.value)}>
//             <option value="All">All Types</option>
//             <option value="Domestic">Domestic</option>
//             <option value="International">International</option>
//           </select>
//           <select
//             value={airlineFilter}
//             onChange={(e) => setAirlineFilter(e.target.value)}
//           >
//             <option value="All">All Airlines</option>
//             <option value="IndiGo">IndiGo</option>
//             <option value="Air India">Air India</option>
//           </select>
//         </div>

//         <div className="admin-passenger-card-grid">
//           {paginated.length > 0 ? (
//             paginated.map((booking) => (
//               <div key={booking.id} className="admin-passenger-card animated">
//                 <img src={booking.logo} alt={booking.airline} />
//                 <h3>{booking.passengerName}</h3>
//                 <p>
//                   <strong>Flight:</strong> {booking.flightNumber} -{" "}
//                   {booking.airline}
//                 </p>
//                 <p>
//                   <strong>From:</strong> {booking.from} <br />
//                   <strong>To:</strong> {booking.to}
//                 </p>
//                 <p>🕒 {new Date(booking.departure).toLocaleString()}</p>
//                 <p className="admin-passenger-price">{booking.price}</p>
//                 <p className={`admin-status-${booking.status.toLowerCase()}`}>
//                   {booking.status}
//                 </p>
//                 <span className="admin-passenger-type">{booking.type}</span>
//                 <div className="admin-passenger-actions">
//                   <button
//                     className="admin-view-button"
//                     onClick={() => setSelectedBooking(booking)}
//                   >
//                     <FaEye /> View Details
//                   </button>
//                   {booking.status !== "Cancelled" && (
//                     <button
//                       className="admin-cancel-button"
//                       onClick={() => handleCancelBooking(booking.id)}
//                     >
//                       <FaTrash /> Cancel Booking
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p style={{ padding: "20px", textAlign: "center" }}>
//               No bookings found for the selected filters.
//             </p>
//           )}
//         </div>

//         <div className="admin-passenger-pagination">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={i + 1 === currentPage ? "active" : ""}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Modal View */}
//       {selectedBooking && (
//         <div className="booking-modal-backdrop" onClick={closeModal}>
//           <div
//             className="booking-modal"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button className="close-modal" onClick={closeModal}>
//               <FaTimes />
//             </button>
//             <h2>Booking Details</h2>
//             <img
//               src={selectedBooking.logo}
//               alt={selectedBooking.airline}
//               style={{ height: "40px" }}
//             />
//             <p><strong>Passenger:</strong> {selectedBooking.passengerName}</p>
//             <p><strong>Flight Number:</strong> {selectedBooking.flightNumber}</p>
//             <p><strong>Airline:</strong> {selectedBooking.airline}</p>
//             <p><strong>From:</strong> {selectedBooking.from}</p>
//             <p><strong>To:</strong> {selectedBooking.to}</p>
//             <p><strong>Departure:</strong> {new Date(selectedBooking.departure).toLocaleString()}</p>
//             <p><strong>Status:</strong> {selectedBooking.status}</p>
//             <p><strong>Type:</strong> {selectedBooking.type}</p>
//             <p><strong>Price:</strong> {selectedBooking.price}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PassengerPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import AdminSidebar from "../AdminSidebar";
// import "../admin.css";
// import "./passengers.css";
// import { FaEye, FaTrash, FaTimes, FaClock } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// const PassengerPage = () => {
//   const router = useRouter();
//   const [hasMounted, setHasMounted] = useState(false);
//   const [bookings, setBookings] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [airlineFilter, setAirlineFilter] = useState("All");
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [delayHours, setDelayHours] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   const bookingsPerPage = 8;

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

//         const response = await fetch("/api/admin/manageflights", {
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
//         setBookings(data.bookings);
//       } catch (err) {
//         setError(err.message || "Unable to load bookings");
//         console.error("Fetch bookings error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//     setHasMounted(true);
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, filter, airlineFilter]);

//   if (!hasMounted) return null;

//   const filteredBookings = bookings.filter((booking) => {
//     const matchesSearch =
//       booking.passengers?.[0]?.name
//         ?.toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       booking.flight.flightNumber
//         ?.toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       booking.flight.airline.name
//         ?.toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       booking.flight.from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.flight.to?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter =
//       filter === "All" ||
//       booking.flight.type?.toLowerCase() === filter.toLowerCase();
//     const matchesAirline =
//       airlineFilter === "All" ||
//       booking.flight.airline.name?.toLowerCase() ===
//         airlineFilter.toLowerCase();
//     return matchesSearch && matchesFilter && matchesAirline;
//   });

//   const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

//   const paginated = filteredBookings.slice(
//     (currentPage - 1) * bookingsPerPage,
//     currentPage * bookingsPerPage
//   );

//   const handleCancelBooking = async (bookingId) => {
//     if (confirm("Are you sure you want to cancel this booking?")) {
//       try {
//         const tokenResponse = await fetch("/api/get-token", {
//           method: "GET",
//           credentials: "include",
//         });
//         if (!tokenResponse.ok) throw new Error("Not authenticated");
//         const { token } = await tokenResponse.json();
//         if (!token) throw new Error("No token found");

//         const response = await fetch("/api/admin/manageflights", {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           credentials: "include",
//           body: JSON.stringify({ bookingId }),
//         });
//         if (!response.ok) {
//           const data = await response.json();
//           throw new Error(data.error || "Failed to cancel booking");
//         }
//         alert("Booking cancelled!");
//         setBookings(bookings.filter((b) => b._id !== bookingId));
//         setSelectedBooking(null);
//       } catch (err) {
//         setError(err.message || "Unable to cancel booking");
//         console.error("Cancel booking error:", err);
//       }
//     }
//   };

//   const handleDelayFlight = async (bookingId) => {
//     if (!delayHours || isNaN(delayHours) || delayHours <= 0) {
//       setError("Please enter a valid number of hours to delay.");
//       return;
//     }
//     try {
//       const tokenResponse = await fetch("/api/get-token", {
//         method: "GET",
//         credentials: "include",
//       });
//       if (!tokenResponse.ok) throw new Error("Not authenticated");
//       const { token } = await tokenResponse.json();
//       if (!token) throw new Error("No token found");

//       const response = await fetch("/api/admin/manageflights", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//         body: JSON.stringify({ bookingId, delayHours: parseFloat(delayHours) }),
//       });
//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.error || "Failed to delay flight");
//       }
//       alert(`Flight delayed by ${delayHours} hours!`);
//       const updatedBookings = await fetch("/api/admin/manageflights", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//       });
//       const data = await updatedBookings.json();
//       setBookings(data.bookings);
//       setSelectedBooking(null);
//       setDelayHours("");
//       setError("");
//     } catch (err) {
//       setError(err.message || "Unable to delay flight");
//       console.error("Delay flight error:", err);
//     }
//   };

//   const closeModal = () => {
//     setSelectedBooking(null);
//     setDelayHours("");
//     setError("");
//   };

//   return (
//     <div className="admin-dashboard-new-container">
//       <AdminSidebar />
//       <div className="admin-dashboard-main-bright">
//         <h1 className="admin-passenger-title">🧳 Manage Passenger Bookings</h1>

//         {loading ? (
//           <p className="loading-text">Loading bookings...</p>
//         ) : error ? (
//           <p className="error-text">{error}</p>
//         ) : (
//           <>
//             <div className="admin-passenger-controls">
//               <input
//                 type="text"
//                 placeholder="Search bookings..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <select
//                 value={filter}
//                 onChange={(e) => setFilter(e.target.value)}
//               >
//                 <option value="All">All Types</option>
//                 <option value="Domestic">Domestic</option>
//                 <option value="International">International</option>
//               </select>
//               <select
//                 value={airlineFilter}
//                 onChange={(e) => setAirlineFilter(e.target.value)}
//               >
//                 <option value="All">All Airlines</option>
//                 <option value="IndiGo">IndiGo</option>
//                 <option value="Air India">Air India</option>
//               </select>
//             </div>

//             <div className="admin-passenger-card-grid">
//               {paginated.length > 0 ? (
//                 paginated.map((booking) => (
//                   <div
//                     key={booking._id}
//                     className="admin-passenger-card animated"
//                   >
//                     <img
//                       src={booking.flight.airline.logo}
//                       alt={booking.flight.airline.name}
//                     />
//                     <h3>{booking.passengers[0]?.name || "N/A"}</h3>
//                     <p>
//                       <strong>Flight:</strong> {booking.flight.flightNumber} -{" "}
//                       {booking.flight.airline.name}
//                     </p>
//                     <p>
//                       <strong>From:</strong> {booking.flight.from} <br />
//                       <strong>To:</strong> {booking.flight.to}
//                     </p>
//                     <p>
//                       🕒 {new Date(booking.flight.departure).toLocaleString()}
//                       {booking.flightStatus === "Delayed" &&
//                         ` (Delayed by ${booking.delayTime} hours)`}
//                     </p>
//                     <p className="admin-passenger-price">
//                       ₹{booking.totalPrice}
//                     </p>
//                     <p
//                       className={`admin-status-${
//                         booking.flightStatus?.toLowerCase() || "on time"
//                       }`}
//                     >
//                       {booking.flightStatus || "On Time"}
//                     </p>
//                     <span className="admin-passenger-type">
//                       {booking.flight.type}
//                     </span>
//                     <div className="admin-passenger-actions">
//                       <button
//                         className="admin-view-button"
//                         onClick={() => setSelectedBooking(booking)}
//                       >
//                         <FaEye /> View Details
//                       </button>
//                       {booking.status !== "Cancelled" && (
//                         <button
//                           className="admin-cancel-button"
//                           onClick={() => handleCancelBooking(booking._id)}
//                         >
//                           <FaTrash /> Cancel Booking
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p style={{ padding: "20px", textAlign: "center" }}>
//                   No bookings found for the selected filters.
//                 </p>
//               )}
//             </div>

//             <div className="admin-passenger-pagination">
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={i + 1 === currentPage ? "active" : ""}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           </>
//         )}

//         {selectedBooking && (
//           <div className="booking-modal-backdrop" onClick={closeModal}>
//             <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
//               <button className="close-modal" onClick={closeModal}>
//                 <FaTimes />
//               </button>
//               <h2>Booking Details</h2>
//               <img
//                 src={selectedBooking.flight.airline.logo}
//                 alt={selectedBooking.flight.airline.name}
//                 style={{ height: "40px" }}
//               />
//               <p>
//                 <strong>Flight Number:</strong>{" "}
//                 {selectedBooking.flight.flightNumber}
//               </p>
//               <p>
//                 <strong>Airline:</strong> {selectedBooking.flight.airline.name}
//               </p>
//               <p>
//                 <strong>From:</strong> {selectedBooking.flight.from}
//               </p>
//               <p>
//                 <strong>To:</strong> {selectedBooking.flight.to}
//               </p>
//               <p>
//                 <strong>Departure:</strong>{" "}
//                 {new Date(selectedBooking.flight.departure).toLocaleString()}
//                 {selectedBooking.flightStatus === "Delayed" &&
//                   ` (Delayed by ${selectedBooking.delayTime} hours)`}
//               </p>
//               <p>
//                 <strong>Status:</strong>{" "}
//                 <span
//                   className={`booking-status ${
//                     selectedBooking.flightStatus?.toLowerCase() || "on time"
//                   }`}
//                 >
//                   {selectedBooking.flightStatus || "On Time"}
//                 </span>
//               </p>
//               <p>
//                 <strong>Type:</strong> {selectedBooking.flight.type}
//               </p>
//               <p>
//                 <strong>Total Price:</strong> ₹{selectedBooking.totalPrice}
//               </p>
//               <p>
//                 <strong>Payment Status:</strong> {selectedBooking.paymentStatus}
//               </p>

//               <h3>Passenger Details</h3>
//               <div className="passenger-table-container">
//                 <table className="passenger-table">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>DOB</th>
//                       <th>Gender</th>
//                       <th>Seat</th>
//                       <th>Document</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {selectedBooking.passengers.map((passenger, index) => (
//                       <tr key={index}>
//                         <td>{passenger.name}</td>
//                         <td>{new Date(passenger.dob).toLocaleDateString()}</td>
//                         <td>{passenger.gender}</td>
//                         <td>{selectedBooking.seats[index] || "N/A"}</td>
//                         <td>
//                           {passenger.document ? (
//                             <a
//                               href={passenger.document}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                             >
//                               View ID
//                             </a>
//                           ) : (
//                             "N/A"
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {selectedBooking.status !== "Cancelled" && (
//                 <div className="modal-actions">
//                   <button
//                     className="admin-cancel-button"
//                     onClick={() => handleCancelBooking(selectedBooking._id)}
//                   >
//                     <FaTrash /> Cancel Booking
//                   </button>
//                   <div className="delay-form">
//                     <input
//                       type="number"
//                       placeholder="Delay hours"
//                       value={delayHours}
//                       onChange={(e) => setDelayHours(e.target.value)}
//                       min="0"
//                       step="0.5"
//                     />
//                     <button
//                       className="admin-delay-button"
//                       onClick={() => handleDelayFlight(selectedBooking._id)}
//                     >
//                       <FaClock /> Delay Flight
//                     </button>
//                   </div>
//                 </div>
//               )}
//               {error && <p className="error-text">{error}</p>}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PassengerPage;

"use client";
import React, { useState, useEffect } from "react";
import AdminSidebar from "../AdminSidebar";
import "../admin.css";
import "./passengers.css";
import { FaEye, FaTrash, FaTimes, FaClock } from "react-icons/fa";
import { useRouter } from "next/navigation";

const PassengerPage = () => {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [airlines, setAirlines] = useState([]); // New state for airlines
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [airlineFilter, setAirlineFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [delayHours, setDelayHours] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const bookingsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const tokenResponse = await fetch("/api/get-token", {
          method: "GET",
          credentials: "include",
        });
        if (!tokenResponse.ok) throw new Error("Not authenticated");
        const { token } = await tokenResponse.json();
        if (!token) throw new Error("No token found");

        // Fetch bookings
        const bookingsResponse = await fetch("/api/admin/manageflights", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        if (!bookingsResponse.ok) {
          const data = await bookingsResponse.json();
          throw new Error(data.error || "Failed to fetch bookings");
        }
        const bookingsData = await bookingsResponse.json();
        setBookings(bookingsData.bookings);

        // Fetch airlines
        const airlinesResponse = await fetch("/api/admin/airlines", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        if (!airlinesResponse.ok) {
          const data = await airlinesResponse.json();
          throw new Error(data.error || "Failed to fetch airlines");
        }
        const airlinesData = await airlinesResponse.json();
        setAirlines(airlinesData.airlines);
      } catch (err) {
        setError(err.message || "Unable to load data");
        console.error("Fetch data error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter, airlineFilter]);

  if (!hasMounted) return null;

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.passengers?.some((passenger) =>
        passenger.name?.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      booking.flight.flightNumber
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.flight.airline.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.flight.from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.flight.to?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "All" ||
      booking.flight.type?.toLowerCase() === filter.toLowerCase();
    const matchesAirline =
      airlineFilter === "All" ||
      booking.flight.airline.name?.toLowerCase() ===
        airlineFilter.toLowerCase();
    return matchesSearch && matchesFilter && matchesAirline;
  });

  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  const paginated = filteredBookings.slice(
    (currentPage - 1) * bookingsPerPage,
    currentPage * bookingsPerPage
  );

  const handleCancelBooking = async (bookingId) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      try {
        const tokenResponse = await fetch("/api/get-token", {
          method: "GET",
          credentials: "include",
        });
        if (!tokenResponse.ok) throw new Error("Not authenticated");
        const { token } = await tokenResponse.json();
        if (!token) throw new Error("No token found");

        const response = await fetch("/api/admin/manageflights", {
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
        alert("Booking cancelled!");
        setBookings(bookings.filter((b) => b._id !== bookingId));
        setSelectedBooking(null);
      } catch (err) {
        setError(err.message || "Unable to cancel booking");
        console.error("Cancel booking error:", err);
      }
    }
  };

  const handleDelayFlight = async (bookingId) => {
    if (!delayHours || isNaN(delayHours) || delayHours <= 0) {
      setError("Please enter a valid number of hours to delay.");
      return;
    }
    try {
      const tokenResponse = await fetch("/api/get-token", {
        method: "GET",
        credentials: "include",
      });
      if (!tokenResponse.ok) throw new Error("Not authenticated");
      const { token } = await tokenResponse.json();
      if (!token) throw new Error("No token found");

      const response = await fetch("/api/admin/manageflights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ bookingId, delayHours: parseFloat(delayHours) }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delay flight");
      }
      alert(`Flight delayed by ${delayHours} hours!`);
      const updatedBookings = await fetch("/api/admin/manageflights", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      const data = await updatedBookings.json();
      setBookings(data.bookings);
      setSelectedBooking(null);
      setDelayHours("");
      setError("");
    } catch (err) {
      setError(err.message || "Unable to delay flight");
      console.error("Delay flight error:", err);
    }
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setDelayHours("");
    setError("");
  };

  return (
    <div className="admin-dashboard-new-container">
      <AdminSidebar />
      <div className="admin-dashboard-main-bright">
        <h1 className="admin-passenger-title">🧳 Manage Passenger Bookings</h1>

        {loading ? (
          <p className="loading-text">Loading bookings...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            <div className="admin-passenger-controls">
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Domestic">Domestic</option>
                <option value="International">International</option>
              </select>
              <select
                value={airlineFilter}
                onChange={(e) => setAirlineFilter(e.target.value)}
              >
                <option value="All">All Airlines</option>
                {airlines.map((airline) => (
                  <option key={airline._id} value={airline.name}>
                    {airline.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-passenger-card-grid">
              {paginated.length > 0 ? (
                paginated.map((booking) => (
                  <div
                    key={booking._id}
                    className="admin-passenger-card animated"
                  >
                    <img
                      src={booking.flight.airline.logo}
                      alt={booking.flight.airline.name}
                    />
                    <h3>
                      {booking.passengers.length} Passenger
                      {booking.passengers.length !== 1 ? "s" : ""}
                    </h3>
                    <p>
                      <strong>Flight:</strong> {booking.flight.flightNumber} -{" "}
                      {booking.flight.airline.name}
                    </p>
                    <p>
                      <strong>From:</strong> {booking.flight.from} <br />
                      <strong>To:</strong> {booking.flight.to}
                    </p>
                    <p>
                      🕒 {new Date(booking.flight.departure).toLocaleString()}
                      {booking.flightStatus === "Delayed" &&
                        ` (Delayed by ${booking.delayTime} hours)`}
                    </p>
                    <p className="admin-passenger-price">
                      ₹{booking.totalPrice}
                    </p>
                    <p
                      className={`admin-status-${
                        booking.flightStatus?.toLowerCase() || "on time"
                      }`}
                    >
                      {booking.flightStatus || "On Time"}
                    </p>
                    <span className="admin-passenger-type">
                      {booking.flight.type}
                    </span>
                    <div className="admin-passenger-actions">
                      <button
                        className="admin-view-button"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        <FaEye /> View Details
                      </button>
                      {booking.status !== "Cancelled" && (
                        <button
                          className="admin-cancel-button"
                          onClick={() => handleCancelBooking(booking._id)}
                        >
                          <FaTrash /> Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ padding: "20px", textAlign: "center" }}>
                  No bookings found for the selected filters.
                </p>
              )}
            </div>

            <div className="admin-passenger-pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={i + 1 === currentPage ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}

        {selectedBooking && (
          <div className="booking-modal-backdrop" onClick={closeModal}>
            <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={closeModal}>
                <FaTimes />
              </button>
              <h2>Booking Details</h2>
              <img
                src={selectedBooking.flight.airline.logo}
                alt={selectedBooking.flight.airline.name}
                style={{ height: "40px" }}
              />
              <p>
                <strong>Flight Number:</strong>{" "}
                {selectedBooking.flight.flightNumber}
              </p>
              <p>
                <strong>Airline:</strong> {selectedBooking.flight.airline.name}
              </p>
              <p>
                <strong>From:</strong> {selectedBooking.flight.from}
              </p>
              <p>
                <strong>To:</strong> {selectedBooking.flight.to}
              </p>
              <p>
                <strong>Departure:</strong>{" "}
                {new Date(selectedBooking.flight.departure).toLocaleString()}
                {selectedBooking.flightStatus === "Delayed" &&
                  ` (Delayed by ${selectedBooking.delayTime} hours)`}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`booking-status ${
                    selectedBooking.flightStatus?.toLowerCase() || "on time"
                  }`}
                >
                  {selectedBooking.flightStatus || "On Time"}
                </span>
              </p>
              <p>
                <strong>Type:</strong> {selectedBooking.flight.type}
              </p>
              <p>
                <strong>Total Price:</strong> ₹{selectedBooking.totalPrice}
              </p>
              <p>
                <strong>Payment Status:</strong> {selectedBooking.paymentStatus}
              </p>

              <h3>Passenger Details ({selectedBooking.passengers.length})</h3>
              <div className="passenger-table-container">
                <table className="passenger-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>DOB</th>
                      <th>Gender</th>
                      <th>Seat</th>
                      <th>Document</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBooking.passengers.map((passenger, index) => (
                      <tr key={index}>
                        <td>{passenger.name}</td>
                        <td>{new Date(passenger.dob).toLocaleDateString()}</td>
                        <td>{passenger.gender}</td>
                        <td>{selectedBooking.seats[index] || "N/A"}</td>
                        <td>
                          {passenger.document ? (
                            <a
                              href={passenger.document}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View ID
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {selectedBooking.status !== "Cancelled" && (
                <div className="modal-actions">
                  <button
                    className="admin-cancel-button"
                    onClick={() => handleCancelBooking(selectedBooking._id)}
                  >
                    <FaTrash /> Cancel Booking
                  </button>
                  <div className="delay-form">
                    <input
                      type="number"
                      placeholder="Delay hours"
                      value={delayHours}
                      onChange={(e) => setDelayHours(e.target.value)}
                      min="0"
                      step="0.5"
                    />
                    <button
                      className="admin-delay-button"
                      onClick={() => handleDelayFlight(selectedBooking._id)}
                    >
                      <FaClock /> Delay Flight
                    </button>
                  </div>
                </div>
              )}
              {error && <p className="error-text">{error}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PassengerPage;
