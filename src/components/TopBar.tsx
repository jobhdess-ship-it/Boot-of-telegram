import { ChevronDown, MoreVertical } from 'lucide-react';

export function TopBar() {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-[#0A0A0A] border-b border-white/5 sticky top-0 z-50">
      <div className="flex items-center gap-1">
        <div className="flex items-baseline font-bold text-2xl tracking-tight">
          <span className="text-white">TECNO</span>
          <span className="text-emerald-500 italic ml-1">Birr</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium gap-1.5 border border-emerald-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
          Active
        </div>
        <button className="text-slate-300 hover:text-white transition-colors">
          <ChevronDown className="w-5 h-5" />
        </button>
        <button className="text-slate-300 hover:text-white transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
