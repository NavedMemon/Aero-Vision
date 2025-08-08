// "use client";
// import React, { useState, useEffect } from "react";
// import AdminSidebar from "../AdminSidebar";
// import "../admin.css";
// import "./managetask.css";
// import { FaEye, FaTrash, FaEdit, FaTimes, FaPlus } from "react-icons/fa";

// const mockUsers = [
//   { id: 1, name: "User1" },
//   { id: 2, name: "User2" },
//   { id: 3, name: "User3" },
//   { id: 4, name: "User4" },
// ];

// const mockTasks = new Array(12).fill(0).map((_, i) => ({
//   id: i,
//   name: `Task ${i + 1}`,
//   description: `This is a sample task description for task ${i + 1}.`,
//   assignedTo: mockUsers[i % mockUsers.length].name,
//   status: i % 4 === 0 ? "To Do" : i % 4 === 1 ? "In Progress" : i % 4 === 2 ? "Done" : "Pending",
//   createdBy: mockUsers[(i + 1) % mockUsers.length].name,
//   createdAt: `2025-07-${(20 - i).toString().padStart(2, "0")}T${(10 + i).toString().padStart(2, "0")}:00:00`,
// }));

// const ManageTaskPage = () => {
//   const [hasMounted, setHasMounted] = useState(false);
//   const [tasks, setTasks] = useState(mockTasks);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editTask, setEditTask] = useState(null);
//   const [isCreating, setIsCreating] = useState(false);
//   const [newTask, setNewTask] = useState({ name: "", description: "", assignedTo: "", status: "To Do" });
//   const tasksPerPage = 8;

//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter]);

//   if (!hasMounted) return null;

//   const uniqueStatuses = ["All", ...new Set(mockTasks.map((task) => task.status))];

//   const filteredTasks = tasks.filter((task) => {
//     const matchesSearch =
//       task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       task.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatusFilter =
//       statusFilter === "All" || task.status.toLowerCase() === statusFilter.toLowerCase();
//     return matchesSearch && matchesStatusFilter;
//   });

//   const totalPages = Math.max(1, Math.ceil(filteredTasks.length / tasksPerPage));

//   const paginated = filteredTasks.slice(
//     (currentPage - 1) * tasksPerPage,
//     currentPage * tasksPerPage
//   );

//   const handleViewDetails = (task) => {
//     setSelectedTask(task);
//     setIsEditing(false);
//     setIsCreating(false);
//   };

//   const handleEditTask = (task) => {
//     setEditTask({ ...task });
//     setIsEditing(true);
//     setIsCreating(false);
//   };

//   const handleCreateTask = () => {
//     setNewTask({ name: "", description: "", assignedTo: mockUsers[0].name, status: "To Do" });
//     setIsCreating(true);
//     setIsEditing(false);
//     setSelectedTask(null);
//   };

//   const handleEditSubmit = (e) => {
//     e.preventDefault();
//     if (!editTask.name.trim()) {
//       alert("Task Name cannot be empty.");
//       return;
//     }
//     if (!editTask.description.trim()) {
//       alert("Task Description cannot be empty.");
//       return;
//     }
//     setTasks(
//       tasks.map((task) => (task.id === editTask.id ? { ...editTask } : task))
//     );
//     setIsEditing(false);
//     setSelectedTask(null);
//   };

//   const handleCreateSubmit = (e) => {
//     e.preventDefault();
//     if (!newTask.name.trim()) {
//       alert("Task Name cannot be empty.");
//       return;
//     }
//     if (!newTask.description.trim()) {
//       alert("Task Description cannot be empty.");
//       return;
//     }
//     const newId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 0;
//     setTasks([
//       ...tasks,
//       {
//         ...newTask,
//         id: newId,
//         createdBy: "Admin", // Replace with auth context in production
//         createdAt: new Date().toISOString(),
//       },
//     ]);
//     setIsCreating(false);
//   };

//   const handleEditInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditTask({ ...editTask, [name]: value });
//   };

//   const handleNewTaskInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTask({ ...newTask, [name]: value });
//   };

//   const handleStatusChange = (id, newStatus) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === id ? { ...task, status: newStatus } : task
//       )
//     );
//   };

//   const handleDeleteTask = (id) => {
//     if (confirm("Are you sure you want to delete this task?")) {
//       setTasks(tasks.filter((task) => task.id !== id));
//       if (selectedTask?.id === id) {
//         setSelectedTask(null);
//       }
//     }
//   };

