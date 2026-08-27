import { useQuery } from "@tanstack/react-query";
import { Briefcase, Code2, Award, FolderOpen, Mail } from "lucide-react";
import api from "../../services/api";

const statConfig = [
  {
    key: "experiences",
    label: "Experiences",
    icon: Briefcase,
    color: "text-blue-600 bg-blue-50",
  },
  {
    key: "skills",
    label: "Skills",
    icon: Code2,
    color: "text-violet-600 bg-violet-50",
  },
  {
    key: "projects",
    label: "Projects",
    icon: FolderOpen,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    key: "certifications",
    label: "Certifications",
    icon: Award,
    color: "text-amber-600 bg-amber-50",
  },
  {
    key: "messages",
    label: "Messages",
    icon: Mail,
    color: "text-rose-600 bg-rose-50",
  },
];

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => api.get("/dashboard/stats").then((r) => r.data),
  });

  return (
    <div>
      <h1 className="text-2xl font-black text-gray-900 mb-1">Dashboard</h1>
      <p className="text-gray-400 text-sm mb-8">Welcome back, Fatharoni.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statConfig.map(({ key, label, icon: Icon, color }) => (
          <div
            key={key}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
          >
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${color}`}
            >
              <Icon size={22} />
            </div>
            <p className="text-3xl font-black text-gray-900 mb-1">
              {isLoading ? "..." : (stats?.[key] ?? 0)}
            </p>
            <p className="text-gray-400 text-sm">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
