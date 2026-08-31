"use client";

import styles from "./Contact.module.css";
import Stamp from "./Stamp";
import { profile } from "@/lib/data";
import {
  trackEmailClick,
  trackGitHubClick,
  trackLinkedInClick,
  trackPhoneClick,
  trackResumeDownload,
} from "@/lib/analytics";

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="shell">
        <div className="plate-tag stamp-type">Contact — Correspondence</div>

        <div className={`${styles.wrap} reveal`}>
          <h2 className={styles.big}>
            Have something to build?{" "}
            <a
              href={`mailto:${profile.email}`}
              className={styles.bigLink}
              onClick={trackEmailClick}
            >
              Let&apos;s talk.
            </a>
          </h2>

          <div className={styles.stampWrap}>
            <Stamp size={128} inner="OPEN TO WORK" />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.col}>
            Email
            <a href={`mailto:${profile.email}`} onClick={trackEmailClick}>
              {profile.email}
            </a>
          </div>
          <div className={styles.col}>
            Phone
            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              onClick={trackPhoneClick}
            >
              {profile.phone}
            </a>
          </div>
          {/* <div className={styles.col}>
            Based in
            <span className="value">{profile.location}</span>
          </div> */}
          <div className={styles.col}>
            Elsewhere
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackGitHubClick}
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackLinkedInClick}
            >
              LinkedIn
            </a>
            <a href={profile.site} target="_blank" rel="noopener noreferrer">
              stivin.vercel.app
            </a>
          </div>
        </div>

        <div className={styles.cvSection}>
          <a
            href="/Ekele_Stephen_Agbakwuru_CV.pdf"
            download="Ekele_Stephen_Agbakwuru_CV.pdf"
            className={styles.cvButton}
            onClick={trackResumeDownload}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CV / Résumé
          </a>
        </div>
      </div>
    </section>
  );
}
