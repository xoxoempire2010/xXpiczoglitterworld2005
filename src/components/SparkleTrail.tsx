import React, { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  shape: 'star' | 'diamond' | 'circle';
  rotation: number;
}

export const SparkleTrail: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (!active) return;

    let idCounter = 0;
    const colors = ['#ff007f', '#ff69b4', '#00e5ff', '#ffff00', '#ffffff', '#70d6ff'];
    const shapes: ('star' | 'diamond' | 'circle')[] = ['star', 'diamond', 'circle'];

    const handleMouseMove = (e: MouseEvent) => {
      // Limit sparkle rate
      if (Math.random() > 0.4) return;

      const newSparkle: Sparkle = {
        id: idCounter++,
        x: e.clientX + (Math.random() * 16 - 8),
        y: e.clientY + (Math.random() * 16 - 8),
        size: Math.floor(Math.random() * 12) + 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.floor(Math.random() * 360),
      };

      setSparkles((prev) => [...prev.slice(-25), newSparkle]);

      // Remove after 650ms
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 650);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [active]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ease-out animate-glitter"
          style={{
            left: s.x,
            top: s.y,
            color: s.color,
            fontSize: `${s.size}px`,
            transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
            textShadow: `0 0 6px ${s.color}, 0 0 10px #ffffff`,
          }}
        >
          {s.shape === 'star' ? '★' : s.shape === 'diamond' ? '✦' : '•'}
        </span>
      ))}
    </div>
  );
};
