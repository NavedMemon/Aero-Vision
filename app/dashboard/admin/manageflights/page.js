// "use client";
// import React, { useState, useEffect } from "react";
// import AdminSidebar from "../AdminSidebar";
// import "../admin.css"; // Reuse admin.css for consistent styling
// import "./manageflights.css";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const mockFlights = new Array(12).fill(0).map((_, i) => ({
//   id: i,
//   number: `FL${100 + i}`,
//   airline: i % 2 === 0 ? "IndiGo" : "Air India",
//   logo: i % 2 === 0 ? "/images/indigologo.png" : "/images/airindia.png",
//   from: i % 2 === 0 ? "Mumbai" : "Delhi",
//   to: i % 2 === 0 ? "Dubai" : "Bangalore",
//   departure: `2025-07-21T${10 + i}:00:00`,
//   status: i % 3 === 0 ? "On Time" : i % 3 === 1 ? "Delayed" : "Cancelled",
//   type: i % 2 === 0 ? "International" : "Domestic",
//   price: `₹${4500 + i * 300}`,
// }));

// const mockAirlines = [
//   { name: "IndiGo", logo: "/images/indigologo.png" },
//   { name: "Air India", logo: "/images/airindia.png" },
// ];

// const ManageFlights = () => {
//   const [hasMounted, setHasMounted] = useState(false);
//   const [flights, setFlights] = useState(mockFlights);
//   const [airlines, setAirlines] = useState(mockAirlines);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [showFlightForm, setShowFlightForm] = useState(false);
//   const [showAirlineForm, setShowAirlineForm] = useState(false);
//   const [newFlight, setNewFlight] = useState({
//     number: "",
//     airline: "",
//     logo: "",
//     from: "",
//     to: "",
//     departure: "",
//     status: "On Time",
//     type: "Domestic",
//     price: "",
//   });
//   const [newAirline, setNewAirline] = useState({
//     name: "",
//     logo: "",
//   });
//   const [editingFlight, setEditingFlight] = useState(null);
//   const flightsPerPage = 8;

//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, filter]);

//   if (!hasMounted) return null; // Prevent mismatched server/client render

//   const filteredFlights = flights.filter((flight) => {
//     const matchesSearch =
//       flight.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       flight.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       flight.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       flight.to.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter =
//       filter === "All" || flight.type.toLowerCase() === filter.toLowerCase();
//     return matchesSearch && matchesFilter;
//   });

//   const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);

//   const paginated = filteredFlights.slice(
//     (currentPage - 1) * flightsPerPage,
//     currentPage * flightsPerPage
//   );

//   const handleFlightInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "airline") {
//       const selectedAirline = airlines.find(
//         (airline) => airline.name === value
//       );
//       if (editingFlight) {
//         setEditingFlight({
//           ...editingFlight,
//           airline: value,
//           logo: selectedAirline ? selectedAirline.logo : "",
//         });
//       } else {
//         setNewFlight({
//           ...newFlight,
//           airline: value,
//           logo: selectedAirline ? selectedAirline.logo : "",
//         });
//       }
//     } else {
//       if (editingFlight) {
//         setEditingFlight({ ...editingFlight, [name]: value });
//       } else {
//         setNewFlight({ ...newFlight, [name]: value });
//       }
//     }
//   };

