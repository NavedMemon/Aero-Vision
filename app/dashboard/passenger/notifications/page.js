// "use client";
// import React, { useState } from "react";
// import Sidebar from "../Sidebar";
// import "./notifications.css";
// import "../passenger.css";

// const mockNotifications = [
//   {
//     id: 1,
//     message: "✈ Your flight AI-203 to Delhi is delayed by 1 hour.",
//     time: "2025-07-01T13:30:00",
//   },
//   {
//     id: 2,
//     message: "📢 Terminal change: Flight 6E-405 will now depart from T2.",
//     time: "2025-07-01T10:00:00",
//   },
//   {
//     id: 3,
//     message: "🛄 Baggage claim updated for flight EK-501.",
//     time: "2025-07-01T08:45:00",
//   },
//   {
//     id: 4,
//     message: "⚠️ Weather alert: Expect turbulence on flight AI-712.",
//     time: "2025-06-30T22:10:00",
//   },
//   {
//     id: 5,
//     message: "🎉 Your ticket has been upgraded to Business Class!",
//     time: "2025-06-30T18:50:00",
//   },
//   {
//     id: 6,
//     message: "🔔 Reminder: Check-in for flight 6E-212 closes in 1 hour.",
//     time: "2025-06-30T17:00:00",
//   },
//   {
//     id: 7,
//     message: "✅ Your seat selection for AI-203 has been confirmed.",
//     time: "2025-06-29T14:30:00",
//   },
//   {
//     id: 8,
//     message: "📃 E-ticket for flight AI-203 has been sent to your email.",
//     time: "2025-06-29T12:00:00",
//   },
// ];

// const ITEMS_PER_PAGE = 5;

// const NotificationsPage = () => {
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(mockNotifications.length / ITEMS_PER_PAGE);

//   const paginatedNotifications = mockNotifications.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const formatTime = (iso) =>
//     new Date(iso).toLocaleString("en-IN", {
//       dateStyle: "medium",
//       timeStyle: "short",
//     });

//   return (
//     <div className="passenger-dashboard-new-container">
//       <Sidebar />
//       <div className="passenger-dashboard-main-bright notifications-container">
//         <h2 className="notifications-title">🔔 Notifications</h2>
//         <div className="notifications-list">
//           {paginatedNotifications.map((note) => (
//             <div key={note.id} className="notification-card">
//               <p className="message">{note.message}</p>
//               <span className="timestamp">🕒 {formatTime(note.time)}</span>
//             </div>
//           ))}
//         </div>

//         <div className="pagination">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               className={currentPage === i + 1 ? "active" : ""}
//               onClick={() => setCurrentPage(i + 1)}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationsPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import Sidebar from "../Sidebar";
// import "./notifications.css";
// import "../passenger.css";

// const NotificationsPage = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [user, setUser] = useState({
//     role: "Passenger",
//     flight: null,
//   });
//   const [error, setError] = useState("");
//   const itemsPerPage = 5;

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch("/api/get-token");
//         if (!response.ok) {
//           throw new Error("Failed to fetch user data");
//         }
//         const data = await response.json();
//         setUser({
//           role: data.role,
//           flight: data.flight,
//         });
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         setError("Failed to load user data: " + error.message);
//       }
//     };

//     const fetchNotifications = async () => {
//       try {
//         const response = await fetch("/api/passenger/notifications");
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || "Failed to fetch notifications");
//         }
//         const data = await response.json();
//         console.log("Fetched notifications:", data.notifications || []);
//         setNotifications(data.notifications || []);
//         setError("");

//         if (data.notifications && data.notifications.length > 0) {
//           data.notifications.forEach(async (note) => {
//             if (!note.read) {
//               try {
//                 await fetch("/api/passenger/notifications", {
//                   method: "PUT",
//                   headers: { "Content-Type": "application/json" },
//                   body: JSON.stringify({ id: note.id }),
//                 });
//               } catch (err) {
//                 console.error("Error marking notification as read:", err);
//               }
//             }
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//         setError("Failed to load notifications: " + error.message);
//         setNotifications([]);
//       }
//     };

//     fetchUser();
//     fetchNotifications();
//   }, []);

//   const totalPages = Math.ceil((notifications || []).length / itemsPerPage);
//   const paginatedNotifications = (notifications || []).slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="passenger-dashboard-new-container">
//       <Sidebar userRole={user.role} />
//       <div className="passenger-dashboard-main-bright notifications-container">
//         <h2 className="notifications-title">🔔 Passenger Notifications</h2>
//         {error && <p className="form-error">{error}</p>}
//         <div className="notifications-list">
//           {paginatedNotifications.length === 0 ? (
//             <p className="no-announcements">No notifications available.</p>
//           ) : (
//             paginatedNotifications.map((note) => (
//               <div key={note.id} className="notification-card">
//                 <p className="message">
//                   <strong>{note.announcement?.audience || "Unknown"}</strong>
//                   {note.announcement?.flight && `: ${note.announcement.flight}`}
//                 </p>
//                 <p className="message">{note.text}</p>
//                 <span className="timestamp">
//                   🕒{" "}
//                   {new Date(note.createdAt).toLocaleString("en-IN", {
//                     dateStyle: "medium",
//                     timeStyle: "short",
//                   })}
//                 </span>
//               </div>
//             ))
//           )}
//         </div>
//         {totalPages > 1 && (
//           <div className="pagination">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="pagination-btn"
//             >
//               Previous
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i}
//                 className={`pagination-btn ${
//                   currentPage === i + 1 ? "active" : ""
//                 }`}
//                 onClick={() => setCurrentPage(i + 1)}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className="pagination-btn"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationsPage;

"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import "./notifications.css";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState({
    role: "Passenger",
    flight: null,
  });
  const [error, setError] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/get-token");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser({
          role: data.role,
          flight: data.flight,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to load user data: " + error.message);
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/passenger/notifications");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch notifications");
        }
        const data = await response.json();
        console.log("Fetched notifications:", data.notifications || []);
        setNotifications(data.notifications || []);
        setError("");

        if (data.notifications && data.notifications.length > 0) {
          data.notifications.forEach(async (note) => {
            if (!note.read) {
              try {
                await fetch("/api/passenger/notifications", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ id: note.id }),
                });
              } catch (err) {
                console.error("Error marking notification as read:", err);
              }
            }
          });
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Failed to load notifications: " + error.message);
        setNotifications([]);
      }
    };

    fetchUser();
    fetchNotifications();
  }, []);

  const totalPages = Math.ceil((notifications || []).length / itemsPerPage);
  const paginatedNotifications = (notifications || []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="passenger-dashboard-new-container">
      <Sidebar userRole={user.role} />
      <div className="passenger-dashboard-main-bright notifications-container">
        <h2 className="notifications-title">🔔 Passenger Notifications</h2>
        {error && <p className="form-error">{error}</p>}
        <div className="notifications-list">
          {paginatedNotifications.length === 0 ? (
            <p className="no-announcements">No notifications available.</p>
          ) : (
            paginatedNotifications.map((note) => (
              <div key={note.id} className="notification-card">
                <p className="message">
                  Passenger, you have a new announcement from admin
                </p>
                <span className="timestamp">
                  🕒{" "}
                  {new Date(note.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            ))
          )}
        </div>
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`pagination-btn ${
                  currentPage === i + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
