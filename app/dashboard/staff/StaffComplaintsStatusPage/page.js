"use client";
import React from "react";
import StaffSidebar from "../StaffSideBar";
import "./staffComplaintsStatus.css";

const complaints = [
  {
    id: 1,
    subject: "System not responding",
    category: "Technical",
    status: "Pending",
    submittedAt: "2025-07-10 11:30 AM",
  },
  {
    id: 2,
    subject: "Gate assignment missing",
    category: "Operations",
    status: "In Progress",
    submittedAt: "2025-07-09 04:15 PM",
  },
  {
    id: 3,
    subject: "Schedule conflict",
    category: "HR",
    status: "Resolved",
    submittedAt: "2025-07-08 09:45 AM",
  },
];

const StaffComplaintStatus = () => {
  return (
    <div className="staff-dashboard-wrapper">
      <StaffSidebar />
      <div className="complaint-status-container">
        <h2 className="complaint-status-title">📋 Your Complaints & Status</h2>
        <div className="complaint-table">
          <div className="table-header">
            <div>Sr No</div>
            <div>Subject</div>
            <div>Category</div>
            <div>Status</div>
            <div>Submitted At</div>
          </div>
          {complaints.map((c, i) => (
            <div key={c.id} className="table-row">
              <div>{i + 1}</div>
              <div>{c.subject}</div>
              <div>{c.category}</div>
              <div>
                <span
                  className={`status-badge ${c.status
                    .toLowerCase()
                    .replace(/\s/g, "-")}`}
                >
                  {c.status}
                </span>
              </div>
              <div>{c.submittedAt}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffComplaintStatus;
