import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import apiClient from "@/utils/apiClient";
import { AuthResult, LoginData, RegisterData, User } from "@/types/interfaces";

interface UserContextType {
  isLogin: boolean;
  user: User | null;
  isUserLoading: boolean;
  isLogoutLoading: boolean;
  token: string | null;
  setIsLogin: (value: boolean) => void;
  setUser: (user: User | null) => void;
  login: (data: LoginData) => Promise<AuthResult>;
  register: (data: RegisterData) => Promise<AuthResult>;
  logout: () => Promise<AuthResult>;
}
interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);
  const [isLogoutLoading, setIsLogoutLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const fetchUserData = async (): Promise<void> => {
    const savedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (savedToken) {
      try {
        const response = await apiClient.get("/user", {
          headers: { Authorization: `Bearer ${savedToken}` },
        });
        setUser(response.data);
        setToken(savedToken);
        setIsLogin(true);
      } catch {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setToken(null);
        setIsLogin(false);
      } finally {
        setIsUserLoading(false);
      }
    } else {
      setIsUserLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const login = async (data: LoginData): Promise<AuthResult> => {
    try {
      const { email, password, remember } = data;

      const response = await apiClient.post("/login", { email, password });

      if (response.status === 200) {
        const { token, user } = response.data;
        setToken(token);
        setUser(user);
        setIsLogin(true);

        const storage = remember ? localStorage : sessionStorage;
        storage.setItem("token", token);
        return { success: true };
      }
    } catch (error: any) {
      const apiError =
        error.response?.data?.message || "Wystąpił nieoczekiwany błąd";

      return { success: false, error: apiError };
    }

    setIsLogin(false);
    return { success: false, error: "Wystąpił nieoczekiwany błąd" };
  };

  const register = async (data: RegisterData): Promise<AuthResult> => {
    try {
      const response = await apiClient.post("/register", data);

      if (response.status === 200) {
        const { token, user } = response.data;

        setToken(token);
        setUser(user);
        setIsLogin(true);

        sessionStorage.setItem("token", token);

        return { success: true };
      }
    } catch (error: any) {
      const apiError =
        error.response?.data?.message || "Wystąpił nieoczekiwany błąd";

      return { success: false, error: apiError };
    }

    return { success: false, error: "Wystąpił nieoczekiwany błąd" };
  };

  const logout = async (): Promise<AuthResult> => {
    setIsLogoutLoading(true);
    try {
      if (token) {
        await apiClient.post("/logout", {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      return { success: true };
    } catch (error: any) {
      const apiError =
        error.response?.data?.message || "Wystąpił nieoczekiwany błąd";
      return { success: false, error: apiError };
    } finally {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      setToken(null);
      setUser(null);
      setIsLogin(false);
      setIsLogoutLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLogin,
        user,
        isUserLoading,
        isLogoutLoading,
        token,
        setIsLogin,
        setUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
