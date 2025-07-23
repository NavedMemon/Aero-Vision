"use client";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./admin.css";
import AdminSidebar from "./AdminSidebar";
import dynamic from "next/dynamic";

// Dynamically import WeatherWidget to prevent SSR crash
const WeatherWidget = dynamic(() => import("./WeatherWidget"), {
  ssr: false,
});

const AdminPage = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
      setGreeting(getGreeting(now.getHours()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getGreeting = (hour) => {
    if (hour < 12) return "Good Morning";
    else if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="admin-dashboard-new-container">
      <AdminSidebar />
      <div className="admin-dashboard-main-bright">
        <h1 className="admin-welcome">Welcome, Admin 👋</h1>

        <div className="admin-clock-calendar-wrapper">
          <div className="admin-clock-box">
            <h3>⏰ {greeting}</h3>
            <p className="admin-clock-time">{time}</p>
            {hasMounted && (
              <p className="admin-clock-date">
                {date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>

          <div className="admin-calendar-box">
            <h3>📅 Calendar</h3>
            <Calendar
              onChange={setDate}
              value={date}
              className="custom-calendar"
            />
          </div>

          <WeatherWidget />
        </div>

        <div className="admin-flight-info">
          <h3>✈ Flight Operations</h3>
          <p>Total Flights Today: 45</p>
          <p>Delayed Flights: 3</p>
          <p>Cancelled Flights: 1</p>
        </div>

        <div className="admin-passenger-info">
          <h3>👥 Passenger Overview</h3>
          <p>Total Passengers: 2,340</p>
          <p>Checked-In: 1,890</p>
          <p>Pending Check-Ins: 450</p>
        </div>

        <div className="admin-alert-box">
          <h4>📢 System Alerts</h4>
          <p>Gate A12 closed for maintenance.</p>
          <p>New complaint received from passenger ID #45678.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;