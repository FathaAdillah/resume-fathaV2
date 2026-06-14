import { Briefcase, Code2, Award, FolderOpen } from "lucide-react";

const stats = [
  {
    label: "Experiences",
    value: "3",
    icon: Briefcase,
    color: "text-blue-600 bg-blue-50",
  },
  {
    label: "Skills",
    value: "20+",
    icon: Code2,
    color: "text-violet-600 bg-violet-50",
  },
  {
    label: "Projects",
    value: "8",
    icon: FolderOpen,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    label: "Certifications",
    value: "12",
    icon: Award,
    color: "text-amber-600 bg-amber-50",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-black text-gray-900 mb-1">Dashboard</h1>
      <p className="text-gray-400 text-sm mb-8">Welcome back, Fatharoni.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
          >
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${color}`}
            >
              <Icon size={22} />
            </div>
            <p className="text-3xl font-black text-gray-900 mb-1">{value}</p>
            <p className="text-gray-400 text-sm">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
