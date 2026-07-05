import React, { useState, useEffect } from 'react';
import { ShieldCheck, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { auth } from '../lib/firebase';
import { signInWithCustomToken } from 'firebase/auth';

interface LoginViewProps {
  onLogin: (token: string) => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isTelegramWebApp, setIsTelegramWebApp] = useState(false);

  useEffect(() => {
    // Check if we are inside a Telegram Web App
    const twa = (window as any).Telegram?.WebApp;
    if (twa && twa.initData) {
      setIsTelegramWebApp(true);
      handleTelegramLogin(twa.initData);
    }
  }, []);

  const handleTelegramLogin = async (initData: string) => {
    try {
      setIsLoading(true);
      setError('');
      
      const res = await fetch('/api/auth/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ initData })
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to authenticate with Telegram');
      }

      // We have the Firebase custom token
      const userCredential = await signInWithCustomToken(auth, data.customToken);
      const token = await userCredential.user.getIdToken();
      onLogin(token);
    } catch (err: any) {
      console.error("Telegram Login Error:", err);
      setError(err.message || 'Failed to sign in');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center px-6 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-sm h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-xs mx-auto flex flex-col">
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <Send className="w-8 h-8 text-[#050505]" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">OBO Birr</h1>
          <p className="text-sm text-slate-400">Sign in with Telegram</p>
        </div>

        {error && <div className="mb-4 text-red-500 text-sm text-center font-medium bg-red-500/10 py-3 rounded-xl border border-red-500/20">{error}</div>}

        {isTelegramWebApp ? (
          <div className="text-center py-4 bg-white/5 rounded-2xl border border-white/10">
            {isLoading ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                <span className="text-sm text-slate-400">Authenticating via Telegram...</span>
              </div>
            ) : (
              <span className="text-emerald-500 font-medium">Ready</span>
            )}
          </div>
        ) : (
          <div className="bg-[#1c1c1e] border border-white/5 p-6 rounded-2xl text-center flex flex-col items-center gap-4">
            <Send className="w-10 h-10 text-[#2AABEE]" />
            <div>
              <h3 className="font-bold text-white mb-1">Open in Telegram</h3>
              <p className="text-sm text-slate-400">Please open this app inside Telegram using our official bot to securely log in and start earning.</p>
            </div>
            <a 
              href="https://t.me/obobirr_bot" 
              target="_blank" 
              rel="noreferrer"
              className="mt-2 bg-[#2AABEE] hover:bg-[#229ED9] text-white font-bold rounded-xl py-3 px-6 w-full transition-colors flex items-center justify-center gap-2"
            >
              Open Bot
            </a>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-500/70" />
          <span>Secured by Telegram</span>
        </div>
      </motion.div>
    </div>
  );
}
