import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Shared one-shot scroll reveal. Children are rendered before the effect runs so
 * crawlers and JavaScript-disabled visitors receive the complete page.
 */
type Callback = () => void;

let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, Callback>();

function sharedObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer?.unobserve(entry.target);
          const callback = callbacks.get(entry.target);
          callbacks.delete(entry.target);
          callback?.();
        }
      },
      { threshold: 0.12 },
    );
  }
  return observer;
}

function reducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  /** Delay in 60ms steps, capped at three steps. */
  delay?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [revealed, setRevealed] = React.useState(false);
  const steps = Math.min(3, Math.max(0, Math.round(delay)));

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    setMounted(true);
    if (reducedMotion()) {
      setRevealed(true);
      return;
    }

    const currentObserver = sharedObserver();
    if (!currentObserver) {
      setRevealed(true);
      return;
    }

    callbacks.set(element, () => setRevealed(true));
    currentObserver.observe(element);
    return () => {
      currentObserver.unobserve(element);
      callbacks.delete(element);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "reveal",
        mounted && !revealed && "reveal-pending",
        revealed && "reveal-visible",
        className,
      )}
      style={{ "--reveal-delay": `${steps * 60}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
