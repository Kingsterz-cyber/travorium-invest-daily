export function TravoriumLogo({ size = 36 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="grid place-items-center rounded-xl shrink-0"
        style={{
          width: size,
          height: size,
          background: "var(--gradient-gold)",
          boxShadow: "var(--shadow-gold)",
        }}
      >
        <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none">
          <path d="M12 2L4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z" fill="#0A0A1A" />
          <path d="M9 12l2 2 4-4" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-display text-lg font-bold tracking-tight text-text-dark">TRAVORIUM</span>
        <span className="text-[10px] font-medium tracking-[0.2em] text-text-gray">COMPANY LTD</span>
      </div>
    </div>
  );
}
