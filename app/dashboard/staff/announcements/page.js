// "use client";
// import React, { useState, useEffect } from "react";
// import PublicSidebar from "../StaffSideBar";
// import "./announcement.css";

// const StaffAnnouncementsPage = () => {
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
//       audience: "Staff",
//       text: "Technical team meeting at 2 PM.",
//       department: "Technical",
//       flight: null,
//       date: "2025-07-29 11:30 AM",
//     },
//     {
//       id: 3,
//       audience: "Passenger",
//       text: "Flight AI123 delayed by 30 minutes.",
//       department: null,
//       flight: "AI123",
//       date: "2025-07-29 12:00 PM",
//     },
//     {
//       id: 4,
//       audience: "All",
//       text: "Airport security update.",
//       department: null,
//       flight: null,
//       date: "2025-07-29 01:00 PM",
//     },
//     {
//       id: 5,
//       audience: "Staff",
//       text: "Maintenance schedule revised.",
//       department: "Maintenance",
//       flight: null,
//       date: "2025-07-29 02:00 PM",
//     },
//     {
//       id: 6,
//       audience: "Passenger",
//       text: "Flight AI456 boarding now.",
//       department: null,
//       flight: "AI456",
//       date: "2025-07-29 03:00 PM",
//     },
//   ]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [user, setUser] = useState({
//     role: "Staff",
//     department: "Technical",
//     flight: null,
//   }); // Mock user data
//   const announcementsPerPage = 5;

//   useEffect(() => {
//     // Simulate fetching user data from /api/get-token
//     const fetchUser = async () => {
//       // const response = await fetch("/api/get-token");
//       // const data = await response.json();
//       // setUser({ role: data.role, department: data.department, flight: data.flight });
//     };
//     fetchUser();
//   }, []);

//   // Filter announcements based on user role
//   const filteredAnnouncements = announcements.filter((ann) => {
//     if (ann.audience === "All") return true;
//     if (ann.audience === "Staff" && user.role === "Staff") {
//       return ann.department === user.department || ann.department === "All";
//     }
//     if (ann.audience === "Passenger" && user.role === "Passenger") {
//       return ann.flight === user.flight || ann.flight === "All";
//     }
//     return false;
//   });

//   const totalPages = Math.ceil(
//     filteredAnnouncements.length / announcementsPerPage
//   );
//   const startIndex = (currentPage - 1) * announcementsPerPage;
//   const currentAnnouncements = filteredAnnouncements.slice(
//     startIndex,
//     startIndex + announcementsPerPage
//   );

//   return (
//     <div className="public-dashboard-container">
//       <PublicSidebar userRole={user.role} />
//       <div className="public-dashboard-main">
//         <div className="announcements-header">
//           <h1 className="public-welcome">Announcements</h1>
//         </div>

//         <div className="public-alert-box">
//           <h3>Latest Announcements</h3>
//           {filteredAnnouncements.length === 0 ? (
//             <p className="no-announcements">No announcements available.</p>
//           ) : (
//             <div className="announcements-section">
//               {currentAnnouncements.map((ann) => (
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
//               {[...Array(totalPages)].map((_, i) => (
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

// export default StaffAnnouncementsPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import StaffSidebar from "../StaffSideBar";
// import "./announcement.css";
// import "../staff.css";

// const StaffAnnouncementsPage = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [user, setUser] = useState({
//     role: "Staff",
//     department: null,
//   });
//   const notificationsPerPage = 5;

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
//           department: data.department,
//         });
//       } catch (error) {
//         console.error("Error fetching user:", error);
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
//         console.log("Fetched notifications:", data.notifications.length);
//         setNotifications(data.notifications || []);

//         // Mark notifications as read
//         data.notifications.forEach(async (note) => {
//           if (!note.read) {
//             await fetch("/api/staff/notifications", {
//               method: "PUT",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ id: note.id }),
//             });
//           }
//         });
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };

//     fetchUser();
//     fetchNotifications();
//   }, []);

//   const totalPages = Math.ceil(notifications.length / notificationsPerPage);
//   const startIndex = (currentPage - 1) * notificationsPerPage;
//   const currentNotifications = notifications.slice(
//     startIndex,
//     startIndex + notificationsPerPage
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
//           {notifications.length === 0 ? (
//             <p className="no-announcements">No notifications available.</p>
//           ) : (
//             <div className="announcements-section">
//               {currentNotifications.map((note) => (
//                 <div key={note.id} className="announcement-item">
//                   <div className="announcement-content">
//                     <p className="announcement-audience">
//                       <strong>{note.announcement.audience}</strong>
//                       {note.announcement.audience === "Staff" &&
//                         note.announcement.department &&
//                         `: ${note.announcement.department}`}
//                       {note.announcement.audience === "Passenger" &&
//                         note.announcement.flight &&
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
//               {[...Array(totalPages)].map((_, i) => (
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

// export default StaffAnnouncementsPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import StaffSidebar from "../StaffSideBar";
// import "./announcement.css";
// import "../staff.css";

// const StaffAnnouncementsPage = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [user, setUser] = useState({
//     role: "Staff",
//     staffRole: null, // Changed from department to staffRole
//   });
//   const notificationsPerPage = 5;

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
//         console.log("Fetched notifications:", data.notifications.length);
//         setNotifications(data.notifications || []);

