"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { useScrollSpy } from "@/hooks/use-scrollspy";
import { cn } from "@/lib/utils";

const navLinks = [
  { id: "home", label: "Home", href: "#home" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy(navLinks.map((v) => v.id));
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/80">
      <nav className="mx-auto flex h-20 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-2.5 transition-transform active:scale-95">
          <ReactSVG src="/logo-minimal.svg" className="[&>div>svg]:size-8 dark:fill-white" />
          <span className="font-black">ming.dev</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => {
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-xs font-bold uppercase tracking-widest transition-all hover:text-zinc-900 dark:hover:text-white text-zinc-400 dark:text-zinc-500",
                  activeSection === link.id && "text-zinc-900 dark:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Theme Toggle Button */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-100 bg-white text-zinc-900 shadow-sm transition-all hover:border-zinc-300 active:scale-90 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-700"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-100 bg-white text-zinc-900 md:hidden active:scale-90 transition-all dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-20 z-40 bg-white/60 backdrop-blur-xl transition-all duration-300 dark:bg-zinc-950/60 md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-2"
        }`}
      >
        <div className="flex flex-col gap-2 p-6">
          {navLinks.map((link) => {
            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between rounded-2xl px-6 py-4 text-sm font-bold transition-all"
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
