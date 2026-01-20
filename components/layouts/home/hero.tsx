"use client";

import { ArrowRight, Download, Mail, MapPin, Cpu, ShieldCheck, Terminal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaGithub as Github,
  FaLinkedin as Linkedin,
  FaXTwitter as Twitter,
  FaFacebook as Facebook
} from "react-icons/fa6";
import settings from "@/mock/settings.json";

export function HeroSection() {
  const socialLinks = [
    { url: settings.github, icon: Github, label: "GitHub" },
    { url: settings.linkedin, icon: Linkedin, label: "LinkedIn" },
    { url: settings.twitter, icon: Twitter, label: "Twitter" },
    { url: settings.facebook, icon: Facebook, label: "Facebook" },
    { url: `mailto:${settings.email}`, icon: Mail, label: "Email" },
  ].filter((link) => link.url);

  return (
   <section
  className="relative flex min-h-[70vh] md:min-h-[800px] items-center bg-transparent overflow-hidden pt-32 pb-16 lg:pt-20 lg:pb-0 scroll-mt-20"
  id="home"
>

      {/* 3. The "Big N" Decal (moved to far right for better space usage) */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] select-none">
        <span className="text-[40rem] font-black leading-none text-white">N</span>
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* --- LEFT CONTENT (Text & HUD) --- */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* HUD Status Bar */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 flex items-center gap-3 rounded-md border border-cyan-500/30 bg-cyan-500/5 px-4 py-2"
            >
              <div className="relative h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
                System Active // {settings.location}
              </span>
            </motion.div>

            {/* Main Name Header */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 dot-matrix dot-matrix-lg leading-[0.85] text-white"
            >
              {settings.name}
            </motion.h1>

            {/* Title with Scanning Line */}
            <div className="relative mb-8 overflow-hidden">
               <p className="text-2xl md:text-4xl font-bold text-white/90">
                 {settings.title}<span className="text-cyan-500">_</span>
               </p>
            </div>

            {/* Bio with HUD Accents */}
            <div className="relative mb-10 max-w-2xl border-l-2 border-zinc-800 pl-6">
              <p className="text-lg leading-relaxed text-zinc-400">
                {settings.bio}
              </p>
              {/* Corner accent for bio */}
              <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-zinc-700" />
            </div>

            {/* CTA Buttons */}
            <div className="mb-12 flex flex-wrap gap-5">
              <Link
                href="#projects"
                className="group relative flex items-center gap-3 overflow-hidden rounded-sm bg-cyan-600 px-8 py-4 font-bold text-black transition-all hover:bg-cyan-400"
              >
                <span className="z-10 flex items-center gap-2">
                  INITIATE PROJECTS <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </Link>

              {settings.resumeUrl && (
                <Link
                  href={settings.resumeUrl}
                  target="_blank"
                  className="flex items-center gap-3 rounded-sm border border-zinc-700 bg-zinc-900/50 px-8 py-4 font-bold text-white transition-all hover:border-cyan-500/50 hover:bg-zinc-800"
                >
                  <Download className="h-4 w-4" /> DATA_LOG.PDF
                </Link>
              )}
            </div>

            {/* Social Links with Label HUD */}
            <div className="flex flex-wrap items-center gap-8 border-t border-zinc-800 pt-8 w-full">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  className="group flex flex-col gap-1 text-zinc-500 transition-all hover:text-cyan-400"
                >
                  <span className="text-[10px] font-mono tracking-tighter opacity-50 group-hover:opacity-100">[{link.label}]</span>
                  <link.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* --- RIGHT CONTENT (Cyber Avatar Frame) --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            {/* Floating Info Boxes (utilizing space around avatar) */}
            <div className="absolute top-10 -left-10 z-20 hidden xl:flex flex-col gap-2 rounded-md border border-zinc-800 bg-zinc-950/80 p-3 backdrop-blur-sm">
               <div className="flex items-center gap-2 text-cyan-500"><Cpu size={14} /> <span className="text-[10px] font-bold">FULL STACK CORE</span></div>
               <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                 <motion.div animate={{ width: ["0%", "90%"] }} transition={{ duration: 2 }} className="h-full bg-cyan-500" />
               </div>
            </div>

            <div className="absolute bottom-10 -right-5 z-20 hidden xl:flex items-center gap-3 rounded-md border border-zinc-800 bg-zinc-950/80 p-3 backdrop-blur-sm">
               <ShieldCheck size={18} className="text-emerald-500" />
               <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase">Verification</span>
                  <span className="text-[10px] text-white font-mono">SECURE_DEV_V2.0</span>
               </div>
            </div>

            {/* The Avatar Container */}
            <div className="relative group">
              {/* Animated Corner Brackets */}
              <div className="absolute -top-4 -left-4 h-12 w-12 border-t-2 border-l-2 border-cyan-500 transition-all group-hover:-top-2 group-hover:-left-2" />
              <div className="absolute -bottom-4 -right-4 h-12 w-12 border-b-2 border-r-2 border-cyan-500 transition-all group-hover:-bottom-2 group-hover:-right-2" />

              <div className="relative h-[450px] w-[320px] overflow-hidden bg-zinc-900 border border-zinc-800">
                <Image
                  src={settings.avatarUrl}
                  alt={settings.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                {/* Scanning Light Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-1/2 w-full animate-scan pointer-events-none" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}