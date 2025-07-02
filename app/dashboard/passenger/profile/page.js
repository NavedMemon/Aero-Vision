// "use client";
// import React, { useState } from "react";
// import Sidebar from "../Sidebar";
// import "./profile.css";
// import "../passenger.css";

// const initialProfile = {
//   name: "Sarjil Sheth",
//   email: "sarjil@example.com",
//   phone: "9876543210",
//   age: "22",
//   gender: "Male",
//   nationality: "Indian",
// };

// const ProfilePage = () => {
//   const [profile, setProfile] = useState(initialProfile);
//   const [editMode, setEditMode] = useState(false);
//   const [tempProfile, setTempProfile] = useState(profile);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTempProfile({ ...tempProfile, [name]: value });
//   };

//   const handleSave = () => {
//     setProfile(tempProfile);
//     setEditMode(false);
//     alert("✅ Profile updated successfully!");
//   };

//   const handleCancel = () => {
//     setTempProfile(profile);
//     setEditMode(false);
//   };

//   return (
//     <div className="passenger-dashboard-new-container">
//       <Sidebar />
//       <div className="passenger-dashboard-main-bright profile-container">
//         <h2 className="profile-title">🧑‍✈️ Passenger Profile</h2>
//         <div className="profile-form">
//           {Object.keys(profile).map((key) => (
//             <div className="form-group" key={key}>
//               <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
//               <input
//                 type="text"
//                 name={key}
//                 value={tempProfile[key]}
//                 onChange={handleChange}
//                 readOnly={!editMode}
//               />
//             </div>
//           ))}

//           {!editMode ? (
//             <button className="edit-btn" onClick={() => setEditMode(true)}>
//               ✏️ Edit Profile
//             </button>
//           ) : (
//             <div className="edit-actions">
//               <button className="save-btn" onClick={handleSave}>
//                 💾 Save
//               </button>
//               <button className="cancel-btn" onClick={handleCancel}>
//                 ❌ Cancel
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import "./profile.css";
import "../passenger.css";

const initialProfile = {
  name: "Sarjil Sheth",
  email: "sarjil@example.com",
  age: "22",
  gender: "Male",
};

const ProfilePage = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [tempProfile, setTempProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [hasMounted, setHasMounted] = useState(false); // hydration fix

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setEditMode(false);
    alert("✅ Profile updated successfully!");
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setEditMode(false);
  };

  if (!hasMounted) return null; // avoid hydration mismatch

  return (
    <div className="passenger-dashboard-new-container">
      <Sidebar />
      <div className="passenger-dashboard-main-bright profile-container">
        <h2 className="profile-title">🧑‍✈️ Passenger Profile</h2>
        <div className="profile-form">
          {Object.keys(tempProfile).map((key) => (
            <div className="form-group" key={key}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                type="text"
                name={key}
                value={tempProfile[key]}
                onChange={handleChange}
                readOnly={!editMode}
              />
            </div>
          ))}

          {!editMode ? (
            <button className="edit-btn" onClick={handleEditToggle}>
              ✏️ Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button className="save-btn" onClick={handleSave}>
                💾 Save
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                ❌ Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
