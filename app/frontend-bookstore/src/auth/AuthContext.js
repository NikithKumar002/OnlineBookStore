import { createContext, useContext, useState, useEffect } from "react";
import { setAuthToken } from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(
  //   JSON.parse(localStorage.getItem("user"))
  // );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setAuthToken(parsedUser.token);
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("authUser", JSON.stringify(userData));
    setAuthToken(userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    setAuthToken(null);
  };

  
  if (loading) {
    return <div style={{ textAlign: "center", marginTop: 100 }}>🔄 Restoring session...</div>;
  }


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
