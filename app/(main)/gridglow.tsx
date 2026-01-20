"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function GridGlow() {
  const [sparks, setSparks] = useState<number[]>([]);

  // Create 8 random spark IDs
  useEffect(() => {
    setSparks(Array.from({ length: 8 }, (_, i) => i));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparks.map((id) => (
        <Spark key={id} />
      ))}
    </div>
  );
}

function Spark() {
  const randomDelay = Math.random() * 10;
  const randomDuration = 3 + Math.random() * 4;
  
  // Randomly start from top or left
  const isVertical = Math.random() > 0.5;
  const startPos = Math.floor(Math.random() * 20) * 40; // Align to 40px grid

  return (
    <motion.div
      initial={isVertical ? { top: "-10%", left: startPos, opacity: 0 } : { left: "-10%", top: startPos, opacity: 0 }}
      animate={isVertical 
        ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] } 
        : { left: ["0%", "100%"], opacity: [0, 1, 1, 0] }
      }
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
        ease: "linear",
      }}
      className={`absolute z-0 ${isVertical ? "w-[1px] h-32" : "h-[1px] w-32"} bg-gradient-to-b from-transparent via-white to-transparent`}
      style={{
        boxShadow: "0 0 15px 2px rgba(255, 255, 255, 0.4)",
      }}
    />
  );
}