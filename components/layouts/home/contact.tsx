"use client";

import { Mail, MapPin, MessageSquare, Send, Cpu } from "lucide-react";
import type React from "react";
import { useState } from "react";
import settings from "@/mock/settings.json";

export function ContactSection() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => setFormStatus("sent"), 1500);
  };

  return (
    <section 
      id="contact" 
      className="relative bg-transparent py-20 md:py-32 overflow-hidden scroll-mt-20"
    >
      <div className="relative mx-auto max-w-5xl px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: System Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-8 bg-cyan-500/50" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-500/80 font-mono">
                System.Comm_Link
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-8 leading-tight">
              Establish <br />
              <span className="text-zinc-500">Contact.</span>
            </h2>
            
            <p className="text-zinc-400 text-lg leading-relaxed mb-12 border-l border-zinc-800 pl-6">
              Ready to initialize a new project? Reach out through the secure channel below. 
              Always open to creative collaboration.
            </p>

            <div className="space-y-6">
              <a href={`mailto:${settings.email}`} className="group flex items-center gap-4 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-zinc-900/50 border border-zinc-800 text-zinc-500 group-hover:border-cyan-500/50 group-hover:text-cyan-400 transition-all">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">
                    DIRECT_LINE
                  </p>
                  <p className="text-sm font-bold text-zinc-100">{settings.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-zinc-900/50 border border-zinc-800 text-zinc-500">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">
                    COORDINATES
                  </p>
                  <p className="text-sm font-bold text-zinc-100">{settings.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Secure Form */}
          <div className="lg:col-span-7">
            <div className="relative p-1 md:p-8 rounded-sm bg-zinc-900/40 border border-zinc-800 backdrop-blur-md">
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-cyan-500/30" />
              <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-cyan-500/30" />

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 ml-1">
                      USER_ID
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="ENTER NAME"
                      className="w-full px-6 py-4 rounded-sm bg-zinc-950/50 border border-zinc-800 text-sm font-mono outline-none focus:border-cyan-500/50 text-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 ml-1">
                      EMAIL_ADDRESS
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="ENTER EMAIL"
                      className="w-full px-6 py-4 rounded-sm bg-zinc-950/50 border border-zinc-800 text-sm font-mono outline-none focus:border-cyan-500/50 text-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 ml-1">
                    TRANSMISSION_DATA
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    placeholder="TYPE YOUR MESSAGE..."
                    className="w-full px-6 py-4 rounded-sm bg-zinc-950/50 border border-zinc-800 text-sm font-mono outline-none focus:border-cyan-500/50 text-white transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus !== "idle"}
                  className={`w-full group flex items-center justify-center gap-3 px-8 py-4 rounded-sm font-bold transition-all active:scale-95 ${
                    formStatus === "sent"
                      ? "bg-emerald-500 text-black"
                      : "bg-cyan-600 text-black hover:bg-cyan-400"
                  }`}
                >
                  {formStatus === "idle" && (
                    <>
                      INITIALIZE SEND
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                  {formStatus === "sending" && "UPLOADING..."}
                  {formStatus === "sent" && "DATA RECEIVED"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}