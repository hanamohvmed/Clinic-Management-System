import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const storedUser = JSON.parse(localStorage.getItem("user"));
const storedToken = localStorage.getItem("token");

function AuthProvider({ children }) {
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);

  const isAuthenticated = !!token;

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const login = async (email, password) => {
    const response = await fetch("http://clinicdev.runasp.net/api/Auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Login failed");

    const data = await response.json();

    setUser({ email: data.email });
    setToken(data.token);

    return data.token;
  };

  const register = async (fullName, email, password,birthDate,gender) => {
    const response = await fetch("http://clinicdev.runasp.net/api/Auth/register-patient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password ,birthDate,gender}),
    });

    if (!response.ok)
        throw new Error("Registration failed");

    const data = await response.json();

    setUser({ email: data.email });
    setToken(data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

  };

  const contextValue = {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
