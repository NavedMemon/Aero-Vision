// "use client";
// import { useState, useEffect } from "react";
// import { FaDoorOpen, FaEdit, FaTrash } from "react-icons/fa";
// import AdminSidebar from "../AdminSidebar";
// import Image from "next/image";
// import "../admin.css";

// export default function ManageGatesPage() {
//   const [gateNumber, setGateNumber] = useState("");
//   const [gates, setGates] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [editGate, setEditGate] = useState(null);
//   const [deleteGateId, setDeleteGateId] = useState(null);

//   // Fetch gates on mount
//   useEffect(() => {
//     fetchGates();
//   }, []);

//   const fetchGates = async () => {
//     try {
//       const res = await fetch("/api/admin/gate", {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setError(data.error || "Failed to fetch gates.");
//         return;
//       }
//       setGates(data.gates);
//     } catch (err) {
//       setError("An error occurred while fetching gates.");
//       console.error("Error fetching gates:", err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!gateNumber.trim()) {
//       setError("Gate number is required.");
//       return;
//     }

//     try {
//       const res = await fetch("/api/admin/gate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ gateNumber }),
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to create gate.");
//         return;
//       }

//       setSuccess("Gate created successfully!");
//       setGateNumber("");
//       fetchGates();
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//       console.error("Error creating gate:", err);
//     }
//   };

//   const handleEdit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!editGate.gateNumber.trim()) {
//       setError("Gate number is required.");
//       return;
//     }

//     try {
//       const res = await fetch("/api/admin/gate", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           gateId: editGate._id,
//           gateNumber: editGate.gateNumber,
//         }),
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to update gate.");
//         return;
//       }

//       setSuccess("Gate updated successfully!");
//       setEditGate(null);
//       fetchGates();
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//       console.error("Error updating gate:", err);
//     }
//   };

//   const handleDelete = async () => {
//     setError("");
//     setSuccess("");

//     try {
//       const res = await fetch("/api/admin/gate", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ gateId: deleteGateId }),
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to delete gate.");
//         return;
//       }

//       setSuccess("Gate deleted successfully!");
//       setDeleteGateId(null);
//       fetchGates();
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//       console.error("Error deleting gate:", err);
//     }
//   };

//   return (
//     <div className="gate-container">
//       <AdminSidebar />
//       <div className="gate-content">
//         <div className="gate-header">
//           <h1 className="gate-title">
//             <FaDoorOpen className="gate-icon-title" /> Manage Gates
//           </h1>
//         </div>

//         {/* Create Gate Form */}
//         <form className="gate-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="gateNumber" className="gate-label">
//               <FaDoorOpen className="gate-icon-label" /> Gate Number
//             </label>
//             <div className="input-wrapper">
//               <FaDoorOpen className="gate-icon-input" />
//               <input
//                 type="text"
//                 id="gateNumber"
//                 value={gateNumber}
//                 onChange={(e) => setGateNumber(e.target.value)}
//                 placeholder="e.g., Gate 1, A2"
//                 className="gate-input"
//               />
//             </div>
//           </div>
//           <button type="submit" className="gate-submit-btn">
//             <FaDoorOpen className="gate-icon-button" /> Create Gate
//           </button>
//         </form>

