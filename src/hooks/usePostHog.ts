import { useCallback, useEffect } from 'react'
import posthog from 'posthog-js'

export const usePostHog = () => {
  useEffect(() => {
    // Identify user if they are logged in
    const userId = localStorage.getItem('userId')
    if (userId) {
      posthog.identify(userId)
    }
  }, [])

  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    posthog.capture(eventName, properties)
  }, [])

  const trackPageView = useCallback((path: string) => {
    posthog.capture('$pageview', { path })
  }, [])

  return {
    trackEvent,
    trackPageView,
  }
}