//         // Mark notifications as read
//         data.notifications.forEach(async (note) => {
//           if (!note.read) {
//             await fetch("/api/staff/notifications", {
//               method: "PUT",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ id: note.id }),
//             });
//           }
//         });
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };

//     fetchUser();
//     fetchNotifications();
//   }, []);

//   const totalPages = Math.ceil(notifications.length / notificationsPerPage);
//   const startIndex = (currentPage - 1) * notificationsPerPage;
//   const currentNotifications = notifications.slice(
//     startIndex,
//     startIndex + notificationsPerPage
//   );

//   return (
//     <div className="staff-dashboard-container">
//       <StaffSidebar userRole={user.role} />
//       <div className="staff-dashboard-main">
//         <div className="announcements-header">
//           <h1 className="staff-welcome">Staff Announcements</h1>
//         </div>

//         <div className="staff-alert-box">
//           <h3>Latest Announcements</h3>
//           {notifications.length === 0 ? (
//             <p className="no-announcements">No announcements available.</p>
//           ) : (
//             <div className="announcements-section">
//               {currentNotifications.map((note) => (
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
//                         (note.announcement?.flight
//                           ? `: ${note.announcement.flight}`
//                           : ": All Passengers")}
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
//               {[...Array(totalPages)].map((_, i) => (
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

// export default StaffAnnouncementsPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import StaffSidebar from "../StaffSideBar";
// import "./announcement.css";

// const StaffAnnouncementsPage = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [user, setUser] = useState({
//     role: "Staff",
//     staffRole: null,
//   });
//   const notificationsPerPage = 5;

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
//         console.log("Fetched notifications:", data.notifications.length);
//         setNotifications(data.notifications || []);

//         // Mark notifications as read
//         data.notifications.forEach(async (note) => {
//           if (!note.read) {
//             await fetch("/api/staff/notifications", {
//               method: "PUT",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ id: note.id }),
//             });
//           }
//         });
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };

//     fetchUser();
//     fetchNotifications();
//   }, []);

//   const totalPages = Math.ceil(notifications.length / notificationsPerPage);
//   const startIndex = (currentPage - 1) * notificationsPerPage;
//   const currentNotifications = notifications.slice(
//     startIndex,
//     startIndex + notificationsPerPage
//   );

//   return (
//     <div className="public-dashboard-container">
//       <StaffSidebar userRole={user.role} />
//       <div className="public-dashboard-main">
//         <div className="announcements-header">
//           <h1 className="public-welcome">Staff Announcements</h1>
//         </div>
//         <div className="public-alert-box">
//           <h3>Latest Announcements</h3>
//           {notifications.length === 0 ? (
//             <p className="no-announcements">No announcements available.</p>
//           ) : (
//             <div className="announcements-section">
//               {currentNotifications.map((note) => (
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
//                         (note.announcement?.flight
//                           ? `: ${note.announcement.flight}`
//                           : ": All Passengers")}
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
//               {[...Array(totalPages)].map((_, i) => (
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

// export default StaffAnnouncementsPage;

"use client";
import React, { useState, useEffect } from "react";
import StaffSidebar from "../StaffSideBar";
import "./announcement.css";

const StaffAnnouncementsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState({
    role: "Staff",
    staffRole: null,
  });
  const [error, setError] = useState("");
  const notificationsPerPage = 5;

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
        // Filter out task notifications
        const announcements = (data.notifications || []).filter(
          (note) => !note.text.includes("task assigned by admin")
        );
        console.log("Fetched announcements:", announcements.length);
        setNotifications(announcements);
        setError("");

        // Mark notifications as read
        announcements.forEach(async (note) => {
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
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Failed to load announcements: " + error.message);
        setNotifications([]);
      }
    };

    fetchUser();
    fetchNotifications();
  }, []);

  const totalPages = Math.ceil(notifications.length / notificationsPerPage);
  const startIndex = (currentPage - 1) * notificationsPerPage;
  const currentNotifications = notifications.slice(
    startIndex,
    startIndex + notificationsPerPage
  );

  return (
    <div className="public-dashboard-container">
      <StaffSidebar userRole={user.role} />
      <div className="public-dashboard-main">
        <div className="announcements-header">
          <h1 className="public-welcome">Staff Announcements</h1>
        </div>
        <div className="public-alert-box">
          <h3>Latest Announcements</h3>
          {error && <p className="form-error">{error}</p>}
          {notifications.length === 0 ? (
            <p className="no-announcements">No announcements available.</p>
          ) : (
            <div className="announcements-section">
              {currentNotifications.map((note) => (
                <div key={note.id} className="announcement-item">
                  <div className="announcement-content">
                    <p className="announcement-audience">
                      <strong>
                        {note.announcement?.audience || "Unknown"}
                      </strong>
                      {note.announcement?.audience === "Staff" &&
                        note.announcement?.role &&
                        `: ${note.announcement.role}`}
                      {note.announcement?.audience === "Passenger" &&
                        (note.announcement?.flight
                          ? `: ${note.announcement.flight}`
                          : ": All Passengers")}
                    </p>
                    <p className="announcement-text">{note.text}</p>
                    <p className="announcement-date">
                      🕒{" "}
                      {new Date(note.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
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
              {[...Array(totalPages)].map((_, i) => (
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
    </div>
  );
};

export default StaffAnnouncementsPage;
