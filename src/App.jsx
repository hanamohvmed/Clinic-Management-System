import { createBrowserRouter, RouterProvider } from "react-router";
import { Login } from "./pages/Login";
import RegisterDoctor from "./pages/RegisterDoctor";
import RegisterPatient from "./pages/RegisterPatient";
import { WelcomePage } from "./pages/WelcomePage";
import "./styles.css";

const routes = [
  { path: "/", element: <WelcomePage /> },
  { path: "/login", element: <Login /> },
  { path: "/registerDoctor", element: <RegisterDoctor /> },
  { path: "/RegisterPatient", element: <RegisterPatient /> },
  { path: "*", element: <WelcomePage /> }
];

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
