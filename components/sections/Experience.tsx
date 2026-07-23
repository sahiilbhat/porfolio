import Reveal from "@/components/Reveal";
import { experience } from "@/data/profile";
import Section from "./Section";

export default function Experience() {
  return (
    <Section id="experience" kicker="Career" title="Experience">
      <div className="relative flex flex-col gap-6 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-[2px] before:bg-sand-dim/25 sm:before:left-[9px]">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 90} className="relative pl-8 sm:pl-10">
            {/* timeline node */}
            <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-gold bg-ink shadow-[0_0_0_4px_rgba(216,169,41,0.15)]" />
            <div className="card px-5 py-4 transition-colors hover:border-gold/50">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="flex items-baseline gap-2 text-lg font-bold uppercase tracking-[0.05em] text-paper">
                  {job.company}
                  {job.url && (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold normal-case tracking-normal text-gold hover:underline"
                    >
                      ↗ site
                    </a>
                  )}
                </h3>
                <span className="text-xs uppercase tracking-[0.12em] text-gold">{job.period}</span>
              </div>
              <div className="mt-0.5 text-sm text-sand-dim">
                {job.role} · {job.place}
              </div>
              <ul className="mt-3 flex flex-col gap-2">
                {job.points.map((p) => (
                  <li
                    key={p}
                    className="relative pl-5 text-[0.95rem] leading-relaxed text-sand before:absolute before:left-0 before:font-bold before:text-money before:content-['+']"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
