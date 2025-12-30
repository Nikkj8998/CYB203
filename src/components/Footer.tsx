import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SocialIcons } from "@/components/SocialIcons";



const Footer = () => (
  <footer className="bg-gray-800 text-white py-8 md:py-10 border-t border-gray-700">
    <div className="container max-w-7xl mx-auto mobile-padding">
      {/* Footer Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-6 md:mb-8">
        {/* Company Info + Social Icons */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center space-x-2 mb-4">
            <img
              src="/uploads/footerlogo.webp"
              alt="CybaemTech Logo"
              className="h-40 md:h-16 w-auto"
            />
          </div>
          <p className="text-white/80 text-sm leading-relaxed mb-4">
            Beyond Limits. Transforming businesses through innovative technology
            solutions and strategic digital partnerships.
          </p>
          <SocialIcons variant="footer" className="mb-4" iconSize={20} />
          <div className="flex space-x-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                (window.location.href = "/contact?source=footer-cta")
              }
              className="bg-white text-gray-900 border-white hover:text-primary hover:bg-white hover:border-primary transition-all duration-300 touch-target"
            >
              Contact Us
            </Button>
          </div>
        </div>

        {/* Solutions Section */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-4 text-white">
            Solutions
          </h3>
          <ul className="space-y-2">
            {[
              "cloud-solutions",
              "enterprise-solutions",
              "cybersecurity-services",
              "ai-data-analytics",
              "digital-marketing",
              "managed-services",
            ].map((path) => (
              <li key={path}>
                <a
                  href={`/${path}`}
                  className="text-white/80 hover:text-accent text-sm transition-colors block py-0.5"
                >
                  {path
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Industries Section */}
        <div>
          <div className="border-t border-white/30 pt-4 mb-4 md:hidden"></div>
          <h3 className="text-base md:text-lg font-semibold mb-4 text-white">
            Industries
          </h3>
          <ul className="space-y-2">
            {[
              "manufacturing",
              "healthcare",
              "finance",
              "retail",
              "education",
              "technology",
            ].map((id) => (
              <li key={id}>
                <a
                  href={`/industries#${id}`}
                  className="text-white/80 hover:text-accent text-sm transition-colors block py-0.5"
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <div className="border-t border-white/30 pt-4 mb-4 md:hidden"></div>
          <h3 className="text-base md:text-lg font-semibold mb-4 text-white">
            Company
          </h3>
          <ul className="space-y-2">
            {["about", "leadership", "careers"].map((path) => (
              <li key={path}>
                <a
                  href={`/${path}`}
                  className="text-white/80 hover:text-accent text-sm transition-colors block py-0.5"
                >
                  {path
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/resources"
                className="text-white/80 hover:text-accent text-sm transition-colors block py-0.5"
              >
                Case Studies
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Separator className="bg-white/20 mb-4" />

      {/* Bottom Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
        <div className="text-sm text-white/60">
          © {new Date().getFullYear()} CybaemTech. All rights reserved.
        </div>
        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
          <a
            href="/privacy-policy"
            className="text-white/60 hover:text-accent transition-colors touch-target"
          >
            Privacy Policy
          </a>
          <a
            href="/privacy-policy#third-party"
            className="text-white/60 hover:text-accent transition-colors touch-target"
          >
            Terms of Service
          </a>
          <a
            href="/privacy-policy#cookies"
            className="text-white/60 hover:text-accent transition-colors touch-target"
          >
            Cookie Policy
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
