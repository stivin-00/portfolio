import React from "react";
import { motion } from "framer-motion";
import { experiences } from "../constants";
import SectionWrapper from "../hoc/SectionWrapper";
import { textVariant, fadeInUp, staggerContainer } from "../utils/motion";

const ExperienceCard = ({ exp, index }) => (
    <motion.div
        variants={fadeInUp(index * 0.1)}
        className="relative flex gap-6 group"
    >
        {/* Left: timeline line & dot */}
        <div className="flex flex-col items-center flex-shrink-0">
            <div
                className="w-4 h-4 rounded-full border-2 mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-125"
                style={{ borderColor: "#7c3aed", backgroundColor: "#7c3aed33" }}
            />
            {index < experiences.length - 1 && (
                <div className="w-0.5 flex-1 mt-2" style={{ backgroundColor: "#7c3aed55" }} />
            )}
        </div>

        {/* Right: content */}
        <div className="pb-10 flex-1">
            <div className="card p-6 group-hover:border-[var(--color-accent)]">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                        <h3 className="text-lg font-bold text-[var(--color-text)]">{exp.title}</h3>
                        <p className="text-sm font-semibold mt-0.5" style={{ color: "#7c3aed" }}>
                            {exp.company}
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span className="text-xs px-2 py-0.5 rounded-full border border-[var(--color-border)] text-[var(--color-muted)]">
                            {exp.type}
                        </span>
                        <span className="text-xs text-[var(--color-muted)]">{exp.date}</span>
                    </div>
                </div>

                {/* Bullet points */}
                <ul className="space-y-2">
                    {exp.points.map((point, i) => (
                        <li key={i} className="flex gap-2 text-sm text-[var(--color-muted)] leading-relaxed">
                            <span
                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                style={{ backgroundColor: "#7c3aed" }}
                            />
                            {point}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </motion.div>
);

const Experience = () => (
    <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={textVariant()} className="mb-16">
            <p className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-widest mb-2">
                Career
            </p>
            <h2 className="section-title text-[var(--color-text)]">Work Experience</h2>
            <p className="mt-4 text-[var(--color-muted)] max-w-xl">
                4+ years building production applications across healthcare, fintech, mobile, and enterprise domains.
            </p>
        </motion.div>

        {/* Two-column on desktop */}
        <div className="max-w-3xl mx-auto">
            <motion.div
                variants={staggerContainer(0.1, 0)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.05 }}
                className="space-y-0"
            >
                {experiences.map((exp, i) => (
                    <ExperienceCard key={exp.company + exp.title} exp={exp} index={i} />
                ))}
            </motion.div>
        </div>
    </div>
);

export default SectionWrapper(Experience, "experience");
