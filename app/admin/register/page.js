// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import * as faceapi from "face-api.js";
// import "./adminregister.css";

// export default function AdminRegisterPage() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [descriptor, setDescriptor] = useState(null);
//   const videoRef = useRef();

//   // Load face-api.js models
//   useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL = "/models";
//       try {
//         await faceapi.nets.tinyFaceDetector.loadFromUri(
//           `${MODEL_URL}/tiny_face_detector`
//         );
//         await faceapi.nets.faceLandmark68Net.loadFromUri(
//           `${MODEL_URL}/face_landmark_68`
//         );
//         await faceapi.nets.faceRecognitionNet.loadFromUri(
//           `${MODEL_URL}/face_recognition`
//         );
//       } catch (err) {
//         console.error("Model loading failed:", err);
//         setError("Failed to load face models. Check model path.");
//       }
//     };
//     loadModels();
//   }, []);

//   // Start webcam
//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//       videoRef.current.srcObject = stream;
//     });
//   }, []);

//   // Input handler
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Capture face descriptor
//   const handleCapture = async () => {
//     const detection = await faceapi
//       .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
//       .withFaceLandmarks()
//       .withFaceDescriptor();

//     if (!detection) {
//       setError("❌ Face not detected. Try again.");
//       return;
//     }

//     setDescriptor(Array.from(detection.descriptor)); // convert to plain array
//     setError("✅ Face captured successfully.");
//   };

//   // Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.email || !form.password || !descriptor) {
//       setError("All fields and face capture are required.");
//       return;
//     }

//     const res = await fetch("/api/admin/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...form, faceDescriptor: descriptor }),
//     });

//     const data = await res.json();
//     if (data.success) {
//       alert("✅ Admin registered!");
//       setForm({ email: "", password: "" });
//       setDescriptor(null);
//     } else {
//       setError(data.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="admin-register-wrapper">
//       <div className="admin-form-container">
//         <h2>👨‍✈️ Admin Registration</h2>
//         <form onSubmit={handleSubmit} className="admin-form">
//           <input
//             type="email"
//             name="email"
//             placeholder="Admin Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />
//           <button type="button" className="capture-btn" onClick={handleCapture}>
//             📸 Capture Face
//           </button>
//           <button type="submit" className="submit-btn">
//             📝 Register
//           </button>
//         </form>
//         {error && <p className="error">{error}</p>}
//       </div>

//       <div className="video-box">
//         <video ref={videoRef} autoPlay muted width="320" height="240" />
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import "./adminregister.css";

function AdminRegisterPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [descriptor, setDescriptor] = useState(null);
  const videoRef = useRef();

  // Load face-api.js models (client-side only)
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(
          `${MODEL_URL}/tiny_face_detector`
        );
        await faceapi.nets.faceLandmark68Net.loadFromUri(
          `${MODEL_URL}/face_landmark_68`
        );
        await faceapi.nets.faceRecognitionNet.loadFromUri(
          `${MODEL_URL}/face_recognition`
        );
      } catch (err) {
        console.error("Model loading failed:", err);
        setError("❌ Failed to load face models. Check /models folder.");
      }
    };
    loadModels();
  }, []);

  // Start webcam
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Capture face
  const handleCapture = async () => {
    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      setError("❌ Face not detected. Try again.");
      return;
    }

    // const vector = Array.from(detection.descriptor); // Float32Array -> plain array
    // setDescriptor(vector);
    setDescriptor(Array.from(detection.descriptor));

    setError("✅ Face captured successfully.");
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || !descriptor) {
      setError("❌ All fields and face capture are required.");
      return;
    }

    const res = await fetch("/api/admin/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, faceDescriptor: descriptor }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Admin registered successfully.");
      setForm({ email: "", password: "" });
      setDescriptor(null);
      setError("");
    } else {
      setError(data.error || "❌ Registration failed.");
    }
  };

  return (
    <div className="admin-register-wrapper">
      <div className="admin-form-container">
        <h2>👨‍✈️ Admin Registration</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="button" className="capture-btn" onClick={handleCapture}>
            📸 Capture Face
          </button>
          <button type="submit" className="submit-btn">
            📝 Register
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>

      <div className="video-box">
        <video ref={videoRef} autoPlay muted width="320" height="240" />
      </div>
    </div>
  );
}

// ✅ Export wrapped in dynamic to disable SSR and avoid hydration error
import dynamic from "next/dynamic";
export default dynamic(() => Promise.resolve(AdminRegisterPage), {
  ssr: false,
});
