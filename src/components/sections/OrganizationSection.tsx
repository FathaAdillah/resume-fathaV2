import { organizations } from "../../data/resume";
import { useInView } from "../../hooks/useInView";

export default function OrganizationSection() {
  const { ref, inView } = useInView();

  return (
    <section id="organization" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-4xl font-black text-gray-950 mb-3">
            Organizational Experience
          </h2>
          <div className="w-12 h-1 bg-blue-700 rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {organizations.map((org, i) => (
            <OrgCard key={i} org={org} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

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
      className={`bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-500 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Icon + initials */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xl">
          {org.icon}
        </div>
        <div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
            {org.initials}
          </span>
        </div>
      </div>

      <p className="text-blue-700 font-bold text-sm mb-1">{org.role}</p>
      <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-3">
        {org.name}
      </h3>

      <div className="flex flex-col gap-1 text-xs text-gray-400">
        <span>{org.period}</span>
        <span>{org.institution}</span>
      </div>
    </div>
  );
}

