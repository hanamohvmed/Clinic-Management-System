// import React, { useState } from 'react';
// import './DoctorDashboard.css';
// import PatientBookings from './PatientBookings';

// const DoctorDashboard = () => {
//   const [slots, setSlots] = useState([]);
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [sessionTime, setSessionTime] = useState('');
//   const [maxPatients, setMaxPatients] = useState('');
//   const [editingId, setEditingId] = useState(null);
//   const [activePage, setActivePage] = useState('slots');

//   const addOrEditSlot = () => {
//     if (!date || !time) return;

//     if (editingId !== null) {
//       setSlots(slots.map(slot =>
//         slot.id === editingId
//           ? {
//               ...slot,
//               date,
//               time,
//               sessionTime: sessionTime || '—',
//               maxPatients: maxPatients || '—'
//             }
//           : slot
//       ));
//       setEditingId(null);
//     } else {
//       const newSlot = {
//         id: Date.now(),
//         date,
//         time,
//         sessionTime: sessionTime || '—',
//         maxPatients: maxPatients || '—',
//         available: true,
//         patients: []
//       };
//       setSlots([...slots, newSlot]);
//     }

//     setDate('');
//     setTime('');
//     setSessionTime('');
//     setMaxPatients('');
//   };

//   const toggleAvailability = (id) => {
//     setSlots(slots.map(slot =>
//       slot.id === id ? { ...slot, available: !slot.available } : slot
//     ));
//   };

//   const cancelSlot = (id) => {
//     setSlots(slots.filter(slot => slot.id !== id));
//   };

//   const editSlot = (slot) => {
//     setDate(slot.date);
//     setTime(slot.time);
//     setSessionTime(slot.sessionTime || '');
//     setMaxPatients(slot.maxPatients);
//     setEditingId(slot.id);
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="sidebar">
//         <div className="profile">
//           <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" alt="Dr" width="100" />
//           <h2>Dr. Ayman Hossam</h2>
//           <p>Cardiologist</p>
//           <p>Over 10 years experience in heart surgery and patient care.</p>
//         </div>

//         <br />

//         <div className="nav-links">
//           <button
//             onClick={() => setActivePage('slots')}
//             className={activePage === 'slots' ? 'active' : ''}
//           >
//             My Slots
//           </button>
//           <button
//             onClick={() => setActivePage('bookings')}
//             className={activePage === 'bookings' ? 'active' : ''}
//           >
//             Patient Bookings
//           </button>
//         </div>
//       </div>

//       <div className="main-content">
//         {activePage === 'slots' ? (
//           <>
//             <div className="section">
//               <h2>{editingId ? 'Edit Slot' : 'Add Slot'}</h2>
//               <div className="add-slot-form">
//                 <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
//                 <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
//                 <input
//                   type="text"
//                   placeholder="Session Time (e.g., 30 mins)"
//                   value={sessionTime}
//                   onChange={(e) => setSessionTime(e.target.value)}
//                 />
//                 <input
//                   type="number"
//                   placeholder="Max Patients"
//                   value={maxPatients}
//                   onChange={(e) => setMaxPatients(e.target.value)}
//                 />
//                 <button onClick={addOrEditSlot}>{editingId ? 'Update' : 'Add Slot'}</button>
//               </div>
//             </div>

//             <div className="section">
//               <h3>Upcoming Slots</h3>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Date</th>
//                     <th>Time</th>
//                     <th>Session Time</th>
//                     <th>Max Patients</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {slots.map(slot => (
//                     <tr key={slot.id} className={!slot.available ? 'not-available' : ''}>
//                       <td>{slot.date}</td>
//                       <td>{slot.time}</td>
//                       <td>{slot.sessionTime}</td>
//                       <td>{slot.maxPatients}</td>
//                       <td>{slot.available ? 'Available' : 'Unavailable'}</td>
//                       <td className="availability-actions">
//                         <button onClick={() => toggleAvailability(slot.id)}>
//                           {slot.available ? 'Mark Unavailable' : 'Mark Available'}
//                         </button>
//                         <button onClick={() => editSlot(slot)}>Edit</button>
//                         <button className="cancel-btn" onClick={() => cancelSlot(slot.id)}>Delete</button>
//                       </td>
//                     </tr>
//                   ))}
//                   {slots.length === 0 && (
//                     <tr>
//                       <td colSpan="6">No slots added yet.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         ) : (
//           <PatientBookings slots={slots} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;


