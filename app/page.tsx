import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import MapSection from "@/components/sections/MapSection";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative z-10">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <MapSection />
      <Contact />
    </main>
  );
}
