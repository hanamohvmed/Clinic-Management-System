// // import React, { useEffect, useState } from 'react';
// // import './DoctorDashboard.css';

// // const PatientBookings = () => {
// //   const [slots, setSlots] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const token = localStorage.getItem('token');

// //     fetch('http://clinic-dev.runasp.net/api/Doctors/Bookings', {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     })
// //       .then(res => {
// //         if (!res.ok) throw new Error('Unauthorized or bad response');
// //         return res.json();
// //       })
// //       .then(data => {
// //         setSlots(data);
// //         setLoading(false);
// //       })
// //       .catch(err => {
// //         console.error('Error fetching slots:', err);
// //         setLoading(false);
// //       });
// //   }, []);

// //   if (loading) return <p>Loading...</p>;

// //   return (
// //     <div className="section patient-booking-container">
// //       <h3>Patient Bookings</h3>
// //       {slots.map(slot => (
// //         <div
// //           key={slot.id}
// //           className={slot.patients.length === 0 ? 'no-bookings' : ''}
// //         >
// //           <strong>{slot.date} at {slot.startTime}</strong>
// //           <ul>
// //             {slot.patients.length === 0 ? (
// //               <li className="empty">No bookings</li>
// //             ) : (
// //               slot.patients.map((patient, index) => (
// //                 <li key={index}>
// //                   {patient.name} - {patient.bookingTime}
// //                 </li>
// //               ))
// //             )}
// //           </ul>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default PatientBookings;

// import React, { useEffect, useState } from 'react';
// import './DoctorDashboard.css';

// const PatientBookings = () => {
//   const [slots, setSlots] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     fetch('http://clinic-dev.runasp.net/api/Doctors/Bookings', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then(res => {
//         if (!res.ok) throw new Error('Unauthorized or bad response');
//         return res.json();
//       })
//       .then(data => {
//         const fixedSlots = data.map(slot => ({
//           ...slot,
//           patients: Array.isArray(slot.patients)
//             ? slot.patients
//             : Object.values(slot.patients || {})
//         }));

//         setSlots(fixedSlots);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching slots:', err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="section patient-booking-container">
//       <h3>Patient Bookings</h3>
//       {slots.map(slot => (
//         <div
//           key={slot.id}
//           className={slot.patients.length === 0 ? 'no-bookings' : ''}
//         >
//           <strong>{slot.date} at {slot.startTime}</strong>
//           <ul>
//             {slot.patients.length === 0 ? (
//               <li className="empty">No bookings</li>
//             ) : (
//               slot.patients.map((patient, index) => (
//                 <li key={index}>
//                   {patient.name} - {patient.bookingTime}
//                 </li>
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
    const token = localStorage.getItem('token');

    fetch('http://clinic-dev.runasp.net/api/Doctors/Bookings', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized or bad response');
        return res.json();
      })
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
      {slots.length === 0 && <p>No bookings found.</p>}
      {slots.map(slot => (
        <div key={slot.id}>
          <strong>{new Date(slot.date).toLocaleDateString()} at {slot.time}</strong>
          {slot.patients ? (
            <ul>
              <li>
                {slot.patients.name} - {slot.patients.bookingTime} - {slot.patients.reaon} - {slot.patients.phoneNumber}
              </li>
            </ul>
          ) : (
            <p>No patient booked</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientBookings;
