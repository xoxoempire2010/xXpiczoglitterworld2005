import React, { useState } from 'react';
import { Sparkles, Heart, MessageSquare, ArrowUp, ArrowDown } from 'lucide-react';
import { GlitterDivider } from './GlitterDivider.tsx';

export interface Friend {
  id: number;
  name: string;
  handle: string;
  role: string;
  avatarBg: string;
  icon: string;
  accessory: 'kitty' | 'mickey' | 'star' | 'lips' | 'cd';
  status: string;
  relationship: string;
  msnStatus: 'online' | 'busy' | 'brb' | 'offline';
}

const INITIAL_FRIENDS: Friend[] = [
  {
    id: 1,
    name: 'Tom (MySpace)',
    handle: 'tom_myspace',
    role: 'Your First Friend',
    avatarBg: 'bg-slate-200 text-slate-800',
    icon: '🧑‍💻',
    accessory: 'kitty',
    status: 'Tom is wondering if you want to hang out in 2005.',
    relationship: 'Default Creator & Tech Legend',
    msnStatus: 'online',
  },
  {
    id: 2,
    name: 'Darren',
    handle: 'daz_btec_king',
    role: 'Vocational King',
    avatarBg: 'bg-blue-200 text-blue-900',
    icon: '🧢',
    accessory: 'mickey',
    status: 'Barking Asda hot counter spicy wings > school lunch everyday',
    relationship: 'Desk partner in Room 204',
    msnStatus: 'online',
  },
  {
    id: 3,
    name: 'Stacey xox',
    handle: 'xX_Pink_Princess_Xx',
    role: 'Lipgloss Specialist',
    avatarBg: 'bg-pink-200 text-pink-900',
    icon: '💖',
    accessory: 'kitty',
    status: 'Listening to Cascada on repeat... love u guys! xx',
    relationship: 'Best friend since Year 7',
    msnStatus: 'online',
  },
  {
    id: 4,
    name: 'Callum',
    handle: 'callum_grime_beats',
    role: 'Fruity Loops Producer',
    avatarBg: 'bg-purple-200 text-purple-900',
    icon: '🎧',
    accessory: 'cd',
    status: 'Rendering 140bpm 8-bar grime beat in IT class',
    relationship: 'Infrared MP3 sender',
    msnStatus: 'busy',
  },
  {
    id: 5,
    name: 'Charlene',
    handle: 'charlene_babygirl',
    role: 'Butterfly Clip Icon',
    avatarBg: 'bg-sky-200 text-sky-900',
    icon: '🦋',
    accessory: 'kitty',
    status: 'Borrowing Staceys strawberry Lip Smackers 4ever',
    relationship: 'Locker neighbour',
    msnStatus: 'brb',
  },
  {
    id: 6,
    name: 'Wayne',
    handle: 'wayne_bmx_barking',
    role: 'BMX Wheelie Pro',
    avatarBg: 'bg-emerald-200 text-emerald-900',
    icon: '🚲',
    accessory: 'star',
    status: 'Jumped the 4-stair outside Barking Abbey today',
    relationship: 'Bike shed lookout',
    msnStatus: 'online',
  },
  {
    id: 7,
    name: 'Kevin (Asda)',
    handle: 'kev_smartprice_rep',
    role: 'Barking Asda Staff',
    avatarBg: 'bg-amber-200 text-amber-900',
    icon: '🛒',
    accessory: 'mickey',
    status: 'Reduced bakery items at 4:30pm sharp, tell the squad',
    relationship: 'Donut plug & tuck shop supplier',
    msnStatus: 'offline',
  },
  {
    id: 8,
    name: 'Miss Robinson',
    handle: 'room204_tutor',
    role: 'Vocational Tutor',
    avatarBg: 'bg-rose-200 text-rose-900',
    icon: '👩‍🏫',
    accessory: 'star',
    status: 'Please remember to hand in your BTEC Unit 3 portfolio!',
    relationship: 'Room 204 Form Tutor',
    msnStatus: 'busy',
  },
];

