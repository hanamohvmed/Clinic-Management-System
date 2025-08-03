import { createBrowserRouter, RouterProvider } from "react-router";
import { Login } from "./pages/Login";
import Register from "./pages/Register";
import { WelcomePage } from "./pages/WelcomePage";
import "./App.css";

const routes = [
  { path: "/", element: <WelcomePage /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <WelcomePage /> }
];

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
