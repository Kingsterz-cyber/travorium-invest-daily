import { TravoriumLogo } from "./Logo";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <TravoriumLogo />
          <p className="mt-4 max-w-xs text-sm text-text-gray">
            A modern daily-investment platform helping Rwandans grow their savings — safely, consistently, transparently.
          </p>
        </div>
        <div className="text-sm text-text-gray">
          <h4 className="mb-3 font-display text-base font-semibold text-text-dark">Contact</h4>
          <p className="flex items-center gap-2"><MapPin size={16} className="text-gold-dark" /> Kigali, Rwanda</p>
          <p className="mt-2 flex items-center gap-2"><Phone size={16} className="text-gold-dark" /> +250 788 888 888</p>
          <p className="mt-2 flex items-center gap-2"><Mail size={16} className="text-gold-dark" /> info@travorium.com</p>
        </div>
        <div className="text-sm text-text-gray">
          <h4 className="mb-3 font-display text-base font-semibold text-text-dark">Trust & Safety</h4>
          <p>Verified mobile-money payouts. Manager-supported onboarding. Real testimonials from real investors.</p>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-text-gray">
        © 2026 TRAVORIUM COMPANY LTD. All rights reserved.
      </div>
    </footer>
  );
}
