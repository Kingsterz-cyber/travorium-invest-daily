export type TaskStatus = "pending" | "in-progress" | "completed";

export type DailyTask = {
  // ad id
  id: number;
  title: string;
  desc: string;
  image: string;
  link: string;

  duration: number; // seconds
  progress: number; // 0-100
  earnings: number;
  maxEarnings: number;
  status: TaskStatus;
};


export type Withdrawal = {
  id: string;
  amount: number;
  fee: number;
  net: number;
  method: "MTN" | "AIRTEL";
  phone: string;
  status: "processing" | "completed" | "failed";
  reason?: string;
  requestedAt: string;
  completedAt?: string | null;
};

export type WalletState = {
  balance: number;
  bonusReceived: number;
  todayEarnings: number;
  totalEarned: number;
  // progress for the current day
  tasksCompleted: number;
  streak: number;

  // daily ad tracking
  dailyDayKey: string;
  completedTaskAdIds: number[];

  withdrawals: Withdrawal[];
  hasWithdrawnBefore: boolean;
};


const WALLET_KEY = "travorium_wallet";

export const MIN_WITHDRAW = 2000;
export const MAX_WITHDRAW_DAY = 10000;
export const WITHDRAW_FEE = 500;

export const DAILY_TASK_COUNT = 5;
export const TASK_EARNINGS_FRW = 500;
const MAX_DAILY_EARNINGS = DAILY_TASK_COUNT * TASK_EARNINGS_FRW;


function defaultWallet(): WalletState {
  return {
    balance: 2000,
    bonusReceived: 2000,
    todayEarnings: 0,
    totalEarned: 0,
    tasksCompleted: 0,
    streak: 0,

    dailyDayKey: "",
    completedTaskAdIds: [],

    withdrawals: [],
    hasWithdrawnBefore: false,
  };
}


export function getWallet(): WalletState {
  if (typeof window === "undefined") return defaultWallet();
  const raw = localStorage.getItem(WALLET_KEY);
  if (!raw) {
    const w = defaultWallet();
    localStorage.setItem(WALLET_KEY, JSON.stringify(w));
    return w;
  }
  try {
    return JSON.parse(raw) as WalletState;
  } catch {
    return defaultWallet();
  }
}

export function saveWallet(w: WalletState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(WALLET_KEY, JSON.stringify(w));
}

export function ensureDailyWallet(dayKey: string): WalletState {
  const w = getWallet();
  if (w.dailyDayKey === dayKey) return w;

  // New day reset daily tracking but keep lifetime + withdrawals.
  const next: WalletState = {
    ...w,
    dailyDayKey: dayKey,
    todayEarnings: 0,
    tasksCompleted: 0,
    completedTaskAdIds: [],
  };
  saveWallet(next);
  return next;
}

export function isTaskCompletedForDay(adId: number): boolean {
  const w = getWallet();
  return w.completedTaskAdIds.includes(adId);
}

export function completeTask(adId: number): WalletState {
  const w = getWallet();
  if (w.completedTaskAdIds.includes(adId)) return w;

  w.completedTaskAdIds = [adId, ...w.completedTaskAdIds];
  w.tasksCompleted += 1;

  const credit = TASK_EARNINGS_FRW;
  w.todayEarnings = Math.min(MAX_DAILY_EARNINGS, w.todayEarnings + credit);
  w.totalEarned += credit;
  w.balance += credit;

  saveWallet(w);
  return w;
}


export function requestWithdrawal(input: { amount: number; method: "MTN" | "AIRTEL"; phone: string }): Withdrawal {
  const w = getWallet();
  const fee = w.hasWithdrawnBefore ? WITHDRAW_FEE : 0;
  const id = `TRV-2026-${String(Math.floor(Math.random() * 99999)).padStart(5, "0")}`;
  const wd: Withdrawal = {
    id,
    amount: input.amount,
    fee,
    net: input.amount - fee,
    method: input.method,
    phone: input.phone,
    status: "processing",
    requestedAt: new Date().toISOString(),
  };
  w.balance = Math.max(0, w.balance - input.amount);
  w.hasWithdrawnBefore = true;
  w.withdrawals = [wd, ...w.withdrawals];
  saveWallet(w);
  if (typeof window !== "undefined") localStorage.setItem("travorium_last_withdrawal", JSON.stringify(wd));
  return wd;
}

export function getLastWithdrawal(): Withdrawal | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("travorium_last_withdrawal");
  return raw ? (JSON.parse(raw) as Withdrawal) : null;
}

export function frw(n: number) {
  return `${n.toLocaleString()} FRW`;
}
