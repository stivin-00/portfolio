import Hero from "@/components/Hero";
import HeroSpecimen from "@/components/HeroSpecimen";
import ProofStrip from "@/components/ProofStrip";
import Featured from "@/components/Featured";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
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
        <Hero backdrop={<HeroSpecimen />} />
        <ProofStrip />
        <TornDivider seed={11} />
        <Featured />
        <Projects />
        <TornDivider seed={22} />
        <Experience />
        <TornDivider seed={33} />
        <Skills />
        <TornDivider seed={44} />
        <Services />
        <TornDivider seed={55} />
        <About />
        <TornDivider seed={66} />
        {/* Hidden until real quotes are added in lib/data.ts. */}
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