//         {/* Gates Table */}
//         <div className="gates-table-container">
//           <h2 className="table-title">Created Gates</h2>
//           {gates.length === 0 ? (
//             <p className="no-gates">No gates created yet.</p>
//           ) : (
//             <table className="gates-table">
//               <thead>
//                 <tr>
//                   <th>Gate Number</th>
//                   <th>Created By</th>
//                   <th>Created At</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {gates.map((gate) => (
//                   <tr key={gate._id}>
//                     <td>{gate.gateNumber}</td>
//                     <td>{gate.createdBy?.email || "-"}</td>
//                     <td>{new Date(gate.createdAt).toLocaleString()}</td>
//                     <td>
//                       <button
//                         className="action-btn edit-btn"
//                         onClick={() => setEditGate(gate)}
//                         aria-label="Edit gate"
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         className="action-btn delete-btn"
//                         onClick={() => setDeleteGateId(gate._id)}
//                         aria-label="Delete gate"
//                       >
//                         <FaTrash />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* Edit Modal */}
//         {editGate && (
//           <div className="modal">
//             <div className="modal-content">
//               <h3 className="modal-title">
//                 <FaEdit className="modal-icon" /> Edit Gate
//               </h3>
//               <form onSubmit={handleEdit}>
//                 <div className="form-group">
//                   <label htmlFor="editGateNumber" className="gate-label">
//                     Gate Number
//                   </label>
//                   <input
//                     type="text"
//                     id="editGateNumber"
//                     value={editGate.gateNumber}
//                     onChange={(e) =>
//                       setEditGate({ ...editGate, gateNumber: e.target.value })
//                     }
//                     className="gate-input"
//                   />
//                 </div>
//                 <div className="modal-buttons">
//                   <button type="submit" className="gate-submit-btn">
//                     Save Changes
//                   </button>
//                   <button
//                     type="button"
//                     className="cancel-btn"
//                     onClick={() => setEditGate(null)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Delete Confirmation Modal */}
//         {deleteGateId && (
//           <div className="modal">
//             <div className="modal-content">
//               <h3 className="modal-title">
//                 <FaTrash className="modal-icon" /> Confirm Deletion
//               </h3>
//               <p>Are you sure you want to delete this gate?</p>
//               <div className="modal-buttons">
//                 <button className="gate-submit-btn" onClick={handleDelete}>
//                   Delete
//                 </button>
//                 <button
//                   className="cancel-btn"
//                   onClick={() => setDeleteGateId(null)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {error && <p className="gate-error">{error}</p>}
//         {success && <p className="gate-success">{success}</p>}
//       </div>
//       <style jsx>{`
//         .gate-container {
//           display: flex;
//           min-height: 100vh;
//           background: linear-gradient(135deg, #f8fafc, #e6f0ff);
//         }
//         .gate-content {
//           flex: 1;
//           padding: 2.5rem;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 2rem;
//         }
//         .gate-header {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           margin-bottom: 1rem;
//         }
//         .gate-logo {
//           width: 70px;
//           height: 70px;
//           object-fit: contain;
//         }
//         .gate-title {
//           font-size: 2.5rem;
//           font-weight: 700;
//           color: #000000;
//           background: linear-gradient(to right, #007bff, #00c4ff);
//           background-clip: text;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }
//         .gate-icon-title {
//           font-size: 2.8rem;
//           color: #007bff;
//           transition: transform 0.3s ease;
//         }
//         .gate-icon-title:hover {
//           transform: scale(1.1);
//         }
//         .gate-form {
//           background: #ffffff;
//           padding: 2rem;
//           border-radius: 1rem;
//           box-shadow: 0 6px 25px rgba(0, 123, 255, 0.15);
//           width: 100%;
//           max-width: 450px;
//         }
//         .form-group {
//           margin-bottom: 1.5rem;
//         }
//         .gate-label {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-size: 1.1rem;
//           font-weight: 600;
//           color: #000000;
//           margin-bottom: 0.5rem;
//         }
//         .gate-icon-label {
//           font-size: 1.4rem;
//           color: #007bff;
//           transition: transform 0.3s ease;
//         }
//         .gate-icon-label:hover {
//           transform: scale(1.1);
//         }
//         .input-wrapper {
//           position: relative;
//           display: flex;
//           align-items: center;
//         }
//         .gate-icon-input {
//           position: absolute;
//           left: 0.75rem;
//           font-size: 1.2rem;
//           color: #007bff;
//         }
//         .gate-input {
//           width: 100%;
//           padding: 0.75rem 0.75rem 0.75rem 2.5rem;
//           border: 2px solid #e2e8f0;
//           border-radius: 0.5rem;
//           font-size: 1rem;
//           color: #000000;
//           transition: all 0.3s ease;
//         }
//         .gate-input:focus {
//           border-color: #007bff;
//           box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
//           outline: none;
//         }
//         .gate-input::placeholder {
//           color: #a0aec0;
//         }
//         .gate-submit-btn {
//           width: 100%;
//           padding: 0.75rem;
//           background: linear-gradient(to right, #007bff, #00c4ff);
//           color: #ffffff;
//           border: none;
//           border-radius: 0.5rem;
//           font-size: 1rem;
//           font-weight: 600;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.5rem;
//           transition: all 0.3s ease;
//         }
//         .gate-icon-button {
//           font-size: 1.2rem;
//         }
//         .gate-submit-btn:hover {
//           background: linear-gradient(to right, #0056b3, #0096cc);
//           transform: translateY(-2px);
//           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
//         }
//         .gates-table-container {
//           width: 100%;
//           max-width: 800px;
//           background: #ffffff;
//           padding: 1.5rem;
//           border-radius: 1rem;
//           box-shadow: 0 6px 25px rgba(0, 123, 255, 0.15);
//         }
//         .table-title {
//           font-size: 1.8rem;
//           font-weight: 600;
//           color: #000000;
//           margin-bottom: 1rem;
//         }
//         .gates-table {
//           width: 100%;
//           border-collapse: separate;
//           border-spacing: 0;
//         }
//         .gates-table th,
//         .gates-table td {
//           padding: 0.75rem;
//           text-align: left;
//           color: #000000;
//           font-size: 0.95rem;
//         }
//         .gates-table th {
//           background: linear-gradient(to right, #007bff, #00c4ff);
//           color: #ffffff;
//           font-weight: 600;
//           border-bottom: 2px solid #e2e8f0;
//         }
//         .gates-table tr:nth-child(even) {
//           background: #f9fafb;
//         }
//         .gates-table tr:hover {
//           background: #e6f0ff;
//           transform: scale(1.01);
//           transition: all 0.2s ease;
//         }
//         .action-btn {
//           padding: 0.5rem;
//           margin-right: 0.5rem;
//           border: none;
//           border-radius: 0.5rem;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }
//         .edit-btn {
//           background: #28a745;
//           color: #ffffff;
//         }
//         .edit-btn:hover {
//           background: #218838;
//         }
//         .delete-btn {
//           background: #dc3545;
//           color: #ffffff;
//         }
//         .delete-btn:hover {
//           background: #c82333;
//         }
//         .no-gates {
//           color: #000000;
//           font-size: 1rem;
//           text-align: center;
//         }
//         .modal {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(0, 0, 0, 0.5);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 1000;
//         }
//         .modal-content {
//           background: #ffffff;
//           padding: 2rem;
//           border-radius: 1rem;
//           box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
//           max-width: 400px;
//           width: 100%;
//         }
//         .modal-title {
//           font-size: 1.5rem;
//           font-weight: 600;
//           color: #000000;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           margin-bottom: 1rem;
//         }
//         .modal-icon {
//           font-size: 1.5rem;
//           color: #007bff;
//         }
//         .modal-buttons {
//           display: flex;
//           gap: 1rem;
//           margin-top: 1.5rem;
//         }
//         .cancel-btn {
//           padding: 0.75rem;
//           background: #e2e8f0;
//           color: #000000;
//           border: none;
//           border-radius: 0.5rem;
//           font-size: 1rem;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }
//         .cancel-btn:hover {
//           background: #cbd5e1;
//         }
//         .gate-error {
//           color: #dc3545;
//           font-size: 0.9rem;
//           margin-top: 1rem;
//           text-align: center;
//         }
//         .gate-success {
//           color: #28a745;
//           font-size: 0.9rem;
//           margin-top: 1rem;
//           text-align: center;
//         }
//         @media (max-width: 768px) {
//           .gate-content {
//             padding: 1.5rem;
//           }
//           .gate-title {
//             font-size: 2rem;
//           }
//           .gate-logo {
//             width: 50px;
//             height: 50px;
//           }
//           .gate-form,
//           .gates-table-container {
//             padding: 1.5rem;
//             max-width: 100%;
//           }
//           .gates-table th,
//           .gates-table td {
//             font-size: 0.85rem;
//             padding: 0.5rem;
//           }
//           .modal-content {
//             padding: 1.5rem;
//             max-width: 90%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { FaDoorOpen, FaEdit, FaTrash } from "react-icons/fa";
import AdminSidebar from "../AdminSidebar";
import "../admin.css";

