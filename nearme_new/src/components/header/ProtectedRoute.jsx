import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../store/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { token, updateToken } = useAuthContext();
  if (!token) {
    // Redirect to the login page, but save the current location they were trying to go to
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};
export default ProtectedRoute;
