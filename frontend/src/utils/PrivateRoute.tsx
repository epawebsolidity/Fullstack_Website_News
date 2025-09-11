import React, { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import { Role } from "@/utils/Role";

interface PrivateRouteProps {
  children: ReactNode;
  allowRoles?: Role[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  allowRoles = [],
}) => {
  const { isAuthorization, UsersCheckHome, usersCheck } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorization?.AccessToken) {
      UsersCheckHome(isAuthorization.AccessToken);
    }
  }, [isAuthorization, UsersCheckHome]);

  useEffect(() => {
    if (!isAuthorization || !isAuthorization.AccessToken) {
      navigate("/signin");
      return;
    }

    const userRole = usersCheck?.data?.Role?.Role || isAuthorization.roles;
    if (allowRoles.length > 0 && !allowRoles.includes(userRole)) {
      navigate("/signin");
      return;
    }
  }, [isAuthorization, usersCheck, allowRoles, navigate]);

  return <>{children}</>;
};

export default PrivateRoute;
