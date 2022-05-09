import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../libs/api";

interface LoginResponse {
  status: number;
}

interface AuthContextData {
  signed: boolean;
  user: object | null;
  login: (data: object) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")!));
    }
  }, []);

  async function login(data: object) {
    const response = await api.post("/users/login", data);
    if (response.status === 200) {
      setUser(response.data);
    }
    return response;
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  const { signed, user, login, logout } = context;

  return { signed, user, login, logout };
}
