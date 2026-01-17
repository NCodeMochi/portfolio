"use client";

import Image from "next/image";
import { ArrowLeft, Lock, Calendar, Search, X, Maximize2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import projectss from "@/mock/projects.json";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // 1. Prevent Hydration Flash: Only render content after the client is mounted
  // This ensures it follows the theme set on your home page correctly.
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Close modal on escape key
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

  // If not mounted, return an empty div with the background color to avoid the white flash
  if (!mounted) return <div className="min-h-screen bg-white dark:bg-zinc-950" />;

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pb-20 selection:bg-indigo-100 dark:selection:bg-indigo-500/30 transition-colors duration-300">
      
      {/* --- Lightbox Modal --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/90 backdrop-blur-md p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[110]"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          
          <div 
            className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking the image
          >
            <Image
              src={selectedImage}
              alt="Project Preview"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}

      {/* Header Area */}
      <header className="pt-24 pb-16 px-6 border-b border-zinc-100 dark:border-zinc-800/50">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Home</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-white mb-6">
                Project Gallery<span className="text-indigo-600">.</span>
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-xl font-medium text-lg leading-relaxed">
                Visual showcase of private enterprise software and internal tools.
                <span className="flex items-center gap-2 mt-3 text-amber-600 dark:text-amber-500/80 text-sm font-bold uppercase tracking-wider">
                  <Lock className="w-4 h-4" /> Codebase Protected by NDA
                </span>
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all border",
                    filter === cat 
                      ? "bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-lg shadow-zinc-900/20" 
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

      {/* Projects Grid */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group cursor-pointer"
              onClick={() => setSelectedImage(project.image)}
            >
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-6 border border-zinc-100 dark:border-zinc-800 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(79,70,229,0.15)] group-hover:-translate-y-2">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                   <div className="bg-white p-4 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
                      <Maximize2 className="w-6 h-6 text-zinc-900" />
                   </div>
                </div>
              </div>

              <div className="px-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded">
                    {project.category}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    {project.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 border border-zinc-100 dark:border-zinc-800 px-2 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA - Dark themed to stand out */}
      <section className="mt-20 px-6 max-w-4xl mx-auto">
        <div className="p-10 md:p-16 rounded-[3.5rem] bg-zinc-900 dark:bg-zinc-900/50 border border-zinc-800 text-center overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />
          <h2 className="text-3xl font-bold mb-4 text-white">Let’s talk architecture.</h2>
          <p className="text-zinc-400 mb-10 max-w-md mx-auto text-lg">
            I can provide a walkthrough of my technical decisions and workflow in a 1-on-1 call.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-zinc-900 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all active:scale-95 shadow-lg"
          >
            Schedule a Demo
          </Link>
        </div>
      </section>
    </main>
  );
}