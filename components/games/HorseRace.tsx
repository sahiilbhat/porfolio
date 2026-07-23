"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HORSE_PATH, HORSE_VIEWBOX } from "@/data/horse";
import { sPassed, sWasted, sMove, sSelect, startRaceLoop, stopRaceLoop } from "@/lib/sfx";

type Horse = { id: number; name: string; odds: [number, number]; color: string };

const HORSES: Horse[] = [
  { id: 1, name: "Hot Reload", odds: [2, 1], color: "#f0b429" },
  { id: 2, name: "Silky Merge", odds: [3, 1], color: "#2dd4bf" },
  { id: 3, name: "Race Condition", odds: [9, 2], color: "#ef4444" },
  { id: 4, name: "Stack Overflow", odds: [6, 1], color: "#3b82f6" },
  { id: 5, name: "Null Pointer", odds: [8, 1], color: "#a855f7" },
  { id: 6, name: "Kernel Panic", odds: [12, 1], color: "#fb923c" },
];

const CHIPS = [100, 500, 1000, 2500];
const START_BALANCE = 10000;
const FINISH = 100;

type Phase = "idle" | "racing" | "won" | "lost";

export default function HorseRace() {
  const [balance, setBalance] = useState(START_BALANCE);
  const [selected, setSelected] = useState<number | null>(null);
  const [stake, setStake] = useState(500);
  const [phase, setPhase] = useState<Phase>("idle");
  const [pos, setPos] = useState<number[]>(() => HORSES.map(() => 0));
  const [winner, setWinner] = useState<number | null>(null);
  const [payout, setPayout] = useState(0);

  const raf = useRef<number | null>(null);
  const last = useRef(0);
  const speeds = useRef<number[]>([]);
  const posRef = useRef<number[]>(HORSES.map(() => 0));
  const winnerIdx = useRef(0);
  const settleRef = useRef<(id: number) => void>(() => {});

  useEffect(() => {
    const s = Number(localStorage.getItem("track_balance"));
    if (s > 0) setBalance(s);
  }, []);
  useEffect(() => {
    localStorage.setItem("track_balance", String(balance));
  }, [balance]);

  const stopRaf = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = null;
  };
  useEffect(
    () => () => {
      stopRaf();
      stopRaceLoop();
    },
    []
  );

  const multiplier = (h: Horse) => h.odds[0] / h.odds[1] + 1;

  const tick = useCallback((t: number) => {
    if (!last.current) last.current = t;
    const dt = Math.min(0.05, (t - last.current) / 1000);
    last.current = t;
    const next = posRef.current.map((p, i) => {
      const jitter = 0.7 + Math.random() * 0.6; // frame surge → lead changes
      return p + speeds.current[i] * jitter * dt;
    });
    posRef.current = next;
    setPos(next.slice());
    // race ends when the (pre-rolled, fastest) winner crosses the line
    if (next[winnerIdx.current] >= FINISH) {
      settleRef.current(HORSES[winnerIdx.current].id);
      return;
    }
    raf.current = requestAnimationFrame(tick);
  }, []);

  const startRace = useCallback(() => {
    if (selected == null || phase === "racing" || stake > balance) return;
    setBalance((b) => b - stake);
    sSelect();
    startRaceLoop();

    // Odds-weighted RANDOM winner — favourites win more often, upsets happen.
    const impl = HORSES.map((h) => h.odds[1] / (h.odds[0] + h.odds[1]));
    const sum = impl.reduce((a, b) => a + b, 0);
    let roll = Math.random() * sum;
    let win = 0;
    for (let i = 0; i < HORSES.length; i++) {
      roll -= impl[i];
      if (roll <= 0) {
        win = i;
        break;
      }
    }
    winnerIdx.current = win;

    // random speeds; the chosen winner is made the fastest so it finishes first
    const base = HORSES.map(() => 12 + Math.random() * 4);
    base[win] = Math.max(...base) + 0.8 + Math.random() * 1.4;
    speeds.current = base;

    posRef.current = HORSES.map(() => 0);
    setPos(posRef.current.slice());
    setWinner(null);
    setPhase("racing");
    last.current = 0;
    raf.current = requestAnimationFrame(tick);
  }, [selected, stake, balance, phase, tick]);

  const settle = (winId: number) => {
    stopRaf();
    stopRaceLoop();
    setWinner(winId);
    const won = winId === selected;
    if (won) {
      const h = HORSES.find((x) => x.id === selected)!;
      const ret = Math.round(stake * multiplier(h));
      setPayout(ret);
      setTimeout(() => {
        setBalance((b) => b + ret);
        setPhase("won");
        sPassed();
      }, 600);
    } else {
      setPayout(stake);
      setTimeout(() => {
        setPhase("lost");
        sWasted();
      }, 600);
    }
  };
  settleRef.current = settle;

  const reset = () => {
    stopRaceLoop();
    setPhase("idle");
    setPos(HORSES.map(() => 0));
    posRef.current = HORSES.map(() => 0);
    setWinner(null);
  };

  const broke = balance < 100 && phase === "idle";

  return (
    <div>
      <p className="mb-5 max-w-2xl text-sm leading-relaxed text-sand-dim">
        Pick a runner, place your bet, and watch the race. The horses are named after bugs I&apos;ve
        fixed. Odds are weighted but every race is genuinely random — favourites just win more often.
      </p>

      {/* TRACK */}
      <div className="relative overflow-hidden rounded-[6px] border-[3px] border-black shadow-[0_0_0_2px_#3a2f1c,0_18px_44px_-12px_rgba(0,0,0,0.8)]">
        <div className="relative" style={{ background: "linear-gradient(180deg,#3a2a4a 0%,#7c4a2e 45%,#b5652e 62%)" }}>
          <div
            className="h-6 w-full opacity-70 sm:h-8"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1.5px), radial-gradient(rgba(216,169,41,0.5) 1px, transparent 1.5px)",
              backgroundSize: "8px 8px, 8px 8px",
              backgroundPosition: "0 0, 4px 4px",
            }}
          />
          <div className="relative">
            {HORSES.map((h, i) => (
              <div
                key={h.id}
                className="relative flex items-center"
                style={{
                  height: "clamp(38px,7vw,58px)",
                  background:
                    i % 2 === 0 ? "linear-gradient(180deg,#2f6b32,#276029)" : "linear-gradient(180deg,#286028,#215324)",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span className="absolute left-1.5 z-10 font-display text-xs text-white/50">{h.id}</span>
                <div
                  className="absolute top-1/2 z-10"
                  style={{
                    left: `calc(${2 + (pos[i] / FINISH) * 88}% )`,
                    transform: "translate(-50%,-50%)",
                    transition: phase === "racing" ? "none" : "left 0.2s linear",
                  }}
                >
                  {phase === "racing" && (
                    <span
                      className="absolute right-full top-1/2 h-1 w-6 -translate-y-1/2 rounded-full bg-white/25 blur-[2px]"
                      style={{ animation: "dust 0.3s linear infinite" }}
                    />
                  )}
                  <span
                    className="block"
                    style={{
                      color: h.color,
                      width: "clamp(40px,7vw,60px)",
                      filter: "drop-shadow(1px 2px 1px rgba(0,0,0,0.5))",
                      animation: phase === "racing" ? "gallop 0.28s ease-in-out infinite" : "none",
                    }}
                  >
                    <svg viewBox={HORSE_VIEWBOX} className="h-auto w-full">
                      <path d={HORSE_PATH} fill="currentColor" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
            <div className="absolute inset-y-0 right-[6%] z-20 w-2">
              <div className="h-full w-full" style={{ backgroundImage: "repeating-linear-gradient(180deg,#fff 0 8px,#111 8px 16px)" }} />
            </div>
            <span className="absolute right-[3%] top-1 z-20 font-display text-[0.6rem] uppercase tracking-widest text-white/80">
              Finish
            </span>
          </div>
        </div>
      </div>

      {/* BETTING */}
      <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-start">
        <div className="grid flex-1 grid-cols-2 gap-2.5 sm:grid-cols-3">
          {HORSES.map((h) => {
            const isSel = selected === h.id;
            const isWin = winner === h.id;
            return (
              <button
                key={h.id}
                disabled={phase === "racing"}
                onMouseEnter={sMove}
                onClick={() => {
                  setSelected(h.id);
                  sSelect();
                }}
                className={`card flex items-center gap-2.5 px-3 py-2.5 text-left transition-all disabled:opacity-60 ${
                  isSel ? "border-gold bg-gold/10 ring-1 ring-gold" : "hover:border-sand-dim"
                } ${isWin ? "!border-money !bg-money/15" : ""}`}
              >
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-black text-xs font-bold text-black"
                  style={{ background: h.color }}
                >
                  {h.id}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold uppercase tracking-wide text-paper">{h.name}</span>
                  <span className="font-display text-xs text-gold">
                    {h.odds[0]}/{h.odds[1]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="card flex w-full flex-col gap-3 p-4 lg:w-72">
          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-[0.15em] text-sand-dim">Bankroll</span>
            <span className="font-display text-2xl text-money text-stroke-sm">${balance.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.15em] text-sand-dim">Wager</span>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {CHIPS.map((c) => (
                <button
                  key={c}
                  disabled={phase === "racing" || c > balance}
                  onClick={() => {
                    setStake(c);
                    sMove();
                  }}
                  className={`border-2 px-2.5 py-1 text-sm font-bold transition-colors disabled:opacity-30 ${
                    stake === c ? "border-gold bg-gold text-black" : "border-sand-dim/40 text-sand hover:border-gold"
                  }`}
                >
                  ${c >= 1000 ? c / 1000 + "k" : c}
                </button>
              ))}
            </div>
          </div>
          {broke ? (
            <button
              onClick={() => {
                setBalance(START_BALANCE);
                sSelect();
              }}
              className="mt-1 w-full border-2 border-gold bg-gold/10 px-4 py-3 text-sm font-bold uppercase tracking-wide text-gold transition-colors hover:bg-gold hover:text-black"
            >
              Reset bankroll
            </button>
          ) : (
            <button
              onClick={startRace}
              disabled={selected == null || phase === "racing" || stake > balance}
              className="mt-1 w-full border-2 border-gold bg-gold/10 px-4 py-3 text-sm font-bold uppercase tracking-wide text-gold transition-all hover:bg-gold hover:text-black disabled:cursor-not-allowed disabled:border-sand-dim/40 disabled:bg-transparent disabled:text-sand-dim"
            >
              {phase === "racing"
                ? "And they're off…"
                : selected == null
                ? "Pick a horse"
                : `Bet $${stake} on #${selected}`}
            </button>
          )}
        </div>
      </div>

      {(phase === "won" || phase === "lost") && (
        <div
          className="fixed inset-0 z-[120] flex cursor-pointer flex-col items-center justify-center bg-black/70 px-4 text-center"
          style={{ animation: "fadeIn 0.4s ease-out" }}
          onClick={reset}
        >
          {phase === "won" ? (
            <>
              <div className="font-display text-5xl text-money text-stroke glow-sand sm:text-7xl">Mission Passed</div>
              <div className="mt-2 font-display text-2xl text-gold text-stroke-sm sm:text-4xl">
                Respect + · Won ${payout.toLocaleString()}
              </div>
            </>
          ) : (
            <>
              <div className="font-display text-5xl text-health text-stroke glow-sand sm:text-7xl">Mission Failed</div>
              <div className="mt-2 font-display text-xl text-sand-dim text-stroke-sm sm:text-3xl">
                {HORSES.find((h) => h.id === winner)?.name} took it · −${payout.toLocaleString()}
              </div>
            </>
          )}
          <span className="mt-8 text-xs uppercase tracking-[0.25em] text-sand-dim">Click to place another bet</span>
        </div>
      )}

      <style>{`
        @keyframes gallop { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-4px) rotate(-2deg)} }
        @keyframes dust { 0%{opacity:.5;transform:translate(0,-50%) scaleX(1)} 100%{opacity:0;transform:translate(-8px,-50%) scaleX(1.6)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      `}</style>
    </div>
  );
}
