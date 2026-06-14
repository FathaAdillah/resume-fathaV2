import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Award, CheckCircle2 } from "lucide-react";
import { certifications, type Certification } from "../../data/resume";
import { useInView } from "../../hooks/useInView";
import { Dialog, DialogContent } from "../ui/Dialog";

// ─── Realistic certificate mockup thumbnail ──────────────────────────────
function CertThumbnail({
  cert,
  size = "card",
}: {
  cert: Certification;
  size?: "card" | "dialog";
}) {
  const isDialog = size === "dialog";

  return (
    <div
      className={`relative overflow-hidden bg-white border-2 ${isDialog ? "rounded-none" : "rounded-xl"}`}
      style={{ borderColor: cert.accentColor + "40" }}
    >
      {/* Outer decorative border line */}
      <div
        className="absolute inset-1.5 border rounded-lg pointer-events-none"
        style={{ borderColor: cert.accentColor + "30" }}
      />

      {/* Issuer header bar */}
      <div
        className={`relative flex items-center gap-3 ${isDialog ? "px-8 py-5" : "px-5 py-4"}`}
        style={{ backgroundColor: cert.issuerBg }}
      >
        {/* Issuer logo area */}
        <div
          className={`shrink-0 font-black tracking-tight ${isDialog ? "text-2xl" : "text-2xl"}`}
          style={{ color: cert.issuerText }}
        >
          {cert.icon}
        </div>
        <div>
          <p
            className={`font-black leading-tight ${isDialog ? "text-base" : "text-sm"}`}
            style={{ color: cert.issuerText }}
          >
            {cert.issuer}
          </p>
          {isDialog && (
            <p
              className="text-xs mt-0.5"
              style={{ color: cert.issuerText + "aa" }}
            >
              Certificate of Completion
            </p>
          )}
        </div>

        {/* Decorative right corner seal */}
        <div
          className="absolute right-0 top-0 bottom-0 w-16 flex items-center justify-center opacity-20"
          style={{ backgroundColor: cert.accentColor }}
        />
      </div>

      {/* Certificate body */}
      <div className={`${isDialog ? "px-8 py-7" : "px-5 py-5"} relative`}>
        {/* Decorative watermark */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-6xl opacity-5 select-none pointer-events-none">
          {cert.icon}
        </div>

        {/* "This certifies that" text */}
        <p
          className={`text-gray-400 ${isDialog ? "text-sm mb-2" : "text-xs mb-1.5"}`}
        >
          This certifies that
        </p>

        {/* Recipient name */}
        <p
          className={`font-black ${isDialog ? "text-2xl mb-1" : "text-lg mb-1"} leading-tight`}
          style={{ color: cert.accentColor }}
        >
          {cert.recipientName}
        </p>

        {/* Has completed */}
        <p
          className={`text-gray-500 ${isDialog ? "text-sm mb-3" : "text-xs mb-2"}`}
        >
          has successfully completed
        </p>

        {/* Cert title */}
        <p
          className={`font-bold text-gray-900 leading-tight ${isDialog ? "text-xl mb-1" : "text-sm mb-1"}`}
        >
          {cert.title}
        </p>

        {/* Cert label */}
        <p className={`text-gray-400 ${isDialog ? "text-sm" : "text-xs"}`}>
          {cert.certLabel}
        </p>

        {/* Footer row */}
        <div
          className={`flex items-end justify-between ${isDialog ? "mt-8 pt-6" : "mt-5 pt-4"} border-t`}
          style={{ borderColor: cert.accentColor + "20" }}
        >
          <div>
            <p
              className={`text-gray-400 ${isDialog ? "text-xs mb-1" : "text-xs mb-0.5"}`}
            >
              Issue Date
            </p>
            <p
              className={`font-bold ${isDialog ? "text-sm" : "text-sm"}`}
              style={{ color: cert.accentColor }}
            >
              {cert.date}
            </p>
          </div>

          {/* Seal */}
          <div
            className={`rounded-full border-4 flex items-center justify-center shrink-0 ${isDialog ? "w-16 h-16 text-xl" : "w-12 h-12 text-base"}`}
            style={{ borderColor: cert.accentColor, color: cert.accentColor }}
          >
            {isDialog ? "✦" : "✦"}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Dialog body ──────────────────────────────────────────────────────────
function CertDialogBody({ cert }: { cert: Certification }) {
  return (
    <>
      {/* Full certificate view */}
      <div className="p-5 bg-gray-50 rounded-t-2xl">
        <CertThumbnail cert={cert} size="dialog" />
      </div>

      {/* Meta info */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
          {cert.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4">{cert.issuer}</p>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full border"
            style={{
              backgroundColor: cert.accentColor + "15",
              color: cert.accentColor,
              borderColor: cert.accentColor + "40",
            }}
          >
            {cert.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full">
            <Award size={12} />
            Professional Certificate
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 border border-green-100 px-3 py-1 rounded-full">
            <CheckCircle2 size={12} />
            {cert.date}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Cert Card ─────────────────────────────────────────────────────────────
function CertCard({
  cert,
  onClick,
}: {
  cert: Certification;
  onClick: () => void;
}) {
  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      {/* Certificate thumbnail */}
      <div
        className="m-4 overflow-hidden rounded-xl group-hover:ring-2 transition-all"
        style={{ "--tw-ring-color": cert.accentColor } as React.CSSProperties}
      >
        <CertThumbnail cert={cert} size="card" />
      </div>

      {/* Title below */}
      <div className="px-4 pb-5">
        <h3 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-blue-700 transition-colors line-clamp-2 mb-1">
          {cert.title}
        </h3>
        <p className="text-gray-400 text-xs">{cert.issuer}</p>
      </div>
    </div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────
export default function CertificationSection() {
  const { ref, inView } = useInView();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [perSlide, setPerSlide] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const total = certifications.length;

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setPerSlide(1);
      else if (window.innerWidth < 1280) setPerSlide(3);
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

  useEffect(() => {
    if (isPaused || selectedCert) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev >= maxIdx ? 0 : prev + 1));
    }, 2800);
    return () => clearInterval(timer);
  }, [isPaused, selectedCert, maxIdx]);

  const translatePct = -(currentIdx * (100 / perSlide));
  const prev = () => setCurrentIdx((i) => (i === 0 ? maxIdx : i - 1));
  const next = () => setCurrentIdx((i) => (i >= maxIdx ? 0 : i + 1));

  return (
    <section id="certifications" className="py-24 bg-gray-50/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-4xl font-black text-gray-950 mb-3">
            Certifications
          </h2>
          <div className="w-12 h-1 bg-blue-700 rounded-full mx-auto mb-3" />
          <p className="text-gray-400 text-sm">
            Certificate {currentIdx + 1} of {total}
          </p>
        </div>

        {/* Slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="overflow-hidden rounded-xl">
            <div
              className="flex"
              style={{
                transform: `translateX(${translatePct}%)`,
                transition:
                  "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  style={{ minWidth: `${100 / perSlide}%` }}
                  className="px-2"
                >
                  <CertCard cert={cert} onClick={() => setSelectedCert(cert)} />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentIdx
                  ? "w-6 bg-blue-700"
                  : "w-2 bg-gray-300 hover:bg-blue-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Dialog */}
      <Dialog
        open={!!selectedCert}
        onOpenChange={(open) => {
          if (!open) setSelectedCert(null);
        }}
      >
        <DialogContent
          title={selectedCert?.title}
          subtitle="Click outside or press ESC to close"
        >
          {selectedCert && <CertDialogBody cert={selectedCert} />}
        </DialogContent>
      </Dialog>
    </section>
  );
}
