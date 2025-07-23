"use client";
import React, { useState, useEffect } from "react";
import AdminSidebar from "../AdminSidebar";
import "../admin.css"; // Reuse admin.css for consistent styling
import "./manageflights.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const mockFlights = new Array(12).fill(0).map((_, i) => ({
  id: i,
  number: `FL${100 + i}`,
  airline: i % 2 === 0 ? "IndiGo" : "Air India",
  logo: i % 2 === 0 ? "/images/indigologo.png" : "/images/airindia.png",
  from: i % 2 === 0 ? "Mumbai" : "Delhi",
  to: i % 2 === 0 ? "Dubai" : "Bangalore",
  departure: `2025-07-21T${10 + i}:00:00`,
  status: i % 3 === 0 ? "On Time" : i % 3 === 1 ? "Delayed" : "Cancelled",
  type: i % 2 === 0 ? "International" : "Domestic",
  price: `₹${4500 + i * 300}`,
}));

const mockAirlines = [
  { name: "IndiGo", logo: "/images/indigologo.png" },
  { name: "Air India", logo: "/images/airindia.png" },
];

const ManageFlights = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [flights, setFlights] = useState(mockFlights);
  const [airlines, setAirlines] = useState(mockAirlines);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [showFlightForm, setShowFlightForm] = useState(false);
  const [showAirlineForm, setShowAirlineForm] = useState(false);
  const [newFlight, setNewFlight] = useState({
    number: "",
    airline: "",
    logo: "",
    from: "",
    to: "",
    departure: "",
    status: "On Time",
    type: "Domestic",
    price: "",
  });
  const [newAirline, setNewAirline] = useState({
    name: "",
    logo: "",
  });
  const [editingFlight, setEditingFlight] = useState(null);
  const flightsPerPage = 8;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  if (!hasMounted) return null; // Prevent mismatched server/client render

  const filteredFlights = flights.filter((flight) => {
    const matchesSearch =
      flight.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.to.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "All" || flight.type.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);

  const paginated = filteredFlights.slice(
    (currentPage - 1) * flightsPerPage,
    currentPage * flightsPerPage
  );

  const handleFlightInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "airline") {
      const selectedAirline = airlines.find((airline) => airline.name === value);
      if (editingFlight) {
        setEditingFlight({
          ...editingFlight,
          airline: value,
          logo: selectedAirline ? selectedAirline.logo : "",
        });
      } else {
        setNewFlight({
          ...newFlight,
          airline: value,
          logo: selectedAirline ? selectedAirline.logo : "",
        });
      }
    } else {
      if (editingFlight) {
        setEditingFlight({ ...editingFlight, [name]: value });
      } else {
        setNewFlight({ ...newFlight, [name]: value });
      }
    }
  };

  const handleAirlineInputChange = (e) => {
    const { name, value } = e.target;
    setNewAirline({ ...newAirline, [name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        alert("Please upload a PNG, JPG, or JPEG file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewAirline({ ...newAirline, logo: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFlightSubmit = (e) => {
    e.preventDefault();
    if (editingFlight) {
      setFlights(
        flights.map((flight) =>
          flight.id === editingFlight.id ? { ...editingFlight, id: editingFlight.id } : flight
        )
      );
      setEditingFlight(null);
    } else {
      setFlights([
        ...flights,
        { ...newFlight, id: flights.length + 1 },
      ]);
    }
    setNewFlight({
      number: "",
      airline: "",
      logo: "",
      from: "",
      to: "",
      departure: "",
      status: "On Time",
      type: "Domestic",
      price: "",
    });
    setShowFlightForm(false);
  };

  const handleAirlineSubmit = (e) => {
    e.preventDefault();
    if (airlines.some((airline) => airline.name === newAirline.name)) {
      alert("Airline name must be unique.");
      return;
    }
    setAirlines([...airlines, newAirline]);
    setNewAirline({ name: "", logo: "" });
    setShowAirlineForm(false);
  };

  const handleEdit = (flight) => {
    setEditingFlight(flight);
    setShowFlightForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this flight?")) {
      setFlights(flights.filter((flight) => flight.id !== id));
    }
  };

  const toggleFlightForm = () => {
    setShowFlightForm(!showFlightForm);
    setEditingFlight(null);
    setNewFlight({
      number: "",
      airline: "",
      logo: "",
      from: "",
      to: "",
      departure: "",
      status: "On Time",
      type: "Domestic",
      price: "",
    });
  };

  const toggleAirlineForm = () => {
    setShowAirlineForm(!showAirlineForm);
    setNewAirline({ name: "", logo: "" });
  };

  return (
    <div className="admin-dashboard-new-container">
      <AdminSidebar />
      <div className="admin-dashboard-main-bright">
        <h1 className="admin-flight-title">🛫 Manage Flights</h1>

        <div className="admin-flight-controls">
          <input
            type="text"
            placeholder="Search flights..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Domestic">Domestic</option>
            <option value="International">International</option>
          </select>
          <button className="admin-add-flight-button" onClick={toggleFlightForm}>
            {showFlightForm ? "Cancel" : "Add New Flight"}
          </button>
          <button className="admin-add-airline-button" onClick={toggleAirlineForm}>
            {showAirlineForm ? "Cancel" : "Add New Airline"}
          </button>
        </div>

        {showAirlineForm && (
          <div className="admin-airline-form-box">
            <h3>Add Airline</h3>
            <form onSubmit={handleAirlineSubmit} className="admin-airline-form">
              <input
                type="text"
                name="name"
                placeholder="Airline Name"
                value={newAirline.name}
                onChange={handleAirlineInputChange}
                required
              />
              <input
                type="text"
                name="logo"
                placeholder="Logo URL (e.g., /images/airlinelogo.png)"
                value={newAirline.logo}
                onChange={handleAirlineInputChange}
              />
              <input
                type="file"
                name="logoFile"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileUpload}
              />
              <button type="submit">Add Airline</button>
            </form>
          </div>
        )}

        {showFlightForm && (
          <div className="admin-flight-form-box">
            <h3>{editingFlight ? "Edit Flight" : "Add Flight"}</h3>
            <form onSubmit={handleFlightSubmit} className="admin-flight-form">
              <input
                type="text"
                name="number"
                placeholder="Flight Number"
                value={editingFlight ? editingFlight.number : newFlight.number}
                onChange={handleFlightInputChange}
                required
              />
              <select
                name="airline"
                value={editingFlight ? editingFlight.airline : newFlight.airline}
                onChange={handleFlightInputChange}
                required
              >
                <option value="" disabled>Select Airline</option>
                {airlines.map((airline) => (
                  <option key={airline.name} value={airline.name}>
                    {airline.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="from"
                placeholder="Origin"
                value={editingFlight ? editingFlight.from : newFlight.from}
                onChange={handleFlightInputChange}
                required
              />
              <input
                type="text"
                name="to"
                placeholder="Destination"
                value={editingFlight ? editingFlight.to : newFlight.to}
                onChange={handleFlightInputChange}
                required
              />
              <input
                type="datetime-local"
                name="departure"
                value={editingFlight ? editingFlight.departure : newFlight.departure}
                onChange={handleFlightInputChange}
                required
              />
              <select
                name="status"
                value={editingFlight ? editingFlight.status : newFlight.status}
                onChange={handleFlightInputChange}
              >
                <option value="On Time">On Time</option>
                <option value="Delayed">Delayed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <select
                name="type"
                value={editingFlight ? editingFlight.type : newFlight.type}
                onChange={handleFlightInputChange}
              >
                <option value="Domestic">Domestic</option>
                <option value="International">International</option>
              </select>
              <input
                type="text"
                name="price"
                placeholder="Price (e.g., ₹5000)"
                value={editingFlight ? editingFlight.price : newFlight.price}
                onChange={handleFlightInputChange}
                required
              />
              <button type="submit">{editingFlight ? "Update Flight" : "Add Flight"}</button>
            </form>
          </div>
        )}

        <div className="admin-flight-card-grid">
          {paginated.map((flight) => (
            <div key={flight.id} className="admin-flight-card animated">
              <img src={flight.logo} alt={flight.airline} />
              <h3>{flight.number} - {flight.airline}</h3>
              <p>
                <strong>From:</strong> {flight.from} <br />
                <strong>To:</strong> {flight.to}
              </p>
              <p>🕒 {new Date(flight.departure).toLocaleString()}</p>
              <p className="admin-flight-price">{flight.price}</p>
              <p className={`admin-status-${flight.status.toLowerCase().replace(" ", "-")}`}>
                {flight.status}
              </p>
              <span className="admin-flight-type">{flight.type}</span>
              <div className="admin-flight-actions">
                <button className="admin-edit-button" onClick={() => handleEdit(flight)}>
                  <FaEdit /> Edit
                </button>
                <button className="admin-delete-button" onClick={() => handleDelete(flight.id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-pagination">
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
    </div>
  );
};

export default ManageFlights;