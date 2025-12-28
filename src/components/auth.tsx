import { useEffect, useState } from "react";
import { AuthContext } from "@/lib/auth-context";
import { jwtDecode } from "jwt-decode";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("access_token");
    const user = localStorage.getItem("user");
    if (user) setUser(user);
    if (stored) setToken(stored);
  }, []);

  const login = (token: string) => {
    const jwt = jwtDecode<{ sub: string }>(token);
    localStorage.setItem("access_token", token);
    localStorage.setItem("username", jwt.sub);

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
