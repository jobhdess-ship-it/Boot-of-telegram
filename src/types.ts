export type Tab = 'home' | 'tasks' | 'invite' | 'withdraw' | 'profile';

export interface Task {
  id: string;
  title: string;
  reward: number;
  completed: boolean;
  url: string;
}

export interface Transaction {
  id: string;
  type: 'earning' | 'withdrawal' | 'referral';
  amount: number;
  title: string;
  subtitle: string;
  date: string;
  status: 'success' | 'pending' | 'failed';
}

export interface UserState {
  balance: number;
  tasksEarned: number;
  referralEarned: number;
  pendingOut: number;
  totalInvites: number;
  qualifiedInvites: number;
  transactions: Transaction[];
}
