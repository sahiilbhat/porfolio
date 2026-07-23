"use client";

import { useState } from "react";
import { sSelect, sMove, sPassed, sWasted } from "@/lib/sfx";

type Move = "rock" | "paper" | "scissors";
const MOVES: { id: Move; icon: string; label: string }[] = [
  { id: "rock", icon: "✊", label: "Rock" },
  { id: "paper", icon: "✋", label: "Paper" },
  { id: "scissors", icon: "✌️", label: "Scissors" },
];
const BEATS: Record<Move, Move> = { rock: "scissors", paper: "rock", scissors: "paper" };

export default function RockPaperScissors() {
  const [you, setYou] = useState<Move | null>(null);
  const [cpu, setCpu] = useState<Move | null>(null);
  const [result, setResult] = useState<"win" | "lose" | "tie" | null>(null);
  const [score, setScore] = useState({ w: 0, l: 0, t: 0 });
  const [rolling, setRolling] = useState(false);

  const play = (move: Move) => {
    if (rolling) return;
    sSelect();
    setYou(move);
    setRolling(true);
    setResult(null);
    // brief "shoot" suspense
    let ticks = 0;
    const iv = setInterval(() => {
      setCpu(MOVES[Math.floor(Math.random() * 3)].id);
      ticks++;
      if (ticks > 8) {
        clearInterval(iv);
        const c = MOVES[Math.floor(Math.random() * 3)].id;
        setCpu(c);
        const r = move === c ? "tie" : BEATS[move] === c ? "win" : "lose";
        setResult(r);
        setScore((s) => ({ w: s.w + (r === "win" ? 1 : 0), l: s.l + (r === "lose" ? 1 : 0), t: s.t + (r === "tie" ? 1 : 0) }));
        if (r === "win") sPassed();
        else if (r === "lose") sWasted();
        setRolling(false);
      }
    }, 70);
  };

  const face = (m: Move | null) => MOVES.find((x) => x.id === m)?.icon ?? "❔";

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="max-w-xl text-center text-sm leading-relaxed text-sand-dim">
        First to read the compiler wins. Pick your throw — best reflexes on the block.
      </p>

      {/* arena */}
      <div className="flex w-full max-w-lg items-center justify-around rounded-[6px] border-[3px] border-black bg-black/40 p-6 shadow-[0_0_0_2px_#3a2f1c]">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">You</span>
          <span className={`text-6xl transition-transform ${rolling ? "animate-bounce" : ""}`}>{face(you)}</span>
        </div>
        <span className="font-display text-2xl text-sand-dim">vs</span>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-health">CPU</span>
          <span className={`text-6xl transition-transform ${rolling ? "animate-bounce" : ""}`}>{face(cpu)}</span>
        </div>
      </div>

      {/* result */}
      <div className="h-9">
        {result && (
          <span
            className={`font-display text-3xl text-stroke-sm ${
              result === "win" ? "text-money" : result === "lose" ? "text-health" : "text-sand"
            }`}
          >
            {result === "win" ? "You win!" : result === "lose" ? "CPU wins" : "Draw"}
          </span>
        )}
      </div>

      {/* controls */}
      <div className="flex gap-3">
        {MOVES.map((m) => (
          <button
            key={m.id}
            disabled={rolling}
            onMouseEnter={sMove}
            onClick={() => play(m.id)}
            className="card card-hover flex flex-col items-center gap-1 px-5 py-3 disabled:opacity-50"
          >
            <span className="text-3xl">{m.icon}</span>
            <span className="text-xs font-bold uppercase tracking-wide text-sand">{m.label}</span>
          </button>
        ))}
      </div>

      {/* scoreboard */}
      <div className="flex gap-6 text-sm font-bold uppercase tracking-widest">
        <span className="text-money">Won {score.w}</span>
        <span className="text-health">Lost {score.l}</span>
        <span className="text-sand-dim">Drew {score.t}</span>
      </div>
    </div>
  );
}
