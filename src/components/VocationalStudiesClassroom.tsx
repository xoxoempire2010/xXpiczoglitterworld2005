import React, { useState } from 'react';
import { Award, CheckSquare, Bell, Sparkles, BookOpen, Volume2 } from 'lucide-react';
import { GlitterDivider } from './GlitterDivider.tsx';

interface StudentAchievement {
  id: number;
  name: string;
  badge: string;
  reason: string;
  grade: string;
  sticker: string;
}

const ACHIEVEMENTS: StudentAchievement[] = [
  {
    id: 1,
    name: 'Darren Miller',
    badge: 'Star of the Week ⭐',
    reason: 'Exemplary till operation speed during Barking Asda mock assessment (42 items/min)!',
    grade: 'DISTINCTION*',
    sticker: '🌟 Gold Star',
  },
  {
    id: 2,
    name: 'Stacey Jenkins',
    badge: 'Customer Care Champion 💖',
    reason: 'Politely de-escalated customer seeking missing Dairylea Dunkers in Aisle 4.',
    grade: 'DISTINCTION',
    sticker: '🎀 Glitter Bow',
  },
  {
    id: 3,
    name: 'Callum Patel',
    badge: 'IT Stock Audit Hero 💻',
    reason: 'Created an Excel spreadsheet with 3D WordArt bar charts for inventory.',
    grade: 'MERIT',
    sticker: '💾 Floppy Disk',
  },
];

const TEACHER_QUOTES = [
  {
    speaker: 'Miss Robinson',
    quote: "Darren! Take your hood down and put your Motorola Razr in your bag. It's double Vocational!",
    sound: 'ding',
  },
  {
    speaker: 'Mr Henderson (Head of Year)',
    quote: "Whoever left the scissors with the zigzag scalloped blades by the laminator, return them now.",
    sound: 'buzzer',
  },
  {
    speaker: 'IT Support Brian',
    quote: "Do not save MP3 files to the school server 'S:\\STUDENTS' or your login will be suspended.",
    sound: 'warning',
  },
  {
    speaker: 'Darren',
    quote: "Miss, can we go Barking Asda 5 minutes early to beat the queue for the hot wings?",
    sound: 'bell',
  },
];

