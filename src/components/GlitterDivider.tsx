import React from 'react';

interface GlitterDividerProps {
  variant?: 'stars' | 'hearts' | 'diamonds' | 'rainbow' | 'y2k';
  className?: string;
}

export const GlitterDivider: React.FC<GlitterDividerProps> = ({ variant = 'stars', className = '' }) => {
  return (
    <div className={`my-6 flex items-center justify-center space-x-2 py-2 select-none overflow-hidden ${className}`}>
      {/* Left Sparkling Tail */}
      <div className="h-[3px] flex-1 bg-gradient-to-r from-transparent via-[#ff1493] to-[#00e5ff] shadow-[0_0_8px_#ff69b4]" />

      {/* Center Glitter Motif */}
      <div className="flex items-center space-x-1.5 px-3 py-1 bg-white/70 backdrop-blur-xs rounded-full border border-pink-300 shadow-[0_0_12px_rgba(255,20,147,0.4)]">
        {variant === 'stars' && (
          <>
            <span className="text-pink-500 animate-sparkle-fast text-lg">★</span>
            <span className="text-cyan-400 animate-sparkle-slow text-sm">✦</span>
            <span className="text-pink-600 animate-sparkle-fast text-xl font-bold">✧</span>
            <span className="text-yellow-400 animate-bounce text-sm">★</span>
            <span className="text-cyan-500 animate-sparkle-slow text-lg">✦</span>
            <span className="text-pink-500 animate-sparkle-fast text-sm">★</span>
          </>
        )}

        {variant === 'hearts' && (
          <>
            <span className="text-pink-500 animate-pulse text-base">♥</span>
            <span className="text-cyan-400 animate-sparkle-fast text-sm">♡</span>
            <span className="text-pink-600 animate-sparkle-slow text-xl">❦</span>
            <span className="text-cyan-500 animate-sparkle-fast text-sm">♡</span>
            <span className="text-pink-500 animate-pulse text-base">♥</span>
          </>
        )}

        {variant === 'diamonds' && (
          <>
            <span className="text-cyan-400 animate-sparkle-fast text-base">◆</span>
            <span className="text-pink-500 animate-sparkle-slow text-lg">✦</span>
            <span className="text-yellow-300 animate-sparkle-fast text-xl">❖</span>
            <span className="text-pink-500 animate-sparkle-slow text-lg">✦</span>
            <span className="text-cyan-400 animate-sparkle-fast text-base">◆</span>
          </>
        )}

        {variant === 'y2k' && (
          <>
            <span className="text-xs font-pixel font-bold text-pink-600 px-1 bg-pink-100 rounded">
              ★~*~xXx~*~★
            </span>
            <span className="text-pink-500 animate-spin text-sm">✿</span>
            <span className="text-xs font-pixel font-bold text-cyan-600 px-1 bg-cyan-100 rounded">
              GLITTER 2005
            </span>
          </>
        )}
      </div>

      {/* Right Sparkling Tail */}
      <div className="h-[3px] flex-1 bg-gradient-to-r from-[#00e5ff] via-[#ff1493] to-transparent shadow-[0_0_8px_#00e5ff]" />
    </div>
  );
};
