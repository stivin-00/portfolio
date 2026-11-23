import styles from "./About.module.css";
import { profile, education, languages } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="shell">
        <h2 id="about-title" className="plate-tag stamp-type">
          About — Subject
        </h2>

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
                I&apos;m {profile.name}, also known as {profile.handle}: a frontend and
                full-stack engineer in {profile.location} with {profile.experience} of
                experience across fintech, logistics, healthcare and enterprise products. I
                own features end to end: component architecture, API design, deployment.
              </p>
              <p className="reveal">
                I&apos;m also the co-founder of HomexGrid, a housing platform where I
                architected the backend and wrote the full product documentation suite.
              </p>
              <p className="reveal">
                I lean toward professional, standard conventions over anything overly
                clever, and I document what I build as I go, so the next person (often
                future me) isn&apos;t left guessing.
              </p>
            </div>

            <dl className={styles.facts}>
              {education.map((e) => (
                <div key={e.school} className={`${styles.factRow} reveal`}>
                  <dt className={styles.factLabel}>{e.credential}</dt>
                  <dd className={styles.factValue}>
                    {e.school}, {e.period}
                  </dd>
                </div>
              ))}
              <div className={`${styles.factRow} reveal`}>
                <dt className={styles.factLabel}>Languages</dt>
                <dd className={styles.factValue}>
                  {languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(", ")}
                </dd>
              </div>
              <div className={`${styles.factRow} reveal`}>
                <dt className={styles.factLabel}>Works</dt>
                <dd className={styles.factValue}>{profile.workPreference}, from {profile.location}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
