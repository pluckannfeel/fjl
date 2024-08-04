import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/contexts/AuthProvider";
import { useLocalStorage } from "@mantine/hooks";

interface RedirectAdminProps {
  children: React.ReactNode;
}

const RedirectAdmin: React.FC<RedirectAdminProps> = ({ children }) => {
  const { adminInfo, authKey } = useAuth();
  const location = useLocation();
  const [, setActive] = useLocalStorage({
    key: "activeNavbarLink",
    defaultValue: 0,
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    if (adminInfo || authKey) {
      setActive(0); // Reset active navbar link
    }
  }, [adminInfo, authKey, setActive]);

  if (adminInfo || authKey) {
    const redirectPath =
      (location.state as { from?: { pathname: string } })?.from?.pathname ||
      "/admin";
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default RedirectAdmin;
