import React from "react";
import StaffSidebar from "./StaffSideBar";
import {
  FaPlane,
  FaClock,
  FaLuggageCart,
  FaBan,
  FaDoorOpen,
  FaCheckCircle,
} from "react-icons/fa";
import "./staff.css";

function Staff() {
  return (
    <div className="staff-dashboard-wrapper">
      <StaffSidebar />
      <div className="staff-dashboard-main">
        <h2 className="dashboard-heading">👨‍✈️ Staff Dashboard </h2>
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <FaPlane className="card-icon" />
            <div>
              <h3>Total Flights</h3>
              <p>32</p>
            </div>
          </div>

          <div className="dashboard-card">
            <FaClock className="card-icon" />
            <div>
              <h3>Ongoing Flights</h3>
              <p>7</p>
            </div>
          </div>

          <div className="dashboard-card">
            <FaCheckCircle className="card-icon" />
            <div>
              <h3>Landed Flights</h3>
              <p>12</p>
            </div>
          </div>

          <div className="dashboard-card">
            <FaBan className="card-icon" />
            <div>
              <h3>Delayed Flights</h3>
              <p>3</p>
            </div>
          </div>

          <div className="dashboard-card">
            <FaLuggageCart className="card-icon" />
            <div>
              <h3>Baggage in Queue</h3>
              <p>58</p>
            </div>
          </div>

          <div className="dashboard-card">
            <FaDoorOpen className="card-icon" />
            <div>
              <h3>Available Gates</h3>
              <p>6</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Staff;
