// "use client";
// import React from "react";
// import StaffSidebar from "../StaffSideBar";
// import "./staffnotifications.css";

// const notifications = [
//   {
//     message: "📌 You have a new task assigned by Admin.",
//     time: "10 July 2025, 09:15 AM",
//   },
//   {
//     message: "🎉 Tomorrow is a staff holiday (Eid Celebration).",
//     time: "9 July 2025, 04:20 PM",
//   },
//   {
//     message: "🛠️ System maintenance scheduled this weekend.",
//     time: "8 July 2025, 11:30 AM",
//   },
// ];

// const Notifications = () => {
//   return (
//     <div className="staff-dashboard-wrapper">
//       <StaffSidebar />
//       <div className="notifications-container">
//         <h2 className="notifications-title">🔔 Staff Notifications</h2>
//         <div className="notifications-list">
//           {notifications.map((note, index) => (
//             <div key={index} className="notification-card">
//               <p className="note-text">{note.message}</p>
//               <p className="note-time">{note.time}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Notifications;

// "use client";
// import React, { useState, useEffect } from "react";
// import StaffSidebar from "../StaffSideBar";
// import "./staffnotifications.css";
// import "../staff.css";

// const StaffNotifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [user, setUser] = useState({
//     role: "Staff",
//     role: null, // Changed from department to role
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
//           role: data.role, // Changed from department to role
//         });
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         setError("Failed to load user data: " + error.message);
//       }
//     };

//     const fetchNotifications = async () => {
//       try {
//         const response = await fetch("/api/staff/notifications");
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
//                 await fetch("/api/staff/notifications", {
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
//     <div className="staff-dashboard-container">
//       <StaffSidebar userRole={user.role} />
//       <div className="staff-dashboard-main">
//         <div className="announcements-header">
//           <h1 className="staff-welcome">Staff Notifications</h1>
//         </div>

