import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingScrollButton from "../components/FloatingScrollButton";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import EducationSection from "../components/sections/EducationSection";
import KnowledgeSection from "../components/sections/KnowledgeSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import CertificationSection from "../components/sections/CertificationSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <KnowledgeSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificationSection />
      </main>
      <Footer />
      <FloatingScrollButton />
    </div>
  );
}
