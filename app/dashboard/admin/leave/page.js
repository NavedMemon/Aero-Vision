// "use client";
// import React, { useState, useEffect } from "react";
// import AdminSidebar from "../AdminSidebar";
// import "./adminleave.css";
// import "../admin.css";

// const AdminLeavesPage = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filter, setFilter] = useState("All");
//   const [error, setError] = useState("");
//   const leavesPerPage = 3;

//   useEffect(() => {
//     const fetchLeaves = async () => {
//       try {
//         const tokenResponse = await fetch("/api/get-token", {
//           credentials: "include",
//         });
//         if (!tokenResponse.ok) {
//           throw new Error("Not authenticated");
//         }
//         const { token, type, role } = await tokenResponse.json();
//         if (!token || (type !== "admin" && role !== "admin")) {
//           throw new Error("Unauthorized: Not an admin");
//         }

//         const response = await fetch("/api/staff/staffLeave", {
//           headers: { Authorization: `Bearer ${token}` },
//           credentials: "include",
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || "Failed to fetch leaves");
//         }
//         const data = await response.json();
//         setLeaves(Array.isArray(data) ? data : []);
//       } catch (err) {
//         setError(err.message || "Unable to load leaves");
//       }
//     };
//     fetchLeaves();
//   }, []);

//   const handleStatusUpdate = async (leaveId, status) => {
//     try {
//       const tokenResponse = await fetch("/api/get-token", {
//         credentials: "include",
//       });
//       if (!tokenResponse.ok) {
//         throw new Error("Not authenticated");
//       }
//       const { token, type, role } = await tokenResponse.json();
//       if (!token || (type !== "admin" && role !== "admin")) {
//         throw new Error("Unauthorized: Not an admin");
//       }

//       const response = await fetch(`/api/staff/staffLeave?id=${leaveId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//         body: JSON.stringify({ status }),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to update status");
//       }
//       const { leave } = await response.json();
//       setLeaves(leaves.map((l) => (l._id === leaveId ? leave : l)));
//       alert(`✅ Leave ${status.toLowerCase()}!`);
//     } catch (err) {
//       setError(err.message || "Unable to update status");
//     }
//   };

//   const calculateDuration = (leave) => {
//     const from = new Date(leave.fromDate);
//     const to = new Date(leave.toDate);
//     const diff = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
//     return diff > 0 ? `${diff} Day${diff > 1 ? "s" : ""}` : "Invalid";
//   };

//   const filteredLeaves =
//     filter === "All"
//       ? leaves
//       : leaves.filter((leave) => leave.status === filter);
//   const indexOfLast = currentPage * leavesPerPage;
//   const indexOfFirst = indexOfLast - leavesPerPage;
//   const currentLeaves = filteredLeaves.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredLeaves.length / leavesPerPage);

//   return (
//     <div className="container">
//       <AdminSidebar />
//       <div className="main">
//         <div className="content">
//           <h2 className="title">📋 Manage Leave Requests</h2>

//           {error && <p className="error">{error}</p>}

//           <div className="filter">
//             <label>Filter by Status:</label>
//             <select
//               value={filter}
//               onChange={(e) => {
//                 setFilter(e.target.value);
//                 setCurrentPage(1);
//               }}
//             >
//               <option value="All">All</option>
//               <option value="Pending">Pending</option>
//               <option value="Accepted">Accepted</option>
//               <option value="Rejected">Rejected</option>
//             </select>
//           </div>

//           <div className="leave-list">
//             {currentLeaves.length === 0 ? (
//               <p className="no-leaves">No leaves found</p>
//             ) : (
//               currentLeaves.map((leave) => (
//                 <div key={leave._id} className="leave-card">
//                   <p>
//                     <strong>Staff:</strong> {leave.staff?.name || "Unknown"} (
//                     {leave.staff?.email || "N/A"})
//                   </p>
//                   <p>
//                     <strong>From:</strong>{" "}
//                     {new Date(leave.fromDate).toLocaleDateString()}
//                   </p>
//                   <p>
//                     <strong>To:</strong>{" "}
//                     {new Date(leave.toDate).toLocaleDateString()}
//                   </p>
//                   <p>
//                     <strong>Duration:</strong> {calculateDuration(leave)}
//                   </p>
//                   <p>
//                     <strong>Description:</strong> {leave.description || "N/A"}
//                   </p>
//                   <p className={`status ${leave.status.toLowerCase()}`}>
//                     <strong>Status:</strong> {leave.status}
//                   </p>
//                   {leave.status === "Pending" && (
//                     <div className="actions">
//                       <button
//                         className="accept-btn"
//                         onClick={() =>
//                           handleStatusUpdate(leave._id, "Accepted")
//                         }
//                       >
//                         Accept
//                       </button>
//                       <button
//                         className="reject-btn"
//                         onClick={() =>
//                           handleStatusUpdate(leave._id, "Rejected")
//                         }
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>

