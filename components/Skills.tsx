import styles from "./Skills.module.css";
import { stackGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <div className="shell">
        <h2 id="stack-title" className="plate-tag stamp-type">
          Stack — Index of Materials
        </h2>

        <div className={styles.list}>
          {stackGroups.map((g, i) => (
            <div key={g.group} className={`${styles.item} reveal`}>
              <span className={styles.index} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.name}>{g.group}</h3>
              <span className={styles.leader} aria-hidden="true" />
              <span className={styles.note}>
                {g.items.length} {g.items.length === 1 ? "material" : "materials"}
              </span>
              <ul className={styles.items}>
                {g.items.map((item) => (
                  <li key={item.name}>
                    {item.name}
                    {item.note && <span className={styles.itemNote}> ({item.note})</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
