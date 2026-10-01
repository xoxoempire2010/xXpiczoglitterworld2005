import React, { useState } from 'react';
import {
  Sparkles,
  Mail,
  Heart,
  Music,
  ShoppingBag,
  School,
  MessageCircle,
  Eye,
  Volume2,
  Wand2,
  Palette,
  ExternalLink,
} from 'lucide-react';
import { SparkleTrail } from './components/SparkleTrail.tsx';
import { GlitterDivider } from './components/GlitterDivider.tsx';
import { HitCounter } from './components/HitCounter.tsx';
import { AudioPlayer } from './components/AudioPlayer.tsx';
import { MySpaceTop8 } from './components/MySpaceTop8.tsx';
import { VocationalStudiesClassroom } from './components/VocationalStudiesClassroom.tsx';
import { BarkingAsdaHaul } from './components/BarkingAsdaHaul.tsx';
import { YahooChatRoom } from './components/YahooChatRoom.tsx';
import { BlingeeStampCanvas } from './components/BlingeeStampCanvas.tsx';
import { Guestbook } from './components/Guestbook.tsx';
import { HotmailInboxModal } from './components/HotmailInboxModal.tsx';
import { MsnMessengerToast } from './components/MsnMessengerToast.tsx';

export default function App() {
  const [themeMode, setThemeMode] = useState<'pink' | 'blue'>('pink');
  const [cursorSparklesActive, setCursorSparklesActive] = useState(true);
  const [isHotmailOpen, setIsHotmailOpen] = useState(false);
  const [isNudging, setIsNudging] = useState(false);

  // Trigger MSN Screen Shake Nudge
  const triggerNudge = () => {
    setIsNudging(true);

    // Audio buzz/nudge
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.setValueAtTime(120, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(160, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch {
      // Audio fallback
    }

    setTimeout(() => setIsNudging(false), 550);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 relative select-auto ${
        isNudging ? 'animate-nudge' : ''
      } ${themeMode === 'pink' ? 'bg-glitter-pink' : 'bg-glitter-blue'}`}
    >
      {/* Interactive Cursor Fairy Sparkle Trail */}
      <SparkleTrail active={cursorSparklesActive} />

      {/* Top Bar (3-Zone Top Bar Contract) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-4 border-pink-400 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-lg sm:text-xl font-bold font-comic text-pink-600 tracking-tight flex items-center gap-1.5 hover:opacity-90"
          >
            <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" />
            <span>xX_Piczo_Glitter_World_2005_Xx</span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-pixel font-bold text-slate-700">
            <a href="#top8" className="hover:text-pink-600 transition-colors">
              MySpace Top 8
            </a>
            <a href="#classroom" className="hover:text-pink-600 transition-colors">
              Vocational Room 204
            </a>
            <a href="#asda-haul" className="hover:text-pink-600 transition-colors">
              Barking Asda Run
            </a>
            <a href="#yahoo-chat" className="hover:text-pink-600 transition-colors">
              Yahoo! Chat
            </a>
            <a href="#blingee" className="hover:text-pink-600 transition-colors">
              Blingee Studio
            </a>
            <a href="#guestbook" className="hover:text-pink-600 transition-colors">
              Guestbook
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2">
            {/* Hotmail Envelope Action */}
            <button
              onClick={() => setIsHotmailOpen(true)}
              className="px-3 py-1.5 bg-[#0078d7] hover:bg-[#005bb5] text-white rounded-lg bevel-button text-xs font-pixel font-bold flex items-center gap-1.5 shadow-sm active:scale-95"
              title="Open Hotmail Webmail Inbox"
            >
              <Mail className="w-3.5 h-3.5 text-yellow-300" />
              <span className="hidden sm:inline">Hotmail</span>
              <span className="bg-amber-400 text-slate-900 rounded-full text-[9px] px-1.5 py-0.2 font-bold font-counter">
                2
              </span>
            </button>

            {/* Pink / Baby Blue Theme Switcher */}
            <button
              onClick={() => setThemeMode((prev) => (prev === 'pink' ? 'blue' : 'pink'))}
              className={`p-1.5 rounded-lg bevel-button border text-xs font-pixel font-bold transition flex items-center gap-1 ${
                themeMode === 'pink'
                  ? 'bg-pink-100 border-pink-300 text-pink-700'
                  : 'bg-cyan-100 border-cyan-300 text-cyan-800'
              }`}
              title="Switch between Hot Pink and Baby Blue glitter theme"
            >
              <Palette className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {themeMode === 'pink' ? 'Hot Pink' : 'Baby Blue'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Wrapper */}
      <main className="max-w-5xl mx-auto px-3 sm:px-6 py-6 space-y-8">
        {/* 2005 Nostalgic Running Marquee Ticker */}
        <div className="bg-black/90 p-2 rounded-xl border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.4)] overflow-hidden text-cyan-300 font-pixel text-xs flex items-center gap-2">
          <span className="px-2 py-0.5 bg-pink-600 text-white font-bold rounded text-[10px] shrink-0">
            ★ LATEST SHOUTS ★
          </span>
          <div className="overflow-hidden whitespace-nowrap flex-1">
            <span className="animate-marquee-infinite inline-block">
              ~*~ Welcome 2 Darren & Stacey's Official 2005 Piczo Website ~*~ Meet by Barking Asda
              bike sheds at 12:45pm sharp for Dairylea Dunkers & hot chicken wings ~*~ Miss Robinson
              says Vocational Studies coursework deadline is Monday ~*~ Add my MSN:
              xox_stacey_05@hotmail.co.uk ~*~ Free Hello Kitty & Mickey Mouse glitter stamps below! ~*~
            </span>
          </div>
        </div>

        {/* Hero Banner: 2005 Bedroom Nostalgia & Intro */}
        <section className="bg-white/90 backdrop-blur-xs p-5 sm:p-7 rounded-3xl border-4 border-pink-400 shadow-[0_0_30px_rgba(255,20,147,0.4)] relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Column: Dreamy Y2K Desk Photo */}
            <div className="md:col-span-5 relative group">
              <div className="rounded-2xl overflow-hidden border-4 border-cyan-300 shadow-lg transform -rotate-1 group-hover:rotate-0 transition duration-300">
                <img
                  src="/src/assets/images/y2k_piczo_nostalgia_1790893113364.jpg"
                  alt="2005 Cozy teen desk with CRT monitor, Hello Kitty plush doll, Mickey Mouse ears headband and glitter pens"
                  className="w-full h-64 sm:h-72 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Cute Floating Badges */}
              <div className="absolute -top-3 -left-3 bg-white p-2 rounded-2xl shadow-md border-2 border-pink-300 text-xs font-hand text-pink-600 font-bold flex items-center gap-1 animate-bounce">
                <span>🎀 Hello Kitty Plush</span>
              </div>
              <div className="absolute -bottom-3 -right-2 bg-slate-900 text-yellow-300 p-2 rounded-2xl shadow-md border-2 border-cyan-300 text-xs font-pixel font-bold flex items-center gap-1">
                <span>🐭 Mickey Ears</span>
              </div>
            </div>

            {/* Right Column: Profile Summary & Hit Counter */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-pixel font-bold text-pink-600 bg-pink-100 px-3 py-1 rounded-full border border-pink-300">
                  Established 14 October 2005
                </span>
                <span className="text-xs font-pixel font-bold text-cyan-700 bg-cyan-100 px-3 py-1 rounded-full border border-cyan-300">
                  Best Viewed in 1024x768
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold font-comic text-pink-600 leading-tight drop-shadow-xs">
                Welcome to our Dreamy 2005 Piczo Glitter World! ✨
              </h1>

              <p className="text-xs sm:text-sm text-slate-700 font-comic leading-relaxed">
                Step back into the golden age of dial-up internet, custom HTML profiles, and MSN
                Messenger nudges! We are two mates from <strong>Room 204 Vocational Studies</strong>{' '}
                in Barking, surviving on <strong>Dairylea Nachos Cheese Dunkers</strong>,{' '}
                <strong>Barking Asda spicy chicken wings</strong>, and 20p blue Panda Pops.
              </p>

              {/* Hit Counter & Music Player Row */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <HitCounter />

                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCursorSparklesActive((prev) => !prev)}
                      className="px-3 py-1.5 bg-pink-500 hover:bg-pink-600 text-white rounded-lg bevel-button text-xs font-pixel font-bold flex items-center gap-1.5 active:scale-95 shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{cursorSparklesActive ? 'Fairy Cursor: ON' : 'Fairy Cursor: OFF'}</span>
                    </button>

                    <button
                      onClick={triggerNudge}
                      className="px-3 py-1.5 bg-[#0078d7] hover:bg-[#005bb5] text-white rounded-lg bevel-button text-xs font-pixel font-bold flex items-center gap-1.5 active:scale-95 shadow-sm"
                    >
                      <span>💥 MSN Nudge</span>
                    </button>
                  </div>

                  <span className="text-[11px] font-comic text-slate-500 italic">
                    ♫ Turn on the 2005 Eurodance player below for pure vibes ♫
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Audio Player Component */}
        <section className="py-2">
          <AudioPlayer />
        </section>

        <GlitterDivider variant="rainbow" />

        {/* Section 1: MySpace Top 8 Friends with Polaroids */}
        <div id="top8">
          <MySpaceTop8 />
        </div>

        <GlitterDivider variant="hearts" />

        {/* Section 2: Vocational Studies Classroom Room 204 */}
        <div id="classroom">
          <VocationalStudiesClassroom />
        </div>

        <GlitterDivider variant="diamonds" />

        {/* Section 3: Barking Asda Tuck Shop & Lunch Run Haul */}
        <div id="asda-haul">
          <BarkingAsdaHaul />
        </div>

        <GlitterDivider variant="y2k" />

        {/* Section 4: Yahoo! Chat Room Simulator */}
        <div id="yahoo-chat">
          <YahooChatRoom onTriggerNudge={triggerNudge} />
        </div>

        <GlitterDivider variant="stars" />

        {/* Section 5: Blingee Glitter Sticker & Stamp Studio */}
        <div id="blingee">
          <BlingeeStampCanvas />
        </div>

        <GlitterDivider variant="hearts" />

        {/* Section 6: Official Piczo Guestbook & Shouts Wall */}
        <div id="guestbook">
          <Guestbook />
        </div>

        {/* Nostalgic 2005 Web Badges & Footer */}
        <footer className="bg-white/80 backdrop-blur-xs p-6 rounded-2xl border-4 border-cyan-400 text-center space-y-4 shadow-md font-comic text-xs">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-2.5 py-1 bg-black text-lime-400 font-pixel font-bold rounded border border-gray-600 shadow-xs">
              [ Best viewed with Microsoft Internet Explorer 6.0 ]
            </span>
            <span className="px-2.5 py-1 bg-pink-100 text-pink-700 font-pixel font-bold rounded border border-pink-300 shadow-xs">
              [ Made with Macromedia Flash & Hotmail ]
            </span>
            <span className="px-2.5 py-1 bg-cyan-100 text-cyan-800 font-pixel font-bold rounded border border-cyan-300 shadow-xs">
              [ 100% Genuine 2005 Piczo Glitter ]
            </span>
          </div>

          <p className="text-slate-600 max-w-xl mx-auto leading-relaxed">
            xX_Piczo_Glitter_World_2005_Xx · Dedicated to the students of Vocational Studies Room 204,
            the hot food counter staff at Barking Asda Superstore (Linton Road), and everyone who ever
            dunked a Nacho or sent an MSN nudge in 2005.
          </p>

          <div className="text-[11px] font-pixel text-slate-400">
            © 2005 Piczo Inc. / BTEC Work Skills / Barking & Dagenham Crew. All Rights Reserved.
          </div>
        </footer>
      </main>

      {/* Floating MSN Messenger Notification Toast */}
      <MsnMessengerToast
        isNudging={isNudging}
        onTriggerNudge={triggerNudge}
        onOpenHotmail={() => setIsHotmailOpen(true)}
      />

      {/* Vintage Hotmail Webmail Inbox Modal */}
      <HotmailInboxModal
        isOpen={isHotmailOpen}
        onClose={() => setIsHotmailOpen(false)}
      />
    </div>
  );
}
