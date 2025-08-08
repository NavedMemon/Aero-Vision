// import React from "react";
// import { FaPlane, FaTicketAlt, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
// import Link from "next/link";

// const Sidebar = () => {
//   return (
//     <div className="passenger-sidebar">
//       <div className="passenger-logo">✈ AEROVISION</div>

//       <div className="passenger-nav-menu">
//         <Link
//           href=" /dashboard/passenger/flights"
//           className="passenger-nav-link"
//         >
//           <FaPlane /> Flights
//         </Link>
//         <Link href="/passenger/bookings" className="passenger-nav-link">
//           <FaTicketAlt /> My Bookings
//         </Link>
//         <Link href="/passenger/profile" className="passenger-nav-link">
//           <FaUserAlt /> Profile
//         </Link>
//         <Link href="/passenger/profile" className="passenger-nav-link">
//           <FaUserAlt /> Notifications
//         </Link>
//         <Link href="/passenger/profile" className="passenger-nav-link">
//           <FaUserAlt /> Complaints
//         </Link>
//         <Link href="/passenger/profile" className="passenger-nav-link">
//           <FaUserAlt /> Support
//         </Link>
//         <Link href="/logout" className="passenger-nav-link passenger-logout">
//           <FaSignOutAlt /> Logout
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// "use client";
// import React from "react";
// import Link from "next/link";
// import {
//   FaPlane,
//   FaTicketAlt,
//   FaUserAlt,
//   FaSignOutAlt,
//   FaBell,
//   FaCommentAlt,
//   FaBullhorn,
//   FaExclamationCircle,
//   FaHome,
// } from "react-icons/fa";
// import { AiFillHome } from "react-icons/ai";

// const Sidebar = () => {
//   return (
//     <div className="passenger-sidebar">
//       <div className="passenger-logo">✈ AEROVISION</div>

//       <div className="passenger-nav-menu">
//         <Link href="/dashboard/passenger" className="passenger-nav-link">
//           <FaHome /> Home
//         </Link>
//         <Link
//           href="/dashboard/passenger/flights"
//           className="passenger-nav-link"
//         >
//           <FaPlane /> Flights
//         </Link>
//         <Link
//           href="/dashboard/passenger/bookings"
//           className="passenger-nav-link"
//         >
//           <FaTicketAlt /> My Bookings
//         </Link>
//         <Link
//           href="/dashboard/passenger/profile"
//           className="passenger-nav-link"
//         >
//           <FaUserAlt /> Profile
//         </Link>
//         <Link
//           href="/dashboard/passenger/notifications"
//           className="passenger-nav-link"
//         >
//           <FaBell /> Notifications
//         </Link>
//         <Link
//           href="/dashboard/passenger/complaints"
//           className="passenger-nav-link"
//         >
//           <FaExclamationCircle /> Complaints
//         </Link>
//         <Link
//           href="/dashboard/passenger/support"
//           className="passenger-nav-link"
//         >
//           <FaCommentAlt /> Support
//         </Link>
//         <Link href="/passenger/announcements" className="passenger-nav-link">
//           <FaBullhorn /> Announcements
//         </Link>
//         <Link href="/logout" className="passenger-nav-link passenger-logout">
//           <FaSignOutAlt /> Logout
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// "use client";
// import React from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   FaPlane,
//   FaTicketAlt,
//   FaUserAlt,
//   FaSignOutAlt,
//   FaBell,
//   FaCommentAlt,
//   FaBullhorn,
//   FaExclamationCircle,
//   FaHome,
// } from "react-icons/fa";

