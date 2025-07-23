"use client";
import React, { useState, useEffect } from "react";
import AdminSidebar from "../AdminSidebar";
import "../admin.css";
import "./managecomplaints.css";
import { FaEye, FaTrash, FaEdit, FaTimes } from "react-icons/fa";

const mockComplaints = new Array(12).fill(0).map((_, i) => ({
  id: i,
  name: `User${i + 1}`,
  title: `Complaint ${i + 1}`,
  description: `This is a sample complaint description for issue ${i + 1}.`,
  status: i % 3 === 0 ? "Pending" : i % 3 === 1 ? "Resolved" : "Cancelled",
}));

const ManageComplaintsPage = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [complaints, setComplaints] = useState(mockComplaints);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editComplaint, setEditComplaint] = useState(null);
  const complaintsPerPage = 8;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  if (!hasMounted) return null;

  const uniqueStatuses = ["All", ...new Set(mockComplaints.map((complaint) => complaint.status))];

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatusFilter =
      statusFilter === "All" || complaint.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatusFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filteredComplaints.length / complaintsPerPage));

  const paginated = filteredComplaints.slice(
    (currentPage - 1) * complaintsPerPage,
    currentPage * complaintsPerPage
  );

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setIsEditing(false);
  };

  const handleEditComplaint = (complaint) => {
    setEditComplaint({ ...complaint });
    setIsEditing(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editComplaint.name.trim()) {
      alert("Complaint Name cannot be empty.");
      return;
    }
    if (!editComplaint.title.trim()) {
      alert("Complaint Title cannot be empty.");
      return;
    }
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === editComplaint.id ? { ...editComplaint } : complaint
      )
    );
    setIsEditing(false);
    setSelectedComplaint(null);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditComplaint({ ...editComplaint, [name]: value });
  };

  const handleStatusChange = (id, newStatus) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id ? { ...complaint, status: newStatus } : complaint
      )
    );
  };

  const handleDeleteComplaint = (id) => {
    if (confirm("Are you sure you want to delete this complaint?")) {
      setComplaints(complaints.filter((complaint) => complaint.id !== id));
      if (selectedComplaint?.id === id) {
        setSelectedComplaint(null);
      }
    }
  };

  const handleExportComplaints = () => {
    if (filteredComplaints.length === 0) {
      alert("No complaints to export.");
      return;
    }
    const csvContent = [
      "Name,Title,Description,Status",
      ...filteredComplaints.map((complaint) =>
        [
          `"${complaint.name.replace(/"/g, '""')}"`,
          `"${complaint.title.replace(/"/g, '""')}"`,
          `"${complaint.description.replace(/"/g, '""')}"`,
          complaint.status,
        ].join(",")
      ),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `complaints_${new Date().toISOString()}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
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

        <div className="admin-complaint-controls">
          <input
            type="text"
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            {uniqueStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button className="admin-export-button" onClick={handleExportComplaints}>
            Export Complaints
          </button>
        </div>

        {paginated.length === 0 ? (
          <p className="admin-no-complaints">No complaints found.</p>
        ) : (
          <div className="admin-complaint-table-container">
            <table className="admin-complaint-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((complaint) => (
                  <tr key={complaint.id}>
                    <td>{complaint.name}</td>
                    <td>{complaint.title}</td>
                    <td>{complaint.description}</td>
                    <td>
                      <select
                        className={`admin-status-select admin-status-${complaint.status.toLowerCase()}`}
                        value={complaint.status}
                        onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                        aria-label={`Change status for ${complaint.title}`}
                      >
                        <option value="Pending">Pending</option>
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
                          onClick={() => handleDeleteComplaint(complaint.id)}
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
          <div className="admin-complaint-modal-overlay" onClick={closeModal}>
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
                <form onSubmit={handleEditSubmit} className="admin-complaint-form">
                  <h3>Edit Complaint</h3>
                  <input
                    type="text"
                    name="name"
                    placeholder="Complaint Name"
                    value={editComplaint.name}
                    onChange={handleEditInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Complaint Title"
                    value={editComplaint.title}
                    onChange={handleEditInputChange}
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Complaint Description"
                    value={editComplaint.description}
                    onChange={handleEditInputChange}
                    required
                  />
                  <select
                    name="status"
                    value={editComplaint.status}
                    onChange={handleEditInputChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Cancelled">Cancelled</option>
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
              ) : (
                <>
                  <h3>Complaint Details</h3>
                  <p><strong>Name:</strong> {selectedComplaint.name}</p>
                  <p><strong>Title:</strong> {selectedComplaint.title}</p>
                  <p><strong>Description:</strong> {selectedComplaint.description}</p>
                  <p><strong>Status:</strong> {selectedComplaint.status}</p>
                  <button
                    className="admin-edit-button"
                    onClick={() => handleEditComplaint(selectedComplaint)}
                    aria-label={`Edit ${selectedComplaint.title}`}
                  >
                    <FaEdit /> Edit Complaint
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
      </div>
    </div>
  );
};

export default ManageComplaintsPage;