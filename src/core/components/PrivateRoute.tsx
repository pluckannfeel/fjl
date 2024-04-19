import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/contexts/AuthProvider";
import { useApplicantAuth } from "../../mirairo/contexts/ApplicantAuthProvider";

type PrivateRouteProps = {
  //   roles?: string[];
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { applicantInfo } = useApplicantAuth();

  if (!applicantInfo) {
    return <Navigate to="/mirairo" replace />;
  }

  //   if (roles && !hasRole(roles)) {
  //     return <Navigate to="/403" replace />;
  //   }

  return children;
};

export default PrivateRoute;