export const MySpaceTop8: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>(INITIAL_FRIENDS);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [quickComment, setQuickComment] = useState('');
  const [commentsLog, setCommentsLog] = useState<Record<number, string[]>>({
    2: ['Darren says: lend us 50p for a Panda Pop mate!'],
    3: ['Stacey says: ur Piczo background is well glittery babe <3'],
  });

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newArr = [...friends];
    const temp = newArr[index - 1];
    newArr[index - 1] = newArr[index];
    newArr[index] = temp;
    setFriends(newArr);
  };

  const moveDown = (index: number) => {
    if (index === friends.length - 1) return;
    const newArr = [...friends];
    const temp = newArr[index + 1];
    newArr[index + 1] = newArr[index];
    newArr[index] = temp;
    setFriends(newArr);
  };

  const handleAddComment = (friendId: number) => {
    if (!quickComment.trim()) return;
    setCommentsLog((prev) => ({
      ...prev,
      [friendId]: [...(prev[friendId] || []), quickComment.trim()],
    }));
    setQuickComment('');
  };

  return (
    <section className="bg-white/85 backdrop-blur-xs p-4 sm:p-6 rounded-2xl border-4 border-pink-400 shadow-[0_0_20px_rgba(255,20,147,0.3)]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-dashed border-pink-300 gap-2">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-lg text-white shadow-xs">
            <Heart className="w-5 h-5 fill-white animate-pulse" />
          </span>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-comic text-pink-600 tracking-wide flex items-center gap-2">
              <span>xX_MySpace Top 8 Besties_Xx</span>
              <span className="text-cyan-500 text-sm font-pixel font-normal hidden md:inline">
                (Ranked by Pure Loyalty)
              </span>
            </h2>
            <p className="text-xs text-slate-600 font-comic">
              Warning: Moving someone out of your Top 8 may cause playground drama in Vocational Room 204.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-pink-100 px-3 py-1.5 rounded-full border border-pink-300 text-xs font-pixel text-pink-700">
          <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" />
          <span>8 / 8 Active Friends</span>
        </div>
      </div>

      <GlitterDivider variant="hearts" className="my-4" />

      {/* Grid of Polaroid Friends */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {friends.map((friend, idx) => (
          <div
            key={friend.id}
            className="group relative bg-white p-2.5 pb-3 rounded shadow-md border border-slate-200 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_8px_20px_rgba(255,20,147,0.3)] hover:rotate-1"
            style={{
              transform: `rotate(${idx % 2 === 0 ? '-1.5deg' : '1.5deg'})`,
            }}
          >
            {/* Top Tape Strip */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-yellow-100/80 border border-yellow-200 shadow-xs rotate-[-2deg] pointer-events-none" />

            {/* Rank Badge */}
            <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-cyan-400 text-white font-pixel font-bold text-xs flex items-center justify-center shadow-md border-2 border-white z-10">
              #{idx + 1}
            </div>

            {/* Accessory Badge (Hello Kitty / Mickey Mouse Ears) */}
            <div className="absolute -top-2.5 -right-2.5 z-10">
              {friend.accessory === 'kitty' && (
                <span
                  title="Hello Kitty Sparkle Plushie"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md border border-pink-300 text-sm animate-bounce"
                >
                  🎀
                </span>
              )}
              {friend.accessory === 'mickey' && (
                <span
                  title="Mickey Mouse Ears Souvenir"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 shadow-md border border-cyan-300 text-sm text-yellow-300 animate-pulse"
                >
                  🐭
                </span>
              )}
              {friend.accessory === 'cd' && (
                <span
                  title="Mixtape CD-R"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-100 shadow-md border border-cyan-400 text-sm"
                >
                  💿
                </span>
              )}
              {friend.accessory === 'star' && (
                <span
                  title="Glitter Star of Room 204"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 shadow-md border border-yellow-400 text-sm animate-spin"
                >
                  ⭐
                </span>
              )}
              {friend.accessory === 'lips' && (
                <span
                  title="Sparkly Lipgloss Kiss"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 shadow-md border border-pink-400 text-sm"
                >
                  💋
                </span>
              )}
            </div>

            {/* Photo Box */}
            <div
              onClick={() => setSelectedFriend(friend)}
              className={`w-full aspect-square rounded cursor-pointer relative overflow-hidden flex flex-col items-center justify-center ${friend.avatarBg} border border-slate-300 shadow-inner group-hover:brightness-105 transition`}
            >
              <span className="text-4xl sm:text-5xl select-none filter drop-shadow">
                {friend.icon}
              </span>
              <div className="mt-1 text-[10px] font-pixel text-slate-700 bg-white/70 px-1.5 py-0.5 rounded-full">
                {friend.role}
              </div>

              {/* Online MSN Light */}
              <div
                className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white shadow-xs ${
                  friend.msnStatus === 'online'
                    ? 'bg-lime-400'
                    : friend.msnStatus === 'busy'
                    ? 'bg-red-500'
                    : friend.msnStatus === 'brb'
                    ? 'bg-amber-400'
                    : 'bg-gray-400'
                }`}
                title={`MSN Messenger: ${friend.msnStatus.toUpperCase()}`}
              />
            </div>

            {/* Handwritten Polaroid Label */}
            <div className="mt-2 text-center">
              <h3 className="text-base font-bold font-hand text-slate-800 leading-tight truncate">
                {friend.name}
              </h3>
              <p className="text-[11px] font-comic text-pink-600 truncate">
                @{friend.handle}
              </p>
            </div>

            {/* Quick Rank Re-order Controls */}
            <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
              <div className="flex gap-1">
                <button
                  onClick={() => moveUp(idx)}
                  disabled={idx === 0}
                  title="Promote Friend Rank"
                  className="p-1 rounded hover:bg-pink-100 text-pink-600 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button
                  onClick={() => moveDown(idx)}
                  disabled={idx === friends.length - 1}
                  title="Demote Friend Rank"
                  className="p-1 rounded hover:bg-cyan-100 text-cyan-600 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ArrowDown className="w-3 h-3" />
                </button>
              </div>

              <button
                onClick={() => setSelectedFriend(friend)}
                className="text-[10px] font-pixel font-bold text-pink-500 hover:text-pink-700 flex items-center gap-0.5"
              >
                <MessageSquare className="w-2.5 h-2.5" />
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Friend Modal / Profile View */}
      {selectedFriend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-gradient-to-b from-pink-50 to-cyan-50 border-4 border-pink-400 rounded-2xl max-w-md w-full p-5 shadow-[0_0_30px_rgba(255,20,147,0.5)] relative">
            <button
              onClick={() => setSelectedFriend(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-pixel font-bold bevel-button flex items-center justify-center text-sm"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl p-2 bg-white rounded-xl border-2 border-pink-300 shadow-sm">
                {selectedFriend.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold font-comic text-pink-600">
                  {selectedFriend.name}
                </h3>
                <p className="text-xs text-cyan-600 font-pixel font-bold">
                  {selectedFriend.relationship} · {selectedFriend.role}
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-600">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      selectedFriend.msnStatus === 'online'
                        ? 'bg-lime-400'
                        : selectedFriend.msnStatus === 'busy'
                        ? 'bg-red-500'
                        : 'bg-amber-400'
                    }`}
                  />
                  <span>MSN Status: {selectedFriend.msnStatus.toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-white/90 rounded-xl border border-pink-200 mb-3 shadow-inner">
              <span className="text-[10px] font-pixel text-pink-500 uppercase tracking-wider block mb-1">
                2005 MySpace Mood / Personal Statement:
              </span>
              <p className="text-sm font-comic text-slate-800 italic">
                "{selectedFriend.status}"
              </p>
            </div>

            {/* Polaroid Comments / Notes */}
            <div className="mb-3">
              <span className="text-xs font-pixel font-bold text-slate-700 mb-1 block">
                Polaroid Notes ({commentsLog[selectedFriend.id]?.length || 0}):
              </span>
              <div className="max-h-24 overflow-y-auto space-y-1 bg-white/60 p-2 rounded-lg border border-pink-100 text-xs font-comic text-slate-700">
                {(commentsLog[selectedFriend.id] || ['No shouts on this Polaroid yet!']).map(
                  (msg, mIdx) => (
                    <div key={mIdx} className="border-b border-pink-100 pb-1">
                      {msg}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Quick Comment Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={quickComment}
                onChange={(e) => setQuickComment(e.target.value)}
                placeholder="Leave a quick shout on their Polaroid..."
                className="flex-1 px-3 py-1.5 bg-white border border-pink-300 rounded-lg text-xs font-comic focus:outline-pink-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddComment(selectedFriend.id);
                }}
              />
              <button
                onClick={() => handleAddComment(selectedFriend.id)}
                className="px-3 py-1.5 bg-pink-500 hover:bg-pink-600 text-white font-pixel text-xs font-bold rounded-lg bevel-button"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
