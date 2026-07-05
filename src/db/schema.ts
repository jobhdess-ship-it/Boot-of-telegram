import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, doublePrecision, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  phone: text('phone'),
  balance: doublePrecision('balance').notNull().default(10.0),
  tasksEarned: doublePrecision('tasks_earned').notNull().default(0.0),
  referralEarned: doublePrecision('referral_earned').notNull().default(10.0),
  pendingOut: doublePrecision('pending_out').notNull().default(0.0),
  totalInvites: integer('total_invites').notNull().default(0),
  qualifiedInvites: integer('qualified_invites').notNull().default(0),
  lastLoginDate: text('last_login_date'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  txId: text('tx_id').notNull(),
  type: text('type').notNull(),
  amount: doublePrecision('amount').notNull(),
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull(),
  date: text('date').notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const userTasks = pgTable('user_tasks', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  taskId: text('task_id').notNull(),
  completed: boolean('completed').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  transactions: many(transactions),
  userTasks: many(userTasks),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
}));

export const userTasksRelations = relations(userTasks, ({ one }) => ({
  user: one(users, {
    fields: [userTasks.userId],
    references: [users.id],
  }),
}));
