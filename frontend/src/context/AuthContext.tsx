import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import axiosInstance from "@/utils/useAxios";

// Definisikan tipe user authorization
interface Authorization {
  AccessToken: string;
  roles: string;
}

// Definisikan tipe respons check user
interface UserCheckResponse {
  data: {
    Role: {
      Role: string;
    };
  };
  // ...tambah properti lain sesuai respons API
}

// Definisikan tipe context
interface AuthContextType {
  isAuthorization: Authorization | null;
  usersCheck: UserCheckResponse | null;
  setUsers: React.Dispatch<React.SetStateAction<UserCheckResponse | null>>;
  setAuth: React.Dispatch<React.SetStateAction<Authorization | null>>;
  login: (username: string, password: string) => Promise<boolean>;
  UsersCheckHome: (accessToken: string) => Promise<void>;
}

// Buat context dengan default value null tapi tipe jelas
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props untuk provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthorization, setAuth] = useState<Authorization | null>(null);
  const [usersCheck, setUsers] = useState<UserCheckResponse | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("Token");
    if (userData) {
      setAuth(JSON.parse(userData));
    }
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await axiosInstance.post("/login/", {
        username,
        password,
      });
      localStorage.setItem("Token", JSON.stringify(response.data));
      setAuth(response.data); // ini update state isAuthorization
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };


  const UsersCheckHome = useCallback(async (accessToken: string) => {
    try {
   const response = await axiosInstance.post(
     "/home",
     {}, // body kosong
     {
       headers: { Authorization: `Bearer ${accessToken}` },
     }
   );


      setUsers(response.data);
    } catch (error) {
      console.log("UsersCheckHome error:", error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthorization,
        usersCheck,
        setUsers,
        setAuth,
        login,
        UsersCheckHome,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
