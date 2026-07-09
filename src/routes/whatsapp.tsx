import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TravoriumLogo } from "@/components/travorium/Logo";
import { buildWhatsappMessage, buildWhatsappUrl, getUser, MANAGER_PHONE_DISPLAY } from "@/lib/travorium";
import { Copy, MessageCircle, Loader2 } from "lucide-react";

export const Route = createFileRoute("/whatsapp")({
  head: () => ({
    meta: [
      { title: "Redirecting to WhatsApp — TRAVORIUM" },
      { name: "description", content: "Send your payment screenshot to the TRAVORIUM manager on WhatsApp." },
    ],
  }),
  component: WhatsappPage,
});

function WhatsappPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("Investor");

  useEffect(() => {
    const u = getUser();
    if (!u) { navigate({ to: "/register" }); return; }
    setName(u.fullName);
  }, [navigate]);

  const message = buildWhatsappMessage(name);
  const url = buildWhatsappUrl(name);

  const copy = () => {
    navigator.clipboard?.writeText(message);
    toast.success("Message copied");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 md:px-8">
        <Link to="/"><TravoriumLogo /></Link>
        <span className="text-xs font-semibold tracking-widest text-text-gray">STEP 3 / 3</span>
      </div>

      <div className="mx-auto max-w-xl px-5 py-6 md:px-8">
        <div className="rounded-3xl border border-border bg-card p-7 text-center shadow-[0_20px_60px_-24px_rgba(10,10,26,0.15)] md:p-9">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#25D366]/10 text-[#25D366]">
            <MessageCircle size={30} />
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold text-text-dark md:text-3xl">Redirecting to WhatsApp</h1>
          <div className="mt-2 flex items-center justify-center gap-2 text-sm text-text-gray">
            <Loader2 className="animate-spin" size={14} /> Preparing your message…
          </div>

          {/* Message bubble */}
          <div className="mt-6 rounded-2xl bg-[#DCF8C6] p-4 text-left text-sm text-text-dark shadow-inner">
            {message}
            <p className="mt-2 text-right text-[10px] text-text-gray">via TRAVORIUM</p>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
          >
            <MessageCircle size={18} /> Open WhatsApp & Send Message
          </a>
          <button
            onClick={copy}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-medium hover:border-gold"
          >
            <Copy size={16} /> Copy Message
          </button>
          <Link
            to="/dashboard"
            className="btn-gold mt-3 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
          >
            Continue to Dashboard →
          </Link>

          <p className="mt-6 rounded-xl bg-accent p-3 text-xs text-text-dark">
            After sending your screenshot, the manager will verify and send you the platform link within 5 minutes.
          </p>
          <p className="mt-2 text-xs text-text-gray">Manager: {MANAGER_PHONE_DISPLAY}</p>

          <p className="mt-8 font-display text-lg font-bold text-green-dark">
            MUHAVE IKAZE KANDI TWISHIMIYE GUKORANA NAMWE 🙏🙏
          </p>
        </div>
      </div>
    </div>
  );
}
