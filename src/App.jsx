import { createBrowserRouter, RouterProvider } from "react-router";
import { Login } from "./pages/auth/Login";
import RegisterDoctor from "./pages/auth/RegisterDoctor";
import RegisterPatient from "./pages/auth/RegisterPatient";
import { WelcomePage } from "./pages/shared/WelcomePage";
import MyBookings from "./pages/patient/MyBookings";
import "./App.css";

const routes = [
  { path: "/", element: <WelcomePage /> },
  { path: "/login", element: <Login /> },
  { path: "/registerDoctor", element: <RegisterDoctor /> },
  { path: "/RegisterPatient", element: <RegisterPatient /> },
  { path: "/my-bookings", element: <MyBookings /> },
  { path: "*", element: <WelcomePage /> },
];

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
