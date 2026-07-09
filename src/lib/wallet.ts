export type TaskStatus = "pending" | "in-progress" | "completed";

export type DailyTask = {
  id: number;
  emoji: string;
  name: string;
  description: string;
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
  tasksCompleted: number;
  streak: number;
  tasks: DailyTask[];
  withdrawals: Withdrawal[];
  hasWithdrawnBefore: boolean;
};

const WALLET_KEY = "travorium_wallet";

export const MIN_WITHDRAW = 2000;
export const MAX_WITHDRAW_DAY = 10000;
export const WITHDRAW_FEE = 500;

const defaultTasks: DailyTask[] = [
  { id: 1, emoji: "📱", name: "Samsung Galaxy S24 — Special Offer", description: "Watch this ad to earn 100 FRW", duration: 30, progress: 80, earnings: 80, maxEarnings: 100, status: "in-progress" },
  { id: 2, emoji: "🛒", name: "ShopRite Weekly Deals", description: "View weekly deals and earn 100 FRW", duration: 20, progress: 60, earnings: 60, maxEarnings: 100, status: "in-progress" },
  { id: 3, emoji: "🚗", name: "Toyota Car Promotion", description: "Watch Toyota promo video to earn 100 FRW", duration: 45, progress: 40, earnings: 40, maxEarnings: 100, status: "in-progress" },
  { id: 4, emoji: "☕", name: "Cafe Mocha — New Menu", description: "View new menu items and earn 100 FRW", duration: 15, progress: 20, earnings: 20, maxEarnings: 100, status: "in-progress" },
  { id: 5, emoji: "✈️", name: "RwandAir — Flight Deals", description: "Check flight deals and earn 100 FRW", duration: 25, progress: 90, earnings: 90, maxEarnings: 100, status: "in-progress" },
];

function defaultWallet(): WalletState {
  return {
    balance: 12000,
    bonusReceived: 2000,
    todayEarnings: 250,
    totalEarned: 250,
    tasksCompleted: 2,
    streak: 7,
    tasks: defaultTasks,
    withdrawals: [
      { id: "TRV-2026-00455", amount: 5000, fee: 0, net: 5000, method: "MTN", phone: "0788 888 888", status: "completed", requestedAt: "2026-07-05T10:00:00", completedAt: "2026-07-06T10:00:00" },
      { id: "TRV-2026-00423", amount: 3000, fee: 500, net: 2500, method: "AIRTEL", phone: "0788 999 999", status: "processing", requestedAt: "2026-07-03T09:00:00" },
      { id: "TRV-2026-00390", amount: 2000, fee: 500, net: 1500, method: "MTN", phone: "0788 777 777", status: "failed", reason: "Invalid phone number", requestedAt: "2026-06-28T14:00:00" },
    ],
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

export function completeTask(taskId: number): WalletState {
  const w = getWallet();
  const t = w.tasks.find((x) => x.id === taskId);
  if (!t || t.status === "completed") return w;
  const remaining = t.maxEarnings - t.earnings;
  t.earnings = t.maxEarnings;
  t.progress = 100;
  t.status = "completed";
  w.todayEarnings += remaining;
  w.totalEarned += remaining;
  w.balance += remaining;
  w.tasksCompleted += 1;
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
