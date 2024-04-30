import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/contexts/AuthProvider";

interface RedirectAdminProps {
  children: React.ReactNode;
}

const RedirectAdmin: React.FC<RedirectAdminProps> = ({ children }) => {
  const { adminInfo, authKey } = useAuth();
  const location = useLocation();

  if (adminInfo || authKey) {
    const redirectPath =
      (location.state as { from?: { pathname: string } })?.from?.pathname ||
      "/admin";
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default RedirectAdmin;
