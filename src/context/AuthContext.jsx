import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("Invalid user in localStorage", err);
      localStorage.removeItem("user"); // clean invalid entry
    }
  }
}, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token: user?.token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
