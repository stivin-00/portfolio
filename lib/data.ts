/**
 * All site copy lives here. Facts only: anything not confirmed is marked with
 * a TODO and written in neutral wording. Search the repo for "TODO" to find
 * everything that still needs your input.
 */

export const profile = {
  name: "Ekele Stephen Agbakwuru",
  handle: "Stivin",
  role: "Frontend / Full-Stack Engineer",
  location: "Lagos, Nigeria",
  experience: "4+ years",
  summary:
    "4+ years shipping production interfaces across fintech, logistics, healthcare and enterprise products, usually owning the feature end to end: component architecture, API design and deployment.",
  email: "ekeleagbakwuru9@gmail.com",
  phone: "+234 812 358 3317",
  whatsapp: "https://wa.me/2348123583317",
  github: "https://github.com/stivin-00",
  linkedin: "https://linkedin.com/in/ekelestephenagbakwuru",
  site: "https://stivin.vercel.app",
  cv: "/Ekele_Stephen_Agbakwuru_CV.pdf",
  workPreference: "Hybrid or remote",
  currently: {
    building: "HomexGrid",
    openTo: "full-time roles (hybrid or remote) and select freelance website projects",
  },
  // TODO: add your real response time once you're sure of it, e.g. "I usually reply within 24 hours."
  // While this is null the contact section shows neutral wording instead.
  responseTime: null as string | null,
};

export type StackItem = { name: string; note?: string };

export const stackGroups: { group: string; items: StackItem[] }[] = [
  {
    group: "Frontend",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Angular", note: "v20 most used" },
      { name: "Vue.js" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Redux Toolkit" },
      { name: "RTK Query" },
      { name: "Tailwind CSS" },
      { name: "Bootstrap" },
      { name: "Material UI" },
      { name: "Ant Design" },
      { name: "Radix UI" },
      { name: "React Hook Form" },
      { name: "Zod" },
      { name: "Framer Motion" },
      { name: "GSAP" },
      { name: "Three.js" },
    ],
  },
  {
    group: "Mobile",
    items: [{ name: "React Native (Expo)" }],
  },
  {
    group: "Backend",
    items: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "NestJS" },
      { name: "Java" },
      { name: "Spring Boot" },
      { name: "REST APIs" },
      { name: "Prisma" },
    ],
  },
  {
    group: "Data",
    items: [{ name: "PostgreSQL" }, { name: "MongoDB" }, { name: "Redis" }, { name: "Flyway" }],
  },
  {
    group: "Integrations",
    items: [
      { name: "Stripe" },
      { name: "Paystack" },
      { name: "Google Calendar API" },
      { name: "WhatsApp Cloud API" },
      { name: "Strapi CMS" },
      { name: "Whisper", note: "on-device speech AI" },
    ],
  },
  {
    group: "Delivery",
    items: [
      { name: "Docker" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "GitLab CI/CD" },
      { name: "Vercel" },
      { name: "Railway" },
      { name: "Agile / Scrum" },
      { name: "TDD" },
      { name: "Code review" },
      { name: "RBAC & JWT auth" },
    ],
  },
];

