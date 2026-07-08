import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useInView } from "framer-motion";

interface CounterProps {
  from?: number;
  to: number;
  duration: number;
  format?: (value: number) => string;
  className?: string;
}

export function Counter({ from = 0, to, duration, format, className = "" }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => {
    const rounded = Math.round(latest);
    if (format) {
      return format(rounded);
    }
    return rounded.toString();
  });

  useEffect(() => {
    if (!isInView) return;

    let animationFrame: number;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Ease-out cubic easing
      const easeOut = 1 - Math.pow(1 - progress, 3);

      count.set(from + (to - from) * easeOut);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, from, to, duration, count]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}
