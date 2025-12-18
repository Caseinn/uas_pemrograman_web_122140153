import { useState } from "react";
import Cookies from "js-cookie";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:6543/api/v1";

export function useAuth() {
  const [user, setUser] = useState(() => {
    const stored = Cookies.get("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return { success: false, message: data.message || "Login failed" };
      }

      Cookies.set("user", JSON.stringify(data.user), { expires: 1 });
      setUser(data.user);
      setLoading(false);

      const role = data.user.role;
      return { success: true, role };
    } catch (err) {
      setError("An unexpected error occurred.");
      setLoading(false);
      return { success: false, message: "Unexpected error" };
    }
  };

  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, role: "user" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return { success: false, errors: data.errors || {} };
      }

      setLoading(false);
      return { success: true };
    } catch (err) {
      setError("An unexpected error occurred.");
      setLoading(false);
      return { success: false, errors: { general: "Unexpected error" } };
    }
  };

  const logout = async () => {
    try {
      Cookies.remove("user");
      Cookies.remove("auth_tkt");
      setUser(null);
      return true;
    } catch (err) {
      setError("Failed to logout.");
      return false;
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}
