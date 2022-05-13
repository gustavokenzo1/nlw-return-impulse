import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../libs/api";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  login: (data: object) => Promise<any>;
  logout: () => void;
  apiKey: string,
  setApiKey: (apiKey: string) => void;
}

const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState(null);
  const [apiKey, setApiKey] = useState("");

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
    <AuthContext.Provider value={{ signed: !!user, user, login, logout, apiKey, setApiKey }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  const { signed, user, login, logout, apiKey, setApiKey } = context;

  return { signed, user, login, logout, apiKey, setApiKey };
}
