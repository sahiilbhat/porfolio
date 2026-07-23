"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { sMove, sSelect } from "@/lib/sfx";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "map", label: "Location" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState("about");
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);

    let io: IntersectionObserver | null = null;
    if (onHome) {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
        { rootMargin: "-45% 0px -50% 0px" }
      );
      SECTIONS.forEach((l) => {
        const el = document.getElementById(l.id);
        if (el) io!.observe(el);
      });
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      io?.disconnect();
    };
  }, [onHome]);

  const linkClass = (isActive: boolean) =>
    `relative px-2 py-1 font-display text-sm uppercase tracking-[0.06em] transition-colors sm:text-base ${
      isActive
        ? "text-paper [text-shadow:2px_2px_0_#000]"
        : "text-gold/90 [text-shadow:2px_2px_0_#000] hover:text-paper"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid ? "border-b border-sand-dim/20 bg-ink/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-8">
        <a href={`${basePath}/`} onClick={sSelect} className="font-display text-lg text-paper text-stroke-sm sm:text-xl">
          Sahil<span className="text-gold">.</span>
        </a>
        <ul className="flex items-center gap-1 sm:gap-2">
          {SECTIONS.map((l) => {
            const isActive = onHome && active === l.id;
            return (
              <li key={l.id} className="hidden sm:block">
                <a href={`${basePath}/#${l.id}`} onMouseEnter={sMove} onClick={sSelect} className={linkClass(isActive)}>
                  {l.label}
                  <span
                    className={`absolute inset-x-2 -bottom-0.5 h-[2px] bg-gold transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
         {/* <li>
            <a
              href={`${basePath}/games/`}
              onMouseEnter={sMove}
              onClick={sSelect}
              className={`relative px-3 py-1.5 font-display text-sm uppercase tracking-[0.06em] transition-colors sm:text-base ${
                pathname === "/games"
                  ? "border-2 border-gold bg-gold text-black"
                  : "border-2 border-gold/70 text-gold [text-shadow:2px_2px_0_#000] hover:bg-gold hover:text-black"
              }`}
            >
              ▸ Games
            </a>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}
 