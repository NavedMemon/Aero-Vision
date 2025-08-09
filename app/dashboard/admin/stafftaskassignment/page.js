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

// "use client";
// import React, { useState, useEffect } from "react";
// import StaffSidebar from "../AdminSidebar";
// import "./taskAssignment.css";
// import "../admin.css";

// const StaffTaskAssignment = () => {
//   const [selectedStaff, setSelectedStaff] = useState([]);
//   const [taskDescription, setTaskDescription] = useState("");
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState("");
//   const [staffList, setStaffList] = useState([]);

//   // Fetch staff emails from API
//   useEffect(() => {
//     const fetchStaff = async () => {
//       try {
//         const response = await fetch("/api/admin/createstaff", {
//           credentials: "include",
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch staff");
//         }
//         const data = await response.json();
//         setStaffList(data.staff.map((s) => ({ id: s._id, email: s.email })));
//       } catch (error) {
//         console.error("Error fetching staff:", error);
//         setErrors({ fetch: "Failed to load staff: " + error.message });
//       }
//     };
//     fetchStaff();
//   }, []);

//   const handleStaffChange = (e) => {
//     const options = Array.from(
//       e.target.selectedOptions,
//       (option) => option.value
//     );
//     setSelectedStaff(options);
//     setErrors({});
//     setSuccess("");
//   };

//   const handleTaskChange = (e) => {
//     setTaskDescription(e.target.value);
//     setErrors((prev) => ({ ...prev, task: "" }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (selectedStaff.length === 0) {
//       newErrors.staff = "Please select at least one staff member.";
//     }
//     if (!taskDescription.trim()) {
//       newErrors.task = "Task description is required.";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         const response = await fetch("/api/admin/tasks", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify({
//             staffEmails: selectedStaff,
//             description: taskDescription,
//           }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || "Failed to assign task");
//         }
//         const data = await response.json();
//         console.log("Task assigned:", data);
//         setSuccess("Tasks assigned successfully!");
//         setSelectedStaff([]);
//         setTaskDescription("");
//         setErrors({});
//         e.target.reset();
//       } catch (error) {
//         console.error("Error assigning task:", error);
//         setErrors({
//           submit: error.message.includes("Unauthorized")
//             ? "Please log in as admin"
//             : "Failed to assign task: " + error.message,
//         });
//       }
//     }
//   };

//   return (
//     <div className="admin-dashboard-container">
//       <StaffSidebar />
//       <div className="admin-dashboard-main">
//         <h1 className="task-title">Assign Tasks to Staff</h1>
//         {errors.fetch && <p className="form-error">{errors.fetch}</p>}
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
//             <div className="form-group">
//               <label htmlFor="taskDescription">Task Description</label>
//               <textarea
//                 id="taskDescription"
//                 value={taskDescription}
//                 onChange={handleTaskChange}
//                 placeholder="Enter task description..."
//                 className={`form-textarea ${errors.task ? "error" : ""}`}
//               />
//               {errors.task && <p className="form-error">{errors.task}</p>}
//             </div>
//             <button type="submit" className="assign-button">
//               Assign Tasks
//             </button>
//             {success && <p className="form-success">{success}</p>}
//             {errors.submit && <p className="form-error">{errors.submit}</p>}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffTaskAssignment;

"use client";
import React, { useState } from "react";
import StaffSidebar from "../AdminSidebar";
import "./taskAssignment.css";
import "../admin.css";

const StaffTaskAssignment = () => {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [title, setTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const departments = ["Ground Staff", "Security", "Maintenance", "Other"];

  const handleDepartmentChange = (e) => {
    const options = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedDepartments(options);
    setErrors((prev) => ({ ...prev, departments: "" }));
    setSuccess("");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setErrors((prev) => ({ ...prev, title: "" }));
  };

  const handleTaskChange = (e) => {
    setTaskDescription(e.target.value);
    setErrors((prev) => ({ ...prev, task: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (selectedDepartments.length === 0) {
      newErrors.departments = "Please select at least one department.";
    }
    if (!title.trim()) {
      newErrors.title = "Task title is required.";
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
        let allSuccessful = true;
        const failedDepartments = [];

        // Send a POST request for each selected department
        for (const dept of selectedDepartments) {
          const response = await fetch("/api/admin/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              department: dept, // Send as "department" (singular)
              title,
              description: taskDescription,
            }),
          });

          if (!response.ok) {
            allSuccessful = false;
            const errorData = await response.json();
            failedDepartments.push(
              `${dept}: ${errorData.error || "Failed to assign task"}`
            );
            continue;
          }

          const data = await response.json();
          console.log(`Task assigned for ${dept}:`, data);
        }

        if (allSuccessful) {
          setSuccess("Tasks assigned successfully to all departments!");
          setSelectedDepartments([]);
          setTitle("");
          setTaskDescription("");
          setErrors({});
          e.target.reset();
        } else {
          setErrors({
            submit: `Failed to assign tasks for: ${failedDepartments.join(
              ", "
            )}`,
          });
        }
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
        <h1 className="task-title">Assign Tasks to Team Leaders</h1>
        <div className="task-form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Task Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter task title..."
                className={`form-input ${errors.title ? "error" : ""}`}
              />
              {errors.title && <p className="form-error">{errors.title}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="departmentSelect">Select Departments</label>
              <select
                id="departmentSelect"
                multiple
                value={selectedDepartments}
                onChange={handleDepartmentChange}
                className={`form-select ${errors.departments ? "error" : ""}`}
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {errors.departments && (
                <p className="form-error">{errors.departments}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="taskDescription" className="text-blue-700">
                Task Description
              </label>
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
