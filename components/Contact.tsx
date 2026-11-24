import styles from "./Contact.module.css";
import Stamp from "./Stamp";
import TrackedLink from "./TrackedLink";
import { profile } from "@/lib/data";

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    event: "email_click",
    external: false,
  },
  {
    label: "WhatsApp",
    value: "Message me on WhatsApp",
    href: profile.whatsapp,
    event: "whatsapp_click",
    external: true,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s+/g, "")}`,
    event: "phone_click",
    external: false,
  },
  {
    label: "LinkedIn",
    value: "in/ekelestephenagbakwuru",
    href: profile.linkedin,
    event: "linkedin_click",
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/stivin-00",
    href: profile.github,
    event: "github_click",
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="shell">
        <h2 id="contact-title" className="plate-tag stamp-type">
          Contact — Correspondence
        </h2>

        <div className={`${styles.wrap} reveal`}>
          <div>
            <h3 className={styles.big}>
              Have something to build?{" "}
              <TrackedLink href={`mailto:${profile.email}`} className={styles.bigLink} event="email_click">
                Let&apos;s talk.
              </TrackedLink>
            </h3>
            <p className={styles.note}>
              Open to {profile.currently.openTo}.{" "}
              {/* TODO: set profile.responseTime in lib/data.ts once you're sure of it. */}
              {profile.responseTime ?? "Email and WhatsApp both reach me directly."}
            </p>
          </div>

          <div className={styles.stampWrap}>
            <Stamp size={128} inner="OPEN TO WORK" id="stamp-contact" />
          </div>
        </div>

        <ul className={styles.channels}>
          {channels.map((c) => (
            <li key={c.label}>
              <TrackedLink href={c.href} external={c.external} className={styles.channel} event={c.event}>
                <span className={styles.channelLabel}>{c.label}</span>
                <span className={styles.channelValue}>{c.value}</span>
                <span className={styles.channelArrow} aria-hidden="true">
                  {c.external ? "↗" : "→"}
                </span>
              </TrackedLink>
            </li>
          ))}
        </ul>

        <div className={styles.cvSection}>
          <TrackedLink
            href={profile.cv}
            download="Ekele_Stephen_Agbakwuru_CV.pdf"
            className={styles.cvButton}
            event="resume_download"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CV / Résumé <span className="sr-only">(PDF)</span>
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
