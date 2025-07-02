// "use client";
// import "./register.css";
// import aerologo from "@/public/images/airplane-logo.png.jpg";
// import Image from "next/image";
// import { useState } from "react";

// export default function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     email: "",
//     password: "",
//     confirm: "",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const isEmailValid = (email) => {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Field Validation
//     if (
//       !form.name ||
//       !form.age ||
//       !form.gender ||
//       !form.email ||
//       !form.password ||
//       !form.confirm
//     ) {
//       setError("All fields are required.");
//       return;
//     }

//     if (!isNaN(form.name[0])) {
//       setError("Name cannot start with a number.");
//       return;
//     }

//     if (!isEmailValid(form.email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     if (Number(form.age) <= 0) {
//       setError("Age must be greater than 0.");
//       return;
//     }

//     if (form.password.length < 6) {
//       setError("Password must be at least 6 characters.");
//       return;
//     }

//     if (form.password !== form.confirm) {
//       setError("Passwords do not match.");
//       return;
//     }

//     // Passed All Checks
//     setError("");
//     alert("🎉 Registration successful!");
//     // Submit logic here
//   };

//   return (
//     <div className="register-container">
//       {/* Left Side: Logo */}
//       <div className="register-left">
//         <div className="logo-wrapper">
//           <Image src={aerologo} alt="Airplane Logo" className="register-logo" />
//           <h1 className="brand-text">AEROVISION</h1>
//         </div>
//       </div>

//       {/* Right Side: Form */}
//       <div className="register-right">
//         <h2 className="register-title">Create Account</h2>
//         <form className="register-form" onSubmit={handleSubmit}>
//           {error && <p className="error">{error}</p>}

//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//           />
//           <input
//             type="number"
//             name="age"
//             placeholder="Age"
//             value={form.age}
//             onChange={handleChange}
//           />
//           <select name="gender" value={form.gender} onChange={handleChange}>
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="confirm"
//             placeholder="Confirm Password"
//             value={form.confirm}
//             onChange={handleChange}
//           />
//           <button type="submit" className="register-btn">
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";
import "./register.css";
import AirplaneCanvas from "./AirplaneCanvas";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.age ||
      !form.gender ||
      !form.email ||
      !form.password ||
      !form.confirm
    ) {
      setError("All fields are required.");
      return;
    }

    if (!isNaN(form.name[0])) {
      setError("Name cannot start with a number.");
      return;
    }

    if (!isEmailValid(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (Number(form.age) <= 0) {
      setError("Age must be greater than 0.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    alert("✅ Registered Successfully!");
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <AirplaneCanvas />
        <h1 className="brand">AEROVISION</h1>
      </div>
      <div className="register-right">
        <h2 className="register-title">Create Account</h2>
        {error && <p className="error">{error}</p>}
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
          />
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            value={form.confirm}
            onChange={handleChange}
          />
          <button type="submit">Register</button>

          <p className="register-link">
            Already registered? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
