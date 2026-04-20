import React from "react";
import { motion } from "framer-motion";
import { services } from "../constants";
import SectionWrapper from "../hoc/SectionWrapper";
import { fadeInUp, staggerContainer, textVariant, fadeIn } from "../utils/motion";

const ServiceCard = ({ service, index }) => (
    <motion.div
        variants={fadeInUp(index * 0.15)}
        className="card p-6 flex flex-col gap-4 group cursor-default"
    >
        <span className="text-4xl">{service.icon}</span>
        <h3 className="text-lg font-bold text-[var(--color-text)]">{service.title}</h3>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed">{service.description}</p>
    </motion.div>
);

const StatCard = ({ value, label }) => (
    <div className="text-center">
        <div className="text-3xl md:text-4xl font-black gradient-text">{value}</div>
        <div className="text-sm text-[var(--color-muted)] mt-1">{label}</div>
    </div>
);

const About = () => {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Section header */}
            <motion.div variants={textVariant()} className="mb-16">
                <p className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-widest mb-2">
                    Introduction
                </p>
                <h2 className="section-title text-[var(--color-text)]">About Me</h2>
            </motion.div>

            {/* Main content row */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start mb-20">
                {/* Avatar */}
                <motion.div
                    variants={fadeIn("right", 0.2)}
                    className="flex-shrink-0 mx-auto lg:mx-0"
                >
                    <div className="relative w-56 h-56 sm:w-72 sm:h-72">
                        <div className="absolute inset-0 rounded-2xl gradient-bg opacity-30 blur-xl" />
                        <div className="relative w-full h-full rounded-2xl overflow-hidden gradient-border shadow-glow">
                            <img
                                src="/profile.png"
                                alt="Ekele Stephen"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.parentElement.style.background =
                                        "linear-gradient(135deg, #7c3aed, #2563eb)";
                                    e.target.parentElement.innerHTML =
                                        '<div class="w-full h-full flex items-center justify-center text-white text-5xl font-black">ES</div>';
                                }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Text */}
                <motion.div variants={fadeIn("left", 0.3)} className="flex-1">
                    <p className="text-base md:text-lg text-[var(--color-muted)] leading-relaxed mb-6">
                        I'm <strong className="text-[var(--color-text)] font-semibold">Ekele Stephen Agbakwuru</strong>,
                        a passionate Frontend & Full-Stack Engineer based in Nigeria with{" "}
                        <strong className="text-[var(--color-text)] font-semibold">4+ years</strong> of professional
                        experience building production-grade web and mobile applications.
                    </p>
                    <p className="text-base md:text-lg text-[var(--color-muted)] leading-relaxed mb-6">
                        My core expertise spans <strong className="text-[var(--color-accent)]">React.js, Next.js, Angular, Vue, TypeScript,
                            React Native, Node.js, and MongoDB</strong>. I've shipped apps to production across{" "}
                        <strong className="text-[var(--color-text)] font-semibold">healthcare, Billing Platform, fintech, edutech,
                            and crypto exchange</strong> domains — from patient management systems to
                        App Store-ready mobile apps.
                    </p>
                    <p className="text-base md:text-lg text-[var(--color-muted)] leading-relaxed mb-8">
                        I thrive at the intersection of engineering and design — writing clean, maintainable
                        code while obsessing over user experience. I'm a quick learner who collaborates
                        closely with cross-functional teams to deliver results that matter.
                    </p>

                    {/* CTA */}
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                            className="btn-primary text-sm"
                        >
                            Let's Work Together
                        </button>
                        <a
                            href="/files/Ekele_Stephen_Agbakwuru_CV.pdf"
                            download
                            className="btn-outline text-sm"
                        >
                            Download Resume
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Stats */}
            <motion.div
                variants={fadeInUp(0.2)}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] mb-16"
            >
                <StatCard value="4+" label="Years Experience" />
                <StatCard value="9+" label="Projects Shipped" />
                <StatCard value="3" label="Companies Worked With" />
                <StatCard value="2" label="App Store Launches" />
            </motion.div>

            {/* Services Grid */}
            <motion.div
                variants={staggerContainer(0.1, 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
                {services.map((service, index) => (
                    <ServiceCard key={service.title} service={service} index={index} />
                ))}
            </motion.div>
        </div>
    );
};

export default SectionWrapper(About, "about");
