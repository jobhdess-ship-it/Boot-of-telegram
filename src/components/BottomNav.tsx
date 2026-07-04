import { Home, CheckSquare, Users, Wallet, User } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import type { Tab } from '../types';

interface BottomNavProps {
  currentTab: Tab;
  onChangeTab: (tab: Tab) => void;
}

export function BottomNav({ currentTab, onChangeTab }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
    { id: 'invite', icon: Users, label: 'Invite' },
    { id: 'withdraw', icon: Wallet, label: 'Withdraw' },
    { id: 'profile', icon: User, label: 'Profile' },
  ] as const;

  return (
    <div className="bg-[#0A0A0A] border-t border-white/5 pb-safe z-50 shrink-0">
      <div className="flex items-center justify-around py-3 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={cn(
                "relative flex flex-col items-center justify-center w-16 gap-1 transition-colors",
                isActive ? "text-emerald-400" : "text-slate-500 hover:text-slate-400"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute inset-0 bg-emerald-500/10 rounded-2xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className={cn(
                "text-[10px] font-medium",
                isActive && "font-bold"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
