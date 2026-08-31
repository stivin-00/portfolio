import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | undefined;
let analytics: Analytics | undefined;

/**
 * Initialize Firebase app
 * Returns the Firebase app instance, initializing it if needed
 */
export function getFirebaseApp(): FirebaseApp | undefined {
    if (typeof window === "undefined") {
        // Firebase should only be initialized on the client side
        return undefined;
    }

    if (!app && getApps().length === 0) {
        // Check if all required config values are present
        const hasRequiredConfig = Object.values(firebaseConfig).every((value) => value);

        if (!hasRequiredConfig) {
            console.warn("Firebase config is incomplete. Analytics will not be initialized.");
            return undefined;
        }

        app = initializeApp(firebaseConfig);
    } else if (!app && getApps().length > 0) {
        app = getApps()[0];
    }

    return app;
}

/**
 * Get Firebase Analytics instance
 * Returns undefined if Analytics is not available (e.g., during SSR or if config is missing)
 */
export function getFirebaseAnalytics(): Analytics | undefined {
    if (typeof window === "undefined") {
        return undefined;
    }

    if (!analytics) {
        const firebaseApp = getFirebaseApp();
        if (firebaseApp && firebaseConfig.measurementId) {
            analytics = getAnalytics(firebaseApp);
        }
    }

    return analytics;
}
