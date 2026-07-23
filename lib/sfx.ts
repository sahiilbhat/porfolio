/* Original synthesized SFX via Web Audio — no game assets used. */

let AC: AudioContext | null = null;
let enabled = true;

export function setSfxEnabled(on: boolean) {
  enabled = on;
}

export function audioCtx(): AudioContext {
  if (!AC) {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    AC = new Ctx();
  }
  if (AC.state === "suspended") AC.resume();
  return AC;
}

function tone(freq: number, dur: number, type: OscillatorType = "square", vol = 0.08, when = 0, force = false) {
  if (!enabled && !force) return;
  try {
    const a = audioCtx();
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(vol, a.currentTime + when);
    g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + when + dur);
    o.connect(g).connect(a.destination);
    o.start(a.currentTime + when);
    o.stop(a.currentTime + when + dur + 0.02);
  } catch {
    /* audio not available */
  }
}

export const sMove = () => tone(150, 0.06, "square", 0.06);
export const sSelect = () => {
  tone(220, 0.07, "square", 0.08);
  tone(330, 0.09, "square", 0.07, 0.06);
};
export const sBack = () => {
  tone(180, 0.07, "square", 0.07);
  tone(120, 0.1, "square", 0.06, 0.05);
};
export const sPassed = () => {
  [262, 330, 392, 523].forEach((f, i) => tone(f, 0.28, "triangle", 0.09, i * 0.13));
  tone(659, 0.5, "triangle", 0.09, 0.52);
};
export const sCash = () => tone(880, 0.04, "square", 0.05);
export const sWasted = () => tone(90, 0.6, "sawtooth", 0.08);

/* ---------- radio fallback: original lo-fi west-coast-ish groove ---------- */
let radioTimer: ReturnType<typeof setInterval> | null = null;

export function startSynthRadio(): void {
  stopSynthRadio();
  const bass = [110, 110, 130.81, 110, 98, 98, 87.31, 98]; // A A C A G G F G
  const lead = [440, 0, 523.25, 0, 392, 0, 349.23, 392];
  let step = 0;
  const stepMs = 280; // ~107bpm eighths
  radioTimer = setInterval(() => {
    const i = step % 8;
    tone(bass[i], 0.24, "triangle", 0.09, 0, true);
    if (step % 2 === 0) tone(6000, 0.03, "square", 0.015, 0, true); // hat tick
    if (step % 16 >= 8 && lead[i]) tone(lead[i], 0.22, "sine", 0.045, 0, true);
    step++;
  }, stepMs);
}

export function stopSynthRadio(): void {
  if (radioTimer) {
    clearInterval(radioTimer);
    radioTimer = null;
  }
}

/* ---------- horse-race ambience: galloping hoofbeats + crowd energy ---------- */
let raceTimer: ReturnType<typeof setInterval> | null = null;

export function startRaceLoop(): void {
  stopRaceLoop();
  // gallop rhythm: ba-da-dum with a gap, plus a light rail tick
  const gallop: (number | null)[] = [96, 120, 150, null];
  let step = 0;
  raceTimer = setInterval(() => {
    const i = step % gallop.length;
    const f = gallop[i];
    if (f) tone(f, 0.08, "sine", 0.09, 0, true);
    if (step % 2 === 0) tone(7200, 0.015, "square", 0.01, 0, true); // crowd/rail tick
    if (step % 8 === 0) tone(70, 0.35, "triangle", 0.05, 0, true); // low crowd swell
    step++;
  }, 105);
}

export function stopRaceLoop(): void {
  if (raceTimer) {
    clearInterval(raceTimer);
    raceTimer = null;
  }
}
