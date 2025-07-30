// "use client";
// import React, { useState } from "react";
// import StaffSidebar from "../StaffSideBar";
// import "./staffleave.css";

// const LeaveRequestPage = () => {
//   const [form, setForm] = useState({
//     fromDate: "",
//     toDate: "",
//     description: "",
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const leavesPerPage = 3;

//   const pastLeaves = [
//     {
//       date: "2025-07-01",
//       duration: "2 Days",
//       description: "Family function",
//       status: "Accepted",
//     },
//     {
//       date: "2025-06-18",
//       duration: "1 Day",
//       description: "Medical leave",
//       status: "Pending",
//     },
//     {
//       date: "2025-06-10",
//       duration: "3 Days",
//       description: "Personal reasons",
//       status: "Rejected",
//     },
//     {
//       date: "2025-06-01",
//       duration: "1 Day",
//       description: "Festival leave",
//       status: "Accepted",
//     },
//     {
//       date: "2025-05-20",
//       duration: "2 Days",
//       description: "Function at home",
//       status: "Accepted",
//     },
//   ];

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const calculateDuration = () => {
//     const from = new Date(form.fromDate);
//     const to = new Date(form.toDate);
//     const diff = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
//     return diff > 0 ? `${diff} Day${diff > 1 ? "s" : ""}` : "";
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const duration = calculateDuration();
//     if (!duration) return alert("❌ Enter valid dates");

//     alert(`✅ Leave for ${duration} submitted!`);
//     setForm({ fromDate: "", toDate: "", description: "" });
//   };

//   // Pagination Logic
//   const indexOfLast = currentPage * leavesPerPage;
//   const indexOfFirst = indexOfLast - leavesPerPage;
//   const currentLeaves = pastLeaves.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(pastLeaves.length / leavesPerPage);

//   return (
//     <div className="staff-leave-page">
//       <StaffSidebar />
//       <div className="leave-main">
//         <h2 className="leave-title">📝 Leave Request</h2>

//         <form className="leave-form" onSubmit={handleSubmit}>
//           <div className="form-group-row">
//             <div className="form-group">
//               <label>From</label>
//               <input
//                 type="date"
//                 name="fromDate"
//                 value={form.fromDate}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>To</label>
//               <input
//                 type="date"
//                 name="toDate"
//                 value={form.toDate}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Description</label>
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               placeholder="Reason for leave"
//               rows={4}
//               required
//             ></textarea>
//           </div>

//           <button type="submit" className="submit-btn">
//             📤 Send Request
//           </button>
//         </form>

//         <h3 className="past-title">📂 Past Leave Requests</h3>
//         <div className="leave-history">
//           {currentLeaves.map((leave, index) => (
//             <div className="leave-card" key={index}>
//               <p>
//                 <strong>Date:</strong> {leave.date}
//               </p>
//               <p>
//                 <strong>Duration:</strong> {leave.duration}
//               </p>
//               <p>
//                 <strong>Description:</strong> {leave.description}
//               </p>
//               <p className={`status ${leave.status.toLowerCase()}`}>
//                 <strong>Status:</strong> {leave.status}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="pagination-controls">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//           >
//             ⬅️ Previous
//           </button>
//           <span>
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//           >
//             Next ➡️
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeaveRequestPage;

"use client";
import React, { useState, useEffect } from "react";
import StaffSidebar from "../StaffSideBar";
import "./staffleave.css";

const LeaveRequestPage = () => {
  const [form, setForm] = useState({
    fromDate: "",
    toDate: "",
    description: "",
  });
  const [leaves, setLeaves] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const leavesPerPage = 3;

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const tokenResponse = await fetch("/api/get-token", {
          credentials: "include",
        });
        if (!tokenResponse.ok) {
          const errorText = await tokenResponse.text();
          console.error("Token fetch failed:", tokenResponse.status, errorText);
          throw new Error("Not authenticated");
        }
        const { token, role } = await tokenResponse.json();
        console.log("Token fetched:", token, "Role:", role);
        if (!token || role !== "staff")
          throw new Error("Unauthorized: Not a staff member");

        const response = await fetch("/api/staff/staffLeave", {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Fetch leaves failed:", response.status, errorText);
          throw new Error(errorText || "Failed to fetch leaves");
        }
        const data = await response.json();
        console.log("Leaves fetched:", data);
        setLeaves(data);
      } catch (err) {
        console.error("Error in fetchLeaves:", err.message);
        setError(err.message || "Unable to load leaves");
      }
    };
    fetchLeaves();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateDuration = (leave = form) => {
    const from = new Date(leave.fromDate);
    const to = new Date(leave.toDate);
    const diff = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? `${diff} Day${diff > 1 ? "s" : ""}` : "";
  };

  const validateDates = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const from = new Date(form.fromDate);
    const to = new Date(form.toDate);

    if (form.fromDate && from < today) return "From date cannot be in the past";
    if (form.toDate && to < today) return "To date cannot be in the past";
    if (form.fromDate && form.toDate && to < from)
      return "To date cannot be before from date";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const duration = calculateDuration();
    if (!duration) {
      setError("Enter valid dates");
      return;
    }

    const dateError = validateDates();
    if (dateError) {
      setError(dateError);
      return;
    }

    try {
      const tokenResponse = await fetch("/api/get-token", {
        credentials: "include",
      });
      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.error("Token fetch failed:", tokenResponse.status, errorText);
        throw new Error("Not authenticated");
      }
      const { token, role } = await tokenResponse.json();
      console.log("Token for submit:", token, "Role:", role);
      if (!token || role !== "staff")
        throw new Error("Unauthorized: Not a staff member");

      const response = await fetch("/api/staff/staffLeave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Submit leave failed:", response.status, errorText);
        throw new Error(errorText || "Failed to submit leave");
      }
      const { leave } = await response.json();
      console.log("Leave submitted:", leave);
      setLeaves([leave, ...leaves]);
      alert(`✅ Leave for ${duration} submitted!`);
      setForm({ fromDate: "", toDate: "", description: "" });
    } catch (err) {
      console.error("Error in handleSubmit:", err.message);
      setError(err.message || "Unable to submit leave");
    }
  };

  // Pagination Logic
  const indexOfLast = currentPage * leavesPerPage;
  const indexOfFirst = indexOfLast - leavesPerPage;
  const currentLeaves = leaves.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(leaves.length / leavesPerPage);

  return (
    <div className="staff-leave-page">
      <StaffSidebar />
      <div className="leave-main">
        <h2 className="leave-title">📝 Leave Request</h2>

        {error && <p className="error-text">{error}</p>}

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
                <strong>Date:</strong>{" "}
                {new Date(leave.fromDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Duration:</strong> {calculateDuration(leave)}
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

// "use client";
// import React, { useState, useEffect } from "react";
// import StaffSidebar from "../StaffSideBar";
// import "./staffleave.css";

// const LeaveRequestPage = () => {
//   const [form, setForm] = useState({
//     fromDate: "",
//     toDate: "",
//     description: "",
//   });
//   const [leaves, setLeaves] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [error, setError] = useState("");
//   const leavesPerPage = 3;

//   useEffect(() => {
//     const fetchLeaves = async () => {
//       try {
//         const tokenResponse = await fetch("/api/get-token", {
//           credentials: "include",
//         });
//         if (!tokenResponse.ok) {
//           const errorText = await tokenResponse.text();
//           console.error("Token fetch failed:", tokenResponse.status, errorText);
//           throw new Error("Not authenticated");
//         }
//         const { token, role } = await tokenResponse.json();
//         console.log("Token fetched:", token, "Role:", role);
//         if (!token || role !== "staff")
//           throw new Error("Unauthorized: Not a staff member");

//         const response = await fetch("/api/leave", {
//           headers: { Authorization: `Bearer ${token}` },
//           credentials: "include",
//         });
//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error("Fetch leaves failed:", response.status, errorText);
//           throw new Error(errorText || "Failed to fetch leaves");
//         }
//         const data = await response.json();
//         console.log("Leaves fetched:", data);
//         setLeaves(data);
//       } catch (err) {
//         console.error("Error in fetchLeaves:", err.message);
//         setError(err.message || "Unable to load leaves");
//       }
//     };
//     fetchLeaves();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const calculateDuration = (leave = form) => {
//     const from = new Date(leave.fromDate);
//     const to = new Date(leave.toDate);
//     const diff = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
//     return diff > 0 ? `${diff} Day${diff > 1 ? "s" : ""}` : "";
//   };

//   const validateDates = () => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const from = new Date(form.fromDate);
//     const to = new Date(form.toDate);

//     if (form.fromDate && from < today) return "From date cannot be in the past";
//     if (form.toDate && to < today) return "To date cannot be in the past";
//     if (form.fromDate && form.toDate && to < from)
//       return "To date cannot be before from date";
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     const duration = calculateDuration();
//     if (!duration) {
//       setError("Enter valid dates");
//       return;
//     }

//     const dateError = validateDates();
//     if (dateError) {
//       setError(dateError);
//       return;
//     }

//     try {
//       const tokenResponse = await fetch("/api/get-token", {
//         credentials: "include",
//       });
//       if (!tokenResponse.ok) {
//         const errorText = await tokenResponse.text();
//         console.error("Token fetch failed:", tokenResponse.status, errorText);
//         throw new Error("Not authenticated");
//       }
//       const { token, role } = await tokenResponse.json();
//       console.log("Token for submit:", token, "Role:", role);
//       if (!token || role !== "staff")
//         throw new Error("Unauthorized: Not a staff member");

//       const response = await fetch("/api/leave", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//         body: JSON.stringify(form),
//       });
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("Submit leave failed:", response.status, errorText);
//         throw new Error(errorText || "Failed to submit leave");
//       }
//       const { leave } = await response.json();
//       console.log("Leave submitted:", leave);
//       setLeaves([leave, ...leaves]);
//       alert(`✅ Leave for ${duration} submitted!`);
//       setForm({ fromDate: "", toDate: "", description: "" });
//     } catch (err) {
//       console.error("Error in handleSubmit:", err.message);
//       setError(err.message || "Unable to submit leave");
//     }
//   };

//   // Pagination Logic
//   const indexOfLast = currentPage * leavesPerPage;
//   const indexOfFirst = indexOfLast - leavesPerPage;
//   const currentLeaves = leaves.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(leaves.length / leavesPerPage);

//   return (
//     <div className="staff-leave-page">
//       <StaffSidebar />
//       <div className="leave-main">
//         <h2 className="leave-title">📝 Leave Request</h2>

//         {error && <p className="error-text">{error}</p>}

//         <form className="leave-form" onSubmit={handleSubmit}>
//           <div className="form-group-row">
//             <div className="form-group">
//               <label>From</label>
//               <input
//                 type="date"
//                 name="fromDate"
//                 value={form.fromDate}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>To</label>
//               <input
//                 type="date"
//                 name="toDate"
//                 value={form.toDate}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Description</label>
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               placeholder="Reason for leave"
//               rows={4}
//               required
//             ></textarea>
//           </div>

//           <button type="submit" className="submit-btn">
//             📤 Send Request
//           </button>
//         </form>

//         <h3 className="past-title">📂 Past Leave Requests</h3>
//         <div className="leave-history">
//           {currentLeaves.map((leave, index) => (
//             <div className="leave-card" key={index}>
//               <p>
//                 <strong>Date:</strong>{" "}
//                 {new Date(leave.fromDate).toLocaleDateString()}
//               </p>
//               <p>
//                 <strong>Duration:</strong> {calculateDuration(leave)}
//               </p>
//               <p>
//                 <strong>Description:</strong> {leave.description}
//               </p>
//               <p className={`status ${leave.status.toLowerCase()}`}>
//                 <strong>Status:</strong> {leave.status}
//               </p>
//             </div>
//           ))}
//         </div>

//         <div className="pagination-controls">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//           >
//             ⬅️ Previous
//           </button>
//           <span>
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//           >
//             Next ➡️
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeaveRequestPage;
