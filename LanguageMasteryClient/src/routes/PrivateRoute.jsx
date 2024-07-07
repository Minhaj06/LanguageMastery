import React from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/auth";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return;
  }

  if (user) {
    return children;
  }
  return <Navigate state={{ from: location }} to="/login" replace></Navigate>;
};

export default PrivateRoute;
