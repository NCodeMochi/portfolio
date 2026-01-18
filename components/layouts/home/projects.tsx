"use client";

import { useState } from "react";
import { ArrowRight, Globe, Github, X, Maximize2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import projectss from "@/mock/projects.json";

export function ProjectsSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const projects = projectss.slice(0, 6);

  return (
    <section className="relative bg-white py-20 md:py-32 dark:bg-zinc-950 scroll-mt-20" id="projects">
      {/* --- Lightbox Modal --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center bg-zinc-950/90 backdrop-blur-md p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
          <div 
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
            My Work
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">
            A collection of projects I've worked on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              style={{ animationDelay: `${index * 100}ms` }}
              className="group flex flex-col bg-white border border-zinc-100 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 dark:bg-zinc-900/40 dark:border-zinc-800/50 animate-in fade-in slide-in-from-bottom-4"
            >
              {/* Image Section - Clicking this opens Lightbox */}
              <div 
                className="relative aspect-video overflow-hidden bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-800/50 cursor-zoom-in"
                onClick={() => setSelectedImage(project.image)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  width={600}
                  height={400}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8" />
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-4 flex-1">
                  {project.description}
                </p>

                {/* Footer Icons - Functional Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-zinc-50 dark:border-zinc-800/50">
                  <Link href="/projects" className="text-zinc-400 hover:text-indigo-600 transition-colors">
                    <Globe className="w-5 h-5" />
                  </Link>
                  <Link href="/projects" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/projects"
            scroll={true} // Forces the browser to scroll to the top of the new page
            className="group flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold text-sm transition-all hover:gap-4 hover:bg-indigo-600 active:scale-95 dark:bg-white dark:text-zinc-900"
          >
            View Full Gallery
            <ArrowRight className="w-4 h-4 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}