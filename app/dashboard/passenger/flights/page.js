// "use client";
// import React, { useState, useEffect } from "react";
// import Sidebar from "../Sidebar";
// import "./flights.css";
// import "../passenger.css";

// const mockFlights = new Array(12).fill(0).map((_, i) => ({
//   id: i,
//   airline: i % 2 === 0 ? "IndiGo" : "Air India",
//   logo: i % 2 === 0 ? "/images/indigologo.png" : "/images/airindia.png",
//   from: i % 2 === 0 ? "Mumbai" : "Delhi",
//   to: i % 2 === 0 ? "Dubai" : "Bangalore",
//   time: "10:30 AM",
//   price: `₹${4500 + i * 300}`,
//   type: i % 2 === 0 ? "International" : "Domestic",
// }));

// const FlightsPage = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("All");
//   const flightsPerPage = 8;

//   const filteredFlights = mockFlights.filter((flight) => {
//     const matchesSearch =
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

//   useEffect(() => {
//     setCurrentPage(1); // Reset to page 1 if filter or search changes
//   }, [searchTerm, filter]);

//   return (
//     <div className="passenger-dashboard-new-container">
//       <Sidebar />

//       <div className="passenger-dashboard-main-bright">
//         <h1 className="flight-title">🛫 Explore Flights</h1>

//         <div className="flight-controls">
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
//         </div>

//         <div className="flight-card-grid">
//           {paginated.map((flight) => (
//             <div key={flight.id} className="flight-card animated">
//               <img src={flight.logo} alt={flight.airline} />
//               <h3>{flight.airline}</h3>
//               <p>
//                 <strong>From:</strong> {flight.from} <br />
//                 <strong>To:</strong> {flight.to}
//               </p>
//               <p>🕒 {flight.time}</p>
//               <p className="flight-price">{flight.price}</p>
//               <span className="flight-type">{flight.type}</span>
//             </div>
//           ))}
//         </div>

//         <div className="pagination">
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

// export default FlightsPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import Sidebar from "../Sidebar";
// import "./flights.css";
// import "../passenger.css";
// import { useRouter } from "next/navigation";

// const mockFlights = new Array(12).fill(0).map((_, i) => ({
//   id: i,
//   airline: i % 2 === 0 ? "IndiGo" : "Air India",
//   logo: i % 2 === 0 ? "/images/indigologo.png" : "/images/airindia.png",
//   from: i % 2 === 0 ? "Mumbai" : "Delhi",
//   to: i % 2 === 0 ? "Dubai" : "Bangalore",
//   time: "10:30 AM",
//   price: `₹${4500 + i * 300}`,
//   type: i % 2 === 0 ? "International" : "Domestic",
// }));

// const FlightsPage = () => {
//   const router = useRouter();
//   const [hasMounted, setHasMounted] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("All");
//   const flightsPerPage = 8;

//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, filter]);

//   if (!hasMounted) return null; // ⛔ Prevent mismatched server/client render

//   const filteredFlights = mockFlights.filter((flight) => {
//     const matchesSearch =
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

//   const handleBookNow = (flight) => {
//     const query = new URLSearchParams({
//       airline: flight.airline,
//       from: flight.from,
//       to: flight.to,
//       time: flight.time,
//       price: flight.price,
//       type: flight.type,
//     }).toString();
//     router.push(`/dashboard/passenger/bookings?${query}`);
//   };

//   return (
//     <div className="passenger-dashboard-new-container">
//       <Sidebar />

//       <div className="passenger-dashboard-main-bright">
//         <h1 className="flight-title">🛫 Explore Flights</h1>

//         <div className="flight-controls">
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
//         </div>

//         <div className="flight-card-grid">
//           {paginated.map((flight) => (
//             <div key={flight.id} className="flight-card animated">
//               <img src={flight.logo} alt={flight.airline} />
//               <h3>{flight.airline}</h3>
//               <p>
//                 <strong>From:</strong> {flight.from} <br />
//                 <strong>To:</strong> {flight.to}
//               </p>
//               <p>🕒 {flight.time}</p>
//               <p className="flight-price">{flight.price}</p>
//               <span className="flight-type">{flight.type}</span>
//               <button
//                 className="book-now-btn"
//                 onClick={() => handleBookNow(flight)}
//               >
//                 ✈️ Book Now
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="pagination">
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

// export default FlightsPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import Sidebar from "../Sidebar";
// import "./flights.css";
// import "../passenger.css";
// import { useRouter } from "next/navigation";

// const FlightsPage = () => {
//   const router = useRouter();
//   const [hasMounted, setHasMounted] = useState(false);
//   const [flights, setFlights] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const flightsPerPage = 8;

//   useEffect(() => {
//     setHasMounted(true);

