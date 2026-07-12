import { useEffect, useRef, useState } from "react";

export function frwFlashClass() {
  return "animate-[goldFlash_550ms_ease-out]";
}

export function useCountUpNumber({
  value,
  durationMs = 700,
}: {
  value: number;
  durationMs?: number;
}) {
  const [displayValue, setDisplayValue] = useState<number>(value);
  const prevValueRef = useRef<number>(value);

  useEffect(() => {
    const start = prevValueRef.current;
    const end = value;
    if (start === end) return;

    const startTime = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const current = Math.round(start + (end - start) * eased);
      setDisplayValue(current);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    prevValueRef.current = end;
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, durationMs]);

  return displayValue;
}

export function useGoldFlashOnChange({ value }: { value: number }) {
  const [flashKey, setFlashKey] = useState(0);
  const prevRef = useRef(value);

  useEffect(() => {
    if (prevRef.current !== value) {
      prevRef.current = value;
      setFlashKey((k) => k + 1);
    }
  }, [value]);

  return flashKey;
}

