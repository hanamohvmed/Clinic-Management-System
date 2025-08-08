import React, { useEffect, useState } from 'react';
import './DoctorDashboard.css';

const PatientBookings = () => {
  const [doctorId, setDoctorId] = useState(null);
  const [allSlots, setAllSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get doctor profile
  useEffect(() => {
    fetch('http://clinic-dev.runasp.net/api/Doctors/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setDoctorId(data.id);
      })
      .catch(err => {
        console.error('Error fetching doctor profile:', err);
      });
  }, []);

  // Get all bookings
  useEffect(() => {
    if (!doctorId) return;

    fetch('http://clinic-dev.runasp.net/api/Doctors/Bookings', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setAllSlots(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching bookings:', err);
        setLoading(false);
      });
  }, [doctorId]);

  if (loading) return <p>Loading...</p>;

  const filteredSlots = allSlots.filter(slot => slot.doctorId === doctorId);

  return (
    <div className="section patient-booking-container">
      <h3>Patient Bookings</h3>
      {filteredSlots.map(slot => (
        <div
          key={slot.id}
          className={
            slot.patients?.length === parseInt(slot.maxPatients)
              ? 'fully-booked'
              : ''
          }
        >
          <strong>{slot.date} at {slot.time}</strong>
          <ul>
            {slot.patients?.length === 0 ? (
              <li className="empty">No bookings</li>
            ) : (
              slot.patients?.map((patient, index) => (
                <li key={index}>
                  {patient.name} - {patient.bookingTime}
                </li>
              ))
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientBookings;
