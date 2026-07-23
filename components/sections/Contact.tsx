"use client";

import Reveal from "@/components/Reveal";
import { profile, socials } from "@/data/profile";
import { sMove, sSelect } from "@/lib/sfx";
import Section from "./Section";

export default function Contact() {
  return (
    <Section id="contact" kicker="Get in touch" title="Let's build something">
      <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
        <Reveal className="flex flex-col gap-4">
          <p className="text-lg leading-relaxed text-sand">
            Got a role, a project, or just want to talk shop? The line&apos;s open.
          </p>
          <a
            href={`mailto:${profile.email}`}
            onClick={sSelect}
            className="group inline-flex w-fit items-center gap-2 border-2 border-gold bg-gold/10 px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-gold transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold hover:text-black"
          >
            {profile.email}
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
          <a
            href={`tel:${profile.phone}`}
            className="w-fit text-sm text-sand-dim transition-colors hover:text-gold"
          >
            {profile.phoneDisplay}
          </a>
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-3">
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={sMove}
              onClick={sSelect}
              className="card card-hover flex items-center gap-4 px-4 py-3"
            >
              <span
                className="grid h-10 w-10 shrink-0 place-items-center border-2 border-black font-display text-lg text-black shadow-[0_0_0_2px_rgba(255,255,255,0.2)]"
                style={{ background: s.color }}
              >
                {s.label[0]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="font-bold uppercase tracking-[0.08em] text-paper">{s.label}</span>{" "}
                <span className="text-sm text-gold">{s.handle}</span>
                <span className="mt-0.5 block text-[0.8rem] text-sand-dim">{s.note}</span>
              </span>
              <span className="font-display text-sand-dim">»</span>
            </a>
          ))}
        </Reveal>
      </div>

      <footer className="mt-20 border-t border-sand-dim/20 pt-6 text-center text-xs uppercase tracking-[0.15em] text-sand-dim">
        {profile.name.first} {profile.name.last}
      </footer>
    </Section>
  );
}
