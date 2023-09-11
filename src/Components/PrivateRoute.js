import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const PrivateRoute = () => {
  const username = useSelector((state) => state?.authentication.username);

  return username ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
