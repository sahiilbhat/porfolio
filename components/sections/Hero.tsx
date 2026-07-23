"use client";

import { profile } from "@/data/profile";
import { sSelect } from "@/lib/sfx";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center px-4 pt-24 pb-16 sm:px-8"
    >
      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-4 animate-fade-in-up text-xs font-bold uppercase tracking-[0.35em] text-gold [animation-delay:60ms]">
          Portfolio
        </p>

        <h1 className="animate-fade-in-up font-display text-[clamp(2.6rem,11vw,7rem)] font-normal leading-[0.92] text-stroke glow-sand [animation-delay:120ms]">
          <span className="text-paper">{profile.name.first}</span>{" "}
          <span className="text-gold">{profile.name.last}</span>
        </h1>

        <p className="mt-3 animate-fade-in-up font-script text-[clamp(1.4rem,4.5vw,2.4rem)] text-sand [animation-delay:220ms] [text-shadow:3px_3px_0_#000]">
          {profile.tagline}
        </p>

        <p className="mt-6 max-w-xl animate-fade-in-up text-base leading-relaxed text-sand-dim [animation-delay:300ms]">
          Software engineer &amp; architect with 5+ years building scalable, high-performance web
          applications in React, Next.js, and TypeScript.
        </p>

        <div className="mt-9 flex animate-fade-in-up flex-wrap gap-3 [animation-delay:380ms]">
          <a
            href="#projects"
            onClick={sSelect}
            className="group inline-flex items-center gap-2 border-2 border-gold bg-gold/10 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-gold transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold hover:text-black hover:shadow-[0_10px_24px_-8px_rgba(216,169,41,0.6)]"
          >
            View projects
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#contact"
            onClick={sSelect}
            className="btn-ghost inline-flex items-center px-6 py-3"
          >
            Get in touch
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={sSelect}
            className="btn-ghost inline-flex items-center gap-2 px-6 py-3"
          >
            Download résumé
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to content"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-float flex-col items-center gap-1 text-sand-dim transition-colors hover:text-gold sm:flex"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.2em]">Scroll</span>
        <span className="text-lg">↓</span>
      </a>
    </section>
  );
}
