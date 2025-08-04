import React, { useState, useEffect } from "react";
import "./MyBookings.css";

// Mock data for demonstration
const mockBookings = [
  {
    id: "booking_123",
    doctor: {
      id: "doc_456",
      name: "Dr. Sara El-Masry",
      specialty: "Cardiologist",
      avatarUrl: "https://via.placeholder.com/40",
    },
    appointmentDateTime: "2025-01-15T15:30:00Z",
    status: "confirmed",
    mode: "in_person",
    location: "Nile Health Center, Cairo",
    canCancel: true,
    cancellationCutoff: "2025-01-15T14:30:00Z",
  },
  {
    id: "booking_124",
    doctor: {
      id: "doc_457",
      name: "Dr. Ahmed Hassan",
      specialty: "Dermatologist",
      avatarUrl: "https://via.placeholder.com/40",
    },
    appointmentDateTime: "2025-01-20T10:00:00Z",
    status: "confirmed",
    mode: "online",
    location: "Online video call",
    canCancel: true,
    cancellationCutoff: "2025-01-20T09:00:00Z",
  },
  {
    id: "booking_125",
    doctor: {
      id: "doc_458",
      name: "Dr. Fatima Ali",
      specialty: "Pediatrician",
      avatarUrl: "https://via.placeholder.com/40",
    },
    appointmentDateTime: "2024-12-10T14:00:00Z",
    status: "completed",
    mode: "in_person",
    location: "Nile Health Center, Cairo",
    canCancel: false,
    cancellationCutoff: "2024-12-10T13:00:00Z",
  },
  {
    id: "booking_126",
    doctor: {
      id: "doc_459",
      name: "Dr. Omar Khalil",
      specialty: "Orthopedist",
      avatarUrl: "https://via.placeholder.com/40",
    },
    appointmentDateTime: "2024-11-25T16:30:00Z",
    status: "cancelled",
    mode: "in_person",
    location: "Nile Health Center, Cairo",
    canCancel: false,
    cancellationCutoff: "2024-11-25T15:30:00Z",
  },
];

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("upcoming");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancellingBooking, setCancellingBooking] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Simulate API call
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setBookings(mockBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings based on current filter and search
  const filteredBookings = bookings.filter((booking) => {
    const now = new Date();
    const appointmentDate = new Date(booking.appointmentDateTime);
    const isUpcoming = appointmentDate > now;
    const isPast = appointmentDate <= now;

    // Status-based filtering
    const isConfirmed = booking.status === "confirmed";
    const isCompleted =
      booking.status === "completed" ||
      booking.status === "cancelled" ||
      booking.status === "no_show";

    let matchesFilter;
    if (filter === "upcoming") {
      // Show confirmed appointments OR future appointments that aren't completed
      matchesFilter = isConfirmed || (isUpcoming && !isCompleted);
    } else {
      // Show completed/cancelled appointments OR past appointments
      matchesFilter = isCompleted || (isPast && !isConfirmed);
    }

    const matchesSearch =
      booking.doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.doctor.specialty
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Sort bookings
  const sortedBookings = filteredBookings.sort((a, b) => {
    const dateA = new Date(a.appointmentDateTime);
    const dateB = new Date(b.appointmentDateTime);

    if (filter === "upcoming") {
      return dateA - dateB; // Earliest first
    } else {
      return dateB - dateA; // Most recent first
    }
  });

  const handleCancelBooking = async (bookingId) => {
    setCancellingBooking(bookingId);
    setShowCancelModal(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "cancelled", canCancel: false }
            : booking
        )
      );

      showToast("Your appointment has been cancelled.", "success");
    } catch (error) {
      showToast("Couldn't cancel the appointment. Please try again.", "error");
    } finally {
      setCancellingBooking(null);
    }
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return (
      date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      }) +
      " · " +
      date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { label: "Confirmed", className: "status-confirmed" },
      cancelled: { label: "Cancelled", className: "status-cancelled" },
      completed: { label: "Completed", className: "status-completed" },
      no_show: { label: "No-show", className: "status-no-show" },
    };

    const config = statusConfig[status] || statusConfig.confirmed;
    return (
      <span className={`status-badge ${config.className}`}>{config.label}</span>
    );
  };

  const getUpcomingCount = () => {
    const now = new Date();
    return bookings.filter((booking) => {
      const appointmentDate = new Date(booking.appointmentDateTime);
      const isUpcoming = appointmentDate > now;
      const isConfirmed = booking.status === "confirmed";
      const isCompleted =
        booking.status === "completed" ||
        booking.status === "cancelled" ||
        booking.status === "no_show";

      return isConfirmed || (isUpcoming && !isCompleted);
    }).length;
  };

  const getPastCount = () => {
    const now = new Date();
    return bookings.filter((booking) => {
      const appointmentDate = new Date(booking.appointmentDateTime);
      const isPast = appointmentDate <= now;
      const isConfirmed = booking.status === "confirmed";
      const isCompleted =
        booking.status === "completed" ||
        booking.status === "cancelled" ||
        booking.status === "no_show";

      return isCompleted || (isPast && !isConfirmed);
    }).length;
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
      {/* Header */}
      <div className="bookings-header">
        <div className="header-content">
          <h1>My Bookings</h1>
          <p className="subtitle">Manage and track your appointments</p>
        </div>

        {/* Filter Tabs */}
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
      </div>

      {/* Search */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by doctor name or specialty..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Bookings List */}
      <div className="bookings-list">
        {sortedBookings.length === 0 ? (
          <div className="empty-state">
            {filter === "upcoming" ? (
              <>
                <h3>You have no upcoming bookings.</h3>
                <button className="cta-button">Book an Appointment</button>
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
              </div>

              {booking.status === "confirmed" && booking.canCancel && (
                <div className="booking-actions">
                  <button
                    className={`cancel-button ${
                      cancellingBooking === booking.id ? "cancelling" : ""
                    }`}
                    onClick={() => setShowCancelModal(true)}
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

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowCancelModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Cancel Appointment?</h2>
            <p>
              Are you sure you want to cancel your appointment with Dr. Sara
              El-Masry on Tuesday, Jan 15, 2025 · 3:30 PM? This action cannot be
              undone.
            </p>
            <p className="cancellation-policy">
              Note: Cancellations less than 24 hours before the appointment may
              incur a fee.
            </p>
            <div className="modal-actions">
              <button
                className="cancel-confirm-button"
                onClick={() => handleCancelBooking("booking_123")}
              >
                Yes, Cancel
              </button>
              <button
                className="keep-appointment-button"
                onClick={() => setShowCancelModal(false)}
              >
                Keep Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast ${toast.type}`}>{toast.message}</div>
      )}
    </div>
  );
};

export default MyBookings;