// const Sidebar = () => {
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       await fetch("/api/logout", {
//         method: "GET",
//       });
//       router.replace("/login"); // Redirect to login page
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <div className="passenger-sidebar">
//       <div className="passenger-logo">✈ AEROVISION</div>

//       <div className="passenger-nav-menu">
//         <Link href="/dashboard/passenger" className="passenger-nav-link">
//           <FaHome /> Home
//         </Link>
//         <Link
//           href="/dashboard/passenger/flights"
//           className="passenger-nav-link"
//         >
//           <FaPlane /> Flights
//         </Link>
//         <Link
//           href="/dashboard/passenger/bookings"
//           className="passenger-nav-link"
//         >
//           <FaTicketAlt /> My Bookings
//         </Link>
//         <Link
//           href="/dashboard/passenger/profile"
//           className="passenger-nav-link"
//         >
//           <FaUserAlt /> Profile
//         </Link>
//         <Link
//           href="/dashboard/passenger/notifications"
//           className="passenger-nav-link"
//         >
//           <FaBell /> Notifications
//         </Link>
//         <Link
//           href="/dashboard/passenger/complaints"
//           className="passenger-nav-link"
//         >
//           <FaExclamationCircle /> Complaints
//         </Link>
//         <Link
//           href="/dashboard/passenger/support"
//           className="passenger-nav-link"
//         >
//           <FaCommentAlt /> Support
//         </Link>
//         <Link
//           href="/dashboard/passenger/announcements"
//           className="passenger-nav-link"
//         >
//           <FaBullhorn /> Announcements
//         </Link>

//         {/* Logout Button Instead of Link */}
//         <button onClick={handleLogout} className="passenger-nav-link ">
//           <FaSignOutAlt /> Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   FaPlane,
//   FaTicketAlt,
//   FaUserAlt,
//   FaSignOutAlt,
//   FaBell,
//   FaCommentAlt,
//   FaBullhorn,
//   FaExclamationCircle,
//   FaHome,
// } from "react-icons/fa";
// import "./passenger.css";

// const Sidebar = () => {
//   const router = useRouter();
//   const [notificationCount, setNotificationCount] = useState(0);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       const response = await fetch("/api/passenger/notifications");
//       const data = await response.json();
//       setNotificationCount(data.notifications.filter((n) => !n.read).length);
//     };
//     fetchNotifications();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await fetch("/api/logout", {
//         method: "GET",
//       });
//       router.replace("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <div className="passenger-sidebar">
//       <div className="passenger-logo">✈ AEROVISION</div>

//       <div className="passenger-nav-menu">
//         <Link href="/dashboard/passenger" className="passenger-nav-link">
//           <FaHome /> Home
//         </Link>
//         <Link
//           href="/dashboard/passenger/flights"
//           className="passenger-nav-link"
//         >
//           <FaPlane /> Flights
//         </Link>
//         <Link
//           href="/dashboard/passenger/bookings"
//           className="passenger-nav-link"
//         >
//           <FaTicketAlt /> My Bookings
//         </Link>
//         <Link
//           href="/dashboard/passenger/profile"
//           className="passenger-nav-link"
//         >
//           <FaUserAlt /> Profile
//         </Link>
//         <Link
//           href="/dashboard/passenger/notifications"
//           className="passenger-nav-link"
//         >
//           <FaBell /> Notifications
//           {notificationCount > 0 && (
//             <span className="notification-badge">{notificationCount}</span>
//           )}
//         </Link>
//         <Link
//           href="/dashboard/passenger/complaints"
//           className="passenger-nav-link"
//         >
//           <FaExclamationCircle /> Complaints
//         </Link>
//         <Link
//           href="/dashboard/passenger/support"
//           className="passenger-nav-link"
//         >
//           <FaCommentAlt /> Support
//         </Link>
//         <Link
//           href="/dashboard/passenger/announcements"
//           className="passenger-nav-link"
//         >
//           <FaBullhorn /> Announcements
//           {notificationCount > 0 && (
//             <span className="notification-badge">{notificationCount}</span>
//           )}
//         </Link>

//         <button onClick={handleLogout} className="passenger-nav-link">
//           <FaSignOutAlt /> Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaPlane,
  FaTicketAlt,
  FaUserAlt,
  FaSignOutAlt,
  FaBell,
  FaCommentAlt,
  FaBullhorn,
  FaExclamationCircle,
  FaHome,
} from "react-icons/fa";
import "./passenger.css";

const Sidebar = () => {
  const router = useRouter();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/passenger/notifications");
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();
        setNotificationCount(data.notifications.filter((n) => !n.read).length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "GET",
      });
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="passenger-sidebar">
      <div className="passenger-logo">✈ AEROVISION</div>

      <div className="passenger-nav-menu">
        <Link href="/dashboard/passenger" className="passenger-nav-link">
          <FaHome /> Home
        </Link>
        <Link
          href="/dashboard/passenger/flights"
          className="passenger-nav-link"
        >
          <FaPlane /> Flights
        </Link>
        <Link
          href="/dashboard/passenger/bookings"
          className="passenger-nav-link"
        >
          <FaTicketAlt /> My Bookings
        </Link>
        <Link
          href="/dashboard/passenger/profile"
          className="passenger-nav-link"
        >
          <FaUserAlt /> Profile
        </Link>
        <Link
          href="/dashboard/passenger/notifications"
          className="passenger-nav-link"
        >
          <FaBell /> Notifications
          {notificationCount > 0 && (
            <span className="notification-badge">{notificationCount}</span>
          )}
        </Link>
        <Link
          href="/dashboard/passenger/complaints"
          className="passenger-nav-link"
        >
          <FaExclamationCircle /> Complaints
        </Link>
        <Link
          href="/dashboard/passenger/support"
          className="passenger-nav-link"
        >
          <FaCommentAlt /> Support
        </Link>
        <Link
          href="/dashboard/passenger/announcements"
          className="passenger-nav-link"
        >
          <FaBullhorn /> Announcements
        </Link>

        <button onClick={handleLogout} className="passenger-nav-link">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
