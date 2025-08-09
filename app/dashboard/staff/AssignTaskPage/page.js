"use client";
import React, { useState, useEffect } from "react";
import StaffSidebar from "../StaffSideBar";
import { useRouter, useSearchParams } from "next/navigation";
import "../StaffWork/staffwork.css";

const AssignTaskPage = () => {
  const [task, setTask] = useState(null);
  const [teammates, setTeammates] = useState([]);
  const [selectedTeammates, setSelectedTeammates] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");
  const taskHistoryId = searchParams.get("taskHistoryId");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`/api/staff/tasks?taskId=${taskId}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch task");
        }
        const data = await response.json();
        const taskData = data.tasks.find(
          (t) => t.taskHistoryId === taskHistoryId
        );
        setTask(taskData);
      } catch (err) {
        console.error("Error fetching task:", err);
        setError("Failed to load task: " + err.message);
      }
    };

    const fetchTeammates = async () => {
      try {
        const response = await fetch("/api/staff/teammates", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch teammates");
        }
        const data = await response.json();
        setTeammates(data.teammates);
      } catch (err) {
        console.error("Error fetching teammates:", err);
        setError("Failed to load teammates: " + err.message);
      }
    };

    if (taskId && taskHistoryId) {
      fetchTask();
      fetchTeammates();
    }
  }, [taskId, taskHistoryId]);

  const handleTeammateSelection = (teammateId) => {
    setSelectedTeammates((prev) =>
      prev.includes(teammateId)
        ? prev.filter((id) => id !== teammateId)
        : [...prev, teammateId]
    );
  };

  const handleAssignTask = async () => {
    if (selectedTeammates.length === 0) {
      setError("Please select at least one teammate.");
      return;
    }
    try {
      const response = await fetch("/api/staff/tasks/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          taskId,
          taskHistoryId,
          teammateIds: selectedTeammates,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to assign task");
      }
      setSuccess("Task assigned successfully!");
      setTimeout(() => router.push("/dashboard/staff/work"), 2000);
    } catch (err) {
      console.error("Error assigning task:", err);
      setError("Failed to assign task: " + err.message);
    }
  };

  if (!task) {
    return (
      <div className="staff-dashboard-wrapper">
        <StaffSidebar />
        <div className="staff-dashboard-main">
          <p>Loading task...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="staff-dashboard-wrapper">
      <StaffSidebar />
      <div className="staff-dashboard-main">
        <h2 className="work-heading">🛠️ Assign Task</h2>
        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}
        <div className="task-details">
          <h3>Task Details</h3>
          <p>
            <strong>Title:</strong> {task.title}
          </p>
          <p>
            <strong>Description:</strong> {task.description}
          </p>
          <p>
            <strong>Status:</strong> {task.status}
          </p>
          <p>
            <strong>Assigned At:</strong>{" "}
            {new Date(task.assignedAt).toLocaleString()}
          </p>
        </div>
        <div className="teammates-section">
          <h3>Select Teammates</h3>
          {teammates.length === 0 ? (
            <p>No teammates available.</p>
          ) : (
            <ul className="teammates-list">
              {teammates.map((teammate) => (
                <li key={teammate._id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedTeammates.includes(teammate._id)}
                      onChange={() => handleTeammateSelection(teammate._id)}
                    />
                    {teammate.name} ({teammate.email})
                  </label>
                </li>
              ))}
            </ul>
          )}
          <button className="assign-btn" onClick={handleAssignTask}>
            Assign Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTaskPage;
