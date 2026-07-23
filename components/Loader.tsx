"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("booted")) {
      setGone(true);
      return;
    }
    setMounted(true);
    const t1 = setTimeout(() => setDone(true), 1700); // start fade
    const t2 = setTimeout(() => {
      sessionStorage.setItem("booted", "1");
      setGone(true);
    }, 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-black transition-opacity duration-700 ${
        done ? "opacity-0" : "opacity-100"
      } ${mounted ? "" : "opacity-100"}`}
    >
      {/* Rockstar-style mark: gold rounded square + star + initials */}
      <div className="relative grid h-28 w-28 place-items-center rounded-[1.4rem] bg-gold shadow-[0_10px_40px_-6px_rgba(216,169,41,0.5)]">
        <span className="font-display text-6xl leading-none text-black">S</span>
        <span className="absolute -bottom-2 -right-2 text-4xl text-black drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
          ★
        </span>
      </div>

      <div
        className="font-script text-2xl text-[#d6def5]"
        style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.8)" }}
      >
        Sahil Bhat
      </div>

      {/* loading bar */}
      <div className="mt-2 h-1.5 w-56 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-1/3 animate-[loadbar_1.7s_ease-in-out_forwards] bg-gradient-to-r from-gold to-rust" />
      </div>
      <span className="text-[0.7rem] uppercase tracking-[0.3em] text-sand-dim">Loading…</span>

      <style>{`@keyframes loadbar{0%{width:0}100%{width:100%}}`}</style>
    </div>
  );
}
