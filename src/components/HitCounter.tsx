import React, { useState } from 'react';
import { Eye, Flame, Sparkles } from 'lucide-react';

export const HitCounter: React.FC = () => {
  const [count, setCount] = useState(48291);
  const [bumped, setBumped] = useState(false);

  const handleBump = () => {
    setCount((prev) => prev + 1);
    setBumped(true);
    setTimeout(() => setBumped(false), 500);
  };

  const digits = count.toString().padStart(6, '0').split('');

  return (
    <div className="inline-flex flex-col items-center p-3 bg-gradient-to-b from-[#2a2a2a] via-[#111111] to-[#000000] border-2 border-pink-400 rounded-lg shadow-[0_0_15px_rgba(255,20,147,0.5)] text-center">
      <div className="flex items-center gap-1.5 text-[11px] font-pixel text-pink-400 tracking-wider mb-1.5 uppercase">
        <Sparkles className="w-3.5 h-3.5 animate-spin text-cyan-300" />
        <span>Piczo Official Hit Counter</span>
        <Flame className="w-3.5 h-3.5 text-yellow-400 animate-bounce" />
      </div>

      <div className="flex items-center gap-1 bg-black p-1.5 rounded border border-cyan-400/60 shadow-inner">
        {digits.map((digit, idx) => (
          <div
            key={idx}
            className={`w-7 h-10 flex items-center justify-center bg-gradient-to-b from-[#202020] via-[#050505] to-[#151515] border border-gray-600 rounded text-xl font-bold font-counter text-lime-400 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),0_0_8px_rgba(50,255,50,0.4)] ${
              bumped && idx === digits.length - 1 ? 'animate-bounce text-pink-400' : ''
            }`}
          >
            {digit}
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-[10px] text-cyan-200 font-comic">
          Visitor #{count.toLocaleString()} (since 03/09/2005)
        </span>
        <button
          onClick={handleBump}
          title="Click to leave your footprint!"
          className="px-2 py-0.5 text-[10px] font-bold font-pixel bg-pink-500 hover:bg-pink-400 text-white rounded bevel-button transition-transform active:scale-95 flex items-center gap-1"
        >
          <Eye className="w-3 h-3" />
          Bump (+1)
        </button>
      </div>
    </div>
  );
};
