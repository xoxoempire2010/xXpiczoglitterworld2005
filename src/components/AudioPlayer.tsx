import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  notes: number[]; // frequencies in Hz
  durations: number[]; // durations in seconds
  bpm: number;
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: 'Everytime We Touch',
    artist: 'Cascada (2005)',
    bpm: 142,
    notes: [440, 440, 493.88, 523.25, 493.88, 440, 392, 440, 523.25, 587.33, 523.25, 493.88],
    durations: [0.3, 0.3, 0.3, 0.6, 0.3, 0.3, 0.6, 0.3, 0.3, 0.6, 0.3, 0.6],
  },
  {
    id: 2,
    title: 'Boten Anna (Basshunter)',
    artist: 'Basshunter (2005 Swedish Eurodance)',
    bpm: 140,
    notes: [261.63, 329.63, 392, 523.25, 392, 329.63, 261.63, 293.66, 349.23, 440, 587.33, 440],
    durations: [0.25, 0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.5, 0.5],
  },
  {
    id: 3,
    title: 'Fix Up Look Sharp (Grime Synth)',
    artist: 'Dizzee Rascal (East London / Barking)',
    bpm: 130,
    notes: [164.81, 164.81, 196.00, 220.00, 164.81, 164.81, 246.94, 220.00],
    durations: [0.2, 0.2, 0.4, 0.4, 0.2, 0.2, 0.4, 0.6],
  },
  {
    id: 4,
    title: 'Axel F (Crazy Frog)',
    artist: 'Crazy Frog (Summer 2005 UK #1)',
    bpm: 138,
    notes: [293.66, 349.23, 293.66, 293.66, 392.00, 293.66, 261.63, 293.66, 440.00, 293.66, 293.66, 523.25, 440.00, 349.23],
    durations: [0.35, 0.35, 0.2, 0.2, 0.35, 0.35, 0.35, 0.35, 0.35, 0.2, 0.2, 0.35, 0.35, 0.5],
  },
];

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [equalizerHeights, setEqualizerHeights] = useState<number[]>([40, 70, 20, 90, 60, 30, 85, 50]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const noteIndexRef = useRef<number>(0);

  const currentTrack = TRACKS[currentTrackIndex];

  const playSynthNote = (freq: number, duration: number) => {
    if (isMuted || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Sawtooth/square for that authentic 2005 polyphonic ringtone / Eurodance lead
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Low pass filter for warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration * 0.95);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext handling
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }

    noteIndexRef.current = 0;
    const interval = 280;

    timerRef.current = window.setInterval(() => {
      const notes = currentTrack.notes;
      const durations = currentTrack.durations;
      const idx = noteIndexRef.current % notes.length;
      const freq = notes[idx];
      const dur = durations[idx] || 0.3;

      playSynthNote(freq, dur);

      // Randomize equalizer visualizer
      setEqualizerHeights(Array.from({ length: 8 }, () => Math.floor(Math.random() * 85) + 15));

      noteIndexRef.current++;
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentTrackIndex, isMuted]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-b from-[#1c2e4a] via-[#0d1b2a] to-[#050c14] border-2 border-cyan-400 p-2.5 rounded-xl shadow-[0_0_15px_rgba(0,229,255,0.4)] text-cyan-300 font-pixel">
      {/* Top Banner Windows Media Skin Title */}
      <div className="flex items-center justify-between px-2 py-1 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 rounded text-[11px] text-white font-bold tracking-wide shadow-xs mb-2">
        <div className="flex items-center gap-1.5">
          <Music className="w-3.5 h-3.5 animate-bounce" />
          <span>Piczo_Media_Player_v9.wma</span>
        </div>
        <span className="text-[10px] text-yellow-300 animate-pulse font-counter">128 kbps 44.1kHz</span>
      </div>

      {/* Screen Display */}
      <div className="bg-black/90 p-2 rounded-lg border border-cyan-500/50 mb-2 relative overflow-hidden">
        <div className="flex justify-between items-center mb-1">
          <div className="text-[11px] text-pink-400 font-bold truncate max-w-[200px]">
            {isPlaying ? '▶ NOW PLAYING:' : '⏸ PAUSED:'} {currentTrack.artist}
          </div>
          <span className="text-[10px] text-lime-400 font-counter">
            {isPlaying ? '01:42 / 03:54' : '00:00 / 03:54'}
          </span>
        </div>

        {/* Marquee Track Title */}
        <div className="overflow-hidden whitespace-nowrap bg-[#001122] px-2 py-1 rounded text-cyan-200 text-xs border border-cyan-900 mb-2">
          <span className={isPlaying ? 'animate-marquee-infinite inline-block' : 'inline-block'}>
            ♫ {currentTrack.title} — {currentTrack.artist} ♫ *** Rip from Limewire / Kazaa 2005 ***
          </span>
        </div>

        {/* Equalizer Bars */}
        <div className="flex items-end justify-center gap-1.5 h-10 px-2 bg-gradient-to-t from-cyan-950/40 to-transparent rounded">
          {equalizerHeights.map((h, i) => (
            <div
              key={i}
              className="w-3 rounded-t transition-all duration-150"
              style={{
                height: isPlaying ? `${h}%` : '15%',
                background: `linear-gradient(to top, #00ffff 0%, #ff1493 70%, #ffff00 100%)`,
                boxShadow: isPlaying ? '0 0 6px #00e5ff' : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="px-3 py-1.5 bg-gradient-to-b from-pink-500 to-pink-700 hover:from-pink-400 hover:to-pink-600 text-white font-bold rounded-md bevel-button text-xs flex items-center gap-1 active:scale-95"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? 'Stop' : 'Play'}
          </button>

          <button
            onClick={nextTrack}
            className="px-2.5 py-1.5 bg-gradient-to-b from-cyan-600 to-cyan-800 hover:from-cyan-500 hover:to-cyan-700 text-white rounded-md bevel-button text-xs flex items-center gap-1 active:scale-95"
          >
            <SkipForward className="w-3 h-3" />
            Next
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted((prev) => !prev)}
            className="p-1.5 text-cyan-300 hover:text-white bevel-button bg-gray-800 rounded text-xs"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-pink-400" /> : <Volume2 className="w-3.5 h-3.5 text-lime-400" />}
          </button>

          <span className="text-[10px] text-pink-300 font-comic italic hidden sm:inline">
            ♪ 2005 School Disco Vibes ♪
          </span>
        </div>
      </div>
    </div>
  );
};
