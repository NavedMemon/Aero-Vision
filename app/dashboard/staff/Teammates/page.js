"use client";
import React, { useEffect, useState } from "react";
import StaffSidebar from "../StaffSideBar";
import "./teammates.css";

export default function Teammates() {
  const [teammates, setTeammates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeammates = async () => {
      try {
        const response = await fetch("/api/staff/teammates", {
          credentials: "include", // Include cookies
        });
        if (!response.ok) {
          throw new Error(
            `Failed to fetch teammates: ${
              response.status
            } ${await response.text()}`
          );
        }
        const data = await response.json();
        console.log("Fetched teammates:", data); // Debug log
        setTeammates(data.teammates || []);
      } catch (err) {
        console.error("Error fetching teammates:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTeammates();
  }, []);

  return (
    <div className="teammates-container">
      <StaffSidebar />
      <div className="teammates-content">
        <h2>Teammates</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && (
          <table className="teammates-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {teammates.length > 0 ? (
                teammates.map((teammate) => (
                  <tr key={teammate._id}>
                    <td>{teammate.name}</td>
                    <td>{teammate.email}</td>
                    <td>{teammate.age}</td>
                    <td>{teammate.gender}</td>
                    <td>{teammate.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No teammates found in your department.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
