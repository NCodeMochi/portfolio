"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import projectss from "@/mock/projects.json";

export function ProjectsSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // The global 'x' that controls the cards
  const x = useMotionValue(0);
  // Mass 1 and higher damping (40) removes the "wobble"
  const springX = useSpring(x, { stiffness: 100, damping: 40, mass: 1 });

  const CARD_WIDTH = 600;
  const GAP = 60; 
  const TOTAL_SLIDE_WIDTH = CARD_WIDTH + GAP;
  const FULL_TRACK_WIDTH = projectss.length * TOTAL_SLIDE_WIDTH;

  // FIX: Use onPan or a controlled drag to prevent the "wiggle"
  const handleDrag = (_: any, info: any) => {
    // Stop any current animations so your finger has 1:1 control
    x.stop();
    // Use offset instead of delta for smoother tracking
    x.set(x.get() + info.delta.x);
  };

  const handleDragEnd = (_: any, info: any) => {
    const currentX = x.get();
    // Velocity multiplier (0.3) for a more controlled "Wood Art" glide
    const velocity = info.velocity.x * 0.3;
    const projectedTarget = currentX + velocity;
    
    // Snap logic to ensure the card always lands perfectly centered
    const snappedTarget = Math.round(projectedTarget / TOTAL_SLIDE_WIDTH) * TOTAL_SLIDE_WIDTH;

    animate(x, snappedTarget, {
      type: "spring",
      velocity: info.velocity.x,
      stiffness: 100,
      damping: 40,
    });
  };

  return (
    <section className="bg-[#030303] py-20 overflow-hidden min-h-screen flex items-center justify-center relative select-none" id="projects">
      <div className="relative w-full h-[850px] flex items-center justify-center overflow-hidden">
        
        {/* THE FIX: Remove dragConstraints and use 'onPan' or a raw motion div */}
        <motion.div
          onPan={handleDrag}
          onPanEnd={handleDragEnd}
          className="absolute inset-0 z-30 cursor-grab active:cursor-grabbing touch-none"
        />

        <div className="relative w-full h-full pointer-events-none flex items-center justify-center">
          {projectss.map((project, index) => (
            <IndividualCard
              key={`${project.id}-${index}`}
              project={project}
              index={index}
              baseX={x} 
              totalWidth={FULL_TRACK_WIDTH}
              slideWidth={TOTAL_SLIDE_WIDTH}
              setSelectedImage={setSelectedImage}
            />
          ))}
        </div>
      </div>

      {/* Lightbox remains the same */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md" onClick={() => setSelectedImage(null)}>
          <div className="relative w-full max-w-5xl aspect-video px-4" onClick={(e) => e.stopPropagation()}>
            <Image src={selectedImage} alt="Preview" fill className="object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}

function IndividualCard({ project, index, baseX, totalWidth, slideWidth, setSelectedImage }: any) {
  const x = useTransform(baseX, (latest: number) => {
    const offset = index * slideWidth;
    let position = (latest + offset) % totalWidth;
    
    // Precision Wrapping: Ensures cards never "blink" out of existence
    if (position > totalWidth / 2) position -= totalWidth;
    if (position < -totalWidth / 2) position += totalWidth;
    
    return position;
  });

  const scale = useTransform(x, [-slideWidth, 0, slideWidth], [0.85, 1, 0.85]);
  const opacity = useTransform(x, [-slideWidth * 1.5, -slideWidth, 0, slideWidth, slideWidth * 1.5], [0, 1, 1, 1, 0]);
  const rotateY = useTransform(x, [-slideWidth, 0, slideWidth], [25, 0, -25]);

  return (
    <motion.div
      style={{ x, scale, opacity, rotateY, perspective: 1200, width: 600, position: "absolute" }}
      className="h-[750px] rounded-[24px] border border-[#352317] overflow-hidden bg-gradient-to-b from-[#FFA86A40] via-[#030303C4] to-[#030303] pointer-events-auto"
    >
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[85%] aspect-square z-10">
        <Image 
          src={project.image} 
          alt={project.title} 
          fill 
          draggable={false}
          className="object-contain cursor-pointer"
          onClick={() => setSelectedImage(project.image)}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full p-12 text-center z-20">
        <h3 className="font-serif text-[85px] text-[#fffdee] tracking-tighter leading-none mb-8">
          {project.title}
        </h3>
        <p className="font-sans text-[14px] font-bold text-[#FFA86A] uppercase tracking-[5px]">view gallery</p>
      </div>
    </motion.div>
  );
}