import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface WavyBackgroundProps {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast" | "medium";
  waveOpacity?: number;
}

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9"],
  waveWidth = 50,
  backgroundFill = "black",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
}: WavyBackgroundProps) => {
  const [waves, setWaves] = useState<any[]>([]);

  useEffect(() => {
    const newWaves = colors.map((color, index) => ({
      color,
      duration: speed === "slow" ? 20 : speed === "medium" ? 15 : 10,
      delay: index * 2,
    }));
    setWaves(newWaves);
  }, [colors, speed]);

  return (
    <div
      className={cn(
        "h-screen w-full flex flex-col items-center justify-center",
        containerClassName
      )}
      style={{
        backgroundColor: backgroundFill,
      }}
    >
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            {waves.map((wave, index) => (
              <use
                key={index}
                xlinkHref="#gentle-wave"
                x="48"
                y={`${(index + 1) * 3}`}
                fill={wave.color}
                opacity={waveOpacity}
              />
            ))}
          </g>
        </svg>
      </div>

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};