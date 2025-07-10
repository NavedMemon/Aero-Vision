"use client";
import React, { useState } from "react";
import StaffSidebar from "../StaffSideBar";
import "./staffwork.css"; // Add this for styles

const initialTasks = [
  { id: 1, description: "Check Gate A1 Systems", status: "Pending" },
  { id: 2, description: "Assist Flight AI-203 Boarding", status: "Pending" },
  { id: 3, description: "Run Security Scan at Gate B2", status: "Pending" },
];

const StaffWorkPage = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleStart = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: "In Progress" } : task
      )
    );
  };

  const handleFinish = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: "Completed" } : task
      )
    );
  };

  return (
    <div className="staff-dashboard-wrapper">
      <StaffSidebar />
      <div className="staff-dashboard-main">
        <h2 className="work-heading">🛠️ Work Tasks</h2>
        <table className="work-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Task Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, i) => (
              <tr key={task.id}>
                <td>{i + 1}</td>
                <td>{task.description}</td>
                <td className={`status ${task.status.toLowerCase()}`}>
                  {task.status}
                </td>
                <td>
                  <button
                    className="start-btn"
                    onClick={() => handleStart(task.id)}
                    disabled={task.status !== "Pending"}
                  >
                    ▶ Start
                  </button>
                  <button
                    className="finish-btn"
                    onClick={() => handleFinish(task.id)}
                    disabled={task.status !== "In Progress"}
                  >
                    ✔ Finish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffWorkPage;
