import { lazy } from "react";
import {
  // Navigate,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

// import PrivateRoute from "./core/components/PrivateRoute";

// const publicUrl = import.meta.env.BASE_URL;

//Landing
const Landing = lazy(() => import("./landing/pages/Landing"));

//Mirairo
const MirairoManagement = lazy(
  () => import("./mirairo/pages/MirairoManagement")
);

//Generate PDF
const GenerateResume = lazy(() => import("./mirairo/pages/GenerateResume"));

//Interview Entry Sheet Part Time
const InterviewManagement = lazy(
  () => import("./interview/pages/InterviewManagement")
);

const NotFound = lazy(() => import("./core/pages/NotFound"));

// Admin
// const Admin = lazy(() => import("./admin/pages/Admin"));

const AppRoutes = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/" element={<Landing />} />

        <Route path="mirairo" element={<MirairoManagement />} />
        <Route path="mirairo-resume" element={<GenerateResume />} />

        <Route path="interview" element={<InterviewManagement />} />
        {/* <Route path="admin" element={<Admin />} /> */}

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
        {/* <Route path="*" element={<Navigate to={`404`} replace />} /> */}

        <Route path="404" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