//         <div className="staff-alert-box">
//           <h3>Latest Notifications</h3>
//           {error && <p className="form-error">{error}</p>}
//           {paginatedNotifications.length === 0 ? (
//             <p className="no-announcements">No notifications available.</p>
//           ) : (
//             <div className="announcements-section">
//               {paginatedNotifications.map((note) => (
//                 <div key={note.id} className="announcement-item">
//                   <div className="announcement-content">
//                     <p className="announcement-audience">
//                       <strong>
//                         {note.announcement?.audience || "Unknown"}
//                       </strong>
//                       {note.announcement?.audience === "Staff" &&
//                         note.announcement?.role &&
//                         `: ${note.announcement.role}`}
//                       {note.announcement?.audience === "Passenger" &&
//                         note.announcement?.flight &&
//                         `: ${note.announcement.flight}`}
//                     </p>
//                     <p className="announcement-text">{note.text}</p>
//                     <p className="announcement-date">
//                       🕒{" "}
//                       {new Date(note.createdAt).toLocaleString("en-IN", {
//                         dateStyle: "medium",
//                         timeStyle: "short",
//                       })}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//           {totalPages > 1 && (
//             <div className="pagination">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="pagination-btn"
//               >
//                 Previous
//               </button>
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i + 1}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`pagination-btn ${
//                     currentPage === i + 1 ? "active" : ""
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//               <button
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//                 className="pagination-btn"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffNotifications;

// "use client";
// import React, { useState, useEffect } from "react";
// import StaffSidebar from "../StaffSideBar";
// import "./staffnotifications.css";
// import "../staff.css";

// const StaffNotifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [user, setUser] = useState({
//     role: "Staff",
//     staffRole: null, // Changed from role to staffRole to avoid confusion
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
//           staffRole: data.role, // Expect "Security", "Technical", etc.
//         });
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         setError("Failed to load user data: " + error.message);
//       }
//     };

//     const fetchNotifications = async () => {
//       try {
//         const response = await fetch("/api/staff/notifications");
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
//                 await fetch("/api/staff/notifications", {
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
//     <div className="staff-dashboard-container">
//       <StaffSidebar userRole={user.role} />
//       <div className="staff-dashboard-main">
//         <div className="announcements-header">
//           <h1 className="staff-welcome">Staff Notifications</h1>
//         </div>

//         <div className="staff-alert-box">
//           <h3>Latest Notifications</h3>
//           {error && <p className="form-error">{error}</p>}
//           {paginatedNotifications.length === 0 ? (
//             <p className="no-announcements">No notifications available.</p>
//           ) : (
//             <div className="announcements-section">
//               {paginatedNotifications.map((note) => (
//                 <div key={note.id} className="announcement-item">
//                   <div className="announcement-content">
//                     <p className="announcement-text">
//                       You got a new announcement from admin
//                     </p>
//                     <p className="announcement-date">
//                       🕒{" "}
//                       {new Date(note.createdAt).toLocaleString("en-IN", {
//                         dateStyle: "medium",
//                         timeStyle: "short",
//                       })}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//           {totalPages > 1 && (
//             <div className="pagination">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="pagination-btn"
//               >
//                 Previous
//               </button>
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i + 1}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`pagination-btn ${
//                     currentPage === i + 1 ? "active" : ""
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//               <button
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//                 className="pagination-btn"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffNotifications;

// "use client";
// import React, { useState, useEffect } from "react";
// import StaffSidebar from "../StaffSideBar";
// import "./staffnotifications.css";

// const StaffNotifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [user, setUser] = useState({
//     role: "Staff",
//     staffRole: null,
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
//           staffRole: data.role, // Expect "Security", "Technical", etc.
//         });
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         setError("Failed to load user data: " + error.message);
//       }
//     };

//     const fetchNotifications = async () => {
//       try {
//         const response = await fetch("/api/staff/notifications");
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
//                 await fetch("/api/staff/notifications", {
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
//     <div className="staff-dashboard-wrapper">
//       <StaffSidebar userRole={user.role} />
//       <div className="notifications-container">
//         <h1 className="notifications-title">Staff Notifications</h1>
//         {error && <p className="form-error">{error}</p>}
//         {paginatedNotifications.length === 0 ? (
//           <p className="no-announcements">No notifications available.</p>
//         ) : (
//           <div className="notifications-list">
//             {paginatedNotifications.map((note) => (
//               <div key={note.id} className="notification-card">
//                 <p className="note-text">
//                   {/* You got a new announcement from admin */}
//                   {note.text}
//                 </p>
//                 <p className="note-time">
//                   🕒{" "}
//                   {new Date(note.createdAt).toLocaleString("en-IN", {
//                     dateStyle: "medium",
//                     timeStyle: "short",
//                   })}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
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
//                 key={i + 1}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`pagination-btn ${
//                   currentPage === i + 1 ? "active" : ""
//                 }`}
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

// export default StaffNotifications;

"use client";
import React, { useState, useEffect } from "react";
import StaffSidebar from "../StaffSideBar";
import "./staffnotifications.css";

const StaffNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState({
    role: "Staff",
    staffRole: null,
  });
  const [error, setError] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/get-token", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser({
          role: data.role,
          staffRole: data.role,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to load user data: " + error.message);
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/staff/notifications", {
          credentials: "include",
        });
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
                await fetch("/api/staff/notifications", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  credentials: "include",
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

  const getNotificationText = (note) => {
    if (note.text.includes("task assigned by admin")) {
      return "You have been assigned a new task by admin";
    }
    return "You have a new announcement from admin";
  };

  return (
    <div className="staff-dashboard-wrapper">
      <StaffSidebar userRole={user.role} />
      <div className="notifications-container">
        <h1 className="notifications-title">Staff Notifications</h1>
        {error && <p className="form-error">{error}</p>}
        {paginatedNotifications.length === 0 ? (
          <p className="no-announcements">No notifications available.</p>
        ) : (
          <div className="notifications-list">
            {paginatedNotifications.map((note) => (
              <div key={note.id} className="notification-card">
                <p className="note-text">{getNotificationText(note)}</p>
                <p className="note-time">
                  🕒{" "}
                  {new Date(note.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
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
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`pagination-btn ${
                  currentPage === i + 1 ? "active" : ""
                }`}
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

export default StaffNotifications;
