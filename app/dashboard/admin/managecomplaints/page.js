// "use client";
// import React, { useState, useEffect } from "react";
// import AdminSidebar from "../AdminSidebar";
// import "../admin.css";
// import "./managecomplaints.css";
// import { FaEye, FaTrash, FaEdit, FaTimes } from "react-icons/fa";

// const mockComplaints = new Array(12).fill(0).map((_, i) => ({
//   id: i,
//   name: `User${i + 1}`,
//   title: `Complaint ${i + 1}`,
//   description: `This is a sample complaint description for issue ${i + 1}.`,
//   status: i % 3 === 0 ? "Pending" : i % 3 === 1 ? "Resolved" : "Cancelled",
// }));

// const ManageComplaintsPage = () => {
//   const [hasMounted, setHasMounted] = useState(false);
//   const [complaints, setComplaints] = useState(mockComplaints);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editComplaint, setEditComplaint] = useState(null);
//   const complaintsPerPage = 8;

//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter]);

//   if (!hasMounted) return null;

//   const uniqueStatuses = ["All", ...new Set(mockComplaints.map((complaint) => complaint.status))];

//   const filteredComplaints = complaints.filter((complaint) => {
//     const matchesSearch =
//       complaint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       complaint.title.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatusFilter =
//       statusFilter === "All" || complaint.status.toLowerCase() === statusFilter.toLowerCase();
//     return matchesSearch && matchesStatusFilter;
//   });

//   const totalPages = Math.max(1, Math.ceil(filteredComplaints.length / complaintsPerPage));

//   const paginated = filteredComplaints.slice(
//     (currentPage - 1) * complaintsPerPage,
//     currentPage * complaintsPerPage
//   );

//   const handleViewDetails = (complaint) => {
//     setSelectedComplaint(complaint);
//     setIsEditing(false);
//   };

//   const handleEditComplaint = (complaint) => {
//     setEditComplaint({ ...complaint });
//     setIsEditing(true);
//   };

//   const handleEditSubmit = (e) => {
//     e.preventDefault();
//     if (!editComplaint.name.trim()) {
//       alert("Complaint Name cannot be empty.");
//       return;
//     }
//     if (!editComplaint.title.trim()) {
//       alert("Complaint Title cannot be empty.");
//       return;
//     }
//     setComplaints(
//       complaints.map((complaint) =>
//         complaint.id === editComplaint.id ? { ...editComplaint } : complaint
//       )
//     );
//     setIsEditing(false);
//     setSelectedComplaint(null);
//   };

//   const handleEditInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditComplaint({ ...editComplaint, [name]: value });
//   };

//   const handleStatusChange = (id, newStatus) => {
//     setComplaints(
//       complaints.map((complaint) =>
//         complaint.id === id ? { ...complaint, status: newStatus } : complaint
//       )
//     );
//   };

//   const handleDeleteComplaint = (id) => {
//     if (confirm("Are you sure you want to delete this complaint?")) {
//       setComplaints(complaints.filter((complaint) => complaint.id !== id));
//       if (selectedComplaint?.id === id) {
//         setSelectedComplaint(null);
//       }
//     }
//   };

//   const handleExportComplaints = () => {
//     if (filteredComplaints.length === 0) {
//       alert("No complaints to export.");
//       return;
//     }
//     const csvContent = [
//       "Name,Title,Description,Status",
//       ...filteredComplaints.map((complaint) =>
//         [
//           `"${complaint.name.replace(/"/g, '""')}"`,
//           `"${complaint.title.replace(/"/g, '""')}"`,
//           `"${complaint.description.replace(/"/g, '""')}"`,
//           complaint.status,
//         ].join(",")
//       ),
//     ].join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = `complaints_${new Date().toISOString()}.csv`;
//     link.click();
//     URL.revokeObjectURL(link.href);
//   };

//   const closeModal = () => {
//     setSelectedComplaint(null);
//     setIsEditing(false);
//     setEditComplaint(null);
//   };

//   return (
//     <div className="admin-dashboard-new-container">
//       <AdminSidebar />
//       <div className="admin-dashboard-main-bright">
//         <h1 className="admin-complaint-title">📋 Manage Complaints</h1>