export const VocationalStudiesClassroom: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wall' | 'logbook' | 'soundboard'>('wall');
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);
  const [laminatedSparkle, setLaminatedSparkle] = useState(true);

  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch {
      // Audio fallback
    }
  };

  return (
    <section className="bg-[#fff9e6] p-4 sm:p-6 rounded-2xl border-4 border-[#ff6b35] shadow-[0_0_20px_rgba(255,107,53,0.3)] relative overflow-hidden">
      {/* Scalloped Sugar Paper Header */}
      <div className="bg-gradient-to-r from-[#ff6b35] via-[#ff9f1c] to-[#2ec4b6] p-3 rounded-xl border-2 border-white shadow-md text-white mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-white/20 rounded-lg text-2xl backdrop-blur-xs">
              🏫
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-comic text-white tracking-wide flex items-center gap-2 drop-shadow">
                <span>Room 204: Vocational Studies & Work Skills</span>
                <span className="text-yellow-200 text-xs font-pixel px-2 py-0.5 bg-black/30 rounded">
                  BTEC Year 10 (2005)
                </span>
              </h2>
              <p className="text-xs text-yellow-100 font-comic">
                Form Tutor: Miss Robinson · Barking & Dagenham Secondary Education
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-pixel">
            <Award className="w-4 h-4 text-yellow-300" />
            <span>100% Coursework Pass Rate</span>
          </div>
        </div>
      </div>

      {/* Tabs / Segmented Buttons */}
      <div className="flex flex-wrap items-center gap-2 mb-4 bg-white/80 p-1.5 rounded-lg border border-orange-200">
        <button
          onClick={() => setActiveTab('wall')}
          className={`px-3 py-1.5 rounded-md text-xs font-bold font-pixel transition-colors flex items-center gap-1.5 ${
            activeTab === 'wall'
              ? 'bg-[#ff6b35] text-white shadow-sm'
              : 'text-orange-950 hover:bg-orange-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Wall Display Board
        </button>

        <button
          onClick={() => setActiveTab('logbook')}
          className={`px-3 py-1.5 rounded-md text-xs font-bold font-pixel transition-colors flex items-center gap-1.5 ${
            activeTab === 'logbook'
              ? 'bg-[#2ec4b6] text-white shadow-sm'
              : 'text-teal-950 hover:bg-teal-100'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Work Experience Logbook
        </button>

        <button
          onClick={() => setActiveTab('soundboard')}
          className={`px-3 py-1.5 rounded-md text-xs font-bold font-pixel transition-colors flex items-center gap-1.5 ${
            activeTab === 'soundboard'
              ? 'bg-[#e71d36] text-white shadow-sm'
              : 'text-rose-950 hover:bg-rose-100'
          }`}
        >
          <Volume2 className="w-3.5 h-3.5" />
          Teacher Soundboard
        </button>

        <div className="ml-auto hidden sm:flex items-center gap-2 text-[11px] font-comic text-orange-800">
          <span>Laminator Status:</span>
          <span className="px-1.5 py-0.5 bg-lime-200 text-lime-800 font-bold rounded text-[10px]">
            HOT & READY
          </span>
        </div>
      </div>

      {/* TAB 1: WALL DISPLAY BOARD */}
      {activeTab === 'wall' && (
        <div className="space-y-4">
          {/* Top Banner with Real Photo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-3 rounded-xl border-2 border-orange-300 shadow-sm">
            <div className="md:col-span-1 rounded-lg overflow-hidden border border-slate-300 relative group">
              <img
                src="/src/assets/images/vocational_classroom_1790893090768.jpg"
                alt="2005 British Vocational Studies Classroom with colourful displays and plastic chairs"
                className="w-full h-48 md:h-full object-cover rounded"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs p-1.5 text-white text-[10px] font-pixel text-center">
                📷 Room 204 Wall Board (Oct 2005)
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col justify-between p-2">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xl">📌</span>
                  <h3 className="text-lg font-bold font-comic text-orange-900">
                    BTEC First Certificate in Retail & Applied Services
                  </h3>
                </div>
                <p className="text-xs text-slate-700 font-comic leading-relaxed mb-3">
                  Welcome to Room 204's Autumn display board! Remember to staple your evidence folders
                  with the plastic slide binders. No Tipp-Ex on official BTEC logsheets!
                </p>

                {/* Scalloped Sugar Paper Notice */}
                <div className="p-3 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg border-2 border-dashed border-amber-400 text-amber-900 text-xs font-comic relative">
                  <span className="font-bold text-amber-800 block mb-1">
                    📢 Classroom Notice from Miss Robinson:
                  </span>
                  "Barking Asda Work Placement inductions commence Thursday 9:00am.
                  Ensure you wear clean black school trousers and your lanyard at all times.
                  Packed lunches can be stored in the Room 204 fridge."
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs font-pixel text-orange-700 pt-2 border-t border-orange-100">
                <span>Display Bord: Sugar Paper (Sunny Yellow)</span>
                <button
                  onClick={() => setLaminatedSparkle((prev) => !prev)}
                  className="px-2 py-1 bg-amber-200 hover:bg-amber-300 rounded text-amber-900 font-bold text-[10px]"
                >
                  {laminatedSparkle ? '✨ Shiny Laminate ON' : 'Laminate OFF'}
                </button>
              </div>
            </div>
          </div>

          <GlitterDivider variant="diamonds" className="my-3" />

          {/* Student Star of the Week Cards */}
          <div>
            <h4 className="text-sm font-bold font-comic text-orange-950 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <span>🌟 Star Student Honours Roll (Laminated with Sticky-Tac)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ACHIEVEMENTS.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-3 bg-white rounded-xl border-2 border-orange-200 shadow-sm relative transition hover:shadow-md ${
                    laminatedSparkle ? 'shadow-[0_0_10px_rgba(255,215,0,0.3)]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold font-pixel text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                      {ach.badge}
                    </span>
                    <span className="text-[10px] font-pixel text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-bold">
                      {ach.grade}
                    </span>
                  </div>

                  <h5 className="font-bold font-comic text-base text-slate-900">
                    {ach.name}
                  </h5>
                  <p className="text-xs text-slate-600 font-comic mt-1 leading-snug">
                    {ach.reason}
                  </p>

                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-hand text-pink-600 font-bold">
                    <span>Reward: {ach.sticker}</span>
                    <span className="text-slate-400">Rm 204</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WORK EXPERIENCE LOGBOOK */}
      {activeTab === 'logbook' && (
        <div className="bg-white p-4 rounded-xl border-2 border-teal-300 shadow-sm">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-teal-100">
            <div>
              <h3 className="text-base font-bold font-comic text-teal-900">
                Official Student Logbook: Asda Barking Superstore
              </h3>
              <p className="text-xs text-teal-700 font-comic">
                Placement Location: Linton Road, Barking, Essex IG11 8HE
              </p>
            </div>
            <span className="text-xs font-pixel bg-teal-100 text-teal-800 px-2 py-1 rounded font-bold">
              October 2005
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-teal-50/70 rounded-lg border border-teal-200">
              <div className="flex items-center justify-between text-xs font-bold font-pixel text-teal-900 mb-1">
                <span>Unit 1: Aisle Front-Facing & Stock Replenishment</span>
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckSquare className="w-3.5 h-3.5" /> Complete
                </span>
              </div>
              <p className="text-xs text-slate-700 font-comic">
                Tasked with pulling forward all Smart Price baked beans and Dairylea Nachos Dunkers
                so labels face the customer. Supervisor Kevin noted "brilliant enthusiasm, finished 15 mins early".
              </p>
            </div>

            <div className="p-3 bg-teal-50/70 rounded-lg border border-teal-200">
              <div className="flex items-center justify-between text-xs font-bold font-pixel text-teal-900 mb-1">
                <span>Unit 2: Hot Food Counter Operations & Health Safety</span>
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckSquare className="w-3.5 h-3.5" /> Complete
                </span>
              </div>
              <p className="text-xs text-slate-700 font-comic">
                Observed the rotisserie hot chicken warmer. Ensured the spicy chicken wings were bagged in
                foil-lined greaseproof pouches and labelled with thermal expiry bar codes.
              </p>
            </div>

            <div className="p-3 bg-teal-50/70 rounded-lg border border-teal-200">
              <div className="flex items-center justify-between text-xs font-bold font-pixel text-teal-900 mb-1">
                <span>Unit 3: Customer Service & Return of Trolleys</span>
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckSquare className="w-3.5 h-3.5" /> Complete
                </span>
              </div>
              <p className="text-xs text-slate-700 font-comic">
                Assisted customers unlocking £1 coin trolleys by the main entrance. Guided customer
                to the refrigerated dairy chiller for Smart Price sausages & bacon.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TEACHER SOUNDBOARD */}
      {activeTab === 'soundboard' && (
        <div className="bg-white p-4 rounded-xl border-2 border-rose-300 shadow-sm">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-rose-100">
            <div>
              <h3 className="text-base font-bold font-comic text-rose-900">
                Room 204 Interactive Quote Soundboard
              </h3>
              <p className="text-xs text-rose-700 font-comic">
                Click any iconic 2005 classroom quote to trigger the retro school bell!
              </p>
            </div>
            <Bell className="w-5 h-5 text-rose-500 animate-bounce" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TEACHER_QUOTES.map((item, qIdx) => (
              <button
                key={qIdx}
                onClick={() => {
                  playChime();
                  setSelectedQuote(item.quote);
                }}
                className="p-3 text-left bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition duration-150 active:scale-95 group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold font-pixel text-rose-700">
                    🗣 {item.speaker}
                  </span>
                  <Volume2 className="w-3.5 h-3.5 text-rose-400 group-hover:text-rose-600" />
                </div>
                <p className="text-xs font-comic text-slate-800 italic">
                  "{item.quote}"
                </p>
              </button>
            ))}
          </div>

          {selectedQuote && (
            <div className="mt-3 p-2.5 bg-yellow-100 border border-yellow-300 rounded-lg text-xs font-comic text-amber-900 animate-fade-in flex items-center justify-between">
              <span>🔔 Teacher announcement echoing through Room 204 corridors...</span>
              <button
                onClick={() => setSelectedQuote(null)}
                className="text-[10px] font-bold text-amber-800 hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
