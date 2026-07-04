import { Copy, Share2, Users, CheckSquare } from 'lucide-react';
import type { UserState } from '../types';
import { useState } from 'react';

interface InviteViewProps {
  userState: UserState;
}

export function InviteView({ userState }: InviteViewProps) {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://t.me/obobirr_bot?start=r7733281705";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent("Join OBO Birr and start earning today!")}`, '_blank');
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      <div>
        <h1 className="text-xl font-bold text-white mb-1">Refer & Earn</h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Get large rewards for bringing friends. Your referrals must complete the Initial Setup to qualify.
        </p>
      </div>

      <div className="bg-white/5 border border-white/5 rounded-3xl p-5 space-y-4">
        <div>
          <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-2">Your Referral Link</label>
          <div className="flex items-center gap-2 bg-black/20 rounded-xl p-1.5 border border-white/5">
            <input 
              type="text" 
              value={referralLink}
              readOnly
              className="bg-transparent border-none outline-none text-slate-300 text-sm px-3 flex-1 font-mono w-full"
            />
            <button 
              onClick={handleCopy}
              className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white px-3 py-2 rounded-lg text-xs font-bold transition-colors shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <button 
          onClick={handleShare}
          className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 rounded-xl py-3.5 flex items-center justify-center gap-2 font-bold text-sm transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Invite Friends via Telegram
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 border border-white/5 rounded-3xl p-4 flex flex-col items-center justify-center text-center py-6">
          <Users className="w-8 h-8 text-emerald-500/50 mb-3" />
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Total Invites</span>
          <span className="text-2xl font-bold text-white">{userState.totalInvites}</span>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-3xl p-4 flex flex-col items-center justify-center text-center py-6">
          <div className="bg-emerald-500/20 rounded-lg mb-3 p-1.5 border border-emerald-500/30">
            <CheckSquare className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Qualified Invites</span>
          <span className="text-2xl font-bold text-white">{userState.qualifiedInvites}</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Invite Milestones</h3>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px]">
            {userState.qualifiedInvites} Qualified
          </span>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[100px] text-slate-500 text-sm text-center">
          Invite more friends to unlock milestones.
        </div>
      </div>
    </div>
  );
}
