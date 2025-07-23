"use client";
import React from "react";
import Link from "next/link";
import {
  FaPlane,
  FaUsers,
  FaExclamationCircle,
  FaBullhorn,
  FaSignOutAlt,
  FaHome,
  FaChartLine,
  FaTasks,
} from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="admin-logo">✈ AEROVISION ADMIN</div>
      <div className="admin-nav-menu">
        <Link href="/dashboard/admin" className="admin-nav-link">
          <FaHome /> Dashboard
        </Link>
        <Link href="/dashboard/admin/manageusers" className="admin-nav-link">
          <FaUsers /> Manage Users
        </Link>
        <Link href="/dashboard/admin/manageflights" className="admin-nav-link">
          <FaPlane /> Manage Flights
        </Link>
        <Link href="/dashboard/admin/passengers" className="admin-nav-link">
          <FaUsers /> Passengers
        </Link>
        <Link href="/dashboard/admin/managecomplaints" className="admin-nav-link">
          <FaExclamationCircle /> Complaints
        </Link>
        <Link href="/dashboard/admin/managetask" className="admin-nav-link">
          <FaTasks /> Manage Tasks
        </Link>
        <Link href="/dashboard/admin/announcements" className="admin-nav-link">
          <FaBullhorn /> Announcements
        </Link>
        <Link href="/dashboard/admin/reports" className="admin-nav-link">
          <FaChartLine /> Reports
        </Link>
        <Link href="/logout" className="admin-nav-link admin-logout">
          <FaSignOutAlt /> Logout
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;