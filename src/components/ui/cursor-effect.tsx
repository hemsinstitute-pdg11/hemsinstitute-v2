"use client";

import { useEffect, useRef } from "react";

export function CursorEffect() {
  const ringRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let visible = false;
    const move = (event: PointerEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (!visible) {
        ring.style.opacity = "1";
        dot.style.opacity = "1";
        visible = true;
      }
    };

    const over = (event: PointerEvent) => {
      const target = event.target;
      const interactive = target instanceof Element && Boolean(
        target.closest('a, button, [role="button"], input, select, textarea, summary, label')
      );
      ring.dataset.hover = interactive ? "true" : "false";
    };

    const leave = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
      visible = false;
    };

    const down = () => { ring.dataset.down = "true"; };
    const up = () => { ring.dataset.down = "false"; };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <>
      <span ref={ringRef} className="cursor-orbit" aria-hidden="true" />
      <span ref={dotRef} className="cursor-core" aria-hidden="true" />
    </>
  );
}
