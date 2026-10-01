import React, { useState } from 'react';
import { Sparkles, Trash2, Plus, Stamp, Download, Wand2 } from 'lucide-react';
import { GlitterDivider } from './GlitterDivider.tsx';

export interface Sticker {
  id: string;
  emoji: string;
  label: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  glitterColor: string;
}

const STICKER_PALETTE = [
  { emoji: '🎀', label: 'Hello Kitty Bow', color: '#ff1493' },
  { emoji: '🐭', label: 'Mickey Mouse Ears', color: '#00e5ff' },
  { emoji: '💋', label: 'Lipgloss Kiss', color: '#ff007f' },
  { emoji: '💎', label: 'Diamanté Sparkle', color: '#70d6ff' },
  { emoji: '🧀', label: 'Dairylea Nacho', color: '#ffd60a' },
  { emoji: '🍗', label: 'Asda Hot Wing', color: '#ff6b35' },
  { emoji: '⭐', label: 'BTEC Gold Star', color: '#ffbe0b' },
  { emoji: '💖', label: 'Glitter Heart', color: '#ff70a6' },
  { emoji: '💿', label: 'Mixtape CD-R', color: '#8338ec' },
  { emoji: '📱', label: 'Motorola Razr V3', color: '#ff006e' },
];

const INITIAL_STICKERS: Sticker[] = [
  { id: '1', emoji: '🎀', label: 'Hello Kitty Bow', x: 8, y: 15, scale: 1.2, rotation: -12, glitterColor: '#ff1493' },
  { id: '2', emoji: '🐭', label: 'Mickey Mouse Ears', x: 85, y: 12, scale: 1.2, rotation: 10, glitterColor: '#00e5ff' },
  { id: '3', emoji: '💎', label: 'Diamanté Sparkle', x: 88, y: 65, scale: 1.1, rotation: 15, glitterColor: '#70d6ff' },
  { id: '4', emoji: '🧀', label: 'Dairylea Nacho', x: 6, y: 70, scale: 1.1, rotation: -8, glitterColor: '#ffd60a' },
];

