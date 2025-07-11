import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return {
        token: token,
        role: decoded.role || decoded.Role,
       name: decoded.name || decoded.Name || decoded.email,
        email: decoded.email,
        authorities: decoded.authorities || []
      };
    } catch (err) {
      console.error("❌ Token không hợp lệ hoặc hết hạn:", err);
      localStorage.removeItem('token');
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('token', user.token);
    } else {
      localStorage.removeItem('token');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
