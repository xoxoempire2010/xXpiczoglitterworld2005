import React, { useState, useEffect, useRef } from 'react';
import { Send, Users, Smile, Volume2, Sparkles, MessageCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: string;
  color: string;
  text: string;
  time: string;
  isSelf?: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    sender: 'xX_Stacey_Princess_Xx',
    color: '#ff1493',
    text: 'heyy everyone! who has the blue glitter pen for Vocational Studies Room 204? (L)',
    time: '13:12',
  },
  {
    id: '2',
    sender: 'Daz_Asda_King',
    color: '#0077b6',
    text: 'fresh hot spicy wings from Asda just secured! 6 for £1.20, buzzinggg',
    time: '13:13',
  },
  {
    id: '3',
    sender: 'MC_Callum_Beats',
    color: '#7209b7',
    text: 'anyone want this new Dizzee Rascal instrumentals via Bluetooth? Turn ur phones on',
    time: '13:14',
  },
  {
    id: '4',
    sender: 'Wayne_BMX',
    color: '#38b000',
    text: 'did Miss Robinson set homework for Unit 2? cba reading the booklet lol',
    time: '13:15',
  },
  {
    id: '5',
    sender: 'Charlene_xox',
    color: '#f72585',
    text: 'Stacey did u see the new Cascada video on The Box channel?? proper tune (H)',
    time: '13:16',
  },
];

const BOT_REPLIES = [
  'omg lol so true! (L) u going Barking Asda after school?',
  'haha proper jokes! Daz is eating Nachos Dunkers in the back row again xD',
  'add me on MSN messenger: xox_barking_babe_05@hotmail.com ;) brb mum needs phone line',
  'ur Piczo website is well glittering!! Love the Hello Kitty sticker! (K)',
  'whos got 20p for a blue Panda Pop from the tuck shop? pleaseee',
  'listening to Crazy Frog on my Sony Ericsson W800i walkman phone right now (H)',
];

export const YahooChatRoom: React.FC<{ onTriggerNudge?: () => void }> = ({ onTriggerNudge }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [activeUsers] = useState([
    { name: 'You (xX_Guest_Xx)', status: 'Active (H)', color: 'text-pink-600' },
    { name: 'xX_Stacey_Princess_Xx', status: 'Listening to Cascada', color: 'text-pink-500' },
    { name: 'Daz_Asda_King', status: 'Eating Dairylea Dunkers', color: 'text-blue-600' },
    { name: 'MC_Callum_Beats', status: 'Rendering FL Studio', color: 'text-purple-600' },
    { name: 'Wayne_BMX', status: 'Barking Abbey Jump', color: 'text-emerald-600' },
    { name: 'Charlene_xox', status: 'BRB putting lipgloss on', color: 'text-rose-500' },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputVal.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'You',
      color: '#ff007f',
      text: inputVal.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');

    // Trigger instant nostalgic reply from a friend
    setTimeout(() => {
      const randomSender = ['xX_Stacey_Princess_Xx', 'Daz_Asda_King', 'Charlene_xox', 'MC_Callum_Beats'][
        Math.floor(Math.random() * 4)
      ];
      const randomText = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: randomSender,
        color: randomSender.includes('Stacey') ? '#ff1493' : randomSender.includes('Daz') ? '#0077b6' : '#7209b7',
        text: randomText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 900);
  };

  const insertEmoticon = (emo: string) => {
    setInputVal((prev) => `${prev} ${emo}`.trim());
  };

  return (
    <div className="bg-gradient-to-b from-[#e8f4f8] to-[#fce4ec] rounded-2xl border-4 border-cyan-400 p-3 sm:p-5 shadow-[0_0_20px_rgba(0,229,255,0.3)]">
      {/* Classic Yahoo / MSN Window Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-[#593196] via-[#7b2cbf] to-[#0077b6] rounded-xl text-white shadow-sm mb-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-yellow-300 animate-pulse" />
          <div>
            <div className="font-bold font-comic text-sm tracking-wide flex items-center gap-1.5">
              <span>Yahoo! Chat Room: Barking & Dagenham Teens 2005</span>
              <span className="text-[10px] font-pixel bg-pink-500/80 px-1.5 py-0.5 rounded text-white">
                Vocational & Asda Crew
              </span>
            </div>
            <div className="text-[10px] text-cyan-200 font-comic">
              Topic: "Double Vocational in Room 204 & Asda lunch run hauls (L) ASL?"
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onTriggerNudge && (
            <button
              onClick={onTriggerNudge}
              className="px-2.5 py-1 bg-pink-500 hover:bg-pink-600 rounded text-[11px] font-bold font-pixel text-white bevel-button shadow-xs flex items-center gap-1"
            >
              <span>💥 Nudge!</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Messages Stream */}
        <div className="md:col-span-3 flex flex-col bg-white rounded-xl border-2 border-slate-300 shadow-inner h-72 sm:h-80 overflow-hidden">
          {/* Scrollable Chat Area */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs font-comic">
            <div className="p-1.5 bg-yellow-50 border border-yellow-200 rounded text-center text-[10px] text-amber-800 font-pixel">
              *** Welcome to Yahoo! Chat Room #412. Please be polite & keep swearing off the school network ***
            </div>

            {messages.map((m) => (
              <div
                key={m.id}
                className={`p-1.5 rounded transition ${
                  m.isSelf ? 'bg-pink-50/70 border-l-2 border-pink-500 pl-2' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[10px] text-slate-400 font-counter">[{m.time}]</span>
                  <span
                    className="font-bold text-xs"
                    style={{ color: m.color }}
                  >
                    {m.sender}:
                  </span>
                  <span className="text-slate-800 font-comic break-words">
                    {m.text}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Emoticon Bar */}
          <div className="bg-slate-100 px-3 py-1 border-t border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
              <span className="text-slate-500 font-pixel text-[10px]">Emoticons:</span>
              {['(L)', '(H)', '(K)', ';)', ':-P', 'xD', '★', 'brb'].map((emo) => (
                <button
                  key={emo}
                  onClick={() => insertEmoticon(emo)}
                  className="px-1.5 py-0.5 bg-white hover:bg-pink-100 border border-slate-300 rounded font-bold text-pink-600 transition active:scale-95"
                >
                  {emo}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-2 bg-slate-50 border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type message here... (e.g. who wants chicken wings from Asda?)"
              className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-comic focus:outline-pink-400"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
            />
            <button
              onClick={handleSend}
              className="px-4 py-1.5 bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 text-white font-pixel font-bold rounded-lg bevel-button text-xs flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              Send
            </button>
          </div>
        </div>

        {/* User List Sidebar */}
        <div className="md:col-span-1 bg-white rounded-xl border-2 border-slate-300 p-2.5 shadow-inner flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 pb-1.5 border-b border-slate-200 mb-2 text-xs font-pixel font-bold text-slate-700">
              <Users className="w-3.5 h-3.5 text-cyan-500" />
              <span>In This Room ({activeUsers.length})</span>
            </div>

            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {activeUsers.map((u, i) => (
                <div key={i} className="p-1 rounded hover:bg-slate-50 text-xs">
                  <div className={`font-bold font-comic truncate ${u.color}`}>
                    {u.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-comic italic truncate">
                    {u.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-200 text-center">
            <span className="text-[10px] font-pixel text-pink-600">
              ★ Yahoo! Web Voice 2.1 Ready ★
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
