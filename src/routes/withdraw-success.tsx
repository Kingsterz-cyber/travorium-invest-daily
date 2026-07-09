import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TravoriumLogo } from "@/components/travorium/Logo";
import { frw, getLastWithdrawal, type Withdrawal } from "@/lib/wallet";
import { CheckCircle2, Home, ListChecks, Users, Activity } from "lucide-react";

export const Route = createFileRoute("/withdraw-success")({
  head: () => ({
    meta: [
      { title: "Withdrawal Submitted — TRAVORIUM" },
      { name: "description", content: "Your TRAVORIUM withdrawal request has been submitted successfully." },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const navigate = useNavigate();
  const [wd, setWd] = useState<Withdrawal | null>(null);

  useEffect(() => {
    const w = getLastWithdrawal();
    if (!w) navigate({ to: "/dashboard" });
    else setWd(w);
  }, [navigate]);

  if (!wd) return null;

  const eta = new Date(new Date(wd.requestedAt).getTime() + 36 * 3600 * 1000);

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 md:px-8">
        <Link to="/"><TravoriumLogo /></Link>
      </div>

      <div className="mx-auto max-w-xl px-5 md:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-[0_20px_60px_-24px_rgba(10,10,26,0.15)]">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
            className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green/10 text-green">
            <CheckCircle2 size={44} />
          </motion.div>
          <h1 className="mt-5 font-display text-2xl font-bold text-text-dark md:text-3xl">✅ Withdrawal Submitted!</h1>
          <p className="mt-1 text-sm text-text-gray">Your withdrawal request has been submitted successfully.</p>

          <div className="mt-6 rounded-2xl bg-accent p-5 text-left text-sm">
            <Row k="Request ID" v={wd.id} />
            <Row k="Amount" v={frw(wd.amount)} />
            <Row k="Method" v={wd.method === "MTN" ? "MTN Mobile Money" : "Airtel Money"} />
            <Row k="Phone" v={wd.phone} />
            <Row k="Fee" v={wd.fee === 0 ? "FREE (first withdrawal)" : frw(wd.fee)} />
            <Row k="Net Amount" v={frw(wd.net)} bold />
            <Row k="Status" v="Processing ⏳" />
            <Row k="Estimated" v={eta.toLocaleString()} />
          </div>

          <div className="mt-6 grid gap-2">
            <Link to="/dashboard" className="btn-gold flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold">
              <Home size={16} /> Return to dashboard
            </Link>
            <Link to="/withdraw-processing" className="flex items-center justify-center gap-2 rounded-full border border-border bg-white py-3 text-sm font-semibold text-text-dark hover:border-gold">
              <Activity size={16} /> Check status
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/dashboard" className="flex items-center justify-center gap-2 rounded-full border border-border bg-white py-3 text-sm font-medium text-text-dark hover:border-gold">
                <ListChecks size={14} /> More tasks
              </Link>
              <button className="flex items-center justify-center gap-2 rounded-full border border-border bg-white py-3 text-sm font-medium text-text-dark hover:border-gold">
                <Users size={14} /> Refer a friend
              </button>
            </div>
          </div>

          <p className="mt-6 text-xs text-text-gray">You'll receive an SMS confirmation once processed. Muve neza! 🙏</p>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-text-gray">{k}</span>
      <span className={bold ? "font-bold text-text-dark" : "text-text-dark"}>{v}</span>
    </div>
  );
}
