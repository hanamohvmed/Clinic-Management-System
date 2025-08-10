# 🏥 MediCore – Clinic Management System

**MediCore** is a comprehensive fullstack ( React.js | .NET ) clinic management platform designed to connect **patients** and **doctors** through secure authentication, efficient scheduling, and an intuitive interface.  
It features **role-based access control**, responsive design, and a robust backend for managing appointments, schedules, and user data.

---

## 📑 Table of Contents
1. [Authentication Module](#1-authentication-module)
2. [Doctor Management Module](#2-doctor-management-module)
3. [Patient Management Module](#3-patient-management-module)
4. [Backend Overview](#4-backend-overview)

---

## 1. Authentication Module

Ensures secure registration, login, and session management for patients and doctors, with **role-based access control** and persistent sessions.

### 1.1 Registration
- **Fields**: Full name, email, password, birth date, gender.  
- **Validation**:
  - Password: Minimum **8 characters**, must include **uppercase**, **lowercase**, **digit**, and **special character**.
  - Email: Must be in valid format.
  - Confirm password: Must match.
- **UX Features**:
  - Toggle password visibility.
  - Real-time error messages.
- **Flow**: Redirect to login after successful registration.

### 1.2 Login 
- **Role-Based Redirects**:
  - Patient → `/home`
  - Doctor → `/doctor-dashboard`
  - Unauthorized → `/unauthorized`
- **Validation**: Email + strong password.
- **Features**: Password visibility toggle, error handling, JWT decoding to determine role.

### 1.3 Authentication Context 
- Stores `user` and `token` in **localStorage**.
- Provides `isAuthenticated` for conditional rendering.
- **API Integration**:
  - `POST /api/Auth/login`
  - `POST /api/Auth/register-patient`
- Logout clears all stored data.

### 1.4 Form Validation 
- **Login Schema**: Email + password rules.
- **Registration Schema**: Full name, birth date, gender, email, password, confirmation.

**Highlights**:
✅ JWT-based authentication  
✅ Role-based routing  
✅ Persistent sessions  
✅ Real-time validation  
✅ Password visibility toggle  

---

## 2. Doctor Management Module

Empowers doctors to manage their profiles, schedules, and patient bookings.

### 2.1 Doctor Dashboard 
- **Profile Section**: Name, bio, profile picture from `GET /api/Doctors/profile`.
- **Navigation Sidebar**: My Slots, Patient Bookings, Logout.
- **Slot Management**:
  - Add (`POST /api/DoctorSlots/add-slot`)
  - Edit (`PUT /api/DoctorSlots/{id}`)
  - Toggle availability (`PUT /api/DoctorSlots/change-status?slotId={id}`)
  - Delete (`DELETE /api/DoctorSlots/{id}`) – only if no bookings exist.
- **Upcoming Slots Table**:
  - Displays Date, Time, Duration, Max Patients, Status with actions.

### 2.2 Patient Bookings (`PatientBookings.jsx`)
- **View Appointments**: `GET /api/Doctors/Bookings`
- Displays:
  - Date & Time
  - Patient details (name, reason, phone number)
- **Real-Time Updates** on slot changes.
- **Empty State**: *"No bookings found."*

**Highlights**:
✅ JWT-secured API calls  
✅ Efficient schedule control  

---

## 3. Patient Management Module

Allows patients to browse doctors, book appointments, and manage bookings.

### 3.1 Layout 
- Shared NavBar + Footer across all patient pages.
- `<Outlet />` for nested routing.

### 3.2 Home Page 
- **Hero Section**:
- **Call-to-Action Buttons**:

### 3.3 Browse Doctors 
- **Search & Filter**:
  - Search by name.
  - Filter by specialization.
- **API**:
  - `GET /api/Doctors/search`
  - `GET /api/Specializations`
- Doctor cards with:
  - Name, specialization, bio, clinic address, profile picture.
  - "Book Appointment".

### 3.4 Booking 
- **Slot Selection**: `GET /api/DoctorSlots/get-doctor-slots?doctorId=<id>`.
- **Booking Form**:
  - Phone number (required).
  - Reason for visit.
- **API**: `POST /api/Appointments/book`
- Confirmation alerts & error handling.

### 3.5 My Appointments 
- **Views**: Upcoming & Past/Cancelled.
- **Search**: By doctor name or specialty.
- Appointment cards show:
  - Doctor info, date/time, status, reason, contact.
- **Cancel Flow**:
  - Confirmation modal.
  - API: `DELETE /api/Appointments/<id>`.
  - Toast notifications.

**Highlights**:
✅ Doctor search & filtering  
✅ Real-time slot availability  
✅ Appointment booking & cancellation  
✅ JWT-protected persistence  

---

## 4. Backend Overview

Built with **ASP.NET Core** and **SQL Server**, providing secure APIs for all frontend modules.

### 4.1 Authentication & Authorization
- JWT with Patient, Doctor, and Admin roles.
- **Endpoints**:
  - `POST /api/Auth/login`
  - `POST /api/Auth/register-patient`
  - `POST /api/Auth/register-doctor` (admin-only)
- Password hashing (ASP.NET Identity).
- Token expiry: 1 hour.

### 4.2 Appointment Management
- Prevents double-booking.
- Enforces 24-hour cancellation policy.
- **Endpoints**:
  - `GET /api/Appointments`
  - `POST /api/Appointments/book`
  - `DELETE /api/Appointments/{id}`

### 4.3 Doctor Scheduling
- Add, edit, toggle, limit patient slots.
- **Endpoints**:
  - `GET /api/DoctorSlots`
  - `POST /api/DoctorSlots/add-slot`
  - `PUT /api/DoctorSlots/{id}`

### 4.4 Database Structure
- **Users** – base for all accounts.
- **Patients** – extends Users.
- **Doctors** – extends Users, linked to Specializations.
- **Appointments** – links patients to slots.
- **DoctorSlots** – availability management.

### 4.5 Security & Validation
- JWT required for all secure requests.
- Validations for:
  - Required fields.
  - Overlapping slots.
  - Appointment reason length.

