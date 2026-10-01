import React, { useState } from 'react';
import { ShoppingBag, Utensils, Sparkles, Check, Flame } from 'lucide-react';
import { GlitterDivider } from './GlitterDivider.tsx';

interface LunchItem {
  id: string;
  name: string;
  tagline: string;
  price: string;
  badge: string;
  emoji: string;
  description: string;
  nostalgiaRating: string;
}

const ITEMS: LunchItem[] = [
  {
    id: 'dunkers',
    name: 'Dairylea Dunkers (Nachos Cheese)',
    tagline: 'The Holy Grail of UK Secondary School Desks',
    price: '£0.58',
    badge: '100% Iconic',
    emoji: '🧀',
    description: 'Crispy lightly salted corn tortilla rounds with that dangerously smooth, thick, neon-yellow processed cheese dipping pot.',
    nostalgiaRating: '10/10 Legendary',
  },
  {
    id: 'wings',
    name: 'Hot & Spicy Chicken Wings (Hot Counter)',
    tagline: 'Straight from Barking Asda Rotisserie Warmer',
    price: '£1.20 (6 pack)',
    badge: 'Extra Crispy',
    emoji: '🍗',
    description: 'Steaming hot, peppery cayenne crunch served in a foil-lined striped paper bag that turned translucent with pure flavour.',
    nostalgiaRating: '10/10 Top Tier',
  },
  {
    id: 'smartprice',
    name: 'Smart Price Sausages & Bacon Roll',
    tagline: 'Asda White & Green Value Essential',
    price: '£0.79',
    badge: 'Student Budget',
    emoji: '🥓',
    description: 'The legendary Asda Smart Price range that fueled millions of UK BTEC students on £2 pocket money.',
    nostalgiaRating: '9/10 Budget King',
  },
  {
    id: 'pandapop',
    name: 'Blue Panda Pop (Raspberry Fizz)',
    tagline: 'Guaranteed Electric Blue Tongue',
    price: '£0.20',
    badge: 'E-Number Rush',
    emoji: '🥤',
    description: 'Sweet, fizzy, and fluorescent blue. The ultimate beverage companion after sprint-walking back to Room 204 before the 1:15pm bell.',
    nostalgiaRating: '10/10 Core Memory',
  },
];

