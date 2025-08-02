import React, { useState } from 'react';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [maxPatients, setMaxPatients] = useState('');
  const [editingId, setEditingId] = useState(null);

  const addOrEditSlot = () => {
    if (!date || !time) return;
  
    if (editingId !== null) {
      setSlots(slots.map(slot =>
        slot.id === editingId
          ? { ...slot, date, time, maxPatients: maxPatients || '—' }
          : slot
      ));
      setEditingId(null);
    } else {
      const newSlot = {
        id: Date.now(),
        date,
        time,
        maxPatients: maxPatients || '—',
        available: true,
        patients: []
      };
      setSlots([...slots, newSlot]);
    }
  
    setDate('');
    setTime('');
    setMaxPatients('');
  };
  
  const toggleAvailability = (id) => {
    setSlots(slots.map(slot =>
      slot.id === id ? { ...slot, available: !slot.available } : slot
    ));
  };

  const cancelSlot = (id) => {
    setSlots(slots.filter(slot => slot.id !== id));
  };

  const editSlot = (slot) => {
    setDate(slot.date);
    setTime(slot.time);
    setMaxPatients(slot.maxPatients);
    setEditingId(slot.id);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="profile">
        <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" alt="Dr" width="100" />
          <h2>Dr. Ayman Hossam</h2>
          <p>Cardiologist</p>
          <p>Over 10 years experience in heart surgery and patient care.</p>
        </div>
      </div>

      <div className="main-content">
        <div className="section">
          <h2>{editingId ? 'Edit Slot' : 'Add Slot'}</h2>
          <div className="add-slot-form">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
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
                  <td colSpan="5">No slots added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="section">
          <h3>Patient Bookings</h3>
          {slots.map(slot => (
            <div key={slot.id}>
              <strong>{slot.date} at {slot.time}</strong>
              <ul>
                {slot.patients.length === 0 ? (
                  <li>No bookings</li>
                ) : (
                  slot.patients.map((patient, index) => (
                    <li key={index}>{patient}</li>
                  ))
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;


// import React, { useState, useEffect } from 'react';
// import './DoctorDashboard.css';

// const DoctorDashboard = () => {
//   const [slots, setSlots] = useState([]);
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [maxPatients, setMaxPatients] = useState('');
//   const [editingId, setEditingId] = useState(null);
//   const [doctorInfo, setDoctorInfo] = useState({
//     id: '',
//     name: '',
//     specialty: '',
//     bio: '',
//     image: ''
//   });

//   useEffect(() => {
//     const storedDoctor = localStorage.getItem('doctor');
//     if (storedDoctor) {
//       const parsed = JSON.parse(storedDoctor);
//       setDoctorInfo(parsed);

//       fetch(`/api/doctor/${parsed.id}`)
//         .then(res => res.json())
//         .then(data => {
//           setDoctorInfo(prev => ({
//             ...prev,
//             name: data.name,
//             specialty: data.specialty,
//             bio: data.bio,
//             image: data.image
//           }));
//         })
//         .catch(() => {});
//     }

//     fetch('/api/slots')
//       .then(res => res.json())
//       .then(data => setSlots(data))
//       .catch(() => {});
//   }, []);

//   const addOrEditSlot = () => {
//     if (!date || !time) return;

//     const payload = {
//       id: editingId || Date.now(),
//       date,
//       time,
//       maxPatients: maxPatients || '—',
//       available: true,
//       patients: [],
//       doctorId: doctorInfo.id
//     };

//     const method = editingId ? 'PUT' : 'POST';
//     const url = editingId ? `/api/slots/${editingId}` : '/api/slots';

//     fetch(url, {
//       method,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload)
//     })
//       .then(res => res.json())
//       .then((savedSlot) => {
//         if (editingId) {
//           setSlots(slots.map(s => s.id === editingId ? savedSlot : s));
//         } else {
//           setSlots([...slots, savedSlot]);
//         }
//         setDate('');
//         setTime('');
//         setMaxPatients('');
//         setEditingId(null);
//       });
//   };

//   const toggleAvailability = (id) => {
//     const updated = slots.map(slot =>
//       slot.id === id ? { ...slot, available: !slot.available } : slot
//     );
//     const updatedSlot = updated.find(s => s.id === id);

//     fetch(`/api/slots/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedSlot)
//     }).then(() => setSlots(updated));
//   };

//   const cancelSlot = (id) => {
//     fetch(`/api/slots/${id}`, {
//       method: 'DELETE'
//     }).then(() => setSlots(slots.filter(s => s.id !== id)));
//   };

//   const editSlot = (slot) => {
//     setDate(slot.date);
//     setTime(slot.time);
//     setMaxPatients(slot.maxPatients);
//     setEditingId(slot.id);
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="sidebar">
//         <div className="profile">
//           <img
//             src={doctorInfo.image || 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png'}
//             alt="Doctor"
//             width="100"
//           />
//           <h2>{doctorInfo.name || 'Doctor Name'}</h2>
//           <p>{doctorInfo.specialty || 'Specialty'}</p>
//           <p>{doctorInfo.bio || 'Bio info goes here'}</p>
//         </div>
//       </div>

//       <div className="main-content">
//         <div className="section">
//           <h2>{editingId ? 'Edit Slot' : 'Add Slot'}</h2>
//           <div className="add-slot-form">
//             <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
//             <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
//             <input
//               type="number"
//               placeholder="Max Patients"
//               value={maxPatients}
//               onChange={(e) => setMaxPatients(e.target.value)}
//             />
//             <div className="slot-buttons">
//               <button onClick={addOrEditSlot}>{editingId ? 'Update' : 'Add Slot'}</button>
//             </div>
//           </div>
//         </div>

//         <div className="section">
//           <h3>Upcoming Slots</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Max Patients</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {slots.map(slot => (
//                 <tr key={slot.id} className={!slot.available ? 'not-available' : ''}>
//                   <td>{slot.date}</td>
//                   <td>{slot.time}</td>
//                   <td>{slot.maxPatients}</td>
//                   <td>{slot.available ? 'Available' : 'Unavailable'}</td>
//                   <td className="availability-actions">
//                     <button onClick={() => toggleAvailability(slot.id)}>Toggle</button>
//                     <button onClick={() => editSlot(slot)}>Edit</button>
//                     <button className="cancel-btn" onClick={() => cancelSlot(slot.id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//               {slots.length === 0 && (
//                 <tr>
//                   <td colSpan="5">No slots added yet.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="section">
//           <h3>Patient Bookings</h3>
//           {slots.map(slot => (
//             <div key={slot.id}>
//               <strong>{slot.date} at {slot.time}</strong>
//               <ul>
//                 {slot.patients.length === 0
//                   ? <li>No bookings</li>
//                   : slot.patients.map((p, i) => <li key={i}>{p}</li>)
//                 }
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;
