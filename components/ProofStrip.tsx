import styles from "./ProofStrip.module.css";
import { proofPoints } from "@/lib/data";

const EXHIBITS = "ABCDEFGH";

/** "What I bring": short, evidence-backed findings right under the hero. */
export default function ProofStrip() {
  return (
    <section id="proof" className={`section ${styles.section}`} aria-labelledby="proof-title">
      <div className="shell">
        <h2 id="proof-title" className="plate-tag stamp-type">
          Findings — What I Bring
        </h2>
        <ol className={styles.grid}>
          {proofPoints.map((p, i) => (
            <li key={p.title} className={`${styles.item} reveal`}>
              <span className={styles.exhibit}>Exhibit {EXHIBITS[i]}</span>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.body}>{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