//     const fetchFlights = async () => {
//       try {
//         setLoading(true);
//         const tokenResponse = await fetch("/api/get-token", {
//           method: "GET",
//           credentials: "include",
//         });
//         if (!tokenResponse.ok) {
//           throw new Error("Not authenticated. Please log in.");
//         }
//         const { token } = await tokenResponse.json();
//         if (!token) {
//           throw new Error("Not authenticated. No token found.");
//         }

//         const response = await fetch("/api/passenger/flights", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           credentials: "include",
//         });
//         if (!response.ok) {
//           const data = await response.json();
//           if (response.status === 401 || response.status === 403) {
//             setError("Session expired. Please log in again.");
//             router.push("/login");
//             return;
//           }
//           throw new Error(data.error || "Failed to fetch flights");
//         }
//         const data = await response.json();
//         console.log("Fetched flights:", JSON.stringify(data.flights, null, 2));
//         setFlights(data.flights);
//       } catch (err) {
//         setError(err.message || "Unable to load flights. Please try again.");
//         console.error("Fetch flights error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFlights();
//   }, [router]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, filter]);

//   if (!hasMounted) return null;

//   const filteredFlights = flights.filter((flight) => {
//     const matchesSearch =
//       (flight.airline?.name || "")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       (flight.from || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (flight.to || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (flight.flightNumber || "")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());

//     const matchesFilter =
//       filter === "All" ||
//       (flight.type || "").toLowerCase() === filter.toLowerCase();

//     return matchesSearch && matchesFilter;
//   });

//   const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);

//   const paginated = filteredFlights.slice(
//     (currentPage - 1) * flightsPerPage,
//     currentPage * flightsPerPage
//   );

//   const handleBookNow = (flight) => {
//     const query = new URLSearchParams({
//       flightNumber: flight.flightNumber || "N/A",
//       airline: flight.airline?.name || "N/A",
//       from: flight.from || "N/A",
//       to: flight.to || "N/A",
//       departure: flight.departure
//         ? new Date(flight.departure).toLocaleString()
//         : "N/A",
//       status: flight.status || "N/A",
//       type: flight.type || "N/A",
//       price: flight.price ? `$${flight.price}` : "N/A",
//       baggageAllowance: flight.baggageAllowance || "N/A",
//       gate: flight.gate?.gateNumber || "N/A",
//     }).toString();
//     router.push(`/dashboard/passenger/bookings?${query}`);
//   };

//   return (
//     <div className="passenger-dashboard-new-container">
//       <Sidebar />

//       <div className="passenger-dashboard-main-bright">
//         <h1 className="flight-title">🛫 Explore Flights</h1>

//         <div className="flight-controls">
//           <input
//             type="text"
//             placeholder="Search by flight number, airline, or destination..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <select value={filter} onChange={(e) => setFilter(e.target.value)}>
//             <option value="All">All</option>
//             <option value="Domestic">Domestic</option>
//             <option value="International">International</option>
//           </select>
//         </div>

//         {loading ? (
//           <p className="loading-text">Loading flights...</p>
//         ) : error ? (
//           <p className="error-text">{error}</p>
//         ) : filteredFlights.length === 0 ? (
//           <p className="no-flights">No flights found matching your criteria.</p>
//         ) : (
//           <>
//             <div className="flight-card-grid">
//               {paginated.map((flight) => (
//                 <div key={flight._id} className="flight-card animated">
//                   {flight.airline?.logo ? (
//                     <img
//                       src={flight.airline.logo}
//                       alt={flight.airline.name}
//                       className="flight-logo"
//                     />
//                   ) : (
//                     <div className="flight-logo-placeholder">No Logo</div>
//                   )}
//                   <h3>{flight.airline?.name || "Unknown Airline"}</h3>
//                   <p className="flight-number">
//                     Flight: {flight.flightNumber || "N/A"}
//                   </p>
//                   <p>
//                     <strong>From:</strong> {flight.from || "N/A"} <br />
//                     <strong>To:</strong> {flight.to || "N/A"}
//                   </p>
//                   <p className="flight-departure">
//                     🕒{" "}
//                     {flight.departure
//                       ? new Date(flight.departure).toLocaleTimeString()
//                       : "N/A"}
//                   </p>
//                   <p className="flight-date">
//                     📅{" "}
//                     {flight.departure
//                       ? new Date(flight.departure).toLocaleDateString()
//                       : "N/A"}
//                   </p>
//                   <p className="flight-status">
//                     <strong>Status:</strong> {flight.status || "N/A"}
//                   </p>
//                   <p className="flight-price">₹{flight.price || "N/A"}</p>
//                   <p className="flight-baggage">
//                     <strong>Baggage:</strong> {flight.baggageAllowance || "N/A"}
//                   </p>
//                   <p className="flight-gate">
//                     <strong>Gate:</strong> {flight.gate?.gateNumber || "N/A"}
//                   </p>
//                   <span className="flight-type">{flight.type || "N/A"}</span>
//                   <button
//                     className="book-now-btn"
//                     onClick={() => handleBookNow(flight)}
//                   >
//                     ✈️ Book Now
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <div className="pagination">
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
//       </div>
//     </div>
//   );
// };

