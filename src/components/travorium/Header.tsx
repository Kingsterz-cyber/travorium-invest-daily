import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TravoriumLogo } from "./Logo";
import { Menu, X } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { label: "How It Works", href: "#how" },
    { label: "About", href: "#about" },
    { label: "Community", href: "#community" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled ? "bg-white/85 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/"><TravoriumLogo /></Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-text-dark/80 transition hover:text-text-dark">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/register"
            className="btn-gold rounded-full px-5 py-2.5 text-sm"
          >
            Register
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="mx-5 mb-4 rounded-2xl bg-white p-5 shadow-lg md:hidden">
          <div className="flex flex-col gap-4">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-sm font-medium">
                {n.label}
              </a>
            ))}
            <Link to="/register" className="btn-gold rounded-full px-5 py-3 text-center text-sm">Register</Link>
          </div>
        </div>
      )}
    </motion.header>
  );
}
