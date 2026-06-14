import {
  Download,
  ChevronDown,
  Mail,
  MapPin,
  GitFork,
  Link2,
  Award,
} from "lucide-react";
import { profile } from "../../data/resume";
import { useInView } from "../../hooks/useInView";

export default function HeroSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center pt-16 bg-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full text-center">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Pill badge */}
          <div className="inline-block bg-blue-50 text-blue-700 text-sm font-medium px-5 py-1.5 rounded-full mb-8 border border-blue-100">
            Welcome to my portfolio
          </div>

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-950 leading-none tracking-tight mb-5">
            {profile.name}
          </h1>

          {/* Title */}
          <p className="text-xl sm:text-2xl font-bold text-blue-700 mb-4">
            {profile.title} | System Implementator
          </p>

          {/* Tagline */}
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto mb-3 leading-relaxed">
            {profile.location} • IT professional focused on project management
            and web-based application development
          </p>

          {/* Contact info row */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-10">
            <div className="flex items-center gap-1.5">
              <Mail size={13} />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={13} />
              <span>Gresik, Indonesia</span>
            </div>
          </div>

          {/* Social icon row */}
          <div className="flex justify-center gap-3 mb-10">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl border border-gray-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center text-gray-400 transition-all"
              aria-label="LinkedIn"
            >
              <Link2 size={16} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl border border-gray-200 hover:border-gray-800 hover:bg-gray-800 hover:text-white flex items-center justify-center text-gray-400 transition-all"
              aria-label="GitHub"
            >
              <GitFork size={16} />
            </a>
            <a
              href={profile.credly}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl border border-gray-200 hover:border-amber-500 hover:bg-amber-500 hover:text-white flex items-center justify-center text-gray-400 transition-all"
              aria-label="Credly"
            >
              <Award size={16} />
            </a>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/Fatharoni Adillah Rachman_CV.pdf"
              download="Fatharoni Adillah Rachman_CV.pdf"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-7 py-3 rounded-lg transition-colors shadow-md shadow-blue-200"
            >
              <Download size={16} />
              Download CV
            </a>
            <button
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-blue-700 hover:text-blue-700 text-gray-700 font-semibold px-7 py-3 rounded-lg transition-colors"
            >
              Get in Touch
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-20 flex justify-center animate-bounce">
          <button
            onClick={() =>
              document
                .querySelector("#about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-gray-300 hover:text-blue-600 transition-colors"
            aria-label="Scroll down"
          >
            <ChevronDown size={28} />
          </button>
        </div>
      </div>
    </section>
  );
}
