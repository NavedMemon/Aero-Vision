// "use client";

// import React, { useState, useEffect } from "react";
// import StaffSidebar from "../StaffSideBar";
// import "./staffComplaint.css";

// const StaffComplaint = () => {
//   const [hasMounted, setHasMounted] = useState(false);
//   const [form, setForm] = useState({
//     subject: "",
//     category: "",
//     description: "",
//     file: null,
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const validate = () => {
//     let temp = {};
//     if (!form.subject.trim()) temp.subject = "Subject is required.";
//     if (!form.category) temp.category = "Category is required.";
//     if (!form.description.trim()) temp.description = "Description is required.";
//     setErrors(temp);
//     return Object.keys(temp).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     alert("✅ Complaint submitted successfully!");
//     setForm({
//       subject: "",
//       category: "",
//       description: "",
//       file: null,
//     });
//     setErrors({});
//   };

//   if (!hasMounted) return null; // Prevent hydration mismatch

//   return (
//     <div className="staff-dashboard-container">
//       <StaffSidebar />
//       <div className="staff-complaint-container">
//         <h2 className="complaint-title">🛠️ Report an Issue</h2>
//         <form className="complaint-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Subject</label>
//             <input
//               type="text"
//               name="subject"
//               value={form.subject}
//               onChange={handleChange}
//               placeholder="Enter subject"
//             />
//             {errors.subject && <span className="error">{errors.subject}</span>}
//           </div>

//           <div className="form-group">
//             <label>Category</label>
//             <select
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//             >
//               <option value="">Select</option>
//               <option value="Technical">Technical</option>
//               <option value="Boarding">Boarding</option>
//               <option value="Equipment">Equipment</option>
//               <option value="Delay">Delay</option>
//               <option value="Other">Other</option>
//             </select>
//             {errors.category && (
//               <span className="error">{errors.category}</span>
//             )}
//           </div>

//           <div className="form-group">
//             <label>Description</label>
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               placeholder="Describe the issue..."
//               rows={4}
//             />
//             {errors.description && (
//               <span className="error">{errors.description}</span>
//             )}
//           </div>

//           <div className="form-group">
//             <label>Attachment (optional)</label>
//             <input type="file" name="file" onChange={handleChange} />
//           </div>

//           <button type="submit" className="submit-btn">
//             📤 Submit Complaint
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StaffComplaint;

"use client";
import React, { useState, useEffect } from "react";
import StaffSidebar from "../StaffSideBar";
import "./staffComplaint.css";

const StaffComplaint = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [form, setForm] = useState({
    subject: "",
    category: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let temp = {};
    if (!form.subject.trim()) temp.subject = "Subject is required.";
    if (!form.category) temp.category = "Category is required.";
    if (!form.description.trim()) temp.description = "Description is required.";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

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

      console.log("Submitting with token:", token);

      const response = await fetch("/api/staff/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          subject: form.subject,
          category: form.category,
          description: form.description,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit complaint");
      }

      alert("✅ Complaint submitted successfully!");
      setForm({
        subject: "",
        category: "",
        description: "",
      });
      setErrors({});
      setError("");
    } catch (err) {
      setError(err.message || "Unable to submit complaint");
      console.error("Submit complaint error:", err);
    }
  };

  if (!hasMounted) return null;

  return (
    <div className="staff-dashboard-container">
      <StaffSidebar />
      <div className="staff-complaint-container">
        <h2 className="complaint-title">🛠️ Report an Issue</h2>
        {error && <p className="form-error">{error}</p>}
        <form className="complaint-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Enter subject"
            />
            {errors.subject && <span className="error">{errors.subject}</span>}
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Technical">Technical</option>
              <option value="Boarding">Boarding</option>
              <option value="Equipment">Equipment</option>
              <option value="Delay">Delay</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && (
              <span className="error">{errors.category}</span>
            )}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the issue... (Use 'urgent' for high priority)"
              rows={4}
            />
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}
          </div>

          <button type="submit" className="submit-btn">
            📤 Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffComplaint;
