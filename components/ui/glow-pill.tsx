import React from "react";
import { cn } from "@/lib/utils";

type GlowType = "core" | "familiar" | "exploring";

export function GlowPill({
  children,
  active = false,
  type = "core",
  className,
}: {
  children: React.ReactNode;
  active?: boolean;
  type?: GlowType;
  className?: string;
}) {
  // Define color maps for the different types
  const colorMap = {
    core: {
      gradient: "conic-gradient(from 0deg, #3b82f6, #00d4ff, #3b82f6)",
      shadow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]",
    },
    familiar: {
      gradient: "conic-gradient(from 0deg, #8b5cf6, #d946ef, #8b5cf6)",
      shadow: "shadow-[0_0_15px_rgba(139,92,246,0.4)]",
    },
    exploring: {
      gradient: "conic-gradient(from 0deg, #14b8a6, #22d3ee, #14b8a6)",
      shadow: "shadow-[0_0_15px_rgba(20,184,166,0.3)]",
    },
  };

  const currentStyles = colorMap[type];

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full overflow-hidden transition-all duration-300",
        active ? `p-[1.5px] ${currentStyles.shadow}` : "p-[1px]",
        className
      )}
    >
      {active && (
        <>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes border-spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}} />
          <div 
            className="absolute inset-[-150%]"
            style={{
              animation: "border-spin 4s linear infinite",
              background: currentStyles.gradient,
              willChange: "transform",
              transform: "translateZ(0)",
            }}
          />
        </>
      )}

      <div className={cn(
        "relative z-10 w-full h-full rounded-full flex items-center bg-zinc-950",
        !active && "border border-zinc-800"
      )}>
        {children}
      </div>
    </div>
  );
}