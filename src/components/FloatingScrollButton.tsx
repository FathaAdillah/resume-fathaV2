import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function FloatingScrollButton() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setProgress(pct);
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* SVG ring progress */}
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        className="absolute inset-0"
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Track */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#bfdbfe"
          strokeWidth="3"
        />
        {/* Progress */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#2563eb"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.2s ease" }}
        />
      </svg>
      {/* Button inner */}
      <div className="relative z-10 w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition-colors">
        <ChevronUp size={18} className="text-white" />
      </div>
    </button>
  );
}
