import React, { useState } from 'react';
import { Mail, Trash2, ArrowLeft, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

interface EmailItem {
  id: string;
  sender: string;
  subject: string;
  date: string;
  unread: boolean;
  body: string;
  fromAddress: string;
}

const INITIAL_EMAILS: EmailItem[] = [
  {
    id: '1',
    sender: 'Stacey Jenkins <stacey_xox_05@hotmail.com>',
    fromAddress: 'stacey_xox_05@hotmail.com',
    subject: 'FWD: FWD: SEND THIS TO 10 PPL OR BAD LUCK FOR 7 YEARS!!',
    date: '14 Oct 2005 12:44',
    unread: true,
    body: `OMG DO NOT DELETE THIS CHAIN MAIL!!
If you do not forward this email to 10 friends on MSN/Hotmail within the next 10 minutes, you will get a detention in double Vocational Studies and spill your Dairylea Nacho cheese down your blazer!

If you send it:
- Your crush will message you on MSN tonight asking "what r u up 2?"
- You will find a shiny £2 coin on the floor outside Barking Asda!
- You will get Distinction in BTEC Work Skills!

Love Stacey xoxox <3`,
  },
  {
    id: '2',
    sender: 'Piczo Notifications <noreply@piczo.com>',
    fromAddress: 'noreply@piczo.com',
    subject: 'New Glitter Shout on your Piczo Page!',
    date: '14 Oct 2005 11:20',
    unread: true,
    body: `Hi xX_Piczo_Glitter_Xx,

Daz_Asda_King has just signed your Piczo Guestbook!

"alright mate, proper sick glitter background you got here!! Are we getting the spicy wings from the hot counter today? save us a Dunker! cheers"

Click here to view your Hit Counter (+48,291 visits!) and customize your glitter dividers.

The Piczo Team (2005)`,
  },
  {
    id: '3',
    sender: 'Miss Robinson <e.robinson@barkingschool.lea.gov.uk>',
    fromAddress: 'e.robinson@barkingschool.lea.gov.uk',
    subject: 'BTEC Vocational Studies Unit 2 Assignment Folder Reminder',
    date: '13 Oct 2005 15:30',
    unread: false,
    body: `Dear Year 10 Vocational Group,

A reminder that all coursework portfolios for Unit 2 (Customer Service in Retail - Barking Asda Case Study) must be printed and bound into your clear plastic slide folders by 9:00am Monday.

Please do NOT leave it until the 5-minute bell to ask Brian in IT for printer ink or floppy disks.

Kind regards,
Miss Robinson
Room 204 Tutor`,
  },
  {
    id: '4',
    sender: 'Crazy Frog Official <fanclub@jamster.co.uk>',
    fromAddress: 'fanclub@jamster.co.uk',
    subject: 'Text FROG to 84888 for Real Polyphonic Ringtone!',
    date: '12 Oct 2005 09:12',
    unread: false,
    body: `BEM BEM! RING DING DING DING!

Get the UK Number 1 Official Ringtone on your Nokia 3310, Motorola Razr V3, or Sony Ericsson!
Only £3.00/week subscription. Free Axel F wallpaper included!`,
  },
];

export const HotmailInboxModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [emails, setEmails] = useState<EmailItem[]>(INITIAL_EMAILS);
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replySent, setReplySent] = useState(false);

  if (!isOpen) return null;

  const unreadCount = emails.filter((e) => e.unread).length;

  const handleOpenEmail = (email: EmailItem) => {
    setSelectedEmail(email);
    setEmails((prev) =>
      prev.map((e) => (e.id === email.id ? { ...e, unread: false } : e))
    );
  };

  const handleDelete = (id: string) => {
    setEmails((prev) => prev.filter((e) => e.id !== id));
    if (selectedEmail?.id === id) {
      setSelectedEmail(null);
    }
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    setReplySent(true);
    setTimeout(() => {
      setReplySent(false);
      setReplyText('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs">
      <div className="bg-slate-100 border-4 border-[#0078d7] rounded-xl max-w-2xl w-full shadow-[0_0_30px_rgba(0,120,215,0.6)] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Vintage MSN Hotmail Header */}
        <div className="bg-gradient-to-r from-[#003399] via-[#0055cc] to-[#0078d7] p-2.5 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-white/20 rounded">
              <Mail className="w-5 h-5 text-yellow-300" />
            </span>
            <div>
              <h3 className="font-bold font-comic text-sm tracking-wide flex items-center gap-2">
                <span>MSN Hotmail Webmail (2005 Edition)</span>
                {unreadCount > 0 && (
                  <span className="bg-amber-400 text-slate-900 font-pixel font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                    {unreadCount} New
                  </span>
                )}
              </h3>
              <p className="text-[10px] text-cyan-200 font-comic">
                Logged in as: xox_piczo_star2005@hotmail.co.uk (2MB of 250MB storage used)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded bg-red-600 hover:bg-red-500 text-white font-pixel font-bold flex items-center justify-center bevel-button text-xs"
          >
            ✕
          </button>
        </div>

        {/* Vintage Toolbar */}
        <div className="bg-slate-200 p-1.5 border-b border-slate-300 flex items-center justify-between text-xs font-pixel text-slate-700">
          <div className="flex items-center gap-2">
            {selectedEmail && (
              <button
                onClick={() => setSelectedEmail(null)}
                className="px-2 py-1 bg-white hover:bg-slate-100 rounded border border-slate-300 flex items-center gap-1 bevel-button text-[11px]"
              >
                <ArrowLeft className="w-3 h-3" />
                Back to Inbox
              </button>
            )}
            <span className="font-bold text-slate-800">
              {selectedEmail ? 'Reading Message' : `Inbox (${emails.length})`}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-comic text-slate-600">
            <span>Server: HOTMAIL-UK-04</span>
            <span className="text-emerald-700 font-bold">● Protected by McAfee 2005</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-3 font-comic text-xs bg-white">
          {!selectedEmail ? (
            /* Email List View */
            <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden">
              {emails.length === 0 ? (
                <div className="p-6 text-center text-slate-400">Your Hotmail inbox is empty!</div>
              ) : (
                emails.map((email) => (
                  <div
                    key={email.id}
                    onClick={() => handleOpenEmail(email)}
                    className={`p-2.5 flex items-center justify-between cursor-pointer transition hover:bg-blue-50 ${
                      email.unread ? 'bg-amber-50/60 font-bold' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-2">
                      <span className="text-base select-none">
                        {email.unread ? '✉️' : '📩'}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs text-slate-800 truncate">
                          {email.sender.split('<')[0]}
                        </div>
                        <div className="text-xs text-slate-600 truncate font-normal">
                          {email.subject}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[10px] text-slate-400 font-counter">
                        {email.date.split(' ')[0]} {email.date.split(' ')[1]}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(email.id);
                        }}
                        className="p-1 hover:text-red-600 text-slate-400 rounded"
                        title="Delete email"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Detailed Email View */
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <h4 className="font-bold text-sm text-slate-900 leading-snug">
                    {selectedEmail.subject}
                  </h4>
                  <button
                    onClick={() => handleDelete(selectedEmail.id)}
                    className="p-1 text-slate-400 hover:text-red-600 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-slate-600 space-y-0.5">
                  <div>
                    <strong className="text-slate-800">From:</strong> {selectedEmail.sender}
                  </div>
                  <div>
                    <strong className="text-slate-800">Date:</strong> {selectedEmail.date}
                  </div>
                </div>
              </div>

              {/* Message Body */}
              <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed whitespace-pre-line text-slate-800 font-comic">
                {selectedEmail.body}
              </div>

              {/* Quick Reply Form */}
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg">
                <div className="text-[11px] font-bold font-pixel text-blue-900 mb-1.5 flex items-center justify-between">
                  <span>Quick Reply to {selectedEmail.fromAddress}:</span>
                  {replySent && (
                    <span className="text-emerald-700 flex items-center gap-1 font-comic text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Message Sent via Hotmail!
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type reply... (e.g. yeah meet me at Barking Asda hot counter!)"
                    className="flex-1 px-3 py-1.5 bg-white border border-blue-300 rounded-lg text-xs font-comic focus:outline-blue-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendReply();
                    }}
                  />
                  <button
                    onClick={handleSendReply}
                    className="px-3 py-1.5 bg-[#0078d7] hover:bg-[#0055cc] text-white font-pixel font-bold rounded-lg bevel-button text-xs flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-2 bg-slate-200 border-t border-slate-300 flex items-center justify-between text-[11px] font-comic text-slate-600">
          <span>Microsoft MSN Hotmail © 2005</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-white hover:bg-slate-100 rounded border border-slate-300 bevel-button text-xs font-pixel font-bold text-slate-700"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
