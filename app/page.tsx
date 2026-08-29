"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollFx from "@/components/ScrollFx";
import GrainOverlay from "@/components/GrainOverlay";
import TornDivider from "@/components/TornDivider";
import IntroSequence from "@/components/IntroSequence";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <GrainOverlay />
      <div className="plate-vignette" />
      <Cursor />
      {!introDone && <IntroSequence onDone={() => setIntroDone(true)} />}
      <ScrollFx />

      <Nav />
      <main>
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
      <Footer />
    </>
  );
}