//           <div className="pagination">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((prev) => prev - 1)}
//               className={currentPage === 1 ? "disabled" : ""}
//             >
//               Previous
//             </button>
//             <span>
//               Page {currentPage} of {totalPages || 1}
//             </span>
//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage((prev) => prev + 1)}
//               className={currentPage === totalPages ? "disabled" : ""}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLeavesPage;

"use client";
import React, { useState, useEffect } from "react";
import AdminSidebar from "../AdminSidebar";
import "./adminleave.css";
import "../admin.css";

const AdminLeavesPage = () => {
  const [leaves, setLeaves] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");
  const leavesPerPage = 3;

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const tokenResponse = await fetch("/api/get-token", {
          credentials: "include",
        });
        if (!tokenResponse.ok) {
          throw new Error("Not authenticated");
        }
        const { token, type, role } = await tokenResponse.json();
        if (!token || (type !== "admin" && role !== "admin")) {
          throw new Error("Unauthorized: Not an admin");
        }

        const response = await fetch("/api/staff/staffLeave", {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch leaves");
        }
        const data = await response.json();
        setLeaves(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Unable to load leaves");
      }
    };
    fetchLeaves();
  }, []);

  const handleStatusUpdate = async (leaveId, status) => {
    try {
      const tokenResponse = await fetch("/api/get-token", {
        credentials: "include",
      });
      if (!tokenResponse.ok) {
        throw new Error("Not authenticated");
      }
      const { token, type, role } = await tokenResponse.json();
      if (!token || (type !== "admin" && role !== "admin")) {
        throw new Error("Unauthorized: Not an admin");
      }

      const response = await fetch(`/api/staff/staffLeave?id=${leaveId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update status");
      }
      const { leave } = await response.json();
      setLeaves(leaves.map((l) => (l._id === leaveId ? leave : l)));
      alert(`✅ Leave ${status.toLowerCase()}!`);
    } catch (err) {
      setError(err.message || "Unable to update status");
    }
  };

  const calculateDuration = (leave) => {
    const from = new Date(leave.fromDate);
    const to = new Date(leave.toDate);
    const diff = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? `${diff} Day${diff > 1 ? "s" : ""}` : "Invalid";
  };

  const filteredLeaves =
    filter === "All"
      ? leaves
      : leaves.filter((leave) => leave.status === filter);
  const indexOfLast = currentPage * leavesPerPage;
  const indexOfFirst = indexOfLast - leavesPerPage;
  const currentLeaves = filteredLeaves.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredLeaves.length / leavesPerPage);

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main">
        <div className="content">
          <h2 className="title">📋 Manage Leave Requests</h2>

          {error && <p className="error">{error}</p>}

          <div className="filter">
            <label>Filter by Status:</label>
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="leave-list">
            {currentLeaves.length === 0 ? (
              <p className="no-leaves">No leaves found</p>
            ) : (
              <>
                <table className="leave-table">
                  <thead>
                    <tr>
                      <th>Staff</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Duration</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentLeaves.map((leave) => (
                      <tr key={leave._id}>
                        <td>
                          {leave.staff?.name || "Unknown"} (
                          {leave.staff?.email || "N/A"})
                        </td>
                        <td>{new Date(leave.fromDate).toLocaleDateString()}</td>
                        <td>{new Date(leave.toDate).toLocaleDateString()}</td>
                        <td>{calculateDuration(leave)}</td>
                        <td>{leave.description || "N/A"}</td>
                        <td>
                          <span
                            className={`status ${leave.status.toLowerCase()}`}
                          >
                            {leave.status}
                          </span>
                        </td>
                        <td>
                          {leave.status === "Pending" && (
                            <div className="actions">
                              <button
                                className="accept-btn"
                                onClick={() =>
                                  handleStatusUpdate(leave._id, "Accepted")
                                }
                              >
                                Accept
                              </button>
                              <button
                                className="reject-btn"
                                onClick={() =>
                                  handleStatusUpdate(leave._id, "Rejected")
                                }
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* <div className="leave-card-list">
                  {currentLeaves.map((leave) => (
                    <div key={leave._id} className="leave-card">
                      <p>
                        <strong>Staff:</strong> {leave.staff?.name || "Unknown"}{" "}
                        ({leave.staff?.email || "N/A"})
                      </p>
                      <p>
                        <strong>From:</strong>{" "}
                        {new Date(leave.fromDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>To:</strong>{" "}
                        {new Date(leave.toDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Duration:</strong> {calculateDuration(leave)}
                      </p>
                      <p>
                        <strong>Description:</strong>{" "}
                        {leave.description || "N/A"}
                      </p>
                      <p className={`status ${leave.status.toLowerCase()}`}>
                        <strong>Status:</strong> {leave.status}
                      </p>
                      {leave.status === "Pending" && (
                        <div className="actions">
                          <button
                            className="accept-btn"
                            onClick={() =>
                              handleStatusUpdate(leave._id, "Accepted")
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="reject-btn"
                            onClick={() =>
                              handleStatusUpdate(leave._id, "Rejected")
                            }
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div> */}
              </>
            )}
          </div>

          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={currentPage === 1 ? "disabled" : ""}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={currentPage === totalPages ? "disabled" : ""}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLeavesPage;
