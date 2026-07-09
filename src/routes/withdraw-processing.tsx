import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TravoriumLogo } from "@/components/travorium/Logo";
import { frw, getLastWithdrawal, type Withdrawal } from "@/lib/wallet";
import { Clock, Home, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/withdraw-processing")({
  head: () => ({
    meta: [
      { title: "Withdrawal Processing — TRAVORIUM" },
      { name: "description", content: "Your TRAVORIUM withdrawal is being processed." },
    ],
  }),
  component: ProcessingPage,
});

function ProcessingPage() {
  const navigate = useNavigate();
  const [wd, setWd] = useState<Withdrawal | null>(null);

  useEffect(() => {
    const w = getLastWithdrawal();
    if (!w) navigate({ to: "/dashboard" });
    else setWd(w);
  }, [navigate]);

  if (!wd) return null;

  const elapsedHours = Math.max(0, Math.floor((Date.now() - new Date(wd.requestedAt).getTime()) / 3600000));

  const steps = [
    { label: "Submitted", state: "complete" as const },
    { label: "Pending Verification", state: "active" as const },
    { label: "Processing Payment", state: "pending" as const },
    { label: "Completed", state: "pending" as const },
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 md:px-8">
        <Link to="/"><TravoriumLogo /></Link>
      </div>

      <div className="mx-auto max-w-xl px-5 md:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-[0_20px_60px_-24px_rgba(10,10,26,0.15)]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gold/10 text-gold-dark">
            <Clock size={40} />
          </motion.div>
          <h1 className="mt-5 font-display text-2xl font-bold text-text-dark md:text-3xl">⏳ Withdrawal Being Processed</h1>
          <p className="mt-1 text-sm text-text-gray">Your withdrawal is being processed by our team.</p>

          <div className="mt-6 rounded-2xl bg-accent p-5 text-left text-sm">
            <Row k="Request ID" v={wd.id} />
            <Row k="Amount" v={frw(wd.amount)} />
            <Row k="Method" v={wd.method === "MTN" ? "MTN Mobile Money" : "Airtel Money"} />
            <Row k="Phone" v={wd.phone} />
            <Row k="Status" v="Processing ⏳" bold />
            <Row k="Elapsed" v={`${elapsedHours} hours`} />
            <Row k="Estimated" v="24–48 hours" />
          </div>

          {/* Tracker */}
          <div className="mt-6 rounded-2xl border border-border bg-white p-4 text-left">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <div className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${
                  s.state === "complete" ? "bg-green text-white" : s.state === "active" ? "bg-gold text-text-dark" : "bg-muted text-text-gray"
                }`}>
                  {s.state === "complete" ? "✓" : i + 1}
                </div>
                <p className={`flex-1 text-sm ${s.state === "pending" ? "text-text-gray" : "font-semibold text-text-dark"}`}>{s.label}</p>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-text-gray">
                  {s.state === "complete" ? "Complete" : s.state === "active" ? "Active" : "Pending"}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-accent p-3 text-xs text-text-dark">
            📱 You will receive an SMS confirmation on your registered phone number once processed. Please wait patiently — our team is working on it.
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <Link to="/dashboard" className="btn-gold flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold">
              <Home size={16} /> Dashboard
            </Link>
            <a href="https://wa.me/256766330161" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-border bg-white py-3 text-sm font-semibold text-text-dark hover:border-gold">
              <MessageCircle size={16} /> Contact support
            </a>
          </div>
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
