import {
  Layers,
  BarChart2,
  Network,
  Cloud,
  Database,
  Workflow,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { knowledge } from "../../data/resume";
import { useInView } from "../../hooks/useInView";

const knowledgeIconMap: Record<string, LucideIcon> = {
  "Software Development Life Cycle (SDLC)": Layers,
  "Project Management (Agile & Waterfall)": BarChart2,
  "RESTful API Architecture & Integration": Network,
  "Cloud Computing (deployment, scaling, monitoring)": Cloud,
  "Database Design & Data Management": Database,
  "System Integration & Automation": Workflow,
  "Web Application Architecture (MVC, Microservices)": Globe,
};

const knowledgeIconColors: Record<string, string> = {
  "Software Development Life Cycle (SDLC)": "text-blue-600 bg-blue-50",
  "Project Management (Agile & Waterfall)": "text-violet-600 bg-violet-50",
  "RESTful API Architecture & Integration": "text-cyan-600 bg-cyan-50",
  "Cloud Computing (deployment, scaling, monitoring)": "text-sky-600 bg-sky-50",
  "Database Design & Data Management": "text-amber-600 bg-amber-50",
  "System Integration & Automation": "text-emerald-600 bg-emerald-50",
  "Web Application Architecture (MVC, Microservices)":
    "text-indigo-600 bg-indigo-50",
};

const knowledgeDesc: Record<string, string> = {
  "Software Development Life Cycle (SDLC)":
    "Structured approach to software planning and delivery",
  "Project Management (Agile & Waterfall)":
    "Managing timelines, resources and deliverables",
  "RESTful API Architecture & Integration":
    "Designing and integrating APIs for modern systems",
  "Cloud Computing (deployment, scaling, monitoring)":
    "AWS, Alibaba Cloud, VPS and containerization",
  "Database Design & Data Management": "MySQL, PostgreSQL, Oracle SQL, NoSQL",
  "System Integration & Automation":
    "Connecting enterprise systems and workflows",
  "Web Application Architecture (MVC, Microservices)":
    "Scalable and maintainable app structures",
};

export default function KnowledgeSection() {
  const { ref, inView } = useInView();

  return (
    <section id="knowledge" className="py-24 bg-gray-50/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-4xl font-black text-gray-950 mb-3">
            Knowledge & Expertise
          </h2>
          <div className="w-12 h-1 bg-blue-700 rounded-full mx-auto" />
        </div>

        {/* Flex wrap â€” remainder row is auto-centered */}
        <div className="flex flex-wrap justify-center gap-5">
          {knowledge.map((item, i) => (
            <KnowledgeCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function KnowledgeCard({ item, index }: { item: string; index: number }) {
  const { ref, inView } = useInView();
  const Icon = knowledgeIconMap[item] ?? Globe;
  const colorClass = knowledgeIconColors[item] ?? "text-gray-600 bg-gray-50";

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-500 w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div
        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 ${colorClass}`}
      >
        <Icon size={26} />
      </div>
      <h3 className="font-bold text-gray-900 text-sm mb-2">
        {item.split(" (")[0]}
      </h3>
      <p className="text-gray-400 text-xs leading-relaxed">
        {knowledgeDesc[item] ?? ""}
      </p>
    </div>
  );
}