export const BarkingAsdaHaul: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<LunchItem>(ITEMS[0]);
  const [dunkCount, setDunkCount] = useState(0);
  const [isDunking, setIsDunking] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleDunk = () => {
    setIsDunking(true);
    setDunkCount((prev) => prev + 1);

    // Audio crunch
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch {
      // Audio fallback
    }

    setTimeout(() => setIsDunking(false), 400);
  };

  return (
    <section className="bg-gradient-to-br from-[#e0f7fa] via-[#fff0f5] to-[#ffe4e1] p-4 sm:p-6 rounded-2xl border-4 border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.4)]">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-dashed border-cyan-300 gap-2">
        <div className="flex items-center gap-2.5">
          <span className="p-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-white shadow-xs">
            <ShoppingBag className="w-5 h-5 text-white" />
          </span>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-comic text-emerald-800 tracking-wide flex items-center gap-2">
              <span>Barking Asda Superstore: The 2005 Lunch Run</span>
              <span className="text-pink-600 text-xs font-pixel font-bold px-2 py-0.5 bg-pink-100 rounded-full border border-pink-300">
                Linton Road IG11
              </span>
            </h2>
            <p className="text-xs text-slate-600 font-comic">
              The sacred 12:45pm sprint past the roundabout to secure hot spicy wings & Nachos Dunkers!
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowReceipt((prev) => !prev)}
          className="self-start sm:self-auto px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 rounded-lg border-2 border-slate-300 bevel-button text-xs font-pixel font-bold flex items-center gap-1.5 shadow-sm"
        >
          <span>🧾</span>
          <span>{showReceipt ? 'Hide 2005 Receipt' : 'View Asda Till Receipt'}</span>
        </button>
      </div>

      <GlitterDivider variant="diamonds" className="my-4" />

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Side: Real Photo & Interactive Dunker Game */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-3 rounded-xl border-2 border-cyan-300 shadow-sm">
            <div className="relative rounded-lg overflow-hidden border border-slate-200 group">
              <img
                src="/src/assets/images/asda_lunch_haul_1790893101559.jpg"
                alt="2005 Barking Asda school lunch haul: Dairylea Dunkers Nachos Cheese, hot wings, Smart Price snacks"
                className="w-full h-52 object-cover rounded"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-pink-600/90 text-white text-[10px] font-pixel font-bold px-2 py-0.5 rounded-full shadow-xs">
                📸 Authentic 2005 Desk Spread
              </div>
            </div>

            {/* Interactive Dairylea Dunker Minigame */}
            <div className="mt-3 p-3 bg-amber-50 rounded-xl border-2 border-dashed border-amber-300 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold font-comic text-amber-900 mb-1">
                <span>🧀 Interactive Dairylea Nacho Dunking Station</span>
              </div>
              <p className="text-[11px] text-amber-800 font-comic mb-2">
                Click to dunk the crispy tortilla round into the thick melted nacho cheese pot!
              </p>

              <div className="flex items-center justify-center gap-4 py-2">
                {/* Cheese Pot */}
                <div className="relative w-16 h-12 bg-yellow-400 rounded-b-xl border-2 border-amber-500 shadow-inner flex items-center justify-center">
                  <div className="w-12 h-4 bg-yellow-300 rounded-full border border-amber-400 -mt-6 shadow-sm flex items-center justify-center">
                    <span className="text-[9px] font-pixel font-bold text-amber-800">CHEESE</span>
                  </div>
                </div>

                {/* Tortilla Chip */}
                <div
                  className={`w-10 h-10 transition-transform duration-300 select-none cursor-pointer ${
                    isDunking ? 'translate-y-3 -translate-x-5 rotate-12 scale-110' : 'hover:scale-105'
                  }`}
                  onClick={handleDunk}
                >
                  <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[32px] border-b-amber-300 filter drop-shadow relative">
                    {dunkCount > 0 && (
                      <div className="absolute -bottom-1 -left-2.5 w-5 h-3 bg-yellow-400 rounded-full border border-amber-500" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-amber-200 text-xs font-pixel text-amber-900">
                <span>Total Dunks: <strong>{dunkCount}</strong></span>
                <button
                  onClick={handleDunk}
                  className="px-3 py-1 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-amber-950 font-bold rounded-md bevel-button text-xs"
                >
                  Dunk Chip!
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Haul Items Cards & Details */}
        <div className="lg:col-span-7 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                  selectedItem.id === item.id
                    ? 'bg-white border-pink-500 shadow-[0_0_12px_rgba(255,20,147,0.3)] scale-[1.01]'
                    : 'bg-white/80 border-cyan-200 hover:bg-white hover:border-cyan-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-xs font-pixel font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
                    {item.price}
                  </span>
                </div>
                <h4 className="font-bold font-comic text-sm text-slate-800 leading-snug">
                  {item.name}
                </h4>
                <p className="text-[11px] font-comic text-slate-500 mt-1 line-clamp-2">
                  {item.tagline}
                </p>
              </div>
            ))}
          </div>

          {/* Active Item Deep Dive Card */}
          <div className="bg-white p-4 rounded-xl border-2 border-pink-300 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-100/50 rounded-bl-full -z-0" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedItem.emoji}</span>
                  <div>
                    <h3 className="text-base font-bold font-comic text-pink-700">
                      {selectedItem.name}
                    </h3>
                    <span className="text-xs font-pixel text-cyan-600">
                      Barking Asda Price: {selectedItem.price} · {selectedItem.badge}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-pixel bg-lime-100 text-lime-800 px-2 py-1 rounded font-bold">
                  {selectedItem.nostalgiaRating}
                </span>
              </div>

              <p className="text-xs font-comic text-slate-700 leading-relaxed bg-pink-50/50 p-2.5 rounded-lg border border-pink-100 mb-3">
                {selectedItem.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-comic text-slate-600">
                <div className="flex items-center gap-1.5 text-pink-600 font-bold">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  <span>Vocational Studies Classroom Snack Rating: 100%</span>
                </div>
                <span className="font-pixel text-[11px] text-slate-400">
                  Purchased with shiny £2 coin
                </span>
              </div>
            </div>
          </div>

          {/* Optional Receipt Modal / Card */}
          {showReceipt && (
            <div className="bg-[#fefefe] p-4 rounded-xl border-2 border-dashed border-slate-400 shadow-inner font-counter text-xs text-slate-800">
              <div className="text-center pb-2 border-b border-dashed border-slate-400 mb-2">
                <div className="text-sm font-bold tracking-widest">*** ASDA STORES LTD ***</div>
                <div className="text-[11px]">SUPERSTORE BARKING (BRANCH #0412)</div>
                <div className="text-[11px]">LINTON ROAD, BARKING, ESSEX IG11 8HE</div>
                <div className="text-[11px] text-slate-500">VAT NO: GB 362 0127 92</div>
                <div className="text-[11px]">DATE: 14/10/2005  TIME: 13:04:18</div>
              </div>

              <div className="space-y-1 py-1 border-b border-dashed border-slate-400 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span>DAIRYLEA DUNKERS NACHOS</span>
                  <span>£0.58</span>
                </div>
                <div className="flex justify-between">
                  <span>HOT SPICY WINGS 6PK</span>
                  <span>£1.20</span>
                </div>
                <div className="flex justify-between">
                  <span>SMART PRICE SAUSAGE ROLL</span>
                  <span>£0.42</span>
                </div>
                <div className="flex justify-between">
                  <span>SMART PRICE SMOKED BACON</span>
                  <span>£0.64</span>
                </div>
                <div className="flex justify-between">
                  <span>PANDA POPS BLUE RASPBERRY</span>
                  <span>£0.20</span>
                </div>
                <div className="flex justify-between">
                  <span>SPACE RAIDERS PICKLED ONION</span>
                  <span>£0.10</span>
                </div>
                <div className="flex justify-between">
                  <span>CADBURY FREDDO CHOCOLATE</span>
                  <span>£0.10</span>
                </div>
              </div>

              <div className="pt-2 font-mono text-xs font-bold space-y-0.5">
                <div className="flex justify-between text-sm">
                  <span>TOTAL TO PAY:</span>
                  <span>£3.24</span>
                </div>
                <div className="flex justify-between text-slate-600 font-normal">
                  <span>CASH TENDERED:</span>
                  <span>£5.00</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>CHANGE DUE:</span>
                  <span>£1.76</span>
                </div>
              </div>

              <div className="text-center text-[10px] mt-2 pt-2 border-t border-dashed border-slate-300 text-slate-500 font-comic">
                ★ THANK YOU FOR SHOPPING AT BARKING ASDA ★<br />
                Save Money. Live Better. 2005 Student Discount Applied.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
