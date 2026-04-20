// =====================
// Framer Motion Variants
// =====================

export const fadeInUp = (delay = 0, duration = 0.6) => ({
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "tween", duration, delay, ease: "easeOut" },
    },
});

export const fadeIn = (direction = "", delay = 0, duration = 0.75) => ({
    hidden: {
        opacity: 0,
        x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
        y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    },
    show: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { type: "tween", duration, delay, ease: "easeOut" },
    },
});

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
    hidden: {},
    show: {
        transition: {
            staggerChildren,
            delayChildren,
        },
    },
});

export const scaleIn = (delay = 0) => ({
    hidden: { opacity: 0, scale: 0.85 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 120, damping: 14, delay },
    },
});

export const slideIn = (direction, type, delay, duration) => ({
    hidden: {
        x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
        y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    },
    show: {
        x: 0,
        y: 0,
        transition: { type, delay, duration, ease: "easeOut" },
    },
});

export const textVariant = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", duration: 1.25, delay },
    },
});
