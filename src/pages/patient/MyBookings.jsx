import React, { useState, useEffect, useContext } from "react";
import "./MyBookings.css";
import AuthContext from "../../store/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("upcoming");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancellingBooking, setCancellingBooking] = useState(null);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) {
        showToast("Please log in to view your bookings.", "error");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        };

        const response = await fetch(
          "http://clinicdev.runasp.net/api/Appointments",
          {
            method: "GET",
            headers
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API response:", data);

        const transformedBookings = data.map((appointment) => ({
          id: appointment.id,
          doctor: {
            id: appointment.id,
            name: appointment.doctorName,
            specialty: "General Medicine",
            avatarUrl:
              appointment.doctorProfileImage &&
              appointment.doctorProfileImage !== "string"
                ? appointment.doctorProfileImage
                : "https://via.placeholder.com/40"
          },
          appointmentDateTime: `${appointment.slotDate}T${appointment.time}`,
          status: "confirmed",
          mode: "in_person",
          location: "Clinic",
          canCancel: true,
          cancellationCutoff: `${appointment.slotDate}T${appointment.time}`,
          reason: appointment.reason,
          phoneNumber: appointment.phoneNumber
        }));
        console.log("Transformed bookings:", transformedBookings);
        setBookings(transformedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        showToast("Failed to load bookings. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  const filteredBookings = bookings.filter((booking) => {
    const isCancelled = booking.status === "cancelled";
    let matchesFilter;
    if (filter === "upcoming") {
      matchesFilter = !isCancelled;
    } else {
      matchesFilter = isCancelled;
    }

    const matchesSearch =
      booking.doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.doctor.specialty
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const sortedBookings = filteredBookings.sort((a, b) => {
    const dateA = new Date(a.appointmentDateTime);
    const dateB = new Date(b.appointmentDateTime);

    if (filter === "upcoming") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  const handleCancelBooking = async (bookingId) => {
    if (!token) {
      showToast("Please log in to cancel bookings.", "error");
      return;
    }

    setCancellingBooking(bookingId);
    setShowCancelModal(false);
    setBookingToCancel(null);

    try {
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "cancelled", canCancel: false }
            : booking
        )
      );

      showToast("Your appointment has been cancelled.", "success");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };

      fetch(`http://clinicdev.runasp.net/api/Appointments/${bookingId}`, {
        method: "DELETE",
        headers
      }).catch((error) => {
        console.log("Backend sync failed:", error);
      });
    } catch (error) {
      console.error("Error updating local state:", error);
      showToast("Something went wrong. Please refresh the page.", "error");
    } finally {
      setCancellingBooking(null);
    }
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const [datePart, timePart] = dateTimeString.split("T");
    if (!datePart || !timePart) return "Invalid date";
    const [month, day, year] = datePart.split("/");

    const isoString = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}T${timePart}`;
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "Invalid date";
    return (
      date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
      }) +
      " · " +
      date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      })
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { label: "Confirmed", className: "status-confirmed" },
      cancelled: { label: "Cancelled", className: "status-cancelled" },
      completed: { label: "Completed", className: "status-completed" },
      no_show: { label: "No-show", className: "status-no-show" }
    };

    const config = statusConfig[status] || statusConfig.confirmed;
    return (
      <span className={`status-badge ${config.className}`}>{config.label}</span>
    );
  };

  const getUpcomingCount = () => {
    return bookings.filter((booking) => booking.status !== "cancelled").length;
  };

  const getPastCount = () => {
    return bookings.filter((booking) => booking.status === "cancelled").length;
  };

  if (loading) {
    return (
      <div className="my-bookings-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="my-bookings-container">
      <div className="bookings-header">
        <div className="header-content">
          <h1>My Appointments</h1>
          <p className="subtitle">Manage and track your appointments</p>
        </div>

        <div className="filter-tabs">
          <button
            className={`tab ${filter === "upcoming" ? "active" : ""}`}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming ({getUpcomingCount()})
          </button>
          <button
            className={`tab ${filter === "past" ? "active" : ""}`}
            onClick={() => setFilter("past")}
          >
            Past ({getPastCount()})
          </button>
        </div>

        <div className="search-section">
          <input
            type="text"
            placeholder="Search by doctor name or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="bookings-list">
        {sortedBookings.length === 0 ? (
          <div className="empty-state">
            {filter === "upcoming" ? (
              <>
                <h3>You have no upcoming bookings.</h3>
                <button
                  className="cta-button"
                  onClick={() => navigate("/home/doctors-list")}
                >
                  Browse Doctors
                </button>
              </>
            ) : (
              <>
                <h3>You haven't had any appointments yet.</h3>
                <p>
                  View available doctors to schedule your first appointment.
                </p>
              </>
            )}
          </div>
        ) : (
          sortedBookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <div className="doctor-info">
                  <img
                    src={booking.doctor.avatarUrl}
                    alt={booking.doctor.name}
                    className="doctor-avatar"
                  />
                  <div>
                    <h3 className="doctor-name">{booking.doctor.name}</h3>
                    <p className="doctor-specialty">
                      {booking.doctor.specialty}
                    </p>
                  </div>
                </div>
                {getStatusBadge(booking.status)}
              </div>

              <div className="booking-details">
                <div className="appointment-time">
                  <strong>Appointment:</strong>{" "}
                  {formatDateTime(booking.appointmentDateTime)}
                </div>
                <div className="appointment-location">
                  <strong>Location:</strong> {booking.location}
                </div>
                <div className="appointment-mode">
                  <strong>Mode:</strong>{" "}
                  {booking.mode === "online"
                    ? "Online video call"
                    : "In-person"}
                </div>
                {booking.reason && (
                  <div className="appointment-reason">
                    <strong>Reason:</strong> {booking.reason}
                  </div>
                )}
                {booking.phoneNumber && (
                  <div className="appointment-phone">
                    <strong>Phone:</strong> {booking.phoneNumber}
                  </div>
                )}
              </div>

              {booking.status === "confirmed" && booking.canCancel && (
                <div className="booking-actions">
                  <button
                    className={`cancel-button ${
                      cancellingBooking === booking.id ? "cancelling" : ""
                    }`}
                    onClick={() => {
                      setBookingToCancel(booking);
                      setShowCancelModal(true);
                    }}
                    disabled={cancellingBooking === booking.id}
                  >
                    {cancellingBooking === booking.id
                      ? "Cancelling..."
                      : "Cancel"}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {showCancelModal && bookingToCancel && (
        <div
          className="modal-overlay"
          onClick={() => {
            setShowCancelModal(false);
            setBookingToCancel(null);
          }}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Cancel Appointment?</h2>
            <p>
              Are you sure you want to cancel your appointment with{" "}
              {bookingToCancel.doctor.name} on{" "}
              {formatDateTime(bookingToCancel.appointmentDateTime)}? This action
              cannot be undone.
            </p>
            <p className="cancellation-policy">
              Note: Cancellations less than 24 hours before the appointment may
              incur a fee.
            </p>
            <div className="modal-actions">
              <button
                className="cancel-confirm-button"
                onClick={() => handleCancelBooking(bookingToCancel.id)}
              >
                Yes, Cancel
              </button>
              <button
                className="keep-appointment-button"
                onClick={() => {
                  setShowCancelModal(false);
                  setBookingToCancel(null);
                }}
              >
                Keep Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {toast.show && (
        <div className={`toast ${toast.type}`}>{toast.message}</div>
      )}
    </div>
  );
};

export default MyBookings;
