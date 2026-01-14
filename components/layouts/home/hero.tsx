import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub as Github, FaLinkedin as Linkedin, FaXTwitter as Twitter } from "react-icons/fa6";
import settings from "@/mock/settings.json";

export function HeroSection() {
  const socialLinks = [
    { url: settings.github, icon: Github, label: "GitHub" },
    { url: settings.linkedin, icon: Linkedin, label: "LinkedIn" },
    { url: settings.twitter, icon: Twitter, label: "Twitter" },
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
          M
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                Available for hire
              </span>
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse dark:bg-indigo-400" />
            </div>

            <h1 className="mb-4 text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 leading-[0.9] dark:text-white">
              {settings.name}
            </h1>

            <p className="mb-6 text-2xl md:text-3xl font-semibold text-zinc-400 tracking-tight dark:text-zinc-500">
              {settings.title}
            </p>

            <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-zinc-500 font-medium dark:text-zinc-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {settings.location}
              </span>
            </div>

            <p className="mb-10 max-w-xl text-zinc-500 text-lg leading-relaxed font-medium dark:text-zinc-400">
              {settings.bio}
            </p>

            <div className="mb-12 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="group relative flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold transition-all hover:bg-zinc-800 shadow-xl shadow-zinc-200 active:scale-95 dark:bg-white dark:text-zinc-900 dark:shadow-none dark:hover:bg-zinc-200"
              >
                View My Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {settings.resumeUrl && (
                <Link
                  href={settings.resumeUrl}
                  target="_blank"
                  className="flex items-center gap-2 px-8 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-2xl font-bold transition-all hover:border-zinc-900 hover:bg-zinc-50 active:scale-95 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white dark:hover:border-zinc-700 dark:hover:bg-zinc-800/50"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </Link>
              )}
            </div>

            {socialLinks.length > 0 && (
              <div className="flex items-center gap-6">
                {socialLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    className="text-zinc-400 transition-all hover:text-zinc-900 hover:-translate-y-0.5 dark:text-zinc-600 dark:hover:text-white"
                    aria-label={link.label}
                  >
                    <link.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {settings.avatarUrl && (
            <div className="relative shrink-0 hidden lg:block">
              <div className="relative h-64 w-64 overflow-hidden rounded-3xl border border-zinc-100 p-2 bg-zinc-50 shadow-inner dark:border-zinc-800 dark:bg-zinc-900">
                <Image
                  src={settings.avatarUrl}
                  alt={settings.name}
                  className="w-full h-full object-cover object-top rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair"
                  width={256}
                  height={256}
                />
              </div>
              {/* Abstract decorative shape */}
              <div className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 border-b border-r border-zinc-100 dark:border-zinc-900" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
