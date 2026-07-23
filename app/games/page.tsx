"use client";

import { useState } from "react";
import HorseRace from "@/components/games/HorseRace";
import Wordle from "@/components/games/Wordle";
import RockPaperScissors from "@/components/games/RockPaperScissors";
import { sMove, sSelect } from "@/lib/sfx";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const GAMES = [
  { id: "horse", name: "Inside Track", sub: "Horse betting", Comp: HorseRace },
  { id: "wordle", name: "Wordle", sub: "Word puzzle", Comp: Wordle },
  { id: "rps", name: "Rock Paper Scissors", sub: "vs CPU", Comp: RockPaperScissors },
];

export default function GamesPage() {
  const [active, setActive] = useState("horse");
  const Active = GAMES.find((g) => g.id === active)!.Comp;

  return (
    <main className="relative z-10 mx-auto max-w-5xl px-4 pb-24 pt-24 sm:px-8 sm:pt-28">
      <p className="mb-1 text-xs font-bold uppercase tracking-[0.3em] text-rust">Arcade</p>
      <h1
        className="font-script text-4xl font-normal leading-tight text-[#d6def5] sm:text-6xl"
        style={{ textShadow: "2px 3px 0 rgba(0,0,0,0.85), 0 0 22px rgba(150,170,255,0.18)" }}
      >
        Games
      </h1>
      <div className="mt-4 h-[3px] w-16 bg-gradient-to-r from-gold to-transparent" />
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-sand-dim">
        A little arcade. Take a break, then <a href={`${basePath}/#contact`} className="text-gold hover:underline">hit me up</a>.
      </p>

      {/* game selector */}
      <div className="mt-8 flex flex-wrap gap-2.5">
        {GAMES.map((g) => (
          <button
            key={g.id}
            onMouseEnter={sMove}
            onClick={() => {
              setActive(g.id);
              sSelect();
            }}
            className={`flex flex-col items-start border-2 px-4 py-2.5 text-left transition-all ${
              active === g.id
                ? "border-gold bg-gold/10"
                : "border-sand-dim/30 hover:border-sand-dim hover:-translate-y-0.5"
            }`}
          >
            <span className={`font-display text-lg ${active === g.id ? "text-gold" : "text-paper"}`}>{g.name}</span>
            <span className="text-[0.7rem] uppercase tracking-widest text-sand-dim">{g.sub}</span>
          </button>
        ))}
      </div>

      {/* active game */}
      <div className="mt-8 rounded-[8px] border-2 border-sand-dim/20 bg-black/30 p-4 backdrop-blur-sm sm:p-6">
        <Active />
      </div>

      <a
        href={`${basePath}/`}
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-sand-dim transition-colors hover:text-gold"
      >
        ← Back to portfolio
      </a>
    </main>
  );
}
