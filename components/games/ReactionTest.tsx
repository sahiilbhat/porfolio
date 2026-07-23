"use client";

import { useEffect, useRef, useState } from "react";
import { sSelect, sPassed, sWasted } from "@/lib/sfx";

type Phase = "idle" | "waiting" | "go" | "result" | "early";

export default function ReactionTest() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [time, setTime] = useState(0);
  const [best, setBest] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startAt = useRef(0);

  useEffect(() => {
    const b = Number(localStorage.getItem("reaction_best"));
    if (b > 0) setBest(b);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const arm = () => {
    setPhase("waiting");
    const delay = 1400 + Math.random() * 3200;
    timer.current = setTimeout(() => {
      startAt.current = performance.now();
      setPhase("go");
    }, delay);
  };

  const handle = () => {
    if (phase === "idle" || phase === "result" || phase === "early") {
      sSelect();
      arm();
    } else if (phase === "waiting") {
      if (timer.current) clearTimeout(timer.current);
      setPhase("early");
      sWasted();
    } else if (phase === "go") {
      const t = Math.round(performance.now() - startAt.current);
      setTime(t);
      setPhase("result");
      if (best == null || t < best) {
        setBest(t);
        localStorage.setItem("reaction_best", String(t));
        sPassed();
      } else {
        sSelect();
      }
    }
  };

  const styles: Record<Phase, { bg: string; title: string; sub: string }> = {
    idle: { bg: "bg-black/40 border-sand-dim/40", title: "Reaction Test", sub: "Click to start" },
    waiting: { bg: "bg-health/80 border-health", title: "Wait for green…", sub: "don't jump early" },
    go: { bg: "bg-money/90 border-money", title: "CLICK!", sub: "now!" },
    result: { bg: "bg-black/40 border-gold", title: `${time} ms`, sub: "click to go again" },
    early: { bg: "bg-black/50 border-health", title: "Too soon!", sub: "click to retry" },
  };
  const s = styles[phase];

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="max-w-xl text-center text-sm leading-relaxed text-sand-dim">
        When the box turns <span className="text-money">green</span>, click as fast as you can. Click
        early and you reset.
      </p>

      <button
        onClick={handle}
        className={`grid h-64 w-full max-w-2xl place-items-center rounded-[8px] border-[3px] text-center transition-colors duration-100 ${s.bg}`}
      >
        <span>
          <span className="block font-display text-4xl text-paper text-stroke-sm sm:text-6xl">{s.title}</span>
          <span className="mt-2 block text-xs uppercase tracking-[0.25em] text-black/70">{s.sub}</span>
        </span>
      </button>

      <div className="font-display text-lg text-gold">
        {best != null ? `Best: ${best} ms` : "No score yet"}
      </div>
    </div>
  );
}
