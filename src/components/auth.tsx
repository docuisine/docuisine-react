import { useEffect, useState, useLayoutEffect } from "react";
import { AuthContext } from "@/lib/auth-context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const user = localStorage.getItem("user");
    if (user) setUser(user);
    if (token) setToken(token);
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = axios.interceptors.request.use((config) => {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    return () => {
      axios.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  const login = (token: string) => {
    const jwt = jwtDecode<{ sub: string }>(token);
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", jwt.sub);

    setUser(jwt.sub);
    setToken(token);
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
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
