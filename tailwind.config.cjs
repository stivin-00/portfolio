/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
                accent: "var(--color-accent)",
                surface: "var(--color-surface)",
                "surface-2": "var(--color-surface-2)",
                muted: "var(--color-muted)",
                border: "var(--color-border)",
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            animation: {
                "gradient-x": "gradient-x 4s ease infinite",
                "float": "float 6s ease-in-out infinite",
                "pulse-slow": "pulse 4s ease-in-out infinite",
                "slide-up": "slide-up 0.6s ease forwards",
                "fade-in": "fade-in 0.8s ease forwards",
                "spin-slow": "spin 12s linear infinite",
            },
            keyframes: {
                "gradient-x": {
                    "0%, 100%": { "background-position": "0% 50%" },
                    "50%": { "background-position": "100% 50%" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "slide-up": {
                    "0%": { opacity: 0, transform: "translateY(30px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
                "fade-in": {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
            },
            backgroundSize: {
                "200%": "200% 200%",
            },
            boxShadow: {
                glow: "0 0 20px rgba(124, 58, 237, 0.4)",
                "glow-lg": "0 0 40px rgba(124, 58, 237, 0.3)",
            },
        },
    },
    plugins: [],
};
