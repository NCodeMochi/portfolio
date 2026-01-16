import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  FaGithub as Github,
  FaLinkedin as Linkedin,
  FaFacebook as Facebook
} from "react-icons/fa6";
import settings from "@/mock/settings.json";


export function HeroSection() {
  const socialLinks = [
    { url: settings.github, icon: Github, label: "GitHub" },
    { url: settings.linkedin, icon: Linkedin, label: "LinkedIn" },
    { url: settings.facebook, icon: Facebook, label: "Facebook" },
    { url: `mailto:${settings.email}`, icon: Mail, label: "Email" },
  ].filter((link) => link.url);

  return (
    <section
      className="relative flex min-h-[70vh] items-center bg-white overflow-hidden py-24 dark:bg-zinc-950 scroll-mt-20"
      id="home"
    >
      {/* Subtle background detail */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-[0.03] dark:opacity-[0.02]">
        <div className="absolute top-10 left-10 text-[20rem] font-black text-zinc-900 leading-none select-none dark:text-white">
          N
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex-1">
            {/* STATUS */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 animate-pulse">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-500 ">
                Available for hire
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            </div>


            {/* DOT MATRIX NAME */}
            <h1 className="mb-6 dot-matrix dot-matrix-lg ">
              {settings.name
                .split(" ")
                .reduce(
                  (lines: string[][], word, index, arr) => {
                    const half = Math.ceil(arr.length / 2);
                    lines[index < half ? 0 : 1].push(word);
                    return lines;
                  },
                  [[], []]
                )
                .map((line, index) => (
                  <span key={index} className="block">
                    {line.join(" ")}
                  </span>
                ))}
            </h1>

            {/* GRADIENT TITLE */}
            <p className="mb-6 text-xl md:text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              {settings.title}
            </p>


            {/* LOCATION */}
            <div className="mb-8 flex flex-wrap items-center gap-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {settings.location}
              </span>
            </div>

            {/* BIO */}
            <p className="mb-10 max-w-xl text-lg leading-relaxed font-medium text-zinc-500 dark:text-zinc-400">
              {settings.bio}
            </p>

            {/* CTA */}
            <div className="mb-12 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="group flex items-center gap-2 rounded-2xl bg-zinc-900 px-8 py-4 font-bold text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-white dark:text-zinc-900"
              >
                View My Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {settings.resumeUrl && (
                <Link
                  href={settings.resumeUrl}
                  target="_blank"
                  className="flex items-center gap-2 rounded-2xl border border-zinc-200 px-8 py-4 font-bold text-zinc-900 transition-all hover:border-zinc-900 active:scale-95 dark:border-zinc-800 dark:text-white"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </Link>
              )}
            </div>

            {/* SOCIALS */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-6">
                {socialLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    aria-label={link.label}
                    className="text-zinc-400 transition-all hover:-translate-y-0.5 hover:text-cyan-400 dark:hover:text-white"
                  >
                    <link.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* AVATAR */}
          {settings.avatarUrl && (
            <div className="relative hidden shrink-0 lg:block">
              <div className="relative h-92 w-64 overflow-hidden rounded-3xl border border-zinc-100 bg-zinc-50 p-2 shadow-inner dark:border-zinc-800 dark:bg-zinc-900">
                <Image
                  src={settings.avatarUrl}
                  alt={settings.name}
                  width={256}
                  height={256}
                  className="h-full w-full rounded-2xl object-cover grayscale transition-all duration-700 hover:grayscale-0"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 border-b border-r border-zinc-100 dark:border-zinc-900" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
