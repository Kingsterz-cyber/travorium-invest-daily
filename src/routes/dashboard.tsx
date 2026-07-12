import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { TravoriumLogo } from "@/components/travorium/Logo";
import { getUser } from "@/lib/travorium";
import {
  completeTask,
  frw,
  getWallet,
  isTaskCompletedForDay,
  ensureDailyWallet,
  TASK_EARNINGS_FRW,
  DAILY_TASK_COUNT,
  type WalletState,
} from "@/lib/wallet";
import { getTodayDailyAds, getTodayDayKey } from "@/lib/daily";
import { Wallet, TrendingUp, History, Users, MessageCircle, Flame, X, Play, CheckCircle2, LogOut } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Daily Tasks — TRAVORIUM" },
      { name: "description", content: "Complete daily tasks and earn 500 FRW per ad watched on TRAVORIUM." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState("Investor");
  const [wallet, setWallet] = useState<WalletState | null>(null);
  const [activeAdId, setActiveAdId] = useState<number | null>(null);
  const [forceRefresh, setForceRefresh] = useState(0);
  const dayKey = getTodayDayKey();
  const dailyAds = getTodayDailyAds();
  const safeDailyAds = Array.isArray(dailyAds) ? dailyAds : [];

  // 🔥 FIX: Force refresh wallet data
  const refreshWallet = () => {
    const latest = getWallet();
    console.log('🔄 Refreshing wallet:', latest);
    setWallet({ ...latest });
    setForceRefresh(prev => prev + 1);
  };

  // Initialize wallet and ensure daily reset
  useEffect(() => {
    const w = ensureDailyWallet(dayKey);
    setWallet({ ...w });
  }, [dayKey]);

  // Load user data
  useEffect(() => {
    const u = getUser();
    if (!u) {
      toast("Please register first");
      navigate({ to: "/register" });
      return;
    }
    setName(u.fullName);
    refreshWallet();
  }, [navigate]);

  // 🔥 FIX: Listen for wallet updates from custom event
  useEffect(() => {
    const handleWalletUpdate = (event: CustomEvent) => {
      const newWallet = event.detail.wallet;
      console.log('🔄 Wallet update received from event:', newWallet);
      setWallet({ ...newWallet });
    };

    window.addEventListener('walletUpdated', handleWalletUpdate as EventListener);
    
    return () => {
      window.removeEventListener('walletUpdated', handleWalletUpdate as EventListener);
    };
  }, []);

  // 🔥 FIX: Cross-tab sync with storage events + polling
  useEffect(() => {
    if (typeof window === "undefined") return;

    let mounted = true;

    const readAndUpdate = () => {
      if (!mounted) return;
      const latest = getWallet();
      setWallet((prev) => {
        if (!prev) return latest;
        if (
          prev.balance === latest.balance &&
          prev.todayEarnings === latest.todayEarnings &&
          prev.totalEarned === latest.totalEarned &&
          prev.tasksCompleted === latest.tasksCompleted &&
          prev.completedTaskAdIds.join(",") === latest.completedTaskAdIds.join(",") &&
          prev.dailyDayKey === latest.dailyDayKey
        ) {
          return prev;
        }
        console.log('🔄 Cross-tab wallet update detected');
        return latest;
      });
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === "travorium_wallet") {
        readAndUpdate();
      }
    };

    window.addEventListener("storage", onStorage);
    const intervalId = window.setInterval(readAndUpdate, 1000);

    return () => {
      mounted = false;
      window.removeEventListener("storage", onStorage);
      window.clearInterval(intervalId);
    };
  }, []);

  // 🔥 FIX: Force refresh after task completion
  const onAdComplete = (adId: number) => {
    console.log('🎯 Task completed:', adId);
    
    // Complete the task
    const w = completeTask(adId);
    console.log('💰 New wallet after completion:', w);
    
    // Update state with new wallet
    setWallet({ ...w });
    
    // Close modal
    setActiveAdId(null);
    
    // Show success
    toast.success(`🎉 Task Completed! +${TASK_EARNINGS_FRW} FRW earned`);
    
    // 🔥 FIX: Double-check and force refresh after short delay
    setTimeout(() => {
      const refreshed = getWallet();
      console.log('🔄 Force refresh after delay:', refreshed);
      setWallet({ ...refreshed });
    }, 100);
  };

  if (!wallet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
          <p className="mt-4 text-text-gray">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const dailyGoal = TASK_EARNINGS_FRW * DAILY_TASK_COUNT;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-white/85 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-4 md:px-8">
          <Link to="/" className="min-w-0"><TravoriumLogo /></Link>
          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden text-xs font-semibold text-text-gray sm:inline">Hi, {name}</span>
            <button 
              onClick={refreshWallet}
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-text-gray hover:border-gold hover:text-text-dark" 
              aria-label="Refresh balance"
            >
              <span className="text-sm">🔄</span>
            </button>
            <Link to="/" className="grid h-9 w-9 place-items-center rounded-full border border-border text-text-gray hover:border-gold hover:text-text-dark" aria-label="Sign out">
              <LogOut size={16} />
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 pt-8 md:px-8">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-text-gray">Welcome back,</p>
          <h1 className="font-display text-3xl font-bold text-text-dark md:text-4xl">{name} 👋</h1>
          <p className="mt-1 text-sm text-text-gray">📋 Complete Tasks & Earn Daily</p>
        </div>

        {/* 🔥 FIX: Debug balance display */}
        <div className="mt-2 text-xs text-text-gray">
          Balance: {frw(wallet.balance)} | Tasks: {wallet.tasksCompleted}/{DAILY_TASK_COUNT}
        </div>

        {/* Wallet + Progress */}
        <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <WalletCard 
            key={forceRefresh} 
            w={wallet} 
            onWithdraw={() => navigate({ to: "/withdraw" })} 
          />
          <ProgressCard w={wallet} goal={dailyGoal} />
        </div>

        {/* Tasks */}
        <div className="mt-10 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold text-text-dark">Today's Tasks</h2>
          <span className="text-xs font-semibold text-text-gray">
            {wallet.completedTaskAdIds.length} / {DAILY_TASK_COUNT} done
          </span>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {safeDailyAds.map((ad) => {
            const isDone = isTaskCompletedForDay(ad.id);
            return (
              <TaskCard
                key={ad.id}
                ad={ad}
                done={isDone}
                onStart={() => {
                  console.log('🎬 Starting task:', ad.id);
                  setActiveAdId(ad.id);
                }}
              />
            );
          })}
        </div>

        {/* Quick actions */}
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          <QuickAction icon={<Wallet size={18} />} label="Withdraw" onClick={() => navigate({ to: "/withdraw" })} primary />
          <QuickAction icon={<Users size={18} />} label="Refer Friends" onClick={() => toast("Referral link copied — coming soon")} />
          <QuickAction icon={<History size={18} />} label="History" onClick={() => navigate({ to: "/withdraw" })} />
          <QuickAction icon={<MessageCircle size={18} />} label="Support" onClick={() => window.open("https://wa.me/256766330161", "_blank")} />
        </div>

        {/* Footer stats */}
        <div className="mt-10 rounded-2xl border border-border bg-card p-4 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Stat label="Today's Earnings" value={frw(wallet.todayEarnings)} />
            <Stat label="Tasks Completed" value={`${wallet.tasksCompleted}/${DAILY_TASK_COUNT}`} />
            <Stat label="Streak" value={`${wallet.streak || 0} days`} icon={<Flame size={14} className="text-orange-500" />} />
          </div>
        </div>
      </div>

      {/* 🔥 FIX: Ad Modal */}
      <AnimatePresence>
        {activeAdId && (
          <AdModal
            key={activeAdId}
            ad={dailyAds.find((a) => a.id === activeAdId) ?? dailyAds[0]}
            done={isTaskCompletedForDay(activeAdId)}
            onClose={() => setActiveAdId(null)}
            onComplete={(adId) => onAdComplete(adId)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Subcomponents ---

// 🔥 FIX: Wallet Balance with Gold Flash Animation
function WalletBalanceAnimated({ balance }: { balance: number }) {
  const [displayBalance, setDisplayBalance] = useState(balance);
  const [isFlashing, setIsFlashing] = useState(false);
  
  // Animate balance changes
  useEffect(() => {
    if (balance !== displayBalance) {
      const start = displayBalance;
      const end = balance;
      const duration = 700;
      const startTime = Date.now();
      
      // Trigger gold flash
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 600);
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + (end - start) * progress;
        setDisplayBalance(Math.round(current));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
  }, [balance, displayBalance]);

  return (
    <p className={`mt-4 font-display text-4xl font-black md:text-5xl transition-colors duration-300 ${
      isFlashing ? 'text-gold' : 'text-text-dark'
    }`}>
      {frw(displayBalance)}
    </p>
  );
}

function WalletCard({ w, onWithdraw }: { w: WalletState; onWithdraw: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FCE58A] via-[#F2C94C] to-[#D4AF37] p-6 text-text-dark shadow-[0_20px_60px_-24px_rgba(212,175,55,0.6)] md:p-8">
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/20 blur-2xl" />
      <div className="relative">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
          <Wallet size={14} /> My Wallet
        </div>
        <WalletBalanceAnimated balance={w.balance} />
        <p className="text-xs opacity-70">Total balance</p>

        <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
          <MiniStat label="Bonus" value={frw(w.bonusReceived)} />
          <MiniStat label="Today" value={frw(w.todayEarnings)} />
          <MiniStat label="Earned" value={frw(w.totalEarned)} />
        </div>

        <div className="mt-6 flex gap-2">
          <button onClick={onWithdraw} className="flex-1 rounded-full bg-text-dark px-5 py-3 text-sm font-semibold text-white hover:brightness-125">
            💰 Withdraw
          </button>
          <button onClick={onWithdraw} className="rounded-full bg-white/70 px-5 py-3 text-sm font-semibold text-text-dark backdrop-blur hover:bg-white">
            📊 History
          </button>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/60 p-2.5 backdrop-blur">
      <p className="text-[10px] uppercase tracking-wider opacity-70">{label}</p>
      <p className="mt-0.5 text-sm font-bold">{value}</p>
    </div>
  );
}

function ProgressCard({ w, goal }: { w: WalletState; goal: number }) {
  const pct = Math.min(100, (w.todayEarnings / goal) * 100);
  const done = w.completedTaskAdIds.length;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-green">
        <TrendingUp size={14} /> Today's Progress
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between">
          <p className="font-display text-2xl font-bold text-text-dark">{frw(w.todayEarnings)}</p>
          <p className="text-xs text-text-gray">of {frw(goal)} goal</p>
        </div>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-green to-green-dark"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <p className="mt-2 text-xs text-text-gray">Complete 5 tasks to earn {frw(goal)} daily</p>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl bg-accent p-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-text-gray">Tasks</p>
          <p className="font-display text-2xl font-bold text-text-dark">{done}/{DAILY_TASK_COUNT}</p>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: DAILY_TASK_COUNT }).map((_, i) => (
            <div
              key={i}
              className={`h-8 w-2 rounded-full ${i < done ? "bg-green" : "bg-border"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TaskCard({
  ad,
  done,
  onStart,
}: {
  ad: { id: number; title: string; desc: string; image: string; link: string };
  done: boolean;
  onStart: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: done ? 0 : -4 }}
      className={`group relative overflow-hidden rounded-3xl border bg-card p-6 shadow-[0_1px_3px_rgba(10,10,26,0.04),0_8px_24px_rgba(10,10,26,0.06)] transition ${
        done ? "border-green/40 bg-green/5" : "border-border"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-accent">
          <img src={ad.image} alt={ad.title} className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-lg font-bold text-text-dark">{ad.title}</h3>
          <p className="mt-0.5 line-clamp-3 text-sm text-text-gray">{ad.desc}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-text-gray">
          <span>Loading</span>
          <span className="font-mono text-text-dark">{done ? 100 : 0}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              done ? "bg-green" : "bg-gradient-to-r from-gold to-gold-dark"
            }`}
            style={{ width: `${done ? 100 : 0}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-text-gray">Earnings</span>
          <span className="font-semibold text-text-dark">
            {done ? TASK_EARNINGS_FRW : 0} / {TASK_EARNINGS_FRW} FRW
          </span>
        </div>
      </div>

      <button
        onClick={onStart}
        disabled={done}
        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
          done ? "bg-green/15 text-green cursor-default" : "btn-gold"
        }`}
      >
        {done ? (
          <>
            <CheckCircle2 size={16} /> Completed
          </>
        ) : (
          <>
            <Play size={14} /> Watch Ad
          </>
        )}
      </button>
    </motion.div>
  );
}

function QuickAction({ icon, label, onClick, primary }: { icon: React.ReactNode; label: string; onClick: () => void; primary?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-3.5 text-sm font-semibold transition ${
        primary
          ? "btn-gold border-transparent"
          : "border-border bg-card text-text-dark hover:border-gold"
      }`}
    >
      {icon} {label}
    </button>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-widest text-text-gray">{label}:</span>
      <span className="flex items-center gap-1 font-semibold text-text-dark">{value}{icon}</span>
    </div>
  );
}

// 🔥 FIX: Ad Modal Component with Real-Time Earnings
function AdModal({
  ad,
  done,
  onClose,
  onComplete,
}: {
  ad: { id: number; title: string; desc: string; image: string; link: string };
  done: boolean;
  onClose: () => void;
  onComplete: (adId: number) => void;
}) {
  const [remaining, setRemaining] = useState(30);
  const [progress, setProgress] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [internalDone, setInternalDone] = useState(false);
  const startedAt = useRef(Date.now());
  const total = 30;

  // Reset when modal opens
  useEffect(() => {
    if (done) {
      setInternalDone(true);
      setProgress(100);
      setEarnings(TASK_EARNINGS_FRW);
      return;
    }
    setProgress(0);
    setEarnings(0);
    setInternalDone(false);
    startedAt.current = Date.now();
  }, [ad.id, done]);

  // Real-time progress and earnings
  useEffect(() => {
    if (done || internalDone) return;

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startedAt.current) / 1000;
      const p = Math.min(100, (100 * elapsed) / total);
      
      setProgress(Math.floor(p));
      setEarnings(Math.floor((TASK_EARNINGS_FRW * p) / 100));
      setRemaining(Math.max(0, Math.ceil(total - elapsed)));

      if (p >= 100) {
        setInternalDone(true);
        clearInterval(interval);
        // Complete the task
        onComplete(ad.id);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [done, internalDone, ad.id, onComplete, total]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-md overflow-hidden rounded-3xl bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <p className="flex items-center gap-2 font-semibold text-text-dark">
            <img src={ad.image} alt={ad.title} className="h-7 w-7 rounded-full object-cover" />
            {ad.title}
          </p>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted">
            <X size={16} />
          </button>
        </div>

        <div className="relative grid h-56 place-items-center overflow-hidden bg-gradient-to-br from-accent to-white">
          <div className="mx-4 w-full">
            <img src={ad.image} alt={ad.title} className="h-56 w-full object-contain" />
          </div>
          <div className="absolute inset-x-0 bottom-3 mx-4 rounded-full bg-black/70 px-3 py-1 text-center text-xs font-medium text-white backdrop-blur">
            {done || internalDone ? "✅ Ad Complete!" : `⏱️ ${remaining}s remaining`}
          </div>
        </div>

        <div className="p-6">
          <div className="mb-2 flex items-center justify-between text-xs text-text-gray">
            <span>Loading</span>
            <span className="font-mono text-text-dark">{progress}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full transition-all duration-100 ${
                done || internalDone ? "bg-green" : "bg-gradient-to-r from-gold to-gold-dark"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-text-gray">💰 Earnings</p>
            <p className="text-sm font-bold text-text-dark">
              {earnings} / {TASK_EARNINGS_FRW} FRW
            </p>
          </div>

          <AnimatePresence>
            {(internalDone || done) && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-4 rounded-2xl bg-green/10 p-4 text-center"
              >
                <p className="flex items-center justify-center gap-2 font-semibold text-green">
                  <CheckCircle2 size={18} /> 
                  Task Completed! +{TASK_EARNINGS_FRW} FRW earned
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => {
              if (internalDone || done) {
                onComplete(ad.id);
                onClose();
              } else {
                onClose();
              }
            }}
            className={`mt-5 w-full rounded-full py-3 text-sm font-semibold ${
              internalDone || done
                ? "btn-gold"
                : "border border-border bg-white text-text-dark hover:border-gold"
            }`}
          >
            {internalDone || done ? "🎉 Claim & Continue" : "Close"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}