// "use client";
// import React, { useState } from "react";
// import StaffSidebar from "../StaffSideBar";
// import "./staffwork.css"; // Add this for styles

// const initialTasks = [
//   { id: 1, description: "Check Gate A1 Systems", status: "Pending" },
//   { id: 2, description: "Assist Flight AI-203 Boarding", status: "Pending" },
//   { id: 3, description: "Run Security Scan at Gate B2", status: "Pending" },
// ];

// const StaffWorkPage = () => {
//   const [tasks, setTasks] = useState(initialTasks);

//   const handleStart = (id) => {
//     setTasks((prev) =>
//       prev.map((task) =>
//         task.id === id ? { ...task, status: "In Progress" } : task
//       )
//     );
//   };

//   const handleFinish = (id) => {
//     setTasks((prev) =>
//       prev.map((task) =>
//         task.id === id ? { ...task, status: "Completed" } : task
//       )
//     );
//   };

//   return (
//     <div className="staff-dashboard-wrapper">
//       <StaffSidebar />
//       <div className="staff-dashboard-main">
//         <h2 className="work-heading">🛠️ Work Tasks</h2>
//         <table className="work-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Task Description</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task, i) => (
//               <tr key={task.id}>
//                 <td>{i + 1}</td>
//                 <td>{task.description}</td>
//                 <td className={`status ${task.status.toLowerCase()}`}>
//                   {task.status}
//                 </td>
//                 <td>
//                   <button
//                     className="start-btn"
//                     onClick={() => handleStart(task.id)}
//                     disabled={task.status !== "Pending"}
//                   >
//                     ▶ Start
//                   </button>
//                   <button
//                     className="finish-btn"
//                     onClick={() => handleFinish(task.id)}
//                     disabled={task.status !== "In Progress"}
//                   >
//                     ✔ Finish
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default StaffWorkPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import StaffSidebar from "../StaffSideBar";
// import "./staffwork.css";

// const StaffWorkPage = () => {
//   const [tasks, setTasks] = useState([]);
//   const [error, setError] = useState("");

//   // Fetch tasks for the logged-in staff
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await fetch("/api/staff/tasks", {
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
//         <h2 className="work-heading">🛠️ Work Tasks</h2>
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

// export default StaffWorkPage;

"use client";
import React, { useState, useEffect } from "react";
import StaffSidebar from "../StaffSideBar";
import { useRouter } from "next/navigation";
import "./staffwork.css";

const StaffWorkPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState({ isTeamLeader: false, role: null });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch user data
        const userResponse = await fetch("/api/get-token", {
          credentials: "include",
        });
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await userResponse.json();
        console.log("User data:", JSON.stringify(userData, null, 2));
        setUser({ isTeamLeader: userData.isTeamLeader, role: userData.role });

        // Fetch tasks
        const tasksResponse = await fetch("/api/staff/tasks", {
          credentials: "include",
        });
        if (!tasksResponse.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const tasksData = await tasksResponse.json();
        console.log("Tasks data:", JSON.stringify(tasksData, null, 2));
        // Normalize task.status
        const normalizedTasks = tasksData.tasks.map((task) => ({
          ...task,
          status: String(task.status).trim(),
          taskId: String(task.taskId),
          taskHistoryId: String(task.taskHistoryId),
        }));
        setTasks(normalizedTasks);
        console.log("isTeamLeader from tasks API:", tasksData.isTeamLeader);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssignTask = (taskId, taskHistoryId) => {
    console.log("Navigating to assign task:", { taskId, taskHistoryId });
    router.push(
      `/dashboard/staff/AssignTeammateTaskPage?taskId=${taskId}&taskHistoryId=${taskHistoryId}`
    );
  };

  console.log("State before render:", {
    user: JSON.stringify(user, null, 2),
    tasks: JSON.stringify(tasks, null, 2),
    isLoading,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="staff-dashboard-wrapper">
      <StaffSidebar />
      <div className="staff-dashboard-main">
        <h2 className="work-heading">🛠️ Work Tasks</h2>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, i) => {
                const showButton =
                  user.isTeamLeader && task.status === "Assigned";
                console.log(
                  "Task render:",
                  JSON.stringify(
                    {
                      taskId: task.taskId,
                      taskHistoryId: task.taskHistoryId,
                      status: task.status,
                      statusType: typeof task.status,
                      isTeamLeader: user.isTeamLeader,
                      showButton,
                    },
                    null,
                    2
                  )
                );
                return (
                  <tr key={task.taskHistoryId}>
                    <td>{i + 1}</td>
                    <td>{task.description}</td>
                    <td
                      className={`status ${
                        task.status === "Assigned"
                          ? "pending"
                          : task.status === "Delegated"
                          ? "delegated"
                          : "in-progress"
                      }`}
                    >
                      {task.status}
                    </td>
                    <td>{new Date(task.assignedAt).toLocaleString()}</td>
                    <td>
                      <button
                        className="assign-btn"
                        onClick={() =>
                          handleAssignTask(task.taskId, task.taskHistoryId)
                        }
                      >
                        Assign Task
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffWorkPage;