export default function ManageGatesPage() {
  const [gateNumber, setGateNumber] = useState("");
  const [gates, setGates] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editGate, setEditGate] = useState(null);
  const [deleteGateId, setDeleteGateId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [gatesPerPage] = useState(5);

  useEffect(() => {
    fetchGates();
  }, []);

  const fetchGates = async () => {
    try {
      const res = await fetch("/api/admin/gate", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Send token cookie
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to fetch gates.");
        if (data.error === "Admin not found") {
          setError("Admin account not found. Please log in again.");
        }
        return;
      }
      setGates(data.gates);
    } catch (err) {
      setError("An error occurred while fetching gates.");
      console.error("Error fetching gates:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!gateNumber.trim()) {
      setError("Gate number cannot be empty.");
      return;
    }

    // Check for duplicate gate number (client-side)
    if (
      gates.some(
        (gate) =>
          gate.gateNumber.toLowerCase() === gateNumber.trim().toLowerCase()
      )
    ) {
      setError("Gate number already exists.");
      return;
    }

    try {
      const res = await fetch("/api/admin/gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ gateNumber }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create gate.");
        if (data.error === "Admin not found") {
          setError("Admin account not found. Please log in again.");
        }
        return;
      }

      setSuccess("Gate created successfully!");
      setGateNumber("");
      fetchGates();
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error creating gate:", err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!editGate.gateNumber.trim()) {
      setError("Gate number cannot be empty.");
      return;
    }

    // Check for duplicate gate number (client-side, excluding current gate)
    if (
      gates.some(
        (gate) =>
          gate.gateNumber.toLowerCase() ===
            editGate.gateNumber.trim().toLowerCase() &&
          gate._id !== editGate._id
      )
    ) {
      setError("Gate number already exists.");
      return;
    }

    try {
      const res = await fetch("/api/admin/gate", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          gateId: editGate._id,
          gateNumber: editGate.gateNumber,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to update gate.");
        if (data.error === "Admin not found") {
          setError("Admin account not found. Please log in again.");
        }
        return;
      }

      setSuccess("Gate updated successfully!");
      setEditGate(null);
      fetchGates();
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error updating gate:", err);
    }
  };

  const handleDelete = async () => {
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/gate", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ gateId: deleteGateId }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to delete gate.");
        if (data.error === "Admin not found") {
          setError("Admin account not found. Please log in again.");
        }
        return;
      }

      setSuccess("Gate deleted successfully!");
      setDeleteGateId(null);
      fetchGates();
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error deleting gate:", err);
    }
  };

  // Pagination logic
  const indexOfLastGate = currentPage * gatesPerPage;
  const indexOfFirstGate = indexOfLastGate - gatesPerPage;
  const currentGates = gates.slice(indexOfFirstGate, indexOfLastGate);
  const totalPages = Math.ceil(gates.length / gatesPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="gate-container">
      <AdminSidebar />
      <div className="gate-content">
        <div className="gate-header">
          <h1 className="gate-title">
            <FaDoorOpen className="gate-icon-title" /> Manage Gates
          </h1>
        </div>

        {/* Create Gate Form */}
        <form className="gate-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="gateNumber" className="gate-label">
              <FaDoorOpen className="gate-icon-label" /> Gate Number
            </label>
            <div className="input-wrapper">
              <FaDoorOpen className="gate-icon-input" />
              <input
                type="text"
                id="gateNumber"
                value={gateNumber}
                onChange={(e) => setGateNumber(e.target.value)}
                placeholder="e.g., Gate 1, A2"
                className="gate-input"
              />
            </div>
          </div>
          <button type="submit" className="gate-submit-btn">
            <FaDoorOpen className="gate-icon-button" /> Create Gate
          </button>
        </form>

        {/* Gates Table */}
        <div className="gates-table-container">
          <h2 className="table-title">Created Gates</h2>
          {gates.length === 0 ? (
            <p className="no-gates">No gates created yet.</p>
          ) : (
            <>
              <table className="gates-table">
                <thead>
                  <tr>
                    <th>Gate Number</th>
                    <th>Created By</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentGates.map((gate) => (
                    <tr key={gate._id}>
                      <td>{gate.gateNumber}</td>
                      <td>{gate.createdBy?.email || "-"}</td>
                      <td>{new Date(gate.createdAt).toLocaleString()}</td>
                      <td>
                        <button
                          className="action-btn edit-btn"
                          onClick={() => setEditGate(gate)}
                          aria-label="Edit gate"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => setDeleteGateId(gate._id)}
                          aria-label="Delete gate"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination Controls */}
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="pagination-btn"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>

        {/* Edit Modal */}
        {editGate && (
          <div className="modal">
            <div className="modal-content">
              <h3 className="modal-title">
                <FaEdit className="modal-icon" /> Edit Gate
              </h3>
              <form onSubmit={handleEdit}>
                <div className="form-group">
                  <label htmlFor="editGateNumber" className="gate-label">
                    Gate Number
                  </label>
                  <input
                    type="text"
                    id="editGateNumber"
                    value={editGate.gateNumber}
                    onChange={(e) =>
                      setEditGate({ ...editGate, gateNumber: e.target.value })
                    }
                    className="gate-input"
                  />
                </div>
                <div className="modal-buttons">
                  <button type="submit" className="gate-submit-btn">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setEditGate(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteGateId && (
          <div className="modal">
            <div className="modal-content">
              <h3 className="modal-title">
                <FaTrash className="modal-icon" /> Confirm Deletion
              </h3>
              <p>Are you sure you want to delete this gate?</p>
              <div className="modal-buttons">
                <button className="gate-submit-btn" onClick={handleDelete}>
                  Delete
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setDeleteGateId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {error && <p className="gate-error">{error}</p>}
        {success && <p className="gate-success">{success}</p>}
      </div>
      <style jsx>{`
        .gate-container {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc, #e6f0ff);
        }
        .gate-content {
          flex: 1;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }
        .gate-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .gate-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #000000;
          background: linear-gradient(to right, #007bff, #00c4ff);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .gate-icon-title {
          font-size: 2.8rem;
          color: #007bff;
          transition: transform 0.3s ease;
        }
        .gate-icon-title:hover {
          transform: scale(1.1);
        }
        .gate-form {
          background: #ffffff;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 6px 25px rgba(0, 123, 255, 0.15);
          width: 100%;
          max-width: 450px;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .gate-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          color: #000000;
          margin-bottom: 0.5rem;
        }
        .gate-icon-label {
          font-size: 1.4rem;
          color: #007bff;
          transition: transform 0.3s ease;
        }
        .gate-icon-label:hover {
          transform: scale(1.1);
        }
        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .gate-icon-input {
          position: absolute;
          left: 0.75rem;
          font-size: 1.2rem;
          color: #007bff;
        }
        .gate-input {
          width: 100%;
          padding: 0.75rem 0.75rem 0.75rem 2.5rem;
          border: 2px solid #e2e8f0;
          border-radius: 0.5rem;
          font-size: 1rem;
          color: #000000;
          transition: all 0.3s ease;
        }
        .gate-input:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
          outline: none;
        }
        .gate-input::placeholder {
          color: #a0aec0;
        }
        .gate-submit-btn {
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(to right, #007bff, #00c4ff);
          color: #ffffff;
          border: none;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }
        .gate-icon-button {
          font-size: 1.2rem;
        }
        .gate-submit-btn:hover {
          background: linear-gradient(to right, #0056b3, #0096cc);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        .gates-table-container {
          width: 100%;
          max-width: 800px;
          background: #ffffff;
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 6px 25px rgba(0, 123, 255, 0.15);
        }
        .table-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #000000;
          margin-bottom: 1rem;
        }
        .gates-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }
        .gates-table th,
        .gates-table td {
          padding: 0.75rem;
          text-align: left;
          color: #000000;
          font-size: 0.95rem;
        }
        .gates-table th {
          background: linear-gradient(to right, #007bff, #00c4ff);
          color: #ffffff;
          font-weight: 600;
          border-bottom: 2px solid #e2e8f0;
        }
        .gates-table tr:nth-child(even) {
          background: #f9fafb;
        }
        .gates-table tr:hover {
          background: #e6f0ff;
          transform: scale(1.01);
          transition: all 0.2s ease;
        }
        .action-btn {
          padding: 0.5rem;
          margin-right: 0.5rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .edit-btn {
          background: #28a745;
          color: #ffffff;
        }
        .edit-btn:hover {
          background: #218838;
        }
        .delete-btn {
          background: #dc3545;
          color: #ffffff;
        }
        .delete-btn:hover {
          background: #c82333;
        }
        .no-gates {
          color: #000000;
          font-size: 1rem;
          text-align: center;
        }
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: #ffffff;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
          max-width: 400px;
          width: 100%;
        }
        .modal-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #000000;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .modal-icon {
          font-size: 1.5rem;
          color: #007bff;
        }
        .modal-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .cancel-btn {
          padding: 0.75rem;
          background: #e2e8f0;
          color: #000000;
          border: none;
          border-radius: 0.5rem;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .cancel-btn:hover {
          background: #cbd5e1;
        }
        .gate-error {
          color: #dc3545;
          font-size: 0.9rem;
          margin-top: 1rem;
          text-align: center;
        }
        .gate-success {
          color: #28a745;
          font-size: 0.9rem;
          margin-top: 1rem;
          text-align: center;
        }
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
        }
        .pagination-btn {
          padding: 0.5rem 1rem;
          background: linear-gradient(to right, #007bff, #00c4ff);
          color: #ffffff;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .pagination-btn:disabled {
          background: #e2e8f0;
          cursor: not-allowed;
        }
        .pagination-btn:hover:not(:disabled) {
          background: linear-gradient(to right, #0056b3, #0096cc);
          transform: translateY(-2px);
        }
        .pagination-info {
          font-size: 1rem;
          color: #000000;
        }
        @media (max-width: 768px) {
          .gate-content {
            padding: 1.5rem;
          }
          .gate-title {
            font-size: 2rem;
          }
          .gate-form,
          .gates-table-container {
            padding: 1.5rem;
            max-width: 100%;
          }
          .gates-table th,
          .gates-table td {
            font-size: 0.85rem;
            padding: 0.5rem;
          }
          .modal-content {
            padding: 1.5rem;
            max-width: 90%;
          }
        }
      `}</style>
    </div>
  );
}
