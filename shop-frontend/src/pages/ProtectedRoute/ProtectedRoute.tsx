import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProp {
  authorized: boolean;
  children: ReactNode;
}

export const ProtectedRoute = (props: ProtectedRouteProp) => {
  const { authorized, children } = props;

  if (!authorized) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
