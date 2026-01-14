"use client";

import { ExternalLink, MapPin } from "lucide-react";
import type React from "react";
import experiences from "@/mock/experiences.json";

const formatDate = (date: string) => {
  const [year, month] = date.split("-");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${monthNames[Number.parseInt(month, 10) - 1]} ${year}`;
};

const ExperienceCard: React.FC<{ exp: (typeof experiences)[number]; isLast: boolean }> = ({ exp, isLast }) => {
  return (
    <div className="relative pl-8 md:pl-12 group">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-2.75 md:left-3.75 top-8 bottom-0 w-px bg-zinc-200 group-hover:bg-zinc-300 transition-colors duration-500 dark:bg-zinc-700 dark:group-hover:bg-zinc-600" />
      )}

      {/* Timeline Dot */}
      <div
        className={`absolute left-0 top-1.5 w-6 h-6 md:w-8 md:h-8 rounded-full border border-zinc-200 bg-white z-10 flex items-center justify-center transition-all duration-300 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 ${
          exp.isCurrent
            ? "border-zinc-900 ring-4 ring-zinc-50 dark:border-white dark:ring-zinc-800"
            : "group-hover:border-zinc-400 dark:group-hover:border-zinc-600"
        }`}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${exp.isCurrent ? "bg-zinc-900 dark:bg-white" : "bg-zinc-300 group-hover:bg-zinc-500 dark:bg-zinc-600 dark:group-hover:bg-zinc-400"}`}
        />
      </div>

      <div className="mb-12 transition-all duration-500 transform group-hover:-translate-y-0.5">
        {/* Date Label */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
          <span className="inline-flex items-center text-xs font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            {formatDate(exp.startDate)} —{" "}
            {exp.isCurrent || !exp.endDate ? "Present" : exp.endDate && formatDate(exp.endDate)}
          </span>
          {exp.isCurrent && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-zinc-900 text-white uppercase tracking-tighter dark:bg-white dark:text-zinc-900">
              Active
            </span>
          )}
        </div>

        {/* Card Content */}
        <div className="relative p-6 rounded-xl border transition-all duration-300 group-hover:bg-white group-hover:border-zinc-200 group-hover:shadow-md group-hover:ring-1 group-hover:ring-zinc-100 bg-white border-transparent dark:bg-zinc-900/50 dark:group-hover:bg-zinc-900 dark:group-hover:border-zinc-700 dark:group-hover:ring-zinc-800">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h4 className="text-xl font-bold text-zinc-900 leading-tight dark:text-white">{exp.position}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-zinc-600 font-medium dark:text-zinc-300">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-zinc-900 transition-colors underline decoration-zinc-200 underline-offset-4 hover:decoration-zinc-400 dark:hover:text-white dark:decoration-zinc-600 dark:hover:decoration-zinc-500"
                    >
                      {exp.company}
                      <ExternalLink className="h-3.5 w-3.5 opacity-40" />
                    </a>
                  ) : (
                    exp.company
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium dark:text-zinc-500">
              <MapPin className="h-3.5 w-3.5" />
              {exp.location}
            </div>
          </div>

          <p className="text-zinc-500 text-sm leading-relaxed mb-6 max-w-2xl dark:text-zinc-400">{exp.description}</p>

          <div className="space-y-2.5 mb-8">
            {exp.keyPoints.map((point, index) => (
              <div key={index} className="flex gap-3">
                <div className="h-1 w-1 rounded-full bg-zinc-300 mt-2 shrink-0 dark:bg-zinc-600" />
                <span className="text-sm text-zinc-600 leading-snug dark:text-zinc-400">{point}</span>
              </div>
            ))}
          </div>

          {/* Technology Pills styled after the provided screenshot */}
          <div className="flex flex-wrap gap-2 pt-5 border-t border-zinc-50 dark:border-zinc-800">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-[11px] font-medium text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 transition-all cursor-default dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export function WorkExperienceSection() {
  return (
    <section className="relative bg-white py-20 md:py-28 scroll-mt-20 dark:bg-zinc-950" id="experience">
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
              Experience
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6 dark:text-white">
            Where I've contributed.
          </h2>
          <p className="text-zinc-500 max-w-md text-sm font-medium leading-relaxed dark:text-zinc-400">
            A history of my professional work, focusing on building high-quality, performant, and accessible user
            interfaces.
          </p>
        </div>

        <div className="relative">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} isLast={index === experiences.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
