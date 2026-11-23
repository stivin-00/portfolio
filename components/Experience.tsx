import styles from "./Experience.module.css";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="shell">
        <h2 className="plate-tag stamp-type">Experience — Achievements &amp; Employment</h2>

        <div className={styles.list}>
          {experience.map((e) => (
            <div key={e.company} className={`${styles.entry} reveal`}>
              <div className={styles.period}>
                {e.period}
                <span className={styles.location}>{e.location}</span>
              </div>
              <div>
                <div className={styles.company}>{e.company}</div>
                <div className={styles.role}>{e.role}</div>
                <ul className={styles.achievements}>
                  {e.achievements.map((achievement, idx) => (
                    <li key={idx} className={styles.achievement}>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