//         <div className="admin-complaint-controls">
//           <input
//             type="text"
//             placeholder="Search complaints..."
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
//           <button className="admin-export-button" onClick={handleExportComplaints}>
//             Export Complaints
//           </button>
//         </div>

//         {paginated.length === 0 ? (
//           <p className="admin-no-complaints">No complaints found.</p>
//         ) : (
//           <div className="admin-complaint-table-container">
//             <table className="admin-complaint-table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Title</th>
//                   <th>Description</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginated.map((complaint) => (
//                   <tr key={complaint.id}>
//                     <td>{complaint.name}</td>
//                     <td>{complaint.title}</td>
//                     <td>{complaint.description}</td>
//                     <td>
//                       <select
//                         className={`admin-status-select admin-status-${complaint.status.toLowerCase()}`}
//                         value={complaint.status}
//                         onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
//                         aria-label={`Change status for ${complaint.title}`}
//                       >
//                         <option value="Pending">Pending</option>
//                         <option value="Resolved">Resolved</option>
//                         <option value="Cancelled">Cancelled</option>
//                       </select>
//                     </td>
//                     <td>
//                       <div className="admin-complaint-actions">
//                         <button
//                           className="admin-view-button"
//                           onClick={() => handleViewDetails(complaint)}
//                           aria-label={`View details for ${complaint.title}`}
//                         >
//                           <FaEye />
//                         </button>
//                         <button
//                           className="admin-delete-button"
//                           onClick={() => handleDeleteComplaint(complaint.id)}
//                           aria-label={`Delete ${complaint.title}`}
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

//         {selectedComplaint && (
//           <div className="admin-complaint-modal-overlay" onClick={closeModal}>
//             <div
//               className="admin-complaint-modal"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 className="admin-modal-close"
//                 onClick={closeModal}
//                 aria-label="Close modal"
//               >
//                 <FaTimes />
//               </button>
//               {isEditing ? (
//                 <form onSubmit={handleEditSubmit} className="admin-complaint-form">
//                   <h3>Edit Complaint</h3>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Complaint Name"
//                     value={editComplaint.name}
//                     onChange={handleEditInputChange}
//                     required
//                   />
//                   <input
//                     type="text"
//                     name="title"
//                     placeholder="Complaint Title"
//                     value={editComplaint.title}
//                     onChange={handleEditInputChange}
//                     required
//                   />
//                   <textarea
//                     name="description"
//                     placeholder="Complaint Description"
//                     value={editComplaint.description}
//                     onChange={handleEditInputChange}
//                     required
//                   />
//                   <select
//                     name="status"
//                     value={editComplaint.status}
//                     onChange={handleEditInputChange}
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Resolved">Resolved</option>
//                     <option value="Cancelled">Cancelled</option>
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
//                   <h3>Complaint Details</h3>
//                   <p><strong>Name:</strong> {selectedComplaint.name}</p>
//                   <p><strong>Title:</strong> {selectedComplaint.title}</p>
//                   <p><strong>Description:</strong> {selectedComplaint.description}</p>
//                   <p><strong>Status:</strong> {selectedComplaint.status}</p>
//                   <button
//                     className="admin-edit-button"
//                     onClick={() => handleEditComplaint(selectedComplaint)}
//                     aria-label={`Edit ${selectedComplaint.title}`}
//                   >
//                     <FaEdit /> Edit Complaint
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         )}

//         <div className="admin-complaint-pagination">
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

// export default ManageComplaintsPage;

"use client";
import React, { useState, useEffect, useRef } from "react";
import AdminSidebar from "../AdminSidebar";
import "../admin.css";
import "./managecomplaints.css";
import { FaEye, FaTrash, FaEdit, FaTimes, FaFilePdf } from "react-icons/fa";
import html2pdf from "html2pdf.js";