export const experience = [
  {
    company: "Soft Alliance And Resources Limited",
    role: "Frontend Engineer",
    period: "Jun 2024 — Present",
    location: "Lagos, Nigeria",
    products: ["SoftAce EDMS", "SoftSuite", "SoftPay", "LAWMA Billing Portal", "PlateDetect"],
    achievements: [
      "Lead frontend development of SoftAce EDMS, an Angular document-management system covering document capture, approval workflows and records management, used by enterprise clients across multiple organizations.",
      "Built reusable Angular, React and Vue.js modules shared across four products: SoftSuite (ERP), SoftPay (a payments platform for businesses), the LAWMA Billing Portal and PlateDetect (a traffic-enforcement and incident-monitoring app).",
      "Built WhatsApp Cloud API messaging for PlateDetect, automating offender notices and bill reminders.",
      "Inherited the SoftSuite ERP frontend in vanilla JavaScript, led its migration to TypeScript and built its shared component library.",
      "Worked with a mobile teammate on the SoftSuite mobile app, a deployed app used by real clients.",
      "Built the softsuite.com and softkloud.com company websites in Next.js on the Strapi headless CMS, so the blog, demo requests, FAQ, testimonials and pricing can be updated without code changes.",
      "Standardized component and state-management patterns and shipped 10+ client-facing features across these products in Agile sprints.",
      "Improved GitLab CI/CD pipelines for the Dockerized LAWMA Billing Portal (concurrent pipeline runs, branch trigger rules).",
    ],
  },
  {
    company: "Mason Atlantic LTD",
    role: "Frontend Engineer — Contract",
    period: "Mar 2024 — Mar 2025",
    location: "Remote",
    products: [] as string[],
    achievements: [
      "Built React and TypeScript fleet-management and logistics dashboards giving 30+ operations staff real-time visibility into operations.",
      "Optimized high-volume tables and filters to stay responsive with thousands of records.",
      "Standardized loading, error and empty states across core workflows, reducing user-reported UI failures.",
    ],
  },
  {
    company: "Balm-Technologies",
    role: "Full-Stack Developer",
    period: "Apr 2022 — Mar 2024",
    location: "Lagos, Nigeria",
    products: [] as string[],
    achievements: [
      "Built healthcare applications end to end: React and Next.js frontends plus backend services for appointment scheduling, payments and patient records.",
      "Integrated Stripe payments and Google Calendar sync into a patient booking system, eliminating double-bookings.",
      "Structured backend services as Next.js API routes in a microservice-oriented pattern.",
      "Reduced API-related frontend errors with strict validation and typed data contracts shared between frontend and backend.",
    ],
  },
  {
    company: "Bookishmate",
    role: "Software Engineer Intern",
    period: "Aug 2021 — Mar 2022",
    location: "Lagos, Nigeria",
    products: [] as string[],
    achievements: [
      "Shipped 5+ responsive production features with Next.js, Tailwind CSS and Redux Toolkit.",
      "Fixed 20+ UI and cross-browser defects ahead of key product launches.",
      "Contributed reusable components that were kept in the codebase.",
    ],
  },
];

export type MarkVariant = "grid" | "orbit" | "facade" | "pages" | "tree" | "calendar" | "wave";

export type CaseLink = { label: string; href: string };

export type CaseStudy = {
  slug: string;
  number: string;
  name: string;
  /** Short category line, e.g. "Fintech web app". */
  kind: string;
  /** How the work came about: client work, personal project, assessment… */
  context: string;
  role: string;
  status: string;
  /** Optional time span, e.g. "2026 — Present". */
  period?: string;
  /** One or two sentences for cards and meta descriptions. */
  summary: string;
  problem: string;
  approach: string[];
  stack: string[];
  outcome: string[];
  links: CaseLink[];
  mark: MarkVariant;
  featured?: boolean;
};

