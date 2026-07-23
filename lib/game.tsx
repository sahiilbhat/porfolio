"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { audioCtx, setSfxEnabled } from "./sfx";

type Opts = { sfx: boolean; grain: boolean; trails: boolean };

type Game = {
  opts: Opts;
  toggleOpt: (k: keyof Opts) => void;
};

const GameCtx = createContext<Game>({
  opts: { sfx: true, grain: true, trails: true },
  toggleOpt: () => {},
});

export const useGame = () => useContext(GameCtx);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [opts, setOpts] = useState<Opts>({ sfx: true, grain: true, trails: true });

  /* apply body classes for display options */
  useEffect(() => {
    document.body.classList.toggle("nograin", !opts.grain);
    document.body.classList.toggle("trails", opts.trails);
    setSfxEnabled(opts.sfx);
  }, [opts]);

  /* unlock audio on first user gesture */
  useEffect(() => {
    const unlock = () => audioCtx();
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  const toggleOpt = useCallback((k: keyof Opts) => {
    setOpts((o) => ({ ...o, [k]: !o[k] }));
  }, []);

  return <GameCtx.Provider value={{ opts, toggleOpt }}>{children}</GameCtx.Provider>;
}
