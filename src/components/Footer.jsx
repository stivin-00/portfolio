import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { socialLinks, navLinks } from "../constants";

const Footer = () => {
    const year = new Date().getFullYear();
    const social = [
        { icon: <AiFillGithub size={18} />, href: socialLinks.github, label: "GitHub" },
        { icon: <AiFillLinkedin size={18} />, href: socialLinks.linkedin, label: "LinkedIn" },
        { icon: <AiOutlineTwitter size={18} />, href: socialLinks.twitter, label: "Twitter" },
    ];

    return (
        <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Brand */}
                <div className="flex items-center gap-2">
                    <img src="/img/logo-icon.png" className="w-8 h-auto flex items-center justify-center" />

                    <span className="font-bold text-[var(--color-text)]">
                        STIVIN<span className="text-[var(--color-accent)]">.</span>dev
                    </span>
                </div>

                {/* Nav links */}
                <nav className="flex gap-6 flex-wrap justify-center" aria-label="Footer navigation">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() =>
                                document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors capitalize"
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>

                {/* Social + copyright */}
                <div className="flex flex-col items-center sm:items-end gap-3">
                    <div className="flex gap-3">
                        {social.map(({ icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={label}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-2)] transition-all"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                    <p className="text-xs text-[var(--color-muted)]">
                        © {year} Ekele Stephen. Built with React & Tailwind CSS.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
