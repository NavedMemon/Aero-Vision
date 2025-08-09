"use client";
import React, { useState, useEffect } from "react";
import StaffSidebar from "../StaffSideBar";
import { useRouter, useSearchParams } from "next/navigation";
import "../StaffWork/staffwork.css";

const AssignTeammateTaskPage = () => {
  const [task, setTask] = useState(null);
  const [teammates, setTeammates] = useState([]);
  const [selectedTeammates, setSelectedTeammates] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");
  const taskHistoryId = searchParams.get("taskHistoryId");

  // Fetch task and teammates
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
        if (data.tasks.length === 0) {
          throw new Error("Task not found");
        }
        setTask(data.tasks[0]);
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
    } else {
      setError("Invalid task or task history ID");
    }
  }, [taskId, taskHistoryId]);

  // Handle teammate selection
  const handleTeammateChange = (teammateId) => {
    setSelectedTeammates((prev) =>
      prev.includes(teammateId)
        ? prev.filter((id) => id !== teammateId)
        : [...prev, teammateId]
    );
    setError("");
  };

  // Handle task assignment
  const handleAssignTask = async () => {
    if (selectedTeammates.length === 0) {
      setError("Please select at least one teammate");
      return;
    }

    try {
      const response = await fetch("/api/staff/tasks", {
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

      router.push("/dashboard/staff/StaffWork");
    } catch (err) {
      console.error("Error assigning task:", err);
      setError("Failed to assign task: " + err.message);
    }
  };

  return (
    <div className="staff-dashboard-wrapper">
      <StaffSidebar />
      <div className="staff-dashboard-main">
        <h2 className="work-heading">🛠️ Assign Task to Teammates</h2>
        {error && <p className="form-error">{error}</p>}
        {task ? (
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
        ) : (
          <p>Loading task...</p>
        )}
        <div className="tasks-section">
          <h3>Select Teammates</h3>
          {teammates.length === 0 ? (
            <p>No teammates available.</p>
          ) : (
            <div className="task-list">
              {teammates.map((teammate) => (
                <div key={teammate._id} className="task-card">
                  <input
                    type="checkbox"
                    value={teammate._id}
                    checked={selectedTeammates.includes(teammate._id)}
                    onChange={() => handleTeammateChange(teammate._id)}
                  />
                  <p>
                    {teammate.name} ({teammate.email})
                  </p>
                </div>
              ))}
            </div>
          )}
          <button className="assign-btn" onClick={handleAssignTask}>
            Assign Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTeammateTaskPage;
