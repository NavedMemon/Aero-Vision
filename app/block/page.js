"use client";
import React from "react";
import BlockedImg from "@/public/images/blocked.png";
import Image from "next/image";
import "./Blockpage.css";

const BlockedStudentsError = () => {
  const handleback = () => {
    window.location.href = "/login";
  };

  return (
    <div className="blockedpage">
      <Image src={BlockedImg} alt="Block Logo" className="blockedimg" />
      <h1>You Have Been Blocked!</h1>
      <h5>Kindly contact your admin</h5>
      <button className="backbtn" onClick={() => handleback()}>
        Go Back
      </button>
    </div>
  );
};

export default BlockedStudentsError;
