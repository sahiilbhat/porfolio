"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { sPassed, sSelect } from "@/lib/sfx";

const SENTENCES = [
  "The best code is the one you never had to write because a simpler design quietly made the whole feature disappear before anyone noticed",
  "A senior engineer spends less time typing and far more time deleting the parts of the system that should never have existed in the first place",
  "When the build finally turns green and the largest contentful paint drops below two seconds you get to ship the thing you promised the team last week",
  "Good state management is mostly about keeping data close to where it is actually used and refusing to lift it any higher than it truly needs to go",
  "Every abstraction you add is a quiet promise to the next developer that the complexity hidden underneath is genuinely worth the shiny little interface on top",
  "Caching and naming things are famously the hard problems but the truly cursed one is deciding the exact moment a component has grown into three separate components",
];

function speedFact(wpm: number): string {
  if (wpm >= 100) return "Top ~1% of typists — that is genuinely stenographer territory";
  if (wpm >= 80) return "Faster than roughly 95% of people — seriously quick hands";
  if (wpm >= 65) return "Faster than about 80% of people in the world";
  if (wpm >= 50) return "Faster than most people — around a working pro typist";
  if (wpm >= 40) return "Right around the global average of about 40 WPM";
  if (wpm >= 25) return "A little below average — a few more runs will fix that";
  return "Just warming up — give it another go";
}

export default function TypingTest() {
  const [target, setTarget] = useState(SENTENCES[0]);
  const [input, setInput] = useState("");
  const [startAt, setStartAt] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState({ wpm: 0, acc: 0 });
  const [best, setBest] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const restart = useCallback(() => {
    setTarget(SENTENCES[Math.floor(Math.random() * SENTENCES.length)]);
    setInput("");
    setStartAt(null);
    setDone(false);
    setResult({ wpm: 0, acc: 0 });
    sSelect();
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    setTarget(SENTENCES[Math.floor(Math.random() * SENTENCES.length)]);
    const b = Number(localStorage.getItem("type_best_wpm"));
    if (b > 0) setBest(b);
    inputRef.current?.focus();
  }, []);

  // Esc restarts the sentence / game
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") restart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [restart]);

  const live = useMemo(() => {
    const elapsedMin = startAt ? (performance.now() - startAt) / 60000 : 0;
    const correct = input.split("").filter((ch, i) => ch === target[i]).length;
    const acc = input.length ? Math.round((correct / input.length) * 100) : 100;
    const wpm = elapsedMin > 0 ? Math.round(input.length / 5 / elapsedMin) : 0;
    return { acc, wpm };
  }, [input, startAt, target]);

  const onChange = (v: string) => {
    if (done) return;
    if (!startAt && v.length === 1) setStartAt(performance.now());
    const val = v.slice(0, target.length);
    setInput(val);
    if (val.length === target.length) {
      const elapsedMin = (performance.now() - (startAt ?? performance.now())) / 60000;
      const correct = val.split("").filter((ch, i) => ch === target[i]).length;
      const wpm = elapsedMin > 0 ? Math.round(val.length / 5 / elapsedMin) : 0;
      const acc = Math.round((correct / target.length) * 100);
      setResult({ wpm, acc });
      setDone(true);
      if (wpm > best && acc >= 80) {
        setBest(wpm);
        localStorage.setItem("type_best_wpm", String(wpm));
        sPassed();
      } else {
        sSelect();
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-5" onClick={() => inputRef.current?.focus()}>
      <p className="max-w-xl text-center text-sm leading-relaxed text-sand-dim">
        Type the sentence as fast and accurately as you can. Timer starts on your first keystroke ·
        press <span className="text-gold">Esc</span> for a new one.
      </p>

      {/* target with live per-character colouring */}
      <div className="w-full max-w-3xl rounded-[6px] border-2 border-sand-dim/30 bg-black/40 p-5 text-lg leading-relaxed tracking-wide">
        {target.split("").map((ch, i) => {
          let cls = "text-sand-dim";
          if (i < input.length) cls = input[i] === ch ? "text-money" : "bg-health/40 text-paper";
          else if (i === input.length && !done) cls = "border-b-2 border-gold text-paper";
          return (
            <span key={i} className={cls}>
              {ch}
            </span>
          );
        })}
      </div>

      <input
        ref={inputRef}
        value={input}
        disabled={done}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Type here"
        className="sr-only"
        autoFocus
      />

      {!done && (
        <>
          <div className="flex gap-6 font-display text-xl">
            <span className="text-money">{live.wpm} WPM</span>
            <span className="text-gold">{live.acc}% acc</span>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-sand-dim">
            Click here and start typing · Best {best} WPM
          </span>
        </>
      )}

      {done && (
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-display text-4xl text-money text-stroke-sm">{result.wpm} WPM</span>
          <span className="text-sm uppercase tracking-widest text-gold">{result.acc}% accuracy</span>
          <span className="mt-1 max-w-md text-sm leading-relaxed text-sand">{speedFact(result.wpm)}</span>
          {result.wpm >= best && result.acc >= 80 && (
            <span className="text-xs uppercase tracking-[0.2em] text-money">★ New personal best</span>
          )}
          <button
            onClick={restart}
            className="mt-2 border-2 border-gold bg-gold/10 px-5 py-2 text-sm font-bold uppercase tracking-wide text-gold transition-colors hover:bg-gold hover:text-black"
          >
            New sentence (Esc)
          </button>
        </div>
      )}
    </div>
  );
}
