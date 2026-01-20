// src/pages/services/Squares.tsx
import React, { useRef, useEffect } from 'react';

interface SquaresProps {
  speed?: number;
  squareSize?: number;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  borderColor?: string;
  hoverFillColor?: string;
}

const Squares: React.FC<SquaresProps> = ({
  speed = 0.5,
  squareSize = 50,
  direction = 'diagonal',
  borderColor = '#000',
  hoverFillColor = '#fff',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Placeholder animation logic
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = borderColor;
      ctx.fillStyle = hoverFillColor;
      // Example: Draw a single square
      ctx.strokeRect(50, 50, squareSize, squareSize);
    };

    draw();
  }, [squareSize, borderColor, hoverFillColor]);

  return <canvas ref={canvasRef} width={800} height={600} className="w-full h-full" />;
};

export default Squares;