import { createContext, useContext, useState } from "react";
import { setAuthToken } from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const login = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    setAuthToken(data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
