import styles from "./Skills.module.css";
import { stack } from "@/lib/data";

export default function Skills() {
  return (
    <section id="stack" className="section">
      <div className="shell">
        <div className="plate-tag stamp-type">Stack — Index of Materials</div>

        <div className={styles.list}>
          {stack.map((s, i) => (
            <div key={s.name} className={`${styles.item} reveal`}>
              <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.name}>{s.name}</span>
              <span className={styles.leader} aria-hidden="true" />
              <span className={styles.note}>{s.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
