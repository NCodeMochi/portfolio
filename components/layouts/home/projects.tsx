"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import Image from "next/image";
import { X, ArrowRight, Layers, ExternalLink } from "lucide-react";
import projectss from "@/mock/projects.json";

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, cardWidth: 0, gap: 0 });
  
  const x = useMotionValue(0);

  useLayoutEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const isMobile = containerWidth < 768;
      
      const cardW = isMobile ? Math.min(containerWidth * 0.85, 340) : 500;
      const gapW = isMobile ? 30 : 60;
      
      setDimensions({ width: containerWidth, cardWidth: cardW, gap: gapW });
      x.set(0);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [x]);

  const TOTAL_SLIDE_WIDTH = dimensions.cardWidth + dimensions.gap;
  const FULL_TRACK_WIDTH = projectss.length * TOTAL_SLIDE_WIDTH;

  const handlePan = (_: any, info: any) => {
    if (Math.abs(info.delta.x) > Math.abs(info.delta.y)) {
      x.stop();
      x.set(x.get() + info.delta.x);
    }
  };

  const handlePanEnd = (_: any, info: any) => {
    const currentX = x.get();
    const velocity = info.velocity.x * 0.2;
    const projectedTarget = currentX + velocity;
    const snappedTarget = Math.round(projectedTarget / TOTAL_SLIDE_WIDTH) * TOTAL_SLIDE_WIDTH;

    animate(x, snappedTarget, {
      type: "spring",
      stiffness: 100,
      damping: 30,
    });
  };

  return (
   <section 
  ref={containerRef}
  className="relative bg-transparent pt-0 pb-24 md:pb-32 overflow-hidden min-h-[600px] flex flex-col items-center justify-center select-none" 
  id="projects"
>
      {/* --- HEADER --- */}
      <div className="mb-16 text-center z-10 px-6">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="h-[1px] w-8 bg-cyan-500/50" />
          <span className="font-inter text-cyan-400 text-xs uppercase tracking-[0.4em] font-bold">
            Project_Archive
          </span>
          <span className="h-[1px] w-8 bg-cyan-500/50" />
        </div>
        <h2 className="font-forum text-5xl md:text-7xl text-white mt-2">Selected Work</h2>
      </div>

      <div className="relative w-full h-[550px] md:h-[720px] flex items-center justify-center overflow-hidden">
        <motion.div
          onPan={handlePan}
          onPanEnd={handlePanEnd}
          className="absolute inset-0 z-30 cursor-grab active:cursor-grabbing touch-pan-y"
        />

        <div className="relative w-full h-full pointer-events-none flex items-center justify-center">
          {dimensions.cardWidth > 0 && projectss.map((project, index) => (
            <IndividualCard
              key={`${project.id}-${index}`}
              project={project}
              index={index}
              baseX={x} 
              totalWidth={FULL_TRACK_WIDTH}
              slideWidth={TOTAL_SLIDE_WIDTH}
              cardWidth={dimensions.cardWidth}
              setSelectedImage={setSelectedImage}
            />
          ))}
        </div>
      </div>

      {/* --- LIGHTBOX --- */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-6 right-6 text-cyan-400 hover:text-white transition-colors">
            <X size={40} strokeWidth={1} />
          </button>
          <div className="relative w-[90vw] h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={selectedImage} alt="Preview" fill className="object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}

function IndividualCard({ project, index, baseX, totalWidth, slideWidth, cardWidth, setSelectedImage }: any) {
  const x = useTransform(baseX, (latest: number) => {
    const offset = index * slideWidth;
    let position = (latest + offset) % totalWidth;
    if (position > totalWidth / 2) position -= totalWidth;
    if (position < -totalWidth / 2) position += totalWidth;
    return position;
  });

  const scale = useTransform(x, [-slideWidth, 0, slideWidth], [0.8, 1, 0.8]);
  const opacity = useTransform(x, [-slideWidth * 1.1, -slideWidth, 0, slideWidth, slideWidth * 1.1], [0, 0.4, 1, 0.4, 0]);

  return (
    <motion.div
      style={{ x, scale, opacity, width: cardWidth, position: "absolute", perspective: 1000 }}
      className="h-[480px] md:h-[650px] rounded-sm border border-white/5 overflow-hidden bg-zinc-900/50 backdrop-blur-sm pointer-events-auto group shadow-2xl"
    >
      {/* Corner HUD Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-500 transition-colors" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-500 transition-colors" />

      {/* Cyber Background Detail */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.1),transparent)]" />
      <div className="absolute top-4 right-6 text-[10px] font-mono text-cyan-500/40 uppercase tracking-widest">
        Idx_00{index + 1}
      </div>

      <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[85%] h-[48%] z-10">
        <div className="relative h-full w-full">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            draggable={false}
            className="object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.3)] cursor-pointer grayscale group-hover:grayscale-0 transition-all duration-500"
            onClick={() => setSelectedImage(project.image)}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-center z-20">
        <h3 className="font-forum text-[42px] md:text-[68px] text-white tracking-tighter leading-none mb-6 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        
        <div className="flex items-center justify-center gap-3">
          <span className="h-[1px] w-4 bg-zinc-700" />
          <div className="flex items-center gap-2 text-cyan-500">
            <span className="font-inter text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em]">
              Access_Showcase
            </span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
          <span className="h-[1px] w-4 bg-zinc-700" />
        </div>
      </div>

      {/* Animated Scan Line on Hover */}
      <div className="absolute inset-0 w-full h-[2px] bg-cyan-500/20 -translate-y-full group-hover:animate-scan pointer-events-none" />
    </motion.div>
  );
}