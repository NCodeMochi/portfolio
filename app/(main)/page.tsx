"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Footer } from "@/components/layouts/footer";
import { ContactSection } from "@/components/layouts/home/contact";
import { WorkExperienceSection } from "@/components/layouts/home/experiences";
import { HeroSection } from "@/components/layouts/home/hero";
import { ProjectsSection } from "@/components/layouts/home/projects";
import { TechnologiesSection } from "@/components/layouts/home/technologies";
import { Navbar } from "@/components/layouts/navbar";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-zinc-950 selection:bg-cyan-500/30">
      
      {/* --- GLOBAL CYBER BACKGROUND (Fixed) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* 1. Primary Cyan Grid */}
        <div 
          className="absolute inset-0 opacity-[0.2]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(6, 182, 212, 0.2) 1px, transparent 1px), 
                              linear-gradient(to bottom, rgba(6, 182, 212, 0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px' 
          }} 
        />
        
        {/* 2. Micro Grid Texture */}
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '10px 10px' 
          }} 
        />

        {/* 3. Moving Data Pulses */}
        <GridGlow count={15} />

        {/* 4. Large Ambient Glows (Strategically placed for long scroll) */}
        <div className="absolute top-[5%] -left-[5%] h-[600px] w-[600px] rounded-full bg-cyan-500/15 blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[35%] -right-[5%] h-[700px] w-[700px] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[10%] h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[130px]" />
        
        {/* 5. Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(9,9,11,0)_10%,rgba(9,9,11,1)_100%)]" />

        {/* 6. Scanline Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(6,182,212,0.03)_50%,transparent)] bg-[size:100%_8px] animate-scan opacity-30" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <Navbar />
      
      <main className="relative z-10 flex-1">
        {/* Section Wrapper ensures sections feel connected with tight spacing */}
        <div className="space-y-0">
          <HeroSection />
          
          <div className="pt-0">
            <ProjectsSection />
          </div>

          <div className="py-20">
            <TechnologiesSection />
          </div>

          <div className="py-20">
            <WorkExperienceSection />
          </div>

          <div className="py-20">
            <ContactSection />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/** * GridGlow: Renders white "packets" of light moving along the grid lines 
 */
function GridGlow({ count = 10 }: { count?: number }) {
  const [offsets, setOffsets] = useState<number[]>([]);

  useEffect(() => {
    setOffsets(Array.from({ length: count }, () => Math.floor(Math.random() * 40) * 40));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {offsets.map((pos, i) => {
        const isVertical = i % 2 === 0;
        const duration = 5 + Math.random() * 7;
        const delay = Math.random() * 12;

        return (
          <motion.div
            key={i}
            initial={isVertical ? { top: "-10%", left: pos, opacity: 0 } : { left: "-10%", top: pos, opacity: 0 }}
            animate={isVertical 
              ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] } 
              : { left: ["0%", "100%"], opacity: [0, 1, 1, 0] }
            }
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}
            className={`absolute ${isVertical ? "w-[1.5px] h-32" : "h-[1.5px] w-32"} bg-gradient-to-b from-transparent via-white to-transparent`}
            style={{
              boxShadow: "0 0 15px 2px rgba(255, 255, 255, 0.4)",
            }}
          />
        );
      })}
    </div>
  );
}