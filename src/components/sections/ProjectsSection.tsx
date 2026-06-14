import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects, type Project } from "../../data/resume";
import { useInView } from "../../hooks/useInView";
import { Dialog, DialogContent } from "../ui/Dialog";

// ─── Project image slide viewer inside dialog ──────────────────────────────
function ProjectDialogBody({ project }: { project: Project }) {
  const [imgIdx, setImgIdx] = useState(0);
  const prev = () =>
    setImgIdx((i) => (i === 0 ? project.images.length - 1 : i - 1));
  const next = () =>
    setImgIdx((i) => (i === project.images.length - 1 ? 0 : i + 1));

  return (
    <>
      {/* Image slider */}
      <div
        className={`relative aspect-video bg-gradient-to-br ${project.images[imgIdx].gradient} flex items-center justify-center overflow-hidden rounded-t-2xl`}
      >
        {/* Slide visual */}
        <div className="text-center select-none">
          <div className="text-8xl mb-4">{project.icon}</div>
          <p className="text-white/80 font-medium text-sm px-8">
            {project.images[imgIdx].label}
          </p>
        </div>

        {/* Prev */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Next */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight size={18} />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {project.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setImgIdx(i)}
              className={`h-1.5 rounded-full transition-all ${i === imgIdx ? "w-5 bg-white" : "w-1.5 bg-white/40"}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="absolute top-3 left-4 bg-black/30 text-white text-xs px-2 py-0.5 rounded-full">
          {imgIdx + 1} / {project.images.length}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {project.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Project Card ──────────────────────────────────────────────────────────
function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div
        className={`aspect-video bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
      >
        <div className="text-7xl select-none group-hover:scale-110 transition-transform duration-300">
          {project.icon}
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-semibold bg-black/40 px-3 py-1.5 rounded-full transition-opacity">
            View Details
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-blue-700 transition-colors leading-tight">
          {project.title}
        </h3>
        <p className="text-gray-400 text-xs mb-3 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-gray-50 border border-gray-100 text-gray-500 text-xs font-medium px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-gray-400 text-xs px-1 py-0.5">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const { ref, inView } = useInView();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [perSlide, setPerSlide] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const total = projects.length;

  // Responsive cards per slide
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setPerSlide(1);
      else setPerSlide(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIdx = Math.max(0, total - perSlide);

  useEffect(() => {
    setCurrentIdx((prev) => Math.min(prev, maxIdx));
  }, [perSlide, maxIdx]);

  // Auto-slide (paused when dialog open)
  useEffect(() => {
    if (isPaused || selectedProject) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev >= maxIdx ? 0 : prev + 1));
    }, 3200);
    return () => clearInterval(timer);
  }, [isPaused, selectedProject, maxIdx]);

  const translatePct = -(currentIdx * (100 / perSlide));

  const prev = () => setCurrentIdx((i) => (i === 0 ? maxIdx : i - 1));
  const next = () => setCurrentIdx((i) => (i >= maxIdx ? 0 : i + 1));

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-4xl font-black text-gray-950 mb-3">Projects</h2>
          <div className="w-12 h-1 bg-blue-700 rounded-full mx-auto mb-3" />
          <p className="text-gray-400 text-sm">
            Click a card to see project details
          </p>
        </div>

        {/* Slider wrapper */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Prev button */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Sliding cards */}
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex"
              style={{
                transform: `translateX(${translatePct}%)`,
                transition:
                  "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  style={{ minWidth: `${100 / perSlide}%` }}
                  className="px-2"
                >
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentIdx
                  ? "w-6 bg-blue-700"
                  : "w-2 bg-gray-200 hover:bg-blue-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ShadCN-style Dialog */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
      >
        <DialogContent
          title={selectedProject?.title}
          subtitle="Click outside or press ESC to close"
        >
          {selectedProject && <ProjectDialogBody project={selectedProject} />}
        </DialogContent>
      </Dialog>
    </section>
  );
}
