import React, { useState, useEffect } from "react";
import "./booking.css";
import { useSearchParams } from "react-router-dom";

function Booking() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("doctorId");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [reason, setReason] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(
      `http://clinicdev.runasp.net/api/DoctorSlots/get-doctor-slots?doctorId=${doctorId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load slots");
        return res.json();
      })
      .then((data) => {
        console.log("Slots API Response:", data);
        setSlots(data.slots || []);

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleBook = (e) => {
    e.preventDefault();

    const bookingData = {
      DoctorSlotId: selectedSlotId,
      phoneNumber,
      reason,
    };

      fetch("http://clinicdev.runasp.net/api/Appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to book appointment");
        return res.json();
      }).then((data) => {
        console.log(data)
        alert(
          `Appointment booked successfully!\nDate: ${new Date(data.bookingDate).toLocaleDateString()} — Time: ${data.bookingTime}`
        );
        console.log("Booking API Response:", data);
        setSelectedSlotId(null);
        setPhoneNumber("");
        setReason("");
      })  
      .catch((err) => alert(err.message));
  };

  if (loading) return <p>Loading slots...</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  return (
    <div className="booking-container">
  <h2 className="booking-title">Available Appointments</h2>

  {slots.length === 0 ? (
    <p className="no-slots">No slots available</p>
  ) : (
    <ul className="slot-list">
      {slots.map((slot) => (
        <li key={slot.id} className="slot-item">
          <div className="slot-info">
            <span className="slot-date">
              <span className="slot-date-time">
                {new Date(slot.date).toLocaleDateString()} — {slot.startTime.slice(0, 5)}
              </span>
            </span>
          </div>
          <button
            className="book-btn"
            onClick={() => setSelectedSlotId(slot.id)}
          >
            Book
          </button>
        </li>
      ))}
    </ul>
  )}

  {selectedSlotId && (
    <form className="booking-form" onSubmit={handleBook}>
      <h3 className="form-title">Book Appointment</h3>

      <label>Phone Number</label>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />

      <label>Reason for Visit</label>
      <textarea
        placeholder="Describe your symptoms or reason for visit"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        required
      ></textarea>

      <div className="form-actions">
        <button type="submit" className="confirm-btn">
          Confirm Booking
        </button>
        <button
          type="button"
          className="cancel-btn"
          onClick={() => setSelectedSlotId(null)}
        >
          Cancel
        </button>
      </div>
    </form>
  )}
</div>

  );
}

export default Booking;
