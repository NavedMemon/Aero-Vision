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
    file: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert("✅ Complaint submitted successfully!");
    setForm({
      subject: "",
      category: "",
      description: "",
      file: null,
    });
    setErrors({});
  };

  if (!hasMounted) return null; // Prevent hydration mismatch

  return (
    <div className="staff-dashboard-container">
      <StaffSidebar />
      <div className="staff-complaint-container">
        <h2 className="complaint-title">🛠️ Report an Issue</h2>
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
              placeholder="Describe the issue..."
              rows={4}
            />
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}
          </div>

          <div className="form-group">
            <label>Attachment (optional)</label>
            <input type="file" name="file" onChange={handleChange} />
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
