import { cn } from "@/lib/utils";

export function GlowIcon({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div className="relative flex items-center justify-center">
      {active && (
        <span
          className="
            absolute inset-[-5px] rounded-full
            bg-[conic-gradient(from_0deg,transparent,rgba(34,211,238,.9),rgba(99,102,241,.9),transparent)]
            animate-spin-slow
            [mask:radial-gradient(circle,transparent_58%,black_60%)]
            blur-sm
          "
        />
      )}

      {/* Icon */}
      <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full">
        {children}
      </span>
    </div>
  );
}
