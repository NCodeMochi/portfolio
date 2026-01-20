"use client";

import { Menu, X, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useScrollSpy } from "@/hooks/use-scrollspy";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { id: "home", label: "Home", code: "01" },
  { id: "projects", label: "Projects", code: "02" },
  { id: "experience", label: "Experience", code: "03" },
  { id: "contact", label: "Contact", code: "04" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy(navLinks.map((v) => v.id));

  const handleNavClick = (e: React.MouseEvent, id: string, closeMobile = false) => {
    e.preventDefault();
    if (closeMobile) setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-[60] w-full border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
      {/* Top thin progress bar / scanning line effect */}
      <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <nav className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-6">
        {/* LOGO AREA */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-all"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-cyan-500/20 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
              src="/portfolio/simple-logo.svg" 
              alt="logo"
              className="relative size-9 object-contain brightness-200" 
            />
          </div>
          
          <div className="flex flex-col leading-none">
            <span className="text-sm font-black tracking-widest uppercase text-white">
              NEIL<span className="text-cyan-500">.</span>DEV
            </span>
            <div className="flex items-center gap-1 mt-1">
              <Terminal size={10} className="text-cyan-500/70" />
              <span 
  className="text-[9px] font-mono text-cyan-500/90 uppercase tracking-tighter animate-cyber-glitch"
  style={{
    textShadow: "0 0 8px rgba(6, 182, 212, 0.6)",
  }}
>
  System_Admin
</span>
            </div>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className={cn(
                "relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all group",
                activeSection === link.id ? "text-cyan-400" : "text-zinc-500 hover:text-white"
              )}
            >
              <span className="mr-1.5 text-[9px] font-mono opacity-40">{link.code}</span>
              {link.label}
              
              {/* Active Indicator Underline */}
              {activeSection === link.id && (
                <motion.div 
                  layoutId="nav-active"
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                />
              )}
            </Link>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          {/* HUD Utility Button */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 border border-white/5 bg-white/5 rounded-sm">
             <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">v2.0_stable</span>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center border border-white/10 bg-zinc-900 text-zinc-400 md:hidden transition-all hover:border-cyan-400 hover:text-cyan-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU (Cyber Style) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute w-full bg-zinc-950 border-b border-cyan-500/20 overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-6 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id, true)}
                  className={cn(
                    "flex items-center justify-between border-l-2 py-4 px-6 text-xs font-bold uppercase tracking-[0.3em] transition-all",
                    activeSection === link.id
                      ? "border-cyan-500 bg-cyan-500/5 text-cyan-400"
                      : "border-transparent text-zinc-500"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] opacity-30">{link.code}</span>
                    {link.label}
                  </div>
                  <ArrowRight size={14} className={activeSection === link.id ? "opacity-100" : "opacity-0 text-cyan-400"} />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}