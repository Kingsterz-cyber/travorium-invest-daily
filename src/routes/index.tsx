import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/travorium/Header";
import { Footer } from "@/components/travorium/Footer";
import { ArrowRight, CheckCircle2, Gift, ShieldCheck, Sparkles, TrendingUp, UserPlus, Wallet } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TRAVORIUM — Invest Daily from 10,000 FRW in Rwanda" },
      { name: "description", content: "TRAVORIUM COMPANY LTD helps Rwandans grow daily returns from just 10,000 FRW. Trusted, transparent, mobile-money native." },
      { property: "og:title", content: "TRAVORIUM — Daily Investments for Rwanda" },
      { property: "og:description", content: "Invest daily with TRAVORIUM from just 10,000 FRW and watch your money grow." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <StatsCard />
      <HowItWorks />
      <Packages />
      <Testimonials />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <motion.section
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="relative overflow-hidden pt-10 pb-24 md:pt-20"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-48 h-72 w-72 rounded-full bg-green/10 blur-3xl" />

      <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-1.5 text-xs font-medium text-text-dark shadow-sm backdrop-blur"
        >
          <Sparkles size={14} className="text-gold-dark" /> Trusted by 500+ Rwandan investors
        </motion.span>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-4xl leading-[1.05] font-bold text-text-dark md:text-6xl lg:text-7xl"
        >
          Your money deserves a place that <span className="italic text-gold-dark">feels safe</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-base text-text-gray md:text-lg"
        >
          Invest daily with TRAVORIUM from just 10,000 FRW and watch your money grow. No stress, no hidden fees — just consistent returns.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link to="/register" className="btn-gold inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm">
              Start Investing Now <ArrowRight size={16} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <a href="#how" className="inline-flex items-center gap-2 rounded-full border border-text-dark/15 bg-white px-7 py-3.5 text-sm font-semibold text-text-dark transition hover:border-text-dark/40">
              How It Works
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function StatsCard() {
  const stats = [
    { icon: <UserPlus size={18} />, label: "Total Investors", value: "500+", delta: "+15%" },
    { icon: <Wallet size={18} />, label: "Daily Payouts", value: "2.4M FRW", delta: "+8%" },
    { icon: <TrendingUp size={18} />, label: "Active Members", value: "156", delta: "+9%" },
  ];
  return (
    <div className="relative -mt-16 px-5 md:px-8">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-px overflow-hidden rounded-3xl bg-border shadow-[0_20px_60px_-20px_rgba(10,10,26,0.15)] md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col justify-between gap-4 bg-white p-6">
            <div className="flex items-center gap-2 text-text-gray">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-gold-dark">{s.icon}</span>
              <span className="text-sm">{s.label}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-text-dark md:text-4xl">{s.value}</span>
              <span className="rounded-full bg-green/10 px-2 py-0.5 text-xs font-semibold text-green">{s.delta} ↑</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { icon: <UserPlus />, title: "Register free", copy: "Create your free account in 2 minutes — no credit card required." },
    { icon: <Wallet />, title: "Send 10,000 FRW", copy: "Pay via MTN or Airtel Money using the codes we provide." },
    { icon: <Gift />, title: "Earn daily", copy: "Receive your bonus and start earning daily returns immediately." },
  ];
  return (
    <section id="how" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-14 text-center"
      >
        <motion.span
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-xs font-semibold tracking-[0.25em] text-gold-dark"
        >
          HOW IT WORKS
        </motion.span>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-3 text-3xl font-bold md:text-5xl"
        >
          Three steps to daily returns
        </motion.h2>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 md:grid-cols-3"
      >
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            custom={i}
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="card-lift relative rounded-3xl border border-border bg-card p-8"
          >
            <span className="absolute right-6 top-6 font-display text-6xl font-bold text-accent">0{i + 1}</span>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-text-dark text-gold">{s.icon}</div>
            <h3 className="mt-6 font-display text-xl font-bold text-text-dark">{s.title}</h3>
            <p className="mt-2 text-sm text-text-gray">{s.copy}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Packages() {
  // Base rate: 10,000 -> 1,500 daily => 0.15 daily rate
  const plans = [
    { name: "Starter", price: "10,000", daily: "1,500", monthly: "45,000", featured: false },
    { name: "Silver", price: "50,000", daily: "7,500", monthly: "225,000", featured: true },
    { name: "Gold", price: "100,000", daily: "15,000", monthly: "450,000", featured: false },
  ];
  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-14 text-center"
        >
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-xs font-semibold tracking-[0.25em] text-gold-dark"
          >
            INVESTMENT PACKAGES
          </motion.span>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mt-3 text-3xl font-bold md:text-5xl"
          >
            Pick a plan that fits your goals
          </motion.h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {plans.map((p, idx) => (
            <motion.div
              key={p.name}
              custom={idx}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`card-lift relative rounded-3xl border p-8 ${
                p.featured
                  ? "border-transparent text-white"
                  : "border-border bg-card text-text-dark"
              }`}
              style={p.featured ? { background: "linear-gradient(160deg,#064F24 0%,#0A7E3C 100%)" } : {}}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-text-dark">
                  Most popular
                </span>
              )}
              <h3 className={`font-display text-2xl font-bold ${p.featured ? "text-gold" : ""}`}>{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">{p.price}</span>
                <span className={`text-sm ${p.featured ? "text-white/70" : "text-text-gray"}`}>FRW</span>
              </div>
              <ul className={`mt-6 space-y-3 text-sm ${p.featured ? "text-white/90" : "text-text-dark"}`}>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className={p.featured ? "text-gold" : "text-green"} /> {p.daily} FRW daily return</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className={p.featured ? "text-gold" : "text-green"} /> {p.monthly} FRW monthly</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className={p.featured ? "text-gold" : "text-green"} /> WhatsApp manager support</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className={p.featured ? "text-gold" : "text-green"} /> Instant onboarding bonus</li>
              </ul>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link to="/register" className="btn-gold mt-8 flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm">
                  Choose Plan <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 flex justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link to="/plans" className="inline-flex items-center gap-2 rounded-full border border-text-dark/15 bg-white px-6 py-3 text-sm font-semibold text-text-dark transition hover:border-text-dark/40">
              Explore All Plans
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { name: "Aline U.", city: "Nyarugenge, Kigali", quote: "Nishimiye cyane. I started with 10,000 FRW and I get my daily payout on time, every day." },
    { name: "Jean-Paul K.", city: "Gasabo, Kigali", quote: "The team on WhatsApp is very responsive. Onboarding took less than 5 minutes." },
    { name: "Diane M.", city: "Kicukiro, Kigali", quote: "Finally an investment platform I can trust. Transparent, simple, and truly Rwandan." },
  ];
  return (
    <section id="community" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-14 text-center"
      >
        <motion.span
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-xs font-semibold tracking-[0.25em] text-gold-dark"
        >
          COMMUNITY
        </motion.span>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-3 text-3xl font-bold md:text-5xl"
        >
          Stories from real investors
        </motion.h2>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 md:grid-cols-3"
      >
        {items.map((t, i) => (
          <motion.div
            key={t.name}
            custom={i}
            variants={
              i === 1
                ? itemVariants
                : {
                    hidden: { x: i === 0 ? -40 : 40, opacity: 0 },
                    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
                  }
            }
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="card-lift rounded-3xl border border-border bg-card p-7"
          >
            <ShieldCheck className="text-gold-dark" size={22} />
            <p className="mt-4 text-[15px] leading-relaxed text-text-dark">"{t.quote}"</p>
            <div className="mt-6 flex items-center gap-3">
              <div
                className="grid h-11 w-11 place-items-center rounded-full font-semibold text-white"
                style={{ background: `linear-gradient(135deg, ${["#0A7E3C","#B8860B","#064F24"][i]} 0%, #0A0A1A 120%)` }}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-text-dark">{t.name}</p>
                <p className="text-xs text-text-gray">{t.city}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
