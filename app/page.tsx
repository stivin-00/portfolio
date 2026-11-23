import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import ScrollFx from "@/components/ScrollFx";
import TornDivider from "@/components/TornDivider";
import IntroSequence from "@/components/IntroSequence";

export default function Home() {
  return (
    <>
      <IntroSequence />
      <ScrollFx />

      <main id="main" tabIndex={-1}>
        <Hero />
        <TornDivider seed={11} />
        <About />
        <TornDivider seed={22} />
        <Skills />
        <TornDivider seed={33} />
        <Experience />
        <TornDivider seed={44} />
        <Projects />
        <TornDivider seed={55} />
        <Contact />
      </main>
    </>
  );
}
