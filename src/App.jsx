import { createBrowserRouter, RouterProvider } from "react-router";
import { Login } from "./pages/auth/Login";
import RegisterDoctor from "./pages/auth/RegisterDoctor";
import RegisterPatient from "./pages/auth/RegisterPatient";
import { WelcomePage } from "./pages/shared/WelcomePage";
import MyBookings from "./pages/patient/MyBookings";

import "./App.css";
import UserLayout from "./pages/patient/UserLayout";
import Home from "./pages/patient/Home";
import BrowseDoctors from "./pages/patient/BrowseDoctors";
import Booking from "./pages/patient/booking";

const routes = [
  { path: "/", element: <WelcomePage /> },
  { path: "/login", element: <Login /> },
  { path: "/registerDoctor", element: <RegisterDoctor /> },
  { path: "/RegisterPatient", element: <RegisterPatient /> },
  {
    path: "/home",
    element: <UserLayout />,
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
