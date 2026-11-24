import styles from "./Testimonials.module.css";
import { testimonials } from "@/lib/data";
import TornDivider from "./TornDivider";

/**
 * Renders nothing until real quotes are added to `testimonials` in lib/data.ts.
 * TODO: collect 2–3 quotes (with permission) from managers, clients or teammates.
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <>
      <section id="testimonials" className="section" aria-labelledby="testimonials-title">
        <div className="shell">
          <h2 id="testimonials-title" className="plate-tag stamp-type">
            Testimony — On the Record
          </h2>
          <ul className={styles.list}>
            {testimonials.map((t) => (
              <li key={t.name} className={`${styles.item} reveal`}>
                <figure className={styles.figure}>
                  <blockquote className={styles.quote}>
                    <p>&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className={styles.caption}>
                    <span className={styles.name}>{t.name}</span>
                    {t.role}, {t.company}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <TornDivider seed={77} />
    </>
  );
}
