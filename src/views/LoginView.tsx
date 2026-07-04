import React, { useState } from 'react';
import { Smartphone, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginViewProps {
  onLogin: (phone: string) => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 9) {
      setIsLoading(true);
      setTimeout(() => {
        onLogin(phone);
        setIsLoading(false);
      }, 1500); // Fake delay for realism
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center px-6 bg-[#050505] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-sm h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-xs mx-auto flex flex-col">
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <span className="text-3xl font-black text-[#050505]">T</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome Back</h1>
          <p className="text-sm text-slate-400">Enter your mobile number to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">
              Mobile Number
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-slate-400 border-r border-white/10 pr-3 flex items-center h-5">
                <span className="font-semibold text-sm">+251</span>
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="911 23 45 67"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-20 pr-4 text-white font-medium focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-slate-600"
                maxLength={9}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={phone.length < 9 || isLoading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#050505] font-bold rounded-2xl py-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-[#050505]/20 border-t-[#050505] rounded-full animate-spin"></div>
            ) : (
              <>
                Continue securely
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-500/70" />
          <span>Your data is encrypted and secure</span>
        </div>
      </motion.div>
    </div>
  );
}