export const BlingeeStampCanvas: React.FC = () => {
  const [stickers, setStickers] = useState<Sticker[]>(INITIAL_STICKERS);
  const [selectedPaletteItem, setSelectedPaletteItem] = useState(STICKER_PALETTE[0]);
  const [customGlitterText, setCustomGlitterText] = useState('xXx_Darren_And_Stacey_2005_xXx');
  const [textColorTheme, setTextColorTheme] = useState<'pink' | 'blue'>('pink');
  const [copiedCode, setCopiedCode] = useState(false);

  const addStickerRandomly = (paletteItem = selectedPaletteItem) => {
    const newSticker: Sticker = {
      id: Date.now().toString(),
      emoji: paletteItem.emoji,
      label: paletteItem.label,
      x: Math.floor(Math.random() * 70) + 15,
      y: Math.floor(Math.random() * 60) + 20,
      scale: 1 + Math.random() * 0.4,
      rotation: Math.floor(Math.random() * 40) - 20,
      glitterColor: paletteItem.color,
    };
    setStickers((prev) => [...prev, newSticker]);
  };

  const removeSticker = (id: string) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
  };

  const clearAllStickers = () => {
    setStickers([]);
  };

  const copyGlitterHtml = () => {
    const snippet = `<span style="font-family:'Comic Sans MS';color:${
      textColorTheme === 'pink' ? '#ff1493' : '#00b4d8'
    };filter:drop-shadow(0 0 5px #fff) drop-shadow(0 0 10px #ff69b4);font-weight:bold;">★~*~ ${customGlitterText} ~*~★</span>`;
    navigator.clipboard?.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="bg-gradient-to-r from-pink-100/90 via-sky-100/90 to-pink-100/90 p-4 sm:p-6 rounded-2xl border-4 border-pink-400 shadow-[0_0_20px_rgba(255,20,147,0.3)]">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-dashed border-pink-300 gap-2">
        <div className="flex items-center gap-2.5">
          <span className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white shadow-xs">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
          </span>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-comic text-pink-600 tracking-wide flex items-center gap-2">
              <span>Blingee Glitter Graphics & Sticker Stamping Studio</span>
              <span className="text-cyan-600 text-xs font-pixel px-2 py-0.5 bg-cyan-100 rounded-full border border-cyan-300">
                Dollz & Sparkle Maker
              </span>
            </h2>
            <p className="text-xs text-slate-600 font-comic">
              Decorate your 2005 profile with authentic Hello Kitty plushies, Mickey Mouse ears & glitter text!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => addStickerRandomly()}
            className="px-3 py-1.5 bg-pink-500 hover:bg-pink-600 text-white font-pixel font-bold rounded-lg bevel-button text-xs flex items-center gap-1.5 shadow-sm"
          >
            <Stamp className="w-3.5 h-3.5" />
            Stamp Sticker ({stickers.length})
          </button>
          {stickers.length > 0 && (
            <button
              onClick={clearAllStickers}
              className="p-1.5 bg-white hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-lg border border-slate-300 bevel-button"
              title="Clear all stickers"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <GlitterDivider variant="stars" className="my-4" />

      {/* Interactive Stamp & Blingee Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Side: Interactive Canvas */}
        <div className="lg:col-span-8">
          <div
            onClick={() => addStickerRandomly()}
            className="relative w-full h-80 sm:h-96 rounded-xl border-4 border-dashed border-pink-400 bg-gradient-to-b from-[#fff0f6] to-[#e6f7ff] shadow-inner overflow-hidden cursor-crosshair group"
            title="Click anywhere to stamp current glitter sticker!"
          >
            {/* Watermark / Guidance */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none text-center p-4">
              <div className="text-5xl opacity-40 animate-pulse mb-2">✨ 🎀 ✨</div>
              <p className="font-comic text-pink-400 text-sm font-bold">
                [ Click anywhere on this board to stamp '{selectedPaletteItem.label}' ]
              </p>
              <p className="font-pixel text-[11px] text-cyan-500">
                (Authentic 2005 Blingee Glitter Particle Physics)
              </p>
            </div>

            {/* Displaying Stamped Stickers */}
            {stickers.map((s) => (
              <div
                key={s.id}
                onClick={(e) => {
                  e.stopPropagation();
                  removeSticker(s.id);
                }}
                className="absolute transition-transform duration-200 select-none cursor-pointer hover:scale-125"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  transform: `translate(-50%, -50%) rotate(${s.rotation}deg) scale(${s.scale})`,
                  filter: `drop-shadow(0 0 6px ${s.glitterColor}) drop-shadow(0 0 10px #ffffff)`,
                }}
                title="Click sticker to remove"
              >
                <div className="relative group/sticker flex flex-col items-center">
                  <span className="text-4xl animate-glitter">{s.emoji}</span>
                  <span className="opacity-0 group-hover/sticker:opacity-100 transition text-[9px] font-pixel text-pink-700 bg-white/90 px-1 rounded shadow-xs">
                    ✕
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Palette Selector Bar */}
          <div className="mt-3 p-2.5 bg-white/80 rounded-xl border border-pink-200 shadow-sm">
            <span className="text-xs font-pixel font-bold text-pink-600 block mb-1.5">
              Choose Glitter Sticker to Stamp:
            </span>
            <div className="flex flex-wrap gap-2">
              {STICKER_PALETTE.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPaletteItem(item)}
                  className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 transition active:scale-95 ${
                    selectedPaletteItem.label === item.label
                      ? 'bg-pink-500 text-white border-pink-600 shadow-sm font-bold'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-pink-300'
                  }`}
                >
                  <span className="text-lg">{item.emoji}</span>
                  <span className="text-xs font-comic">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: 2005 Glitter Text Generator */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-4 rounded-xl border-2 border-pink-300 shadow-sm">
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-pink-100">
              <Wand2 className="w-4 h-4 text-pink-500" />
              <h3 className="font-bold font-comic text-sm text-pink-600">
                Glitter Text Generator (Piczo / MySpace)
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-pixel text-slate-600 block mb-1">
                  Enter Your Nickname / Text:
                </label>
                <input
                  type="text"
                  value={customGlitterText}
                  onChange={(e) => setCustomGlitterText(e.target.value)}
                  className="w-full px-3 py-1.5 bg-pink-50/50 border border-pink-300 rounded-lg text-xs font-comic text-pink-900 focus:outline-pink-500 font-bold"
                  placeholder="e.g. xXx_Barking_Queen_xXx"
                />
              </div>

              <div>
                <span className="text-xs font-pixel text-slate-600 block mb-1">
                  Glitter Color Scheme:
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTextColorTheme('pink')}
                    className={`flex-1 py-1 px-2 rounded-md text-xs font-pixel font-bold border transition ${
                      textColorTheme === 'pink'
                        ? 'bg-pink-500 text-white border-pink-600 shadow-sm'
                        : 'bg-pink-50 text-pink-700 border-pink-200'
                    }`}
                  >
                    Hot Pink Glitter
                  </button>
                  <button
                    onClick={() => setTextColorTheme('blue')}
                    className={`flex-1 py-1 px-2 rounded-md text-xs font-pixel font-bold border transition ${
                      textColorTheme === 'blue'
                        ? 'bg-cyan-500 text-white border-cyan-600 shadow-sm'
                        : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                    }`}
                  >
                    Baby Blue Glitter
                  </button>
                </div>
              </div>

              {/* Live Glitter Preview */}
              <div className="p-3 bg-slate-900 rounded-xl border-2 border-cyan-400 text-center shadow-inner overflow-hidden">
                <span className="text-[10px] text-slate-400 font-pixel block mb-1">
                  ★ LIVE PREVIEW ★
                </span>
                <div
                  className={`text-sm sm:text-base font-comic font-bold animate-glitter tracking-wider py-1 ${
                    textColorTheme === 'pink'
                      ? 'text-pink-400 drop-shadow-[0_0_8px_#ff1493]'
                      : 'text-cyan-300 drop-shadow-[0_0_8px_#00e5ff]'
                  }`}
                >
                  ★~*~ {customGlitterText || 'Your Glitter Text'} ~*~★
                </div>
              </div>

              {/* Copy Code */}
              <button
                onClick={copyGlitterHtml}
                className="w-full py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:opacity-90 text-white font-pixel font-bold rounded-lg bevel-button text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                {copiedCode ? '✓ Copied to Clipboard!' : 'Copy Piczo HTML Code'}
              </button>
            </div>
          </div>

          {/* 2005 Nostalgia Fact Box */}
          <div className="p-3 bg-gradient-to-r from-yellow-50 to-pink-50 rounded-xl border border-yellow-200 text-xs font-comic text-slate-700">
            <span className="font-bold text-amber-800 block mb-1">
              ✨ 2005 Web Fact:
            </span>
            "In 2005, Piczo websites averaged 24 animated GIFs, 3 song embeds, and 12 glitter dividers per page. Having Hello Kitty and Mickey Mouse stickers meant your profile was elite tier."
          </div>
        </div>
      </div>
    </section>
  );
};
