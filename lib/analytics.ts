import { logEvent } from "firebase/analytics";
import { getFirebaseAnalytics } from "./firebase";

/**
 * Track a custom event in Firebase Analytics
 * @param eventName - The name of the event to track
 * @param parameters - Optional parameters to include with the event
 */
export function trackEvent(
    eventName: string,
    parameters?: Record<string, string | number | boolean>
) {
    const analytics = getFirebaseAnalytics();

    if (!analytics) {
        // Analytics not available (SSR, missing config, or ad blockers)
        // Fail silently in production
        if (process.env.NODE_ENV === "development") {
            console.log(`Analytics event (not tracked): ${eventName}`, parameters);
        }
        return;
    }

    try {
        logEvent(analytics, eventName, parameters);
    } catch (error) {
        // Handle errors gracefully (e.g., ad blockers, network issues)
        if (process.env.NODE_ENV === "development") {
            console.error("Failed to track event:", eventName, error);
        }
    }
}

/**
 * Track when a user views a project
 */
export function trackProjectView(projectName: string, projectUrl: string) {
    trackEvent("project_view", {
        project_name: projectName,
        project_url: projectUrl,
    });
}

/**
 * Track when a user clicks on GitHub link
 */
export function trackGitHubClick() {
    trackEvent("github_click", {
        destination: "github",
    });
}

/**
 * Track when a user clicks on LinkedIn link
 */
export function trackLinkedInClick() {
    trackEvent("linkedin_click", {
        destination: "linkedin",
    });
}

/**
 * Track when a user downloads the resume/CV
 */
export function trackResumeDownload() {
    trackEvent("resume_download");
}

/**
 * Track when a user clicks on an email link
 */
export function trackEmailClick() {
    trackEvent("email_click", {
        action: "contact",
    });
}

/**
 * Track when a user clicks on a CTA (Call to Action) button
 */
export function trackCTAClick(ctaName: string) {
    trackEvent("cta_click", {
        cta_name: ctaName,
    });
}

/**
 * Track when a user clicks on a phone/call link
 */
export function trackPhoneClick() {
    trackEvent("phone_click", {
        action: "contact",
    });
}
