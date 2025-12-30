export const GA_TRACKING_IDS = ["G-NHQ9K2Z6NB", "G-H9RF346Q2X"]; // Your GA IDs

export const loadGA = () => {
  if (!window.gtag) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_IDS[0]}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) { window.dataLayer.push(args); }
    window.gtag = gtag;

    gtag("js", new Date());

    GA_TRACKING_IDS.forEach(id => {
      gtag("config", id, { send_page_view: false });
    });
  }
};

// ✅ Track Virtual Page Views
export const trackPageView = (page: string) => {
  if (window.gtag) {
    const sanitizedPage = page.toLowerCase().replace(/\s+/g, "-");

    GA_TRACKING_IDS.forEach(id => {
      window.gtag("event", "page_view", {
        page_path: `/${sanitizedPage}`,
        page_title: page.charAt(0).toUpperCase() + page.slice(1),
        page_location: window.location.href, // 👈 Full URL included
        send_to: id,
      });
    });
  }
};
