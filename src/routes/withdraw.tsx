import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { TravoriumLogo } from "@/components/travorium/Logo";
import { frw, getWallet, MAX_WITHDRAW_DAY, MIN_WITHDRAW, requestWithdrawal, WITHDRAW_FEE, type WalletState } from "@/lib/wallet";
import { AlertCircle, ArrowLeft, CheckCircle2, Clock, Download, MessageCircle, XCircle } from "lucide-react";

export const Route = createFileRoute("/withdraw")({
  head: () => ({
    meta: [
      { title: "Withdraw Earnings — TRAVORIUM" },
      { name: "description", content: "Withdraw your TRAVORIUM earnings to MTN or Airtel Money." },
    ],
  }),
  component: WithdrawPage,
});

const QUICK = [2000, 3000, 5000, 10000];

function WithdrawPage() {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState<WalletState | null>(null);
  const [amount, setAmount] = useState<number | "">("");
  const [method, setMethod] = useState<"MTN" | "AIRTEL" | "">("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => setWallet(getWallet()), []);

  const fee = useMemo(() => (wallet?.hasWithdrawnBefore ? WITHDRAW_FEE : 0), [wallet]);
  const net = typeof amount === "number" ? amount - fee : 0;

  const canSubmit =
    typeof amount === "number" &&
    amount >= MIN_WITHDRAW &&
    amount <= MAX_WITHDRAW_DAY &&
    amount <= (wallet?.balance ?? 0) &&
    method &&
    phone.replace(/\D/g, "").length >= 9 &&
    confirmed;

  if (!wallet) return null;

  const submit = () => {
    if (!canSubmit || typeof amount !== "number" || !method) return;
    requestWithdrawal({ amount, method, phone });
    toast.success("Withdrawal request submitted");
    navigate({ to: "/withdraw-success" });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="border-b border-border bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Link to="/"><TravoriumLogo /></Link>
          <Link to="/dashboard" className="flex items-center gap-1 text-xs font-semibold text-text-gray hover:text-text-dark">
            <ArrowLeft size={14} /> Back to dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 pt-8 md:px-8">
        <h1 className="font-display text-3xl font-bold text-text-dark md:text-4xl">💰 Withdraw Your Earnings</h1>
        <p className="mt-1 text-sm text-text-gray">Request a withdrawal to MTN or Airtel Money.</p>

        {/* Balance */}
        <div className="mt-6 rounded-3xl bg-gradient-to-br from-[#FCE58A] via-[#F2C94C] to-[#D4AF37] p-6 text-text-dark shadow-[0_20px_60px_-24px_rgba(212,175,55,0.6)] md:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest">💰 Available balance</p>
          <p className="mt-2 font-display text-4xl font-black md:text-5xl">{frw(wallet.balance)}</p>
          <div className="mt-5 grid grid-cols-2 gap-3 text-xs md:grid-cols-4">
            <InfoTile label="Minimum" value={frw(MIN_WITHDRAW)} />
            <InfoTile label="Max / day" value={frw(MAX_WITHDRAW_DAY)} />
            <InfoTile label="Processing" value="24–48 hours" />
            <InfoTile label="Fee" value={wallet.hasWithdrawnBefore ? frw(WITHDRAW_FEE) : "FREE first time"} />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-text-dark">📝 Withdrawal Request</h2>

            <label className="mt-5 block text-sm font-medium text-text-dark">Amount (FRW)</label>
            <div className="mt-2 flex items-stretch overflow-hidden rounded-2xl border border-border bg-background focus-within:border-gold">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="0"
                className="w-full bg-transparent px-4 py-3 text-lg font-semibold text-text-dark outline-none"
              />
              <span className="grid place-items-center border-l border-border bg-white px-4 text-xs font-semibold text-text-gray">FRW</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {QUICK.map((v) => (
                <button
                  key={v}
                  onClick={() => setAmount(v)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                    amount === v ? "border-gold bg-gold/10 text-text-dark" : "border-border bg-white text-text-gray hover:border-gold"
                  }`}
                >
                  {frw(v)}
                </button>
              ))}
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <label className="block text-sm font-medium text-text-dark">Payment method</label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <MethodCard active={method === "MTN"} brand="MTN Mobile Money" color="#FFCC00" onClick={() => setMethod("MTN")} />
                <MethodCard active={method === "AIRTEL"} brand="Airtel Money" color="#ED1C24" onClick={() => setMethod("AIRTEL")} />
              </div>
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <label className="block text-sm font-medium text-text-dark">Phone number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07XX XXX XXX"
                className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-text-dark outline-none focus:border-gold"
              />
              <p className="mt-1 text-xs text-text-gray">Enter the phone number to receive the money.</p>
            </div>

            {/* Summary */}
            <div className="mt-6 rounded-2xl bg-accent p-4 text-sm">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-gray">Withdrawal summary</p>
              <SummaryRow k="Amount" v={typeof amount === "number" ? frw(amount) : "—"} />
              <SummaryRow k="Fee" v={fee === 0 ? "0 FRW (first withdrawal free)" : frw(fee)} />
              <SummaryRow k="Net amount" v={typeof amount === "number" ? frw(Math.max(0, net)) : "—"} bold />
              <SummaryRow k="Method" v={method === "MTN" ? "MTN Mobile Money" : method === "AIRTEL" ? "Airtel Money" : "—"} />
              <SummaryRow k="Phone" v={phone || "—"} />
            </div>

            <label className="mt-4 flex items-start gap-2 text-sm text-text-dark">
              <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-1 accent-[color:var(--gold)]" />
              I confirm my account details are correct
            </label>

            <button
              onClick={submit}
              disabled={!canSubmit}
              className="btn-gold mt-5 w-full rounded-full py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
            >
              📤 Request Withdrawal
            </button>

            {typeof amount === "number" && amount > wallet.balance && (
              <p className="mt-3 text-xs text-destructive">Amount exceeds your available balance.</p>
            )}
          </div>

          {/* Rules */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-bold text-text-dark">📋 Withdrawal rules</h3>
              <ul className="mt-3 space-y-2 text-sm text-text-dark">
                <RuleRow icon={<CheckCircle2 size={14} className="text-green" />} text={`Minimum ${frw(MIN_WITHDRAW)}, max ${frw(MAX_WITHDRAW_DAY)} / day`} />
                <RuleRow icon={<CheckCircle2 size={14} className="text-green" />} text="Account must be 7 days old" />
                <RuleRow icon={<CheckCircle2 size={14} className="text-green" />} text="Complete at least 5 tasks" />
                <RuleRow icon={<AlertCircle size={14} className="text-gold-dark" />} text="First withdrawal FREE — 500 FRW after" />
                <RuleRow icon={<Clock size={14} className="text-text-gray" />} text="Processing: 24–48 hours + SMS confirmation" />
              </ul>
            </div>

            <div className="rounded-3xl border border-gold/40 bg-accent p-5 text-sm">
              <p className="font-semibold text-text-dark">💡 Tip</p>
              <p className="mt-1 text-text-dark">Your first withdrawal is completely free — no fees applied.</p>
            </div>
          </aside>
        </div>

        {/* History */}
        <div className="mt-10 rounded-3xl border border-border bg-card p-6 md:p-8">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-bold text-text-dark">📜 Withdrawal history</h3>
            <button className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-text-gray hover:border-gold hover:text-text-dark">
              <Download size={12} /> Download
            </button>
          </div>
          <div className="mt-4 divide-y divide-border">
            {wallet.withdrawals.map((w) => (
              <div key={w.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-text-dark">{frw(w.amount)} · {w.method === "MTN" ? "MTN" : "Airtel"}</p>
                  <p className="text-xs text-text-gray">{new Date(w.requestedAt).toLocaleDateString()} · {w.phone} · #{w.id}</p>
                  {w.reason && <p className="text-xs text-destructive">Reason: {w.reason}</p>}
                </div>
                <StatusPill status={w.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MethodCard({ active, brand, color, onClick }: { active: boolean; brand: string; color: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${active ? "border-gold ring-2 ring-gold/40" : "border-border hover:border-gold"}`}
    >
      <span className="h-3 w-3 rounded-full" style={{ background: color }} />
      <span className="font-semibold text-text-dark">{brand}</span>
    </button>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/70 p-2.5 backdrop-blur">
      <p className="text-[10px] uppercase tracking-wider opacity-70">{label}</p>
      <p className="mt-0.5 text-sm font-bold">{value}</p>
    </div>
  );
}

function SummaryRow({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-text-gray">{k}</span>
      <span className={bold ? "font-bold text-text-dark" : "text-text-dark"}>{v}</span>
    </div>
  );
}

function RuleRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-start gap-2"><span className="mt-0.5">{icon}</span> {text}</li>
  );
}

function StatusPill({ status }: { status: "processing" | "completed" | "failed" }) {
  const map = {
    completed: { c: "bg-green/15 text-green", icon: <CheckCircle2 size={12} />, label: "Completed" },
    processing: { c: "bg-gold/15 text-gold-dark", icon: <Clock size={12} />, label: "Processing" },
    failed: { c: "bg-destructive/15 text-destructive", icon: <XCircle size={12} />, label: "Failed" },
  } as const;
  const s = map[status];
  return <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${s.c}`}>{s.icon} {s.label}</span>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _support = MessageCircle;
