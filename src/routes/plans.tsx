import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/travorium/Header";
import { Footer } from "@/components/travorium/Footer";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";

export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      { title: "TRAVORIUM — All Plans" },
      { name: "description", content: "Explore all investment plans and pick what suits you." },
    ],
  }),
  component: ExplorePlans,
});

function ExplorePlans() {
  // rate: 0.15 daily
  const rate = 0.15;
  const plans = [
    { name: "Starter", price: 10000 },
    { name: "20K", price: 20000 },
    { name: "Silver", price: 50000 },
    { name: "80K", price: 80000 },
    { name: "120K", price: 120000 },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-24 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold md:text-5xl">Explore All Plans</h1>
          <p className="mt-2 text-sm text-text-gray">Full list of plans and their expected daily/monthly returns.</p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid gap-6 md:grid-cols-3"
        >
          {plans.map((p, idx) => {
            const daily = Math.round(p.price * rate);
            const monthly = daily * 30;
            return (
              <motion.div
                key={p.name}
                custom={idx}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="card-lift relative rounded-3xl border border-border bg-card p-8"
              >
                <h3 className={`font-display text-2xl font-bold`}>{p.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold">{p.price.toLocaleString()}</span>
                  <span className={`text-sm text-text-gray`}>FRW</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-text-dark">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green" /> {daily.toLocaleString()} FRW daily return</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green" /> {monthly.toLocaleString()} FRW monthly</li>
                </ul>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/register" className="btn-gold mt-8 flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm">
                    Choose Plan <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Link to="/" className="text-sm font-semibold text-text-dark/80">Back to Home</Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
