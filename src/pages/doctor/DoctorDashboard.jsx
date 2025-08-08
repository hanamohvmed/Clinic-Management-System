import React, { useState, useEffect } from 'react';
import './DoctorDashboard.css';
import PatientBookings from './PatientBookings';

const BASE_URL = 'http://clinic-dev.runasp.net/api';
const token = localStorage.getItem('token');

const DoctorDashboard = () => {
  const [slots, setSlots] = useState([]);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [date, setDate] = useState('');
  const [startTime, setTime] = useState('');
  const [sessionDuration, setSessionTime] = useState('');
  const [maxPatients, setMaxPatients] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [activePage, setActivePage] = useState('slots');

  useEffect(() => {
    fetchDoctorInfo();
  }, []);

  useEffect(() => {
    if (doctorInfo?.id) fetchSlots(doctorInfo.id);
  }, [doctorInfo]);

  const fetchDoctorInfo = async () => {
    try {
      const res = await fetch(`${BASE_URL}/Doctors/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setDoctorInfo(data);
    } catch (err) {
      console.error('Failed to fetch doctor info:', err);
    }
  };

  const fetchSlots = async (doctorId) => {
    try {
      const res = await fetch(`${BASE_URL}/DoctorSlots/get-doctor-slots?doctorId=${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setSlots(data);
    } catch (err) {
      console.error('Failed to fetch slots:', err);
    }
  };

  const addOrEditSlot = async () => {
    if (!date || !startTime || !sessionDuration || !maxPatients) return;
    if (!doctorInfo?.id) return;

    const slotData = {
      date,
      time: startTime,
      sessionMinutes: parseInt(sessionDuration),
      maxPatients: parseInt(maxPatients),
      isActive: true,
      doctorId: doctorInfo.id,
    };

    try {
      if (editingId !== null) {
        await fetch(`${BASE_URL}/DoctorSlots/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(slotData),
        });
      } else {
        await fetch(`${BASE_URL}/DoctorSlots/add-slot`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(slotData),
        });
      }

      fetchSlots(doctorInfo.id);
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

  const toggleAvailability = async (id, currentStatus) => {
    try {
      await fetch(`${BASE_URL}/DoctorSlots/change-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          slotId: id,
          available: !currentStatus,
          doctorId: doctorInfo.id,
        }),
      });
      fetchSlots(doctorInfo.id);
    } catch (err) {
      console.error('Failed to update availability:', err);
    }
  };

  const cancelSlot = async (id) => {
    try {
      await fetch(`${BASE_URL}/DoctorSlots/${id}?doctorId=${doctorInfo.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      fetchSlots(doctorInfo.id);
    } catch (err) {
      console.error('Failed to delete slot:', err);
    }
  };

  const editSlot = (slot) => {
    setDate(slot.date);
    setTime(slot.time || slot.startTime);
    setSessionTime(slot.sessionMinutes?.toString() || slot.sessionDuration?.toString() || '');
    setMaxPatients(slot.maxPatients.toString());
    setEditingId(slot.id);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="profile">
          <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" alt="Dr" width="100" />
          {doctorInfo ? (
            <>
              <h2>Dr. {doctorInfo.fullName}</h2>
              <p>{doctorInfo.clinicAddress}</p>
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
                <input type="time" value={startTime} onChange={(e) => setTime(e.target.value)} />
                <input
                  type="text"
                  placeholder="Session Time (minutes)"
                  value={sessionDuration}
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
                    <tr key={slot.id} className={!slot.isActive ? 'not-available' : ''}>
                      <td>{slot.date}</td>
                      <td>{slot.time || slot.startTime}</td>
                      <td>{slot.sessionMinutes || slot.sessionDuration}</td>
                      <td>{slot.maxPatients}</td>
                      <td>{slot.isActive ? 'Available' : 'Unavailable'}</td>
                      <td className="availability-actions">
                        <button onClick={() => toggleAvailability(slot.id, slot.isActive)}>
                          {slot.isActive ? 'Mark Unavailable' : 'Mark Available'}
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
