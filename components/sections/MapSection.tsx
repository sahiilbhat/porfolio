import { locations } from "@/data/profile";
import Section from "./Section";

const gurgaon = locations.find((l) => l.id === "gurgaon")!;

export default function MapSection() {
  return (
    <Section id="map" kicker="Location" title="Where I'm based">
      <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
        {/* ---- GTA-style circular radar minimap ---- */}
        <div className="relative mx-auto aspect-square w-[260px] shrink-0 sm:w-[300px] md:mx-0">
          <div className="relative h-full w-full overflow-hidden rounded-full border-[3px] border-black bg-[#0e120e] shadow-[0_0_0_3px_#3a2f1c,0_0_0_5px_#000,0_16px_40px_-8px_rgba(0,0,0,0.85)]">
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
              {/* water */}
              <rect width="200" height="200" fill="#12303a" />
              {/* land districts (gang-territory colours) */}
              <path d="M0 0 H130 V60 H70 V120 H0 Z" fill="#243b22" />
              <path d="M130 0 H200 V90 H150 V50 H130 Z" fill="#3a2f14" />
              <path d="M70 60 H130 V130 H80 V90 H70 Z" fill="#2c2438" opacity="0.95" />
              <path d="M0 120 H80 V200 H0 Z" fill="#3a2320" />
              <path d="M150 90 H200 V200 H120 V150 H150 Z" fill="#24352a" />
              <path d="M80 130 H120 V200 H80 Z" fill="#2f2a1a" />

              {/* roads */}
              <g stroke="#c7b487" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round">
                <line x1="70" y1="0" x2="70" y2="200" />
                <line x1="130" y1="0" x2="130" y2="200" />
                <line x1="0" y1="60" x2="200" y2="60" />
                <line x1="0" y1="130" x2="200" y2="130" />
                <line x1="150" y1="60" x2="150" y2="200" />
              </g>
              <g stroke="#8a7a50" strokeOpacity="0.35" strokeWidth="1">
                <line x1="35" y1="0" x2="35" y2="200" />
                <line x1="100" y1="0" x2="100" y2="200" />
                <line x1="0" y1="95" x2="200" y2="95" />
                <line x1="0" y1="165" x2="200" y2="165" />
              </g>

              {/* Gurgaon = player blip, pulsing */}
              <circle cx="100" cy="100" r="7" fill="none" stroke="#d8a929" strokeWidth="1.5">
                <animate attributeName="r" values="7;22" dur="1.9s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0" dur="1.9s" repeatCount="indefinite" />
              </circle>
              <path d="M100 92 L105 104 L100 100 L95 104 Z" fill="#d8a929" stroke="#000" strokeWidth="1" />
            </svg>

            {/* N marker */}
            <span className="pointer-events-none absolute left-1/2 top-1 -translate-x-1/2 font-display text-xs text-gold">
              N
            </span>
            {/* location tag */}
            <span className="pointer-events-none absolute left-1/2 top-[58%] -translate-x-1/2 whitespace-nowrap border border-gold/50 bg-ink/85 px-1.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-gold">
              Gurugram
            </span>
          </div>
        </div>

        {/* ---- side info ---- */}
        <div className="flex flex-col gap-3">
          <span className="font-display text-xl text-gold text-stroke-sm">Current location</span>
          <div className="flex items-center gap-2.5">
            <span className="h-3 w-3 rounded-full border-2 border-black" style={{ background: gurgaon.color }} />
            <span className="text-sm font-bold uppercase tracking-[0.1em] text-paper">
              {gurgaon.place} · 28.46°N 77.03°E
            </span>
          </div>
          <p className="text-sm leading-relaxed text-sand-dim">{gurgaon.blurb}</p>
          <p className="text-sm leading-relaxed text-sand-dim">
            Open to remote roles worldwide and hybrid roles in the Delhi–NCR region.
          </p>
        </div>
      </div>
    </Section>
  );
}
