import { lazy } from "react";
import {
  // Navigate,
  Route,
  Routes,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./core/components/PrivateRoute";
import AdminRoute from "./admin/components/AdminRoute";

// import PrivateRoute from "./core/components/PrivateRoute";

// const publicUrl = import.meta.env.BASE_URL;

//Landing
const Landing = lazy(() => import("./landing/pages/Landing"));

//Mirairo
const MirairoManagement = lazy(
  () => import("./mirairo/pages/MirairoManagement")
);

const ApplicantAdmin = lazy(() => import("./mirairo/pages/ApplicantAdmin"));
const ApplicantDashboard = lazy(
  () => import("./mirairo/pages/ApplicantDashboard")
);
const ApplicantForgotPassword = lazy(
  () => import("./mirairo/pages/ApplicantForgotPassword")
);
const ApplicantForgotPasswordSubmit = lazy(
  () => import("./mirairo/pages/ApplicantForgotPasswordSubmit")
);

//Generate PDF
const GenerateResume = lazy(() => import("./mirairo/pages/GenerateResume"));

//Interview Entry Sheet Part Time
const InterviewManagement = lazy(
  () => import("./interview/pages/InterviewManagement")
);

const Forbidden = lazy(() => import("./core/pages/Forbidden"));
const NotFound = lazy(() => import("./core/pages/NotFound"));

// Admin
const Admin = lazy(() => import("./admin/pages/Admin"));
const AdminDashboard = lazy(() => import("./admin/pages/Dashboard"));
const AdminApplicantManagement = lazy(
  () => import("./admin/pages/ApplicantManagement")
);
const AdminLogin = lazy(() => import("./admin/pages/Login"));
const AdminRegister = lazy(() => import("./admin/pages/Register"));
// This component redirects the user to admin dashboard if they are authenticated and try to access the login page
const AdminRedirect = lazy(
  () => import("./admin/components/RedirectIfAuthenticated")
);

const AppRoutes = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/" element={<Landing />} />

        {/* Applicant */}
        <Route path="mirairo" element={<MirairoManagement />} />
        <Route
          path="mirairo/forgot-password"
          element={<ApplicantForgotPassword />}
        />
        <Route
          path="mirairo/forgot-password-submit"
          element={<ApplicantForgotPasswordSubmit />}
        />

        {/* Mirairo applicant dashboard */}
        <Route
          path="applicant-dashboard"
          element={
            <PrivateRoute>
              <ApplicantAdmin />
            </PrivateRoute>
          }
        >
          <Route index element={<ApplicantDashboard />} />
          <Route path="mirairo-resume" element={<GenerateResume />} />
        </Route>

        <Route path="interview" element={<InterviewManagement />} />

        <Route
          path="/admin-login"
          element={
            <AdminRedirect>
              <AdminLogin />
            </AdminRedirect>
          }
        />
        <Route
          path="/admin-register"
          element={
            <AdminRedirect>
              <AdminRegister />
            </AdminRedirect>
          }
        />
        <Route
          path="admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="applicants" element={<AdminApplicantManagement />} />
        </Route>

        {/* <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route
          path="forgot-password-submit"
          element={<ForgotPasswordSubmit />}
        />
        <Route path="register" element={<Register />} />
        <Route path="under-construction" element={<UnderConstructions />} />
        <Route path="403" element={<Forbidden />} />
        <Route path="404" element={<NotFound />} /> */}
        <Route path="*" element={<Navigate to={`404`} replace />} />

        <Route path="404" element={<NotFound />} />
        <Route path="403" element={<Forbidden />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
