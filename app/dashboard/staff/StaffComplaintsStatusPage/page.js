// "use client";
// import React from "react";
// import StaffSidebar from "../StaffSideBar";
// import "./staffComplaintsStatus.css";

// const complaints = [
//   {
//     id: 1,
//     subject: "System not responding",
//     category: "Technical",
//     status: "Pending",
//     submittedAt: "2025-07-10 11:30 AM",
//   },
//   {
//     id: 2,
//     subject: "Gate assignment missing",
//     category: "Operations",
//     status: "In Progress",
//     submittedAt: "2025-07-09 04:15 PM",
//   },
//   {
//     id: 3,
//     subject: "Schedule conflict",
//     category: "HR",
//     status: "Resolved",
//     submittedAt: "2025-07-08 09:45 AM",
//   },
// ];

// const StaffComplaintStatus = () => {
//   return (
//     <div className="staff-dashboard-wrapper">
//       <StaffSidebar />
//       <div className="complaint-status-container">
//         <h2 className="complaint-status-title">📋 Your Complaints & Status</h2>
//         <div className="complaint-table">
//           <div className="table-header">
//             <div>Sr No</div>
//             <div>Subject</div>
//             <div>Category</div>
//             <div>Status</div>
//             <div>Submitted At</div>
//           </div>
//           {complaints.map((c, i) => (
//             <div key={c.id} className="table-row">
//               <div>{i + 1}</div>
//               <div>{c.subject}</div>
//               <div>{c.category}</div>
//               <div>
//                 <span
//                   className={`status-badge ${c.status
//                     .toLowerCase()
//                     .replace(/\s/g, "-")}`}
//                 >
//                   {c.status}
//                 </span>
//               </div>
//               <div>{c.submittedAt}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffComplaintStatus;

// "use client";
// import React, { useState, useEffect } from "react";
// import StaffSidebar from "../StaffSideBar";
// import "./staffComplaintsStatus.css";
// import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

// const StaffComplaintStatus = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         setLoading(true);
//         const tokenResponse = await fetch("/api/get-token", {
//           method: "GET",
//           credentials: "include",
//         });
//         if (!tokenResponse.ok) {
//           const errData = await tokenResponse.json();
//           throw new Error(errData.error || "Failed to fetch token");
//         }
//         const { token } = await tokenResponse.json();
//         if (!token) throw new Error("No token received");

//         console.log("Fetching with token:", token);

//         const response = await fetch("/api/staff/complaints", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           credentials: "include",
//         });
//         if (!response.ok) {
//           const data = await response.json();
//           throw new Error(data.error || "Failed to fetch complaints");
//         }
//         const data = await response.json();
//         setComplaints(data.complaints);
//       } catch (err) {
//         setError(err.message || "Unable to load complaints");
//         console.error("Fetch complaints error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchComplaints();
//   }, []);

//   return (
//     <div className="staff-dashboard-wrapper">
//       <StaffSidebar />
//       <div className="complaint-status-container">
//         <h2 className="complaint-status-title">📋 Your Complaints & Status</h2>
//         {loading ? (
//           <p className="loading-text">Loading complaints...</p>
//         ) : error ? (
//           <p className="error-text">{error}</p>
//         ) : complaints.length === 0 ? (
//           <p className="no-complaints">No complaints found.</p>
//         ) : (
//           <div className="complaint-table">
//             <div className="table-header">
//               <div>Sr No</div>
//               <div>Subject</div>
//               <div>Category</div>
//               <div>Priority</div>
//               <div>Status</div>
//               <div>Submitted At</div>
//             </div>
//             {complaints.map((c, i) => (
//               <div key={c._id} className="table-row">
//                 <div>{i + 1}</div>
//                 <div>{c.title}</div>
//                 <div>{c.category || "N/A"}</div>
//                 <div>
//                   <span
//                     className={`priority-badge ${c.priority.toLowerCase()}`}
//                   >
//                     {c.priority}
//                   </span>
//                 </div>
//                 <div>
//                   <span
//                     className={`status-badge ${c.status
//                       .toLowerCase()
//                       .replace(/\s/g, "-")}`}
//                   >
//                     {c.status === "Resolved" && <FaCheckCircle />}
//                     {c.status === "Pending" && <FaClock />}
//                     {c.status === "In Progress" && <FaClock />}
//                     {c.status === "Cancelled" && <FaTimesCircle />}
//                     {c.status}
//                   </span>
//                 </div>
//                 <div>{new Date(c.submittedAt).toLocaleString()}</div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StaffComplaintStatus;

"use client";
import React, { useState, useEffect } from "react";
import StaffSidebar from "../StaffSideBar";
import "./staffComplaintsStatus.css";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const StaffComplaintStatus = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const tokenResponse = await fetch("/api/get-token", {
          method: "GET",
          credentials: "include",
        });
        if (!tokenResponse.ok) {
          const errData = await tokenResponse.json();
          throw new Error(errData.error || "Failed to fetch token");
        }
        const { token } = await tokenResponse.json();
        if (!token) throw new Error("No token received");

        console.log("Fetching with token:", token);

        const response = await fetch("/api/staff/complaints", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to fetch complaints");
        }
        const data = await response.json();
        setComplaints(data.complaints);
      } catch (err) {
        setError(err.message || "Unable to load complaints");
        console.error("Fetch complaints error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="staff-dashboard-wrapper">
      <StaffSidebar />
      <div className="complaint-status-container">
        <h2 className="complaint-status-title">📋 Your Complaints & Status</h2>
        {loading ? (
          <p className="loading-text">Loading complaints...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : complaints.length === 0 ? (
          <p className="no-complaints">No complaints found.</p>
        ) : (
          <div className="complaint-table">
            <div className="table-header">
              <div>Sr No</div>
              <div>Subject</div>
              <div>Category</div>
              <div>Priority</div>
              <div>Status</div>
              <div>Submitted At</div>
            </div>
            {complaints.map((c, i) => (
              <div key={c._id} className="table-row">
                <div>{i + 1}</div>
                <div>{c.title}</div>
                <div>{c.category || "N/A"}</div>
                <div>
                  <span
                    className={`priority-badge ${c.priority.toLowerCase()}`}
                  >
                    {c.priority}
                  </span>
                </div>
                <div>
                  <span
                    className={`status-badge ${c.status
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    {c.status === "Resolved" && <FaCheckCircle />}
                    {c.status === "Pending" && <FaClock />}
                    {c.status === "In Progress" && <FaExclamationCircle />}
                    {c.status === "Cancelled" && <FaTimesCircle />}
                    {c.status}
                  </span>
                </div>
                <div>{new Date(c.submittedAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffComplaintStatus;
