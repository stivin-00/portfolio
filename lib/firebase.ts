import type { Analytics, logEvent as LogEvent } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export type AnalyticsHandle = { analytics: Analytics; logEvent: typeof LogEvent };

let analyticsPromise: Promise<AnalyticsHandle | null> | null = null;

/**
 * Loads Firebase Analytics on demand. The SDK is code-split (dynamic import)
 * so it never sits in the initial JavaScript bundle; it's fetched the first
 * time an event is tracked. Resolves to null during SSR, when the config is
 * incomplete, or when analytics isn't supported (e.g. blocked).
 */
export function loadAnalytics(): Promise<AnalyticsHandle | null> {
    if (typeof window === "undefined") return Promise.resolve(null);

    if (!analyticsPromise) {
        const hasRequiredConfig = Object.values(firebaseConfig).every((value) => value);
        if (!hasRequiredConfig) {
            if (process.env.NODE_ENV === "development") {
                console.warn("Firebase config is incomplete. Analytics will not be initialized.");
            }
            analyticsPromise = Promise.resolve(null);
            return analyticsPromise;
        }

        analyticsPromise = (async () => {
            const [{ initializeApp, getApps }, analyticsModule] = await Promise.all([
                import("firebase/app"),
                import("firebase/analytics"),
            ]);
            if (!(await analyticsModule.isSupported())) return null;
            const app = getApps()[0] ?? initializeApp(firebaseConfig);
            return { analytics: analyticsModule.getAnalytics(app), logEvent: analyticsModule.logEvent };
        })().catch(() => null);
    }

    return analyticsPromise;
}
