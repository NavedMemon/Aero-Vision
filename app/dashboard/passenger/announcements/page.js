// "use client";
// import React, { useState, useEffect } from "react";
// import PublicSidebar from "../Sidebar";
// import "./announcement.css";

// const PassengerAnnouncementsPage = () => {
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

// export default PassengerAnnouncementsPage;

"use client";
import React, { useState, useEffect } from "react";
import PublicSidebar from "../Sidebar";
import "./announcement.css";
import "../passenger.css";

const PassengerAnnouncementsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState({
    role: "Passenger",
    department: null,
    flight: "AI123",
  });
  const notificationsPerPage = 5;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/get-token");
      const data = await response.json();
      setUser({
        role: data.role,
        department: data.department,
        flight: data.flight,
      });
    };
    const fetchNotifications = async () => {
      const response = await fetch("/api/passenger/notifications");
      const data = await response.json();
      setNotifications(data.notifications);
      // Mark notifications as read
      data.notifications.forEach(async (note) => {
        if (!note.read) {
          await fetch("/api/passenger/notifications", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: note.id }),
          });
        }
      });
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
      <PublicSidebar userRole={user.role} />
      <div className="public-dashboard-main">
        <div className="announcements-header">
          <h1 className="public-welcome">Passenger Notifications</h1>
        </div>

        <div className="public-alert-box">
          <h3>Latest Notifications</h3>
          {notifications.length === 0 ? (
            <p className="no-announcements">No notifications available.</p>
          ) : (
            <div className="announcements-section">
              {currentNotifications.map((note) => (
                <div key={note.id} className="announcement-item">
                  <div className="announcement-content">
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

export default PassengerAnnouncementsPage;
