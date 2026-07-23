"use client";

import { useEffect, useRef, useState } from "react";
import { startSynthRadio, stopSynthRadio } from "@/lib/sfx";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

type Mode = "off" | "file" | "synth";

export default function AudioToggle() {
  const [mode, setMode] = useState<Mode>("off");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userStopped = useRef(false); // don't auto-restart if the user turned it off

  // Preload the theme file up front so playback is instant on the first gesture.
  useEffect(() => {
    const a = new Audio(`${basePath}/audio/theme.mp3`);
    a.loop = true;
    a.volume = 0.1;
    a.preload = "auto";
    audioRef.current = a;
    return () => {
      a.pause();
      stopSynthRadio();
    };
  }, []);

  // Browsers block audio until a user gesture — start the theme on the first
  // click / key press anywhere on the page (unless the user turned it off).
  useEffect(() => {
    const kick = () => {
      if (userStopped.current || mode !== "off") return;
      void play();
    };
    window.addEventListener("pointerdown", kick, { once: true });
    window.addEventListener("keydown", kick, { once: true });
    return () => {
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("keydown", kick);
    };
  }, [mode]);

  async function play() {
    try {
      await audioRef.current!.play();
      setMode("file");
    } catch {
      startSynthRadio();
      setMode("synth");
    }
  }

  function toggle() {
    if (mode !== "off") {
      userStopped.current = true;
      audioRef.current?.pause();
      stopSynthRadio();
      setMode("off");
      return;
    }
    userStopped.current = false;
    void play();
  }

  const on = mode !== "off";
  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Mute theme music" : "Play theme music"}
      title={on ? "Mute theme" : "Play theme"}
      className="pointer-events-auto grid h-9 w-9 place-items-center border-2 border-sand-dim/50 bg-black/40 text-sand-dim transition-colors hover:border-gold hover:text-gold focus-visible:border-gold focus-visible:text-gold focus-visible:outline-none"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none" />
        {on ? (
          <>
            <path d="M15.5 8.5a5 5 0 0 1 0 7" className="text-money" />
            <path d="M18 6a9 9 0 0 1 0 12" />
          </>
        ) : (
          <>
            <path d="M16 9l5 6" />
            <path d="M21 9l-5 6" />
          </>
        )}
      </svg>
    </button>
  );
}
