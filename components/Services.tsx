import Link from "next/link";
import styles from "./Services.module.css";
import { getCaseStudy, profile, services } from "@/lib/data";
import TrackedLink from "./TrackedLink";

const ENQUIRY = `mailto:${profile.email}?subject=${encodeURIComponent("Website project enquiry")}`;

/** Freelance offer: corporate websites on Next.js + headless CMS. */
export default function Services() {
  const proof = getCaseStudy(services.proofSlug);

  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="shell">
        <h2 id="services-title" className="plate-tag stamp-type">
          Services — Commissions
        </h2>

        <div className={styles.grid}>
          <div>
            <p className={`${styles.kicker} reveal`}>Freelance · Corporate websites</p>
            <h3 className={`${styles.title} reveal`}>{services.title}</h3>
            <p className={`${styles.intro} reveal`}>{services.intro}</p>
            {proof && (
              <p className={`${styles.proof} reveal`}>
                <span className={styles.proofLabel}>Recent work</span>
                <Link href={`/work/${proof.slug}`}>softsuite.com and softkloud.com</Link>, built in
                Next.js on Strapi.
              </p>
            )}
            {services.pricingNote && <p className={`${styles.pricing} reveal`}>{services.pricingNote}</p>}
            <div className={`${styles.actions} reveal`}>
              <TrackedLink
                href={ENQUIRY}
                className="btn btn-primary"
                event="cta_click"
                eventParams={{ cta_name: "Start a website project" }}
              >
                Start a website project <span aria-hidden="true">→</span>
              </TrackedLink>
              <TrackedLink href={profile.whatsapp} external className="btn btn-ghost" event="whatsapp_click">
                Message me on WhatsApp <span aria-hidden="true">↗</span>
              </TrackedLink>
            </div>
          </div>

          <ol className={styles.offer} aria-label="What's included">
            {services.offer.map((o, i) => (
              <li key={o.name} className={`${styles.item} reveal`}>
                <span className={styles.index} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className={styles.name}>{o.name}</h4>
                  <p className={styles.note}>{o.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