import React, { useState, useEffect } from 'react';
import './DoctorDashboard.css';
import PatientBookings from './PatientBookings';

const API_URL = 'https://your-api.com/slots';
const DOCTOR_API_URL = 'https://your-api.com/doctor/profile'; // عدله حسب الباك

const DoctorDashboard = () => {
  const [slots, setSlots] = useState([]);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [maxPatients, setMaxPatients] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [activePage, setActivePage] = useState('slots');

  useEffect(() => {
    fetchDoctorInfo();
    fetchSlots();
  }, []);

  const fetchDoctorInfo = async () => {
    try {
      const res = await fetch(DOCTOR_API_URL, {
        headers: {
          Authorization: 'Bearer your-token', // أو حطها من localStorage لو عندك
        },
      });
      const data = await res.json();
      setDoctorInfo(data);
    } catch (err) {
      console.error('Failed to fetch doctor info:', err);
    }
  };

  const fetchSlots = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setSlots(data);
    } catch (err) {
      console.error('Failed to fetch slots:', err);
    }
  };

  const addOrEditSlot = async () => {
    if (!date || !time) return;

    const slotData = {
      date,
      time,
      sessionTime: sessionTime || '—',
      maxPatients: maxPatients || '—',
    };

    try {
      if (editingId !== null) {
        await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(slotData),
        });
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...slotData, available: true }),
        });
      }

      fetchSlots();
      clearForm();
    } catch (err) {
      console.error('Failed to save slot:', err);
    }
  };

  const clearForm = () => {
    setDate('');
    setTime('');
    setSessionTime('');
    setMaxPatients('');
    setEditingId(null);
  };

  const toggleAvailability = async (id) => {
    const currentAvailability = slots.find(slot => slot.id === id)?.available;
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: !currentAvailability }),
      });
      fetchSlots();
    } catch (err) {
      console.error('Failed to update availability:', err);
    }
  };

  const cancelSlot = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      fetchSlots();
    } catch (err) {
      console.error('Failed to delete slot:', err);
    }
  };

  const editSlot = (slot) => {
    setDate(slot.date);
    setTime(slot.time);
    setSessionTime(slot.sessionTime || '');
    setMaxPatients(slot.maxPatients);
    setEditingId(slot.id);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="profile">
          <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" alt="Dr" width="100" />
          {doctorInfo ? (
            <>
              <h2>Dr. {doctorInfo.name}</h2>
              <p>{doctorInfo.specialization}</p>
              <p>{doctorInfo.bio}</p>
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>

        <br />

        <div className="nav-links">
          <button
            onClick={() => setActivePage('slots')}
            className={activePage === 'slots' ? 'active' : ''}
          >
            My Slots
          </button>
          <button
            onClick={() => setActivePage('bookings')}
            className={activePage === 'bookings' ? 'active' : ''}
          >
            Patient Bookings
          </button>
        </div>
      </div>

      <div className="main-content">
        {activePage === 'slots' ? (
          <>
            <div className="section">
              <h2>{editingId ? 'Edit Slot' : 'Add Slot'}</h2>
              <div className="add-slot-form">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                <input
                  type="text"
                  placeholder="Session Time (e.g., 30 mins)"
                  value={sessionTime}
                  onChange={(e) => setSessionTime(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max Patients"
                  value={maxPatients}
                  onChange={(e) => setMaxPatients(e.target.value)}
                />
                <button onClick={addOrEditSlot}>{editingId ? 'Update' : 'Add Slot'}</button>
              </div>
            </div>

            <div className="section">
              <h3>Upcoming Slots</h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Session Time</th>
                    <th>Max Patients</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {slots.map(slot => (
                    <tr key={slot.id} className={!slot.available ? 'not-available' : ''}>
                      <td>{slot.date}</td>
                      <td>{slot.time}</td>
                      <td>{slot.sessionTime}</td>
                      <td>{slot.maxPatients}</td>
                      <td>{slot.available ? 'Available' : 'Unavailable'}</td>
                      <td className="availability-actions">
                        <button onClick={() => toggleAvailability(slot.id)}>
                          {slot.available ? 'Mark Unavailable' : 'Mark Available'}
                        </button>
                        <button onClick={() => editSlot(slot)}>Edit</button>
                        <button className="cancel-btn" onClick={() => cancelSlot(slot.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {slots.length === 0 && (
                    <tr>
                      <td colSpan="6">No slots added yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <PatientBookings slots={slots} />
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;