const ManageComplaintsPage = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editComplaint, setEditComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const complaintsPerPage = 8;
  const tableRef = useRef(null);

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

        const response = await fetch("/api/admin/managecomplaints", {
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
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter]);

  if (!hasMounted) return null;

  const uniqueStatuses = [
    "All",
    ...new Set(complaints.map((complaint) => complaint.status)),
  ];

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatusFilter =
      statusFilter === "All" ||
      complaint.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesTypeFilter =
      typeFilter === "All" ||
      complaint.type.toLowerCase() === typeFilter.toLowerCase();
    return matchesSearch && matchesStatusFilter && matchesTypeFilter;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredComplaints.length / complaintsPerPage)
  );

  const paginated = filteredComplaints.slice(
    (currentPage - 1) * complaintsPerPage,
    currentPage * complaintsPerPage
  );

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setIsEditing(false);
  };

  const handleEditComplaint = (complaint) => {
    setEditComplaint({ _id: complaint._id, status: complaint.status });
    setIsEditing(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editComplaint.status) {
      alert("Status is required.");
      return;
    }

    try {
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

      const response = await fetch("/api/admin/managecomplaints", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          _id: editComplaint._id,
          status: editComplaint.status,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update complaint");
      }

      const data = await response.json();
      setComplaints(
        complaints.map((complaint) =>
          complaint._id === data.complaint._id ? data.complaint : complaint
        )
      );
      setIsEditing(false);
      setSelectedComplaint(null);
      alert("✅ Complaint status updated successfully!");
    } catch (err) {
      setError(err.message || "Unable to update complaint");
      console.error("Update complaint error:", err);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditComplaint({ ...editComplaint, [name]: value });
  };

  const handleDeleteComplaint = async (complaintId) => {
    if (confirm("Are you sure you want to delete this complaint?")) {
      try {
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

        const response = await fetch("/api/admin/managecomplaints", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ id: complaintId }),
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to delete complaint");
        }

        setComplaints(
          complaints.filter((complaint) => complaint._id !== complaintId)
        );
        if (selectedComplaint?._id === complaintId) {
          setSelectedComplaint(null);
        }
        alert("✅ Complaint deleted successfully!");
      } catch (err) {
        setError(err.message || "Unable to delete complaint");
        console.error("Delete complaint error:", err);
      }
    }
  };

  const handleExportComplaints = () => {
    if (filteredComplaints.length === 0) {
      alert("No complaints to export.");
      return;
    }
    try {
      const csvContent = [
        "Type,Email,Name,Title,Category,Description,Status,Priority,Submitted At",
        ...filteredComplaints.map((complaint) => {
          const name =
            complaint.type === "passenger"
              ? complaint.name || "N/A"
              : complaint.id?.name || "N/A";
          return [
            complaint.type || "N/A",
            `"${(complaint.id?.email || "N/A").replace(/"/g, '""')}"`,
            `"${name.replace(/"/g, '""')}"`,
            `"${(complaint.title || "N/A").replace(/"/g, '""')}"`,
            `"${(complaint.category || "N/A").replace(/"/g, '""')}"`,
            `"${(complaint.description || "N/A").replace(/"/g, '""')}"`,
            complaint.status || "N/A",
            complaint.priority || "N/A",
            complaint.submittedAt
              ? new Date(complaint.submittedAt).toISOString()
              : "N/A",
          ].join(",");
        }),
      ].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `complaints_${new Date().toISOString()}.csv`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("CSV export error:", err);
      alert("Failed to export CSV. Please try again.");
    }
  };

  const handleExportPDF = () => {
    if (filteredComplaints.length === 0) {
      alert("No complaints to export.");
      return;
    }
    try {
      const element = tableRef.current;
      const opt = {
        margin: 0.5,
        filename: `complaints_report_${new Date().toISOString()}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      };
      html2pdf().from(element).set(opt).save();
    } catch (err) {
      console.error("PDF export error:", err);
      alert("Failed to export PDF. Please try again.");
    }
  };

  const closeModal = () => {
    setSelectedComplaint(null);
    setIsEditing(false);
    setEditComplaint(null);
  };

  return (
    <div className="admin-dashboard-new-container">
      <AdminSidebar />
      <div className="admin-dashboard-main-bright">
        <h1 className="admin-complaint-title">📋 Manage Complaints</h1>

        {loading ? (
          <p className="loading-text">Loading complaints...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            <div className="admin-complaint-controls">
              <input
                type="text"
                placeholder="Search complaints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="passenger">Passenger</option>
                <option value="staff">Staff</option>
              </select>
              <button
                className="admin-export-button"
                onClick={handleExportComplaints}
              >
                Export CSV
              </button>
              <button className="admin-export-button" onClick={handleExportPDF}>
                <FaFilePdf /> Export PDF
              </button>
            </div>

            {paginated.length === 0 ? (
              <p className="admin-no-complaints">No complaints found.</p>
            ) : (
              <div className="admin-complaint-table-container" ref={tableRef}>
                <table className="admin-complaint-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((complaint) => (
                      <tr key={complaint._id}>
                        <td>{complaint.type}</td>
                        <td>{complaint.id?.email || "N/A"}</td>
                        <td>
                          {complaint.type === "passenger"
                            ? complaint.name || "N/A"
                            : complaint.id?.name || "N/A"}
                        </td>
                        <td>{complaint.title}</td>
                        <td>{complaint.category || "N/A"}</td>
                        <td>
                          <span
                            className={`priority-badge ${complaint.priority.toLowerCase()}`}
                          >
                            {complaint.priority}
                          </span>
                        </td>
                        <td>
                          <select
                            className={`admin-status-select admin-status-${complaint.status
                              .toLowerCase()
                              .replace(/\s/g, "-")}`}
                            value={complaint.status}
                            onChange={(e) => {
                              const newStatus = e.target.value;
                              handleEditComplaint({
                                _id: complaint._id,
                                status: newStatus,
                              });
                              handleEditSubmit(new Event("submit"));
                            }}
                            aria-label={`Change status for ${complaint.title}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td>
                          <div className="admin-complaint-actions">
                            <button
                              className="admin-view-button"
                              onClick={() => handleViewDetails(complaint)}
                              aria-label={`View details for ${complaint.title}`}
                            >
                              <FaEye />
                            </button>
                            <button
                              className="admin-delete-button"
                              onClick={() =>
                                handleDeleteComplaint(complaint._id)
                              }
                              aria-label={`Delete ${complaint.title}`}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedComplaint && (
              <div
                className="admin-complaint-modal-overlay"
                onClick={closeModal}
              >
                <div
                  className="admin-complaint-modal"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="admin-modal-close"
                    onClick={closeModal}
                    aria-label="Close modal"
                  >
                    <FaTimes />
                  </button>
                  {isEditing ? (
                    <form
                      onSubmit={handleEditSubmit}
                      className="admin-complaint-form"
                    >
                      <h3>Update Complaint Status</h3>
                      <select
                        name="status"
                        value={editComplaint.status}
                        onChange={handleEditInputChange}
                        required
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <button type="submit">Update Status</button>
                      <button
                        type="button"
                        className="admin-modal-cancel"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <>
                      <h3>Complaint Details</h3>
                      <p>
                        <strong>Type:</strong> {selectedComplaint.type}
                      </p>
                      <p>
                        <strong>Email:</strong>{" "}
                        {selectedComplaint.id?.email || "N/A"}
                      </p>
                      <p>
                        <strong>Name:</strong>{" "}
                        {selectedComplaint.type === "passenger"
                          ? selectedComplaint.name || "N/A"
                          : selectedComplaint.id?.name || "N/A"}
                      </p>
                      <p>
                        <strong>Title:</strong> {selectedComplaint.title}
                      </p>
                      <p>
                        <strong>Category:</strong>{" "}
                        {selectedComplaint.category || "N/A"}
                      </p>
                      <p>
                        <strong>Description:</strong>{" "}
                        {selectedComplaint.description}
                      </p>
                      <p>
                        <strong>Priority:</strong>{" "}
                        <span
                          className={`priority-badge ${selectedComplaint.priority.toLowerCase()}`}
                        >
                          {selectedComplaint.priority}
                        </span>
                      </p>
                      <p>
                        <strong>Status:</strong> {selectedComplaint.status}
                      </p>
                      <p>
                        <strong>Submitted At:</strong>{" "}
                        {new Date(
                          selectedComplaint.submittedAt
                        ).toLocaleString()}
                      </p>
                      <button
                        className="admin-edit-button"
                        onClick={() => handleEditComplaint(selectedComplaint)}
                        aria-label={`Edit status for ${selectedComplaint.title}`}
                      >
                        <FaEdit /> Update Status
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="admin-complaint-pagination">
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
          </>
        )}
      </div>
    </div>
  );
};

export default ManageComplaintsPage;
