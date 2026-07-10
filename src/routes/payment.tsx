import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { TravoriumLogo } from "@/components/travorium/Logo";
import { getUser, savePayment } from "@/lib/travorium";
import { CheckCircle2, Copy, Phone, Upload, MessageCircle, AlertTriangle, X } from "lucide-react";

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: "Payment — TRAVORIUM" },
      { name: "description", content: "Complete your TRAVORIUM registration by paying 3,900 FRW via MTN or Airtel Money." },
    ],
  }),
  component: Payment,
});

const MTN_CODE = "*182*8*1*2158713#";
const AIRTEL_CODE = "*500*1*1*0733495838#";
const REGISTRATION_AMOUNT = 3900;

function Payment() {
  const navigate = useNavigate();
  const [screenshot, setScreenshot] = useState<string>("");
  const [method, setMethod] = useState<"MTN" | "AIRTEL" | "">("");
  const [name, setName] = useState("Investor");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const u = getUser();
    if (!u) {
      toast("Please register first");
      navigate({ to: "/register" });
      return;
    }
    setName(u.fullName);
  }, [navigate]);

  const copy = (v: string, label: string) => {
    navigator.clipboard?.writeText(v);
    toast.success(`${label} copied`);
  };
  const call = (code: string) => {
    window.location.href = `tel:${encodeURIComponent(code)}`;
  };

  const onFile = (f: File) => {
    if (!/(png|jpe?g)$/i.test(f.name)) {
      toast.error("Only PNG or JPG allowed");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setScreenshot(reader.result as string);
    reader.readAsDataURL(f);
  };

  const proceed = () => {
    if (!screenshot) return;
    savePayment({
      amount: REGISTRATION_AMOUNT,
      method: method || "MTN",
      screenshot,
      submittedAt: new Date().toISOString(),
    });
    navigate({ to: "/whatsapp" });
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 md:px-8">
        <Link to="/"><TravoriumLogo /></Link>
        <span className="text-xs font-semibold tracking-widest text-text-gray">STEP 2 / 3</span>
      </div>

      <div className="mx-auto max-w-3xl px-5 md:px-8">
        {/* Success banner */}
        <div className="rounded-3xl border border-green/20 bg-white p-6 text-center shadow-[0_20px_60px_-24px_rgba(10,10,26,0.12)]">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-green/10 text-green">
            <CheckCircle2 />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-text-dark md:text-3xl">Account created successfully!</h1>
          <p className="mt-1 text-sm text-text-gray">One step away from financial freedom.</p>
        </div>

        {/* Kinyarwanda instructions */}
        <div className="mt-6 rounded-3xl border border-gold/40 bg-accent p-6">
          <p className="font-semibold text-text-dark">KWIYANDIKISHA MURI TRAVORIUM COMPANY LTD BYAGENZE NEZA 🙏</p>
          <p className="mt-2 text-text-dark">IGISIGAYE NUKWISHYURA KUGIRANGO UBASHE GUHITA UHABWA BONUS YAWE ✅</p>
          <p className="mt-2 font-semibold text-text-dark">KWISHYURA BIKORWA MURUBU BURYO BUKIKIRA:</p>
        </div>

        {/* Payment methods */}
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <PayCard
            brand="MTN Mobile Money"
            brandColor="#FFCC00"
            code={MTN_CODE}
            name="Elise"
            onCopy={() => copy(MTN_CODE, "MTN code")}
            onCall={() => call("*182#")}
            onPick={() => setMethod("MTN")}
            active={method === "MTN"}
            callLabel="Call *182#"
          />
          <PayCard
            brand="Airtel Money"
            brandColor="#ED1C24"
            code={AIRTEL_CODE}
            name="Bucyayungura Evariste"
            onCopy={() => copy(AIRTEL_CODE, "Airtel code")}
            onCall={() => call("*500#")}
            onPick={() => setMethod("AIRTEL")}
            active={method === "AIRTEL"}
            callLabel="Call *500#"
          />
        </div>

        {/* Warning */}
        <div className="mt-6 flex gap-3 rounded-3xl border border-destructive/30 bg-destructive/5 p-5">
          <AlertTriangle className="mt-0.5 shrink-0 text-destructive" size={20} />
          <div className="text-sm text-text-dark">
            <p className="font-bold text-destructive">🚨 IKITONDERWA</p>
            <p className="mt-1">
              UGISOZA KWISHYURA HITA UFATA SCREENSHOT UYIHE AGENT ARIKUGUFASHA KUGIRANGO UBASHE GUHITA UHABWA BONUS YAWE ✅
            </p>
          </div>
        </div>

        {/* Upload */}
        <div className="mt-6 rounded-3xl border border-border bg-card p-6">
          <h3 className="font-display text-lg font-bold text-text-dark">Upload Payment Screenshot <span className="text-destructive">*</span></h3>
          <p className="text-sm text-text-gray">PNG or JPG. Required before you can contact the manager.</p>

          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          />

          {!screenshot ? (
            <button
              onClick={() => fileRef.current?.click()}
              className="mt-4 flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-background px-6 py-10 text-sm text-text-gray transition hover:border-gold hover:text-text-dark"
            >
              <Upload size={22} />
              Tap to upload screenshot
            </button>
          ) : (
            <div className="relative mt-4 overflow-hidden rounded-2xl border border-border">
              <img src={screenshot} alt="Payment screenshot" className="max-h-80 w-full object-contain bg-background" />
              <button
                onClick={() => setScreenshot("")}
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/95 shadow"
                aria-label="Remove"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <button
            disabled={!screenshot}
            onClick={proceed}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MessageCircle size={18} /> Talk to Manager on WhatsApp
          </button>
          <p className="mt-2 text-center text-xs text-text-gray">You’ll be connected to the manager after upload.</p>
        </div>
      </div>
    </div>
  );
}

function PayCard({
  brand, brandColor, code, name, onCopy, onCall, onPick, active, callLabel,
}: {
  brand: string; brandColor: string; code: string; name: string;
  onCopy: () => void; onCall: () => void; onPick: () => void;
  active: boolean; callLabel: string;
}) {
  return (
    <div
      onClick={onPick}
      className={`card-lift cursor-pointer rounded-3xl border bg-card p-6 transition ${
        active ? "border-gold ring-2 ring-gold/40" : "border-border"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full" style={{ background: brandColor }} />
        <span className="font-semibold text-text-dark">{brand}</span>
      </div>
      <div className="mt-4 rounded-xl bg-background p-3">
        <p className="text-[11px] uppercase tracking-widest text-text-gray">Payment code</p>
        <p className="mt-1 break-all font-mono text-lg font-bold text-text-dark">{code}</p>
      </div>
      <div className="mt-3 flex justify-between text-sm">
        <div><p className="text-text-gray">Amount</p><p className="font-semibold text-text-dark">3,900 FRW</p></div>
        <div className="text-right"><p className="text-text-gray">Name</p><p className="font-semibold text-text-dark">{name}</p></div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button onClick={(e) => { e.stopPropagation(); onCopy(); }} className="flex items-center justify-center gap-1.5 rounded-full border border-border bg-white py-2.5 text-xs font-medium hover:border-gold">
          <Copy size={14} /> Copy
        </button>
        <button onClick={(e) => { e.stopPropagation(); onCall(); }} className="btn-gold flex items-center justify-center gap-1.5 rounded-full py-2.5 text-xs">
          <Phone size={14} /> {callLabel}
        </button>
      </div>
    </div>
  );
}
