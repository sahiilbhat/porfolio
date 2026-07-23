import Reveal from "@/components/Reveal";
import { skillDocs, skillGroups } from "@/data/profile";
import Section from "./Section";

export default function Skills() {
  return (
    <Section id="skills" kicker="Toolkit" title="Skills">
      <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
        {skillGroups.map((g, gi) => (
          <Reveal key={g.title} delay={gi * 80}>
            <h3 className="mb-3 border-b border-sand/20 pb-1 text-sm font-bold uppercase tracking-[0.16em] text-rust">
              {g.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <a
                  key={s}
                  href={skillDocs[s]}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${s} documentation (opens in a new tab)`}
                  title={`Open ${s} documentation`}
                  className="border border-sand-dim/40 bg-black/30 px-2.5 py-1 text-[0.82rem] font-medium tracking-wide text-sand transition-colors hover:border-gold hover:text-paper"
                >
                  {s}
                </a>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
