import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiExternalLink, HiCode, HiArrowRight } from "react-icons/hi";
import { projects } from "../constants";
import SectionWrapper from "../hoc/SectionWrapper";
import { textVariant, fadeInUp, staggerContainer } from "../utils/motion";

const ProjectCard = ({ project, index, onClick }) => (
    <motion.div
        variants={fadeInUp(index * 0.1)}
        className="card overflow-hidden group cursor-pointer flex flex-col"
        onClick={() => onClick(project)}
        role="button"
        aria-label={`View details for ${project.name}`}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onClick(project)}
    >
        {/* Image */}
        <div className="relative overflow-hidden h-48 sm:h-56">
            <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {project.featured && (
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-accent)] text-white shadow">
                    Featured
                </span>
            )}

            {/* Overlay links */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                {project.live_link && project.live_link !== "#" && (
                    <a
                        href={project.live_link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Live demo"
                        className="w-9 h-9 rounded-lg bg-white/90 flex items-center justify-center text-gray-900 hover:bg-white transition-colors shadow"
                    >
                        <HiExternalLink size={16} />
                    </a>
                )}
                <a
                    href={project.github_link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="GitHub repository"
                    className="w-9 h-9 rounded-lg bg-white/90 flex items-center justify-center text-gray-900 hover:bg-white transition-colors shadow"
                >
                    <HiCode size={16} />
                </a>
            </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
            <p className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-1">
                {project.tagline}
            </p>
            <h3 className="text-lg font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                {project.name}
            </h3>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4 flex-1 line-clamp-3">
                {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="tag text-[10px] px-2 py-0.5">
                        {tag}
                    </span>
                ))}
                {project.tags.length > 4 && (
                    <span className="tag text-[10px] px-2 py-0.5">+{project.tags.length - 4}</span>
                )}
            </div>

            <button className="flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)] hover:gap-2 transition-all duration-200 self-start">
                Learn more <HiArrowRight size={14} />
            </button>
        </div>
    </motion.div>
);

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
            aria-label={project.name}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative z-10 bg-[var(--color-surface)] rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[var(--color-border)] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image */}
                <div className="relative h-56">
                    <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent" />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-xl leading-none"
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 -mt-8 relative">
                    <p className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-1">
                        {project.tagline}
                    </p>
                    <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4">
                        {project.name}
                    </h3>

                    <div className="space-y-4 mb-6">
                        <div>
                            <h4 className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-widest mb-1">
                                The Challenge
                            </h4>
                            <p className="text-sm text-[var(--color-muted)] leading-relaxed">{project.problem}</p>
                        </div>
                        <div>
                            <h4 className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-widest mb-1">
                                My Solution
                            </h4>
                            <p className="text-sm text-[var(--color-muted)] leading-relaxed">{project.solution}</p>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                        <a
                            href={project.github_link}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-outline text-sm flex-1 justify-center"
                        >
                            <HiCode size={15} /> GitHub
                        </a>
                        {project.live_link && project.live_link !== "#" && (
                            <a
                                href={project.live_link}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-primary text-sm flex-1 justify-center"
                            >
                                <HiExternalLink size={15} /> Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Projects = () => {
    const [selected, setSelected] = useState(null);

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div variants={textVariant()} className="mb-12">
                <p className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-widest mb-2">
                    Portfolio
                </p>
                <h2 className="section-title text-[var(--color-text)]">Projects</h2>
                <p className="mt-4 text-[var(--color-muted)] max-w-xl">
                    A selection of real-world projects I've built across web and mobile platforms.
                    Click any card for full details.
                </p>
            </motion.div>

            {/* Projects grid */}
            <motion.div
                variants={staggerContainer(0.1, 0)}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
                {projects.map((project, i) => (
                    <ProjectCard
                        key={project.name}
                        project={project}
                        index={i}
                        onClick={setSelected}
                    />
                ))}
            </motion.div>

            {/* GitHub CTA */}
            <motion.div variants={fadeInUp(0.4)} className="mt-14 text-center">
                <p className="text-[var(--color-muted)] mb-4">
                    Want to see more of my work?
                </p>
                <a
                    href="https://github.com/stivin-00"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline"
                >
                    <HiCode size={16} /> View All on GitHub
                </a>
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {selected && (
                    <ProjectModal project={selected} onClose={() => setSelected(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default SectionWrapper(Projects, "projects");
