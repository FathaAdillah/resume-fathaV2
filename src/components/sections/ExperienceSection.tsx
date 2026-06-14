import { Trophy } from "lucide-react";
import { experiences } from "../../data/resume";
import { useInView } from "../../hooks/useInView";

export default function ExperienceSection() {
  const { ref, inView } = useInView();

  return (
    <section id="experience" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-4xl font-black text-gray-950 mb-3">
            Work Experience
          </h2>
          <div className="w-12 h-1 bg-blue-700 rounded-full mx-auto" />
        </div>

        {/* Zigzag timeline */}
        <div className="relative">
          {/* Center vertical line — desktop only */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-blue-100 hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <TimelineItem
                key={exp.id}
                exp={exp}
                index={i}
                isLeft={i % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  exp,
  index,
  isLeft,
}: {
  exp: (typeof experiences)[0];
  index: number;
  isLeft: boolean;
}) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* ── Desktop zigzag layout ── */}
      <div className="hidden md:flex items-start">
        {/* Left half */}
        <div className="flex-1 flex justify-end pr-10">
          {isLeft && <ExpCard exp={exp} />}
        </div>

        {/* Center dot — zero-width anchor so dot sits exactly on the line */}
        <div className="relative shrink-0 w-0">
          <div
            className={`absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-blue-700 bg-white shadow-sm z-10`}
          >
            {exp.current && (
              <span className="absolute inset-0.5 rounded-full bg-blue-700 animate-pulse" />
            )}
          </div>
        </div>

        {/* Right half */}
        <div className="flex-1 flex justify-start pl-10">
          {!isLeft && <ExpCard exp={exp} />}
        </div>
      </div>

      {/* ── Mobile: left-border timeline ── */}
      <div className="md:hidden pl-7 border-l-2 border-blue-100 relative">
        <div className="absolute -left-[5px] top-5 w-2.5 h-2.5 rounded-full bg-blue-700 border-2 border-white shadow" />
        <ExpCard exp={exp} />
      </div>
    </div>
  );
}

function ExpCard({ exp }: { exp: (typeof experiences)[0] }) {
  return (
    <div
      className={`bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow w-full max-w-md ${
        exp.current ? "border-blue-200 ring-1 ring-blue-50" : "border-gray-100"
      }`}
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            {exp.role}
          </h3>
          {exp.current && (
            <span className="shrink-0 bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100">
              Current
            </span>
          )}
        </div>
        <p className="text-blue-700 font-semibold text-sm">{exp.company}</p>
        <p className="text-gray-400 text-xs mt-1">{exp.period}</p>
      </div>

      {/* Bullets */}
      <ul className="space-y-1.5 mb-4">
        {exp.bullets.map((b, j) => (
          <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 block" />
            {b}
          </li>
        ))}
      </ul>

      {/* Achievements */}
      {exp.achievements.length > 0 && (
        <div className="bg-green-50 border border-green-100 rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Trophy size={12} className="text-green-500" />
            <span className="text-[11px] font-bold text-green-700 uppercase tracking-wide">
              Key Achievements
            </span>
          </div>
          <ul className="space-y-1">
            {exp.achievements.map((a, j) => (
              <li
                key={j}
                className="text-xs text-green-800 flex items-start gap-1.5"
              >
                <span className="text-green-400 shrink-0">•</span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
