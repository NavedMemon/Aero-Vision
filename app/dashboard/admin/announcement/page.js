// "use client";
// import React, { useState } from "react";
// import AdminSidebar from "../AdminSidebar";
// import "./announcement.css";
// import "../admin.css";

// const AnnouncementsPage = () => {
//   const [announcements, setAnnouncements] = useState([
//     {
//       id: 1,
//       audience: "All",
//       text: "Gate A12 closed for maintenance.",
//       department: null,
//       flight: null,
//       date: "2025-07-29 10:00 AM",
//     },
//     {
//       id: 2,
//       audience: "Staff",
//       text: "Technical team meeting at 2 PM.",
//       department: "Technical",
//       flight: null,
//       date: "2025-07-29 11:30 AM",
//     },
//     {
//       id: 3,
//       audience: "Passenger",
//       text: "Flight AI123 delayed by 30 minutes.",
//       department: null,
//       flight: "AI123",
//       date: "2025-07-29 12:00 PM",
//     },
//     {
//       id: 4,
//       audience: "All",
//       text: "Airport security update.",
//       department: null,
//       flight: null,
//       date: "2025-07-29 01:00 PM",
//     },
//     {
//       id: 5,
//       audience: "Staff",
//       text: "Maintenance schedule revised.",
//       department: "Maintenance",
//       flight: null,
//       date: "2025-07-29 02:00 PM",
//     },
//     {
//       id: 6,
//       audience: "Passenger",
//       text: "Flight AI456 boarding now.",
//       department: null,
//       flight: "AI456",
//       date: "2025-07-29 03:00 PM",
//     },
//   ]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [theme, setTheme] = useState("light");
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editAnnouncement, setEditAnnouncement] = useState({
//     id: null,
//     text: "",
//   });
//   const [error, setError] = useState("");
//   const announcementsPerPage = 5;

//   const totalPages = Math.ceil(announcements.length / announcementsPerPage);
//   const startIndex = (currentPage - 1) * announcementsPerPage;
//   const currentAnnouncements = announcements.slice(
//     startIndex,
//     startIndex + announcementsPerPage
//   );

//   const handleDeleteAnnouncement = (id) => {
//     if (confirm("Are you sure you want to delete this announcement?")) {
//       setAnnouncements(announcements.filter((ann) => ann.id !== id));
//     }
//   };

//   const handleEditClick = (ann) => {
//     setEditAnnouncement({ id: ann.id, text: ann.text });
//     setShowEditModal(true);
//   };

//   const handleEditSubmit = (e) => {
//     e.preventDefault();
//     if (!editAnnouncement.text.trim()) {
//       setError("Announcement text is required.");
//       return;
//     }
//     setAnnouncements(
//       announcements.map((ann) =>
//         ann.id === editAnnouncement.id
//           ? {
//               ...ann,
//               text: editAnnouncement.text,
//               date: new Date().toLocaleString("en-US", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//                 hour: "2-digit",
//                 minute: "2-digit",
//               }),
//             }
//           : ann
//       )
//     );
//     setEditAnnouncement({ id: null, text: "" });
//     setError("");
//     setShowEditModal(false);
//   };

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   return (
//     <div className={`admin-dashboard-new-container ${theme}`}>
//       <AdminSidebar />
//       <div className="admin-dashboard-main-bright">
//         <div className="announcements-header">
//           <h1 className="admin-welcome">Announcements</h1>
//           <div className="header-actions">
//             <button
//               onClick={toggleTheme}
//               className="theme-toggle"
//               aria-label="Toggle theme"
//             >
//               {theme === "light" ? "🌙" : "☀️"}
//             </button>
//           </div>
//         </div>

//         <div className="admin-alert-box">
//           <h3>All Announcements</h3>
//           {announcements.length === 0 ? (
//             <p className="no-announcements">No announcements yet.</p>
//           ) : (
//             <div className="announcements-section">
//               {currentAnnouncements.map((ann) => (
//                 <div key={ann.id} className="announcement-item">
//                   <div className="announcement-content">
//                     <p className="announcement-audience">
//                       <strong>{ann.audience}</strong>
//                       {ann.audience === "Staff" &&
//                         ann.department &&
//                         `: ${ann.department}`}
//                       {ann.audience === "Passenger" &&
//                         ann.flight &&
//                         `: ${ann.flight}`}
//                     </p>
//                     <p className="announcement-text">{ann.text}</p>
//                     <p className="announcement-date">{ann.date}</p>
//                   </div>
//                   <div className="announcement-actions">
//                     <button
//                       onClick={() => handleEditClick(ann)}
//                       className="edit-button"
//                       aria-label="Edit announcement"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteAnnouncement(ann.id)}
//                       className="delete-button"
//                       aria-label="Delete announcement"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//           {totalPages > 1 && (
//             <div className="pagination">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="pagination-btn"
//               >
//                 Previous
//               </button>
//               {[...Array(totalPages)].map((_, i) => (
//                 <button
//                   key={i + 1}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`pagination-btn ${
//                     currentPage === i + 1 ? "active" : ""
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//               <button
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//                 className="pagination-btn"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>

//         {showEditModal && (
//           <div className="modal-overlay">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h2>Edit Announcement</h2>
//                 <button
//                   onClick={() => setShowEditModal(false)}
//                   className="modal-close"
//                   aria-label="Close modal"
//                 >
//                   ✕
//                 </button>
//               </div>
//               <form onSubmit={handleEditSubmit} className="modal-form">
//                 {error && <p className="form-error">{error}</p>}
//                 <div className="form-group">
//                   <label htmlFor="text">Announcement</label>
//                   <textarea
//                     id="text"
//                     name="text"
//                     value={editAnnouncement.text}
//                     onChange={(e) =>
//                       setEditAnnouncement({
//                         ...editAnnouncement,
//                         text: e.target.value,
//                       })
//                     }
//                     placeholder="Enter announcement text"
//                     className="form-textarea"
//                     rows="4"
//                   />
//                 </div>
//                 <div className="form-actions">
//                   <button
//                     type="button"
//                     onClick={() => setShowEditModal(false)}
//                     className="cancel-btn"
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="submit-btn">
//                     Update Announcement
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AnnouncementsPage;

"use client";
import React, { useState, useEffect } from "react";
import AdminSidebar from "../AdminSidebar";
import "./announcement.css";
import "../admin.css";

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState({
    id: null,
    text: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, setTheme] = useState("light");
  const announcementsPerPage = 5;

  const totalPages = Math.ceil(announcements.length / announcementsPerPage);
  const startIndex = (currentPage - 1) * announcementsPerPage;
  const currentAnnouncements = announcements.slice(
    startIndex,
    startIndex + announcementsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/announcement");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch data");
        }
        const data = await response.json();
        console.log("Fetched data:", { announcements: data.announcements });
        setAnnouncements(data.announcements || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data: " + error.message);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (ann) => {
    setEditAnnouncement({ id: ann._id, text: ann.text });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!editAnnouncement.text.trim()) {
      setError("Announcement text is required.");
      return;
    }
    try {
      const response = await fetch("/api/admin/announcement", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editAnnouncement),
      });
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to update announcement");
      }
      const { announcement } = await response.json();
      setAnnouncements(
        announcements.map((ann) =>
          ann._id === announcement._id ? announcement : ann
        )
      );
      setEditAnnouncement({ id: null, text: "" });
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating announcement:", error);
      setError(error.message);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    try {
      const response = await fetch("/api/admin/announcement", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to delete announcement");
      }
      setAnnouncements(announcements.filter((ann) => ann._id !== id));
    } catch (error) {
      console.error("Error deleting announcement:", error);
      setError(error.message);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`admin-dashboard-new-container ${theme}`}>
      <AdminSidebar />
      <div className="admin-dashboard-main-bright">
        <div className="announcements-header">
          <h1 className="admin-welcome">Announcements</h1>
          <div className="header-actions">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>

        <div className="admin-alert-box">
          <h3>All Announcements</h3>
          {error && <p className="form-error">{error}</p>}
          {announcements.length === 0 ? (
            <p className="no-announcements">No announcements yet.</p>
          ) : (
            <div className="announcements-section">
              {currentAnnouncements.map((ann) => (
                <div key={ann._id} className="announcement-item">
                  <div className="announcement-content">
                    <p className="announcement-audience">
                      <strong>{ann.audience}</strong>
                      {ann.audience === "Staff" &&
                        ann.department &&
                        `: ${ann.department}`}
                      {ann.audience === "Passenger" &&
                        ann.flight &&
                        `: ${ann.flight}`}
                    </p>
                    <p className="announcement-text">{ann.text}</p>
                    <p className="announcement-date">
                      {new Date(ann.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <div className="announcement-actions">
                    <button
                      onClick={() => handleEditClick(ann)}
                      className="edit-button"
                      aria-label="Edit announcement"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAnnouncement(ann._id)}
                      className="delete-button"
                      aria-label="Delete announcement"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`pagination-btn ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {showEditModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Edit Announcement</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="modal-close"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleEditSubmit} className="modal-form">
                {error && <p className="form-error">{error}</p>}
                <div className="form-group">
                  <label htmlFor="text">Announcement</label>
                  <textarea
                    id="text"
                    name="text"
                    value={editAnnouncement.text}
                    onChange={(e) =>
                      setEditAnnouncement({
                        ...editAnnouncement,
                        text: e.target.value,
                      })
                    }
                    placeholder="Enter announcement text"
                    className="form-textarea"
                    rows="4"
                  />
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Update Announcement
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
