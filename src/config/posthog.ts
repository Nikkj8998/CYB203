import posthog from 'posthog-js'

// Initialize PostHog with your project API key
// You should move this key to your environment variables
export const initPostHog = () => {
    posthog.init(
        'YOUR_POSTHOG_API_KEY', // Replace with your actual PostHog API key
        {
            api_host: 'https://app.posthog.com', // Use your PostHog instance URL
            loaded: (posthog) => {
                if (process.env.NODE_ENV === 'development') {
                    // In development, let's be verbose with the debug messages
                    posthog.debug()
                }
            },
            autocapture: true,
            // Disable in development
            capture_pageview: process.env.NODE_ENV === 'production',
            persistence: 'localStorage',
        }
    )
}

// Export PostHog instance for direct use
export { posthog }