//   const handleExportTasks = () => {
//     if (filteredTasks.length === 0) {
//       alert("No tasks to export.");
//       return;
//     }
//     const csvContent = [
//       "Name,Description,Assigned To,Status,Created By,Created At",
//       ...filteredTasks.map((task) =>
//         [
//           `"${task.name.replace(/"/g, '""')}"`,
//           `"${task.description.replace(/"/g, '""')}"`,
//           `"${task.assignedTo.replace(/"/g, '""')}"`,
//           task.status,
//           `"${task.createdBy.replace(/"/g, '""')}"`,
//           new Date(task.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
//         ].join(",")
//       ),
//     ].join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = `tasks_${new Date().toISOString()}.csv`;
//     link.click();
//     URL.revokeObjectURL(link.href);
//   };

//   const closeModal = () => {
//     setSelectedTask(null);
//     setIsEditing(false);
//     setIsCreating(false);
//   };

//   return (
//     <div className="admin-dashboard-new-container">
//       <AdminSidebar />
//       <div className="admin-dashboard-main-bright">
//         <h1 className="admin-task-title">📋 Manage Tasks</h1>

//         <div className="admin-task-controls">
//           <input
//             type="text"
//             placeholder="Search tasks..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//             {uniqueStatuses.map((status) => (
//               <option key={status} value={status}>
//                 {status}
//               </option>
//             ))}
//           </select>
//           <button className="admin-export-button" onClick={handleExportTasks}>
//             Export Tasks
//           </button>
//           <button className="admin-create-task-button" onClick={handleCreateTask}>
//             <FaPlus /> Create New Task
//           </button>
//         </div>

//         {paginated.length === 0 ? (
//           <p className="admin-no-tasks">No tasks found.</p>
//         ) : (
//           <div className="admin-task-table-container">
//             <table className="admin-task-table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Description</th>
//                   <th>Assigned To</th>
//                   <th>Status</th>
//                   <th>Created By</th>
//                   <th>Created At</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginated.map((task) => (
//                   <tr key={task.id}>
//                     <td>{task.name}</td>
//                     <td>{task.description}</td>
//                     <td>{task.assignedTo}</td>
//                     <td>
//                       <select
//                         className={`admin-status-select admin-status-${task.status.toLowerCase().replace(" ", "-")}`}
//                         value={task.status}
//                         onChange={(e) => handleStatusChange(task.id, e.target.value)}
//                         aria-label={`Change status for ${task.name}`}
//                       >
//                         <option value="To Do">To Do</option>
//                         <option value="In Progress">In Progress</option>
//                         <option value="Done">Done</option>
//                         <option value="Pending">Pending</option>
//                       </select>
//                     </td>
//                     <td>{task.createdBy}</td>
//                     <td>
//                       {new Date(task.createdAt).toLocaleString("en-IN", {
//                         timeZone: "Asia/Kolkata",
//                       })}
//                     </td>
//                     <td>
//                       <div className="admin-task-actions">
//                         <button
//                           className="admin-view-button"
//                           onClick={() => handleViewDetails(task)}
//                           aria-label={`View details for ${task.name}`}
//                         >
//                           <FaEye />
//                         </button>
//                         <button
//                           className="admin-delete-button"
//                           onClick={() => handleDeleteTask(task.id)}
//                           aria-label={`Delete ${task.name}`}
//                         >
//                           <FaTrash />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {(selectedTask || isCreating) && (
//           <div className="admin-task-modal-overlay" onClick={closeModal}>
//             <div
//               className="admin-task-modal"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 className="admin-modal-close"
//                 onClick={closeModal}
//                 aria-label="Close modal"
//               >
//                 <FaTimes />
//               </button>
//               {isCreating ? (
//                 <form onSubmit={handleCreateSubmit} className="admin-task-form">
//                   <h3>Create New Task</h3>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Task Name"
//                     value={newTask.name}
//                     onChange={handleNewTaskInputChange}
//                     required
//                   />
//                   <textarea
//                     name="description"
//                     placeholder="Task Description"
//                     value={newTask.description}
//                     onChange={handleNewTaskInputChange}
//                     required
//                   />
//                   <select
//                     name="assignedTo"
//                     value={newTask.assignedTo}
//                     onChange={handleNewTaskInputChange}
//                   >
//                     {mockUsers.map((user) => (
//                       <option key={user.id} value={user.name}>
//                         {user.name}
//                       </option>
//                     ))}
//                   </select>
//                   <select
//                     name="status"
//                     value={newTask.status}
//                     onChange={handleNewTaskInputChange}
//                   >
//                     <option value="To Do">To Do</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Done">Done</option>
//                     <option value="Pending">Pending</option>
//                   </select>
//                   <button type="submit">Create Task</button>
//                   <button
//                     type="button"
//                     className="admin-modal-cancel"
//                     onClick={closeModal}
//                   >
//                     Cancel
//                   </button>
//                 </form>
//               ) : isEditing ? (
//                 <form onSubmit={handleEditSubmit} className="admin-task-form">
//                   <h3>Edit Task</h3>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Task Name"
//                     value={editTask.name}
//                     onChange={handleEditInputChange}
//                     required
//                   />
//                   <textarea
//                     name="description"
//                     placeholder="Task Description"
//                     value={editTask.description}
//                     onChange={handleEditInputChange}
//                     required
//                   />
//                   <select
//                     name="assignedTo"
//                     value={editTask.assignedTo}
//                     onChange={handleEditInputChange}
//                   >
//                     {mockUsers.map((user) => (
//                       <option key={user.id} value={user.name}>
//                         {user.name}
//                       </option>
//                     ))}
//                   </select>
//                   <select
//                     name="status"
//                     value={editTask.status}
//                     onChange={handleEditInputChange}
//                   >
//                     <option value="To Do">To Do</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Done">Done</option>
//                     <option value="Pending">Pending</option>
//                   </select>
//                   <button type="submit">Save Changes</button>
//                   <button
//                     type="button"
//                     className="admin-modal-cancel"
//                     onClick={() => setIsEditing(false)}
//                   >
//                     Cancel
//                   </button>
//                 </form>
//               ) : (
//                 <>
//                   <h3>Task Details</h3>
//                   <p><strong>Name:</strong> {selectedTask.name}</p>
//                   <p><strong>Description:</strong> {selectedTask.description}</p>
//                   <p><strong>Assigned To:</strong> {selectedTask.assignedTo}</p>
//                   <p><strong>Status:</strong> {selectedTask.status}</p>
//                   <p><strong>Created By:</strong> {selectedTask.createdBy}</p>
//                   <p>
//                     <strong>Created At:</strong>{" "}
//                     {new Date(selectedTask.createdAt).toLocaleString("en-IN", {
//                       timeZone: "Asia/Kolkata",
//                     })}
//                   </p>
//                   <button
//                     className="admin-edit-button"
//                     onClick={() => handleEditTask(selectedTask)}
//                     aria-label={`Edit ${selectedTask.name}`}
//                   >
//                     <FaEdit /> Edit Task
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         )}

