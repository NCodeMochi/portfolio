"use client";

import { Zap, Cpu } from "lucide-react";
import { useMemo, useState } from "react";
import { TechIcon } from "@/components/derived/tech-icon";
import { technologies } from "@/mock/technologies.json";
import { GlowPill } from "@/components/ui/glow-pill";

export function TechnologiesSection() {
  const categories = [
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
    { key: "mobile", label: "Mobile" },
    { key: "database", label: "Database" },
    { key: "cloud", label: "Cloud & DevOps" },
    { key: "tools", label: "Tools" },
  ];

  const proficiencyGroups = [
    {
      key: "core",
      label: "Core Technologies",
      description: "Technologies I use confidently in real-world projects",
    },
    {
      key: "familiar",
      label: "Familiar",
      description: "Technologies I've worked with in production environments",
    },
    {
      key: "exploring",
      label: "Exploring",
      description: "Technologies I'm actively learning and applying in new experiments",
    },
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>(categories.map((c) => c.key));

  const toggleCategory = (key: string) => {
    setSelectedCategories((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const filteredTechnologies = useMemo(() => {
    return technologies.filter((t) => selectedCategories.includes(t.category));
  }, [selectedCategories]);

  return (
    <section className="relative bg-transparent py-20 md:py-28 scroll-mt-20 overflow-hidden" id="technologies">
      <div className="relative mx-auto max-w-4xl px-6 z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-[2px] w-8 bg-cyan-500/50" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-500/80 font-mono">
              System.Stack_Registry
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6 leading-[0.9]">
            Technical <span className="text-zinc-500">Arsenal.</span>
          </h2>
          <p className="text-zinc-400 max-w-md text-base leading-relaxed border-l border-zinc-800 pl-6">
            A specialized collection of tools and frameworks I leverage to create efficient, high-end digital
            architectures.
          </p>
        </div>

        {/* Categories Filter - Updated for Cyber Look */}
        <div className="mb-12 overflow-x-auto no-scrollbar">
          <div className="flex gap-3 min-w-max pb-4">
            {categories.map((category) => {
              const isActive = selectedCategories.includes(category.key);
              return (
                <button
                  type="button"
                  key={category.key}
                  onClick={() => toggleCategory(category.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-sm text-[10px] font-mono uppercase tracking-widest transition-all border ${
                    isActive
                      ? "bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                      : "bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                  }`}
                >
                  <TechIcon icon={category.key} className={isActive ? "text-cyan-400" : "text-zinc-500"} />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Proficiency Groups */}
        <div className="space-y-8">
          {proficiencyGroups.map((group) => {
            const groupTechs = filteredTechnologies.filter((t) => t.proficiency === group.key);
            if (groupTechs.length === 0) return null;

            return (
              <div key={group.key} className="relative py-8 first:pt-0 border-t border-zinc-900 first:border-none">
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`mt-1 shrink-0 transition-colors ${
                      group.key === "core" ? "text-cyan-500" : "text-zinc-700"
                    }`}
                  >
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white font-mono uppercase tracking-tight">{group.label}</h4>
                    <p className="text-sm text-zinc-500 font-medium">{group.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 ml-9">
                  {groupTechs.map((tech) => (
                    <GlowPill
                      key={tech.name}
                      active={true} 
                      type={group.key as "core" | "familiar" | "exploring"}
                    >
                      <div className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono text-zinc-100 whitespace-nowrap">
                        <TechIcon icon={tech.icon} />
                        <span>{tech.name}</span>
                      </div>
                    </GlowPill>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}