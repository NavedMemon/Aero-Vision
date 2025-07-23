"use client";
import React, { useState, useEffect } from "react";
import AdminSidebar from "../AdminSidebar";
import "../admin.css";
import "./manageusers.css";
import { FaEye, FaTrash, FaEdit, FaTimes } from "react-icons/fa";

const mockUsers = new Array(12).fill(0).map((_, i) => ({
  id: i,
  username: `User${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Passenger" : "Staff",
  lastLogin: `2025-07-${(20 - i).toString().padStart(2, "0")}T${(10 + i).toString().padStart(2, "0")}:00:00`,
  createdAt: `2025-06-${(15 - i).toString().padStart(2, "0")}T08:00:00`,
  status: i % 4 === 0 ? "Banned" : "Active",
}));

const ManageUserPage = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [users, setUsers] = useState(mockUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const usersPerPage = 8;
  const currentUserId = 0; // Mock current admin ID (replace with auth context)

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter]);

  if (!hasMounted) return null;

  const uniqueRoles = ["All", ...new Set(mockUsers.map((user) => user.role))];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRoleFilter =
      roleFilter === "All" || user.role.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRoleFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage));

  const paginated = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsEditing(false);
  };

  const handleEditUser = (user) => {
    setEditUser({ ...user });
    setIsEditing(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editUser.username.trim()) {
      alert("Username cannot be empty.");
      return;
    }
    if (!editUser.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      alert("Please enter a valid email address.");
      return;
    }
    setUsers(
      users.map((user) => (user.id === editUser.id ? { ...editUser } : user))
    );
    setIsEditing(false);
    setSelectedUser(null);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleDeleteUser = (id) => {
    if (id === currentUserId) {
      alert("You cannot delete your own account.");
      return;
    }
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
      if (selectedUser?.id === id) {
        setSelectedUser(null);
      }
    }
  };

  const handleExportUsers = () => {
    if (filteredUsers.length === 0) {
      alert("No users to export.");
      return;
    }
    const csvContent = [
      "Username,Email,Role,Last Login,Created At,Status",
      ...filteredUsers.map((user) =>
        [
          `"${user.username.replace(/"/g, '""')}"`,
          `"${user.email.replace(/"/g, '""')}"`,
          user.role,
          new Date(user.lastLogin).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          new Date(user.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          user.status,
        ].join(",")
      ),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `users_${new Date().toISOString()}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsEditing(false);
    setEditUser(null);
  };

  return (
    <div className="admin-dashboard-new-container">
      <AdminSidebar />
      <div className="admin-dashboard-main-bright">
        <h1 className="admin-user-title">👤 Manage Users</h1>

        <div className="admin-user-controls">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            {uniqueRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <button className="admin-export-button" onClick={handleExportUsers}>
            Export Users
          </button>
        </div>

        {paginated.length === 0 ? (
          <p className="admin-no-users">No users found.</p>
        ) : (
          <div className="admin-user-table-container">
            <table className="admin-user-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Last Login</th>
                  <th>Created At</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      {new Date(user.lastLogin).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })}
                    </td>
                    <td>
                      {new Date(user.createdAt).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })}
                    </td>
                    <td className={`admin-status-${user.status.toLowerCase()}`}>
                      {user.status}
                    </td>
                    <td>
                      <div className="admin-user-actions">
                        <button
                          className="admin-view-button"
                          onClick={() => handleViewDetails(user)}
                          aria-label={`View details for ${user.username}`}
                        >
                          <FaEye />
                        </button>
                        <button
                          className="admin-delete-button"
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={user.id === currentUserId}
                          aria-label={`Delete ${user.username}`}
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

        {selectedUser && (
          <div className="admin-user-modal-overlay" onClick={closeModal}>
            <div
              className="admin-user-modal"
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
                <form onSubmit={handleEditSubmit} className="admin-user-form">
                  <h3>Edit User</h3>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={editUser.username}
                    onChange={handleEditInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={editUser.email}
                    onChange={handleEditInputChange}
                    required
                  />
                  <select
                    name="role"
                    value={editUser.role}
                    onChange={handleEditInputChange}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Passenger">Passenger</option>
                    <option value="Staff">Staff</option>
                  </select>
                  <select
                    name="status"
                    value={editUser.status}
                    onChange={handleEditInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Banned">Banned</option>
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
                  <h3>User Details</h3>
                  <p><strong>Username:</strong> {selectedUser.username}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Role:</strong> {selectedUser.role}</p>
                  <p>
                    <strong>Last Login:</strong>{" "}
                    {new Date(selectedUser.lastLogin).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(selectedUser.createdAt).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </p>
                  <p><strong>Status:</strong> {selectedUser.status}</p>
                  <button
                    className="admin-edit-button"
                    onClick={() => handleEditUser(selectedUser)}
                    aria-label={`Edit ${selectedUser.username}`}
                  >
                    <FaEdit /> Edit User
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        <div className="admin-user-pagination">
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

export default ManageUserPage;