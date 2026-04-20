import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
    AiFillGithub,
    AiFillLinkedin,
    AiOutlineTwitter,
} from "react-icons/ai";
import { HiArrowDown, HiDownload } from "react-icons/hi";
import { PiAngularLogoDuotone } from "react-icons/pi";
import { socialLinks } from "../constants";

const ROLES = [
    "Frontend Engineer",
    "React & Next.js",
    "Angular",
    "Vue.js and Nuxt",
    "React Native",
    "Node & Nest.js",
];

const TypingText = ({ phrases }) => {
    const [index, setIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = phrases[index];
        let timeout;
        if (!isDeleting && displayed.length < current.length) {
            timeout = setTimeout(
                () => setDisplayed(current.slice(0, displayed.length + 1)),
                80
            );
        } else if (!isDeleting && displayed.length === current.length) {
            timeout = setTimeout(() => setIsDeleting(true), 1800);
        } else if (isDeleting && displayed.length > 0) {
            timeout = setTimeout(
                () => setDisplayed(current.slice(0, displayed.length - 1)),
                40
            );
        } else if (isDeleting && displayed.length === 0) {
            setIsDeleting(false);
            setIndex((i) => (i + 1) % phrases.length);
        }
        return () => clearTimeout(timeout);
    }, [displayed, isDeleting, index, phrases]);

    return (
        <span className="text-[var(--color-accent)]">
            {displayed}
            <span className="blink">|</span>
        </span>
    );
};

const FloatingParticle = ({ style }) => (
    <motion.div
        className="absolute rounded-full opacity-20"
        style={style}
        animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
            duration: style.duration || 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: style.delay || 0,
        }}
    />
);

const Hero = () => {
    const particles = [
        { width: 8, height: 8, background: "#7c3aed", top: "15%", left: "10%", duration: 5, delay: 0 },
        { width: 12, height: 12, background: "#2563eb", top: "70%", left: "5%", duration: 7, delay: 1 },
        { width: 6, height: 6, background: "#06b6d4", top: "30%", right: "8%", duration: 6, delay: 2 },
        { width: 10, height: 10, background: "#8b5cf6", top: "80%", right: "12%", duration: 8, delay: 0.5 },
        { width: 7, height: 7, background: "#7c3aed", top: "50%", left: "3%", duration: 5.5, delay: 1.5 },
        { width: 9, height: 9, background: "#06b6d4", top: "20%", right: "20%", duration: 6.5, delay: 3 },
        { width: 5, height: 5, background: "#a78bfa", top: "60%", left: "88%", duration: 4.5, delay: 0.8 },
        { width: 11, height: 11, background: "#8b5cf6", top: "90%", right: "30%", duration: 7.5, delay: 2.5 },

    ];

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background gradient mesh */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-violet-600/20 dark:bg-violet-600/10 blur-3xl" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-blue-600/20 dark:bg-blue-600/10 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-400/10 dark:bg-cyan-400/5 blur-3xl" />
            </div>

            {/* Floating particles */}
            {particles.map((p, i) => (
                <FloatingParticle key={i} style={p} />
            ))}

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage:
                        "linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Main content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 pt-16">
                {/* Text content */}
                <div className="flex-1 text-center lg:text-left">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-muted)] mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Available for opportunities
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-4"
                    >
                        Hi, I'm{" "}
                        <span className="gradient-text">Ekele Stephen</span>
                    </motion.h1>

                    {/* Typing subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-xl sm:text-2xl md:text-3xl font-semibold text-[var(--color-muted)] mb-6 min-h-[2.5rem]"
                    >
                        <TypingText phrases={ROLES} />
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-base md:text-lg text-[var(--color-muted)] max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8"
                    >
                        I build <strong className="text-[var(--color-text)] font-semibold">fast, scalable, and beautiful</strong>{" "}
                        web and mobile applications. From pixel-perfect UIs to robust REST APIs — I deliver
                        end-to-end solutions that drive real business impact.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-10"
                    >
                        <button
                            onClick={() => {
                                const el = document.getElementById("projects");
                                if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="btn-primary w-full sm:w-auto justify-center"
                        >
                            View My Work
                        </button>
                        <a
                            href="/files/Ekele_Stephen_Agbakwuru_CV.pdf"
                            download
                            className="btn-outline w-full sm:w-auto justify-center"
                        >
                            <HiDownload size={16} />
                            Download CV
                        </a>
                    </motion.div>

                    {/* Social Icons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex items-center justify-center lg:justify-start gap-5"
                    >
                        {[
                            { href: socialLinks.github, icon: <AiFillGithub size={22} />, label: "GitHub" },
                            { href: socialLinks.linkedin, icon: <AiFillLinkedin size={22} />, label: "LinkedIn" },
                            { href: `https://twitter.com/ekele__stephen`, icon: <AiOutlineTwitter size={22} />, label: "Twitter" },
                        ].map(({ href, icon, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={label}
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface)] border border-transparent hover:border-[var(--color-border)] transition-all duration-200 hover:scale-110"
                            >
                                {icon}
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* Avatar / Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
                    className="flex-shrink-0 relative"
                >
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                        {/* Animated ring */}
                        <div className="absolute inset-0 rounded-full gradient-bg opacity-20 animate-spin-slow" />
                        <div className="absolute inset-2 rounded-full gradient-bg opacity-10 animate-pulse-slow" />

                        {/* Profile image container */}
                        <div className="absolute inset-4 rounded-full p-[3px] bg-gradient-to-br from-[#7c3aed] via-[#06b6d4] to-[#7c3aed] shadow-glow-lg">
                            <div className="w-full h-full rounded-full overflow-hidden bg-[var(--color-surface)] relative flex items-center justify-center">
                                <img
                                    src="/img/hero.jpg"
                                    alt="Ekele Stephen — Full-Stack Engineer"
                                    className="w-full h-full object-cover relative z-10"
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                        e.target.nextSibling.style.display = "flex";
                                    }}
                                />
                                {/* Fallback avatar */}
                                <div
                                    className="absolute inset-0 gradient-bg items-center justify-center text-white text-6xl font-black hidden"
                                    style={{ display: "none" }}
                                >
                                    ES
                                </div>
                            </div>
                        </div>

                        {/* Floating skill badges */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -right-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-3 py-2 shadow-lg text-xs font-semibold text-[var(--color-text)] z-20"
                        >
                            ⚡ React & Next.js
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-4 -left-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-3 py-2 shadow-lg text-xs font-semibold text-[var(--color-text)] z-20"
                        >
                            📱 React Native
                        </motion.div>
                        <motion.div
                            animate={{ x: [0, -6, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute top-1/2 -left-16 -translate-y-1/2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-3 py-2 shadow-lg text-xs font-semibold text-[var(--color-text)] hidden sm:block z-20"
                        >
                            🛠 Node.js
                        </motion.div>
                        <motion.div
                            animate={{ x: [0, 6, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute top-1/2 -right-16 -translate-y-1/2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-3 py-2 shadow-lg text-xs font-semibold text-[var(--color-text)] hidden sm:block z-20"
                        >
                            ⚡ Angular
                        </motion.div>
                        <motion.div
                            animate={{ x: [0, -6, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute top-1/2 -left-16 -translate-y-1/2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-3 py-2 shadow-lg text-xs font-semibold text-[var(--color-text)] hidden sm:block z-20"
                        >
                            ⚡ Vue & Nuxt
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-muted)]"
            >
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <HiArrowDown size={16} />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
