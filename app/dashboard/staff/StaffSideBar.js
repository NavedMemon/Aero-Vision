// "use client";

// import Link from "next/link";
// import {
//   FaHome,
//   FaTasks,
//   FaClipboardList,
//   FaBell,
//   FaExclamationCircle,
//   FaCalendarAlt,
//   FaBullhorn,
// } from "react-icons/fa";
// import { FiLogOut } from "react-icons/fi";

// import "./staffSidebar.css";

// function StaffSidebar() {
//   return (
//     <div className="staff-sidebar">
//       <div className="staff-logo">✈️ AeroStaff</div>

//       <nav className="staff-nav">
//         <Link href="/dashboard/staff" className="staff-nav-link">
//           <FaHome /> Home
//         </Link>

//         <Link href="/dashboard/staff/StaffWork" className="staff-nav-link">
//           <FaTasks /> Work
//         </Link>

//         <Link href="/dashboard/staff/StaffComplaint" className="staff-nav-link">
//           <FaExclamationCircle /> Complaint Form
//         </Link>

//         <Link
//           href="/dashboard/staff/StaffComplaintsStatusPage"
//           className="staff-nav-link"
//         >
//           <FaClipboardList /> Complaint Details
//         </Link>

//         <Link
//           href="/dashboard/staff/StaffLeaveRequestPage"
//           className="staff-nav-link"
//         >
//           <FaCalendarAlt /> Leave Request
//         </Link>

//         <Link
//           href="/dashboard/staff/StaffNotifications"
//           className="staff-nav-link"
//         >
//           <FaBell /> Notifications
//         </Link>
//         <Link href="/dashboard/staff/announcements" className="staff-nav-link">
//           <FaBullhorn /> Announcements
//         </Link>
//         <div className="logout-section">
//           <button
//             className="logout-btn"
//             onClick={async () => {
//               try {
//                 const res = await fetch("/api/logout", { method: "GET" });
//                 if (res.ok) {
//                   window.location.href = "/login"; // or your login page path
//                 } else {
//                   alert("Logout failed.");
//                 }
//               } catch (err) {
//                 console.error("Logout error:", err);
//                 alert("Something went wrong.");
//               }
//             }}
//           >
//             <FiLogOut style={{ marginRight: "8px" }} />
//             Logout
//           </button>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default StaffSidebar;

// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import {
//   FaHome,
//   FaTasks,
//   FaClipboardList,
//   FaBell,
//   FaExclamationCircle,
//   FaCalendarAlt,
//   FaBullhorn,
// } from "react-icons/fa";
// import { FiLogOut } from "react-icons/fi";
// import "./staffSidebar.css";

// function StaffSidebar() {
//   const [notificationCount, setNotificationCount] = useState(0);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       const response = await fetch("/api/staff/notifications");
//       const data = await response.json();
//       setNotificationCount(data.notifications.filter((n) => !n.read).length);
//     };
//     fetchNotifications();
//   }, []);

//   return (
//     <div className="staff-sidebar">
//       <div className="staff-logo">✈️ AeroStaff</div>

//       <nav className="staff-nav">
//         <Link href="/dashboard/staff" className="staff-nav-link">
//           <FaHome /> Home
//         </Link>

//         <Link href="/dashboard/staff/StaffWork" className="staff-nav-link">
//           <FaTasks /> Work
//         </Link>

//         <Link href="/dashboard/staff/StaffComplaint" className="staff-nav-link">
//           <FaExclamationCircle /> Complaint Form
//         </Link>

//         <Link
//           href="/dashboard/staff/StaffComplaintsStatusPage"
//           className="staff-nav-link"
//         >
//           <FaClipboardList /> Complaint Details
//         </Link>

//         <Link
//           href="/dashboard/staff/StaffLeaveRequestPage"
//           className="staff-nav-link"
//         >
//           <FaCalendarAlt /> Leave Request
//         </Link>

//         <Link
//           href="/dashboard/staff/StaffNotifications"
//           className="staff-nav-link"
//         >
//           <FaBell /> Notifications
//           {notificationCount > 0 && (
//             <span className="notification-badge">{notificationCount}</span>
//           )}
//         </Link>
//         <Link href="/dashboard/staff/announcements" className="staff-nav-link">
//           <FaBullhorn /> Announcements
//           {notificationCount > 0 && (
//             <span className="notification-badge">{notificationCount}</span>
//           )}
//         </Link>
//         <div className="logout-section">
//           <button
//             className="logout-btn"
//             onClick={async () => {
//               try {
//                 const res = await fetch("/api/logout", { method: "GET" });
//                 if (res.ok) {
//                   window.location.href = "/login";
//                 } else {
//                   alert("Logout failed.");
//                 }
//               } catch (err) {
//                 console.error("Logout error:", err);
//                 alert("Something went wrong.");
//               }
//             }}
//           >
//             <FiLogOut style={{ marginRight: "8px" }} />
//             Logout
//           </button>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default StaffSidebar;

// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import {
//   FaHome,
//   FaTasks,
//   FaClipboardList,
//   FaBell,
//   FaExclamationCircle,
//   FaCalendarAlt,
//   FaBullhorn,
// } from "react-icons/fa";
// import { FiLogOut } from "react-icons/fi";
// import "./staffSidebar.css";

// function StaffSidebar() {
//   const [notificationCount, setNotificationCount] = useState(0);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await fetch("/api/staff/notifications");
//         if (!response.ok) {
//           throw new Error("Failed to fetch notifications");
//         }
//         const data = await response.json();
//         setNotificationCount(data.notifications.filter((n) => !n.read).length);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };
//     fetchNotifications();
//   }, []);

