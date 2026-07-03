import { Megaphone, Play } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Task } from '../types';
import { useState } from 'react';

interface TasksViewProps {
  tasks: Task[];
  onCompleteTask: (taskId: string) => void;
}

export function TasksView({ tasks, onCompleteTask }: TasksViewProps) {
  const [loadingTasks, setLoadingTasks] = useState<Record<string, boolean>>({});

  const handleTaskClick = (task: Task) => {
    if (task.completed || loadingTasks[task.id]) return;
    
    // Simulate loading/checking state
    setLoadingTasks(prev => ({ ...prev, [task.id]: true }));
    
    // Simulate opening telegram url and waiting
    window.open(task.url, '_blank', 'noopener,noreferrer');
    
    setTimeout(() => {
      onCompleteTask(task.id);
      setLoadingTasks(prev => ({ ...prev, [task.id]: false }));
    }, 2000);
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      <div>
        <h1 className="text-xl font-bold text-white mb-1">Available Tasks</h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Complete engagement tasks to earn Ethiopian Birr (ETB). Rewards are subject to admin review.
        </p>
      </div>

      <div className="space-y-3">
        {tasks.map(task => (
          <div key={task.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Megaphone className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Telegram Subscription</div>
                  <h3 className="font-bold text-white text-[15px] leading-snug">{task.title}</h3>
                </div>
              </div>
              <div className="flex flex-col items-end text-right shrink-0">
                <span className="font-bold text-emerald-400">+{task.reward}</span>
                <span className="font-bold text-slate-400 text-sm">ETB</span>
                <span className="text-[10px] text-slate-500 font-medium mt-1">
                  {task.completed ? '1/1' : '0/1'}<br/>actions
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-500 font-medium tracking-wide">
                {task.completed ? 'Completed' : 'Not started'}
              </span>
              <button 
                onClick={() => handleTaskClick(task)}
                disabled={task.completed || loadingTasks[task.id]}
                className={cn(
                  "flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all border",
                  task.completed 
                    ? "bg-white/5 border-transparent text-slate-500 cursor-not-allowed" 
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-emerald-400",
                  loadingTasks[task.id] && "opacity-70 cursor-wait"
                )}
              >
                {!task.completed && <Play className="w-4 h-4 fill-current" />}
                {task.completed ? 'Completed (1/1)' : loadingTasks[task.id] ? 'Verifying...' : 'Subscribe (1/1)'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
