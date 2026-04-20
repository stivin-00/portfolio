import React, { useState } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "../constants";
import SectionWrapper from "../hoc/SectionWrapper";
import { textVariant, fadeInUp, staggerContainer, fadeIn } from "../utils/motion";

const SkillBar = ({ name, level, icon, index }) => (
    <motion.div
        variants={fadeInUp(index * 0.05)}
        className="flex items-center gap-3 group"
    >
        <div className="w-8 h-8 flex-shrink-0 rounded-lg overflow-hidden bg-[var(--color-surface-2)] p-1 border border-[var(--color-border)]">
            <img
                src={icon}
                alt={name}
                className="w-full h-full object-contain"
                onError={(e) => { e.target.style.display = "none"; }}
                loading="lazy"
            />
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-[var(--color-text)] truncate">{name}</span>
                <span className="text-xs text-[var(--color-muted)] ml-2 flex-shrink-0">{level}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-[var(--color-surface-2)] overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #7c3aed, #06b6d4)" }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.08, ease: "easeOut" }}
                />
            </div>
        </div>
    </motion.div>
);

const CategoryCard = ({ category, skills, color, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${isActive
                ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-glow"
                : "bg-[var(--color-surface)] text-[var(--color-muted)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            }`}
    >
        {category}
        <span
            className={`ml-2 text-xs font-normal ${isActive ? "opacity-80" : "opacity-50"
                }`}
        >
            {skills.length}
        </span>
    </button>
);

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState("Frontend");

    const currentCategory = skillCategories.find(
        (c) => c.category === activeCategory
    );

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div variants={textVariant()} className="mb-12">
                <p className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-widest mb-2">
                    Technical Proficiency
                </p>
                <h2 className="section-title text-[var(--color-text)]">Skills & Technologies</h2>
                <p className="mt-4 text-[var(--color-muted)] max-w-xl">
                    A curated selection of tools and technologies I use to build modern, scalable applications.
                </p>
            </motion.div>

            {/* Category tabs */}
            <motion.div variants={fadeInUp(0.1)} className="flex flex-wrap gap-3 mb-10">
                {skillCategories.map((cat) => (
                    <CategoryCard
                        key={cat.category}
                        category={cat.category}
                        skills={cat.skills}
                        color={cat.color}
                        isActive={activeCategory === cat.category}
                        onClick={() => setActiveCategory(cat.category)}
                    />
                ))}
            </motion.div>

            {/* Skills grid */}
            <motion.div
                key={activeCategory}
                variants={staggerContainer(0.05, 0)}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
                {currentCategory?.skills.map((skill, i) => (
                    <div
                        key={skill.name}
                        className="card p-5"
                    >
                        <SkillBar {...skill} index={i} />
                    </div>
                ))}
            </motion.div>

            {/* Tech cloud — all skills shown as pills */}
            <motion.div variants={fadeInUp(0.3)} className="mt-16">
                <p className="text-sm text-[var(--color-muted)] uppercase tracking-widest font-semibold mb-6">
                    All Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                    {skillCategories.flatMap((cat) =>
                        cat.skills.map((skill) => (
                            <span key={skill.name} className="tag">
                                {skill.name}
                            </span>
                        ))
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default SectionWrapper(Skills, "skills");
