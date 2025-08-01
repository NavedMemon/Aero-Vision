// "use client";
// import React, { useState } from "react";
// import Sidebar from "../Sidebar";
// import "./complaints.css";
// import "../passenger.css";

// const ComplaintsPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     title: "",
//     description: "",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { name, title, description } = formData;

//     if (!name || !title || !description) {
//       setError("⚠️ All fields are required.");
//       return;
//     }

//     // Handle form submission logic here (e.g., POST to backend)
//     alert("✅ Complaint submitted successfully!");
//     setFormData({ name: "", title: "", description: "" });
//     setError("");
//   };

//   return (
//     <div className="passenger-dashboard-new-container">
//       <Sidebar />
//       <div className="passenger-dashboard-main-bright complaints-container">
//         <h2 className="complaint-title">📣 Submit a Complaint</h2>
//         <form onSubmit={handleSubmit} className="complaint-form">
//           {error && <p className="form-error">{error}</p>}

//           <input
//             type="text"
//             name="name"
//             placeholder="Your Name"
//             value={formData.name}
//             onChange={handleChange}
//           />

//           <input
//             type="text"
//             name="title"
//             placeholder="Complaint Title"
//             value={formData.title}
//             onChange={handleChange}
//           />

//           <textarea
//             name="description"
//             rows="5"
//             placeholder="Describe your complaint..."
//             value={formData.description}
//             onChange={handleChange}
//           ></textarea>

//           <button type="submit" className="submit-complaint-btn">
//             🚀 Submit Complaint
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ComplaintsPage;

// "use client";
// import React, { useState } from "react";
// import Sidebar from "../Sidebar";
// import "./complaints.css";
// import "../passenger.css";

// const ComplaintsPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     title: "",
//     description: "",
//   });

//   const [error, setError] = useState("");
//   const [complaints, setComplaints] = useState([
//     {
//       id: 1,
//       name: "sarjil@example.com",
//       title: "Flight Delay",
//       description: "My flight was delayed by 3 hours without notice.",
//       status: "Pending",
//       time: "2025-07-01 08:30 AM",
//     },
//     {
//       id: 2,
//       name: "sarjil@example.com",
//       title: "Lost Baggage",
//       description: "My baggage didn’t arrive with me.",
//       status: "Resolved",
//       time: "2025-06-27 06:10 PM",
//     },
//   ]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { name, title, description } = formData;
//     if (!name || !title || !description) {
//       setError("⚠️ All fields are required.");
//       return;
//     }

//     const newComplaint = {
//       id: complaints.length + 1,
//       name,
//       title,
//       description,
//       status: "Pending",
//       time: new Date().toLocaleString(),
//     };

//     setComplaints([newComplaint, ...complaints]);
//     setFormData({ name: "", title: "", description: "" });
//     setError("");
//     alert("✅ Complaint submitted successfully!");
//   };

//   return (
//     <div className="passenger-dashboard-new-container">
//       <Sidebar />
//       <div className="passenger-dashboard-main-bright complaints-container">
//         <h2 className="complaint-title">📣 Submit a Complaint</h2>
//         <form onSubmit={handleSubmit} className="complaint-form">
//           {error && <p className="form-error">{error}</p>}
//           <input
//             type="name"
//             name="name"
//             placeholder="Your name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="title"
//             placeholder="Complaint Title"
//             value={formData.title}
//             onChange={handleChange}
//           />
//           <textarea
//             name="description"
//             rows="5"
//             placeholder="Describe your complaint..."
//             value={formData.description}
//             onChange={handleChange}
//           ></textarea>
//           <button type="submit" className="submit-complaint-btn">
//             🚀 Submit Complaint
//           </button>
//         </form>

//         <h3 className="complaint-history-title">📜 Complaint History</h3>
//         <div className="complaint-history">
//           {complaints.map((c) => (
//             <div key={c.id} className="complaint-card">
//               <div className="complaint-header">
//                 <h4>{c.title}</h4>
//                 <span
//                   className={`status-badge ${
//                     c.status === "Resolved" ? "resolved" : "pending"
//                   }`}
//                 >
//                   {c.status}
//                 </span>
//               </div>
//               <p className="complaint-desc">{c.description}</p>
//               <p className="complaint-time">🕒 {c.time}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ComplaintsPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import Sidebar from "../Sidebar";
// import "./complaints.css";
// import "../passenger.css";
// import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

// const ComplaintsPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     title: "",
//     description: "",
//   });
//   const [error, setError] = useState("");
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         setLoading(true);
//         const tokenResponse = await fetch("/api/get-token", {
//           method: "GET",
//           credentials: "include",
//         });
//         if (!tokenResponse.ok) throw new Error("Not authenticated");
//         const { token } = await tokenResponse.json();
//         if (!token) throw new Error("No token found");

//         const response = await fetch("/api/passenger/complaints", {
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

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, title, description } = formData;
//     if (!name || !title || !description) {
//       setError("⚠️ All fields are required.");
//       return;
//     }

//     try {
//       const tokenResponse = await fetch("/api/get-token", {
//         method: "GET",
//         credentials: "include",
//       });
//       if (!tokenResponse.ok) throw new Error("Not authenticated");
//       const { token } = await tokenResponse.json();
//       if (!token) throw new Error("No token found");

//       const response = await fetch("/api/passenger/complaints", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//         body: JSON.stringify({ name, title, description }),
//       });
//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.error || "Failed to submit complaint");
//       }

