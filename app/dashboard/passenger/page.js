// "use client";
// import React from "react";
// import PassengerDashboard from "./PassengerDashboard";
// import NeonWidget from "./NeonWidget";

// const PassengerPage = () => {
//   return (
//     <PassengerDashboard userName="Sarjil">
//       <NeonWidget title="Upcoming Flights">
//         <p>
//           ✈ IndiGo 6E 203 – Mumbai → Delhi
//           <br />
//           🕒 Departure: 10:30 AM
//         </p>
//       </NeonWidget>

//       <NeonWidget title="Flight Status">
//         <p>
//           🛫 AI-409 – On Time
//           <br />
//           📍 Gate: A12
//         </p>
//       </NeonWidget>

//       <NeonWidget title="Weather">
//         <p>
//           🌤 Mumbai: 32°C
//           <br />
//           💨 Wind: 18 km/h
//         </p>
//       </NeonWidget>

//       <NeonWidget title="Notifications">
//         <ul>
//           <li>✅ Check-in is now available</li>
//           <li>📢 Gate changed to B2</li>
//         </ul>
//       </NeonWidget>
//     </PassengerDashboard>
//   );
// };

// export default PassengerPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "./passenger.css";
// import WeatherWidget from "./WeatherWidget";
// import Sidebar from "./Sidebar";

// const PassengerPage = () => {
//   const [date, setDate] = useState(new Date());
//   const [time, setTime] = useState(new Date().toLocaleTimeString());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTime(new Date().toLocaleTimeString());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="passenger-dashboard-new-container">
//       <Sidebar />

//       <div className="passenger-dashboard-main-bright">
//         <h1 className="passenger-welcome">Welcome, Sarjil 👋</h1>

//         <div className="passenger-clock-calendar-wrapper">
//           <div className="passenger-clock-box">
//             <h3>⏰ Current Time</h3>
//             <p>{time}</p>
//           </div>

//           <div className="passenger-calendar-box">
//             <h3>📅 Calendar</h3>
//             <Calendar
//               onChange={setDate}
//               value={date}
//               className="custom-calendar"
//             />
//           </div>
//         </div>

//         <div className="passenger-flight-info">
//           <h3>✈ Upcoming Flight</h3>
//           <p>IndiGo 6E 203 – Mumbai → Delhi</p>
//           <p>Departure: 10:30 AM | Gate: A12</p>
//         </div>

//         <div className="passenger-alert-box">
//           <h4>📢 Alert</h4>
//           <p>Facial recognition check-in starts July 1st.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PassengerPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "./passenger.css";
// import WeatherWidget from "./WeatherWidget";
// import Sidebar from "./Sidebar";

// const PassengerPage = () => {
//   const [date, setDate] = useState(new Date());
//   const [time, setTime] = useState("");
//   const [greeting, setGreeting] = useState("");

//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date();
//       setTime(now.toLocaleTimeString());
//       const hour = now.getHours();
//       setGreeting(
//         hour < 12
//           ? "Good Morning"
//           : hour < 18
//           ? "Good Afternoon"
//           : "Good Evening"
//       );
//     };
//     updateTime();
//     const timer = setInterval(updateTime, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="passenger-dashboard-new-container">
//       <Sidebar />
//       <div className="passenger-dashboard-main-bright">
//         <h1 className="passenger-welcome">Welcome, Sarjil 👋</h1>
//         <div className="passenger-clock-calendar-wrapper">
//           <div className="passenger-clock-box">
//             <h3>⏰ {greeting}</h3>
//             <p className="passenger-clock-time">{time}</p>
//             {typeof window !== "undefined" && (
//               <p className="passenger-clock-date">
//                 {date.toLocaleDateString()}
//               </p>
//             )}
//           </div>
//           <div className="passenger-calendar-box">
//             <h3>📅 Calendar</h3>
//             <Calendar
//               onChange={setDate}
//               value={date}
//               className="custom-calendar"
//             />
//           </div>
//           <div className="passenger-weather-map-wrap">
//             <WeatherWidget />
//           </div>
//         </div>
//         <div className="passenger-flight-info">
//           <h3>✈ Upcoming Flight</h3>
//           <p>IndiGo 6E 203 – Mumbai → Delhi</p>
//           <p>Departure: 10:30 AM | Gate: A12</p>
//         </div>
//         <div className="passenger-alert-box">
//           <h4>📢 Alert</h4>
//           <p>Facial recognition check-in starts July 1st.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PassengerPage;

"use client";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./passenger.css";
import Sidebar from "./Sidebar";
import dynamic from "next/dynamic";

// 🔥 Dynamically import WeatherWidget to prevent SSR crash
const WeatherWidget = dynamic(() => import("./WeatherWidget"), {
  ssr: false,
});

const PassengerPage = () => {
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
    <div className="passenger-dashboard-new-container">
      <Sidebar />

      <div className="passenger-dashboard-main-bright">
        <h1 className="passenger-welcome">Welcome, Sarjil 👋</h1>

        <div className="passenger-clock-calendar-wrapper">
          <div className="passenger-clock-box">
            <h3>⏰ {greeting}</h3>
            <p className="passenger-clock-time">{time}</p>
            {hasMounted && (
              <p className="passenger-clock-date">
                {date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>

          <div className="passenger-calendar-box">
            <h3>📅 Calendar</h3>
            <Calendar
              onChange={setDate}
              value={date}
              className="custom-calendar"
            />
          </div>

          <WeatherWidget />
        </div>

        <div className="passenger-flight-info">
          <h3>✈ Upcoming Flight</h3>
          <p>IndiGo 6E 203 – Mumbai → Delhi</p>
          <p>Departure: 10:30 AM | Gate: A12</p>
        </div>

        <div className="passenger-alert-box">
          <h4>📢 Alert</h4>
          <p>Facial recognition check-in starts July 1st.</p>
        </div>
      </div>
    </div>
  );
};

export default PassengerPage;
