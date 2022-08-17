import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/user/selectors";

type TProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: TProtectedRouteProps) => {
  const { user } = useSelector(selectUserData);
  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRoute;