//   return (
//     <div className="staff-sidebar">
//       <div className="staff-logo">✈️ AeroStaff</div>

//       <nav className="staff-nav">
//         <Link href="/dashboard/staff" className="staff-nav-link">
//           <FaHome /> Home
//         </Link>

//         <Link href="/dashboard/staff/StaffWork" className="staff-nav-link">
//           <FaTasks /> Work
//         </Link>

//         <Link href="/dashboard/staff/StaffComplaint" className="staff-nav-link">
//           <FaExclamationCircle /> Complaint Form
//         </Link>

//         <Link
//           href="/dashboard/staff/StaffComplaintsStatusPage"
//           className="staff-nav-link"
//         >
//           <FaClipboardList /> Complaint Details
//         </Link>

//         <Link
//           href="/dashboard/staff/StaffLeaveRequestPage"
//           className="staff-nav-link"
//         >
//           <FaCalendarAlt /> Leave Request
//         </Link>

//         <Link
//           href="/dashboard/staff/StaffNotifications"
//           className="staff-nav-link"
//         >
//           <FaBell /> Notifications
//           {notificationCount > 0 && (
//             <span className="notification-badge">{notificationCount}</span>
//           )}
//         </Link>
//         <Link href="/dashboard/staff/announcements" className="staff-nav-link">
//           <FaBullhorn /> Announcements
//         </Link>
//         <div className="logout-section">
//           <button
//             className="logout-btn"
//             onClick={async () => {
//               try {
//                 const res = await fetch("/api/logout", { method: "GET" });
//                 if (res.ok) {
//                   window.location.href = "/login";
//                 } else {
//                   alert("Logout failed.");
//                 }
//               } catch (err) {
//                 console.error("Logout error:", err);
//                 alert("Something went wrong.");
//               }
//             }}
//           >
//             <FiLogOut style={{ marginRight: "8px" }} />
//             Logout
//           </button>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default StaffSidebar;

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaHome,
  FaTasks,
  FaClipboardList,
  FaBell,
  FaExclamationCircle,
  FaCalendarAlt,
  FaBullhorn,
  FaUsers,
  FaUserFriends,
  FaHistory,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import "./staffSidebar.css";

function StaffSidebar() {
  const [notificationCount, setNotificationCount] = useState(0);
  const [isTeamLeader, setIsTeamLeader] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/staff/notifications", {
          credentials: "include", // Include cookies
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch notifications: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched notifications:", data); // Debug log
        setNotificationCount(data.notifications.filter((n) => !n.read).length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/staff/profile", {
          credentials: "include", // Include cookies
        });
        if (!response.ok) {
          throw new Error(
            `Failed to fetch profile: ${
              response.status
            } ${await response.text()}`
          );
        }
        const data = await response.json();
        console.log("Fetched profile:", data); // Debug log
        setIsTeamLeader(data.staff.isTeamLeader || false);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchNotifications();
    fetchProfile();
  }, []);

  return (
    <div className="staff-sidebar">
      <div className="staff-logo">✈️ AeroStaff</div>

      <nav className="staff-nav">
        <Link href="/dashboard/staff" className="staff-nav-link">
          <FaHome /> Home
        </Link>

        <Link
          href="/dashboard/staff/StaffNotifications"
          className="staff-nav-link"
        >
          <FaBell /> Notifications
          {notificationCount > 0 && (
            <span className="notification-badge">{notificationCount}</span>
          )}
        </Link>

        {isTeamLeader && (
          <Link href="/dashboard/staff/StaffWork" className="staff-nav-link">
            <FaTasks /> Work
          </Link>
        )}
        {isTeamLeader && (
          <Link
            href="/dashboard/staff/TeamTaskHistoryPage"
            className="staff-nav-link"
          >
            <FaHistory /> Task History
          </Link>
        )}

        <Link href="/dashboard/staff/StaffComplaint" className="staff-nav-link">
          <FaExclamationCircle /> Complaint Form
        </Link>

        <Link
          href="/dashboard/staff/StaffComplaintsStatusPage"
          className="staff-nav-link"
        >
          <FaClipboardList /> Complaint Details
        </Link>

        <Link
          href="/dashboard/staff/StaffLeaveRequestPage"
          className="staff-nav-link"
        >
          <FaCalendarAlt /> Leave Request
        </Link>

        {!isTeamLeader && (
          <Link
            href="/dashboard/staff/TeamTasksPage"
            className="staff-nav-link"
          >
            <FaUserFriends /> Team Tasks
          </Link>
        )}

        <Link href="/dashboard/staff/announcements" className="staff-nav-link">
          <FaBullhorn /> Announcements
        </Link>

        {isTeamLeader && (
          <Link href="/dashboard/staff/Teammates" className="staff-nav-link">
            <FaUsers /> Teammates
          </Link>
        )}

        <div className="logout-section">
          <button
            className="logout-btn"
            onClick={async () => {
              try {
                const response = await fetch("/api/logout", {
                  method: "GET",
                  credentials: "include", // Include cookies
                });
                if (response.ok) {
                  window.location.href = "/login";
                } else {
                  alert("Logout failed.");
                }
              } catch (err) {
                console.error("Logout error:", err);
                alert("Something went wrong.");
              }
            }}
          >
            <FiLogOut style={{ marginRight: "8px" }} />
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default StaffSidebar;
