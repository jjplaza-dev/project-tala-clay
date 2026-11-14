"use client";

import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "./useReducedMotion";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", clearProps: "opacity,transform" },
      );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return <div ref={ref}>{children}</div>;
}
