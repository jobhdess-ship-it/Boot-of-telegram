import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './views/HomeView';
import { TasksView } from './views/TasksView';
import { InviteView } from './views/InviteView';
import { WithdrawView } from './views/WithdrawView';
import { ProfileView } from './views/ProfileView';
import { SettingsModal, SupportModal } from './components/Modals';
import type { Tab, UserState, Task } from './types';

const INITIAL_USER: UserState = {
  balance: 10.0,
  tasksEarned: 0.0,
  referralEarned: 10.0,
  pendingOut: 0.0,
  totalInvites: 0,
  qualifiedInvites: 0,
  transactions: [
    {
      id: 'init-1',
      type: 'referral',
      amount: 10.0,
      title: 'Initial Bonus',
      subtitle: 'Welcome Bonus',
      date: new Date().toISOString(),
      status: 'success'
    }
  ]
};

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Join OBO Ethiopia Official Channel', reward: 5.0, completed: false, url: 'https://t.me/obobir' },
  { id: '2', title: 'Join OBO Birr Channel', reward: 5.0, completed: false, url: 'https://t.me/obobirr' },
  { id: '3', title: 'Join Our Sponsor Channel', reward: 5.0, completed: false, url: 'https://t.me/@Bekamiq' },
  { id: '4', title: 'Follow OBO on Twitter', reward: 5.0, completed: false, url: 'https://twitter.com/obomobile' },
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [userState, setUserState] = useState<UserState>(() => {
    const saved = localStorage.getItem('oboBirrUser');
    if (saved) {
      const parsed = JSON.parse(saved);
      const uniqueTransactions = [];
      const seenIds = new Set();
      for (const tx of (parsed.transactions || INITIAL_USER.transactions)) {
        if (!seenIds.has(tx.id)) {
          uniqueTransactions.push(tx);
          seenIds.add(tx.id);
        }
      }
      return { ...INITIAL_USER, ...parsed, transactions: uniqueTransactions };
    }
    return INITIAL_USER;
  });
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('oboBirrTasks');
    if (saved) {
      const parsed = JSON.parse(saved);
      return INITIAL_TASKS.map(task => {
        const existing = parsed.find((p: Task) => p.id === task.id);
        return existing ? { ...task, completed: existing.completed } : task;
      });
    }
    return INITIAL_TASKS;
  });

  useEffect(() => {
    localStorage.setItem('oboBirrUser', JSON.stringify(userState));
  }, [userState]);

  useEffect(() => {
    localStorage.setItem('oboBirrTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    
    setUserState(prev => {
      if (prev.lastLoginDate === today) return prev;
      
      return {
        ...prev,
        balance: prev.balance + 5.0,
        lastLoginDate: today,
        transactions: [
          {
            id: `daily-${today}-${crypto.randomUUID()}`,
            type: 'earning',
            amount: 5.0,
            title: 'Daily Login Reward',
            subtitle: 'Welcome Back Bonus',
            date: new Date().toISOString(),
            status: 'success'
          },
          ...(prev.transactions || [])
        ]
      };
    });
  }, []);

  const handleCompleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: true } : t));
    
    setUserState(prev => ({
      ...prev,
      balance: prev.balance + task.reward,
      tasksEarned: prev.tasksEarned + task.reward,
      transactions: [
        {
          id: crypto.randomUUID(),
          type: 'earning',
          amount: task.reward,
          title: task.title,
          subtitle: 'Task Reward',
          date: new Date().toISOString(),
          status: 'success'
        },
        ...prev.transactions
      ]
    }));
  };

  const handleWithdraw = (amount: number) => {
    if (amount <= userState.balance) {
      setUserState(prev => ({
        ...prev,
        balance: prev.balance - amount,
        pendingOut: prev.pendingOut + amount, // Record it as pending or out for UI
        transactions: [
          {
            id: crypto.randomUUID(),
            type: 'withdrawal',
            amount: amount,
            title: `Withdrawal #${Math.floor(1000 + Math.random() * 9000)}`,
            subtitle: 'Withdrawal Request',
            date: new Date().toISOString(),
            status: 'pending' // Or success
          },
          ...prev.transactions
        ]
      }));
    }
  };

  const handleUpdateProfile = (updates: Partial<UserState>) => {
    setUserState(prev => ({ ...prev, ...updates }));
  };

  const handleLogout = () => {
    setUserState(INITIAL_USER);
    localStorage.removeItem('oboBirrUser');
  };

  return (
    <div className="h-[100dvh] bg-[#050505] text-slate-100 flex justify-center font-sans overflow-hidden">
      <div className="w-full max-w-md bg-[#050505] relative h-full border-x border-white/5 flex flex-col">
        <TopBar 
          onLogout={handleLogout} 
          onSettings={() => setIsSettingsOpen(true)}
          onSupport={() => setIsSupportOpen(true)}
        />
        
        <main className="w-full flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 overflow-y-auto custom-scrollbar"
            >
              {currentTab === 'home' && <HomeView userState={userState} onChangeTab={setCurrentTab} />}
              {currentTab === 'tasks' && <TasksView tasks={tasks} onCompleteTask={handleCompleteTask} />}
              {currentTab === 'invite' && <InviteView userState={userState} />}
              {currentTab === 'withdraw' && <WithdrawView userState={userState} onWithdraw={handleWithdraw} />}
              {currentTab === 'profile' && <ProfileView userState={userState} onUpdateProfile={handleUpdateProfile} />}
            </motion.div>
          </AnimatePresence>
        </main>

        <BottomNav currentTab={currentTab} onChangeTab={setCurrentTab} />

        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
      </div>
    </div>
  );
}
