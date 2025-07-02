// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Sidebar from "../Sidebar";
// import "./supportbot.css";
// import "../passenger.css";
// import { FaMicrophone, FaPaperPlane, FaRobot } from "react-icons/fa";

// const SupportBot = () => {
//   const [messages, setMessages] = useState([
//     {
//       sender: "bot",
//       text: "👋 Hello! I'm AeroBot. How can I assist you today?",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);

//   const handleSend = () => {
//     if (!input.trim()) return;
//     setMessages((prev) => [...prev, { sender: "user", text: input }]);

//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "bot",
//           text: "✅ Thanks for your message! A support agent will reply shortly.",
//         },
//       ]);
//     }, 1000);
//     setInput("");
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="passenger-dashboard-new-container">
//       <Sidebar />
//       <div className="passenger-dashboard-main-bright supportbot-container">
//         <div className="bot-header">
//           <FaRobot size={20} /> AeroBot - Virtual Support
//         </div>

//         <div className="chat-window">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`chat-bubble ${
//                 msg.sender === "user" ? "user" : "bot"
//               }`}
//             >
//               {msg.text}
//             </div>
//           ))}
//           <div ref={messagesEndRef}></div>
//         </div>

//         <div className="chat-controls">
//           <input
//             type="text"
//             value={input}
//             placeholder="Type your question..."
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           />
//           <button onClick={handleSend}>
//             <FaPaperPlane />
//           </button>
//           <button className="mic-btn" title="Voice Input (Coming Soon)">
//             <FaMicrophone />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SupportBot;

// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Sidebar from "../Sidebar";
// import "./supportbot.css";
// import "../passenger.css";
// import { FaMicrophone, FaPaperPlane, FaRobot } from "react-icons/fa";

// const SupportBot = () => {
//   const [messages, setMessages] = useState([
//     {
//       sender: "bot",
//       text: "👋 Hello! I'm AeroBot. How can I assist you today?",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);

//   const handleSend = () => {
//     if (!input.trim()) return;
//     setMessages((prev) => [...prev, { sender: "user", text: input }]);
//     setInput("");

//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "bot",
//           text: "✅ Got it! Our support team will reach out shortly.",
//         },
//       ]);
//     }, 1000);
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="supportbot-wrapper">
//       <Sidebar />
//       <div className="supportbot-overlay">
//         <div className="supportbot-container">
//           <div className="bot-header">
//             <FaRobot /> AeroBot Support Assistant
//           </div>

//           <div className="chat-window">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`chat-bubble ${
//                   msg.sender === "user" ? "user" : "bot"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//             <div ref={messagesEndRef}></div>
//           </div>

//           <div className="chat-controls">
//             <input
//               type="text"
//               placeholder="Type your message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <button onClick={handleSend}>
//               <FaPaperPlane />
//             </button>
//             <button className="mic-btn" title="Speak (Coming Soon)">
//               <FaMicrophone />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SupportBot;

"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar";
import "./supportbot.css";
import "../passenger.css";
import { FaMicrophone, FaPaperPlane, FaRobot } from "react-icons/fa";

const SupportBot = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I'm AeroBot. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "✅ Got it! Our support team will reach out shortly.",
        },
      ]);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="supportbot-wrapper">
      <Sidebar />
      <div className="supportbot-chat-wrapper">
        <div className="supportbot-container">
          <div className="bot-header">
            <FaRobot /> AeroBot Support Assistant
          </div>

          <div className="chat-window">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-bubble ${
                  msg.sender === "user" ? "user" : "bot"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>

          <div className="chat-controls">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>
              <FaPaperPlane />
            </button>
            <button className="mic-btn" title="Speak (Coming Soon)">
              <FaMicrophone />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportBot;
