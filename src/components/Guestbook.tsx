import React, { useState } from 'react';
import { MessageSquarePlus, Sparkles, Send, Heart, Clock } from 'lucide-react';
import { GlitterDivider } from './GlitterDivider.tsx';

interface GuestbookEntry {
  id: string;
  author: string;
  badge: string;
  date: string;
  content: string;
  theme: 'pink' | 'blue' | 'yellow';
}

const INITIAL_ENTRIES: GuestbookEntry[] = [
  {
    id: '1',
    author: 'xX_Charlene_xX',
    badge: '🎀 Hello Kitty Crew',
    date: '14 Oct 2005, 13:22',
    content: 'heyyy babe! ur Piczo layout is proper mint!! Love the hot pink glitter background & the Top 8 Polaroids! Save me a seat next to the radiator in Vocational Studies later xx',
    theme: 'pink',
  },
  {
    id: '2',
    author: 'Darren (BTEC Daz)',
    badge: '🧀 Dunkers Squad',
    date: '14 Oct 2005, 12:58',
    content: 'mate the Barking Asda run was intense today, sprinted round the Linton Road corner just in time to get the last bag of spicy wings! Smart price sausages in the locker if anyone wants one lol',
    theme: 'blue',
  },
  {
    id: '3',
    author: 'Wayne_Sk8er',
    badge: '🐭 Mickey Ears Icon',
    date: '13 Oct 2005, 16:45',
    content: 'thx for the add on MySpace and Piczo! Ur page is well sparkling. Did anyone get the notes for Unit 2 coursework from Miss Robinson? Left my folder on the 62 bus :(',
    theme: 'yellow',
  },
  {
    id: '4',
    author: 'Stacey_xox',
    badge: '💋 Lipgloss Bestie',
    date: '13 Oct 2005, 10:14',
    content: 'UR SITE IS SICKKKK!! That Cascada tune in the music player is my absolute favourite. We need to go Asda after school to get the blue Panda Pops! luv ya babez 4eva xxxxx',
    theme: 'pink',
  },
];

export const Guestbook: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>(INITIAL_ENTRIES);
  const [authorName, setAuthorName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedBadge, setSelectedBadge] = useState('🎀 Hello Kitty Crew');

  const BADGES = [
    '🎀 Hello Kitty Crew',
    '🐭 Mickey Ears Icon',
    '🧀 Dunkers Squad',
    '💋 Lipgloss Bestie',
    '⭐ BTEC Star of Room 204',
    '🍗 Asda Wings Fanclub',
  ];

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      author: authorName.trim(),
      badge: selectedBadge,
      date: 'Just now (14 Oct 2005)',
      content: message.trim(),
      theme: selectedBadge.includes('Hello Kitty') || selectedBadge.includes('Lipgloss') ? 'pink' : selectedBadge.includes('Dunkers') || selectedBadge.includes('Mickey') ? 'blue' : 'yellow',
    };

    setEntries([newEntry, ...entries]);
    setAuthorName('');
    setMessage('');
  };

  return (
    <section className="bg-white/90 backdrop-blur-xs p-4 sm:p-6 rounded-2xl border-4 border-pink-400 shadow-[0_0_20px_rgba(255,20,147,0.3)]">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-dashed border-pink-300 gap-2">
        <div className="flex items-center gap-2.5">
          <span className="p-2 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-lg text-white shadow-xs">
            <MessageSquarePlus className="w-5 h-5 text-white" />
          </span>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-comic text-pink-600 tracking-wide flex items-center gap-2">
              <span>xX_Piczo Official Guestbook & Tagboard_Xx</span>
              <span className="text-cyan-600 text-xs font-pixel px-2 py-0.5 bg-cyan-100 rounded-full border border-cyan-300">
                {entries.length} Shouts
              </span>
            </h2>
            <p className="text-xs text-slate-600 font-comic">
              Leave a glitter shout, say hi, or arrange the next Asda lunch run!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-pixel text-pink-600 bg-pink-100 px-3 py-1 rounded-full border border-pink-200">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>No Spam / Pure 2005 Love</span>
        </div>
      </div>

      <GlitterDivider variant="hearts" className="my-4" />

      {/* Grid: Form on Left, Shouts on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Form to Sign */}
        <div className="lg:col-span-5 bg-gradient-to-b from-pink-50 to-cyan-50 p-4 rounded-xl border-2 border-pink-300 shadow-sm">
          <h3 className="font-bold font-comic text-sm text-pink-700 mb-2 flex items-center gap-1.5">
            <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
            <span>Sign the Piczo Guestbook</span>
          </h3>

          <form onSubmit={handlePostComment} className="space-y-3">
            <div>
              <label className="text-xs font-pixel text-slate-600 block mb-1">
                Your 2005 Nickname:
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. xX_Barking_Princess_05_Xx"
                className="w-full px-3 py-1.5 bg-white border border-pink-300 rounded-lg text-xs font-comic focus:outline-pink-500"
              />
            </div>

            <div>
              <label className="text-xs font-pixel text-slate-600 block mb-1">
                Select Your Glitter Badge:
              </label>
              <select
                value={selectedBadge}
                onChange={(e) => setSelectedBadge(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-pink-300 rounded-lg text-xs font-comic text-slate-800 focus:outline-pink-500"
              >
                {BADGES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-pixel text-slate-600 block mb-1">
                Your Shout / Message:
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your shout... (e.g. thx 4 the add! Ur site is proper sickkk! Save me a dunker in Room 204 xx)"
                className="w-full px-3 py-1.5 bg-white border border-pink-300 rounded-lg text-xs font-comic focus:outline-pink-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:opacity-95 text-white font-pixel font-bold rounded-lg bevel-button text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              Post Glitter Shout!
            </button>
          </form>
        </div>

        {/* Existing Shouts List */}
        <div className="lg:col-span-7 space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`p-3.5 rounded-xl border-2 transition hover:shadow-md ${
                entry.theme === 'pink'
                  ? 'bg-pink-50/80 border-pink-300'
                  : entry.theme === 'blue'
                  ? 'bg-cyan-50/80 border-cyan-300'
                  : 'bg-yellow-50/80 border-yellow-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold font-comic text-sm text-slate-900">
                    {entry.author}
                  </span>
                  <span className="text-[10px] font-pixel px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 shadow-xs">
                    {entry.badge}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-counter">
                  <Clock className="w-3 h-3" />
                  <span>{entry.date}</span>
                </div>
              </div>

              <p className="text-xs font-comic text-slate-700 leading-relaxed bg-white/70 p-2 rounded-lg border border-slate-100">
                "{entry.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
