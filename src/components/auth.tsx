import { useState, useLayoutEffect } from "react";
import { AuthContext } from "@/lib/auth-context";
import { jwtDecode } from "jwt-decode";
import type { User } from "@/lib/types";
import axios from "axios";
import api from "@/lib/api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("access_token")
  );

  const [user, setUser] = useState<User | null | Partial<User>>(() => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      return null;
    }
  });

  useLayoutEffect(() => {
    const authInterceptor = axios.interceptors.request.use((config) => {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    return () => {
      axios.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  const setUserSync = (updates: Partial<User> | null) => {
    setUser((prev) => {
      if (!updates || !prev) return updates;

      const merged = { ...prev, ...updates };
      localStorage.setItem("user", JSON.stringify(merged));
      return merged;
    });
  };

  const login = async (token: string) => {
    try {
      localStorage.setItem("access_token", token);
      setToken(token);

      const jwt = jwtDecode<{ sub: string }>(token);
      const user = await api.getUserbyUsername(jwt.sub);

      setUserSync(user);
    } catch (err) {
      console.error("Login failed", err);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        user,
        setUserSync: setUserSync,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
