"use client";
import React from "react";
import Sidebar from "./Sidebar";
import "./passenger.css";
import { motion } from "framer-motion";
import FloatingPlane from "./FloatingPlane";

const PassengerDashboard = ({ children, userName = "Passenger" }) => {
  return (
    <div className="passenger-dashboard-container">
      <Sidebar />

      <div className="passenger-dashboard-main">
        <FloatingPlane />
        <motion.h1
          className="passenger-welcome-heading"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome, {userName} 👋
        </motion.h1>

        <motion.div
          className="passenger-dashboard-widgets"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default PassengerDashboard;
