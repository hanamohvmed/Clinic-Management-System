// import React from 'react';
// import './DoctorDashboard.css';

// const PatientBookings = ({ slots }) => {
//   return (
//     <div className="section patient-booking-container">
//       <h3>Patient Bookings</h3>
//       {slots.map(slot => (
//         <div key={slot.id} className={slot.patients.length === parseInt(slot.maxPatients) ? 'fully-booked' : ''}>
//           <strong>{slot.date} at {slot.time}</strong>
//           <ul>
//             {slot.patients.length === 0 ? (
//               <li className="empty">No bookings</li>
//             ) : (
//               slot.patients.map((patient, index) => (
//                 <li key={index}>{patient}</li>
//               ))
//             )}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PatientBookings;


import React, { useEffect, useState } from 'react';
import './DoctorDashboard.css';

const PatientBookings = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('') //لينك ال api 
      .then(res => res.json())
      .then(data => {
        setSlots(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching slots:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="section patient-booking-container">
      <h3>Patient Bookings</h3>
      {slots.map(slot => (
        <div
          key={slot.id}
          className={
            slot.patients.length === parseInt(slot.maxPatients)
              ? 'fully-booked'
              : ''
          }
        >
          <strong>{slot.date} at {slot.time}</strong>
          <ul>
            {slot.patients.length === 0 ? (
              <li className="empty">No bookings</li>
            ) : (
              slot.patients.map((patient, index) => (
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
