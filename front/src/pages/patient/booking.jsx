import React, { useState } from "react";
import "./booking.css";

function Booking() {
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reason, setReason] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [bookingId, setBookingId] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [count, setCount] = useState(0); // عدد الحجوزات
  const [error, setError] = useState("");

  const maxBookings = 5; // الحد الأقصى

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (count >= maxBookings) {
      setError("Sorry, no more bookings available at this time.");
      return;
    }

    const id = "CL" + Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    const formattedTime = now.toLocaleString();

    setBookingId(id);
    setBookingTime(formattedTime);
    setCount(count + 1);
    setShowConfirmation(true);
    setError(""); 
  };

  return (
    <div className="booking-container">
      <h1 className="h1">Book Your Appointment</h1>
      <br />

      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      {!showConfirmation && count < maxBookings && (
        <form onSubmit={handleSubmit}>
          <label className="label">Patient Name</label>
          <input
            className="input"
            type="text"
            required
            placeholder="Enter your full name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />

          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label">Phone Number (Optional)</label>
          <input
            className="input"
            type="text"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <label className="label">Symptoms/Reason for Visit</label>
          <textarea
            className="input"
            required
            placeholder="Describe your symptoms or reason for your visit"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          ></textarea>

          <button type="submit" className="button">Submit</button>
        </form>
      )}

      {showConfirmation && (
        <div className="confirmation-card">
          <h2>Booking Confirmation</h2>
          <p>Your booking is confirmed. Please find the details below:</p>
          <div className="confirmation-details">
            <div><strong>Booking Number:</strong> {bookingId}</div>
            <div><strong>Booking Time:</strong> {bookingTime}</div>
            <div><strong>Total Bookings:</strong> {count}</div>
            <div><strong>Patient Name:</strong> {patientName}</div>
          </div>
          <p>Thank you for booking with us. We look forward to seeing you.</p>
        </div>
      )}

      {count >= maxBookings && (
        <div className="confirmation-card">
          <h2 style={{ color: "red" }}>Booking Closed</h2>
          <p>We have reached the maximum number of bookings.</p>
        </div>
      )}
    </div>
  );
}

export default Booking;  