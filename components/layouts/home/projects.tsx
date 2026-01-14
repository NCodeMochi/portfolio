import { ArrowRight, Calendar, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import projectss from "@/mock/projects.json";

export function ProjectsSection() {
  const projects = projectss.slice(0, 3); // Show top 3 on home

  return (
    <section className="relative bg-white py-20 md:py-32 dark:bg-zinc-950 scroll-mt-20" id="projects">
      <div className="relative mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
                Selected Work
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden md:flex items-center gap-2 text-sm font-bold text-zinc-900 hover:text-indigo-600 transition-colors group dark:text-zinc-400 dark:hover:text-indigo-400"
          >
            View All
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const isFeatured = index === 0;
            return (
              <div
                key={project.id}
                className={`group relative flex flex-col bg-white border border-zinc-100 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-200/50 hover:-translate-y-1 dark:bg-zinc-900/40 dark:border-zinc-800/50 dark:hover:shadow-none dark:hover:bg-zinc-900 ${
                  isFeatured ? "md:col-span-2" : ""
                }`}
              >
                <div className={`flex flex-col ${isFeatured ? "lg:flex-row" : ""}`}>
                  {/* Image Section */}
                  <div
                    className={`relative overflow-hidden bg-zinc-50 dark:bg-zinc-800 ${
                      isFeatured ? "lg:w-[55%] aspect-4/3 lg:aspect-auto" : "aspect-16/10"
                    }`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                      width={469}
                      height={338}
                    />
                    <div className="absolute inset-0 bg-zinc-900/5 group-hover:bg-transparent transition-colors duration-500 dark:bg-zinc-950/20" />

                    {/* Mobile Link Overlay */}
                    <div className="absolute top-6 right-6 lg:hidden">
                      <Link href="/projects">
                        <ExternalLink className="w-4 h-4 text-zinc-900 dark:text-white" />
                      </Link>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className={`p-8 md:p-10 flex flex-col justify-between ${isFeatured ? "lg:w-[45%]" : "flex-1"}`}>
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-full bg-zinc-100 text-[10px] font-bold text-zinc-500 uppercase tracking-widest dark:bg-zinc-800 dark:text-zinc-400">
                            {project.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold dark:text-zinc-600">
                          <Calendar className="w-3.5 h-3.5" />
                          {project.date}
                        </div>
                      </div>

                      <h3
                        className={`font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors leading-tight mb-4 dark:text-zinc-100 dark:group-hover:text-indigo-400 ${
                          isFeatured ? "text-3xl md:text-4xl" : "text-2xl"
                        }`}
                      >
                        {project.title}
                      </h3>

                      <p className="text-zinc-500 text-sm md:text-base font-medium leading-relaxed mb-8 line-clamp-3 dark:text-zinc-400">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-bold text-zinc-400 bg-zinc-50 border border-zinc-100 px-2.5 py-1 rounded-lg dark:bg-zinc-800/50 dark:border-zinc-700/50 dark:text-zinc-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        <Link
                          href="/projects"
                          className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 hover:gap-3 transition-all dark:text-white"
                        >
                          View Project
                          <ArrowRight className="w-4 h-4 text-zinc-400" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View All */}
        <div className="mt-12 flex md:hidden justify-center">
          <Link
            href="/projects"
            className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold text-sm shadow-xl active:scale-95 dark:bg-white dark:text-zinc-900"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