//         <div className="admin-task-pagination">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={i + 1 === currentPage ? "active" : ""}
//               disabled={i + 1 === currentPage}
//               aria-label={`Go to page ${i + 1}`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageTaskPage;

"use client";
import React, { useState, useEffect } from "react";
import AdminSidebar from "../AdminSidebar";
import "../admin.css";
import "./managetask.css";
import { FaEdit, FaTimes } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ManageTaskPage = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [error, setError] = useState("");
  const tasksPerPage = 8;

  useEffect(() => {
    setHasMounted(true);
    fetchTasks();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, nameFilter, emailFilter, startDate, endDate, statusFilter]);

  const fetchTasks = async () => {
    try {
      const query = new URLSearchParams({
        description: searchTerm,
        name: nameFilter,
        email: emailFilter,
        startDate,
        endDate,
        status: statusFilter === "All" ? "" : statusFilter,
      }).toString();
      const response = await fetch(`/api/admin/task-history?${query}`, {
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data.taskHistories || []);
      // Extract unique staff for dropdowns
      const staff = [
        ...new Set(
          data.taskHistories.map((task) => ({
            _id: task.staffId,
            name: task.staffName,
            email: task.staffEmail,
          }))
        ),
      ];
      setStaffList(staff);
      setError("");
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks: " + err.message);
      setTasks([]);
    }
  };

  useEffect(() => {
    if (hasMounted) fetchTasks();
  }, [searchTerm, nameFilter, emailFilter, startDate, endDate, statusFilter]);

  const uniqueStatuses = ["All", "Assigned", "Started", "Completed"];

  const totalPages = Math.max(1, Math.ceil(tasks.length / tasksPerPage));
  const paginated = tasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const handleEditTask = (task) => {
    setEditTask({ ...task });
    setIsEditing(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editTask.description.trim()) {
      alert("Task Description cannot be empty.");
      return;
    }
    try {
      const response = await fetch("/api/admin/task-history", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          taskId: editTask._id,
          description: editTask.description,
          staffId: staffList.find((s) => s.email === editTask.assignedTo)?._id,
          status: editTask.status,
        }),
      });
      if (!response.ok) throw new Error("Failed to update task");
      setTasks(
        tasks.map((task) =>
          task._id === editTask._id ? { ...task, ...editTask } : task
        )
      );
      setIsEditing(false);
    } catch (err) {
      alert("Error updating task: " + err.message);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditTask({ ...editTask, [name]: value });
  };

  const handleExport = (format) => {
    if (tasks.length === 0) {
      alert("No tasks to export.");
      return;
    }
    const exportData = tasks.map((task) => ({
      Description: task.description,
      "Staff Name": task.staffName,
      "Staff Email": task.staffEmail,
      Status: task.status,
      "Assigned At": new Date(task.assignedAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
      "Started At": task.startedAt
        ? new Date(task.startedAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })
        : "",
      "Completed At": task.completedAt
        ? new Date(task.completedAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })
        : "",
      "Admin Email": task.adminEmail,
    }));

    const filename = `task_history_${new Date().toISOString().split("T")[0]}`;
    if (format === "csv") {
      const csvContent = [
        Object.keys(exportData[0]).join(","),
        ...exportData.map((row) =>
          Object.values(row)
            .map((val) => `"${String(val).replace(/"/g, '""')}"`)
            .join(",")
        ),
      ].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}.csv`;
      link.click();
      URL.revokeObjectURL(link.href);
    } else {
      const doc = new jsPDF();
      doc.setFont("helvetica");
      doc.setFontSize(12);
      doc.text("Task History Report", 14, 20);
      autoTable(doc, {
        startY: 30,
        head: [Object.keys(exportData[0])],
        body: exportData.map((row) => Object.values(row)),
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 2 },
        headStyles: { fillColor: [0, 194, 255], textColor: [0, 0, 0] },
        alternateRowStyles: { fillColor: [240, 240, 240] },
      });
      doc.save(`${filename}.pdf`);
    }
  };

  const closeModal = () => {
    setIsEditing(false);
  };

  if (!hasMounted) return null;

  return (
    <div className="admin-dashboard-container">
      <AdminSidebar />
      <div className="admin-dashboard-main">
        <h1 className="admin-task-title">📋 Manage Task History</h1>
        {error && <p className="form-error">{error}</p>}

        <div className="admin-task-controls">
          <input
            type="text"
            placeholder="Search by description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by staff name..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
          <input
            type="email"
            placeholder="Filter by staff email..."
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
          />
          <input
            type="date"
            placeholder="Start date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="End date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {uniqueStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button
            className="admin-export-button"
            onClick={() => handleExport("csv")}
          >
            Export CSV
          </button>
          <button
            className="admin-export-button"
            onClick={() => handleExport("pdf")}
          >
            Export PDF
          </button>
        </div>

        {paginated.length === 0 ? (
          <p className="admin-no-tasks">No tasks found.</p>
        ) : (
          <div className="admin-task-table-container">
            <table className="admin-task-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Staff Name</th>
                  <th>Staff Email</th>
                  <th>Status</th>
                  <th>Assigned At</th>
                  <th>Started At</th>
                  <th>Completed At</th>
                  <th>Admin Email</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((task) => (
                  <tr key={task._id}>
                    <td>{task.description}</td>
                    <td>{task.staffName}</td>
                    <td>{task.staffEmail}</td>
                    <td className={`admin-status-${task.status.toLowerCase()}`}>
                      {task.status}
                    </td>
                    <td>
                      {new Date(task.assignedAt).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })}
                    </td>
                    <td>
                      {task.startedAt
                        ? new Date(task.startedAt).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                          })
                        : "-"}
                    </td>
                    <td>
                      {task.completedAt
                        ? new Date(task.completedAt).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                          })
                        : "-"}
                    </td>
                    <td>{task.adminEmail}</td>
                    <td>
                      <button
                        className="admin-edit-button"
                        onClick={() => handleEditTask(task)}
                        aria-label={`Edit ${task.description}`}
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isEditing && (
          <div className="admin-task-modal-overlay" onClick={closeModal}>
            <div
              className="admin-task-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="admin-modal-close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
              <form onSubmit={handleEditSubmit} className="admin-task-form">
                <h3>Edit Task</h3>
                <input
                  type="text"
                  name="description"
                  placeholder="Task Description"
                  value={editTask.description}
                  onChange={handleEditInputChange}
                  required
                />
                <select
                  name="assignedTo"
                  value={editTask.assignedTo}
                  onChange={handleEditInputChange}
                >
                  {staffList.map((staff) => (
                    <option key={staff._id} value={staff.email}>
                      {staff.name} ({staff.email})
                    </option>
                  ))}
                </select>
                <select
                  name="status"
                  value={editTask.status}
                  onChange={handleEditInputChange}
                >
                  <option value="Assigned">Assigned</option>
                  <option value="Started">Started</option>
                  <option value="Completed">Completed</option>
                </select>
                <button type="submit">Save Changes</button>
                <button
                  type="button"
                  className="admin-modal-cancel"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="admin-task-pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={i + 1 === currentPage ? "active" : ""}
              disabled={i + 1 === currentPage}
              aria-label={`Go to page ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageTaskPage;
