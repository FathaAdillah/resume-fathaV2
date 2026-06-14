import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import AdminLayout from "../layouts/AdminLayout";
import DashboardPage from "../pages/admin/DashboardPage";
import ExperiencePage from "../pages/admin/ExperiencePage";
import SkillsPage from "../pages/admin/SkillsPage";
import ProjectsPage from "../pages/admin/ProjectsPage";
import CertificationsPage from "../pages/admin/CertificationsPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuthStore();
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "experience", element: <ExperiencePage /> },
      { path: "skills", element: <SkillsPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "certifications", element: <CertificationsPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