/**
 * Case files. Problem statements restate what each product does; they don't
 * invent pain points or numbers. TODO: rewrite each `problem` in your own
 * words, and add real outcomes (users, transactions, launch dates, feedback)
 * wherever you can verify them.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "homexgrid",
    number: "01",
    name: "HomexGrid",
    kind: "Housing platform",
    context: "Co-founded venture",
    role: "Co-founder · backend architecture and product documentation",
    status: "In development",
    period: "2026 — Present",
    summary:
      "A housing platform for landlords and tenants with verified listings, escrow-secured rent payments and digital leases.",
    // TODO: describe the specific problem you saw in your own words (e.g. what goes wrong in renting today).
    problem:
      "Renting involves verifying a property, moving rent money and signing a lease, and landlords and tenants each need to trust every step. HomexGrid brings verified listings, escrow-secured rent payments and digital leases into one platform for both sides.",
    approach: [
      "Architected the backend as a Java / Spring Boot modular monolith on PostgreSQL, Redis and Flyway migrations.",
      "Designed one REST API that serves all eight client apps.",
      "Designed escrow-secured rent payments with dual-confirmation release and tamper-proof ledgers, so funds move only when both parties confirm.",
      "Defined the frontend architecture across the Angular, React, React Native (Expo) and Next.js clients.",
      "Wrote the full product documentation suite.",
    ],
    stack: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Redis",
      "Flyway",
      "REST API",
      "Angular",
      "React",
      "React Native (Expo)",
      "Next.js",
    ],
    // TODO: add launch date and real results (users, rent volume, pilot feedback) once you have them.
    outcome: [
      "In development.",
      "The backend architecture and the full product documentation suite are in place.",
      "Public site at homexgrid.com and an admin demo at dev.admin.homexgrid.com.",
    ],
    links: [
      { label: "Visit homexgrid.com", href: "https://homexgrid.com" },
      { label: "Open the admin demo", href: "https://dev.admin.homexgrid.com" },
    ],
    mark: "grid",
    featured: true,
  },
  {
    slug: "softsuite-softkloud",
    number: "02",
    name: "softsuite.com & softkloud.com",
    kind: "Corporate websites",
    context: "Client work at Soft Alliance And Resources Limited",
    role: "Frontend Engineer",
    status: "Live",
    summary:
      "Two corporate websites built in Next.js on the Strapi headless CMS, with the blog, demo requests, FAQ, testimonials and pricing all managed in the CMS.",
    // TODO: confirm or rewrite in your own words.
    problem:
      "Soft Alliance needed corporate websites for SoftSuite and SoftKloud whose content (blog posts, demo requests, FAQ, testimonials and pricing) is managed in a CMS rather than in code.",
    approach: [
      "Built both sites in Next.js.",
      "Connected them to the Strapi headless CMS, so the blog, demo requests, FAQ, testimonials and pricing are managed in Strapi.",
    ],
    stack: ["Next.js", "React", "Strapi CMS"],
    // TODO: add measurable results if you have them (Lighthouse scores, traffic, demo requests, launch dates).
    outcome: [
      "Both sites are live at softsuite.com and softkloud.com.",
      "Blog posts, demo requests, FAQ, testimonials and pricing are managed in the CMS.",
    ],
    links: [
      { label: "Visit softsuite.com", href: "https://softsuite.com" },
      { label: "Visit softkloud.com", href: "https://softkloud.com" },
    ],
    mark: "pages",
  },
  {
    slug: "martiful",
    number: "03",
    name: "Martiful",
    kind: "Fintech web app",
    context: "Personal project",
    role: "Developer",
    status: "Live",
    summary:
      "A fintech web app for airtime, data bundles and utility bill payments, with a fast checkout flow and real-time transaction status.",
    // TODO: confirm or rewrite in your own words.
    problem:
      "Buying airtime and data bundles and paying bills should be quick, with clear feedback on whether a payment went through.",
    approach: [
      "Built purchase flows for airtime, data bundles and bill payments.",
      "Built a fast checkout flow with real-time transaction status.",
      "Built the interface with React, TypeScript and Tailwind CSS.",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    // TODO: add real usage numbers if you can share them.
    outcome: ["Live at martiful.com."],
    links: [{ label: "Visit martiful.com", href: "https://martiful.com" }],
    mark: "orbit",
  },
  {
    slug: "the-house",
    number: "04",
    name: "The House",
    kind: "Restaurant ordering app",
    context: "Personal project",
    role: "Developer",
    status: "Live",
    summary:
      "A restaurant e-commerce web app with full menu browsing, cart and ordering flows, live and publicly accessible.",
    // TODO: confirm or rewrite in your own words.
    problem: "Let customers browse a restaurant's full menu, build a cart and place an order online.",
    approach: [
      "Built full menu browsing, cart and ordering flows.",
      "Built the interface with React, JavaScript and Tailwind CSS.",
    ],
    stack: ["React", "JavaScript", "Tailwind CSS"],
    // TODO: add real outcomes (orders, launch date) if you can share them.
    outcome: ["Live and publicly accessible at thehouseng.com."],
    links: [{ label: "Visit thehouseng.com", href: "https://thehouseng.com" }],
    mark: "facade",
  },
  {
    slug: "eazybrew",
    number: "05",
    name: "Eazybrew",
    kind: "Multi-role admin dashboard",
    context: "Personal project",
    role: "Developer",
    // TODO: confirm the status.
    status: "No public link",
    summary:
      "A multi-role admin dashboard with tailored interfaces for admins, operators and business users, giving each role its own view into platform management.",
    // TODO: confirm or rewrite in your own words.
    problem:
      "Admins, operators and business users each need a different view of the same platform, and access to the tools that match their role.",
    approach: [
      "Built separate interfaces for admins, operators and business users.",
      "Implemented role-based access to the platform management tools.",
      "Built the interface with React, TypeScript and Tailwind CSS.",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    outcome: ["Each role gets its own view into platform management."],
    // TODO: add a public URL (live site or repo) if one exists. The old "#" link was removed.
    links: [],
    mark: "tree",
  },
  {
    slug: "ascendx",
    number: "06",
    name: "AscendX",
    kind: "Leave management system",
    context: "Technical assessment",
    role: "Full-stack developer",
    status: "Live demo",
    summary:
      "A full-stack leave management system with JWT authentication and role-based access control, built end to end as a technical assessment.",
    problem:
      "A technical assessment: design and ship a full-stack leave management system, from the database to a deployed frontend.",
    approach: [
      "Built the API in NestJS with Prisma and PostgreSQL.",
      "Secured it with JWT authentication and role-based access control (RBAC).",
      "Built the frontend in React 19 with Redux Toolkit and RTK Query, styled with Tailwind CSS.",
      "Deployed the app on Railway and Vercel.",
    ],
    stack: [
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "JWT",
      "RBAC",
      "React 19",
      "Redux Toolkit",
      "RTK Query",
      "Tailwind CSS",
      "Railway",
      "Vercel",
    ],
    // TODO: add the assessment result if you can share it.
    outcome: ["Deployed end to end, with a live demo at ascendx-frontend.vercel.app."],
    // TODO: add the GitHub repository link if it's public.
    links: [{ label: "Open the live demo", href: "https://ascendx-frontend.vercel.app" }],
    mark: "calendar",
  },
  {
    slug: "on-device-voice-app",
    number: "07",
    name: "On-device Voice App",
    kind: "Voice to-do mobile app",
    context: "Technical assessment",
    role: "Mobile developer",
    status: "Assessment build",
    summary:
      "An Expo and TypeScript to-do app that transcribes speech fully on-device with a Whisper model (whisper.rn), with no external API, so audio never leaves the phone.",
    problem:
      "A technical assessment: capture to-dos by voice, with speech recognition running on the device instead of an external API.",
    approach: [
      "Built the app with Expo and TypeScript.",
      "Ran speech recognition on the device with a Whisper model through whisper.rn, so no audio is sent to an external API.",
    ],
    stack: ["React Native (Expo)", "TypeScript", "whisper.rn", "Whisper"],
    // TODO: add the assessment result if you can share it.
    outcome: ["Speech recognition runs entirely on the device; no external API is called and audio never leaves the phone."],
    // TODO: add the GitHub repository link if a public repo exists.
    links: [],
    mark: "wave",
  },
];

export const featuredCase = caseStudies.find((c) => c.featured)!;

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export const education = [
  { school: "University of Lagos", credential: "BSc Chemistry", period: "2018 — 2022" },
  { school: "Bafuto Computer Institute", credential: "Diploma, Computer Science", period: "2017 — 2018" },
];

/** "What I bring": each point is backed by a role or project above. */
export const proofPoints = [
  {
    title: "Fintech & payments",
    body: "SoftPay, a fintech app for businesses (Vue.js); Martiful for airtime, data and bills; Stripe payments in a healthcare booking system.",
  },
  {
    title: "WhatsApp Cloud API in production",
    body: "Built WhatsApp Cloud API messaging for PlateDetect, a traffic-enforcement app, automating offender notices and bill reminders.",
  },
  {
    title: "Escrow payment design",
    body: "Designed HomexGrid's escrow-secured rent payments: funds move only when both parties confirm, recorded in tamper-proof ledgers.",
  },
  {
    title: "Legacy JavaScript → TypeScript",
    body: "Inherited the SoftSuite ERP frontend in vanilla JavaScript, led its migration to TypeScript and built its shared component library.",
  },
  {
    title: "Performance on high-volume data",
    body: "Kept tables and filters responsive with thousands of records in fleet dashboards used by 30+ operations staff.",
  },
];

/** Freelance offer: corporate websites. */
export const services = {
  title: "Corporate websites your team can update without a developer.",
  intro:
    "I build fast corporate websites in Next.js and connect them to a headless CMS, so your team can publish posts, update pricing and answer FAQs on its own.",
  offer: [
    { name: "Next.js build", note: "Responsive, accessible pages built for speed." },
    { name: "Headless CMS integration", note: "Strapi or similar: blog, pricing, FAQ and testimonials editable by your team." },
    { name: "SEO foundations", note: "Metadata, sitemap, structured data and social previews." },
    { name: "Deployment", note: "Set up on Vercel, or a Docker-based pipeline." },
    // TODO: define what post-launch support includes (duration, response time, pricing).
    { name: "Post-launch support", note: "Fixes and small improvements after go-live." },
  ],
  proofSlug: "softsuite-softkloud",
  // TODO: add pricing or typical timelines once you've decided them; nothing is shown until then.
  pricingNote: null as string | null,
};

export type Testimonial = { quote: string; name: string; role: string; company: string };

/**
 * TODO: add real quotes (with permission) from managers, clients or teammates.
 * The testimonials section stays hidden while this list is empty. Never add placeholder quotes.
 */
export const testimonials: Testimonial[] = [];
