import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
    AiFillGithub,
    AiFillLinkedin,
} from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { HiMail, HiLocationMarker, HiCheckCircle, HiExclamationCircle } from "react-icons/hi";
import { socialLinks } from "../constants";
import SectionWrapper from "../hoc/SectionWrapper";
import { textVariant, fadeIn, staggerContainer } from "../utils/motion";

// =====================
// Stars background canvas
// =====================
const StarsBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animId;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const COUNT = 180;
        const stars = Array.from({ length: COUNT }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.4 + 0.3,
            speed: Math.random() * 0.25 + 0.05,
            opacity: Math.random() * 0.7 + 0.2,
        }));

        let rotation = 0;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            rotation += 0.0004;

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(rotation);
            ctx.translate(-cx, -cy);

            stars.forEach((s) => {
                s.y -= s.speed;
                if (s.y < 0) {
                    s.y = canvas.height;
                    s.x = Math.random() * canvas.width;
                }
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(242, 114, 200, ${s.opacity})`;
                ctx.fill();
            });

            ctx.restore();
            animId = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.5 }}
            aria-hidden="true"
        />
    );
};

const CONTACT_INFO = [
    {
        icon: <HiMail size={18} />,
        label: "Email",
        value: "ekeleagbakwuru9@gmail.com",
        href: "mailto:ekeleagbakwuru9@gmail.com",
    },
    {
        icon: <HiLocationMarker size={18} />,
        label: "Location",
        value: "Nigeria",
        href: null,
    },
];

const SOCIAL = [
    { icon: <AiFillGithub size={22} />, label: "GitHub", href: socialLinks.github },
    { icon: <AiFillLinkedin size={22} />, label: "LinkedIn", href: socialLinks.linkedin },
    { icon: <AiOutlineTwitter size={22} />, label: "Twitter", href: socialLinks.twitter },
];

const InputField = ({ label, id, type = "text", value, onChange, required, isTextarea }) => (
    <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-sm font-medium text-[var(--color-text)]">
            {label} {required && <span className="text-[var(--color-accent)]">*</span>}
        </label>
        {isTextarea ? (
            <textarea
                id={id}
                rows={5}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text)] text-sm placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors resize-none"
                placeholder={`Your ${label.toLowerCase()}...`}
            />
        ) : (
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text)] text-sm placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
                placeholder={`Your ${label.toLowerCase()}...`}
            />
        )}
    </div>
);

const Contact = () => {
    const formRef = useRef(null);
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState("idle"); // "idle" | "sending" | "success" | "error"

    const handleChange = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");
        try {
            await emailjs.send(
                "YOUR_SERVICE_ID",     // Replace with your EmailJS service ID
                "YOUR_TEMPLATE_ID",    // Replace with your EmailJS template ID
                {
                    from_name: form.name,
                    from_email: form.email,
                    subject: form.subject,
                    message: form.message,
                    to_name: "Ekele Stephen",
                },
                "YOUR_PUBLIC_KEY"      // Replace with your EmailJS public key
            );
            setStatus("success");
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch {
            setStatus("error");
        }
        setTimeout(() => setStatus("idle"), 5000);
    };

    return (
        <div className="relative overflow-hidden">
            <StarsBackground />
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div variants={textVariant()} className="text-center mb-16">
                    <p className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-widest mb-2">
                        Get in Touch
                    </p>
                    <h2 className="section-title text-[var(--color-text)]">Contact Me</h2>
                    <p className="mt-4 text-[var(--color-muted)] max-w-lg mx-auto">
                        Have a project in mind? Looking to hire? Or just want to say hi?
                        I'd love to hear from you — let's build something great together.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
                    {/* Left: info */}
                    <motion.div
                        variants={fadeIn("right", 0.2)}
                        className="lg:col-span-2 flex flex-col gap-8"
                    >
                        {/* Contact info */}
                        <div className="card p-6 flex flex-col gap-5">
                            {CONTACT_INFO.map(({ icon, label, value, href }) => (
                                <div key={label} className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-2)] flex items-center justify-center text-[var(--color-accent)] flex-shrink-0">
                                        {icon}
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--color-muted)] uppercase tracking-widest font-semibold mb-0.5">
                                            {label}
                                        </p>
                                        {href ? (
                                            <a
                                                href={href}
                                                className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                                            >
                                                {value}
                                            </a>
                                        ) : (
                                            <p className="text-sm text-[var(--color-text)]">{value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social links */}
                        <div className="card p-6">
                            <p className="text-xs text-[var(--color-muted)] uppercase tracking-widest font-semibold mb-4">
                                Find Me Online
                            </p>
                            <div className="flex gap-4">
                                {SOCIAL.map(({ icon, label, href }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={label}
                                        className="w-11 h-11 rounded-xl flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-2)] border border-[var(--color-border)] transition-all duration-200 hover:border-[var(--color-accent)] hover:scale-110"
                                    >
                                        {icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Availability badge */}
                        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                                Available for new opportunities
                            </p>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div variants={fadeIn("left", 0.3)} className="lg:col-span-3">
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="card p-6 md:p-8 flex flex-col gap-5"
                            noValidate
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InputField
                                    label="Full Name"
                                    id="name"
                                    value={form.name}
                                    onChange={handleChange("name")}
                                    required
                                />
                                <InputField
                                    label="Email Address"
                                    id="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange("email")}
                                    required
                                />
                            </div>
                            <InputField
                                label="Subject"
                                id="subject"
                                value={form.subject}
                                onChange={handleChange("subject")}
                                required
                            />
                            <InputField
                                label="Message"
                                id="message"
                                value={form.message}
                                onChange={handleChange("message")}
                                required
                                isTextarea
                            />

                            {/* Status messages */}
                            {status === "success" && (
                                <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-4 py-3 rounded-xl">
                                    <HiCheckCircle size={16} />
                                    Message sent! I'll get back to you soon.
                                </div>
                            )}
                            {status === "error" && (
                                <div className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 px-4 py-3 rounded-xl">
                                    <HiExclamationCircle size={16} />
                                    Something went wrong. Please try emailing me directly.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {status === "sending" ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    "Send Message"
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SectionWrapper(Contact, "contact");
