// "use client";
// import "./login.css";
// import Image from "next/image";
// import aerologo from "@/public/images/airplane-logo.png.jpg";
// import { useState } from "react";
// import dynamic from "next/dynamic";

// const AirplaneCanvas = dynamic(() => import("./AirplaneCanvas"), {
//   ssr: false,
// });

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!form.email || !form.password) {
//       setError("Both fields are required.");
//       return;
//     }
//     setError("");
//     alert("✅ Login Successful!");
//   };

//   return (
//     <div className="login-container">
//       <div className="login-left">
//         <div className="logo-wrapper">
//           <Image src={aerologo} alt="Airplane Logo" className="login-logo" />
//           <h1 className="brand-text">AEROVISION</h1>
//         </div>
//       </div>

//       <div className="login-right">
//         <h2 className="login-title">Welcome Back</h2>
//         <form className="login-form" onSubmit={handleSubmit}>
//           {error && <p className="error">{error}</p>}
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
//           <button type="submit" className="login-btn">
//             Login
//           </button>
//           <p className="login-link">
//             Don't have an account? <a href="/register">Register</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// "use client";

// import "./login.css";
// import Image from "next/image";
// import aerologo from "@/public/images/airplane-logo.png.jpg";
// import { useState, useRef, useEffect } from "react";
// import dynamic from "next/dynamic";
// import * as faceapi from "face-api.js";
// import { generateToken } from "@/lib/auth";

// // const AirplaneCanvas = dynamic(() => import("./AirplaneCanvas"), {
// //   ssr: false,
// // });

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [stage, setStage] = useState("form"); // form, face, success
//   const [serverDescriptor, setServerDescriptor] = useState(null);
//   const videoRef = useRef();
//   const [boxColor, setBoxColor] = useState("green");

//   useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL = "/models";
//       await faceapi.nets.tinyFaceDetector.loadFromUri(
//         `${MODEL_URL}/tiny_face_detector`
//       );
//       await faceapi.nets.faceLandmark68Net.loadFromUri(
//         `${MODEL_URL}/face_landmark_68`
//       );
//       await faceapi.nets.faceRecognitionNet.loadFromUri(
//         `${MODEL_URL}/face_recognition`
//       );
//     };
//     loadModels();
//   }, []);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.email || !form.password) {
//       setError("❌ Both fields are required.");
//       return;
//     }

//     const res = await fetch("/api/admin/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       setError(data.error);
//       return;
//     }

//     setServerDescriptor(data.faceDescriptor);
//     setStage("face");

//     navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//       videoRef.current.srcObject = stream;
//     });
//   };

//   const handleFaceVerification = async () => {
//     const detection = await faceapi
//       .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
//       .withFaceLandmarks()
//       .withFaceDescriptor();

//     if (!detection) {
//       setBoxColor("red");
//       setError("❌ Face not detected.");
//       return;
//     }

//     const distance = faceapi.euclideanDistance(
//       new Float32Array(serverDescriptor),
//       detection.descriptor
//     );

//     if (distance < 0.45) {
//       const token = generateToken({ email: form.email });
//       localStorage.setItem("adminToken", token);
//       setError("");
//       setStage("success");
//       alert("✅ Admin Login Successful");
//       window.location.href = "/admin/dashboard";
//     } else {
//       setBoxColor("red");
//       setError("❌ Face does not match.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-left">
//         <div className="logo-wrapper">
//           <Image src={aerologo} alt="Airplane Logo" className="login-logo" />
//           <h1 className="brand-text">AEROVISION</h1>
//         </div>
//         {/* <AirplaneCanvas /> */}
//       </div>

//       <div className="login-right">
//         <h2 className="login-title">Welcome Back Admin</h2>

//         {stage === "form" && (
//           <form className="login-form" onSubmit={handleSubmit}>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//             />
//             <button type="submit" className="login-btn">
//               Login
//             </button>
//           </form>
//         )}

//         {stage === "face" && (
//           <>
//             <video
//               ref={videoRef}
//               autoPlay
//               muted
//               width="320"
//               height="240"
//               style={{
//                 border: `3px solid ${boxColor}`,
//                 borderRadius: "5px",
//                 marginBottom: "10px",
//               }}
//             />
//             <button className="login-btn" onClick={handleFaceVerification}>
//               🔍 Verify Face
//             </button>
//           </>
//         )}

//         {error && <p className="error">{error}</p>}
//       </div>
//     </div>
//   );
// }

// "use client";

// import "./login.css";
// import Image from "next/image";
// import aerologo from "@/public/images/airplane-logo.png.jpg";
// import { useState, useRef, useEffect } from "react";
// import * as faceapi from "face-api.js";
// import { generateToken } from "@/lib/auth";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [stage, setStage] = useState("form");
//   const [serverDescriptor, setServerDescriptor] = useState(null);
//   const videoRef = useRef();
//   const [boxColor, setBoxColor] = useState("green");

//   useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL = "/models";
//       await faceapi.nets.tinyFaceDetector.loadFromUri(
//         `${MODEL_URL}/tiny_face_detector`
//       );
//       await faceapi.nets.faceLandmark68Net.loadFromUri(
//         `${MODEL_URL}/face_landmark_68`
//       );
//       await faceapi.nets.faceRecognitionNet.loadFromUri(
//         `${MODEL_URL}/face_recognition`
//       );
//     };
//     loadModels();
//   }, []);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setError("");

//   //   const res = await fetch("/api/admin/login", {
//   //     method: "POST",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify(form),
//   //   });

//   //   const data = await res.json();
//   //   if (!res.ok) return setError(data.error || "Login failed");

//   //   setServerDescriptor(data.faceDescriptor);
//   //   setStage("face");

//   //   navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//   //     videoRef.current.srcObject = stream;
//   //   });
//   // };

//   // const handleFaceVerification = async () => {
//   //   const detection = await faceapi
//   //     .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
//   //     .withFaceLandmarks()
//   //     .withFaceDescriptor();

//   //   if (!detection) {
//   //     setBoxColor("red");
//   //     setError("❌ Face not detected.");
//   //     return;
//   //   }

//   //   const distance = faceapi.euclideanDistance(
//   //     new Float32Array(serverDescriptor),
//   //     detection.descriptor
//   //   );

//   //   if (distance < 0.45) {
//   //     const token = generateToken({ email: form.email });
//   //     localStorage.setItem("adminToken", token);
//   //     alert("✅ Admin Login Successful");
//   //     window.location.href = "/dashboard/admin";
//   //   } else {
//   //     setBoxColor("red");
//   //     setError("❌ Face does not match.");
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     const res = await fetch("/api/admin/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     if (!res.ok) return setError(data.error || "Login failed");

//     setServerDescriptor(data.faceDescriptor);
//     localStorage.setItem("pendingToken", data.token); // ✅ store for now
//     setStage("face");

//     navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//       videoRef.current.srcObject = stream;
//     });
//   };

//   const handleFaceVerification = async () => {
//     const detection = await faceapi
//       .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
//       .withFaceLandmarks()
//       .withFaceDescriptor();

//     if (!detection) {
//       setBoxColor("red");
//       setError("❌ Face not detected.");
//       return;
//     }

//     const distance = faceapi.euclideanDistance(
//       new Float32Array(serverDescriptor),
//       detection.descriptor
//     );

//     if (distance < 0.45) {
//       // ✅ Use token from earlier response
//       const token = localStorage.getItem("pendingToken");
//       localStorage.setItem("adminToken", token); // Now finalized
//       alert("✅ Admin Login Successful");
//       window.location.href = "/dashboard/admin";
//     } else {
//       setBoxColor("red");
//       setError("❌ Face does not match.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-left">
//         <div className="logo-wrapper">
//           <Image src={aerologo} alt="Airplane Logo" className="login-logo" />
//           <h1 className="brand-text">AEROVISION</h1>
//         </div>
//       </div>

//       <div className="login-right">
//         <h2 className="login-title">Welcome Back Admin</h2>

//         {stage === "form" && (
//           <form className="login-form" onSubmit={handleSubmit}>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               required
//             />
//             <button type="submit" className="login-btn">
//               Login
//             </button>
//           </form>
//         )}

//         {stage === "face" && (
//           <>
//             <video
//               ref={videoRef}
//               autoPlay
//               muted
//               width="320"
//               height="240"
//               style={{
//                 border: `3px solid ${boxColor}`,
//                 borderRadius: "5px",
//                 marginBottom: "10px",
//               }}
//             />
//             <button className="login-btn" onClick={handleFaceVerification}>
//               🔍 Verify Face
//             </button>
//           </>
//         )}

//         {error && <p className="error">{error}</p>}
//       </div>
//     </div>
//   );
// }

// "use client";

// import "./login.css";
// import Image from "next/image";
// import aerologo from "@/public/images/airplane-logo.png.jpg";
// import { useState, useRef, useEffect } from "react";
// import * as faceapi from "face-api.js";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [stage, setStage] = useState("form");
//   const [serverDescriptor, setServerDescriptor] = useState(null);
//   const videoRef = useRef();
//   const canvasRef = useRef();
//   const [boxColor, setBoxColor] = useState("green");

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const loadModels = async () => {
//         const MODEL_URL = "/models";
//         await faceapi.nets.tinyFaceDetector.loadFromUri(
//           `${MODEL_URL}/tiny_face_detector`
//         );
//         await faceapi.nets.faceLandmark68Net.loadFromUri(
//           `${MODEL_URL}/face_landmark_68`
//         );
//         await faceapi.nets.faceRecognitionNet.loadFromUri(
//           `${MODEL_URL}/face_recognition`
//         );
//       };
//       loadModels();
//     }
//   }, []);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     const res = await fetch("/api/admin/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     if (!res.ok) return setError(data.error || "Login failed");

//     setServerDescriptor(data.faceDescriptor);
//     localStorage.setItem("pendingToken", data.token);
//     setStage("face");

//     navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//       videoRef.current.srcObject = stream;
//     });
//   };

//   const handleFaceVerification = async () => {
//     const detection = await faceapi
//       .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
//       .withFaceLandmarks()
//       .withFaceDescriptor();

//     const canvas = canvasRef.current;
//     faceapi.matchDimensions(canvas, videoRef.current);

//     if (!detection) {
//       setBoxColor("red");
//       setError("❌ Face not detected.");
//       canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
//       return;
//     }

//     // Draw detection box
//     const resized = faceapi.resizeResults(detection, {
//       width: videoRef.current.videoWidth,
//       height: videoRef.current.videoHeight,
//     });
//     canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
//     faceapi.draw.drawDetections(canvas, resized);

//     const distance = faceapi.euclideanDistance(
//       new Float32Array(serverDescriptor),
//       detection.descriptor
//     );

//     if (distance < 0.45) {
//       const token = localStorage.getItem("pendingToken");
//       localStorage.setItem("adminToken", token);
//       alert("✅ Admin Login Successful");
//       window.location.href = "/dashboard/admin";
//     } else {
//       setBoxColor("red");
//       setError("❌ Face does not match.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-left">
//         <div className="logo-wrapper">
//           <Image src={aerologo} alt="Airplane Logo" className="login-logo" />
//           <h1 className="brand-text">AEROVISION</h1>
//         </div>
//       </div>

//       <div className="login-right">
//         <h2 className="login-title">Welcome Back Admin</h2>

//         {stage === "form" && (
//           <form className="login-form" onSubmit={handleSubmit}>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               required
//             />
//             <button type="submit" className="login-btn">
//               Login
//             </button>
//           </form>
//         )}

//         {stage === "face" && (
//           <>
//             <div className="video-container">
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 muted
//                 width="400"
//                 height="300"
//                 className="webcam-video"
//               />
//               <canvas ref={canvasRef} className="face-canvas" />
//             </div>
//             <button className="login-btn" onClick={handleFaceVerification}>
//               🔍 Verify Face
//             </button>
//           </>
//         )}

//         {error && <p className="error">{error}</p>}
//       </div>
//     </div>
//   );
// }

// "use client";

// import "./login.css";
// import Image from "next/image";
// import aerologo from "@/public/images/airplane-logo.png.jpg";
// import { useState, useRef, useEffect } from "react";
// import * as faceapi from "face-api.js";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [stage, setStage] = useState("form");
//   const [serverDescriptor, setServerDescriptor] = useState(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     setIsMounted(true); // ensures client-only rendering starts after mount

//     const loadModels = async () => {
//       const MODEL_URL = "/models";
//       await faceapi.nets.tinyFaceDetector.loadFromUri(
//         `${MODEL_URL}/tiny_face_detector`
//       );
//       await faceapi.nets.faceLandmark68Net.loadFromUri(
//         `${MODEL_URL}/face_landmark_68`
//       );
//       await faceapi.nets.faceRecognitionNet.loadFromUri(
//         `${MODEL_URL}/face_recognition`
//       );
//     };

//     loadModels();
//   }, []);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     const res = await fetch("/api/admin/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       setError(data.error || "Login failed");
//       return;
//     }

//     setServerDescriptor(data.faceDescriptor);
//     localStorage.setItem("pendingToken", data.token);
//     setStage("face");

//     // Start webcam
//     if (typeof window !== "undefined") {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     }
//   };

//   const handleFaceVerification = async () => {
//     const detection = await faceapi
//       .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
//       .withFaceLandmarks()
//       .withFaceDescriptor();

//     const canvas = canvasRef.current;
//     faceapi.matchDimensions(canvas, videoRef.current);

//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     if (!detection) {
//       ctx.strokeStyle = "red";
//       ctx.lineWidth = 4;
//       ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20); // draw a red box
//       setError("❌ Face not detected.");
//       return;
//     }

//     const resized = faceapi.resizeResults(detection, {
//       width: videoRef.current.videoWidth,
//       height: videoRef.current.videoHeight,
//     });

//     faceapi.draw.drawDetections(canvas, resized);

//     const distance = faceapi.euclideanDistance(
//       new Float32Array(serverDescriptor),
//       detection.descriptor
//     );

//     if (distance < 0.45) {
//       const token = localStorage.getItem("pendingToken");
//       localStorage.setItem("adminToken", token);
//       alert("✅ Admin Login Successful");
//       stopCamera();
//       window.location.href = "/dashboard/admin";
//     } else {
//       setError("❌ Face does not match.");
//     }
//   };

//   const stopCamera = () => {
//     const stream = videoRef.current?.srcObject;
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-left">
//         <div className="logo-wrapper">
//           <Image src={aerologo} alt="Airplane Logo" className="login-logo" />
//           <h1 className="brand-text">AEROVISION</h1>
//         </div>
//       </div>

//       <div className="login-right">
//         <h2 className="login-title">Welcome Back Admin</h2>

//         {stage === "form" && (
//           <form className="login-form" onSubmit={handleSubmit}>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               required
//             />
//             <button type="submit" className="login-btn">
//               Login
//             </button>
//             <p className="login-link">
//               Don't have an account? <a href="/register">Register</a>
//             </p>
//           </form>
//         )}

//         {/* ✅ Only render face UI if mounted */}
//         {stage === "face" && isMounted && (
//           <>
//             <div className="video-container" style={{ position: "relative" }}>
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 muted
//                 width="400"
//                 height="300"
//                 className="webcam-video"
//               />
//               <canvas
//                 ref={canvasRef}
//                 width="400"
//                 height="300"
//                 className="face-canvas"
//                 style={{ position: "absolute", top: 0, left: 0 }}
//               />
//             </div>
//             <button className="login-btn" onClick={handleFaceVerification}>
//               🔍 Verify Face
//             </button>
//           </>
//         )}

//         {error && <p className="error">{error}</p>}
//       </div>
//     </div>
//   );
// }

"use client";
import "./login.css";
import Image from "next/image";
import aerologo from "@/public/images/airplane-logo.png.jpg";
import { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [stage, setStage] = useState("form"); // form | face | speech
  const [serverDescriptor, setServerDescriptor] = useState(null);
  const [targetSentence, setTargetSentence] = useState("");
  const [spokenSentence, setSpokenSentence] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    // load face-api models for admin login
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(
        `${MODEL_URL}/tiny_face_detector`
      );
      await faceapi.nets.faceLandmark68Net.loadFromUri(
        `${MODEL_URL}/face_landmark_68`
      );
      await faceapi.nets.faceRecognitionNet.loadFromUri(
        `${MODEL_URL}/face_recognition`
      );
    };
    loadModels();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSpokenSentence("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Login failed");
      return;
    }

    if (data.faceDescriptor) {
      // Admin login branch
      setServerDescriptor(data.faceDescriptor);
      localStorage.setItem("pendingToken", data.token);
      setStage("face");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } else if (data.requireSpeech) {
      localStorage.setItem("pendingPassengerToken", data.token);
      setTargetSentence(data.targetSentence);
      setStage("speech");
    }
  };

  // 🗣 Passenger speech verification
  const handleSpeech = () => {
    setError("");
    if (!("webkitSpeechRecognition" in window)) {
      setError("Speech recognition not supported");
      return;
    }
    const rc = new webkitSpeechRecognition();
    rc.lang = "en-US";
    rc.continuous = false;
    rc.interimResults = false;
    rc.onresult = (evt) => setSpokenSentence(evt.results[0][0].transcript);
    rc.onerror = () => setError("Speech recognition failed");
    rc.start();
  };

  const submitSpeech = async () => {
    if (!spokenSentence) {
      setError("Please speak the sentence.");
      return;
    }
    const token = localStorage.getItem("pendingPassengerToken");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        spokenSentence,
        token,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Speech mismatch");
    } else {
      localStorage.setItem("passengerToken", data.token);
      alert("✅ Passenger Login Successful");
      window.location.href = "/dashboard/passenger";
    }
  };

  // 🤖 Admin face verification
  const handleFaceVerification = async () => {
    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    const ctx = canvasRef.current.getContext("2d");
    faceapi.matchDimensions(canvasRef.current, videoRef.current);
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (!detection) {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 4;
      ctx.strokeRect(
        5,
        5,
        canvasRef.current.width - 10,
        canvasRef.current.height - 10
      );
      setError("❌ Face not detected.");
      return;
    }

    const resized = faceapi.resizeResults(detection, {
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoHeight,
    });
    faceapi.draw.drawDetections(canvasRef.current, resized);

    const dist = faceapi.euclideanDistance(
      new Float32Array(serverDescriptor),
      detection.descriptor
    );
    if (dist < 0.45) {
      const token = localStorage.getItem("pendingToken");
      localStorage.setItem("adminToken", token);
      alert("✅ Admin Login Successful");
      stopCamera();
      window.location.href = "/dashboard/admin";
    } else {
      setError("❌ Face does not match.");
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    stream?.getTracks().forEach((t) => t.stop());
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo-wrapper">
          <Image src={aerologo} alt="Airplane Logo" className="login-logo" />
          <h1 className="brand-text">AEROVISION</h1>
        </div>
      </div>

      <div className="login-right">
        <h2 className="login-title">
          {stage === "form" && "Welcome Back"}
          {stage === "face" && "Face Verification"}
          {stage === "speech" && "Voice Verification"}
        </h2>

        {stage === "form" && (
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
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
            <button type="submit" className="login-btn">
              Login
            </button>
            <p className="login-link">
              No account? <a href="/register">Register</a>
            </p>
          </form>
        )}

        {stage === "face" && isMounted && (
          <>
            <div className="video-container" style={{ position: "relative" }}>
              <video
                ref={videoRef}
                autoPlay
                muted
                width="400"
                height="300"
                className="webcam-video"
              />
              <canvas
                ref={canvasRef}
                width="400"
                height="300"
                className="face-canvas"
                style={{ position: "absolute", top: 0, left: 0 }}
              />
            </div>
            <button className="login-btn" onClick={handleFaceVerification}>
              🔍 Verify Face
            </button>
          </>
        )}

        {stage === "speech" && (
          <>
            {/* <p className="sentence-box">
              🎤 Speak the sentence: <strong>{targetSentence}</strong>
            </p> */}
            <button className="submit-btn" onClick={handleSpeech}>
              {spokenSentence
                ? `You said: "${spokenSentence}"`
                : "🎤 Speak Now"}
            </button>
            <button className="submit-btn" onClick={submitSpeech}>
              Submit
            </button>
          </>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
