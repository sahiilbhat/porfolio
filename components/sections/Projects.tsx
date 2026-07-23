import Reveal from "@/components/Reveal";
import { projects } from "@/data/profile";
import Section from "./Section";

export default function Projects() {
  return (
    <Section id="projects" kicker="Portfolio" title="Selected work">
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((p, i) => {
          const Tag = p.url ? "a" : "article";
          return (
            <Reveal key={p.name} delay={i * 90} className="h-full">
              <Tag
                {...(p.url ? { href: p.url, target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`card group flex h-full flex-col p-5 transition-all duration-200 hover:-translate-y-1 hover:border-gold hover:shadow-[0_14px_30px_-10px_rgba(0,0,0,0.7)] ${
                  p.url ? "cursor-pointer" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-xl font-normal text-paper text-stroke-sm">
                    {p.name}
                  </h3>
                  {p.url && (
                    <span className="mt-1 shrink-0 text-lg text-gold transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-rust">
                  {p.tag}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-sand-dim">{p.blurb}</p>
                <ul className="mt-4 flex flex-col gap-2 border-t border-sand-dim/20 pt-4">
                  {p.points.map((pt) => (
                    <li
                      key={pt}
                      className="relative pl-4 text-[0.82rem] leading-snug text-sand before:absolute before:left-0 before:text-gold before:content-['›']"
                    >
                      {pt}
                    </li>
                  ))}
                </ul>
                {p.url && (
                  <span className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-gold">
                    Visit site →
                  </span>
                )}
              </Tag>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
