"use client";
import React from "react";
import StaffSidebar from "../StaffSideBar";
import "./staffnotifications.css";

const notifications = [
  {
    message: "📌 You have a new task assigned by Admin.",
    time: "10 July 2025, 09:15 AM",
  },
  {
    message: "🎉 Tomorrow is a staff holiday (Eid Celebration).",
    time: "9 July 2025, 04:20 PM",
  },
  {
    message: "🛠️ System maintenance scheduled this weekend.",
    time: "8 July 2025, 11:30 AM",
  },
];

const Notifications = () => {
  return (
    <div className="staff-dashboard-wrapper">
      <StaffSidebar />
      <div className="notifications-container">
        <h2 className="notifications-title">🔔 Staff Notifications</h2>
        <div className="notifications-list">
          {notifications.map((note, index) => (
            <div key={index} className="notification-card">
              <p className="note-text">{note.message}</p>
              <p className="note-time">{note.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
