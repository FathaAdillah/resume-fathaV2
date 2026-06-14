import { useState } from "react";
import {
  ClipboardList,
  Lightbulb,
  MessageSquare,
  Users,
  Clock,
  RefreshCw,
  ScanSearch,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { skills, softSkills } from "../../data/resume";
import { useInView } from "../../hooks/useInView";

const softIconMap: Record<string, LucideIcon> = {
  "Project Planning & Task Management": ClipboardList,
  "Problem Solving & Analytical Thinking": Lightbulb,
  "Communication with Technical & Non-Technical Teams": MessageSquare,
  "Team Collaboration (Cross-functional)": Users,
  "Time Management & Meeting Deadlines": Clock,
  "Adaptability to New Technologies": RefreshCw,
  "Attention to Detail": ScanSearch,
  "Responsibility & Ownership of Tasks": ShieldCheck,
};

const softIconColors: Record<string, string> = {
  "Project Planning & Task Management": "text-blue-600 bg-blue-50",
  "Problem Solving & Analytical Thinking": "text-yellow-600 bg-yellow-50",
  "Communication with Technical & Non-Technical Teams":
    "text-green-600 bg-green-50",
  "Team Collaboration (Cross-functional)": "text-purple-600 bg-purple-50",
  "Time Management & Meeting Deadlines": "text-red-600 bg-red-50",
  "Adaptability to New Technologies": "text-cyan-600 bg-cyan-50",
  "Attention to Detail": "text-indigo-600 bg-indigo-50",
  "Responsibility & Ownership of Tasks": "text-emerald-600 bg-emerald-50",
};

const hardSkillCategories: { label: string; items: string[] }[] = [
  { label: "Languages & Frameworks", items: Object.values(skills).flat() },
  {
    label: "Architecture & Methodology",
    items: [
      "MVC",
      "SDLC",
      "Microservices",
      "RESTful API",
      "Agile",
      "Waterfall",
      "Git Workflow",
      "Docker",
      "Cloud Deployment",
    ],
  },
];

export default function SkillsSection() {
  const { ref, inView } = useInView();
  const [activeTab, setActiveTab] = useState<"hard" | "soft">("hard");

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-10 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-4xl font-black text-gray-950 mb-3">Skills</h2>
          <div className="w-12 h-1 bg-blue-700 rounded-full mx-auto" />
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-xl p-1 gap-1">
            {(["hard", "soft"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-blue-700 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab === "hard" ? "Hard Skills" : "Soft Skills"}
              </button>
            ))}
          </div>
        </div>

        {/* Hard Skills panel */}
        {activeTab === "hard" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {hardSkillCategories.map((group, i) => (
              <SkillGroup
                key={group.label}
                title={group.label}
                items={group.items}
                index={i}
              />
            ))}
          </div>
        )}

        {/* Soft Skills panel */}
        {activeTab === "soft" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {softSkills.map((skill, i) => (
              <SoftCard key={i} skill={skill} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SkillGroup({
  title,
  items,
  index,
}: {
  title: string;
  items: string[];
  index: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <h3 className="text-base font-bold text-gray-900 mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <span
            key={skill}
            className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function SoftCard({ skill, index }: { skill: string; index: number }) {
  const { ref, inView } = useInView();
  const Icon = softIconMap[skill] ?? ShieldCheck;
  const colorClass = softIconColors[skill] ?? "text-gray-600 bg-gray-50";
  return (
    <div
      ref={ref}
      className={`bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-500 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${colorClass}`}
      >
        <Icon size={22} />
      </div>
      <p className="text-gray-700 text-xs font-medium leading-tight">{skill}</p>
    </div>
  );
}
