import { createBrowserRouter, RouterProvider } from "react-router";
import { Login } from "./pages/auth/Login";
import { WelcomePage } from "./pages/shared/WelcomePage";
import MyBookings from "./pages/patient/MyBookings";

import "./App.css";
import UserLayout from "./pages/patient/UserLayout";
import Home from "./pages/patient/Home";
import BrowseDoctors from "./pages/patient/BrowseDoctors";
import Booking from "./pages/patient/booking";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import RegisterForm from "./pages/auth/RegisterForm";
import ProtectedRoute from "./Components/ProtectedRoute";
import UnAuthorized from "./Components/UnAuthorized";

const routes = [
  { path: "/", element: <WelcomePage /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <RegisterForm /> },
  { path: "/unauthorized", element: <UnAuthorized /> },
  {
    path: "/doctor-dashboard",
    element: (
      <ProtectedRoute allowedRoles={["doctor"]}>
        <DoctorDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute allowedRoles={["patient"]}>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Home /> },
      { path: "doctors-list", element: <BrowseDoctors /> },
      { path: "my-bookings", element: <MyBookings /> },
      { path: "book-appointment", element: <Booking /> },
    ],
  },
  { path: "*", element: <WelcomePage /> },
];

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
