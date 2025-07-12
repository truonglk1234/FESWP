import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    if (!stored) return null;

    try {
      const parsed = JSON.parse(stored);
      const decoded = jwtDecode(parsed.token);

      // Kiểm tra hạn token nếu có "exp"
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        console.warn("⏰ Token hết hạn!");
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        return null;
      }

      return {
        token: parsed.token,
        name: decoded.name || decoded.Name || parsed.name || '',
        email: decoded.email || parsed.email || '',
        role: decoded.role || decoded.Role || parsed.role || '',
        authorities: decoded.authorities || [],
      };
    } catch (err) {
      console.error("❌ Token không hợp lệ hoặc lỗi:", err);
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      return null;
    }
  });

  // Lưu lại user khi thay đổi
  useEffect(() => {
    if (user) {
      const storage = localStorage.getItem("user") ? localStorage : sessionStorage;
      storage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
