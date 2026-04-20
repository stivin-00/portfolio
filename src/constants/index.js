// =====================
// Navigation Links
// =====================
export const navLinks = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
];

// =====================
// Services / Roles
// =====================
export const services = [
    {
        title: "Frontend Engineer",
        description: "Building pixel-perfect, responsive UIs with React, Next.js, Angular, Vue and TypeScript.",
        icon: "🎨",
    },
    {
        title: "Full-Stack Developer",
        description: "End-to-end development from REST APIs with Node.js/Express to MongoDB databases.",
        icon: "⚡",
    },
    {
        title: "Mobile Developer",
        description: "Cross-platform mobile apps with React Native, deployed to App Store & Play Store.",
        icon: "📱",
    },
    {
        title: "Backend Engineer",
        description: "Building robust APIs with Node.js, Nest.js, Express, and MongoDB.",
        icon: "✨",
    },
];

// =====================
// Skills (categorized)
// =====================
export const skillCategories = [
    {
        category: "Frontend",
        color: "from-violet-500 to-purple-600",
        skills: [
            { name: "React.js", level: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Next.js", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
            { name: "TypeScript", level: 88, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
            { name: "JavaScript", level: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
            { name: "Tailwind CSS", level: 92, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
            { name: "Redux Toolkit", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
            { name: "Angular", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg" },
            { name: "Vue.js", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" }, 
            { name: "Nuxt.js", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg" },
        ],
    },
    {
        category: "Backend",
        color: "from-blue-500 to-cyan-600",
        skills: [
            { name: "Node.js", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
            { name: "Express.js", level: 82, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
            { name: "MongoDB", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
            { name: "Nest.js", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg" },
            { name: "SQL", level: 65, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        ],
    },
    {
        category: "Mobile",
        color: "from-emerald-500 to-teal-600",
        skills: [
            { name: "React Native", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        ],
    },
    {
        category: "Tools",
        color: "from-orange-500 to-amber-600",
        skills: [
            { name: "Git", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
            { name: "Figma", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
            { name: "HTML5", level: 98, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
            { name: "CSS3", level: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
            { name: "Docker", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
            { name: "Google Cloud", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-plain.svg" },
        ],
    },
];

// =====================
// Projects
// =====================
export const projects = [
    {
        name: "Balm Healthcare Platform",
        tagline: "Full-Stack Healthcare Management System",
        description:
            "Led the development of a comprehensive healthcare management web application, including an admin dashboard, patient management system, and RESTful backend. Improved operational efficiency by 40% for the client's clinical workflows.",
        problem: "The client needed a centralized platform to manage patient records, appointments, and billing across multiple facilities.",
        solution: "Built a full-stack system with a React.js frontend (SCSS, Google Maps API), a Node.js/Express backend, and MongoDB database with role-based access control.",
        tags: ["React.js", "Node.js", "MongoDB", "SCSS", "Google Maps API", "Express.js"],
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
        live_link: "https://balm.ai/",
        github_link: "#",
        // featured: true,
    },
    {
        name: "Martiful Crypto Exchange",
        tagline: "Cross-Platform Crypto Exchange App",
        description:
            "Built a full-featured crypto exchange mobile app deployed to both App Store and Play Store. Also developed the web admin dashboard and the backend API powering the entire platform.",
        problem: "Client needed a seamless crypto trading experience across mobile platforms with real-time data and a robust admin interface.",
        solution: "Architected a React Native mobile app, React.js admin dashboard with TypeScript and Redux, and an Express/MongoDB backend.",
        tags: ["React Native", "React.js", "TypeScript", "Redux", "Node.js", "MongoDB"],
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
        live_link: "https://martiful.com/",
        github_link: "#",
        // featured: true,
    },
    {
        name: "BookishMate EduTech Platform",
        tagline: "Educational Platform — Next.js",
        description:
            "Contributed to a modern e-learning platform serving thousands of students. Built reusable component systems, integrated state management, and ensured cross-browser compatibility for a seamless learning experience.",
        problem: "The platform needed scalable, responsive components to support rapid feature growth and a diverse student user base.",
        solution: "Developed features using Next.js, Tailwind CSS, and Redux Toolkit, collaborating with a cross-functional team of designers and product managers.",
        tags: ["Next.js", "Tailwind CSS", "Redux Toolkit", "TypeScript"],
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
        live_link: "#",
        github_link: "https://github.com/stivin-00",
        featured: false,
    },
];

// =====================
// Work Experience
// =====================
export const experiences = [
    {
        title: "Frontend Developer",
        company: "SoftAlliance & Resources Ltd.",
        date: "Jun 2024 – Present",
        type: "Full-time",
        color: "#7c3aed",
        points: [
            "Developing and maintaining enterprise web applications using React.js and related technologies.",
            "Collaborating with cross-functional teams (design, product, backend) to ship high-quality features.",
            "Implementing responsive design patterns and ensuring cross-browser compatibility.",
            "Participating in code reviews and mentoring junior developers.",
        ],
    },
    {
        title: "Software Engineer (NYSC Internship)",
        company: "Mason Atlantic Limited",
        date: "Aug 2024 – Present",
        type: "Internship",
        color: "#2563eb",
        points: [
            "Building and maintaining web applications using React.js and modern frontend tooling.",
            "Developing responsive email templates for the backend team using HTML/XML.",
            "Contributing to UI component libraries and design system documentation.",
        ],
    },
    {
        title: "Mobile Developer",
        company: "Martiful",
        date: "Jan 2023 – Jan 2024",
        type: "Contract",
        color: "#0891b2",
        points: [
            "Built and shipped a cross-platform crypto exchange mobile app to App Store and Play Store using React Native.",
            "Developed a web admin dashboard using React.js, TypeScript, Redux, and Tailwind CSS.",
            "Architected and built the backend API using Node.js, Express.js, and MongoDB.",
        ],
    },
    {
        title: "Full-Stack Developer",
        company: "Balm Technologies",
        date: "Mar 2022 – May 2024",
        type: "Full-time",
        color: "#059669",
        points: [
            "Led development of a healthcare management platform, including patient records, billing, and appointment systems.",
            "Built the admin dashboard with React.js and integrated Google Maps API for location services.",
            "Designed and implemented the REST API backend using Node.js, Express.js, and MongoDB.",
            "Ensured HIPAA-aligned data handling and cross-browser compatibility.",
        ],
    },
    {
        title: "Software Developer",
        company: "Bookishmate",
        date: "Aug 2021 – Feb 2022",
        type: "Internship",
        color: "#d97706",
        points: [
            "Developed features for an ed-tech platform using Next.js, Tailwind CSS, and Redux Toolkit.",
            "Collaborated with designers and PMs to build responsive, accessible UI components.",
            "Implemented cross-browser compatible solutions for a diverse student user base.",
        ],
    },
];

// =====================
// Testimonials
// =====================
export const testimonials = [
    {
        quote:
            "Stephen consistently delivered robust, well-architected solutions. His ability to translate complex requirements into clean, scalable code is exceptional. A true team player.",
        name: "Team Lead",
        role: "Engineering — Balm Technologies",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        quote:
            "The crypto exchange app Stephen built exceeded all our expectations — clean UI, smooth performance, and shipped on time across both platforms. Outstanding work.",
        name: "Founder",
        role: "CEO — Martiful",
        avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
        quote:
            "Stephen brought both technical depth and a sharp product sense. His UI work at Softalliance significantly improved our user engagement metrics.",
        name: "Product Manager",
        role: "Softalliance & Resources Ltd.",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
];

// =====================
// Social Links
// =====================
export const socialLinks = {
    github: "https://github.com/stivin-00",
    linkedin: "https://www.linkedin.com/in/ekelestephenagbakwuru",
    twitter: "https://twitter.com/ekele__stephen",
    email: "ekeleagbakwuru9@gmail.com",
};
