import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import axiosInstance from "@/utils/useAxios";
import AuthContext from "@/context/AuthContext"; // import AuthContext

interface Role {
  id: number;
  Role: string;
}

export interface User {
  id: number;
  Username: string;
  No_Ktp: string;
  Email: string;
  Status: string;
  Bio: string;
  Role: Role;
}

interface UserContextType {
  users: User[];
  loading: boolean;
}

export const UsersContext = createContext<UserContextType>({
  users: [],
  loading: true,
});

export const UsersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔑 ambil token langsung dari AuthContext
  const auth = useContext(AuthContext);

 useEffect(() => {
   console.log("Auth context value:", auth);
   console.log("AccessToken:", auth?.isAuthorization);

   const fetchUsers = async () => {
     if (!auth?.isAuthorization?.AccessToken) {
       console.log("No token yet, skipping fetch...");
       return;
     }

     console.log(
       "Fetching users with token:",
       auth.isAuthorization.AccessToken
     );
     try {
       const response = await axiosInstance.get("/getallusers", {
         headers: {
           Authorization: `Bearer ${auth.isAuthorization.AccessToken}`,
         },
       });
       console.log("Fetched users:", response.data);
       setUsers(response.data.data);
     } catch (error) {
       console.error("Failed to fetch users:", error);
     } finally {
       setLoading(false);
     }
   };

   fetchUsers();
 }, [auth?.isAuthorization?.AccessToken]);


  return (
    <UsersContext.Provider value={{ users, loading }}>
      {children}
    </UsersContext.Provider>
  );
};
