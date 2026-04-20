import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiSun, HiMoon, HiMenu, HiX } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";
import { navLinks, socialLinks } from "../constants";

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleNavClick = (id) => {
        setActive(id);
        setMenuOpen(false);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "backdrop-blur-xl bg-[var(--color-primary)]/80 border-b border-[var(--color-border)] shadow-sm"
                    : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <a
                        href="#"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="flex items-center gap-2 group"
                        aria-label="Go to top"
                    >
                        <img src="/img/logo-icon.png" className="w-8 h-auto flex items-center justify-center " />


                        <span className="font-bold text-[var(--color-text)] text-[15px] hidden sm:inline group-hover:text-[var(--color-accent)] transition-colors">
                            STIVIN<span className="text-[var(--color-accent)]">.</span>dev
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleNavClick(link.id)}
                                className={`text-sm font-medium transition-colors relative group ${active === link.id
                                    ? "text-[var(--color-accent)]"
                                    : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
                                    }`}
                            >
                                {link.label}
                                <span
                                    className={`absolute -bottom-1 left-0 h-0.5 bg-[var(--color-accent)] transition-all duration-300 ${active === link.id ? "w-full" : "w-0 group-hover:w-full"
                                        }`}
                                />
                            </button>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-2)] transition-all duration-200"
                        >
                            {theme === "dark" ? <HiSun size={18} /> : <HiMoon size={18} />}
                        </button>

                        {/* Resume Button — desktop */}
                        <a
                            href="/files/Ekele_Stephen_Agbakwuru_CV.pdf"
                            download
                            className="hidden md:inline-flex btn-primary text-sm py-2 px-4"
                            aria-label="Download Resume"
                        >
                            Resume
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-label="Toggle navigation menu"
                            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[var(--color-muted)] hover:bg-[var(--color-surface-2)] transition-all"
                        >
                            {menuOpen ? <HiX size={20} /> : <HiMenu size={20} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-16 left-0 right-0 z-40 md:hidden backdrop-blur-xl bg-[var(--color-primary)]/95 border-b border-[var(--color-border)] shadow-xl"
                    >
                        <nav className="flex flex-col px-6 py-6 gap-4" aria-label="Mobile navigation">
                            {navLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => handleNavClick(link.id)}
                                    className="text-left text-base font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors py-2 border-b border-[var(--color-border)] last:border-0"
                                >
                                    {link.label}
                                </button>
                            ))}
                            <a
                                href="/files/Ekele_Stephen_Agbakwuru_CV.pdf"
                                download
                                className="btn-primary text-sm py-2.5 text-center mt-2"
                            >
                                Download Resume
                            </a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
