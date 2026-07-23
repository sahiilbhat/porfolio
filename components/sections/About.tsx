import Reveal from "@/components/Reveal";
import Section from "./Section";

const FACTS = [
  "React / Next.js / TypeScript",
  "Frontend Architecture Lead",
  "GraphQL · PostGraphile",
  "Bachelor of Engineering, Information Technology",
];

export default function About() {
  return (
    <Section id="about" kicker="Who I am" title="About">
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-5">
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-sand">
              I&apos;m a Senior Software Engineer based in Gurugram, India, with 5+ years building
              scalable, high-performance web applications in React, Next.js, and TypeScript.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lg leading-relaxed text-sand-dim">
              I own features end-to-end — from component systems and real-time UIs to the GraphQL
              and Node services behind them. I care about mentoring engineers, driving design-system
              adoption, and shipping performance-critical products for enterprise clients.
            </p>
          </Reveal>
        </div>
        <Reveal delay={220} className="flex flex-col gap-3">
          {FACTS.map((f) => (
            <div
              key={f}
              className="card flex items-center gap-3 px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-sand"
            >
              <span className="text-gold">▹</span>
              {f}
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
