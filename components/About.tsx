import styles from "./About.module.css";
import { profile, education } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <div className="plate-tag stamp-type">About — Subject</div>

        <div className={styles.grid}>
          <p className={styles.statement}>
            <span className="mask-line">
              <span>I care about the join between</span>
            </span>{" "}
            <span className="mask-line">
              <span>
                <em>what a product looks like</em>
              </span>
            </span>{" "}
            <span className="mask-line">
              <span>and how it actually works underneath.</span>
            </span>
          </p>

          <div>
            <div className={styles.body}>
              <p className="reveal">
                I&apos;m {profile.name}, working under the name Stivin — a frontend and
                full-stack engineer based in {profile.location}. Over the last{" "}
                {profile.experience}, I&apos;ve shipped production interfaces across
                fintech, logistics, healthcare and enterprise platforms, usually owning
                the feature end-to-end: component architecture, API design, deployment.
              </p>
              <p className="reveal">
                I lean toward professional, standard conventions over anything overly
                clever, and I document what I build as I go, so the next person — often
                future me — isn&apos;t left guessing.
              </p>
            </div>

            <div className={styles.facts}>
              {education.map((e) => (
                <div key={e.school} className={`${styles.factRow} reveal`}>
                  <span className={styles.factLabel}>{e.credential}</span>
                  <span className={styles.factValue}>
                    {e.school}, {e.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
