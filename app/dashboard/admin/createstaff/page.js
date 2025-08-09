// "use client";
// import React, { useEffect, useState } from "react";
// import AdminSidebar from "../AdminSidebar";
// import "./createstaff.css";
// import "../admin.css";

// const CreateStaffPage = () => {
//   const [form, setForm] = useState({
//     name: "",
//     gender: "",
//     age: "",
//     role: "Ground Staff",
//     email: "",
//     password: "",
//   });

//   const [staffList, setStaffList] = useState([]);

//   const fetchStaff = async () => {
//     const res = await fetch("/api/admin/createstaff");
//     const data = await res.json();
//     setStaffList(data);
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch("/api/admin/createstaff", {
//       method: "POST",
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert("Staff Created");
//       setForm({
//         name: "",
//         gender: "",
//         age: "",
//         role: "Ground Staff",
//         email: "",
//         password: "",
//       });
//       fetchStaff();
//     } else {
//       alert(data.error || "Something went wrong");
//     }
//   };

//   useEffect(() => {
//     fetchStaff();
//   }, []);

//   return (
//     <div className="admin-create-staff-container">
//       <AdminSidebar />
//       <div className="admin-create-staff-content">
//         <h2>Create Staff Member</h2>
//         <form className="staff-form" onSubmit={handleSubmit}>
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Name"
//             required
//           />
//           <select
//             name="gender"
//             value={form.gender}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//           <input
//             name="age"
//             value={form.age}
//             onChange={handleChange}
//             type="number"
//             placeholder="Age"
//             required
//           />
//           <select
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//             required
//           >
//             <option value="Ground Staff">Ground Staff</option>
//             <option value="Security">Security</option>
//             <option value="Maintenance">Maintenance</option>
//             <option value="Other">Other</option>
//           </select>
//           <input
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             type="email"
//             placeholder="Email"
//             required
//           />
//           <input
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             type="password"
//             placeholder="Password"
//             required
//           />
//           <button type="submit">Create</button>
//         </form>

//         <h3>All Staff Members</h3>
//         <table className="staff-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Gender</th>
//               <th>Age</th>
//               <th>Role</th>
//               <th>Email</th>
//             </tr>
//           </thead>
//           <tbody>
//             {staffList.map((s) => (
//               <tr key={s._id}>
//                 <td>{s.name}</td>
//                 <td>{s.gender}</td>
//                 <td>{s.age}</td>
//                 <td>{s.role}</td>
//                 <td>{s.email}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CreateStaffPage;

// "use client";
// import React, { useEffect, useState } from "react";
// import AdminSidebar from "../AdminSidebar";
// import "./createstaff.css";
// import "../admin.css";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const CreateStaffPage = () => {
//   const [form, setForm] = useState({
//     name: "",
//     gender: "",
//     age: "",
//     role: "Ground Staff",
//     email: "",
//     password: "",
//   });

//   const [staffList, setStaffList] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   const fetchStaff = async () => {
//     const res = await fetch("/api/admin/createstaff");
//     const data = await res.json();
//     setStaffList(data);
//   };

//   useEffect(() => {
//     fetchStaff();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url = "/api/admin/createstaff";
//     const method = editingId ? "PATCH" : "POST";

//     const res = await fetch(url, {
//       method,
//       body: JSON.stringify(editingId ? { _id: editingId, ...form } : form),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert(editingId ? "Staff updated" : "Staff created");
//       setForm({
//         name: "",
//         gender: "",
//         age: "",
//         role: "Ground Staff",
//         email: "",
//         password: "",
//       });
//       setEditingId(null);
//       fetchStaff();
//     } else {
//       alert(data.error || "Something went wrong");
//     }
//   };

//   const handleEdit = (staff) => {
//     setForm({
//       name: staff.name,
//       gender: staff.gender,
//       age: staff.age,
//       role: staff.role,
//       email: staff.email,
//       password: "",
//     });
//     setEditingId(staff._id);
//   };

//   const handleDelete = async (id) => {
//     const confirm = window.confirm("Are you sure to delete?");
//     if (!confirm) return;

//     const res = await fetch("/api/admin/createstaff", {
//       method: "DELETE",
//       body: JSON.stringify({ id }),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert("Deleted");
//       fetchStaff();
//     } else {
//       alert(data.error || "Failed to delete");
//     }
//   };

//   return (
//     <div className="admin-create-staff-container">
//       <AdminSidebar />
//       <div className="admin-create-staff-content">
//         <h2>{editingId ? "Edit Staff Member" : "Create Staff Member"}</h2>
//         <form className="staff-form" onSubmit={handleSubmit}>
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Name"
//             required
//           />
//           <select
//             name="gender"
//             value={form.gender}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//           <input
//             name="age"
//             value={form.age}
//             onChange={handleChange}
//             type="number"
//             placeholder="Age"
//             required
//           />
//           <select
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//             required
//           >
//             <option value="Ground Staff">Ground Staff</option>
//             <option value="Security">Security</option>
//             <option value="Maintenance">Maintenance</option>
//             <option value="Other">Other</option>
//           </select>
//           <input
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             type="email"
//             placeholder="Email"
//             required
//           />
//           <input
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             type="password"
//             placeholder="Password"
//             required={!editingId}
//           />
//           <button type="submit">{editingId ? "Update" : "Create"}</button>
//         </form>

//         <h3>All Staff Members</h3>
//         <table className="staff-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Gender</th>
//               <th>Age</th>
//               <th>Role</th>
//               <th>Email</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {staffList.map((s) => (
//               <tr key={s._id}>
//                 <td>{s.name}</td>
//                 <td>{s.gender}</td>
//                 <td>{s.age}</td>
//                 <td>{s.role}</td>
//                 <td>{s.email}</td>
//                 <td>
//                   <FaEdit
//                     className="action-icon"
//                     onClick={() => handleEdit(s)}
//                   />
//                   <FaTrash
//                     className="action-icon"
//                     onClick={() => handleDelete(s._id)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CreateStaffPage;

// "use client";
// import React, { useEffect, useState } from "react";
// import AdminSidebar from "../AdminSidebar";
// import "./createstaff.css";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import "../admin.css";

// const perPage = 7;

// export default function CreateStaffPage() {
//   const [form, setForm] = useState({
//     name: "",
//     gender: "",
//     age: "",
//     role: "Ground Staff",
//     email: "",
//     password: "",
//   });
//   const [staffList, setStaffList] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [search, setSearch] = useState("");
//   const [filterRole, setFilterRole] = useState("");
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);

//   const fetchStaff = async () => {
//     const qp = new URLSearchParams({
//       page,
//       perPage,
//       ...(search && { search }),
//       ...(filterRole && { filterRole }),
//     });
//     const res = await fetch(`/api/admin/createstaff?${qp}`);
//     const data = await res.json();
//     setStaffList(data.staff);
//     setTotal(data.total);
//   };

//   useEffect(() => {
//     fetchStaff();
//   }, [page, search, filterRole]);

//   const resetForm = () => {
//     setForm({
//       name: "",
//       gender: "",
//       age: "",
//       role: "Ground Staff",
//       email: "",
//       password: "",
//     });
//     setEditingId(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url = "/api/admin/createstaff";
//     const method = editingId ? "PATCH" : "POST";
//     const payload = editingId ? { _id: editingId, ...form } : form;
//     const res = await fetch(url, { method, body: JSON.stringify(payload) });
//     const data = await res.json();
//     if (res.ok) {
//       alert(editingId ? "Updated" : "Created");
//       resetForm();
//       fetchStaff();
//     } else alert(data.error);
//   };

//   const handleEdit = (staff) => {
//     setForm({ ...staff, password: "" });
//     setEditingId(staff._id);
//   };
//   const handleDelete = async (id) => {
//     if (!confirm("Delete staff?")) return;
//     const res = await fetch("/api/admin/createstaff", {
//       method: "DELETE",
//       body: JSON.stringify({ id }),
//     });
//     const data = await res.json();
//     if (res.ok) fetchStaff();
//     else alert(data.error);
//   };

//   const totalPages = Math.ceil(total / perPage);

//   return (
//     <div className="admin-create-staff-container">
//       <AdminSidebar />
//       <div className="admin-content">
//         <h2>{editingId ? "Edit" : "Create"} Staff Member</h2>

//         <div className="staff-controls">
//           <input
//             placeholder="Search name or email"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <select
//             value={filterRole}
//             onChange={(e) => setFilterRole(e.target.value)}
//           >
//             <option value="">All Roles</option>
//             {["Ground Staff", "Security", "Maintenance", "Other"].map((r) => (
//               <option key={r}>{r}</option>
//             ))}
//           </select>
//         </div>

//         <form className="staff-form" onSubmit={handleSubmit}>
//           <input
//             name="name"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             placeholder="Name"
//             required
//           />
//           <select
//             name="gender"
//             value={form.gender}
//             onChange={(e) => setForm({ ...form, gender: e.target.value })}
//             required
//           >
//             <option value="">Select Gender</option>
//             <option>Male</option>
//             <option>Female</option>
//           </select>
//           <input
//             name="age"
//             value={form.age}
//             onChange={(e) => setForm({ ...form, age: e.target.value })}
//             placeholder="Age"
//             type="number"
//             required
//           />
//           <select
//             name="role"
//             value={form.role}
//             onChange={(e) => setForm({ ...form, role: e.target.value })}
//             required
//           >
//             <option>Ground Staff</option>
//             <option>Security</option>
//             <option>Maintenance</option>
//             <option>Other</option>
//           </select>
//           <input
//             name="email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             placeholder="Email"
//             type="email"
//             required
//           />
//           <input
//             name="password"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             type="password"
//             placeholder={editingId ? "Leave empty to keep current" : "Password"}
//             required={!editingId}
//             disabled={editingId}
//           />
//           <button type="submit">{editingId ? "Update" : "Create"}</button>
//         </form>

//         <table className="staff-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Gender</th>
//               <th>Age</th>
//               <th>Role</th>
//               <th>Email</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {staffList.map((s) => (
//               <tr key={s._id}>
//                 <td>{s.name}</td>
//                 <td>{s.gender}</td>
//                 <td>{s.age}</td>
//                 <td>{s.role}</td>
//                 <td>{s.email}</td>
//                 <td>
//                   <FaEdit
//                     className="action-icon"
//                     onClick={() => handleEdit(s)}
//                   />
//                   <FaTrash
//                     className="action-icon"
//                     onClick={() => handleDelete(s._id)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {totalPages > 1 && (
//           <div className="pagination">
//             <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//               Prev
//             </button>
//             <span>
//               Page {page} of {totalPages}
//             </span>
//             <button
//               disabled={page === totalPages}
//               onClick={() => setPage(page + 1)}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import AdminSidebar from "../AdminSidebar";
import "./createstaff.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../admin.css";

const perPage = 7;

export default function CreateStaffPage() {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    age: "",
    role: "Ground Staff",
    email: "",
    password: "",
    isTeamLeader: false,
  });
  const [staffList, setStaffList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchStaff = async () => {
    const qp = new URLSearchParams({
      page,
      perPage,
      ...(search && { search }),
      ...(filterRole && { filterRole }),
    });
    const res = await fetch(`/api/admin/createstaff?${qp}`);
    const data = await res.json();
    setTotal(data.total);
    setStaffList(data.staff);
  };

  useEffect(() => {
    fetchStaff();
  }, [page, search, filterRole]);

  const resetForm = () => {
    setForm({
      name: "",
      gender: "",
      age: "",
      role: "Ground Staff",
      email: "",
      password: "",
      isTeamLeader: false,
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "/api/admin/createstaff";
    const method = editingId ? "PATCH" : "POST";
    const payload = editingId ? { _id: editingId, ...form } : form;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      alert(editingId ? "Updated" : "Created");
      resetForm();
      fetchStaff();
    } else {
      alert(data.error || "An error occurred");
    }
  };

  const handleEdit = (staff) => {
    setForm({ ...staff, password: "", isTeamLeader: !!staff.isTeamLeader });
    setEditingId(staff._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete staff?")) return;
    const res = await fetch("/api/admin/createstaff", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (res.ok) fetchStaff();
    else alert(data.error);
  };

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="admin-create-staff-container">
      <AdminSidebar />
      <div className="admin-content">
        <h2>{editingId ? "Edit" : "Create"} Staff Member</h2>

        <div className="staff-controls">
          <input
            placeholder="Search name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">All Roles</option>
            {["Ground Staff", "Security", "Maintenance", "Other"].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        <form className="staff-form" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            required
          />
          <select
            name="gender"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <input
            name="age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            placeholder="Age"
            type="number"
            required
          />
          <select
            name="role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
          >
            <option>Ground Staff</option>
            <option>Security</option>
            <option>Maintenance</option>
            <option>Other</option>
          </select>
          <input
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            type="email"
            required
          />
          <input
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            type="password"
            placeholder={editingId ? "Leave empty to keep current" : "Password"}
            required={!editingId}
            disabled={editingId}
          />
          <select
            name="isTeamLeader"
            value={form.isTeamLeader}
            onChange={(e) =>
              setForm({ ...form, isTeamLeader: e.target.value === "true" })
            }
            required
          >
            <option value={false}>Not Team Leader</option>
            <option value={true}>Team Leader</option>
          </select>
          <button type="submit">{editingId ? "Update" : "Create"}</button>
        </form>

        <table className="staff-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Role</th>
              <th>Email</th>
              <th>Team Leader</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.gender}</td>
                <td>{s.age}</td>
                <td>{s.role}</td>
                <td>{s.email}</td>
                <td>{s.isTeamLeader ? "Yes" : "No"}</td>
                <td>
                  <FaEdit
                    className="action-icon"
                    onClick={() => handleEdit(s)}
                  />
                  <FaTrash
                    className="action-icon"
                    onClick={() => handleDelete(s._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
