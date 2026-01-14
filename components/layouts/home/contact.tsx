"use client";

import { Mail, MapPin, MessageSquare, Send } from "lucide-react";
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
    <section id="contact" className="relative bg-white py-20 md:py-32 dark:bg-zinc-950">
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Column: Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
                Contact
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 mb-8 dark:text-white leading-tight">
              Get in <br />
              Touch.
            </h2>
            <p className="text-zinc-500 text-lg font-medium leading-relaxed mb-12 dark:text-zinc-400">
              Have a project in mind or just want to chat? Feel free to reach out. I'm always open to discussing new
              projects, creative ideas, or opportunities.
            </p>

            <div className="space-y-8">
              <a href={`mailto:${settings.email}`} className="group flex items-center gap-4 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50 border border-zinc-100 text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white dark:bg-zinc-900 dark:border-zinc-800 dark:group-hover:bg-white dark:group-hover:text-zinc-900 transition-all">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
                    Email Me
                  </p>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{settings.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50 border border-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:border-zinc-800">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
                    Location
                  </p>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{settings.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="relative p-1 md:p-8 rounded-[2.5rem] lg:bg-zinc-50/50 lg:border lg:border-zinc-100 dark:lg:bg-zinc-900/20 dark:lg:border-zinc-800/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600 ml-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="John Doe"
                      className="w-full px-6 py-4 rounded-2xl bg-white border border-zinc-100 text-sm font-medium outline-none focus:border-zinc-900 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-white dark:focus:border-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600 ml-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-6 py-4 rounded-2xl bg-white border border-zinc-100 text-sm font-medium outline-none focus:border-zinc-900 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-white dark:focus:border-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600 ml-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    placeholder="Tell me about your project..."
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-zinc-100 text-sm font-medium outline-none focus:border-zinc-900 transition-all resize-none dark:bg-zinc-900 dark:border-zinc-800 dark:text-white dark:focus:border-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus !== "idle"}
                  className={`w-full group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all shadow-xl active:scale-95 ${
                    formStatus === "sent"
                      ? "bg-green-500 text-white shadow-green-100 dark:shadow-none"
                      : "bg-zinc-900 text-white hover:bg-zinc-800 shadow-zinc-200 dark:bg-white dark:text-zinc-900 dark:shadow-none"
                  }`}
                >
                  {formStatus === "idle" && (
                    <>
                      Send Message
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                  {formStatus === "sending" && "Sending..."}
                  {formStatus === "sent" && "Message Sent!"}
                </button>
              </form>

              {/* Decorative element */}
              <div className="hidden lg:flex absolute -top-4 -right-4 h-12 w-12 bg-white rounded-2xl border border-zinc-100 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 items-center justify-center">
                <MessageSquare className="h-5 w-5 text-indigo-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
