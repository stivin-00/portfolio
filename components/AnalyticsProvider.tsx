"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const INTERACTION_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
const FALLBACK_DELAY_MS = 3500;

/**
 * Resolves true once the page has settled: on the first interaction, or a
 * few seconds after `load`, whichever comes first. Keeps the analytics SDK
 * (and gtag) off the critical path so it doesn't compete with first paint
 * and hydration.
 */
function usePageSettled() {
    const [settled, setSettled] = useState(false);

    useEffect(() => {
        let timer = 0;
        const settle = () => {
            setSettled(true);
            cleanup();
        };
        const startTimer = () => {
            timer = window.setTimeout(settle, FALLBACK_DELAY_MS);
        };
        const cleanup = () => {
            window.clearTimeout(timer);
            window.removeEventListener("load", startTimer);
            INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, settle));
        };

        INTERACTION_EVENTS.forEach((e) => window.addEventListener(e, settle, { once: true, passive: true }));
        if (document.readyState === "complete") startTimer();
        else window.addEventListener("load", startTimer, { once: true });

        return cleanup;
    }, []);

    return settled;
}

/**
 * Analytics Tracker Component (wrapped in Suspense)
 */
function AnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const settled = usePageSettled();

    useEffect(() => {
        if (!settled) return;
        trackEvent("page_view", {
            page_path: pathname,
            page_title: document.title,
        });
    }, [pathname, searchParams, settled]);

    return null;
}

/**
 * Analytics Provider Component
 * Loads Firebase Analytics lazily and tracks page views automatically
 */
export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Suspense fallback={null}>
                <AnalyticsTracker />
            </Suspense>
            {children}
        </>
    );
}
