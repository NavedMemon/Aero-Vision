// "use client";
// import React, { useState } from "react";
// import StaffSidebar from "../AdminSidebar";
// import "./taskAssignment.css";
// import "../admin.css";

// const StaffTaskAssignment = () => {
//   const [selectedStaff, setSelectedStaff] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState("");

//   // Static staff data (replace with API fetch later)
//   const staffList = [
//     { id: "1", email: "buri@gmail.com" },
//     { id: "2", email: "alice@gmail.com" },
//     { id: "3", email: "bob@gmail.com" },
//   ];

//   const handleStaffChange = (e) => {
//     const options = Array.from(
//       e.target.selectedOptions,
//       (option) => option.value
//     );
//     setSelectedStaff(options);
//     // Initialize tasks array with empty descriptions for each selected staff
//     setTasks(options.map(() => ({ description: "" })));
//     setErrors({});
//     setSuccess("");
//   };

//   const handleTaskChange = (index, value) => {
//     const newTasks = [...tasks];
//     newTasks[index].description = value;
//     setTasks(newTasks);
//     setErrors((prev) => ({ ...prev, [`task${index}`]: "" }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (selectedStaff.length === 0) {
//       newErrors.staff = "Please select at least one staff member.";
//     }
//     tasks.forEach((task, index) => {
//       if (!task.description.trim()) {
//         newErrors[`task${index}`] = "Task description is required.";
//       }
//     });
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       const submission = selectedStaff.map((email, index) => ({
//         email,
//         task: tasks[index].description,
//       }));
//       console.log("Assigned Tasks:", submission);
//       setSuccess("Tasks assigned successfully!");
//       setSelectedStaff([]);
//       setTasks([]);
//       setErrors({});
//       // Reset form
//       e.target.reset();
//     }
//   };

//   return (
//     <div className="admin-dashboard-container">
//       <StaffSidebar />
//       <div className="admin-dashboard-main">
//         <h1 className="task-title">Assign Tasks to Staff</h1>
//         <div className="task-form-card">
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="staffSelect">Select Staff Members</label>
//               <select
//                 id="staffSelect"
//                 multiple
//                 value={selectedStaff}
//                 onChange={handleStaffChange}
//                 className={`form-select ${errors.staff ? "error" : ""}`}
//               >
//                 {staffList.map((staff) => (
//                   <option key={staff.id} value={staff.email}>
//                     {staff.email}
//                   </option>
//                 ))}
//               </select>
//               {errors.staff && <p className="form-error">{errors.staff}</p>}
//             </div>
//             {selectedStaff.length > 0 && (
//               <div className="task-descriptions">
//                 <h3>Task Descriptions</h3>
//                 {selectedStaff.map((email, index) => (
//                   <div key={index} className="form-group">
//                     <label htmlFor={`task${index}`}>Task for {email}</label>
//                     <textarea
//                       id={`task${index}`}
//                       value={tasks[index]?.description || ""}
//                       onChange={(e) => handleTaskChange(index, e.target.value)}
//                       placeholder="Enter task description..."
//                       className={`form-textarea ${
//                         errors[`task${index}`] ? "error" : ""
//                       }`}
//                     />
//                     {errors[`task${index}`] && (
//                       <p className="form-error">{errors[`task${index}`]}</p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//             <button type="submit" className="assign-button">
//               Assign Tasks
//             </button>
//             {success && <p className="form-success">{success}</p>}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffTaskAssignment;

"use client";
import React, { useState, useEffect } from "react";
import StaffSidebar from "../AdminSidebar";
import "./taskAssignment.css";
import "../admin.css";

const StaffTaskAssignment = () => {
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [staffList, setStaffList] = useState([]);

  // Fetch staff emails from API
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch("/api/admin/createstaff", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch staff");
        }
        const data = await response.json();
        setStaffList(data.staff.map((s) => ({ id: s._id, email: s.email })));
      } catch (error) {
        console.error("Error fetching staff:", error);
        setErrors({ fetch: "Failed to load staff: " + error.message });
      }
    };
    fetchStaff();
  }, []);

  const handleStaffChange = (e) => {
    const options = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedStaff(options);
    setErrors({});
    setSuccess("");
  };

  const handleTaskChange = (e) => {
    setTaskDescription(e.target.value);
    setErrors((prev) => ({ ...prev, task: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (selectedStaff.length === 0) {
      newErrors.staff = "Please select at least one staff member.";
    }
    if (!taskDescription.trim()) {
      newErrors.task = "Task description is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("/api/admin/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            staffEmails: selectedStaff,
            description: taskDescription,
          }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to assign task");
        }
        const data = await response.json();
        console.log("Task assigned:", data);
        setSuccess("Tasks assigned successfully!");
        setSelectedStaff([]);
        setTaskDescription("");
        setErrors({});
        e.target.reset();
      } catch (error) {
        console.error("Error assigning task:", error);
        setErrors({
          submit: error.message.includes("Unauthorized")
            ? "Please log in as admin"
            : "Failed to assign task: " + error.message,
        });
      }
    }
  };

  return (
    <div className="admin-dashboard-container">
      <StaffSidebar />
      <div className="admin-dashboard-main">
        <h1 className="task-title">Assign Tasks to Staff</h1>
        {errors.fetch && <p className="form-error">{errors.fetch}</p>}
        <div className="task-form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="staffSelect">Select Staff Members</label>
              <select
                id="staffSelect"
                multiple
                value={selectedStaff}
                onChange={handleStaffChange}
                className={`form-select ${errors.staff ? "error" : ""}`}
              >
                {staffList.map((staff) => (
                  <option key={staff.id} value={staff.email}>
                    {staff.email}
                  </option>
                ))}
              </select>
              {errors.staff && <p className="form-error">{errors.staff}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="taskDescription">Task Description</label>
              <textarea
                id="taskDescription"
                value={taskDescription}
                onChange={handleTaskChange}
                placeholder="Enter task description..."
                className={`form-textarea ${errors.task ? "error" : ""}`}
              />
              {errors.task && <p className="form-error">{errors.task}</p>}
            </div>
            <button type="submit" className="assign-button">
              Assign Tasks
            </button>
            {success && <p className="form-success">{success}</p>}
            {errors.submit && <p className="form-error">{errors.submit}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffTaskAssignment;
