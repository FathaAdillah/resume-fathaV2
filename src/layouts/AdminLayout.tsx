import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Code2,
  Award,
  FolderOpen,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Experience", href: "/admin/experience", icon: Briefcase },
  { label: "Skills", href: "/admin/skills", icon: Code2 },
  { label: "Projects", href: "/admin/projects", icon: FolderOpen },
  { label: "Certifications", href: "/admin/certifications", icon: Award },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (href: string) =>
    href === "/admin"
      ? location.pathname === "/admin"
      : location.pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-60" : "w-16"
        } bg-white border-r border-gray-100 flex flex-col shrink-0 transition-all duration-300 ease-in-out`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-gray-100 gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center shrink-0">
            <span className="text-white font-black text-xs">FA</span>
          </div>
          {sidebarOpen && (
            <span className="font-bold text-gray-900 text-sm truncate">
              Fatha Admin
            </span>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              to={href}
              title={!sidebarOpen ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive(href)
                  ? "bg-blue-700 text-white shadow-sm"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              <Icon size={18} className="shrink-0" />
              {sidebarOpen && <span className="truncate">{label}</span>}
              {sidebarOpen && isActive(href) && (
                <ChevronRight size={14} className="ml-auto shrink-0" />
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            title={!sidebarOpen ? "Logout" : undefined}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} className="shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TopBar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-6 gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="flex-1" />
          <Link
            to="/"
            className="text-sm text-gray-400 hover:text-blue-700 transition-colors"
          >
            ← View Portfolio
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
