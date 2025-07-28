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

// "use client";
// import "./register.css";
// import AirplaneCanvas from "./AirplaneCanvas";
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

//   const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

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

//     setError("");
//     alert("✅ Registered Successfully!");
//   };

//   return (
//     <div className="register-container">
//       <div className="register-left">
//         <AirplaneCanvas />
//         <h1 className="brand">AEROVISION</h1>
//       </div>
//       <div className="register-right">
//         <h2 className="register-title">Create Account</h2>
//         {error && <p className="error">{error}</p>}
//         <form className="register-form" onSubmit={handleSubmit}>
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
//           <button type="submit">Register</button>

//           <p className="register-link">
//             Already registered? <a href="/login">Login</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import "./register.css";
// import AirplaneCanvas from "./AirplaneCanvas";

// export default function PassengerRegister() {
//   const [form, setForm] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     email: "",
//     password: "",
//     confirm: "",
//   });

//   const [sentence, setSentence] = useState("");
//   const [spokenText, setSpokenText] = useState("");
//   const [listening, setListening] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     fetch("/api/passenger/register")
//       .then((res) => res.json())
//       .then((data) => setSentence(data.sentence))
//       .catch((err) => console.error("Sentence fetch error:", err));
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const startListening = () => {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Speech Recognition not supported");
//       return;
//     }

//     const recognition = new webkitSpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.continuous = false;
//     recognition.interimResults = false;

//     recognition.onstart = () => setListening(true);
//     recognition.onerror = (e) => {
//       console.error(e);
//       setListening(false);
//     };
//     recognition.onend = () => setListening(false);

//     recognition.onresult = (event) => {
//       const spoken = event.results[0][0].transcript;
//       setSpokenText(spoken);
//     };

//     recognition.start();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

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

//     if (!spokenText || !sentence) {
//       setError("Please speak the sentence.");
//       return;
//     }

//     const payload = {
//       ...form,
//       spokenSentence: spokenText,
//       targetSentence: sentence,
//     };

//     const res = await fetch("/api/passenger/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const result = await res.json();

//     if (!res.ok) {
//       setError(result.error || "Something went wrong.");
//     } else {
//       setSuccess(result.message);
//       setError("");
//       setForm({
//         name: "",
//         age: "",
//         gender: "",
//         email: "",
//         password: "",
//         confirm: "",
//       });
//       setSpokenText("");
//     }
//   };

//   return (
//     <div className="register-container">
//       <div className="register-left">
//         <AirplaneCanvas />
//         <h1 className="brand">AEROVISION</h1>
//       </div>

//       <div className="register-right">
//         <h2 className="register-title">Passenger Registration</h2>

//         {/* {sentence && (
//           <p className="sentence-box">🎯 Speak this: "{sentence}"</p>
//         )}
//         <button type="button" onClick={startListening}>
//           🎤 {listening ? "Listening..." : "Speak Sentence"}
//         </button>
//         <p className="spoken">🗣️ You said: "{spokenText}"</p>

//         {error && <p className="error">{error}</p>}
//         {success && <p className="success">{success}</p>} */}

//         <form className="register-form" onSubmit={handleSubmit}>
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
//           {sentence && (
//             <p className="sentence-box">🎯 Speak this: "{sentence}"</p>
//           )}
//           <p className="spoken">🗣️ You said: "{spokenText}"</p>
//           <div className="mic-container">
//             <button
//               type="button"
//               className="mic-button"
//               onClick={startListening}
//             >
//               🎤 {listening ? "Listening..." : "Speak Sentence"}
//             </button>
//           </div>

//           <button type="submit">Register</button>

//           <p className="register-link">
//             Already registered? <a href="/login">Login</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import "./register.css";
import AirplaneCanvas from "./AirplaneCanvas.js";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    password: "",
    confirm: "",
  });

  const [targetSentence, setTargetSentence] = useState("");
  const [spokenSentence, setSpokenSentence] = useState("");
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/passenger/register")
      .then((res) => res.json())
      .then((data) => setTargetSentence(data.sentence));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMic = () => {
    setListening(true);
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSpokenSentence(transcript);
      setListening(false);
    };
    recognition.onerror = () => {
      setListening(false);
    };
    recognition.start();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    const res = await fetch("/api/passenger/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        spokenSentence,
        targetSentence,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      alert("Passenger registered successfully!");
      setForm({
        name: "",
        email: "",
        age: "",
        gender: "",
        password: "",
        confirm: "",
      });
      setSpokenSentence("");
      window.location.href = "/login";
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <AirplaneCanvas />
        <div className="brand">AeroVision</div>
      </div>
      <div className="register-right">
        <div className="register-title">Passenger Registration</div>
        {error && <div className="error">{error}</div>}
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
          />
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <input
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            placeholder="Confirm Password"
          />

          <div className="sentence-box">
            Speak this: <strong>{targetSentence}</strong>
          </div>

          <div className="mic-container">
            <button
              type="button"
              className={`mic-button ${listening ? "listening" : ""}`}
              onClick={handleMic}
              disabled={listening}
            >
              {listening ? "Listening..." : "🎤 Speak Sentence"}
            </button>
            {spokenSentence && (
              <div className="spoken">You said: "{spokenSentence}"</div>
            )}
          </div>

          <button type="submit">Register</button>
          <p className="register-link">
            Already registered? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
