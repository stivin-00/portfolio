"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getFirebaseAnalytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

/**
 * Analytics Tracker Component (wrapped in Suspense)
 */
function AnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Initialize analytics on mount
        const analytics = getFirebaseAnalytics();

        if (!analytics) {
            // Analytics not available - fail silently
            return;
        }

        // Track page view
        try {
            logEvent(analytics, "page_view", {
                page_path: pathname,
                page_title: document.title,
            });
        } catch (error) {
            // Handle errors gracefully
            if (process.env.NODE_ENV === "development") {
                console.error("Failed to track page view:", error);
            }
        }
    }, [pathname, searchParams]);

    return null;
}

/**
 * Analytics Provider Component
 * Initializes Firebase Analytics and tracks page views automatically
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
