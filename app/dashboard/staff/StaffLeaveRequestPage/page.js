"use client";
import React, { useState } from "react";
import StaffSidebar from "../StaffSideBar";
import "./staffleave.css";

const LeaveRequestPage = () => {
  const [form, setForm] = useState({
    fromDate: "",
    toDate: "",
    description: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const leavesPerPage = 3;

  const pastLeaves = [
    {
      date: "2025-07-01",
      duration: "2 Days",
      description: "Family function",
      status: "Accepted",
    },
    {
      date: "2025-06-18",
      duration: "1 Day",
      description: "Medical leave",
      status: "Pending",
    },
    {
      date: "2025-06-10",
      duration: "3 Days",
      description: "Personal reasons",
      status: "Rejected",
    },
    {
      date: "2025-06-01",
      duration: "1 Day",
      description: "Festival leave",
      status: "Accepted",
    },
    {
      date: "2025-05-20",
      duration: "2 Days",
      description: "Function at home",
      status: "Accepted",
    },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateDuration = () => {
    const from = new Date(form.fromDate);
    const to = new Date(form.toDate);
    const diff = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? `${diff} Day${diff > 1 ? "s" : ""}` : "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const duration = calculateDuration();
    if (!duration) return alert("❌ Enter valid dates");

    alert(`✅ Leave for ${duration} submitted!`);
    setForm({ fromDate: "", toDate: "", description: "" });
  };

  // Pagination Logic
  const indexOfLast = currentPage * leavesPerPage;
  const indexOfFirst = indexOfLast - leavesPerPage;
  const currentLeaves = pastLeaves.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(pastLeaves.length / leavesPerPage);

  return (
    <div className="staff-leave-page">
      <StaffSidebar />
      <div className="leave-main">
        <h2 className="leave-title">📝 Leave Request</h2>

        <form className="leave-form" onSubmit={handleSubmit}>
          <div className="form-group-row">
            <div className="form-group">
              <label>From</label>
              <input
                type="date"
                name="fromDate"
                value={form.fromDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>To</label>
              <input
                type="date"
                name="toDate"
                value={form.toDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Reason for leave"
              rows={4}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            📤 Send Request
          </button>
        </form>

        <h3 className="past-title">📂 Past Leave Requests</h3>
        <div className="leave-history">
          {currentLeaves.map((leave, index) => (
            <div className="leave-card" key={index}>
              <p>
                <strong>Date:</strong> {leave.date}
              </p>
              <p>
                <strong>Duration:</strong> {leave.duration}
              </p>
              <p>
                <strong>Description:</strong> {leave.description}
              </p>
              <p className={`status ${leave.status.toLowerCase()}`}>
                <strong>Status:</strong> {leave.status}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination-controls">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            ⬅️ Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestPage;
