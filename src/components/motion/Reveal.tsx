"use client";

import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "./useReducedMotion";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Reveal direct children one after another (80ms apart) instead of the wrapper. */
  stagger?: boolean;
  delay?: number;
}

/** Opacity plus a 14px rise, 600ms, once. Content stays visible if JS or motion is unavailable. */
export function Reveal({ children, className, stagger = false, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const targets = stagger ? Array.from(el.children) : [el];
    let observer: IntersectionObserver | undefined;

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 14 });
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          observer?.disconnect();
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "opacity,transform",
          });
        },
        { threshold: 0.15 },
      );
      observer.observe(el);
    }, el);

    return () => {
      observer?.disconnect();
      ctx.revert();
    };
  }, [reduced, stagger, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
