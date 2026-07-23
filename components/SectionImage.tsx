"use client";

import { useEffect, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/* Order matches the sections down the page. Each gets a beach/palm image
   that fades in (low opacity) in the top-right as its section scrolls in. */
const MAP: { id: string; src: string }[] = [
  { id: "top", src: `${basePath}/images/beach1.jpg` },
  { id: "about", src: `${basePath}/images/beach2.jpg` },
  { id: "experience", src: `${basePath}/images/beach3.jpg` },
  { id: "skills", src: `${basePath}/images/beach4.jpg` },
  { id: "projects", src: `${basePath}/images/beach5.jpg` },
  { id: "map", src: `${basePath}/images/beach6.jpg` },
  { id: "contact", src: `${basePath}/images/beach7.jpg` },
];

export default function SectionImage() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    MAP.forEach((m) => {
      const el = document.getElementById(m.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div
      className="pointer-events-none fixed right-0 top-0 z-0 h-[52vh] w-[62vw] max-w-[760px]"
      aria-hidden="true"
      style={{
        WebkitMaskImage:
          "linear-gradient(to left, #000 10%, transparent 85%), linear-gradient(to bottom, #000 25%, transparent 92%)",
        WebkitMaskComposite: "source-in",
        maskImage:
          "linear-gradient(to left, #000 10%, transparent 85%), linear-gradient(to bottom, #000 25%, transparent 92%)",
        maskComposite: "intersect",
      }}
    >
      {MAP.map((m) => (
        <img
          key={m.id}
          src={m.src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            active === m.id ? "opacity-[0.22]" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
