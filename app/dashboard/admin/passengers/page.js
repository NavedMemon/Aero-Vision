"use client";
import React, { useState, useEffect } from "react";
import AdminSidebar from "../AdminSidebar";
import "../admin.css";
import "./passengers.css";
import { FaEye, FaTrash, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

const mockBookings = new Array(12).fill(0).map((_, i) => ({
  id: i,
  passengerName: `Passenger ${i + 1}`,
  flightNumber: `FL${100 + i}`,
  airline: i % 2 === 0 ? "IndiGo" : "Air India",
  logo: i % 2 === 0 ? "/images/indigologo.png" : "/images/airindia.png",
  from: i % 2 === 0 ? "Mumbai" : "Delhi",
  to: i % 2 === 0 ? "Dubai" : "Bangalore",
  departure: `2025-07-21T${10 + i}:00:00`,
  status: i % 3 === 0 ? "Confirmed" : i % 3 === 1 ? "Pending" : "Cancelled",
  type: i % 2 === 0 ? "International" : "Domestic",
  price: `₹${4500 + i * 300}`,
}));

const PassengerPage = () => {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const [bookings, setBookings] = useState(mockBookings);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [airlineFilter, setAirlineFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookingsPerPage = 8;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter, airlineFilter]);

  if (!hasMounted) return null;

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.passengerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.to.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "All" || booking.type.toLowerCase() === filter.toLowerCase();
    const matchesAirline =
      airlineFilter === "All" ||
      booking.airline.toLowerCase() === airlineFilter.toLowerCase();
    return matchesSearch && matchesFilter && matchesAirline;
  });

  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  const paginated = filteredBookings.slice(
    (currentPage - 1) * bookingsPerPage,
    currentPage * bookingsPerPage
  );

  const handleCancelBooking = (id) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id ? { ...booking, status: "Cancelled" } : booking
        )
      );
    }
  };

  const closeModal = () => setSelectedBooking(null);

  return (
    <div className="admin-dashboard-new-container">
      <AdminSidebar />
      <div className="admin-dashboard-main-bright">
        <h1 className="admin-passenger-title">🧳 Manage Passenger Bookings</h1>

        <div className="admin-passenger-controls">
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All Types</option>
            <option value="Domestic">Domestic</option>
            <option value="International">International</option>
          </select>
          <select
            value={airlineFilter}
            onChange={(e) => setAirlineFilter(e.target.value)}
          >
            <option value="All">All Airlines</option>
            <option value="IndiGo">IndiGo</option>
            <option value="Air India">Air India</option>
          </select>
        </div>

        <div className="admin-passenger-card-grid">
          {paginated.length > 0 ? (
            paginated.map((booking) => (
              <div key={booking.id} className="admin-passenger-card animated">
                <img src={booking.logo} alt={booking.airline} />
                <h3>{booking.passengerName}</h3>
                <p>
                  <strong>Flight:</strong> {booking.flightNumber} -{" "}
                  {booking.airline}
                </p>
                <p>
                  <strong>From:</strong> {booking.from} <br />
                  <strong>To:</strong> {booking.to}
                </p>
                <p>🕒 {new Date(booking.departure).toLocaleString()}</p>
                <p className="admin-passenger-price">{booking.price}</p>
                <p className={`admin-status-${booking.status.toLowerCase()}`}>
                  {booking.status}
                </p>
                <span className="admin-passenger-type">{booking.type}</span>
                <div className="admin-passenger-actions">
                  <button
                    className="admin-view-button"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <FaEye /> View Details
                  </button>
                  {booking.status !== "Cancelled" && (
                    <button
                      className="admin-cancel-button"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      <FaTrash /> Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p style={{ padding: "20px", textAlign: "center" }}>
              No bookings found for the selected filters.
            </p>
          )}
        </div>

        <div className="admin-passenger-pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={i + 1 === currentPage ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modal View */}
      {selectedBooking && (
        <div className="booking-modal-backdrop" onClick={closeModal}>
          <div
            className="booking-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-modal" onClick={closeModal}>
              <FaTimes />
            </button>
            <h2>Booking Details</h2>
            <img
              src={selectedBooking.logo}
              alt={selectedBooking.airline}
              style={{ height: "40px" }}
            />
            <p><strong>Passenger:</strong> {selectedBooking.passengerName}</p>
            <p><strong>Flight Number:</strong> {selectedBooking.flightNumber}</p>
            <p><strong>Airline:</strong> {selectedBooking.airline}</p>
            <p><strong>From:</strong> {selectedBooking.from}</p>
            <p><strong>To:</strong> {selectedBooking.to}</p>
            <p><strong>Departure:</strong> {new Date(selectedBooking.departure).toLocaleString()}</p>
            <p><strong>Status:</strong> {selectedBooking.status}</p>
            <p><strong>Type:</strong> {selectedBooking.type}</p>
            <p><strong>Price:</strong> {selectedBooking.price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerPage;
