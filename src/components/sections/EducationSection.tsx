import { useState } from "react";
import { GraduationCap, Users, CalendarDays, Award } from "lucide-react";
import { education, organizations } from "../../data/resume";
import { useInView } from "../../hooks/useInView";

// â”€â”€â”€ Horizontal Education Card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function EduCard({
  edu,
  index,
}: {
  edu: (typeof education)[0];
  index: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-500 flex items-center gap-5 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Text left */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
            {edu.period}
          </span>
          <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
            {edu.detail}
          </span>
        </div>
        <h3 className="font-bold text-gray-900 text-base leading-tight mb-1">
          {edu.institution}
        </h3>
        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
          <GraduationCap size={14} className="text-blue-600 shrink-0" />
          <span>{edu.degree}</span>
        </div>
      </div>

      {/* Logo right */}
      <div className="shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-sm">
        <span className="text-white font-black text-sm tracking-tight">
          {edu.initials}
        </span>
      </div>
    </div>
  );
}

// â”€â”€â”€ Horizontal Organization Card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function OrgCard({
  org,
  index,
}: {
  org: (typeof organizations)[0];
  index: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-500 flex items-center gap-5 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Text left */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full flex items-center gap-1">
            <CalendarDays size={10} /> {org.period}
          </span>
        </div>
        <p className="text-blue-700 font-bold text-sm mb-0.5 flex items-center gap-1.5">
          <Award size={13} className="shrink-0" />
          {org.role}
        </p>
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
          {org.name}
        </h3>
        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
          <Users size={12} className="shrink-0" />
          <span>{org.institution}</span>
        </div>
      </div>

      {/* Logo right */}
      <div className="shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
        <span className="text-white font-black text-sm tracking-tight">
          {org.initials}
        </span>
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function EducationSection() {
  const { ref, inView } = useInView();
  const [activeTab, setActiveTab] = useState<"education" | "organization">(
    "education",
  );

  return (
    <section id="education" className="py-24 bg-gray-50/60">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-10 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-4xl font-black text-gray-950 mb-3">
            Education & Organization
          </h2>
          <div className="w-12 h-1 bg-blue-700 rounded-full mx-auto" />
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-xl p-1 gap-1">
            {(["education", "organization"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-blue-700 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab === "education" ? "Education" : "Organization"}
              </button>
            ))}
          </div>
        </div>

        {/* Education panel */}
        {activeTab === "education" && (
          <div className="flex flex-col gap-4">
            {education.map((edu, i) => (
              <EduCard key={i} edu={edu} index={i} />
            ))}
          </div>
        )}

        {/* Organization panel */}
        {activeTab === "organization" && (
          <div className="flex flex-col gap-4">
            {organizations.map((org, i) => (
              <OrgCard key={i} org={org} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
