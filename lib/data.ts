export const profile = {
  name: "Ekele Stephen Agbakwuru",
  handle: "Stivin",
  role: "Frontend / Full-Stack Engineer",
  location: "Lagos, Nigeria",
  experience: "4+ years",
  summary:
    "Four years shipping production interfaces across fintech, logistics, healthcare and enterprise platforms — usually owning the feature end-to-end, from component architecture to API design and deployment.",
  email: "ekeleagbakwuru9@gmail.com",
  phone: "+234 812 358 3317",
  github: "https://github.com/stivin-00",
  linkedin: "https://linkedin.com/in/ekelestephenagbakwuru",
  site: "https://stivin.vercel.app",
};

export const stack = [
  { name: "React", note: "Interfaces & component systems" },
  { name: "Next.js", note: "Rendering, routing & API routes" },
  { name: "TypeScript", note: "Type-safe application code" },
  { name: "Angular", note: "Enterprise frontend systems" },
  { name: "Vue.js", note: "Progressive frontend framework" },
  { name: "React Native", note: "Cross-platform mobile" },
  { name: "Java", note: "Enterprise backend systems" },
  { name: "NestJS / Node.js", note: "Structured API services" },
  { name: "PostgreSQL / MongoDB", note: "Data & persistence" },
  { name: "Docker", note: "Build & deploy pipelines" },
];

export const experience = [
  {
    company: "Soft Alliance And Resources Limited",
    role: "Frontend Engineer",
    period: "Jun 2024 — Present",
    location: "Lagos, Nigeria",
    achievements: [
      "Architected reusable component modules across ERP, fintech, billing and incident-monitoring platforms",
      "Participated in frontend development of SoftAce EDMS using Angular and React for enterprise document management",
      "Designed and implemented workflow and records-management systems serving multiple enterprise clients",
      "Built scalable Redux state management patterns adopted across multiple product teams"
    ],
  },
  {
    company: "Mason Atlantic LTD",
    role: "Frontend Engineer — Contract",
    period: "Mar 2024 — Mar 2025",
    location: "Remote",
    achievements: [
      "Delivered logistics and fleet-management dashboards serving 30+ internal users with real-time data",
      "Optimized high-volume data tables to handle thousands of records without performance degradation",
      "Implemented React and TypeScript solutions providing real-time fleet operations visibility",
      "Enhanced data visualization components for complex logistics workflows"
    ],
  },
  {
    company: "Balm-Technologies",
    role: "Full-Stack Developer",
    period: "Apr 2022 — Mar 2024",
    location: "Lagos, Nigeria",
    achievements: [
      "Built end-to-end healthcare applications with React/Next.js frontends and Node.js backends",
      "Integrated Stripe payment processing and Google Calendar sync into patient booking system",
      "Developed scheduling, payments and patient management features for healthcare platforms",
      "Implemented secure authentication and authorization systems for sensitive healthcare data"
    ],
  },
  {
    company: "Bookishmate",
    role: "Software Engineer Intern",
    period: "Aug 2021 — Mar 2022",
    location: "Lagos, Nigeria",
    achievements: [
      "Shipped 5+ responsive production features with Next.js, Tailwind CSS and Redux Toolkit",
      "Resolved 20+ UI defects and cross-browser compatibility issues ahead of key product launches",
      "Contributed to component library design system used across multiple product features",
      "Collaborated with design team to implement pixel-perfect responsive interfaces"
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
