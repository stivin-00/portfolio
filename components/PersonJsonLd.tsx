import { education, experience, profile, stackGroups } from "@/lib/data";

/** schema.org ProfilePage + Person, for search engines (home page only). */
export default function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: profile.site,
    mainEntity: {
      "@type": "Person",
      "@id": `${profile.site}/#person`,
      name: profile.name,
      alternateName: profile.handle,
      jobTitle: profile.role,
      description: profile.summary,
      url: profile.site,
      image: `${profile.site}/og-image.png`,
      email: `mailto:${profile.email}`,
      telephone: profile.phone.replace(/\s+/g, ""),
      address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
      sameAs: [profile.github, profile.linkedin],
      worksFor: { "@type": "Organization", name: experience[0].company },
      alumniOf: education.map((e) => ({ "@type": "EducationalOrganization", name: e.school })),
      knowsAbout: stackGroups.flatMap((g) => g.items.map((i) => i.name)).slice(0, 30),
    },
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: all values come from lib/data.ts.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