//       const data = await response.json();
//       setComplaints([data.complaint, ...complaints]);
//       setFormData({ name: "", title: "", description: "" });
//       setError("");
//       alert("✅ Complaint submitted successfully!");
//     } catch (err) {
//       setError(err.message || "Unable to submit complaint");
//       console.error("Submit complaint error:", err);
//     }
//   };

//   return (
//     <div className="passenger-dashboard-new-container">
//       <Sidebar />
//       <div className="passenger-dashboard-main-bright complaints-container">
//         <h2 className="complaint-title">📣 Submit a Complaint</h2>
//         <form onSubmit={handleSubmit} className="complaint-form">
//           {error && <p className="form-error">{error}</p>}
//           <input
//             type="text"
//             name="name"
//             placeholder="Your name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="title"
//             placeholder="Complaint Title"
//             value={formData.title}
//             onChange={handleChange}
//           />
//           <textarea
//             name="description"
//             rows="5"
//             placeholder="Describe your complaint... (Use 'urgent' for high priority)"
//             value={formData.description}
//             onChange={handleChange}
//           ></textarea>
//           <button type="submit" className="submit-complaint-btn">
//             🚀 Submit Complaint
//           </button>
//         </form>

//         <h3 className="complaint-history-title">📜 Complaint History</h3>
//         {loading ? (
//           <p className="loading-text">Loading complaints...</p>
//         ) : complaints.length === 0 ? (
//           <p className="no-complaints">No complaints found.</p>
//         ) : (
//           <div className="complaint-history">
//             {complaints.map((c) => (
//               <div key={c._id} className="complaint-card">
//                 <div className="complaint-header">
//                   <h4>{c.title}</h4>
//                   <div className="complaint-meta">
//                     <span
//                       className={`status-badge ${c.status
//                         .toLowerCase()
//                         .replace(/\s/g, "-")}`}
//                     >
//                       {c.status === "Resolved" && <FaCheckCircle />}
//                       {c.status === "Pending" && <FaClock />}
//                       {c.status === "Cancelled" && <FaTimesCircle />}
//                       {c.status}
//                     </span>
//                     <span
//                       className={`priority-badge ${c.priority.toLowerCase()}`}
//                     >
//                       {c.priority}
//                     </span>
//                   </div>
//                 </div>
//                 <p className="complaint-desc">{c.description}</p>
//                 <p className="complaint-time">
//                   🕒 {new Date(c.submittedAt).toLocaleString()}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ComplaintsPage;

"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import "./complaints.css";
import "../passenger.css";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const ComplaintsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const tokenResponse = await fetch("/api/get-token", {
          method: "GET",
          credentials: "include",
        });
        if (!tokenResponse.ok) throw new Error("Not authenticated");
        const { token } = await tokenResponse.json();
        if (!token) throw new Error("No token found");

        const response = await fetch("/api/passenger/complaints", {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, title, description } = formData;
    if (!name || !title || !description) {
      setError("⚠️ All fields are required.");
      return;
    }

    try {
      const tokenResponse = await fetch("/api/get-token", {
        method: "GET",
        credentials: "include",
      });
      if (!tokenResponse.ok) throw new Error("Not authenticated");
      const { token } = await tokenResponse.json();
      if (!token) throw new Error("No token found");

      const response = await fetch("/api/passenger/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ name, title, description }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit complaint");
      }

      const data = await response.json();
      setComplaints([data.complaint, ...complaints]);
      setFormData({ name: "", title: "", description: "" });
      setError("");
      alert("✅ Complaint submitted successfully!");
    } catch (err) {
      setError(err.message || "Unable to submit complaint");
      console.error("Submit complaint error:", err);
    }
  };

  return (
    <div className="passenger-dashboard-new-container">
      <Sidebar />
      <div className="passenger-dashboard-main-bright complaints-container">
        <h2 className="complaint-title">📣 Submit a Complaint</h2>
        <form onSubmit={handleSubmit} className="complaint-form">
          {error && <p className="form-error">{error}</p>}
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Complaint Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter complaint title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              placeholder="Describe your complaint... (Use 'urgent' for high priority)"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="submit-complaint-btn">
            🚀 Submit Complaint
          </button>
        </form>

        <h3 className="complaint-history-title">📜 Complaint History</h3>
        {loading ? (
          <p className="loading-text">Loading complaints...</p>
        ) : complaints.length === 0 ? (
          <p className="no-complaints">No complaints found.</p>
        ) : (
          <div className="complaint-history">
            {complaints.map((c) => (
              <div key={c._id} className="complaint-card">
                <div className="complaint-header">
                  <h4>{c.title}</h4>
                  <div className="complaint-meta">
                    <span
                      className={`status-badge ${c.status
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                    >
                      {c.status === "Resolved" && <FaCheckCircle />}
                      {c.status === "Pending" && <FaClock />}
                      {c.status === "Cancelled" && <FaTimesCircle />}
                      {c.status === "In Progress" && <FaExclamationCircle />}
                      {c.status}
                    </span>
                    <span
                      className={`priority-badge ${c.priority.toLowerCase()}`}
                    >
                      {c.priority}
                    </span>
                  </div>
                </div>
                <p className="complaint-desc">{c.description}</p>
                <p className="complaint-time">
                  🕒 {new Date(c.submittedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintsPage;
