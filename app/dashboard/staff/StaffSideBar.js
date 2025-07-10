import Link from "next/link";
import {
  FaHome,
  FaTasks,
  FaClipboardList,
  FaBell,
  FaExclamationCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import "./staffSidebar.css";

function StaffSidebar() {
  return (
    <div className="staff-sidebar">
      <div className="staff-logo">✈️ AeroStaff</div>

      <nav className="staff-nav">
        <Link href="/dashboard/staff" className="staff-nav-link">
          <FaHome /> Home
        </Link>

        <Link href="/dashboard/staff/StaffWork" className="staff-nav-link">
          <FaTasks /> Work
        </Link>

        <Link href="/dashboard/staff/StaffComplaint" className="staff-nav-link">
          <FaExclamationCircle /> Complaint Form
        </Link>

        <Link
          href="/dashboard/staff/StaffComplaintsStatusPage"
          className="staff-nav-link"
        >
          <FaClipboardList /> Complaint Details
        </Link>

        <Link
          href="/dashboard/staff/StaffLeaveRequestPage"
          className="staff-nav-link"
        >
          <FaCalendarAlt /> Leave Request
        </Link>

        <Link
          href="/dashboard/staff/StaffNotifications"
          className="staff-nav-link"
        >
          <FaBell /> Notifications
        </Link>
        <div className="logout-section">
          <button className="logout-btn">
            <FiLogOut style={{ marginRight: "8px" }} />
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default StaffSidebar;
