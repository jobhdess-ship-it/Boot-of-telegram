import { Megaphone, PlayCircle, Share2, Users } from 'lucide-react';
import type { UserState, Tab } from '../types';

interface HomeViewProps {
  userState: UserState;
  onChangeTab: (tab: Tab) => void;
}

export function HomeView({ userState, onChangeTab }: HomeViewProps) {
  return (
    <div className="p-4 space-y-4 pb-6">
      {/* Balance Card */}
      <div className="bg-gradient-to-br from-emerald-600/10 to-transparent border border-emerald-500/20 rounded-3xl p-5 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full"></div>
        <h2 className="text-emerald-400/80 text-[10px] font-semibold tracking-widest mb-1 uppercase">Available Balance</h2>
        <div className="flex items-baseline gap-1 mb-6 relative z-10">
          <span className="text-5xl font-bold text-white tracking-tighter">{userState.balance.toFixed(2)}</span>
          <span className="text-xl font-light text-slate-400">ETB</span>
        </div>
        
        <div className="space-y-4 relative z-10">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Withdrawal Threshold</span>
            <span className="text-emerald-400 font-medium">{Math.min(100, (userState.balance / 100) * 100).toFixed(1)}% Completed</span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" style={{ width: `${Math.min(100, (userState.balance / 100) * 100)}%` }}></div>
          </div>
          <p className="text-[11px] text-slate-500 italic">Reach 100 ETB to unlock instant withdrawals.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
          <p className="text-[10px] uppercase text-slate-500 mb-1">Total Earned</p>
          <p className="text-xl font-semibold">{(userState.tasksEarned + userState.referralEarned).toFixed(2)} ETB</p>
        </div>
        <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
          <p className="text-[10px] uppercase text-slate-500 mb-1">Total Referrals</p>
          <p className="text-xl font-semibold">{userState.qualifiedInvites} Members</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white/5 rounded-3xl border border-white/5 flex flex-col overflow-hidden mt-4">
        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <h3 className="font-medium text-sm">Recent Transactions</h3>
          <button onClick={() => onChangeTab('profile')} className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest hover:underline">View All</button>
        </div>
        <div className="flex-1 p-2 space-y-1">
          {(userState.transactions || []).slice(0, 3).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                  tx.type === 'withdrawal' 
                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }`}>
                  <span className="text-lg font-bold">{tx.type === 'withdrawal' ? '↓' : '↑'}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{tx.title}</p>
                  <p className="text-xs text-slate-500">
                    {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(tx.date))}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${tx.type === 'withdrawal' ? 'text-emerald-400' : 'text-white'}`}>
                  {tx.type === 'withdrawal' ? '-' : '+'}{tx.amount.toFixed(2)} ETB
                </p>
                <p className="text-xs text-slate-400 capitalize">{tx.status === 'success' ? tx.subtitle : tx.status}</p>
              </div>
            </div>
          ))}
          {(!userState.transactions || userState.transactions.length === 0) && (
            <div className="p-4 text-center text-sm text-slate-500">No recent transactions</div>
          )}
        </div>
      </div>

      {/* Banner */}
      <div className="h-40 p-6 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 rounded-3xl border border-white/5 flex flex-col justify-center relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="text-xl font-bold mb-1">Boost Your Earnings</h4>
          <p className="text-xs text-slate-300 max-w-[200px] leading-relaxed">Invite friends and earn 10 ETB for every active user that joins through your link.</p>
          <button onClick={() => onChangeTab('invite')} className="mt-4 text-[10px] font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
            Get Referral Link
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="absolute -right-6 top-0 opacity-20 transform rotate-12 pointer-events-none">
          <Users className="w-48 h-48 text-white" />
        </div>
      </div>
    </div>
  );
}
