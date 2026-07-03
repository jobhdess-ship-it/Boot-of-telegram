import { Landmark, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import type { UserState } from '../types';

interface WithdrawViewProps {
  userState: UserState;
  onWithdraw: (amount: number) => void;
}

type Method = 'cbe' | 'telebirr';

export function WithdrawView({ userState, onWithdraw }: WithdrawViewProps) {
  const [method, setMethod] = useState<Method>('cbe');
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleWithdraw = () => {
    setError('');
    setSuccess('');
    
    const numAmount = parseFloat(amount);
    
    if (!amount || isNaN(numAmount)) {
      setError('Please enter a valid amount.');
      return;
    }
    
    if (numAmount < 100) {
      setError('Minimum withdrawal amount is 100.00 ETB.');
      return;
    }
    
    if (numAmount > userState.balance) {
      setError('Insufficient balance.');
      return;
    }
    
    if (!account.trim()) {
      setError('Please enter your account details.');
      return;
    }

    // Process withdrawal
    onWithdraw(numAmount);
    setSuccess('Withdrawal successful!');
    setAmount('');
    setAccount('');
    
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      <div>
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Select Method</h3>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setMethod('cbe')}
            className={cn(
              "flex flex-col items-center justify-center p-5 rounded-3xl border transition-all relative overflow-hidden",
              method === 'cbe' 
                ? "bg-emerald-500/10 border-emerald-500/30" 
                : "bg-white/5 border-white/5 hover:bg-white/10"
            )}
          >
            {method === 'cbe' && <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 blur-xl rounded-full"></div>}
            <Landmark className={cn("w-6 h-6 mb-2 relative z-10", method === 'cbe' ? "text-emerald-400" : "text-slate-500")} />
            <span className={cn("text-sm font-medium mb-2 relative z-10", method === 'cbe' ? "text-emerald-50" : "text-slate-400")}>Cbe</span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full relative z-10">Active</span>
          </button>
          
          <button 
            onClick={() => setMethod('telebirr')}
            className={cn(
              "flex flex-col items-center justify-center p-5 rounded-3xl border transition-all relative overflow-hidden",
              method === 'telebirr' 
                ? "bg-emerald-500/10 border-emerald-500/30" 
                : "bg-white/5 border-white/5 hover:bg-white/10"
            )}
          >
            {method === 'telebirr' && <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 blur-xl rounded-full"></div>}
            <Smartphone className={cn("w-6 h-6 mb-2 relative z-10", method === 'telebirr' ? "text-emerald-400" : "text-slate-500")} />
            <span className={cn("text-sm font-medium mb-2 relative z-10", method === 'telebirr' ? "text-emerald-50" : "text-slate-400")}>Telebirr</span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full relative z-10">Active</span>
          </button>
        </div>
      </div>

      <div className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-5 mt-2">
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Withdrawal Amount (ETB)</label>
          <input 
            type="number" 
            placeholder="e.g. 150"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-600 outline-none focus:border-emerald-500/50 transition-colors"
          />
          <p className="text-[10px] text-emerald-500 mt-2 font-medium italic">* Minimum withdrawal amount is 100.00 ETB.</p>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
            {method === 'cbe' ? 'Cbe Account Number / Phone Number' : 'Telebirr Phone Number'}
          </label>
          <input 
            type="text" 
            placeholder="Enter your account or phone number det"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-600 outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>

        {error && <div className="text-red-400 text-sm font-medium">{error}</div>}
        {success && <div className="text-emerald-400 text-sm font-medium bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-center">{success}</div>}

        <button 
          onClick={handleWithdraw}
          className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 rounded-2xl py-4 flex items-center justify-center gap-2 font-bold transition-colors mt-2"
        >
          Confirm Withdrawal
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Withdrawal History</h3>
        <div className="bg-white/5 border border-white/5 rounded-3xl p-2 flex flex-col overflow-hidden">
          {(userState.transactions || []).filter(tx => tx.type === 'withdrawal').length > 0 ? (
            <div className="space-y-1">
              {(userState.transactions || []).filter(tx => tx.type === 'withdrawal').map(tx => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                      <span className="text-lg font-bold">↓</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tx.title}</p>
                      <p className="text-xs text-slate-500">
                        {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(tx.date))}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-400">
                      -{tx.amount.toFixed(2)} ETB
                    </p>
                    <p className="text-xs text-slate-400 capitalize">{tx.status === 'success' ? tx.subtitle : tx.status}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-slate-500 font-medium">
              No withdrawal history found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
