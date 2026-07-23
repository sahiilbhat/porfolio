"use client";

import { useEffect, useState } from "react";
import { sMove, sSelect, sPassed, sWasted } from "@/lib/sfx";

const rand = () => Math.floor(Math.random() * 100) + 1; // 1..100

export default function HigherLower() {
  const [current, setCurrent] = useState(50);
  const [next, setNext] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [over, setOver] = useState(false);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    setCurrent(rand());
    const b = Number(localStorage.getItem("hilo_best"));
    if (b > 0) setBest(b);
  }, []);

  const guess = (dir: "higher" | "lower") => {
    if (reveal || over) return;
    const n = rand();
    setNext(n);
    setReveal(true);
    const correct = dir === "higher" ? n >= current : n <= current;
    setTimeout(() => {
      if (correct) {
        const st = streak + 1;
        setStreak(st);
        if (st > best) {
          setBest(st);
          localStorage.setItem("hilo_best", String(st));
        }
        sMove();
        setCurrent(n);
        setNext(null);
        setReveal(false);
      } else {
        setOver(true);
        sWasted();
      }
    }, 850);
  };

  const restart = () => {
    if (streak >= best && streak > 0) sPassed();
    else sSelect();
    setCurrent(rand());
    setNext(null);
    setStreak(0);
    setOver(false);
    setReveal(false);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="max-w-xl text-center text-sm leading-relaxed text-sand-dim">
        Will the next number (1–100) be higher or lower than the current one? Build the longest
        streak you can. Ties count in your favour.
      </p>

      <div className="flex items-center gap-6">
        <div className="grid h-32 w-32 place-items-center rounded-[8px] border-[3px] border-gold bg-black/40">
          <span className="font-display text-6xl text-gold text-stroke-sm">{current}</span>
        </div>
        <span className="font-display text-2xl text-sand-dim">vs</span>
        <div
          className={`grid h-32 w-32 place-items-center rounded-[8px] border-[3px] transition-colors ${
            next == null ? "border-sand-dim/30 bg-black/20" : over ? "border-health bg-health/15" : "border-money bg-money/15"
          }`}
        >
          <span className="font-display text-6xl text-paper text-stroke-sm">{next ?? "?"}</span>
        </div>
      </div>

      {over ? (
        <div className="flex flex-col items-center gap-2">
          <span className="font-display text-3xl text-health text-stroke-sm">Game over</span>
          <span className="text-sm uppercase tracking-widest text-sand-dim">Streak: {streak}</span>
          <button
            onClick={restart}
            className="mt-1 border-2 border-gold bg-gold/10 px-5 py-2 text-sm font-bold uppercase tracking-wide text-gold transition-colors hover:bg-gold hover:text-black"
          >
            Play again
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <button
            disabled={reveal}
            onMouseEnter={sMove}
            onClick={() => guess("higher")}
            className="card card-hover flex items-center gap-2 px-6 py-3 font-bold uppercase tracking-wide text-sand disabled:opacity-50"
          >
            ▲ Higher
          </button>
          <button
            disabled={reveal}
            onMouseEnter={sMove}
            onClick={() => guess("lower")}
            className="card card-hover flex items-center gap-2 px-6 py-3 font-bold uppercase tracking-wide text-sand disabled:opacity-50"
          >
            ▼ Lower
          </button>
        </div>
      )}

      <div className="flex gap-6 text-sm font-bold uppercase tracking-widest">
        <span className="text-money">Streak {streak}</span>
        <span className="text-gold">Best {best}</span>
      </div>
    </div>
  );
}
