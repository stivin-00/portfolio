import React from "react";
import { motion } from "framer-motion";
import { testimonials } from "../constants";
import SectionWrapper from "../hoc/SectionWrapper";
import { textVariant, staggerContainer, fadeInUp } from "../utils/motion";
import { HiStar } from "react-icons/hi";

const TestimonialCard = ({ testimonial, index }) => (
    <motion.div
        variants={fadeInUp(index * 0.1)}
        className="card p-6 flex flex-col gap-4 relative"
    >
        {/* Quote mark */}
        <span className="text-6xl text-[var(--color-accent)] opacity-20 font-serif leading-none absolute top-4 right-5 select-none">
            "
        </span>

        {/* Stars */}
        <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
                <HiStar key={i} size={14} className="text-amber-400" />
            ))}
        </div>

        {/* Quote */}
        <p className="text-sm text-[var(--color-muted)] leading-relaxed italic flex-1">
            "{testimonial.quote}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-2 border-t border-[var(--color-border)]">
            <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover"
                loading="lazy"
            />
            <div>
                <p className="text-sm font-semibold text-[var(--color-text)]">{testimonial.name}</p>
                <p className="text-xs text-[var(--color-muted)]">{testimonial.role}</p>
            </div>
        </div>
    </motion.div>
);

const Testimonials = () => (
    <div className="max-w-7xl mx-auto">
        <motion.div variants={textVariant()} className="text-center mb-12">
            <p className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-widest mb-2">
                Social Proof
            </p>
            <h2 className="section-title text-[var(--color-text)]">What People Say</h2>
        </motion.div>

        <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
            {testimonials.map((t, i) => (
                <TestimonialCard key={t.name + i} testimonial={t} index={i} />
            ))}
        </motion.div>
    </div>
);

export default SectionWrapper(Testimonials, "testimonials");
