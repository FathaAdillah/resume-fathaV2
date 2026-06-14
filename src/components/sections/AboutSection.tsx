import { Zap, Users, Puzzle, BarChart2 } from "lucide-react";
import { bio } from "../../data/resume";
import { useInView } from "../../hooks/useInView";

const strengths = [
  {
    icon: <Zap size={24} className="text-blue-700" />,
    title: "Fast Learner",
    desc: "Quickly adapt to new technologies and environments",
  },
  {
    icon: <Users size={24} className="text-blue-700" />,
    title: "Team Collaboration",
    desc: "Strong cross-functional communication skills",
  },
  {
    icon: <Puzzle size={24} className="text-blue-700" />,
    title: "Problem Solving",
    desc: "Analytical, structured, and creative approach",
  },
  {
    icon: <BarChart2 size={24} className="text-blue-700" />,
    title: "Detail Oriented",
    desc: "Focus on precision and meticulous execution",
  },
];

export default function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-24 bg-gray-50/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-black text-gray-950 mb-3">Profile</h2>
          <div className="w-12 h-1 bg-blue-700 rounded-full mx-auto" />
        </div>

        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* About me text */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">About Me</h3>
            <p className="text-gray-600 leading-relaxed text-base mb-6">
              {bio}
            </p>

            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-20 shrink-0">
                  Interest:
                </span>
                <span>
                  IT Project Management, HR, Web Development, Data Analysis
                </span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-20 shrink-0">
                  Location:
                </span>
                <span>Gresik, Indonesia</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-20 shrink-0">
                  Email:
                </span>
                <a
                  href="mailto:fatha.adillah12@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  fatha.adillah12@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Key Strengths */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Key Strengths
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {strengths.map((s, i) => (
                <StrengthCard key={i} {...s} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StrengthCard({
  icon,
  title,
  desc,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-500 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="mb-3 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
        {icon}
      </div>
      <h4 className="font-bold text-gray-900 text-sm mb-1">{title}</h4>
      <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}
