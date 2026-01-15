import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub as Github, FaLinkedin as Linkedin, FaXTwitter as Twitter } from "react-icons/fa6";
import settings from "@/mock/settings.json";

export function Footer() {
  const socialLinks = [
    { url: settings.github, icon: Github, label: "GitHub" },
    { url: settings.linkedin, icon: Linkedin, label: "LinkedIn" },
    { url: settings.twitter, icon: Twitter, label: "Twitter" },
    { url: `mailto:${settings.email}`, icon: Mail, label: "Email" },
  ].filter((link) => link.url);

  return (
    <footer className="border-t border-zinc-100 bg-zinc-50/50 py-16 md:py-24 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex flex-col items-center md:flex-row md:items-start justify-between gap-12 text-center md:text-left">
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start gap-4 max-w-sm">
            <div className="flex items-center gap-2 group cursor-pointer">
              <Image src="/logo.png" alt="Ming.dev Logo" width={86} height={48} className="max-h-12 w-auto h-full" />
            </div>
            <p className="text-sm text-zinc-500 max-w-60 leading-relaxed font-medium mt-2 dark:text-zinc-400">
              Building scalable products and high-performance user interfaces with precision.
            </p>
          </div>

          {/* Social Links & Legal */}
          <div className="flex flex-col items-ceneter md:items-end gap-6">
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={`footer-${link.label}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-zinc-200 text-zinc-400 transition-all hover:border-zinc-900 hover:text-zinc-900 hover:-translate-y-1 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-500 dark:hover:border-zinc-700 dark:hover:text-white"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>

            <div className="flex flex-col items-center md:items-end gap-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-700">
                Availability
              </span>
              <span className="text-xs font-bold text-zinc-900 flex items-center gap-1.5 dark:text-zinc-300">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Open for new projects
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-4 dark:border-zinc-900">
          <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
            © {new Date().getFullYear()} All Rights Reserved, Designed by Neil Irvine Morales.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors dark:text-zinc-600 dark:hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors dark:text-zinc-600 dark:hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
