"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BoxesProps {
  className?: string;
  boxColors?: string[];
  background?: string;
  duration?: number;
}

export const Boxes: React.FC<BoxesProps> = ({
  className,
  boxColors = ["#D4AF37", "#0D9488", "#7C3AED", "#EAB308", "#10B981", "#F59E0B"],
  background = "linear-gradient(to bottom right, #07100F, #0f172a, #1e293b)",
  duration = 2,
}) => {
  const rows = 10;
  const cols = 15;
  const boxes = Array.from({ length: rows * cols });

  return (
    <div
      style={{
        background,
      }}
      className={cn(
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-hidden p-4",
        className
      )}
    >
      <div className="absolute inset-0 w-full h-full">
        {boxes.map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          
          // Create interesting patterns
          const isEvenRow = row % 2 === 0;
          const isEvenCol = col % 2 === 0;
          const delay = ((row + col) % 4) * 0.5;
          
          return (
            <motion.div
              key={`box-${i}`}
              className="absolute border border-white/10 rounded-lg"
              style={{
                width: `calc(100% / ${cols})`,
                height: `calc(100% / ${rows})`,
                left: `${col * (100 / cols)}%`,
                top: `${row * (100 / rows)}%`,
                background: `linear-gradient(135deg, ${
                  boxColors[(row * col) % boxColors.length]
                }20, ${boxColors[(row + col) % boxColors.length]}10)`,
                transform: isEvenRow && isEvenCol ? "skewX(10deg)" : "skewY(5deg)",
                transformOrigin: "center",
                scale: 1,
              }}
              animate={{
                background: [
                  `linear-gradient(135deg, ${
                    boxColors[(row * col) % boxColors.length]
                  }20, ${boxColors[(row + col) % boxColors.length]}10)`,
                  `linear-gradient(135deg, ${
                    boxColors[(row + col) % boxColors.length]
                  }30, ${boxColors[row % boxColors.length]}20)`,
                  `linear-gradient(135deg, ${
                    boxColors[row % boxColors.length]
                  }20, ${boxColors[(row * col) % boxColors.length]}10)`,
                ],
                scale: [1, 1.05, 1],
                rotate: isEvenRow ? [0, 2, 0] : [0, -2, 0],
              }}
              transition={{
                duration: duration + Math.random(),
                delay: delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.2,
                background: `linear-gradient(135deg, ${
                  boxColors[(row * col) % boxColors.length]
                }40, ${boxColors[(row + col) % boxColors.length]}30)`,
                zIndex: 10,
                transition: { duration: 0.2 },
              }}
            >
              {/* Inner glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg"></div>
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 rounded-tl"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30 rounded-tr"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30 rounded-bl"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 rounded-br"></div>
            </motion.div>
          );
        })}
        
        {/* Central glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-gold-400/20 via-emerald-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        
        {/* Moving lights */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-gold-400/10 to-transparent rounded-full"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-transparent to-purple-400/10 rounded-full"
          animate={{
            x: [0, -80, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5,
          }}
        />
      </div>
    </div>
  );
};

export default Boxes;