"use client";

import { useCallback, useEffect, useState } from "react";
import { sMove, sSelect, sPassed, sWasted } from "@/lib/sfx";

const WORDS = [
  "crane", "slate", "audio", "house", "plant", "brick", "ghost", "flame", "cloud", "river",
  "stone", "light", "dream", "sword", "world", "music", "piano", "tiger", "eagle", "table",
  "chair", "apple", "mango", "lemon", "grape", "beach", "ocean", "storm", "cabin", "glass",
  "brave", "crazy", "dance", "eight", "fault", "giant", "happy", "ideal", "jolly", "knife",
  "lucky", "money", "noble", "olive", "pride", "quiet", "royal", "sunny", "trust", "urban",
  "vivid", "witty", "youth", "zebra", "pixel", "cache", "query", "array", "logic", "debug",
  "stack", "merge", "class", "props", "hooks", "async", "fetch", "route", "build", "shift",
];
const ROWS = 6;
const COLS = 5;
type State = "playing" | "won" | "lost";

function score(guess: string, answer: string): ("g" | "y" | "b")[] {
  const res: ("g" | "y" | "b")[] = Array(COLS).fill("b");
  const rem: Record<string, number> = {};
  for (let i = 0; i < COLS; i++) {
    if (guess[i] === answer[i]) res[i] = "g";
    else rem[answer[i]] = (rem[answer[i]] || 0) + 1;
  }
  for (let i = 0; i < COLS; i++) {
    if (res[i] === "g") continue;
    if (rem[guess[i]] > 0) {
      res[i] = "y";
      rem[guess[i]]--;
    }
  }
  return res;
}

const KEYS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

export default function Wordle() {
  const [answer, setAnswer] = useState("crane");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [cur, setCur] = useState("");
  const [state, setState] = useState<State>("playing");
  const [shake, setShake] = useState(false);

  const newGame = useCallback(() => {
    setAnswer(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setGuesses([]);
    setCur("");
    setState("playing");
    sSelect();
  }, []);

  // pick a fresh word on mount (client only, avoids SSR mismatch)
  useEffect(() => {
    setAnswer(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }, []);

  const submit = useCallback(() => {
    if (cur.length !== COLS) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    const next = [...guesses, cur];
    setGuesses(next);
    setCur("");
    if (cur === answer) {
      setState("won");
      sPassed();
    } else if (next.length >= ROWS) {
      setState("lost");
      sWasted();
    } else {
      sMove();
    }
  }, [cur, guesses, answer]);

  const press = useCallback(
    (k: string) => {
      if (state !== "playing") return;
      if (k === "enter") submit();
      else if (k === "back") setCur((c) => c.slice(0, -1));
      else if (/^[a-z]$/.test(k) && cur.length < COLS) setCur((c) => c + k);
    },
    [state, submit, cur]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") press("enter");
      else if (e.key === "Backspace") press("back");
      else if (/^[a-zA-Z]$/.test(e.key)) press(e.key.toLowerCase());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press]);

  // per-letter keyboard colouring
  const keyState: Record<string, "g" | "y" | "b"> = {};
  guesses.forEach((g) => {
    const s = score(g, answer);
    for (let i = 0; i < COLS; i++) {
      const prev = keyState[g[i]];
      const rank = { g: 3, y: 2, b: 1 } as const;
      if (!prev || rank[s[i]] > rank[prev]) keyState[g[i]] = s[i];
    }
  });

  const cellColor = (st: "g" | "y" | "b") =>
    st === "g" ? "bg-money border-money text-black" : st === "y" ? "bg-gold border-gold text-black" : "bg-black/40 border-sand-dim/40 text-sand";

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="max-w-xl text-center text-sm leading-relaxed text-sand-dim">
        Six tries to guess the five-letter word. Green = right spot, gold = wrong spot. Type on your
        keyboard or tap below.
      </p>

      {/* grid */}
      <div className={`flex flex-col gap-1.5 ${shake ? "animate-[shake_0.4s]" : ""}`}>
        {Array.from({ length: ROWS }).map((_, r) => {
          const g = guesses[r];
          const isCur = r === guesses.length && state === "playing";
          const s = g ? score(g, answer) : null;
          return (
            <div key={r} className="flex gap-1.5">
              {Array.from({ length: COLS }).map((_, c) => {
                const ch = g ? g[c] : isCur ? cur[c] : "";
                return (
                  <div
                    key={c}
                    className={`grid h-12 w-12 place-items-center border-2 text-2xl font-bold uppercase transition-colors sm:h-14 sm:w-14 ${
                      s ? cellColor(s[c]) : ch ? "border-sand-dim text-paper" : "border-sand-dim/30 text-paper"
                    }`}
                  >
                    {ch}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* result */}
      {state !== "playing" && (
        <div className="flex flex-col items-center gap-2">
          <span className={`font-display text-3xl text-stroke-sm ${state === "won" ? "text-money" : "text-health"}`}>
            {state === "won" ? "Mission Passed" : "Mission Failed"}
          </span>
          {state === "lost" && (
            <span className="text-sm uppercase tracking-widest text-sand-dim">
              Word was <span className="text-gold">{answer}</span>
            </span>
          )}
          <button
            onClick={newGame}
            className="mt-1 border-2 border-gold bg-gold/10 px-5 py-2 text-sm font-bold uppercase tracking-wide text-gold transition-colors hover:bg-gold hover:text-black"
          >
            New word
          </button>
        </div>
      )}

      {/* keyboard */}
      {state === "playing" && (
        <div className="flex flex-col items-center gap-1.5">
          {KEYS.map((row, ri) => (
            <div key={ri} className="flex gap-1.5">
              {ri === 2 && (
                <button onClick={() => press("enter")} className="rounded bg-sand-dim/30 px-2.5 text-xs font-bold uppercase text-sand hover:bg-sand-dim/50">
                  Enter
                </button>
              )}
              {row.split("").map((k) => (
                <button
                  key={k}
                  onClick={() => press(k)}
                  className={`grid h-11 w-7 place-items-center rounded text-sm font-bold uppercase sm:w-9 ${
                    keyState[k] === "g"
                      ? "bg-money text-black"
                      : keyState[k] === "y"
                      ? "bg-gold text-black"
                      : keyState[k] === "b"
                      ? "bg-black/60 text-sand-dim"
                      : "bg-sand-dim/25 text-paper hover:bg-sand-dim/40"
                  }`}
                >
                  {k}
                </button>
              ))}
              {ri === 2 && (
                <button onClick={() => press("back")} className="rounded bg-sand-dim/30 px-2.5 text-xs font-bold uppercase text-sand hover:bg-sand-dim/50">
                  ⌫
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}`}</style>
    </div>
  );
}
