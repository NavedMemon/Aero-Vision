// "use client";
// import React, { useState, useEffect } from "react";
// import StaffSidebar from "../StaffSideBar";
// import "../StaffWork/staffwork.css";

// const TeamTasksPage = () => {
//   const [tasks, setTasks] = useState([]);
//   const [error, setError] = useState("");

//   // Fetch tasks for the logged-in teammate
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await fetch("/api/staff/tasks/teammate", {
//           credentials: "include",
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch tasks");
//         }
//         const data = await response.json();
//         setTasks(data.tasks);
//       } catch (err) {
//         console.error("Error fetching tasks:", err);
//         setError("Failed to load tasks: " + err.message);
//       }
//     };
//     fetchTasks();
//   }, []);

//   // Handle task status update (Start or Finish)
//   const handleTaskUpdate = async (taskHistoryId, status) => {
//     try {
//       const response = await fetch("/api/staff/tasks/update", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ taskHistoryId, status }),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to update task");
//       }
//       const data = await response.json();
//       if (status === "Completed") {
//         setTasks(tasks.filter((task) => task.taskHistoryId !== taskHistoryId));
//       } else {
//         setTasks(
//           tasks.map((task) =>
//             task.taskHistoryId === taskHistoryId
//               ? { ...task, status, startedAt: data.taskHistory.startedAt }
//               : task
//           )
//         );
//       }
//     } catch (err) {
//       console.error("Error updating task:", err);
//       setError("Failed to update task: " + err.message);
//     }
//   };

//   return (
//     <div className="staff-dashboard-wrapper">
//       <StaffSidebar />
//       <div className="staff-dashboard-main">
//         <h2 className="work-heading">🛠️ Team Tasks</h2>
//         {error && <p className="form-error">{error}</p>}
//         {tasks.length === 0 && !error && <p>No tasks assigned.</p>}
//         <div className="tasks-section">
//           <table className="work-table">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Task Description</th>
//                 <th>Status</th>
//                 <th>Assigned</th>
//                 <th>Started</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tasks.map((task, i) => (
//                 <tr key={task.taskHistoryId}>
//                   <td>{i + 1}</td>
//                   <td>{task.description}</td>
//                   <td
//                     className={`status ${
//                       task.status === "Assigned" ? "pending" : "in-progress"
//                     }`}
//                   >
//                     {task.status}
//                   </td>
//                   <td>{new Date(task.assignedAt).toLocaleString()}</td>
//                   <td>
//                     {task.startedAt
//                       ? new Date(task.startedAt).toLocaleString()
//                       : "-"}
//                   </td>
//                   <td>
//                     {task.status === "Assigned" && (
//                       <button
//                         className="start-btn"
//                         onClick={() =>
//                           handleTaskUpdate(task.taskHistoryId, "Started")
//                         }
//                       >
//                         ▶ Start
//                       </button>
//                     )}
//                     {task.status === "Started" && (
//                       <button
//                         className="finish-btn"
//                         onClick={() =>
//                           handleTaskUpdate(task.taskHistoryId, "Completed")
//                         }
//                       >
//                         ✔ Finish
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamTasksPage;

"use client";
import React, { useState, useEffect } from "react";
import StaffSidebar from "../StaffSideBar";
import { useRouter } from "next/navigation";
import "../StaffWork/staffwork.css";

const TeamTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/staff/tasks/teammate", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        console.log("Tasks data:", JSON.stringify(data, null, 2));
        setTasks(data.tasks);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskUpdate = async (taskHistoryId, status) => {
    try {
      const response = await fetch("/api/staff/tasks/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ taskHistoryId, status }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update task");
      }
      const data = await response.json();
      if (status === "Completed") {
        setTasks(tasks.filter((task) => task.taskHistoryId !== taskHistoryId));
      } else {
        setTasks(
          tasks.map((task) =>
            task.taskHistoryId === taskHistoryId
              ? { ...task, status, startedAt: data.taskHistory.startedAt }
              : task
          )
        );
      }
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task: " + err.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="staff-dashboard-wrapper">
      <StaffSidebar />
      <div className="staff-dashboard-main">
        <h2 className="work-heading">🛠️ Team Tasks</h2>
        {error && <p className="form-error">{error}</p>}
        {tasks.length === 0 && !error && <p>No tasks assigned.</p>}
        <div className="tasks-section">
          <table className="work-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Task Description</th>
                <th>Status</th>
                <th>Assigned</th>
                <th>Started</th>
                <th>Rejection Count</th>
                <th>Rejection Reason</th>
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
                      task.status === "Assigned"
                        ? "pending"
                        : task.status === "Rejected"
                        ? "rejected"
                        : "in-progress"
                    }`}
                  >
                    {task.status}
                  </td>
                  <td>{new Date(task.assignedAt).toLocaleString()}</td>
                  <td>
                    {task.startedAt
                      ? new Date(task.startedAt).toLocaleString()
                      : "-"}
                  </td>
                  <td>{task.rejectionCount}</td>
                  <td>{task.rejectionReason || "-"}</td>
                  <td>
                    {task.status === "Assigned" &&
                      task.rejectionCount === 0 && (
                        <button
                          className="start-btn"
                          onClick={() =>
                            handleTaskUpdate(task.taskHistoryId, "Started")
                          }
                        >
                          ▶ Start
                        </button>
                      )}
                    {(task.status === "Started" ||
                      task.status === "Rejected") && (
                      <button
                        className="finish-btn"
                        onClick={() =>
                          handleTaskUpdate(task.taskHistoryId, "Completed")
                        }
                      >
                        ✔ Finish
                      </button>
                    )}
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

export default TeamTasksPage;
