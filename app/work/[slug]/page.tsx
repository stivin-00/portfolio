import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy, profile } from "@/lib/data";
import ProjectMark from "@/components/ProjectMark";
import ScrollFx from "@/components/ScrollFx";
import TornDivider from "@/components/TornDivider";
import TrackedLink from "@/components/TrackedLink";
import styles from "./CaseStudy.module.css";

type Params = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const c = getCaseStudy(params.slug);
  if (!c) return {};
  const title = `${c.name}: ${c.kind} case study`;
  return {
    title,
    description: c.summary,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${c.slug}`,
      title: `${title} | ${profile.name}`,
      description: c.summary,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${profile.name}`,
      description: c.summary,
    },
  };
}

const ROMAN = ["I", "II", "III", "IV", "V"];

export default function CaseStudyPage({ params }: Params) {
  const c = getCaseStudy(params.slug);
  if (!c) notFound();

  const i = caseStudies.findIndex((x) => x.slug === c.slug);
  const prev = caseStudies[(i - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(i + 1) % caseStudies.length];

  const sections = [
    { id: "problem", label: "The problem", content: <p>{c.problem}</p> },
    {
      id: "what-i-did",
      label: "What I did",
      content: (
        <ul className={styles.list}>
          {c.approach.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      ),
    },
    {
      id: "stack",
      label: "Stack",
      content: (
        <ul className={styles.tags}>
          {c.stack.map((s) => (
            <li key={s} className={styles.tag}>
              {s}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "outcome",
      label: "Outcome",
      content: (
        <ul className={styles.list}>
          {c.outcome.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      ),
    },
    {
      id: "links",
      label: "Links",
      content:
        c.links.length > 0 ? (
          <ul className={styles.linkList}>
            {c.links.map((l) => (
              <li key={l.href}>
                <TrackedLink
                  href={l.href}
                  external
                  className="btn btn-ghost"
                  event="project_view"
                  eventParams={{ project_name: c.name, project_url: l.href }}
                >
                  {l.label} <span aria-hidden="true">↗</span>
                </TrackedLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.muted}>No public link yet.</p>
        ),
    },
  ];

  return (
    <>
      <ScrollFx key={c.slug} />
      <main id="main" tabIndex={-1}>
        <article aria-labelledby="case-title">
          <header className={styles.header}>
            <div className="shell">
              <a href="/#case-files" className={styles.back}>
                <span aria-hidden="true">←</span> All case files
              </a>

              <p className="plate-tag stamp-type">
                Case file No. {c.number} — {c.kind}
              </p>

              <div className={styles.headGrid}>
                <div>
                  <h1 id="case-title" className={styles.title}>
                    <span className="mask-line">
                      <span>{c.name}</span>
                    </span>
                  </h1>
                  <p className={`${styles.lede} reveal`}>{c.summary}</p>

                  <dl className={`${styles.meta} reveal`}>
                    <div>
                      <dt>Role</dt>
                      <dd>{c.role}</dd>
                    </div>
                    <div>
                      <dt>Context</dt>
                      <dd>{c.context}</dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd>{c.status}</dd>
                    </div>
                    {c.period && (
                      <div>
                        <dt>Period</dt>
                        <dd>{c.period}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <figure className={`${styles.figure} reveal`}>
                  <div className={styles.markWrap}>
                    <ProjectMark variant={c.mark} />
                  </div>
                  <figcaption className={styles.caption}>
                    Plate {c.number} · {c.name}
                  </figcaption>
                </figure>
              </div>
            </div>
          </header>

          <TornDivider seed={60 + i} />

          <div className={`section ${styles.body}`}>
            <div className="shell">
              {sections.map((s, n) => (
                <section key={s.id} className={`${styles.entry} reveal`} aria-labelledby={`case-${s.id}`}>
                  <h2 id={`case-${s.id}`} className={styles.label}>
                    <span className={styles.numeral}>{ROMAN[n]}.</span> {s.label}
                  </h2>
                  <div className={styles.content}>{s.content}</div>
                </section>
              ))}
            </div>
          </div>

          <nav className={styles.pager} aria-label="More case files">
            <div className={`shell ${styles.pagerInner}`}>
              <Link href={`/work/${prev.slug}`} className={styles.pagerLink}>
                <span className={styles.pagerDir}>← Previous case file</span>
                <span className={styles.pagerName}>{prev.name}</span>
              </Link>
              <Link href={`/work/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
                <span className={styles.pagerDir}>Next case file →</span>
                <span className={styles.pagerName}>{next.name}</span>
              </Link>
            </div>
          </nav>

          <section className={`section ${styles.cta}`} aria-labelledby="case-cta">
            <div className="shell">
              <h2 id="case-cta" className={styles.ctaTitle}>
                Building something similar? <em>Let&apos;s talk.</em>
              </h2>
              <div className={styles.ctaActions}>
                <a href="/#contact" className="btn btn-primary">
                  Get in touch <span aria-hidden="true">→</span>
                </a>
                <TrackedLink
                  href={profile.cv}
                  download="Ekele_Stephen_Agbakwuru_CV.pdf"
                  className="btn btn-ghost"
                  event="resume_download"
                >
                  Download CV <span className="sr-only">(PDF)</span>
                  <span aria-hidden="true">↓</span>
                </TrackedLink>
              </div>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
