import { useState, useRef, useEffect } from 'react';
import { ChevronDown, MoreVertical, LogOut, Settings, HelpCircle, Bell } from 'lucide-react';

interface TopBarProps {
  onLogout?: () => void;
  onSettings?: () => void;
  onSupport?: () => void;
}

export function TopBar({ onLogout, onSettings, onSupport }: TopBarProps) {
  const [showNetworkMenu, setShowNetworkMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  
  const networkRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (networkRef.current && !networkRef.current.contains(event.target as Node)) {
        setShowNetworkMenu(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-[#0A0A0A] border-b border-white/5 sticky top-0 z-50">
      <div className="flex items-center gap-1">
        <div className="flex items-baseline font-bold text-2xl tracking-tight">
          <span className="text-white">OBO</span>
          <span className="text-emerald-500 italic ml-1">Birr</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative" ref={networkRef}>
          <button 
            onClick={() => setShowNetworkMenu(!showNetworkMenu)}
            className="flex items-center bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-medium gap-1.5 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
            Active
            <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
          </button>
          
          {showNetworkMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-[#111] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
              <div className="p-2 space-y-1 text-sm">
                <div className="px-3 py-2 text-xs text-slate-500 uppercase tracking-widest font-bold">Network Status</div>
                <button className="w-full text-left px-3 py-2 hover:bg-white/5 rounded-lg text-emerald-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                  Mainnet (Active)
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-white/5 rounded-lg text-slate-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
                  Testnet
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={moreRef}>
          <button 
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="text-slate-300 hover:text-white transition-colors p-1"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          
          {showMoreMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-[#111] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
              <div className="p-2 space-y-1 text-sm">
                <button 
                  onClick={() => {
                    setShowMoreMenu(false);
                    // placeholder for notifications
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-white/5 rounded-lg text-slate-300 flex items-center gap-2"
                >
                  <Bell className="w-4 h-4" /> Notifications
                </button>
                <button 
                  onClick={() => {
                    setShowMoreMenu(false);
                    onSettings?.();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-white/5 rounded-lg text-slate-300 flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" /> Settings
                </button>
                <button 
                  onClick={() => {
                    setShowMoreMenu(false);
                    onSupport?.();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-white/5 rounded-lg text-slate-300 flex items-center gap-2"
                >
                  <HelpCircle className="w-4 h-4" /> Support
                </button>
                <div className="h-px bg-white/5 my-1" />
                <button 
                  onClick={() => {
                    setShowMoreMenu(false);
                    onLogout?.();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-red-500/10 rounded-lg text-red-400 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