//   const handleAirlineInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewAirline({ ...newAirline, [name]: value });
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
//         alert("Please upload a PNG, JPG, or JPEG file.");
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         alert("File size must be less than 5MB.");
//         return;
//       }
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setNewAirline({ ...newAirline, logo: event.target.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleFlightSubmit = (e) => {
//     e.preventDefault();
//     if (editingFlight) {
//       setFlights(
//         flights.map((flight) =>
//           flight.id === editingFlight.id
//             ? { ...editingFlight, id: editingFlight.id }
//             : flight
//         )
//       );
//       setEditingFlight(null);
//     } else {
//       setFlights([...flights, { ...newFlight, id: flights.length + 1 }]);
//     }
//     setNewFlight({
//       number: "",
//       airline: "",
//       logo: "",
//       from: "",
//       to: "",
//       departure: "",
//       status: "On Time",
//       type: "Domestic",
//       price: "",
//     });
//     setShowFlightForm(false);
//   };

//   const handleAirlineSubmit = (e) => {
//     e.preventDefault();
//     if (airlines.some((airline) => airline.name === newAirline.name)) {
//       alert("Airline name must be unique.");
//       return;
//     }
//     setAirlines([...airlines, newAirline]);
//     setNewAirline({ name: "", logo: "" });
//     setShowAirlineForm(false);
//   };

//   const handleEdit = (flight) => {
//     setEditingFlight(flight);
//     setShowFlightForm(true);
//   };

//   const handleDelete = (id) => {
//     if (confirm("Are you sure you want to delete this flight?")) {
//       setFlights(flights.filter((flight) => flight.id !== id));
//     }
//   };

//   const toggleFlightForm = () => {
//     setShowFlightForm(!showFlightForm);
//     setEditingFlight(null);
//     setNewFlight({
//       number: "",
//       airline: "",
//       logo: "",
//       from: "",
//       to: "",
//       departure: "",
//       status: "On Time",
//       type: "Domestic",
//       price: "",
//     });
//   };

//   const toggleAirlineForm = () => {
//     setShowAirlineForm(!showAirlineForm);
//     setNewAirline({ name: "", logo: "" });
//   };

//   return (
//     <div className="admin-dashboard-new-container">
//       <AdminSidebar />
//       <div className="admin-dashboard-main-bright">
//         <h1 className="admin-flight-title">🛫 Manage Flights</h1>

//         <div className="admin-flight-controls">
//           <input
//             type="text"
//             placeholder="Search flights..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <select value={filter} onChange={(e) => setFilter(e.target.value)}>
//             <option value="All">All</option>
//             <option value="Domestic">Domestic</option>
//             <option value="International">International</option>
//           </select>
//           <button
//             className="admin-add-flight-button"
//             onClick={toggleFlightForm}
//           >
//             {showFlightForm ? "Cancel" : "Add New Flight"}
//           </button>
//           <button
//             className="admin-add-airline-button"
//             onClick={toggleAirlineForm}
//           >
//             {showAirlineForm ? "Cancel" : "Add New Airline"}
//           </button>
//         </div>

//         {showAirlineForm && (
//           <div className="admin-airline-form-box">
//             <h3>Add Airline</h3>
//             <form onSubmit={handleAirlineSubmit} className="admin-airline-form">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Airline Name"
//                 value={newAirline.name}
//                 onChange={handleAirlineInputChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="logo"
//                 placeholder="Logo URL (e.g., /images/airlinelogo.png)"
//                 value={newAirline.logo}
//                 onChange={handleAirlineInputChange}
//               />
//               <input
//                 type="file"
//                 name="logoFile"
//                 accept="image/png,image/jpeg,image/jpg"
//                 onChange={handleFileUpload}
//               />
//               <button type="submit">Add Airline</button>
//             </form>
//           </div>
//         )}

//         {showFlightForm && (
//           <div className="admin-flight-form-box">
//             <h3>{editingFlight ? "Edit Flight" : "Add Flight"}</h3>
//             <form onSubmit={handleFlightSubmit} className="admin-flight-form">
//               <input
//                 type="text"
//                 name="number"
//                 placeholder="Flight Number"
//                 value={editingFlight ? editingFlight.number : newFlight.number}
//                 onChange={handleFlightInputChange}
//                 required
//               />
//               <select
//                 name="airline"
//                 value={
//                   editingFlight ? editingFlight.airline : newFlight.airline
//                 }
//                 onChange={handleFlightInputChange}
//                 required
//               >
//                 <option value="" disabled>
//                   Select Airline
//                 </option>
//                 {airlines.map((airline) => (
//                   <option key={airline.name} value={airline.name}>
//                     {airline.name}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 type="text"
//                 name="from"
//                 placeholder="Origin"
//                 value={editingFlight ? editingFlight.from : newFlight.from}
//                 onChange={handleFlightInputChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="to"
//                 placeholder="Destination"
//                 value={editingFlight ? editingFlight.to : newFlight.to}
//                 onChange={handleFlightInputChange}
//                 required
//               />
//               <input
//                 type="datetime-local"
//                 name="departure"
//                 value={
//                   editingFlight ? editingFlight.departure : newFlight.departure
//                 }
//                 onChange={handleFlightInputChange}
//                 required
//               />
//               <select
//                 name="status"
//                 value={editingFlight ? editingFlight.status : newFlight.status}
//                 onChange={handleFlightInputChange}
//               >
//                 <option value="On Time">On Time</option>
//                 <option value="Delayed">Delayed</option>
//                 <option value="Cancelled">Cancelled</option>
//               </select>
//               <select
//                 name="type"
//                 value={editingFlight ? editingFlight.type : newFlight.type}
//                 onChange={handleFlightInputChange}
//               >
//                 <option value="Domestic">Domestic</option>
//                 <option value="International">International</option>
//               </select>
//               <input
//                 type="text"
//                 name="price"
//                 placeholder="Price (e.g., ₹5000)"
//                 value={editingFlight ? editingFlight.price : newFlight.price}
//                 onChange={handleFlightInputChange}
//                 required
//               />
//               <button type="submit">
//                 {editingFlight ? "Update Flight" : "Add Flight"}
//               </button>
//             </form>
//           </div>
//         )}

//         <div className="admin-flight-card-grid">
//           {paginated.map((flight) => (
//             <div key={flight.id} className="admin-flight-card animated">
//               <img src={flight.logo} alt={flight.airline} />
//               <h3>
//                 {flight.number} - {flight.airline}
//               </h3>
//               <p>
//                 <strong>From:</strong> {flight.from} <br />
//                 <strong>To:</strong> {flight.to}
//               </p>
//               <p>🕒 {new Date(flight.departure).toLocaleString()}</p>
//               <p className="admin-flight-price">{flight.price}</p>
//               <p
//                 className={`admin-status-${flight.status
//                   .toLowerCase()
//                   .replace(" ", "-")}`}
//               >
//                 {flight.status}
//               </p>
//               <span className="admin-flight-type">{flight.type}</span>
//               <div className="admin-flight-actions">
//                 <button
//                   className="admin-edit-button"
//                   onClick={() => handleEdit(flight)}
//                 >
//                   <FaEdit /> Edit
//                 </button>
//                 <button
//                   className="admin-delete-button"
//                   onClick={() => handleDelete(flight.id)}
//                 >
//                   <FaTrash /> Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="admin-pagination">
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
//     </div>
//   );
// };

// export default ManageFlights;

// "use client";
// import { useState, useEffect } from "react";
// import { FaDoorOpen, FaEdit, FaTrash } from "react-icons/fa";
// import AdminSidebar from "../AdminSidebar";
// import "../admin.css";

// export default function ManageFlights() {
//   const [hasMounted, setHasMounted] = useState(false);
//   const [flights, setFlights] = useState([]);
//   const [airlines, setAirlines] = useState([]);
//   const [gates, setGates] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [showFlightForm, setShowFlightForm] = useState(false);
//   const [showAirlineForm, setShowAirlineForm] = useState(false);
//   const [newFlight, setNewFlight] = useState({
//     flightNumber: "",
//     airline: "",
//     from: "",
//     to: "",
//     departure: "",
//     status: "On Time",
//     type: "Domestic",
//     price: "",
//     baggageAllowance: "",
//     gate: "",
//   });
//   const [newAirline, setNewAirline] = useState({ name: "", logo: "" });
//   const [editingFlight, setEditingFlight] = useState(null);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const flightsPerPage = 8;

//   useEffect(() => {
//     setHasMounted(true);
//     fetchFlights();
//     fetchAirlines();
//     fetchGates();
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, filter]);

//   const fetchFlights = async () => {
//     try {
//       const res = await fetch("/api/admin/flights", {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setError(data.error || "Failed to fetch flights.");
//         if (data.error === "Admin not found") {
//           setError("Admin account not found. Please log in again.");
//         }
//         return;
//       }
//       setFlights(data.flights);
//     } catch (err) {
//       setError("An error occurred while fetching flights.");
//       console.error("Error fetching flights:", err);
//     }
//   };

//   const fetchAirlines = async () => {
//     try {
//       const res = await fetch("/api/admin/airlines", {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setError(data.error || "Failed to fetch airlines.");
//         if (data.error === "Admin not found") {
//           setError("Admin account not found. Please log in again.");
//         }
//         return;
//       }
//       setAirlines(data.airlines);
//     } catch (err) {
//       setError("An error occurred while fetching airlines.");
//       console.error("Error fetching airlines:", err);
//     }
//   };

//   const fetchGates = async () => {
//     try {
//       const res = await fetch("/api/admin/gate", {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setError(data.error || "Failed to fetch gates.");
//         if (data.error === "Admin not found") {
//           setError("Admin account not found. Please log in again.");
//         }
//         return;
//       }
//       setGates(data.gates);
//     } catch (err) {
//       setError("An error occurred while fetching gates.");
//       console.error("Error fetching gates:", err);
//     }
//   };

//   const handleFlightInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewFlight({ ...newFlight, [name]: value });
//     if (editingFlight) {
//       setEditingFlight({ ...editingFlight, [name]: value });
//     }
//   };

//   const handleAirlineInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewAirline({ ...newAirline, [name]: value });
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
//         setError("Please upload a PNG, JPG, or JPEG file.");
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         setError("File size must be less than 5MB.");
//         return;
//       }
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setNewAirline({ ...newAirline, logo: event.target.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleFlightSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const flightData = editingFlight || newFlight;
//     const {
//       flightNumber,
//       airline,
//       from,
//       to,
//       departure,
//       status,
//       type,
//       price,
//       baggageAllowance,
//       gate,
//     } = flightData;

//     if (
//       !flightNumber.trim() ||
//       !airline ||
//       !from.trim() ||
//       !to.trim() ||
//       !departure ||
//       !status ||
//       !type ||
//       !price ||
//       !baggageAllowance.trim() ||
//       !gate
//     ) {
//       setError("All fields are required.");
//       return;
//     }

//     if (
//       flights.some(
//         (f) =>
//           f.flightNumber.toLowerCase() === flightNumber.trim().toLowerCase() &&
//           (!editingFlight || f._id !== editingFlight._id)
//       )
//     ) {
//       setError("Flight number already exists.");
//       return;
//     }

//     try {
//       const res = await fetch("/api/admin/flights", {
//         method: editingFlight ? "PUT" : "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           ...(editingFlight && { flightId: editingFlight._id }),
//           flightNumber,
//           airline,
//           from,
//           to,
//           departure,
//           status,
//           type,
//           price,
//           baggageAllowance,
//           gate,
//         }),
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         setError(
//           data.error || editingFlight
//             ? "Failed to update flight."
//             : "Failed to create flight."
//         );
//         if (data.error === "Admin not found") {
//           setError("Admin account not found. Please log in again.");
//         }
//         return;
//       }

//       setSuccess(
//         editingFlight
//           ? "Flight updated successfully!"
//           : "Flight created successfully!"
//       );
//       setShowFlightForm(false);
//       setEditingFlight(null);
//       setNewFlight({
//         flightNumber: "",
//         airline: "",
//         from: "",
//         to: "",
//         departure: "",
//         status: "On Time",
//         type: "Domestic",
//         price: "",
//         baggageAllowance: "",
//         gate: "",
//       });
//       fetchFlights();
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//       console.error("Error submitting flight:", err);
//     }
//   };

//   const handleAirlineSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const { name, logo } = newAirline;
//     if (!name.trim() || !logo.trim()) {
//       setError("Airline name and logo are required.");
//       return;
//     }

//     if (
//       airlines.some((a) => a.name.toLowerCase() === name.trim().toLowerCase())
//     ) {
//       setError("Airline name already exists.");
//       return;
//     }

//     try {
//       const res = await fetch("/api/admin/airlines", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ name, logo }),
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to create airline.");
//         if (data.error === "Admin not found") {
//           setError("Admin account not found. Please log in again.");
//         }
//         return;
//       }

//       setSuccess("Airline created successfully!");
//       setShowAirlineForm(false);
//       setNewAirline({ name: "", logo: "" });
//       fetchAirlines();
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//       console.error("Error creating airline:", err);
//     }
//   };

//   const handleDelete = async (flightId) => {
//     setError("");
//     setSuccess("");

//     try {
//       const res = await fetch("/api/admin/flights", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ flightId }),
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to delete flight.");
//         if (data.error === "Admin not found") {
//           setError("Admin account not found. Please log in again.");
//         }
//         return;
//       }

//       setSuccess("Flight deleted successfully!");
//       fetchFlights();
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//       console.error("Error deleting flight:", err);
//     }
//   };

//   const filteredFlights = flights.filter((flight) => {
//     const matchesSearch =
//       flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (flight.airline?.name || "")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       flight.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       flight.to.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter =
//       filter === "All" || flight.type.toLowerCase() === filter.toLowerCase();
//     return matchesSearch && matchesFilter;
//   });

//   const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);
//   const paginated = filteredFlights.slice(
//     (currentPage - 1) * flightsPerPage,
//     currentPage * flightsPerPage
//   );

//   if (!hasMounted) return null;

//   return (
//     <div className="flight-container">
//       <AdminSidebar />
//       <div className="flight-content">
//         <h1 className="flight-title">
//           <FaDoorOpen className="flight-icon-title" /> Manage Flights
//         </h1>

//         <div className="flight-controls">
//           <input
//             type="text"
//             placeholder="Search flights..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="flight-input"
//           />
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="flight-select"
//           >
//             <option value="All">All</option>
//             <option value="Domestic">Domestic</option>
//             <option value="International">International</option>
//           </select>
//           <button
//             className="flight-submit-btn"
//             onClick={() => setShowFlightForm(true)}
//           >
//             Add New Flight
//           </button>
//           <button
//             className="flight-submit-btn"
//             onClick={() => setShowAirlineForm(true)}
//           >
//             Add New Airline
//           </button>
//         </div>

//         {showAirlineForm && (
//           <div className="modal">
//             <div className="modal-content">
//               <h3 className="modal-title">
//                 <FaEdit className="modal-icon" /> Add Airline
//               </h3>
//               <form onSubmit={handleAirlineSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="airlineName" className="flight-label">
//                     Airline Name
//                   </label>
//                   <input
//                     type="text"
//                     id="airlineName"
//                     name="name"
//                     value={newAirline.name}
//                     onChange={handleAirlineInputChange}
//                     className="flight-input"
//                     placeholder="e.g., IndiGo"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="airlineLogo" className="flight-label">
//                     Logo URL
//                   </label>
//                   <input
//                     type="text"
//                     id="airlineLogo"
//                     name="logo"
//                     value={newAirline.logo}
//                     onChange={handleAirlineInputChange}
//                     className="flight-input"
//                     placeholder="e.g., /images/airlinelogo.png"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="logoFile" className="flight-label">
//                     Upload Logo
//                   </label>
//                   <input
//                     type="file"
//                     id="logoFile"
//                     name="logoFile"
//                     accept="image/png,image/jpeg,image/jpg"
//                     onChange={handleFileUpload}
//                     className="flight-input"
//                   />
//                 </div>
//                 <div className="modal-buttons">
//                   <button type="submit" className="flight-submit-btn">
//                     Add Airline
//                   </button>
//                   <button
//                     type="button"
//                     className="cancel-btn"
//                     onClick={() => setShowAirlineForm(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {showFlightForm && (
//           <div className="modal">
//             <div className="modal-content">
//               <h3 className="modal-title">
//                 <FaEdit className="modal-icon" />{" "}
//                 {editingFlight ? "Edit Flight" : "Add Flight"}
//               </h3>
//               <form onSubmit={handleFlightSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="flightNumber" className="flight-label">
//                     Flight Number
//                   </label>
//                   <input
//                     type="text"
//                     id="flightNumber"
//                     name="flightNumber"
//                     value={
//                       editingFlight
//                         ? editingFlight.flightNumber
//                         : newFlight.flightNumber
//                     }
//                     onChange={handleFlightInputChange}
//                     className="flight-input"
//                     placeholder="e.g., FL100"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="airline" className="flight-label">
//                     Airline
//                   </label>
//                   <select
//                     id="airline"
//                     name="airline"
//                     value={
//                       editingFlight ? editingFlight.airline : newFlight.airline
//                     }
//                     onChange={handleFlightInputChange}
//                     className="flight-select"
//                   >
//                     <option value="">Select Airline</option>
//                     {airlines.map((airline) => (
//                       <option key={airline._id} value={airline._id}>
//                         {airline.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="from" className="flight-label">
//                     From
//                   </label>
//                   <input
//                     type="text"
//                     id="from"
//                     name="from"
//                     value={editingFlight ? editingFlight.from : newFlight.from}
//                     onChange={handleFlightInputChange}
//                     className="flight-input"
//                     placeholder="e.g., Mumbai"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="to" className="flight-label">
//                     To
//                   </label>
//                   <input
//                     type="text"
//                     id="to"
//                     name="to"
//                     value={editingFlight ? editingFlight.to : newFlight.to}
//                     onChange={handleFlightInputChange}
//                     className="flight-input"
//                     placeholder="e.g., Dubai"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="departure" className="flight-label">
//                     Departure
//                   </label>
//                   <input
//                     type="datetime-local"
//                     id="departure"
//                     name="departure"
//                     value={
//                       editingFlight
//                         ? new Date(editingFlight.departure)
//                             .toISOString()
//                             .slice(0, 16)
//                         : newFlight.departure
//                     }
//                     onChange={handleFlightInputChange}
//                     className="flight-input"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="status" className="flight-label">
//                     Status
//                   </label>
//                   <select
//                     id="status"
//                     name="status"
//                     value={
//                       editingFlight ? editingFlight.status : newFlight.status
//                     }
//                     onChange={handleFlightInputChange}
//                     className="flight-select"
//                   >
//                     <option value="On Time">On Time</option>
//                     <option value="Delayed">Delayed</option>
//                     <option value="Cancelled">Cancelled</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="type" className="flight-label">
//                     Type
//                   </label>
//                   <select
//                     id="type"
//                     name="type"
//                     value={editingFlight ? editingFlight.type : newFlight.type}
//                     onChange={handleFlightInputChange}
//                     className="flight-select"
//                   >
//                     <option value="Domestic">Domestic</option>
//                     <option value="International">International</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="price" className="flight-label">
//                     Price (₹)
//                   </label>
//                   <input
//                     type="number"
//                     id="price"
//                     name="price"
//                     value={
//                       editingFlight ? editingFlight.price : newFlight.price
//                     }
//                     onChange={handleFlightInputChange}
//                     className="flight-input"
//                     placeholder="e.g., 5000"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="baggageAllowance" className="flight-label">
//                     Baggage Allowance
//                   </label>
//                   <input
//                     type="text"
//                     id="baggageAllowance"
//                     name="baggageAllowance"
//                     value={
//                       editingFlight
//                         ? editingFlight.baggageAllowance
//                         : newFlight.baggageAllowance
//                     }
//                     onChange={handleFlightInputChange}
//                     className="flight-input"
//                     placeholder="e.g., 20kg"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="gate" className="flight-label">
//                     <FaDoorOpen className="flight-icon-label" /> Gate
//                   </label>
//                   <select
//                     id="gate"
//                     name="gate"
//                     value={editingFlight ? editingFlight.gate : newFlight.gate}
//                     onChange={handleFlightInputChange}
//                     className="flight-select"
//                   >
//                     <option value="">Select Gate</option>
//                     {gates.map((gate) => (
//                       <option key={gate._id} value={gate._id}>
//                         {gate.gateNumber}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="modal-buttons">
//                   <button type="submit" className="flight-submit-btn">
//                     {editingFlight ? "Update Flight" : "Add Flight"}
//                   </button>
//                   <button
//                     type="button"
//                     className="cancel-btn"
//                     onClick={() => {
//                       setShowFlightForm(false);
//                       setEditingFlight(null);
//                       setNewFlight({
//                         flightNumber: "",
//                         airline: "",
//                         from: "",
//                         to: "",
//                         departure: "",
//                         status: "On Time",
//                         type: "Domestic",
//                         price: "",
//                         baggageAllowance: "",
//                         gate: "",
//                       });
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         <div className="flight-card-grid">
//           {paginated.length === 0 ? (
//             <p className="no-flights">No flights found.</p>
//           ) : (
//             paginated.map((flight) => (
//               <div key={flight._id} className="flight-card">
//                 <img
//                   src={flight.airline?.logo || "/images/default-logo.png"}
//                   alt={flight.airline?.name || "Airline"}
//                 />
//                 <h3>
//                   {flight.flightNumber} - {flight.airline?.name || "Unknown"}
//                 </h3>
//                 <p>
//                   <strong>From:</strong> {flight.from} <br />
//                   <strong>To:</strong> {flight.to}
//                 </p>
//                 <p>🕒 {new Date(flight.departure).toLocaleString()}</p>
//                 <p>
//                   <strong>Gate:</strong> {flight.gate?.gateNumber || "-"}
//                 </p>
//                 <p>
//                   <strong>Baggage:</strong> {flight.baggageAllowance}
//                 </p>
//                 <p className="flight-price">₹{flight.price}</p>
//                 <p
//                   className={`flight-status-${flight.status
//                     .toLowerCase()
//                     .replace(" ", "-")}`}
//                 >
//                   {flight.status}
//                 </p>
//                 <span className="flight-type">{flight.type}</span>
//                 <div className="flight-actions">
//                   <button
//                     className="action-btn edit-btn"
//                     onClick={() => {
//                       setEditingFlight(flight);
//                       setShowFlightForm(true);
//                     }}
//                   >
//                     <FaEdit /> Edit
//                   </button>
//                   <button
//                     className="action-btn delete-btn"
//                     onClick={() => handleDelete(flight._id)}
//                   >
//                     <FaTrash /> Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="pagination">
//           <button
//             className="pagination-btn"
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button>
//           <span className="pagination-info">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             className="pagination-btn"
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>

//         {error && <p className="flight-error">{error}</p>}
//         {success && <p className="flight-success">{success}</p>}
//       </div>
//       <style jsx>{`
//         .flight-container {
//           display: flex;
//           min-height: 100vh;
//           background: linear-gradient(135deg, #f8fafc, #e6f0ff);
//         }
//         .flight-content {
//           flex: 1;
//           padding: 2.5rem;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 2rem;
//         }
//         .flight-title {
//           font-size: 2.5rem;
//           font-weight: 700;
//           color: #000000;
//           background: linear-gradient(to right, #007bff, #00c4ff);
//           background-clip: text;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }
//         .flight-icon-title {
//           font-size: 2.8rem;
//           color: #007bff;
//           transition: transform 0.3s ease;
//         }
//         .flight-icon-title:hover {
//           transform: scale(1.1);
//         }
//         .flight-controls {
//           display: flex;
//           gap: 1rem;
//           flex-wrap: wrap;
//           width: 100%;
//           max-width: 800px;
//         }
//         .flight-input,
//         .flight-select {
//           padding: 0.75rem;
//           border: 2px solid #e2e8f0;
//           border-radius: 0.5rem;
//           font-size: 1rem;
//           color: #000000;
//           transition: all 0.3s ease;
//           flex: 1;
//         }
//         .flight-input:focus,
//         .flight-select:focus {
//           border-color: #007bff;
//           box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
//           outline: none;
//         }
//         .flight-input::placeholder {
//           color: #a0aec0;
//         }
//         .flight-submit-btn {
//           padding: 0.75rem;
//           background: linear-gradient(to right, #007bff, #00c4ff);
//           color: #ffffff;
//           border: none;
//           border-radius: 0.5rem;
//           font-size: 1rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }
//         .flight-submit-btn:hover {
//           background: linear-gradient(to right, #0056b3, #0096cc);
//           transform: translateY(-2px);
//         }
//         .flight-card-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 1.5rem;
//           width: 100%;
//           max-width: 1200px;
//         }
//         .flight-card {
//           background: #ffffff;
//           padding: 1.5rem;
//           border-radius: 1rem;
//           box-shadow: 0 6px 25px rgba(0, 123, 255, 0.15);
//           transition: transform 0.3s ease;
//         }
//         .flight-card:hover {
//           transform: scale(1.03);
//         }
//         .flight-card img {
//           width: 60px;
//           height: 60px;
//           object-fit: contain;
//           margin-bottom: 0.5rem;
//         }
//         .flight-card h3 {
//           font-size: 1.2rem;
//           font-weight: 600;
//           color: #000000;
//           margin-bottom: 0.5rem;
//         }
//         .flight-card p {
//           font-size: 0.95rem;
//           color: #000000;
//           margin: 0.3rem 0;
//         }
//         .flight-price {
//           font-weight: 600;
//           color: #007bff;
//         }
//         .flight-status-on-time {
//           color: #28a745;
//           font-weight: 500;
//         }
//         .flight-status-delayed {
//           color: #ffc107;
//           font-weight: 500;
//         }
//         .flight-status-cancelled {
//           color: #dc3545;
//           font-weight: 500;
//         }
//         .flight-type {
//           display: inline-block;
//           padding: 0.3rem 0.6rem;
//           background: #e2e8f0;
//           border-radius: 0.5rem;
//           font-size: 0.85rem;
//           color: #000000;
//         }
//         .flight-actions {
//           display: flex;
//           gap: 0.5rem;
//           margin-top: 1rem;
//         }
//         .action-btn {
//           padding: 0.5rem;
//           border: none;
//           border-radius: 0.5rem;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           gap: 0.3rem;
//         }
//         .edit-btn {
//           background: #28a745;
//           color: #ffffff;
//         }
//         .edit-btn:hover {
//           background: #218838;
//         }
//         .delete-btn {
//           background: #dc3545;
//           color: #ffffff;
//         }
//         .delete-btn:hover {
//           background: #c82333;
//         }
//         .no-flights {
//           color: #000000;
//           font-size: 1rem;
//           text-align: center;
//         }
//         .modal {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(0, 0, 0, 0.5);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 1000;
//         }
//         .modal-content {
//           background: #ffffff;
//           padding: 2rem;
//           border-radius: 1rem;
//           box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
//           max-width: 500px;
//           width: 100%;
//         }
//         .modal-title {
//           font-size: 1.5rem;
//           font-weight: 600;
//           color: #000000;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           margin-bottom: 1rem;
//         }
//         .modal-icon {
//           font-size: 1.5rem;
//           color: #007bff;
//         }
//         .form-group {
//           margin-bottom: 1.5rem;
//         }
//         .flight-label {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-size: 1.1rem;
//           font-weight: 600;
//           color: #000000;
//           margin-bottom: 0.5rem;
//         }
//         .flight-icon-label {
//           font-size: 1.4rem;
//           color: #007bff;
//           transition: transform 0.3s ease;
//         }
//         .flight-icon-label:hover {
//           transform: scale(1.1);
//         }
//         .modal-buttons {
//           display: flex;
//           gap: 1rem;
//           margin-top: 1.5rem;
//         }
//         .cancel-btn {
//           padding: 0.75rem;
//           background: #e2e8f0;
//           color: #000000;
//           border: none;
//           border-radius: 0.5rem;
//           font-size: 1rem;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }
//         .cancel-btn:hover {
//           background: #cbd5e1;
//         }
//         .flight-error {
//           color: #dc3545;
//           font-size: 0.9rem;
//           margin-top: 1rem;
//           text-align: center;
//         }
//         .flight-success {
//           color: #28a745;
//           font-size: 0.9rem;
//           margin-top: 1rem;
//           text-align: center;
//         }
//         .pagination {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           gap: 1rem;
//           margin-top: 1rem;
//         }
//         .pagination-btn {
//           padding: 0.5rem 1rem;
//           background: linear-gradient(to right, #007bff, #00c4ff);
//           color: #ffffff;
//           border: none;
//           border-radius: 0.5rem;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }
//         .pagination-btn:disabled {
//           background: #e2e8f0;
//           cursor: not-allowed;
//         }
//         .pagination-btn:hover:not(:disabled) {
//           background: linear-gradient(to right, #0056b3, #0096cc);
//           transform: translateY(-2px);
//         }
//         .pagination-info {
//           font-size: 1rem;
//           color: #000000;
//         }
//         @media (max-width: 768px) {
//           .flight-content {
//             padding: 1.5rem;
//           }
//           .flight-title {
//             font-size: 2rem;
//           }
//           .flight-card-grid {
//             grid-template-columns: 1fr;
//           }
//           .modal-content {
//             padding: 1.5rem;
//             max-width: 90%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import { FaDoorOpen, FaEdit, FaTrash } from "react-icons/fa";
// import AdminSidebar from "../AdminSidebar";
// import "../admin.css";

// export default function ManageFlights() {
//   const [hasMounted, setHasMounted] = useState(false);
//   const [flights, setFlights] = useState([]);
//   const [airlines, setAirlines] = useState([]);
//   const [gates, setGates] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [showFlightForm, setShowFlightForm] = useState(false);
//   const [showAirlineForm, setShowAirlineForm] = useState(false);
//   const [newFlight, setNewFlight] = useState({
//     flightNumber: "",
//     airline: "",
//     from: "",
//     to: "",
//     departure: "",
//     status: "On Time",
//     type: "Domestic",
//     price: "",
//     baggageAllowance: "",
//     gate: "",
//   });
//   const [newAirline, setNewAirline] = useState({ name: "", logo: "" });
//   const [editingFlight, setEditingFlight] = useState(null);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const flightsPerPage = 8;

//   useEffect(() => {
//     setHasMounted(true);
//     fetchFlights();
//     fetchAirlines();
//     fetchGates();
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, filter]);

//   const fetchFlights = async () => {
//     try {
//       const res = await fetch("/api/admin/flights", {
//         // Fixed endpoint
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setError(data.error || "Failed to fetch flights.");
//         console.error(
//           "fetchFlights - Status:",
//           res.status,
//           "Error:",
//           data.error
//         );
//         return;
//       }
//       setFlights(data.flights);
//     } catch (err) {
//       setError("An error occurred while fetching flights.");
//       console.error("fetchFlights - Error:", err.message);
//     }
//   };

//   const fetchAirlines = async () => {
//     try {
//       const res = await fetch("/api/admin/airlines", {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setError(data.error || "Failed to fetch airlines.");
//         console.error(
//           "fetchAirlines - Status:",
//           res.status,
//           "Error:",
//           data.error
//         );
//         return;
//       }
//       setAirlines(data.airlines);
//     } catch (err) {
//       setError("An error occurred while fetching airlines.");
//       console.error("fetchAirlines - Error:", err.message);
//     }
//   };

//   const fetchGates = async () => {
//     try {
//       const res = await fetch("/api/admin/gate", {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setError(data.error || "Failed to fetch gates.");
//         console.error("fetchGates - Status:", res.status, "Error:", data.error);
//         return;
//       }
//       setGates(data.gates);
//     } catch (err) {
//       setError("An error occurred while fetching gates.");
//       console.error("fetchGates - Error:", err.message);
//     }
//   };

//   const handleFlightInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewFlight({ ...newFlight, [name]: value });
//     if (editingFlight) {
//       setEditingFlight({ ...editingFlight, [name]: value });
//     }
//   };

//   const handleAirlineInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewAirline({ ...newAirline, [name]: value });
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
//         setError("Please upload a PNG, JPG, or JPEG file.");
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         setError("File size must be less than 5MB.");
//         return;
//       }
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setNewAirline({ ...newAirline, logo: event.target.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleFlightSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const flightData = editingFlight || newFlight;
//     const {
//       flightNumber,
//       airline,
//       from,
//       to,
//       departure,
//       status,
//       type,
//       price,
//       baggageAllowance,
//       gate,
//     } = flightData;

//     if (
//       !flightNumber.trim() ||
//       !airline ||
//       !from.trim() ||
//       !to.trim() ||
//       !departure ||
//       !status ||
//       !type ||
//       !price ||
//       !baggageAllowance.trim() ||
//       !gate
//     ) {
//       setError("All fields are required.");
//       console.error("handleFlightSubmit - Validation failed: Missing fields");
//       return;
//     }

//     if (isNaN(price) || parseFloat(price) <= 0) {
//       setError("Price must be a positive number.");
//       console.error("handleFlightSubmit - Validation failed: Invalid price");
//       return;
//     }

//     try {
//       const res = await fetch("/api/admin/flights", {
//         // Fixed endpoint
//         method: editingFlight ? "PUT" : "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           ...(editingFlight && { flightId: editingFlight._id }),
//           flightNumber: flightNumber.trim(),
//           airline,
//           from: from.trim(),
//           to: to.trim(),
//           departure, // Send as-is, backend handles Date conversion
//           status,
//           type,
//           price: parseFloat(price),
//           baggageAllowance: baggageAllowance.trim(),
//           gate,
//         }),
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         setError(
//           data.error ||
//             (editingFlight
//               ? "Failed to update flight."
//               : "Failed to create flight.")
//         );
//         console.error(
//           "handleFlightSubmit - Status:",
//           res.status,
//           "Error:",
//           data.error
//         );
//         return;
//       }

//       setSuccess(
//         editingFlight
//           ? "Flight updated successfully!"
//           : "Flight created successfully!"
//       );
//       setShowFlightForm(false);
//       setEditingFlight(null);
//       setNewFlight({
//         flightNumber: "",
//         airline: "",
//         from: "",
//         to: "",
//         departure: "",
//         status: "On Time",
//         type: "Domestic",
//         price: "",
//         baggageAllowance: "",
//         gate: "",
//       });
//       fetchFlights();
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//       console.error("handleFlightSubmit - Error:", err.message);
//     }
//   };

//   const handleAirlineSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const { name, logo } = newAirline;
//     if (!name.trim() || !logo.trim()) {
//       setError("Airline name and logo are required.");
//       console.error("handleAirlineSubmit - Validation failed: Missing fields");
//       return;
//     }

//     try {
//       const res = await fetch("/api/admin/airlines", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ name: name.trim(), logo: logo.trim() }),
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to create airline.");
//         console.error(
//           "handleAirlineSubmit - Status:",
//           res.status,
//           "Error:",
//           data.error
//         );
//         return;
//       }

//       setSuccess("Airline created successfully!");
//       setShowAirlineForm(false);
//       setNewAirline({ name: "", logo: "" });
//       fetchAirlines();
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//       console.error("handleAirlineSubmit - Error:", err.message);
//     }
//   };

//   const handleDelete = async (flightId) => {
//     setError("");
//     setSuccess("");

//     try {
//       const res = await fetch("/api/admin/flights", {
//         // Fixed endpoint
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ flightId }),
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to delete flight.");
//         console.error(
//           "handleDelete - Status:",
//           res.status,
//           "Error:",
//           data.error
//         );
//         return;
//       }

//       setSuccess("Flight deleted successfully!");
//       fetchFlights();
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//       console.error("handleDelete - Error:", err.message);
//     }
//   };

//   const filteredFlights = flights.filter((flight) => {
//     const matchesSearch =
//       flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (flight.airline?.name || "")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       flight.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       flight.to.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter =
//       filter === "All" || flight.type.toLowerCase() === filter.toLowerCase();
//     return matchesSearch && matchesFilter;
//   });

//   const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);
//   const paginated = filteredFlights.slice(
//     (currentPage - 1) * flightsPerPage,
//     currentPage * flightsPerPage
//   );

//   if (!hasMounted) return null;

//   return (
//     <div className="flight-container">
//       <AdminSidebar />
//       <div className="flight-content">
//         <h1 className="flight-title">
//           <FaDoorOpen className="flight-icon-title" /> Manage Flights
//         </h1>

//         <div className="flight-controls">
//           <input
//             type="text"
//             placeholder="Search flights..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="flight-input"
//           />
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="flight-select"
//           >
//             <option value="All">All</option>
//             <option value="Domestic">Domestic</option>
//             <option value="International">International</option>
//           </select>
//           <button
//             className="flight-submit-btn"
//             onClick={() => setShowFlightForm(true)}
//           >
//             Add New Flight
//           </button>
//           <button
//             className="flight-submit-btn"
//             onClick={() => setShowAirlineForm(true)}
//           >
//             Add New Airline
//           </button>
//         </div>

//         {showAirlineForm && (
//           <div className="modal">
//             <div className="modal-content">
//               <h3 className="modal-title">
//                 <FaEdit className="modal-icon" /> Add Airline
//               </h3>
//               <form onSubmit={handleAirlineSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="airlineName" className="flight-label">
//                     Airline Name
//                   </label>
//                   <input
//                     type="text"
//                     id="airlineName"
//                     name="name"
//                     value={newAirline.name}
//                     onChange={handleAirlineInputChange}
//                     className="flight-input"
//                     placeholder="e.g., IndiGo"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="airlineLogo" className="flight-label">
//                     Logo URL
//                   </label>
//                   <input
//                     type="text"
//                     id="airlineLogo"
//                     name="logo"
//                     value={newAirline.logo}
//                     onChange={handleAirlineInputChange}
//                     className="flight-input"
//                     placeholder="e.g., /images/airlinelogo.png"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="logoFile" className="flight-label">
//                     Upload Logo
//                   </label>
//                   <input
//                     type="file"
//                     id="logoFile"
//                     name="logoFile"
//                     accept="image/png,image/jpeg,image/jpg"
//                     onChange={handleFileUpload}
//                     className="flight-input"
//                   />
//                 </div>
//                 <div className="modal-buttons">
//                   <button type="submit" className="flight-submit-btn">
//                     Add Airline
//                   </button>
//                   <button
//                     type="button"
//                     className="cancel-btn"
//                     onClick={() => setShowAirlineForm(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {showFlightForm && (
//           <div className="modal">
//             <div className="modal-content modal-scrollable">
//               <h3 className="modal-title">
//                 <FaEdit className="modal-icon" />{" "}
//                 {editingFlight ? "Edit Flight" : "Add Flight"}
//               </h3>
//               <form onSubmit={handleFlightSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="flightNumber" className="flight-label">
//                     Flight Number
//                   </label>
//                   <input
//                     type="text"
//                     id="flightNumber"
//                     name="flightNumber"
//                     value={
//                       editingFlight
//                         ? editingFlight.flightNumber
//                         : newFlight.flightNumber
//                     }
//                     onChange={handleFlightInputChange}
//                     className="flight-input"
//                     placeholder="e.g., FL100"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="airline" className="flight-label">
//                     Airline
//                   </label>
//                   <select
//                     id="airline"
//                     name="airline"
//                     value={
//                       editingFlight ? editingFlight.airline : newFlight.airline
//                     }
//                     onChange={handleFlightInputChange}
//                     className="flight-select"
//                   >
//                     <option value="">Select Airline</option>
//                     {airlines.map((airline) => (
//                       <option key={airline._id} value={airline._id}>
//                         {airline.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="from" className="flight-label">
//                     From
//                   </label>
//                   <input
//                     type="text"
//                     id="from"
//                     name="from"
//                     value={editingFlight ? editingFlight.from : newFlight.from}
//                     onChange={handleFlightInputChange}
//                     className="flight-input"
//                     placeholder="e.g., Mumbai"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="to" className="flight-label">
//                     To
//                   </label>
//                   <input
//                     type="text"
//                     id="to"
//                     name="to"
//                     value={editingFlight ? editingFlight.to : newFlight.to}
//                     onChange={handleFlightInputChange}
//                     className="flight-input"
//                     placeholder="e.g., Dubai"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="departure" className="flight-label">
//                     Departure
//                   </label>
//                   <input
//                     type="datetime-local"
//                     id="departure"
//                     name="departure"
//                     value={
//                       editingFlight
//                         ? new Date(editingFlight.departure)
//                             .toISOString()
//                             .slice(0, 16)
//                         : newFlight.departure
//                     }
//                     onChange={handleFlightInputChange}
//                     className="flight-input"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="status" className="flight-label">
//                     Status
//                   </label>
//                   <select
//                     id="status"
//                     name="status"
//                     value={
//                       editingFlight ? editingFlight.status : newFlight.status
//                     }
//                     onChange={handleFlightInputChange}
//                     className="flight-select"
//                   >
//                     <option value="On Time">On Time</option>
//                     <option value="Delayed">Delayed</option>
//                     <option value="Cancelled">Cancelled</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="type" className="flight-label">
//                     Type
//                   </label>
//                   <select
//                     id="type"
//                     name="type"
//                     value={editingFlight ? editingFlight.type : newFlight.type}
//                     onChange={handleFlightInputChange}
//                     className="flight-select"
//                   >
//                     <option value="Domestic">Domestic</option>
//                     <option value="International">International</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="price" className="flight-label">
//                     Price (₹)
//                   </label>
//                   <input
//                     type="number"
//                     id="price"
//                     name="price"
//                     value={
//                       editingFlight ? editingFlight.price : newFlight.price
//                     }
//                     onChange={handleFlightInputChange}
//                     className="flight-input"
//                     placeholder="e.g., 5000"
//                     min="0"
//                     step="0.01"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="baggageAllowance" className="flight-label">
//                     Baggage Allowance
//                   </label>
//                   <input
//                     type="text"
//                     id="baggageAllowance"
//                     name="baggageAllowance"
//                     value={
//                       editingFlight
//                         ? editingFlight.baggageAllowance
//                         : newFlight.baggageAllowance
//                     }
//                     onChange={handleFlightInputChange}
//                     className="flight-input"
//                     placeholder="e.g., 20kg"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="gate" className="flight-label">
//                     <FaDoorOpen className="flight-icon-label" /> Gate
//                   </label>
//                   <select
//                     id="gate"
//                     name="gate"
//                     value={editingFlight ? editingFlight.gate : newFlight.gate}
//                     onChange={handleFlightInputChange}
//                     className="flight-select"
//                   >
//                     <option value="">Select Gate</option>
//                     {gates.map((gate) => (
//                       <option key={gate._id} value={gate._id}>
//                         {gate.gateNumber}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="modal-buttons">
//                   <button type="submit" className="flight-submit-btn">
//                     {editingFlight ? "Update Flight" : "Add Flight"}
//                   </button>
//                   <button
//                     type="button"
//                     className="cancel-btn"
//                     onClick={() => {
//                       setShowFlightForm(false);
//                       setEditingFlight(null);
//                       setNewFlight({
//                         flightNumber: "",
//                         airline: "",
//                         from: "",
//                         to: "",
//                         departure: "",
//                         status: "On Time",
//                         type: "Domestic",
//                         price: "",
//                         baggageAllowance: "",
//                         gate: "",
//                       });
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         <div className="flight-card-grid">
//           {paginated.length === 0 ? (
//             <p className="no-flights">No flights found.</p>
//           ) : (
//             paginated.map((flight) => (
//               <div key={flight._id} className="flight-card">
//                 <img
//                   src={flight.airline?.logo || "/images/default-logo.png"}
//                   alt={flight.airline?.name || "Airline"}
//                 />
//                 <h3>
//                   {flight.flightNumber} - {flight.airline?.name || "Unknown"}
//                 </h3>
//                 <p>
//                   <strong>From:</strong> {flight.from} <br />
//                   <strong>To:</strong> {flight.to}
//                 </p>
//                 <p>🕒 {new Date(flight.departure).toLocaleString()}</p>
//                 <p>
//                   <strong>Gate:</strong> {flight.gate?.gateNumber || "-"}
//                 </p>
//                 <p>
//                   <strong>Baggage:</strong> {flight.baggageAllowance}
//                 </p>
//                 <p className="flight-price">₹{flight.price}</p>
//                 <p
//                   className={`flight-status-${flight.status
//                     .toLowerCase()
//                     .replace(" ", "-")}`}
//                 >
//                   {flight.status}
//                 </p>
//                 <span className="flight-type">{flight.type}</span>
//                 <div className="flight-actions">
//                   <button
//                     className="action-btn edit-btn"
//                     onClick={() => {
//                       setEditingFlight({
//                         ...flight,
//                         departure: new Date(flight.departure)
//                           .toISOString()
//                           .slice(0, 16),
//                       });
//                       setShowFlightForm(true);
//                     }}
//                   >
//                     <FaEdit /> Edit
//                   </button>
//                   <button
//                     className="action-btn delete-btn"
//                     onClick={() => handleDelete(flight._id)}
//                   >
//                     <FaTrash /> Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="pagination">
//           <button
//             className="pagination-btn"
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button>
//           <span className="pagination-info">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             className="pagination-btn"
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>

//         {error && <p className="flight-error">{error}</p>}
//         {success && <p className="flight-success">{success}</p>}
//       </div>
//       <style jsx>
//         {`
//           .flight-container {
//             display: flex;
//             min-height: 100vh;
//             background: linear-gradient(135deg, #f8fafc, #e6f0ff);
//           }
//           .flight-content {
//             flex: 1;
//             padding: 2.5rem;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             gap: 2rem;
//           }
//           .flight-title {
//             font-size: 2.5rem;
//             font-weight: 700;
//             color: #000000;
//             background: linear-gradient(to right, #007bff, #00c4ff);
//             background-clip: text;
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//             display: flex;
//             align-items: center;
//             gap: 0.5rem;
//           }
//           .flight-icon-title {
//             font-size: 2.8rem;
//             color: #007bff;
//             transition: transform 0.3s ease;
//           }
//           .flight-icon-title:hover {
//             transform: scale(1.1);
//           }
//           .flight-controls {
//             display: flex;
//             gap: 1rem;
//             flex-wrap: wrap;
//             width: 100%;
//             max-width: 800px;
//           }
//           .flight-input,
//           .flight-select {
//             padding: 0.75rem;
//             border: 2px solid #e2e8f0;
//             border-radius: 0.5rem;
//             font-size: 1rem;
//             color: #000000;
//             transition: all 0.3s ease;
//             flex: 1;
//           }
//           .flight-input:focus,
//           .flight-select:focus {
//             border-color: #007bff;
//             box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
//             outline: none;
//           }
//           .flight-input::placeholder {
//             color: #a0aec0;
//           }
//           .flight-submit-btn {
//             padding: 0.75rem;
//             background: linear-gradient(to right, #007bff, #00c4ff);
//             color: #ffffff;
//             border: none;
//             border-radius: 0.5rem;
//             font-size: 1rem;
//             font-weight: 600;
//             cursor: pointer;
//             transition: all 0.3s ease;
//           }
//           .flight-submit-btn:hover {
//             background: linear-gradient(to right, #0056b3, #0096cc);
//             transform: translateY(-2px);
//           }
//           .flight-card-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//             gap: 1.5rem;
//             width: 100%;
//             max-width: 1200px;
//           }
//           .flight-card {
//             background: #ffffff;
//             padding: 1.5rem;
//             border-radius: 1rem;
//             box-shadow: 0 6px 25px rgba(0, 123, 255, 0.15);
//             transition: transform 0.3s ease;
//           }
//           .flight-card:hover {
//             transform: scale(1.03);
//           }
//           .flight-card img {
//             width: 60px;
//             height: 60px;
//             object-fit: contain;
//             margin-bottom: 0.5rem;
//           }
//           .flight-card h3 {
//             font-size: 1.2rem;
//             font-weight: 600;
//             color: #000000;
//             margin-bottom: 0.5rem;
//           }
//           .flight-card p {
//             font-size: 0.95rem;
//             color: #000000;
//             margin: 0.3rem 0;
//           }
//           .flight-price {
//             font-weight: 600;
//             color: #007bff;
//           }
//           .flight-status-on-time {
//             color: #28a745;
//             font-weight: 500;
//           }
//           .flight-status-delayed {
//             color: #ffc107;
//             font-weight: 500;
//           }
//           .flight-status-cancelled {
//             color: #dc3545;
//             font-weight: 500;
//           }
//           .flight-type {
//             display: inline-block;
//             padding: 0.3rem 0.6rem;
//             background: #e2e8f0;
//             border-radius: 0.5rem;
//             font-size: 0.85rem;
//             color: #000000;
//           }
//           .flight-actions {
//             display: flex;
//             gap: 0.5rem;
//             margin-top: 1rem;
//           }
//           .action-btn {
//             padding: 0.5rem;
//             border: none;
//             border-radius: 0.5rem;
//             cursor: pointer;
//             transition: all 0.3s ease;
//             display: flex;
//             align-items: center;
//             gap: 0.3rem;
//           }
//           .edit-btn {
//             background: #28a745;
//             color: #ffffff;
//           }
//           .edit-btn:hover {
//             background: #218838;
//           }
//           .delete-btn {
//             background: #dc3545;
//             color: #ffffff;
//           }
//           .delete-btn:hover {
//             background: #c82333;
//           }
//           .no-flights {
//             color: #000000;
//             font-size: 1rem;
//             text-align: center;
//           }
//           .modal {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: rgba(0, 0, 0, 0.5);
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             z-index: 1000;
//           }
//           .modal-content {
//             background: #ffffff;
//             padding: 2rem;
//             border-radius: 1rem;
//             box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
//             max-width: 500px;
//             width: 100%;
//           }
//           .modal-scrollable {
//             max-height: 80vh;
//             overflow-y: auto;
//             scrollbar-width: thin;
//             scrollbar-color: #007bff #e2e8f0;
//           }
//           .modal-scrollable::-webkit-scrollbar {
//             width: 8px;
//           }
//           .modal-scrollable::-webkit-scrollbar-track {
//             background: #e2e8f0;
//             border-radius: 4px;
//           }
//           .modal-scrollable::-webkit-scrollbar-thumb {
//             background: #007bff;
//             border-radius: 4px;
//           }
//           .modal-scrollable::-webkit-scrollbar-thumb:hover {
//             background: #0056b3;
//           }
//           .modal-title {
//             font-size: 1.5rem;
//             font-weight: 600;
//             color: #000000;
//             display: flex;
//             align-items: center;
//             gap: 0.5rem;
//             margin-bottom: 1rem;
//           }
//           .modal-icon {
//             font-size: 1.5rem;
//             color: #007bff;
//           }
//           .form-group {
//             margin-bottom: 1.5rem;
//           }
//           .flight-label {
//             display: flex;
//             align-items: center;
//             gap: 0.5rem;
//             font-size: 1.1rem;
//             font-weight: 600;
//             color: #000000;
//             margin-bottom: 0.5rem;
//           }
//           .flight-icon-label {
//             font-size: 1.4rem;
//             color: #007bff;
//             transition: transform 0.3s ease;
//           }
//           .flight-icon-label:hover {
//             transform: scale(1.1);
//           }
//           .modal-buttons {
//             display: flex;
//             gap: 1rem;
//             margin-top: 1.5rem;
//           }
//           .cancel-btn {
//             padding: 0.75rem;
//             background: #e2e8f0;
//             color: #000000;
//             border: none;
//             border-radius: 0.5rem;
//             font-size: 1rem;
//             cursor: pointer;
//             transition: all 0.3s ease;
//           }
//           .cancel-btn:hover {
//             background: #cbd5e1;
//           }
//           .flight-error {
//             color: #dc3545;
//             font-size: 0.9rem;
//             margin-top: 1rem;
//             text-align: center;
//           }
//           .flight-success {
//             color: #28a745;
//             font-size: 0.9rem;
//             margin-top: 1rem;
//             text-align: center;
//           }
//           .pagination {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             gap: 1rem;
//             margin-top: 1rem;
//           }
//           .pagination-btn {
//             padding: 0.5rem 1rem;
//             background: linear-gradient(to right, #007bff, #00c4ff);
//             color: #ffffff;
//             border: none;
//             border-radius: 0.5rem;
//             cursor: pointer;
//             transition: all 0.3s ease;
//           }
//           .pagination-btn:disabled {
//             background: #e2e8f0;
//             cursor: not-allowed;
//           }
//           .pagination-btn:hover:not(:disabled) {
//             background: linear-gradient(to right, #0056b3, #0096cc);
//             transform: translateY(-2px);
//           }
//           .pagination-info {
//             font-size: 1rem;
//             color: #000000;
//           }
//           @media (max-width: 768px) {
//             .flight-content {
//               padding: 1.5rem;
//             }
//             .flight-title {
//               font-size: 2rem;
//             }
//             .flight-card-grid {
//               grid-template-columns: 1fr;
//             }
//             .modal-content {
//               padding: 1.5rem;
//               max-width: 90%;
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { FaDoorOpen, FaEdit, FaTrash, FaPlane } from "react-icons/fa";
import AdminSidebar from "../AdminSidebar";
import "../admin.css";

export default function ManageFlights() {
  const [hasMounted, setHasMounted] = useState(false);
  const [flights, setFlights] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [gates, setGates] = useState([]);
  const [currentFlightPage, setCurrentFlightPage] = useState(1);
  const [currentAirlinePage, setCurrentAirlinePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [showFlightForm, setShowFlightForm] = useState(false);
  const [showAirlineForm, setShowAirlineForm] = useState(false);
  const [view, setView] = useState("flights"); // Track current view (flights or airlines)
  const [newFlight, setNewFlight] = useState({
    flightNumber: "",
    airline: "",
    from: "",
    to: "",
    departure: "",
    status: "On Time",
    type: "Domestic",
    price: "",
    baggageAllowance: "",
    gate: "",
  });
  const [newAirline, setNewAirline] = useState({ name: "", logo: "" });
  const [editingFlight, setEditingFlight] = useState(null);
  const [editingAirline, setEditingAirline] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const itemsPerPage = 4  ;

  useEffect(() => {
    setHasMounted(true);
    fetchFlights();
    fetchAirlines();
    fetchGates();
  }, []);

  useEffect(() => {
    setCurrentFlightPage(1);
    setCurrentAirlinePage(1);
  }, [searchTerm, filter]);

  const fetchFlights = async () => {
    try {
      const res = await fetch("/api/admin/flights", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to fetch flights.");
        console.error(
          "fetchFlights - Status:",
          res.status,
          "Error:",
          data.error
        );
        return;
      }
      setFlights(data.flights);
    } catch (err) {
      setError("An error occurred while fetching flights.");
      console.error("fetchFlights - Error:", err.message);
    }
  };

  const fetchAirlines = async () => {
    try {
      const res = await fetch("/api/admin/airlines", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to fetch airlines.");
        console.error(
          "fetchAirlines - Status:",
          res.status,
          "Error:",
          data.error
        );
        return;
      }
      setAirlines(data.airlines);
    } catch (err) {
      setError("An error occurred while fetching airlines.");
      console.error("fetchAirlines - Error:", err.message);
    }
  };

  const fetchGates = async () => {
    try {
      const res = await fetch("/api/admin/gate", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to fetch gates.");
        console.error("fetchGates - Status:", res.status, "Error:", data.error);
        return;
      }
      setGates(data.gates);
    } catch (err) {
      setError("An error occurred while fetching gates.");
      console.error("fetchGates - Error:", err.message);
    }
  };

  const handleFlightInputChange = (e) => {
    const { name, value } = e.target;
    setNewFlight({ ...newFlight, [name]: value });
    if (editingFlight) {
      setEditingFlight({ ...editingFlight, [name]: value });
    }
  };

  const handleAirlineInputChange = (e) => {
    const { name, value } = e.target;
    setNewAirline({ ...newAirline, [name]: value });
    if (editingAirline) {
      setEditingAirline({ ...editingAirline, [name]: value });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        setError("Please upload a PNG, JPG, or JPEG file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewAirline({ ...newAirline, logo: event.target.result });
        if (editingAirline) {
          setEditingAirline({ ...editingAirline, logo: event.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFlightSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const flightData = editingFlight || newFlight;
    const {
      flightNumber,
      airline,
      from,
      to,
      departure,
      status,
      type,
      price,
      baggageAllowance,
      gate,
    } = flightData;

    if (
      !flightNumber.trim() ||
      !airline ||
      !from.trim() ||
      !to.trim() ||
      !departure ||
      !status ||
      !type ||
      !price ||
      !baggageAllowance.trim() ||
      !gate
    ) {
      setError("All fields are required.");
      console.error("handleFlightSubmit - Validation failed: Missing fields");
      return;
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      setError("Price must be a positive number.");
      console.error("handleFlightSubmit - Validation failed: Invalid price");
      return;
    }

    try {
      const res = await fetch("/api/admin/flights", {
        method: editingFlight ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...(editingFlight && { flightId: editingFlight._id }),
          flightNumber: flightNumber.trim(),
          airline,
          from: from.trim(),
          to: to.trim(),
          departure,
          status,
          type,
          price: parseFloat(price),
          baggageAllowance: baggageAllowance.trim(),
          gate,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error ||
            (editingFlight
              ? "Failed to update flight."
              : "Failed to create flight.")
        );
        console.error(
          "handleFlightSubmit - Status:",
          res.status,
          "Error:",
          data.error
        );
        return;
      }

      setSuccess(
        editingFlight
          ? "Flight updated successfully!"
          : "Flight created successfully!"
      );
      setShowFlightForm(false);
      setEditingFlight(null);
      setNewFlight({
        flightNumber: "",
        airline: "",
        from: "",
        to: "",
        departure: "",
        status: "On Time",
        type: "Domestic",
        price: "",
        baggageAllowance: "",
        gate: "",
      });
      fetchFlights();
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("handleFlightSubmit - Error:", err.message);
    }
  };

  const handleAirlineSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const airlineData = editingAirline || newAirline;
    const { name, logo } = airlineData;
    if (!name.trim() || !logo.trim()) {
      setError("Airline name and logo are required.");
      console.error("handleAirlineSubmit - Validation failed: Missing fields");
      return;
    }

    try {
      const res = await fetch("/api/admin/airlines", {
        method: editingAirline ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...(editingAirline && { airlineId: editingAirline._id }),
          name: name.trim(),
          logo: logo.trim(),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error ||
            (editingAirline
              ? "Failed to update airline."
              : "Failed to create airline.")
        );
        console.error(
          "handleAirlineSubmit - Status:",
          res.status,
          "Error:",
          data.error
        );
        return;
      }

      setSuccess(
        editingAirline
          ? "Airline updated successfully!"
          : "Airline created successfully!"
      );
      setShowAirlineForm(false);
      setEditingAirline(null);
      setNewAirline({ name: "", logo: "" });
      fetchAirlines();
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("handleAirlineSubmit - Error:", err.message);
    }
  };

  const handleAirlineDelete = async (airlineId) => {
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/airlines", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ airlineId }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to delete airline.");
        console.error(
          "handleAirlineDelete - Status:",
          res.status,
          "Error:",
          data.error
        );
        return;
      }

      setSuccess("Airline deleted successfully!");
      fetchAirlines();
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("handleAirlineDelete - Error:", err.message);
    }
  };

  const handleDelete = async (flightId) => {
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/flights", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ flightId }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to delete flight.");
        console.error(
          "handleDelete - Status:",
          res.status,
          "Error:",
          data.error
        );
        return;
      }

      setSuccess("Flight deleted successfully!");
      fetchFlights();
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("handleDelete - Error:", err.message);
    }
  };

  const filteredFlights = flights.filter((flight) => {
    const matchesSearch =
      flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (flight.airline?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      flight.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.to.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "All" || flight.type.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const filteredAirlines = airlines.filter((airline) =>
    airline.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalFlightPages = Math.ceil(filteredFlights.length / itemsPerPage);
  const totalAirlinePages = Math.ceil(filteredAirlines.length / itemsPerPage);
  const paginatedFlights = filteredFlights.slice(
    (currentFlightPage - 1) * itemsPerPage,
    currentFlightPage * itemsPerPage
  );
  const paginatedAirlines = filteredAirlines.slice(
    (currentAirlinePage - 1) * itemsPerPage,
    currentAirlinePage * itemsPerPage
  );

  if (!hasMounted) return null;

  return (
    <div className="flight-container">
      <AdminSidebar />
      <div className="flight-content">
        <h1 className="flight-title">
          {view === "flights" ? (
            <>
              <FaDoorOpen className="flight-icon-title" /> Manage Flights
            </>
          ) : (
            <>
              <FaPlane className="flight-icon-title" /> Manage Airlines
            </>
          )}
        </h1>

        <div className="flight-controls">
          <input
            type="text"
            placeholder={
              view === "flights" ? "Search flights..." : "Search airlines..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flight-input"
          />
          {view === "flights" && (
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flight-select"
            >
              <option value="All">All</option>
              <option value="Domestic">Domestic</option>
              <option value="International">International</option>
            </select>
          )}
          <button
            className="flight-submit-btn toggle-btn"
            onClick={() => {
              setView(view === "flights" ? "airlines" : "flights");
              setSearchTerm("");
              setFilter("All");
              setCurrentFlightPage(1);
              setCurrentAirlinePage(1);
            }}
          >
            {view === "flights" ? (
              <>
                <FaPlane className="btn-icon" /> Show Airlines
              </>
            ) : (
              <>
                <FaDoorOpen className="btn-icon" /> Show Flights
              </>
            )}
          </button>
          {view === "flights" && (
            <button
              className="flight-submit-btn"
              onClick={() => setShowFlightForm(true)}
            >
              Add New Flight
            </button>
          )}
          <button
            className="flight-submit-btn"
            onClick={() => setShowAirlineForm(true)}
          >
            Add New Airline
          </button>
        </div>

        {showAirlineForm && (
          <div className="modal">
            <div className="modal-content">
              <h3 className="modal-title">
                <FaEdit className="modal-icon" />{" "}
                {editingAirline ? "Edit Airline" : "Add Airline"}
              </h3>
              <form onSubmit={handleAirlineSubmit}>
                <div className="form-group">
                  <label htmlFor="airlineName" className="flight-label">
                    Airline Name
                  </label>
                  <input
                    type="text"
                    id="airlineName"
                    name="name"
                    value={
                      editingAirline ? editingAirline.name : newAirline.name
                    }
                    onChange={handleAirlineInputChange}
                    className="flight-input"
                    placeholder="e.g., IndiGo"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="airlineLogo" className="flight-label">
                    Logo URL
                  </label>
                  <input
                    type="text"
                    id="airlineLogo"
                    name="logo"
                    value={
                      editingAirline ? editingAirline.logo : newAirline.logo
                    }
                    onChange={handleAirlineInputChange}
                    className="flight-input"
                    placeholder="e.g., /images/airlinelogo.png"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="logoFile" className="flight-label">
                    Upload Logo
                  </label>
                  <input
                    type="file"
                    id="logoFile"
                    name="logoFile"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleFileUpload}
                    className="flight-input"
                  />
                </div>
                <div className="modal-buttons">
                  <button type="submit" className="flight-submit-btn">
                    {editingAirline ? "Update Airline" : "Add Airline"}
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setShowAirlineForm(false);
                      setEditingAirline(null);
                      setNewAirline({ name: "", logo: "" });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showFlightForm && (
          <div className="modal">
            <div className="modal-content modal-scrollable">
              <h3 className="modal-title">
                <FaEdit className="modal-icon" />{" "}
                {editingFlight ? "Edit Flight" : "Add Flight"}
              </h3>
              <form onSubmit={handleFlightSubmit}>
                <div className="form-group">
                  <label htmlFor="flightNumber" className="flight-label">
                    Flight Number
                  </label>
                  <input
                    type="text"
                    id="flightNumber"
                    name="flightNumber"
                    value={
                      editingFlight
                        ? editingFlight.flightNumber
                        : newFlight.flightNumber
                    }
                    onChange={handleFlightInputChange}
                    className="flight-input"
                    placeholder="e.g., FL100"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="airline" className="flight-label">
                    Airline
                  </label>
                  <select
                    id="airline"
                    name="airline"
                    value={
                      editingFlight ? editingFlight.airline : newFlight.airline
                    }
                    onChange={handleFlightInputChange}
                    className="flight-select"
                  >
                    <option value="">Select Airline</option>
                    {airlines.map((airline) => (
                      <option key={airline._id} value={airline._id}>
                        {airline.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="from" className="flight-label">
                    From
                  </label>
                  <input
                    type="text"
                    id="from"
                    name="from"
                    value={editingFlight ? editingFlight.from : newFlight.from}
                    onChange={handleFlightInputChange}
                    className="flight-input"
                    placeholder="e.g., Mumbai"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="to" className="flight-label">
                    To
                  </label>
                  <input
                    type="text"
                    id="to"
                    name="to"
                    value={editingFlight ? editingFlight.to : newFlight.to}
                    onChange={handleFlightInputChange}
                    className="flight-input"
                    placeholder="e.g., Dubai"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="departure" className="flight-label">
                    Departure
                  </label>
                  <input
                    type="datetime-local"
                    id="departure"
                    name="departure"
                    value={
                      editingFlight
                        ? new Date(editingFlight.departure)
                            .toISOString()
                            .slice(0, 16)
                        : newFlight.departure
                    }
                    onChange={handleFlightInputChange}
                    className="flight-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status" className="flight-label">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={
                      editingFlight ? editingFlight.status : newFlight.status
                    }
                    onChange={handleFlightInputChange}
                    className="flight-select"
                  >
                    <option value="On Time">On Time</option>
                    <option value="Delayed">Delayed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="type" className="flight-label">
                    Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={editingFlight ? editingFlight.type : newFlight.type}
                    onChange={handleFlightInputChange}
                    className="flight-select"
                  >
                    <option value="Domestic">Domestic</option>
                    <option value="International">International</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="price" className="flight-label">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={
                      editingFlight ? editingFlight.price : newFlight.price
                    }
                    onChange={handleFlightInputChange}
                    className="flight-input"
                    placeholder="e.g., 5000"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="baggageAllowance" className="flight-label">
                    Baggage Allowance
                  </label>
                  <input
                    type="text"
                    id="baggageAllowance"
                    name="baggageAllowance"
                    value={
                      editingFlight
                        ? editingFlight.baggageAllowance
                        : newFlight.baggageAllowance
                    }
                    onChange={handleFlightInputChange}
                    className="flight-input"
                    placeholder="e.g., 20kg"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gate" className="flight-label">
                    <FaDoorOpen className="flight-icon-label" /> Gate
                  </label>
                  <select
                    id="gate"
                    name="gate"
                    value={editingFlight ? editingFlight.gate : newFlight.gate}
                    onChange={handleFlightInputChange}
                    className="flight-select"
                  >
                    <option value="">Select Gate</option>
                    {gates.map((gate) => (
                      <option key={gate._id} value={gate._id}>
                        {gate.gateNumber}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="modal-buttons">
                  <button type="submit" className="flight-submit-btn">
                    {editingFlight ? "Update Flight" : "Add Flight"}
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setShowFlightForm(false);
                      setEditingFlight(null);
                      setNewFlight({
                        flightNumber: "",
                        airline: "",
                        from: "",
                        to: "",
                        departure: "",
                        status: "On Time",
                        type: "Domestic",
                        price: "",
                        baggageAllowance: "",
                        gate: "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="content-grid">
          {view === "flights" ? (
            paginatedFlights.length === 0 ? (
              <p className="no-items">No flights found.</p>
            ) : (
              paginatedFlights.map((flight) => (
                <div key={flight._id} className="flight-card">
                  <img
                    src={flight.airline?.logo || "/images/default-logo.png"}
                    alt={flight.airline?.name || "Airline"}
                  />
                  <h3>
                    {flight.flightNumber} - {flight.airline?.name || "Unknown"}
                  </h3>
                  <p>
                    <strong>From:</strong> {flight.from} <br />
                    <strong>To:</strong> {flight.to}
                  </p>
                  <p>🕒 {new Date(flight.departure).toLocaleString()}</p>
                  <p>
                    <strong>Gate:</strong> {flight.gate?.gateNumber || "-"}
                  </p>
                  <p>
                    <strong>Baggage:</strong> {flight.baggageAllowance}
                  </p>
                  <p className="flight-price">₹{flight.price}</p>
                  <p
                    className={`flight-status-${flight.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {flight.status}
                  </p>
                  <span className="flight-type">{flight.type}</span>
                  <div className="flight-actions">
                    <button
                      className="action-btn edit-btn"
                      onClick={() => {
                        setEditingFlight({
                          ...flight,
                          departure: new Date(flight.departure)
                            .toISOString()
                            .slice(0, 16),
                        });
                        setShowFlightForm(true);
                      }}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(flight._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))
            )
          ) : paginatedAirlines.length === 0 ? (
            <p className="no-items">No airlines found.</p>
          ) : (
            paginatedAirlines.map((airline) => (
              <div key={airline._id} className="airline-card">
                <img
                  src={airline.logo || "/images/default-logo.png"}
                  alt={airline.name}
                />
                <h4>{airline.name}</h4>
                <div className="airline-actions">
                  <button
                    className="action-btn edit-btn"
                    onClick={() => {
                      setEditingAirline(airline);
                      setShowAirlineForm(true);
                    }}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleAirlineDelete(airline._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {view === "flights" ? (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() =>
                setCurrentFlightPage((prev) => Math.max(prev - 1, 1))
              }
              disabled={currentFlightPage === 1}
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentFlightPage} of {totalFlightPages}
            </span>
            <button
              className="pagination-btn"
              onClick={() =>
                setCurrentFlightPage((prev) =>
                  Math.min(prev + 1, totalFlightPages)
                )
              }
              disabled={currentFlightPage === totalFlightPages}
            >
              Next
            </button>
          </div>
        ) : (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() =>
                setCurrentAirlinePage((prev) => Math.max(prev - 1, 1))
              }
              disabled={currentAirlinePage === 1}
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentAirlinePage} of {totalAirlinePages}
            </span>
            <button
              className="pagination-btn"
              onClick={() =>
                setCurrentAirlinePage((prev) =>
                  Math.min(prev + 1, totalAirlinePages)
                )
              }
              disabled={currentAirlinePage === totalAirlinePages}
            >
              Next
            </button>
          </div>
        )}

        {error && <p className="flight-error">{error}</p>}
        {success && <p className="flight-success">{success}</p>}
      </div>
      <style jsx>
        {`
          .flight-container {
            display: flex;
            min-height: 100vh;
            background: linear-gradient(135deg, #f0f4ff, #e0e7ff);
          }
          .flight-content {
            flex: 1;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }
          .flight-title {
            font-size: 2.2rem;
            font-weight: 800;
            background: linear-gradient(to right, #2563eb, #7dd3fc);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            animation: fadeIn 0.5s ease-in;
          }
          .flight-icon-title {
            font-size: 2.5rem;
            color: #2563eb;
            transition: transform 0.3s ease;
          }
          .flight-icon-title:hover {
            transform: rotate(10deg) scale(1.1);
          }
          .flight-controls {
            display: flex;
            gap: 0.75rem;
            flex-wrap: wrap;
            width: 100%;
            max-width: 900px;
            align-items: center;
          }
          .flight-input,
          .flight-select {
            padding: 0.6rem;
            border: 2px solid #d1d5db;
            border-radius: 0.5rem;
            font-size: 0.95rem;
            color: #1f2937;
            transition: all 0.3s ease;
            flex: 1;
            background: #ffffff;
            animation: slideIn 0.3s ease;
          }
          .flight-input:focus,
          .flight-select:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
            outline: none;
          }
          .flight-input::placeholder {
            color: #9ca3af;
          }
          .flight-submit-btn {
            padding: 0.6rem 1rem;
            background: linear-gradient(to right, #2563eb, #60a5fa);
            color: #ffffff;
            border: none;
            border-radius: 0.5rem;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.3rem;
          }
          .flight-submit-btn:hover {
            background: linear-gradient(to right, #1e40af, #3b82f6);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
          }
          .toggle-btn {
            background: linear-gradient(to right, #7c3aed, #db2777);
          }
          .toggle-btn:hover {
            background: linear-gradient(to right, #6d28d9, #be185d);
            box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
          }
          .btn-icon {
            font-size: 1.1rem;
          }
          .content-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            width: 100%;
            max-width: 1000px;
            animation: fadeIn 0.5s ease-in;
          }
          .flight-card,
          .airline-card {
            background: #ffffff;
            padding: 1rem;
            border-radius: 0.75rem;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .flight-card:hover,
          .airline-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          }
          .flight-card img,
          .airline-card img {
            width: 40px;
            height: 40px;
            object-fit: contain;
            margin-bottom: 0.3rem;
          }
          .flight-card h3,
          .airline-card h4 {
            font-size: 1rem;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 0.3rem;
          }
          .flight-card p {
            font-size: 0.85rem;
            color: #4b5563;
            margin: 0.2rem 0;
          }
          .flight-price {
            font-weight: 600;
            color: #2563eb;
            font-size: 0.9rem;
          }
          .flight-status-on-time {
            color: #16a34a;
            font-weight: 500;
            font-size: 0.85rem;
          }
          .flight-status-delayed {
            color: #f59e0b;
            font-weight: 500;
            font-size: 0.85rem;
          }
          .flight-status-cancelled {
            color: #dc2626;
            font-weight: 500;
            font-size: 0.85rem;
          }
          .flight-type {
            display: inline-block;
            padding: 0.2rem 0.5rem;
            background: #e5e7eb;
            border-radius: 0.5rem;
            font-size: 0.8rem;
            color: #1f2937;
          }
          .flight-actions,
          .airline-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 0.5rem;
            justify-content: center;
          }
          .action-btn {
            padding: 0.4rem 0.8rem;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.3rem;
            font-size: 0.85rem;
          }
          .edit-btn {
            background: #16a34a;
            color: #ffffff;
          }
          .edit-btn:hover {
            background: #15803d;
          }
          .delete-btn {
            background: #dc2626;
            color: #ffffff;
          }
          .delete-btn:hover {
            background: #b91c1c;
          }
          .no-items {
            color: #1f2937;
            font-size: 0.95rem;
            text-align: center;
          }
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
          }
          .modal-content {
            background: #ffffff;
            padding: 1.5rem;
            border-radius: 1rem;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            max-width: 500px;
            width: 100%;
            animation: slideIn 0.3s ease;
          }
          .modal-scrollable {
            max-height: 80vh;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: #2563eb #e5e7eb;
          }
          .modal-scrollable::-webkit-scrollbar {
            width: 8px;
          }
          .modal-scrollable::-webkit-scrollbar-track {
            background: #e5e7eb;
            border-radius: 4px;
          }
          .modal-scrollable::-webkit-scrollbar-thumb {
            background: #2563eb;
            border-radius: 4px;
          }
          .modal-scrollable::-webkit-scrollbar-thumb:hover {
            background: #1e40af;
          }
          .modal-title {
            font-size: 1.4rem;
            font-weight: 700;
            color: #1f2937;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1.2rem;
          }
          .modal-icon {
            font-size: 1.4rem;
            color: #2563eb;
          }
          .form-group {
            margin-bottom: 1rem;
            position: relative;
          }
          .flight-label {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.95rem;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 0.4rem;
          }
          .flight-icon-label {
            font-size: 1.2rem;
            color: #2563eb;
            transition: transform 0.3s ease;
          }
          .flight-icon-label:hover {
            transform: scale(1.1);
          }
          .flight-input,
          .flight-select {
            width: 100%;
            padding: 0.7rem;
            border: 2px solid #d1d5db;
            border-radius: 0.5rem;
            font-size: 0.9rem;
            color: #1f2937;
            background: #f9fafb;
            transition: all 0.3s ease;
          }
          .flight-input:focus,
          .flight-select:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
            outline: none;
          }
          .flight-input::placeholder {
            color: #9ca3af;
          }
          .modal-buttons {
            display: flex;
            gap: 0.75rem;
            margin-top: 1.2rem;
            justify-content: flex-end;
          }
          .flight-submit-btn {
            padding: 0.7rem 1.2rem;
            background: linear-gradient(to right, #2563eb, #60a5fa);
            color: #ffffff;
            border: none;
            border-radius: 0.5rem;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .flight-submit-btn:hover {
            background: linear-gradient(to right, #1e40af, #3b82f6);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
          }
          .cancel-btn {
            padding: 0.7rem 1.2rem;
            background: #e5e7eb;
            color: #1f2937;
            border: none;
            border-radius: 0.5rem;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .cancel-btn:hover {
            background: #d1d5db;
            transform: translateY(-2px);
          }
          .flight-error {
            color: #dc2626;
            font-size: 0.85rem;
            margin-top: 0.75rem;
            text-align: center;
          }
          .flight-success {
            color: #16a34a;
            font-size: 0.85rem;
            margin-top: 0.75rem;
            text-align: center;
          }
          .pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.75rem;
            margin-top: 1rem;
          }
          .pagination-btn {
            padding: 0.5rem 1rem;
            background: linear-gradient(to right, #2563eb, #60a5fa);
            color: #ffffff;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9rem;
          }
          .pagination-btn:disabled {
            background: #e5e7eb;
            cursor: not-allowed;
          }
          .pagination-btn:hover:not(:disabled) {
            background: linear-gradient(to right, #1e40af, #3b82f6);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
          }
          .pagination-info {
            font-size: 0.95rem;
            color: #1f2937;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slideIn {
            from {
              transform: translateY(10px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          @media (max-width: 768px) {
            .flight-content {
              padding: 1.2rem;
            }
            .flight-title {
              font-size: 1.8rem;
            }
            .content-grid {
              grid-template-columns: 1fr;
            }
            .modal-content {
              padding: 1.2rem;
              max-width: 95%;
            }
          }
        `}
      </style>
    </div>
  );
}
