"use client";

import Image from "next/image";
import { ArrowLeft, Lock, Calendar, Search, X, Maximize2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import projectss from "@/mock/projects.json";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion"; // Add for smooth feel

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // FORCE SCROLL TO TOP ON MOUNT
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setMounted(true);
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const categories = ["All", ...Array.from(new Set(projectss.map((p) => p.category)))];

  const filteredProjects = filter === "All" 
    ? projectss 
    : projectss.filter((p) => p.category === filter);

  if (!mounted) return <div className="min-h-screen bg-white dark:bg-zinc-950" />;

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pb-20 transition-colors duration-300">
      
      {/* --- Lightbox Modal --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/95 backdrop-blur-xl p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white z-[110]">
              <X className="w-6 h-6" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Project Preview"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Area - Using 7xl for consistency with the wide layout */}
      <header className="pt-32 pb-16 px-6 border-b border-zinc-100 dark:border-zinc-800/50">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Back to Home</span>
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white mb-8">
                Portfolio<span className="text-indigo-600">.</span>
              </h1>
              <div className="flex items-center gap-3 text-amber-600 dark:text-amber-500/80 font-bold uppercase tracking-widest text-xs">
                 <Lock className="w-4 h-4" /> 
                 <span>Confidential Enterprise Projects</span>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border",
                    filter === cat 
                      ? "bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:text-zinc-900" 
                      : "bg-transparent border-zinc-200 text-zinc-400 hover:border-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-600"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Projects Grid - Using max-w-7xl to fix the "zoomed out" void */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {filteredProjects.map((project, idx) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={project.id} 
              className="group cursor-pointer"
              onClick={() => setSelectedImage(project.image)}
            >
              <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-8 border border-zinc-100 dark:border-zinc-800 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-indigo-500/10">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/20 transition-colors flex items-center justify-center">
                   <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                      <Maximize2 className="w-5 h-5 text-zinc-900" />
                   </div>
                </div>
              </div>

              <div className="px-2">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-bold uppercase">
                    <Calendar className="w-3 h-3" />
                    {project.date}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-indigo-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-800/50 px-2.5 py-1 rounded-lg border border-zinc-100 dark:border-zinc-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="mt-32 px-6 max-w-7xl mx-auto">
        <div className="p-12 md:p-24 rounded-[4rem] bg-zinc-950 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tighter">Ready for the next <br/>big project?</h2>
            <p className="text-zinc-400 mb-12 max-w-lg mx-auto text-lg font-medium">
              I'm currently available for freelance opportunities and full-time architecture roles.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-zinc-900 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform active:scale-95"
            >
              Start a Conversation
            </Link>
          </div>
          {/* Subtle background glow */}
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />
        </div>
      </section>
    </main>
  );
}