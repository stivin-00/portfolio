import styles from "./Experience.module.css";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="shell">
        <h2 id="experience-title" className="plate-tag stamp-type">
          Experience — Achievements &amp; Employment
        </h2>

        <ol className={styles.list}>
          {experience.map((e) => (
            <li key={e.company} className={`${styles.entry} reveal`}>
              <p className={styles.period}>
                {e.period}
                <span className={styles.location}>{e.location}</span>
              </p>
              <div>
                <h3 className={styles.company}>{e.company}</h3>
                <p className={styles.role}>{e.role}</p>
                {e.products.length > 0 && (
                  <ul className={styles.products} aria-label="Products">
                    {e.products.map((p) => (
                      <li key={p} className={styles.product}>
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
                <ul className={styles.achievements}>
                  {e.achievements.map((achievement) => (
                    <li key={achievement} className={styles.achievement}>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
