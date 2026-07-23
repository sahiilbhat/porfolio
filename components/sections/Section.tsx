import Reveal from "@/components/Reveal";

export default function Section({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <Reveal>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.3em] text-rust">{kicker}</p>
          <h2
            className="font-script text-4xl font-normal leading-tight text-[#d6def5] sm:text-6xl"
            style={{ textShadow: "2px 3px 0 rgba(0,0,0,0.85), 0 0 22px rgba(150,170,255,0.18)" }}
          >
            {title}
          </h2>
          <div className="mt-4 h-[3px] w-16 bg-gradient-to-r from-gold to-transparent" />
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
