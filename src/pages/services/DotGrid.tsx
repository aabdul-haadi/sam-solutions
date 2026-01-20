import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  shockRadius?: number;
  shockStrength?: number;
  resistance?: number;
  returnDuration?: number;
}

const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 10,
  gap = 20,
  baseColor = '#1e90ff',
  activeColor = '#ffd700',
  proximity = 100,
  shockRadius = 200,
  shockStrength = 5,
  resistance = 800,
  returnDuration = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const dots: { x: number; y: number; originalX: number; originalY: number }[] = [];
    for (let x = gap / 2; x < canvas.width; x += gap) {
      for (let y = gap / 2; y < canvas.height; y += gap) {
        dots.push({ x, y, originalX: x, originalY: y });
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = baseColor;
      dots.forEach((dot) => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize / 2, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      dots.forEach((dot) => {
        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < shockRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (1 - distance / shockRadius) * shockStrength;
          gsap.to(dot, {
            x: dot.originalX - Math.cos(angle) * force * resistance,
            y: dot.originalY - Math.sin(angle) * force * resistance,
            duration: returnDuration,
            ease: 'power2.out',
            onUpdate: () => {
              if (distance < proximity) {
                ctx.fillStyle = activeColor;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dotSize / 2, 0, Math.PI * 2);
                ctx.fill();
              }
            },
          });
        }
      });

      draw();
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  }, [dotSize, gap, baseColor, activeColor, proximity, shockRadius, shockStrength, resistance, returnDuration]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default DotGrid;