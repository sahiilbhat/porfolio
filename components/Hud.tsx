"use client";

import { useEffect, useState } from "react";
import AudioToggle from "./AudioToggle";

export default function Hud() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const lit = Math.round(progress * 5);

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex flex-col items-end gap-2 text-right">
      <AudioToggle />

      <div className="flex flex-col items-end gap-1">
        <div className="text-base leading-none tracking-[0.15em] text-stroke-sm">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < lit ? "text-gold" : "text-sand/25"}>
              ★
            </span>
          ))}
        </div>
        <span className="text-[0.6rem] uppercase tracking-[0.2em] text-sand-dim">Progress</span>
      </div>

      <span className="inline-flex items-center gap-1.5 border border-money/40 bg-money/10 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-money">
        <span className="h-1.5 w-1.5 rounded-full bg-money [animation:blink_1.6s_steps(2)_infinite]" />
        Open to work
      </span>
    </div>
  );
}
