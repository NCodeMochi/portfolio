import { Footer } from "@/components/layouts/footer";
import { ContactSection } from "@/components/layouts/home/contact";
import { WorkExperienceSection } from "@/components/layouts/home/experiences";
import { HeroSection } from "@/components/layouts/home/hero";
import { ProjectsSection } from "@/components/layouts/home/projects";
import { TechnologiesSection } from "@/components/layouts/home/technologies";
import { Navbar } from "@/components/layouts/navbar";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProjectsSection />
        <TechnologiesSection />
        <WorkExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
