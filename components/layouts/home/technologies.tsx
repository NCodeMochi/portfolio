"use client";

import { Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { TechIcon } from "@/components/derived/tech-icon";
import { technologies } from "@/mock/technologies.json";
import { GlowIcon } from "@/components/ui/glow-icon";
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
    <section className="relative bg-white py-20 md:py-28 dark:bg-zinc-950 scroll-mt-20">
      <div className="relative mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
              Stack
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6 dark:text-white">
            Technologies I use.
          </h2>
          <p className="text-zinc-500 max-w-md text-sm font-medium leading-relaxed dark:text-zinc-400">
            A specialized collection of tools and frameworks I leverage to create efficient, high-end digital
            experiences.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="mb-12 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 min-w-max pb-4">
            {categories.map((category) => {
              const isActive = selectedCategories.includes(category.key);
              return (
                <button
                  type="button"
                  key={category.key}
                  onClick={() => toggleCategory(category.key)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border ${
                    isActive
                      ? "bg-zinc-900 border-zinc-900 text-white shadow-sm dark:bg-white dark:border-white dark:text-zinc-900"
                      : "bg-white border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-900 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200"
                  }`}
                >
                  <TechIcon icon={category.key} />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Proficiency Groups */}
        <div className="space-y-4 divide-y divide-zinc-100 dark:divide-zinc-900">
          {proficiencyGroups.map((group) => {
            const groupTechs = filteredTechnologies.filter((t) => t.proficiency === group.key);
            if (groupTechs.length === 0) return null;

            return (

              <div key={group.key} className="py-8 first:pt-0">
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`mt-1 shrink-0 transition-colors ${
                      group.key === "core" ? "text-zinc-900 dark:text-white" : "text-zinc-300 dark:text-zinc-700"
                    }`}
                  >
                    <Zap className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{group.label}</h4>
                    <p className="text-sm text-zinc-500 font-medium dark:text-zinc-400">{group.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2.5 ml-9">
                 {groupTechs.map((tech) => (
  <GlowPill
    key={tech.name}
    // We set active to true so they all glow
    active={true} 
    // Pass the group key (core, familiar, or exploring) to set the color
    type={group.key as "core" | "familiar" | "exploring"}
  >
    <div className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-zinc-100 whitespace-nowrap">
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
