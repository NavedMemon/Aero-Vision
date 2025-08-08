// "use client";
// import React, { useEffect, useState } from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
// import AdminSidebar from "./AdminSidebar";
// import dynamic from "next/dynamic";
// import "./admin.css";

// // Register Chart.js components
// ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// // Dynamically import WeatherWidget
// const WeatherWidget = dynamic(() => import("./WeatherWidget"), { ssr: false });

// const AdminPage = () => {
//   const [time, setTime] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [greeting, setGreeting] = useState("");
//   const [hasMounted, setHasMounted] = useState(false);
//   const [theme, setTheme] = useState("light");
//   const [announcements, setAnnouncements] = useState([
//     { id: 1, text: "Gate A12 closed for maintenance.", date: "2025-07-29 10:00 AM" },
//     { id: 2, text: "Flight AI123 delayed by 30 minutes.", date: "2025-07-29 11:30 AM" },
//   ]);
//   const [newAnnouncement, setNewAnnouncement] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     setHasMounted(true);
//     const interval = setInterval(() => {
//       const now = new Date();
//       setTime(now.toLocaleTimeString());
//       setGreeting(getGreeting(now.getHours()));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const getGreeting = (hour) => {
//     const currentHour = new Date().getHours(); // 05:05 PM IST = 17:05 UTC + 5:30 = 17
//     if (currentHour < 12) return "Good Morning";
//     else if (currentHour < 18) return "Good Afternoon"; // Matches 05:05 PM IST
//     return "Good Evening";
//   };

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   const handleAddAnnouncement = (e) => {
//     e.preventDefault();
//     if (!newAnnouncement.trim()) return;
//     const newId = announcements.length ? announcements[announcements.length - 1].id + 1 : 1;
//     setAnnouncements([
//       ...announcements,
//       {
//         id: newId,
//         text: newAnnouncement,
//         date: new Date().toLocaleString("en-US", {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       },
//     ]);
//     setNewAnnouncement("");
//     setShowModal(false);
//   };

//   const handleDeleteAnnouncement = (id) => {
//     setAnnouncements(announcements.filter((ann) => ann.id !== id));
//   };

//   // Chart data
//   const flightChartData = {
//     labels: ["Total Flights", "Delayed", "Cancelled"],
//     datasets: [
//       {
//         label: "Flight Operations",
//         data: [45, 3, 1],
//         backgroundColor: ["#3b82f6", "#ef4444", "#6b7280"],
//         borderColor: ["#1e40af", "#b91c1c", "#4b5563"],
//         borderWidth: 1,
//         borderRadius: 4,
//       },
//     ],
//   };

//   const passengerChartData = {
//     labels: ["Checked-In", "Pending Check-Ins"],
//     datasets: [
//       {
//         data: [1890, 450],
//         backgroundColor: ["#10b981", "#f59e0b"],
//         borderColor: ["#059669", "#d97706"],
//         borderWidth: 1,
//         borderRadius: 4,
//       },
//     ],
//   };

//   return (
//     <div className={`flex min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
//       <AdminSidebar />
//       <div className="flex-1 p-6 md:p-8">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 rounded-lg shadow-lg sticky top-0 z-10">
//           <h1 className="text-3xl font-bold">{greeting}, Admin 👋</h1>
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 hover:scale-110"
//             aria-label="Toggle theme"
//           >
//             {theme === "light" ? "🌙" : "☀️"}
//           </button>
//         </div>

//         {/* Main Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Time & Announcements Card */}
//           <div className={`rounded-lg shadow-lg p-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"} col-span-1 md:col-span-2`}>
//             <div className="text-center mb-6">
//               <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">⏰ Time & Announcements</h2>
//               <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{time}</p>
//               {hasMounted && (
//                 <p className="text-gray-500 dark:text-gray-400 mt-2">
//                   {date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
//                 </p>
//               )}
//             </div>
//             <div className="space-y-3 max-h-48 overflow-y-auto">
//               {announcements.length ? (
//                 announcements.map((ann) => (
//                   <div
//                     key={ann.id}
//                     className={`p-3 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"} flex justify-between items-center transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-600`}
//                   >
//                     <div className="text-left">
//                       <p className="text-sm text-gray-700 dark:text-gray-300">{ann.text}</p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">{ann.date}</p>
//                     </div>
//                     <button
//                       onClick={() => handleDeleteAnnouncement(ann.id)}
//                       className="text-red-500 hover:text-red-700 transition-colors duration-200"
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500 dark:text-gray-400 text-center">No announcements yet.</p>
//               )}
//             </div>
//             <button
//               onClick={() => setShowModal(true)}
//               className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
//             >
//               Add Announcement
//             </button>
//           </div>

//           {/* Weather Card */}
//           <div className={`rounded-lg shadow-lg p-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"} text-center`}>
//             <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">🌤️ Weather</h2>
//             <WeatherWidget />
//           </div>

//           {/* Flight Operations Card */}
//           <div className={`rounded-lg shadow-lg p-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"} text-center`}>
//             <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">✈ Flight Operations</h2>
//             <div className="h-48 flex items-center justify-center">
//               <Bar
//                 data={flightChartData}
//                 options={{
//                   responsive: true,
//                   maintainAspectRatio: false,
//                   plugins: {
//                     legend: { display: true, position: "top", labels: { color: theme === "dark" ? "#d1d5db" : "#111" } },
//                     tooltip: { enabled: true },
//                   },
//                   scales: {
//                     y: { beginAtZero: true, ticks: { color: theme === "dark" ? "#d1d5db" : "#111" } },
//                   },
//                   animation: { duration: 1000, easing: "easeInOutQuad" },
//                 }}
//               />
//             </div>
//             <div className="mt-4 text-sm space-y-2">
//               <p><span className="font-semibold text-blue-600 dark:text-blue-400">Total Flights:</span> 45</p>
//               <p><span className="font-semibold text-red-600 dark:text-red-400">Delayed:</span> 3</p>
//               <p><span className="font-semibold text-gray-600 dark:text-gray-400">Cancelled:</span> 1</p>
//             </div>
//           </div>

//           {/* Passenger Overview Card */}
//           <div className={`rounded-lg shadow-lg p-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"} text-center`}>
//             <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">👥 Passenger Overview</h2>
//             <div className="h-48 flex items-center justify-center">
//               <Pie
//                 data={passengerChartData}
//                 options={{
//                   responsive: true,
//                   maintainAspectRatio: false,
//                   plugins: {
//                     legend: { display: true, position: "bottom", labels: { color: theme === "dark" ? "#d1d5db" : "#111" } },
//                     tooltip: { enabled: true },
//                   },
//                   animation: { duration: 1000, easing: "easeInOutQuad" },
//                 }}
//               />
//             </div>
//             <div className="mt-4 text-sm space-y-2">
//               <p><span className="font-semibold text-green-600 dark:text-green-400">Total Passengers:</span> 2,340</p>
//               <p><span className="font-semibold text-green-600 dark:text-green-400">Checked-In:</span> 1,890</p>
//               <p><span className="font-semibold text-yellow-600 dark:text-yellow-400">Pending Check-Ins:</span> 450</p>
//             </div>
//           </div>
//         </div>

//         {/* Modal for Adding Announcement */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className={`rounded-lg p-6 w-full max-w-md ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-lg`}>
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Add Announcement</h2>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
//                 >
//                   ✕
//                 </button>
//               </div>
//               <form onSubmit={handleAddAnnouncement} className="space-y-4">
//                 <textarea
//                   value={newAnnouncement}
//                   onChange={(e) => setNewAnnouncement(e.target.value)}
//                   placeholder="Enter announcement text"
//                   className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                     theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
//                   } transition-all duration-200`}
//                   rows="4"
//                 />
//                 <div className="flex justify-end gap-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                     className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
//                   >
//                     Add
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminPage;

// "use client";
// import React, { useEffect, useState } from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import AdminSidebar from "./AdminSidebar";
// import dynamic from "next/dynamic";
// import "./admin.css";

// ChartJS.register(
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// );

// const WeatherWidget = dynamic(() => import("./WeatherWidget"), { ssr: false });

// const AdminPage = () => {
//   const [time, setTime] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [greeting, setGreeting] = useState("");
//   const [hasMounted, setHasMounted] = useState(false);
//   const [theme, setTheme] = useState("light");
//   const [announcements, setAnnouncements] = useState([
//     {
//       id: 1,
//       audience: "All",
//       text: "Gate A12 closed for maintenance.",
//       department: null,
//       flight: null,
//       date: "2025-07-29 10:00 AM",
//     },
//     {
//       id: 2,
//       audience: "All",
//       text: "Flight AI123 delayed by 30 minutes.",
//       department: null,
//       flight: null,
//       date: "2025-07-29 11:30 AM",
//     },
//   ]);
//   const [newAnnouncement, setNewAnnouncement] = useState({
//     audience: "All",
//     department: null,
//     flight: null,
//     text: "",
//   });
//   const [showModal, setShowModal] = useState(false);
//   const [error, setError] = useState("");

//   const departments = ["Technical", "Security", "Maintenance", "Other", "All"];
//   const flights = ["AI123", "AI456", "AI789", "All"]; // Replace with dynamic fetch if available

//   useEffect(() => {
//     setHasMounted(true);
//     const interval = setInterval(() => {
//       const now = new Date();
//       setTime(now.toLocaleTimeString());
//       setGreeting(getGreeting(now.getHours()));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const getGreeting = (hour) => {
//     const currentHour = new Date().getHours(); // 10:42 AM IST = 05:12 UTC + 5:30 = 5
//     if (currentHour < 12) return "Good Morning"; // Matches 10:42 AM IST
//     else if (currentHour < 18) return "Good Afternoon";
//     return "Good Evening";
//   };

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewAnnouncement((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "audience" ? { department: null, flight: null } : {}),
//     }));
//   };

//   const handleAddAnnouncement = (e) => {
//     e.preventDefault();
//     if (!newAnnouncement.text.trim()) {
//       setError("Announcement text is required.");
//       return;
//     }
//     if (newAnnouncement.audience === "Staff" && !newAnnouncement.department) {
//       setError("Department is required for staff announcements.");
//       return;
//     }
//     if (newAnnouncement.audience === "Passenger" && !newAnnouncement.flight) {
//       setError("Flight is required for passenger announcements.");
//       return;
//     }

//     const newId = announcements.length
//       ? announcements[announcements.length - 1].id + 1
//       : 1;
//     setAnnouncements([
//       ...announcements,
//       {
//         id: newId,
//         audience: newAnnouncement.audience,
//         department: newAnnouncement.department,
//         flight: newAnnouncement.flight,
//         text: newAnnouncement.text,
//         date: new Date().toLocaleString("en-US", {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       },
//     ]);
//     setNewAnnouncement({
//       audience: "All",
//       department: null,
//       flight: null,
//       text: "",
//     });
//     setError("");
//     setShowModal(false);
//   };

//   const handleDeleteAnnouncement = (id) => {
//     setAnnouncements(announcements.filter((ann) => ann.id !== id));
//   };

//   const flightChartData = {
//     labels: ["Total Flights", "Delayed", "Cancelled"],
//     datasets: [
//       {
//         label: "Flight Operations",
//         data: [45, 3, 1],
//         backgroundColor: ["#00c2ff", "#ff4d4d", "#6b7280"],
//         borderColor: ["#00aacc", "#dc2626", "#4b5563"],
//         borderWidth: 1,
//         borderRadius: 4,
//       },
//     ],
//   };

//   const passengerChartData = {
//     labels: ["Checked-In", "Pending Check-Ins"],
//     datasets: [
//       {
//         data: [1890, 450],
//         backgroundColor: ["#00ff99", "#ffcc00"],
//         borderColor: ["#00cc7a", "#d97706"],
//         borderWidth: 1,
//         borderRadius: 4,
//       },
//     ],
//   };

//   return (
//     <div className={`admin-dashboard-new-container ${theme}`}>
//       <AdminSidebar />
//       <div className="admin-dashboard-main-bright">
//         <h1 className="admin-welcome">{greeting}, Admin 👋</h1>
//         <button
//           onClick={toggleTheme}
//           className="theme-toggle"
//           aria-label="Toggle theme"
//         >
//           {theme === "light" ? "🌙" : "☀️"}
//         </button>

//         <div className="admin-clock-calendar-wrapper">
//           <div className="admin-clock-box">
//             <h3>Current Time</h3>
//             <p className="admin-clock-time">{time}</p>
//             {hasMounted && (
//               <p className="admin-clock-date">
//                 {date.toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </p>
//             )}
//           </div>

//           <div className="admin-weather-box animated">
//             <h3>Weather</h3>
//             <WeatherWidget />
//           </div>
//         </div>

//         <div className="admin-alert-box">
//           <h3>Announcements</h3>
//           <div className="announcements-section">
//             {announcements.length ? (
//               announcements.map((ann) => (
//                 <div key={ann.id} className="announcement-item">
//                   <div className="announcement-content">
//                     <p className="announcement-audience">
//                       <strong>{ann.audience}</strong>
//                       {ann.audience === "Staff" &&
//                         ann.department &&
//                         `: ${ann.department}`}
//                       {ann.audience === "Passenger" &&
//                         ann.flight &&
//                         `: ${ann.flight}`}
//                     </p>
//                     <p className="announcement-text">{ann.text}</p>
//                     <p className="announcement-date">{ann.date}</p>
//                   </div>
//                   <button
//                     onClick={() => handleDeleteAnnouncement(ann.id)}
//                     className="delete-button"
//                     aria-label="Delete announcement"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p className="no-announcements">No announcements yet.</p>
//             )}
//           </div>
//           <button
//             onClick={() => setShowModal(true)}
//             className="add-announcement-btn"
//           >
//             Add Announcement
//           </button>
//         </div>

//         <div className="admin-flight-info">
//           <h3>Flight Operations</h3>
//           <div className="chart-container">
//             <Bar
//               data={flightChartData}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: {
//                     display: true,
//                     position: "top",
//                     labels: { color: theme === "dark" ? "#d1d5db" : "#111" },
//                   },
//                   tooltip: { enabled: true },
//                 },
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                     ticks: { color: theme === "dark" ? "#d1d5db" : "#111" },
//                   },
//                 },
//                 animation: { duration: 1000, easing: "easeInOutQuad" },
//               }}
//             />
//           </div>
//           <div className="chart-details">
//             <p>
//               <span className="highlight">Total Flights:</span> 45
//             </p>
//             <p>
//               <span className="highlight red">Delayed:</span> 3
//             </p>
//             <p>
//               <span className="highlight gray">Cancelled:</span> 1
//             </p>
//           </div>
//         </div>

//         <div className="admin-passenger-info">
//           <h3>Passenger Overview</h3>
//           <div className="chart-container">
//             <Pie
//               data={passengerChartData}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: {
//                     display: true,
//                     position: "bottom",
//                     labels: { color: theme === "dark" ? "#d1d5db" : "#111" },
//                   },
//                   tooltip: { enabled: true },
//                 },
//                 animation: { duration: 1000, easing: "easeInOutQuad" },
//               }}
//             />
//           </div>
//           <div className="chart-details">
//             <p>
//               <span className="highlight green">Total Passengers:</span> 2,340
//             </p>
//             <p>
//               <span className="highlight green">Checked-In:</span> 1,890
//             </p>
//             <p>
//               <span className="highlight yellow">Pending Check-Ins:</span> 450
//             </p>
//           </div>
//         </div>

//         {showModal && (
//           <div className="modal-overlay">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h2>Add Announcement</h2>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="modal-close"
//                   aria-label="Close modal"
//                 >
//                   ✕
//                 </button>
//               </div>
//               <form onSubmit={handleAddAnnouncement} className="modal-form">
//                 {error && <p className="form-error">{error}</p>}
//                 <div className="form-group">
//                   <label htmlFor="audience">Target Audience</label>
//                   <select
//                     id="audience"
//                     name="audience"
//                     value={newAnnouncement.audience}
//                     onChange={handleInputChange}
//                     className="form-select"
//                   >
//                     <option value="All">All</option>
//                     <option value="Staff">Staff</option>
//                     <option value="Passenger">Passenger</option>
//                   </select>
//                 </div>
//                 {newAnnouncement.audience === "Staff" && (
//                   <div className="form-group">
//                     <label htmlFor="department">Department</label>
//                     <select
//                       id="department"
//                       name="department"
//                       value={newAnnouncement.department || ""}
//                       onChange={handleInputChange}
//                       className="form-select"
//                     >
//                       <option value="" disabled>
//                         Select Department
//                       </option>
//                       {departments.map((dept) => (
//                         <option key={dept} value={dept}>
//                           {dept}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 )}
//                 {newAnnouncement.audience === "Passenger" && (
//                   <div className="form-group">
//                     <label htmlFor="flight">Flight</label>
//                     <select
//                       id="flight"
//                       name="flight"
//                       value={newAnnouncement.flight || ""}
//                       onChange={handleInputChange}
//                       className="form-select"
//                     >
//                       <option value="" disabled>
//                         Select Flight
//                       </option>
//                       {flights.map((flight) => (
//                         <option key={flight} value={flight}>
//                           {flight}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 )}
//                 <div className="form-group">
//                   <label htmlFor="text">Announcement</label>
//                   <textarea
//                     id="text"
//                     name="text"
//                     value={newAnnouncement.text}
//                     onChange={handleInputChange}
//                     placeholder="Enter announcement text"
//                     className="form-textarea"
//                     rows="4"
//                   />
//                 </div>
//                 <div className="form-actions">
//                   <button
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                     className="cancel-btn"
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="submit-btn">
//                     Add Announcement
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminPage;

// "use client";
// import React, { useEffect, useState } from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import AdminSidebar from "./AdminSidebar";
// import dynamic from "next/dynamic";
// import "./admin.css";

// ChartJS.register(
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// );

// const WeatherWidget = dynamic(() => import("./WeatherWidget"), { ssr: false });

// const AdminPage = () => {
//   const [time, setTime] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [greeting, setGreeting] = useState("");
//   const [hasMounted, setHasMounted] = useState(false);
//   const [theme, setTheme] = useState("light");
//   const [announcements, setAnnouncements] = useState([]);
//   const [newAnnouncement, setNewAnnouncement] = useState({
//     audience: "All",
//     role: "",
//     flight: "",
//     text: "",
//   });
//   const [flights, setFlights] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [error, setError] = useState("");
//   const roles = ["Technical", "Security", "Maintenance", "Other", "All"];

//   useEffect(() => {
//     setHasMounted(true);
//     const interval = setInterval(() => {
//       const now = new Date();
//       setTime(now.toLocaleTimeString("en-IN"));
//       setGreeting(getGreeting(now.getHours()));
//     }, 1000);
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/api/admin/announcement");
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || "Failed to fetch data");
//         }
//         const data = await response.json();
//         console.log("Fetched data:", {
//           announcements: data.announcements,
//           flights: data.flights,
//         });
//         setAnnouncements(data.announcements || []);
//         setFlights(data.flights || []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Failed to load data: " + error.message);
//       }
//     };
//     fetchData();
//     return () => clearInterval(interval);
//   }, []);

//   const getGreeting = (hour) => {
//     if (hour < 12) return "Good Morning";
//     else if (hour < 18) return "Good Afternoon";
//     return "Good Evening";
//   };

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewAnnouncement((prev) => ({
//       ...prev,
//       [name]: value === "" ? "" : value,
//       ...(name === "audience" ? { role: "", flight: "" } : {}),
//     }));
//   };

//   const handleAddAnnouncement = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (!newAnnouncement.text.trim()) {
//       setError("Announcement text is required.");
//       return;
//     }
//     if (newAnnouncement.audience === "Staff" && !newAnnouncement.role) {
//       setError("Role is required for staff announcements.");
//       return;
//     }
//     if (newAnnouncement.audience === "Passenger" && !newAnnouncement.flight) {
//       setError("Flight is required for passenger announcements.");
//       return;
//     }
//     try {
//       const response = await fetch("/api/admin/announcement", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newAnnouncement),
//       });
//       if (!response.ok) {
//         const { error } = await response.json();
//         throw new Error(error || "Failed to create announcement");
//       }
//       const { announcement } = await response.json();
//       setAnnouncements([announcement, ...announcements]);
//       setNewAnnouncement({
//         audience: "All",
//         role: "",
//         flight: "",
//         text: "",
//       });
//       setShowModal(false);
//     } catch (error) {
//       console.error("Error creating announcement:", error);
//       setError(error.message);
//     }
//   };

//   const handleDeleteAnnouncement = async (id) => {
//     if (!confirm("Are you sure you want to delete this announcement?")) return;
//     try {
//       const response = await fetch("/api/admin/announcement", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });
//       if (!response.ok) {
//         const { error } = await response.json();
//         throw new Error(error || "Failed to delete announcement");
//       }
//       setAnnouncements(announcements.filter((ann) => ann._id !== id));
//     } catch (error) {
//       console.error("Error deleting announcement:", error);
//       setError("Failed to delete announcement: " + error.message);
//     }
//   };

//   const flightChartData = {
//     labels: ["Total Flights", "Delayed", "Cancelled"],
//     datasets: [
//       {
//         label: "Flight Operations",
//         data: [45, 3, 1],
//         backgroundColor: ["#00c2ff", "#ff4d4d", "#6b7280"],
//         borderColor: ["#00aacc", "#dc2626", "#4b5563"],
//         borderWidth: 1,
//         borderRadius: 4,
//       },
//     ],
//   };

//   const passengerChartData = {
//     labels: ["Checked-In", "Pending Check-Ins"],
//     datasets: [
//       {
//         data: [1890, 450],
//         backgroundColor: ["#00ff99", "#ffcc00"],
//         borderColor: ["#00cc7a", "#d97706"],
//         borderWidth: 1,
//         borderRadius: 4,
//       },
//     ],
//   };

//   return (
//     <div className={`admin-dashboard-new-container ${theme}`}>
//       <AdminSidebar />
//       <div className="admin-dashboard-main-bright">
//         <h1 className="admin-welcome">{greeting}, Admin 👋</h1>
//         <button
//           onClick={toggleTheme}
//           className="theme-toggle"
//           aria-label="Toggle theme"
//         >
//           {theme === "light" ? "🌙" : "☀️"}
//         </button>

//         <div className="admin-clock-calendar-wrapper">
//           <div className="admin-clock-box">
//             <h3>Current Time</h3>
//             <p className="admin-clock-time">{time}</p>
//             {hasMounted && (
//               <p className="admin-clock-date">
//                 {date.toLocaleDateString("en-IN", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </p>
//             )}
//           </div>

//           <div className="admin-weather-box animated">
//             <h3>Weather</h3>
//             <WeatherWidget />
//           </div>
//         </div>

//         <div className="admin-alert-box">
//           <h3>Announcements</h3>
//           <button
//             onClick={() => setShowModal(true)}
//             className="add-announcement-btn"
//           >
//             Create Announcement
//           </button>
//           {error && <p className="form-error">{error}</p>}
//           <div className="announcements-section">
//             {announcements.length ? (
//               announcements.map((ann) => (
//                 <div key={ann._id} className="announcement-item">
//                   <div className="announcement-content">
//                     <p className="announcement-audience">
//                       <strong>{ann.audience}</strong>
//                       {ann.audience === "Staff" && ann.role && `: ${ann.role}`}
//                       {ann.audience === "Passenger" &&
//                         ann.flight &&
//                         `: ${ann.flight}`}
//                     </p>
//                     <p className="announcement-text">{ann.text}</p>
//                     <p className="announcement-date">
//                       {new Date(ann.createdAt).toLocaleString("en-IN", {
//                         dateStyle: "medium",
//                         timeStyle: "short",
//                       })}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => handleDeleteAnnouncement(ann._id)}
//                     className="delete-button"
//                     aria-label="Delete announcement"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p className="no-announcements">No announcements yet.</p>
//             )}
//           </div>
//         </div>

//         <div className="admin-flight-info">
//           <h3>Flight Operations</h3>
//           <div className="chart-container">
//             <Bar
//               data={flightChartData}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: {
//                     display: true,
//                     position: "top",
//                     labels: { color: theme === "dark" ? "#d1d5db" : "#111" },
//                   },
//                   tooltip: { enabled: true },
//                 },
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                     ticks: { color: theme === "dark" ? "#d1d5db" : "#111" },
//                   },
//                 },
//                 animation: { duration: 1000, easing: "easeInOutQuad" },
//               }}
//             />
//           </div>
//           <div className="chart-details">
//             <p>
//               <span className="highlight">Total Flights:</span> 45
//             </p>
//             <p>
//               <span className="highlight red">Delayed:</span> 3
//             </p>
//             <p>
//               <span className="highlight gray">Cancelled:</span> 1
//             </p>
//           </div>
//         </div>

//         <div className="admin-passenger-info">
//           <h3>Passenger Overview</h3>
//           <div className="chart-container">
//             <Pie
//               data={passengerChartData}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: {
//                     display: true,
//                     position: "bottom",
//                     labels: { color: theme === "dark" ? "#d1d5db" : "#111" },
//                   },
//                   tooltip: { enabled: true },
//                 },
//                 animation: { duration: 1000, easing: "easeInOutQuad" },
//               }}
//             />
//           </div>
//           <div className="chart-details">
//             <p>
//               <span className="highlight green">Total Passengers:</span> 2,340
//             </p>
//             <p>
//               <span className="highlight green">Checked-In:</span> 1,890
//             </p>
//             <p>
//               <span className="highlight yellow">Pending Check-Ins:</span> 450
//             </p>
//           </div>
//         </div>

//         {showModal && (
//           <div className="modal-overlay">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h2>Create Announcement</h2>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="modal-close"
//                   aria-label="Close modal"
//                 >
//                   ✕
//                 </button>
//               </div>
//               <form onSubmit={handleAddAnnouncement} className="modal-form">
//                 {error && <p className="form-error">{error}</p>}
//                 <div className="form-group">
//                   <label htmlFor="audience">Target Audience</label>
//                   <select
//                     id="audience"
//                     name="audience"
//                     value={newAnnouncement.audience}
//                     onChange={handleInputChange}
//                     className="form-select"
//                   >
//                     <option value="All">All</option>
//                     <option value="Staff">Staff</option>
//                     <option value="Passenger">Passenger</option>
//                   </select>
//                 </div>
//                 {newAnnouncement.audience === "Staff" && (
//                   <div className="form-group">
//                     <label htmlFor="role">Role</label>
//                     <select
//                       id="role"
//                       name="role"
//                       value={newAnnouncement.role}
//                       onChange={handleInputChange}
//                       className="form-select"
//                     >
//                       <option value="" disabled>
//                         Select Role
//                       </option>
//                       {roles.map((role) => (
//                         <option key={role} value={role}>
//                           {role}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 )}
//                 {newAnnouncement.audience === "Passenger" && (
//                   <div className="form-group">
//                     <label htmlFor="flight">Flight</label>
//                     <select
//                       id="flight"
//                       name="flight"
//                       value={newAnnouncement.flight}
//                       onChange={handleInputChange}
//                       className="form-select"
//                     >
//                       <option value="" disabled>
//                         Select Flight
//                       </option>
//                       {flights.map((flight) => (
//                         <option key={flight} value={flight}>
//                           {flight}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 )}
//                 <div className="form-group">
//                   <label htmlFor="text">Announcement</label>
//                   <textarea
//                     id="text"
//                     name="text"
//                     value={newAnnouncement.text}
//                     onChange={handleInputChange}
//                     placeholder="Enter announcement text"
//                     className="form-textarea"
//                     rows="4"
//                   />
//                 </div>
//                 <div className="form-actions">
//                   <button
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                     className="cancel-btn"
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="submit-btn">
//                     Create Announcement
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminPage;

"use client";
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import AdminSidebar from "./AdminSidebar";
import dynamic from "next/dynamic";
import "./admin.css";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const WeatherWidget = dynamic(() => import("./WeatherWidget"), { ssr: false });

const AdminPage = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const [theme, setTheme] = useState("light");
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    audience: "All",
    role: "",
    flight: "",
    text: "",
  });
  const [flights, setFlights] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const roles = ["Technical", "Security", "Maintenance", "Other", "All"];

  useEffect(() => {
    setHasMounted(true);
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-IN"));
      setGreeting(getGreeting(now.getHours()));
    }, 1000);
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/announcement");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch data");
        }
        const data = await response.json();
        console.log("Fetched data:", {
          announcements: data.announcements,
          flights: data.flights,
        });
        setAnnouncements(data.announcements || []);
        setFlights(data.flights || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data: " + error.message);
      }
    };
    fetchData();
    return () => clearInterval(interval);
  }, []);

  const getGreeting = (hour) => {
    if (hour < 12) return "Good Morning";
    else if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement((prev) => ({
      ...prev,
      [name]: value === "" ? "" : value,
      ...(name === "audience" ? { role: "", flight: "" } : {}),
    }));
  };

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    setError("");
    if (!newAnnouncement.text.trim()) {
      setError("Announcement text is required.");
      return;
    }
    if (newAnnouncement.audience === "Staff" && !newAnnouncement.role) {
      setError("Role is required for staff announcements.");
      return;
    }
    if (
      newAnnouncement.audience === "Passenger" &&
      newAnnouncement.flight === "" &&
      newAnnouncement.flight !== "All Passengers"
    ) {
      setError(
        "Flight or All Passengers is required for passenger announcements."
      );
      return;
    }
    try {
      const response = await fetch("/api/admin/announcement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAnnouncement),
      });
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to create announcement");
      }
      const { announcement } = await response.json();
      setAnnouncements([announcement, ...announcements]);
      setNewAnnouncement({
        audience: "All",
        role: "",
        flight: "",
        text: "",
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error creating announcement:", error);
      setError(error.message);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    try {
      const response = await fetch("/api/admin/announcement", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to delete announcement");
      }
      setAnnouncements(announcements.filter((ann) => ann._id !== id));
    } catch (error) {
      console.error("Error deleting announcement:", error);
      setError("Failed to delete announcement: " + error.message);
    }
  };

  const flightChartData = {
    labels: ["Total Flights", "Delayed", "Cancelled"],
    datasets: [
      {
        label: "Flight Operations",
        data: [45, 3, 1],
        backgroundColor: ["#00c2ff", "#ff4d4d", "#6b7280"],
        borderColor: ["#00aacc", "#dc2626", "#4b5563"],
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const passengerChartData = {
    labels: ["Checked-In", "Pending Check-Ins"],
    datasets: [
      {
        data: [1890, 450],
        backgroundColor: ["#00ff99", "#ffcc00"],
        borderColor: ["#00cc7a", "#d97706"],
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className={`admin-dashboard-new-container ${theme}`}>
      <AdminSidebar />
      <div className="admin-dashboard-main-bright">
        <h1 className="admin-welcome">{greeting}, Admin 👋</h1>
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <div className="admin-clock-calendar-wrapper">
          <div className="admin-clock-box">
            <h3>Current Time</h3>
            <p className="admin-clock-time">{time}</p>
            {hasMounted && (
              <p className="admin-clock-date">
                {date.toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>

          <div className="admin-weather-box animated">
            <h3>Weather</h3>
            <WeatherWidget />
          </div>
        </div>

        <div className="admin-alert-box">
          <h3>Announcements</h3>
          <button
            onClick={() => setShowModal(true)}
            className="add-announcement-btn"
          >
            Create Announcement
          </button>
          {error && <p className="form-error">{error}</p>}
          <div className="announcements-section">
            {announcements.length ? (
              announcements.map((ann) => (
                <div key={ann._id} className="announcement-item">
                  <div className="announcement-content">
                    <p className="announcement-audience">
                      <strong>{ann.audience}</strong>
                      {ann.audience === "Staff" && ann.role && `: ${ann.role}`}
                      {ann.audience === "Passenger" &&
                        (ann.flight ? `: ${ann.flight}` : ": All Passengers")}
                    </p>
                    <p className="announcement-text">{ann.text}</p>
                    <p className="announcement-date">
                      {new Date(ann.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteAnnouncement(ann._id)}
                    className="delete-button"
                    aria-label="Delete announcement"
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <p className="no-announcements">No announcements yet.</p>
            )}
          </div>
        </div>

        <div className="admin-flight-info">
          <h3>Flight Operations</h3>
          <div className="chart-container">
            <Bar
              data={flightChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                    labels: { color: theme === "dark" ? "#d1d5db" : "#111" },
                  },
                  tooltip: { enabled: true },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { color: theme === "dark" ? "#d1d5db" : "#111" },
                  },
                },
                animation: { duration: 1000, easing: "easeInOutQuad" },
              }}
            />
          </div>
          <div className="chart-details">
            <p>
              <span className="highlight">Total Flights:</span> 45
            </p>
            <p>
              <span className="highlight red">Delayed:</span> 3
            </p>
            <p>
              <span className="highlight gray">Cancelled:</span> 1
            </p>
          </div>
        </div>

        <div className="admin-passenger-info">
          <h3>Passenger Overview</h3>
          <div className="chart-container">
            <Pie
              data={passengerChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: "bottom",
                    labels: { color: theme === "dark" ? "#d1d5db" : "#111" },
                  },
                  tooltip: { enabled: true },
                },
                animation: { duration: 1000, easing: "easeInOutQuad" },
              }}
            />
          </div>
          <div className="chart-details">
            <p>
              <span className="highlight green">Total Passengers:</span> 2,340
            </p>
            <p>
              <span className="highlight green">Checked-In:</span> 1,890
            </p>
            <p>
              <span className="highlight yellow">Pending Check-Ins:</span> 450
            </p>
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Create Announcement</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="modal-close"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleAddAnnouncement} className="modal-form">
                {error && <p className="form-error">{error}</p>}
                <div className="form-group">
                  <label htmlFor="audience">Target Audience</label>
                  <select
                    id="audience"
                    name="audience"
                    value={newAnnouncement.audience}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="All">All</option>
                    <option value="Staff">Staff</option>
                    <option value="Passenger">Passenger</option>
                  </select>
                </div>
                {newAnnouncement.audience === "Staff" && (
                  <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select
                      id="role"
                      name="role"
                      value={newAnnouncement.role}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {newAnnouncement.audience === "Passenger" && (
                  <div className="form-group">
                    <label htmlFor="flight">Flight</label>
                    <select
                      id="flight"
                      name="flight"
                      value={newAnnouncement.flight}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="" disabled>
                        Select Flight or All Passengers
                      </option>
                      <option value="All Passengers">All Passengers</option>
                      {flights.map((flight) => (
                        <option key={flight} value={flight}>
                          {flight}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="text">Announcement</label>
                  <textarea
                    id="text"
                    name="text"
                    value={newAnnouncement.text}
                    onChange={handleInputChange}
                    placeholder="Enter announcement text"
                    className="form-textarea"
                    rows="4"
                  />
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Create Announcement
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
