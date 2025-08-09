"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./staffwork.css"; // Reuse staff CSS
import AdminSidebar from "../AdminSidebar";
import "../admin.css";

const AdminTaskHistoryPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [rejectionReason, setRejectionReason] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/admin/tasks/history", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(
            `HTTP error ${response.status}: ${response.statusText}`
          );
        }
        const data = await response.json();
        console.log("Admin task history data:", JSON.stringify(data, null, 2));
        setTasks(data.tasks || []);
      } catch (err) {
        console.error("Error fetching admin task history:", err);
        setError("Failed to load task history: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskAction = async (taskHistoryId, action, reason = "") => {
    try {
      const response = await fetch("/api/admin/tasks/history", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          taskHistoryId,
          action,
          rejectionReason: reason,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process task");
      }
      setTasks(tasks.filter((task) => task.taskHistoryId !== taskHistoryId));
      console.log(`${action} task:`, taskHistoryId, { reason });
    } catch (err) {
      console.error(`Error ${action.toLowerCase()} task:`, err);
      setError(`Failed to ${action.toLowerCase()} task: ` + err.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="staff-dashboard-wrapper">
      <AdminSidebar />
      <div className="staff-dashboard-main">
        <h2 className="work-heading">📜 Admin Task History</h2>
        {error && <p className="form-error">{error}</p>}
        {tasks.length === 0 && !error && <p>No tasks to review.</p>}
        <div className="tasks-section">
          <table className="work-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Task Description</th>
                <th>Status</th>
                <th>Assigned</th>
                <th>Completed</th>
                <th>Team Leader Rejection Count</th>
                <th>Team Leader Rejection Reason</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, i) => (
                <tr key={task.taskHistoryId}>
                  <td>{i + 1}</td>
                  <td>{task.description}</td>
                  <td
                    className={`status ${
                      task.status === "Completed" ? "in-progress" : ""
                    }`}
                  >
                    {task.status}
                  </td>
                  <td>{new Date(task.assignedAt).toLocaleString()}</td>
                  <td>
                    {task.completedAt
                      ? new Date(task.completedAt).toLocaleString()
                      : "-"}
                  </td>
                  <td>{task.rejectionCount}</td>
                  <td>{task.rejectionReason || "-"}</td>
                  <td>
                    <button
                      className="accept-btn"
                      onClick={() =>
                        handleTaskAction(task.taskHistoryId, "Accept")
                      }
                    >
                      ✅ Accept
                    </button>
                    <div>
                      <input
                        type="text"
                        placeholder="Enter rejection reason"
                        value={rejectionReason[task.taskHistoryId] || ""}
                        onChange={(e) =>
                          setRejectionReason({
                            ...rejectionReason,
                            [task.taskHistoryId]: e.target.value,
                          })
                        }
                        className="reject-reason-input"
                      />
                      <button
                        className="reject-btn"
                        onClick={() =>
                          handleTaskAction(
                            task.taskHistoryId,
                            "Reject",
                            rejectionReason[task.taskHistoryId] || ""
                          )
                        }
                        disabled={!rejectionReason[task.taskHistoryId]}
                      >
                        ❌ Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTaskHistoryPage;
