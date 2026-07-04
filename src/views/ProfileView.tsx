import { useState } from 'react';
import { User, ShieldCheck, Wallet, CheckSquare, Edit2, Check, X } from 'lucide-react';
import type { UserState } from '../types';

interface ProfileViewProps {
  userState: UserState;
  onUpdateProfile: (updates: Partial<UserState>) => void;
}

export function ProfileView({ userState, onUpdateProfile }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userState.name || '');
  const [editUsername, setEditUsername] = useState(userState.username || '');

  const handleSave = () => {
    onUpdateProfile({ name: editName, username: editUsername });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(userState.name || '');
    setEditUsername(userState.username || '');
    setIsEditing(false);
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Profile Header Card */}
      <div className="bg-white/5 border border-white/5 rounded-3xl p-6 flex flex-col items-center text-center relative">
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        ) : null}

        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 mb-3">
          <User className="w-8 h-8 text-emerald-400" />
        </div>

        {isEditing ? (
          <div className="w-full space-y-3 mb-4">
            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-widest text-left mb-1 px-1">Display Name</label>
              <input 
                type="text" 
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="My Account"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-widest text-left mb-1 px-1">Username (Optional)</label>
              <input 
                type="text" 
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                placeholder="@username"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button 
                onClick={handleCancel}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
              <button 
                onClick={handleSave}
                className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" /> Save
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-white mb-1">{userState.name || 'My Account'}</h2>
            {userState.username && <div className="text-sm text-emerald-400 mb-1">{userState.username.startsWith('@') ? userState.username : `@${userState.username}`}</div>}
            <div className="text-sm text-slate-400 mb-1">+251 {userState.phone || '911 23 45 67'}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-medium mb-4">User ID: {Math.floor(1000000000 + Math.random() * 9000000000)}</div>
          </>
        )}
        
        <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4" />
          Verified User
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 border border-white/5 rounded-3xl p-5 flex flex-col items-start gap-3">
          <div className="bg-white/5 p-2 rounded-xl text-slate-300 border border-white/5">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Total Balance</div>
            <div className="text-lg font-bold text-white tracking-tight">{userState.balance.toFixed(2)} ETB</div>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/5 rounded-3xl p-5 flex flex-col items-start gap-3">
          <div className="bg-emerald-500/10 p-2 rounded-xl text-emerald-400 border border-emerald-500/20">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Tasks Reward</div>
            <div className="text-lg font-bold text-white tracking-tight">{userState.tasksEarned.toFixed(1)} ETB</div>
          </div>
        </div>
      </div>

      {/* Info List */}
      <div className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden mt-4">
        <div className="flex items-center justify-between p-5 border-b border-white/5 bg-white/[0.02]">
          <span className="text-sm font-medium text-slate-300">App Client Version</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white/5 border border-white/10 px-2 py-1 rounded-md">v1.0.0</span>
        </div>
        <div className="flex items-center justify-between p-5 border-b border-white/5 bg-white/[0.02]">
          <span className="text-sm font-medium text-slate-300">Payment Currency</span>
          <span className="text-xs font-bold text-white">ETB (Ethiopian Birr)</span>
        </div>
        <div className="flex items-center justify-between p-5 bg-white/[0.02]">
          <span className="text-sm font-medium text-slate-300">Network Tenant</span>
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">OBO-BIRR</span>
        </div>
      </div>

      {/* Full Transactions List */}
      <div className="bg-white/5 rounded-3xl border border-white/5 flex flex-col overflow-hidden mt-4">
        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <h3 className="font-medium text-sm">All Transactions</h3>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{(userState.transactions || []).length} Total</span>
        </div>
        <div className="flex-1 p-2 space-y-1">
          {(userState.transactions || []).map((tx) => (
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
            <div className="p-4 text-center text-sm text-slate-500">No transactions yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
