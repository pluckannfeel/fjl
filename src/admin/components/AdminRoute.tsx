import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/contexts/AuthProvider";

type AdminRouteProps = {
  //   roles?: string[];
  children: JSX.Element;
};

const AdminRoute = ({ children }: AdminRouteProps) => {
  //   const { applicantInfo } = useApplicantAuth();
  const { adminInfo } = useAuth();

  if (!adminInfo) {
    return <Navigate to="/admin-login" replace />;
  }

  // check if there is auth key

  //   if (roles && !hasRole(roles)) {
  //     return <Navigate to="/403" replace />;
  //   }

  return children;
};

export default AdminRoute;
