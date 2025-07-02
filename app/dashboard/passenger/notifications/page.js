"use client";
import React, { useState } from "react";
import Sidebar from "../Sidebar";
import "./notifications.css";
import "../passenger.css";

const mockNotifications = [
  {
    id: 1,
    message: "✈ Your flight AI-203 to Delhi is delayed by 1 hour.",
    time: "2025-07-01T13:30:00",
  },
  {
    id: 2,
    message: "📢 Terminal change: Flight 6E-405 will now depart from T2.",
    time: "2025-07-01T10:00:00",
  },
  {
    id: 3,
    message: "🛄 Baggage claim updated for flight EK-501.",
    time: "2025-07-01T08:45:00",
  },
  {
    id: 4,
    message: "⚠️ Weather alert: Expect turbulence on flight AI-712.",
    time: "2025-06-30T22:10:00",
  },
  {
    id: 5,
    message: "🎉 Your ticket has been upgraded to Business Class!",
    time: "2025-06-30T18:50:00",
  },
  {
    id: 6,
    message: "🔔 Reminder: Check-in for flight 6E-212 closes in 1 hour.",
    time: "2025-06-30T17:00:00",
  },
  {
    id: 7,
    message: "✅ Your seat selection for AI-203 has been confirmed.",
    time: "2025-06-29T14:30:00",
  },
  {
    id: 8,
    message: "📃 E-ticket for flight AI-203 has been sent to your email.",
    time: "2025-06-29T12:00:00",
  },
];

const ITEMS_PER_PAGE = 5;

const NotificationsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockNotifications.length / ITEMS_PER_PAGE);

  const paginatedNotifications = mockNotifications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatTime = (iso) =>
    new Date(iso).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="passenger-dashboard-new-container">
      <Sidebar />
      <div className="passenger-dashboard-main-bright notifications-container">
        <h2 className="notifications-title">🔔 Notifications</h2>
        <div className="notifications-list">
          {paginatedNotifications.map((note) => (
            <div key={note.id} className="notification-card">
              <p className="message">{note.message}</p>
              <span className="timestamp">🕒 {formatTime(note.time)}</span>
            </div>
          ))}
        </div>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
