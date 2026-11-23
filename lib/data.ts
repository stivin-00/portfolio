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

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "Igbo", level: "Fluent" },
  { name: "Yoruba", level: "Intermediate" },
  { name: "French", level: "Basic" },
];

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
      { name: "Google Calendar" },
      { name: "WhatsApp Cloud API" },
      { name: "Strapi CMS" },
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
      "Led frontend development of SoftAce EDMS in Angular: a document capture, workflow and records-management system used by enterprise clients across multiple organizations.",
      "Built reusable frontend modules across ERP, fintech, billing and incident-monitoring platforms: SoftSuite (ERP), SoftPay (a fintech app for businesses, in Vue.js), the LAWMA Billing Portal and PlateDetect (an incident-monitoring dashboard).",
      "Shipped a WhatsApp Cloud API feature on PlateDetect that sends offenders WhatsApp messages and bill reminders.",
      "Inherited the SoftSuite frontend written in vanilla JavaScript and migrated it to TypeScript with reusable components.",
      "Worked with a mobile teammate on the SoftSuite mobile app, a deployed app used by real clients.",
      "Built the corporate websites softsuite.com and softkloud.com in Next.js on the Strapi headless CMS, with blog, demo requests, FAQ, testimonials and pricing managed in the CMS.",
      "Standardized component and state-management patterns and shipped 10+ client-facing enterprise features in Agile sprints.",
      "Debugged and improved GitLab CI/CD for the Dockerized LAWMA Billing Portal (concurrent pipeline runs, branch trigger rules).",
    ],
  },
  {
    company: "Mason Atlantic LTD",
    role: "Frontend Engineer — Contract",
    period: "Mar 2024 — Mar 2025",
    location: "Remote",
    products: [] as string[],
    achievements: [
      "Built logistics and fleet-management dashboards in React and TypeScript for 30+ internal users.",
      "Built real-time data views for fleet operations.",
      "Optimized high-volume tables and filters to handle thousands of records.",
      "Implemented full loading, error and empty-state handling across logistics workflows.",
    ],
  },
  {
    company: "Balm-Technologies",
    role: "Full-Stack Developer",
    period: "Apr 2022 — Mar 2024",
    location: "Lagos, Nigeria",
    products: [] as string[],
    achievements: [
      "Built healthcare apps for patients and clinicians with React and Next.js.",
      "Integrated Stripe payments and Google Calendar sync into a booking system.",
      "Structured backend services as Next.js API routes in a microservice-oriented pattern.",
      "Tightened input validation and async error handling.",
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
      "Fixed 20+ UI and cross-browser defects.",
      "Contributed reusable components that were kept in the codebase.",
    ],
  },
];

export const projects = [
  {
    number: "01",
    name: "Martiful",
    description:
      "A mini fintech web app for buying airtime, data bundles and utility bill payments, with a fast checkout flow and real-time transaction feedback.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    mark: "grid" as const,
    href: "https://martiful.com",
  },
  {
    number: "02",
    name: "The House",
    description:
      "A restaurant e-commerce web app with full menu browsing, cart and ordering flows — live and publicly accessible.",
    tags: ["React", "JavaScript", "Tailwind CSS"],
    mark: "facade" as const,
    href: "https://thehouseng.com",
  },
  {
    number: "03",
    name: "Eazybrew",
    description:
      "A multi-role admin dashboard with tailored interfaces for admins, operators and business users, giving each role its own view into platform management.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    mark: "orbit" as const,
    href: "#",
  },
];

export const education = [
  { school: "University of Lagos", credential: "BSc Chemistry", period: "2018 — 2022" },
  { school: "Bafuto Computer Institute", credential: "Diploma, Computer Science", period: "2017 — 2018" },
];
