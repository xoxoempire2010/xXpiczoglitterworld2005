import React, { useState, useEffect } from 'react';
import { MessageCircle, BellRing, Sparkles, X } from 'lucide-react';

interface MsnMessengerToastProps {
  isNudging: boolean;
  onTriggerNudge: () => void;
  onOpenHotmail: () => void;
}

export const MsnMessengerToast: React.FC<MsnMessengerToastProps> = ({
  isNudging,
  onTriggerNudge,
  onOpenHotmail,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(
    'xX_Stacey_Princess_Xx has just signed in (Listening to Cascada - Everytime We Touch)'
  );
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    // Show intermittent funny 2005 MSN sign-in alerts
    const alerts = [
      'Daz_Asda_King has changed status to: Busy (Eating Dairylea Nacho Dunkers)',
      'MC_Callum_Beats has sent you an MP3 via Bluetooth: "Dizzee_Barking_Grime.mp3"',
      'Wayne_BMX has just signed in: (H) Abbey skatepark after school',
      'Charlene_xox has sent you a Wink: Animated Dancing Piglet!',
    ];

    const timer = setInterval(() => {
      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
      setToastMessage(randomAlert);
    }, 28000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 transition-all duration-300 ${
        minimized ? 'translate-y-12 opacity-80' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="w-80 bg-gradient-to-b from-[#eaf2ff] via-[#d0e2ff] to-[#b8d5ff] border-2 border-[#0055cc] rounded-xl shadow-[0_4px_16px_rgba(0,85,204,0.4)] overflow-hidden font-comic text-xs">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#003399] to-[#0066cc] p-1.5 text-white flex items-center justify-between text-[11px] font-pixel">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-lime-400 border border-white flex items-center justify-center text-[8px] text-slate-900 font-bold">
              ●
            </span>
            <span className="font-bold">MSN Messenger 7.5</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setMinimized((prev) => !prev)}
              className="w-4 h-4 rounded bg-blue-800 hover:bg-blue-700 flex items-center justify-center text-[9px]"
              title={minimized ? 'Expand' : 'Minimize'}
            >
              _
            </button>
            <button
              onClick={() => setToastMessage(null)}
              className="w-4 h-4 rounded bg-red-600 hover:bg-red-500 flex items-center justify-center text-[9px]"
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        {toastMessage && !minimized && (
          <div className="p-2.5 bg-white/95 border-b border-blue-200">
            <div className="flex items-start gap-2">
              <span className="text-xl select-none">💬</span>
              <div className="flex-1">
                <div className="font-bold text-blue-900 text-xs">
                  MSN Alert:
                </div>
                <p className="text-[11px] text-slate-700 leading-snug mt-0.5">
                  {toastMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="p-1.5 bg-[#dbe8fc] flex items-center justify-between text-[10px] font-pixel">
          <button
            onClick={onTriggerNudge}
            className="px-2 py-0.5 bg-pink-500 hover:bg-pink-600 text-white rounded bevel-button font-bold flex items-center gap-1 active:scale-95"
            title="Shake screen with classic MSN nudge!"
          >
            <BellRing className="w-3 h-3 text-yellow-300 animate-bounce" />
            <span>Send Nudge!</span>
          </button>

          <button
            onClick={onOpenHotmail}
            className="px-2 py-0.5 bg-white hover:bg-slate-50 text-blue-900 border border-blue-300 rounded bevel-button font-bold flex items-center gap-1"
          >
            <span>✉️ Hotmail (2 New)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
