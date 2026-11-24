import Link from "next/link";
import styles from "./Featured.module.css";
import { featuredCase as c } from "@/lib/data";
import ProjectMark from "./ProjectMark";
import TrackedLink from "./TrackedLink";

/** Featured case file (HomexGrid): problem, approach, stack and result on the home page. */
export default function Featured() {
  return (
    <section id="work" className="section" aria-labelledby="featured-title">
      <div className="shell">
        <h2 id="featured-title" className="plate-tag stamp-type">
          Featured — Case File No. {c.number}
        </h2>

        <div className={styles.head}>
          <div>
            <p className={`${styles.kind} reveal`}>
              {c.kind} · {c.context}
              {c.period ? ` · ${c.period}` : ""}
            </p>
            <h3 className={styles.name}>
              <span className="mask-line">
                <span>{c.name}</span>
              </span>
            </h3>
            <p className={`${styles.summary} reveal`}>{c.summary}</p>
            <p className={`${styles.role} reveal`}>
              <span className={styles.roleLabel}>Role</span> {c.role}
            </p>
          </div>

          <div className={`${styles.figure} reveal`}>
            <div className={styles.markWrap}>
              <ProjectMark variant={c.mark} />
            </div>
            <span className={styles.status}>{c.status}</span>
          </div>
        </div>

        <dl className={styles.ledger}>
          <div className={`${styles.cell} reveal`}>
            <dt>I. Problem</dt>
            <dd>
              <p>{c.problem}</p>
            </dd>
          </div>
          <div className={`${styles.cell} reveal`}>
            <dt>II. Approach</dt>
            <dd>
              <ul className={styles.list}>
                {c.approach.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div className={`${styles.cell} reveal`}>
            <dt>III. Stack</dt>
            <dd>
              <ul className={styles.tags}>
                {c.stack.map((s) => (
                  <li key={s} className={styles.tag}>
                    {s}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className={`${styles.cell} reveal`}>
            <dt>IV. Result</dt>
            <dd>
              <ul className={styles.list}>
                {c.outcome.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <div className={`${styles.actions} reveal`}>
          <Link href={`/work/${c.slug}`} className="btn btn-primary">
            Read the {c.name} case file <span aria-hidden="true">→</span>
          </Link>
          {c.links.map((l) => (
            <TrackedLink
              key={l.href}
              href={l.href}
              external
              className="btn btn-ghost"
              event="project_view"
              eventParams={{ project_name: c.name, project_url: l.href }}
            >
              {l.label} <span aria-hidden="true">↗</span>
            </TrackedLink>
          ))}
        </div>
      </div>
    </section>
  );
}
