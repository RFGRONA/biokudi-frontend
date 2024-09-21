import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { verifyTokenApi } from "../services/authService";

const PrivateRoute = ({ allowedRoles }) => {
  const { jwtToken, user, logout } = useAuth();
  const [isVerified, setIsVerified] = useState(false);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await verifyTokenApi(jwtToken);

        if (response.isValid) {
          /*Role Verification */
          if (allowedRoles.includes(user.role)) {
            setIsVerified(true);
          } else {
            setIsUnauthorized(true);
          }
        } else {
          logout();
          console.log("Token is not valid");
        }
      } catch (error) {
        console.log("Error:", error);
        logout();
      }
    };

    if (jwtToken) {
      verifyToken();
    } else {
      setIsUnauthorized(true);
    }
  }, [jwtToken, user.role, logout, allowedRoles]);
  if (isUnauthorized) {
    return <Navigate to="/unauthorized" />;
  }

  return isVerified ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