// export default FlightsPage;

"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import "./flights.css";
import "../passenger.css";
import { useRouter } from "next/navigation";

const FlightsPage = () => {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const [flights, setFlights] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const flightsPerPage = 8;

  useEffect(() => {
    setHasMounted(true);

    const fetchFlights = async () => {
      try {
        setLoading(true);
        const tokenResponse = await fetch("/api/get-token", {
          method: "GET",
          credentials: "include",
        });
        if (!tokenResponse.ok) {
          throw new Error("Not authenticated. Please log in.");
        }
        const { token } = await tokenResponse.json();
        if (!token) {
          throw new Error("Not authenticated. No token found.");
        }

        const response = await fetch("/api/passenger/flights", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        if (!response.ok) {
          const data = await response.json();
          if (response.status === 401 || response.status === 403) {
            setError("Session expired. Please log in again.");
            router.push("/login");
            return;
          }
          throw new Error(data.error || "Failed to fetch flights");
        }
        const data = await response.json();
        console.log("Fetched flights:", JSON.stringify(data.flights, null, 2));
        setFlights(data.flights);
      } catch (err) {
        setError(err.message || "Unable to load flights. Please try again.");
        console.error("Fetch flights error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, [router]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  if (!hasMounted) return null;

  const filteredFlights = flights.filter((flight) => {
    const matchesSearch =
      (flight.airline?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (flight.from || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (flight.to || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (flight.flightNumber || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (flight.type || "").toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);

  const paginated = filteredFlights.slice(
    (currentPage - 1) * flightsPerPage,
    currentPage * flightsPerPage
  );

  const handleBookNow = (flight) => {
    const query = new URLSearchParams({
      flightId: flight._id || "N/A",
      flightNumber: flight.flightNumber || "N/A",
      airline: flight.airline?.name || "N/A",
      from: flight.from || "N/A",
      to: flight.to || "N/A",
      departure: flight.departure
        ? new Date(flight.departure).toISOString()
        : "N/A",
      status: flight.status || "N/A",
      type: flight.type || "N/A",
      price: flight.price ? `${flight.price}` : "N/A",
      baggageAllowance: flight.baggageAllowance || "N/A",
      gate: flight.gate?.gateNumber || "N/A",
    }).toString();
    router.push(`/dashboard/passenger/bookings?${query}`);
  };

  return (
    <div className="passenger-dashboard-new-container">
      <Sidebar />

      <div className="passenger-dashboard-main-bright">
        <h1 className="flight-title">🛫 Explore Flights</h1>

        <div className="flight-controls">
          <input
            type="text"
            placeholder="Search by flight number, airline, or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Domestic">Domestic</option>
            <option value="International">International</option>
          </select>
        </div>

        {loading ? (
          <p className="loading-text">Loading flights...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : filteredFlights.length === 0 ? (
          <p className="no-flights">No flights found matching your criteria.</p>
        ) : (
          <>
            <div className="flight-card-grid">
              {paginated.map((flight) => (
                <div key={flight._id} className="flight-card animated">
                  {flight.airline?.logo ? (
                    <img
                      src={flight.airline.logo}
                      alt={flight.airline.name}
                      className="flight-logo"
                    />
                  ) : (
                    <div className="flight-logo-placeholder">No Logo</div>
                  )}
                  <h3>{flight.airline?.name || "Unknown Airline"}</h3>
                  <p className="flight-number">
                    Flight: {flight.flightNumber || "N/A"}
                  </p>
                  <p>
                    <strong>From:</strong> {flight.from || "N/A"} <br />
                    <strong>To:</strong> {flight.to || "N/A"}
                  </p>
                  <p className="flight-departure">
                    🕒{" "}
                    {flight.departure
                      ? new Date(flight.departure).toLocaleTimeString()
                      : "N/A"}
                  </p>
                  <p className="flight-date">
                    📅{" "}
                    {flight.departure
                      ? new Date(flight.departure).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p className="flight-status">
                    <strong>Status:</strong> {flight.status || "N/A"}
                  </p>
                  <p className="flight-price">₹{flight.price || "N/A"}</p>
                  <p className="flight-baggage">
                    <strong>Baggage:</strong> {flight.baggageAllowance || "N/A"}
                  </p>
                  <p className="flight-gate">
                    <strong>Gate:</strong> {flight.gate?.gateNumber || "N/A"}
                  </p>
                  <span className="flight-type">{flight.type || "N/A"}</span>
                  <button
                    className="book-now-btn"
                    onClick={() => handleBookNow(flight)}
                  >
                    ✈️ Book Now
                  </button>
                </div>
              ))}
            </div>

            <div className="pagination">
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
      </div>
    </div>
  );
};

export default FlightsPage;
