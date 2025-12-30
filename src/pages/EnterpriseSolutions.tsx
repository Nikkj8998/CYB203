import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Star, Globe, Smartphone, Code2, Palette, Settings, Wrench, Link as LinkIcon, LayoutDashboard } from "lucide-react";
import enterpriseSolutionsHero from "@/assets/enterprise-solutions-hero.jpg";
import customSoftwareDev from "@/assets/custom-software-dev.jpg";
import aiAutomationProcess from "@/assets/ai-automation-process.jpg";
import { Link } from "react-router-dom";

const EnterpriseSolutions = () => {
  const location = useLocation();
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [location.hash]);
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">

      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-primary/40 rounded-full blur-xl animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-accent/25 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '15s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-primary/30 rounded-full blur-xl animate-pulse" style={{ animationDuration: '25s' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-accent/35 rounded-full blur-2xl animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}></div>

          {/* Geometric shapes */}
          <div className="absolute top-1/5 right-1/5 w-32 h-32 border-2 border-accent/40 rotate-45 animate-spin" style={{ animationDuration: '40s' }}></div>
          <div className="absolute bottom-1/5 left-1/5 w-24 h-24 border-2 border-primary/40 rotate-12 animate-pulse" style={{ animationDuration: '18s' }}></div>
          <div className="absolute top-2/3 right-2/3 w-40 h-40 border-2 border-accent/30 rounded-full animate-spin" style={{ animationDuration: '35s', animationDirection: 'reverse' }}></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen py-20 md:py-0">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
              <div className="animate-fade-in">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white text-balance">
                  Custom Software Development for SMEs & AI Business Process Automation
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 leading-relaxed text-white/90">
                  Transform your small to medium enterprise with cutting-edge ERP CRM solutions, manufacturing digital marketing, and healthcare practice management software. Our expert product development team delivers scalable, secure solutions tailored for your business growth.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-start animate-slide-up">
                  <Link to="/contact" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg hover-lift">
                      Schedule Your Free Consultation
                    </Button>
                  </Link>
                  <a
                    href="https://wa.me/919028541383?text=Hi%2C%20I%20would%20like%20to%20explore%20your%20solutions%20and%20know%20more%20about%20your%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto border-white text-black hover:bg-white hover:text-black px-6 md:px-8 py-3 md:py-4 text-base md:text-lg hover-lift"
                    >
                      Explore Our Solutions
                    </Button>
                  </a>

                </div>
              </div>
              <div className="animate-slide-up animate-delay-200">
                <img
                  src={enterpriseSolutionsHero}
                  alt="Futuristic enterprise software development workspace"
                  className="w-full h-auto rounded-xl md:rounded-2xl shadow-2xl hover-lift"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Individual Software Development Services */}
      <section ref={servicesRef} className="py-12 md:py-16 px-4 md:px-6 animate-fade-in overflow-hidden bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 md:mb-6 text-white px-4">
            Software Development & Web Design Services
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-center mb-8 md:mb-12 max-w-4xl mx-auto text-white/80 px-4">
            Comprehensive development solutions tailored to your business needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Website Development */}
            <div id="website-development" className="scroll-mt-24">
              <Card className="bg-card/10 backdrop-blur-sm border-white/20 hover-lift h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="h-8 w-8 text-primary" />
                    <h3 className="text-xl md:text-2xl font-bold text-white">Website Development</h3>
                  </div>
                  <p className="text-white/80 mb-4">
                    Professional website development services that create stunning, responsive, and SEO-optimized websites that drive business growth and enhance your online presence.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Custom website design & development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">E-commerce website solutions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">WordPress & CMS development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Landing pages & microsites</span>
                    </li>
                  </ul>
                  <a href="https://wa.me/919028541383?text=Hi%20CybaemTech%2C%20I%20am%20interested%20in%20Website%20Development%20services" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-accent hover:bg-accent/90">Get Quote</Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Web Applications */}
            <div id="web-applications" className="scroll-mt-24">
              <Card className="bg-card/10 backdrop-blur-sm border-white/20 hover-lift h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <LayoutDashboard className="h-8 w-8 text-primary" />
                    <h3 className="text-xl md:text-2xl font-bold text-white">Web Applications</h3>
                  </div>
                  <p className="text-white/80 mb-4">
                    Scalable and secure web applications built with modern technologies like React, Angular, Vue.js, and Node.js to automate your business processes.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Single Page Applications (SPA)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Progressive Web Apps (PWA)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Custom dashboards & portals</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Real-time web applications</span>
                    </li>
                  </ul>
                  <a href="https://wa.me/919028541383?text=Hi%20CybaemTech%2C%20I%20am%20interested%20in%20Web%20Applications%20development" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-accent hover:bg-accent/90">Get Quote</Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Mobile App Development */}
            <div id="mobile-app-development" className="scroll-mt-24">
              <Card className="bg-card/10 backdrop-blur-sm border-white/20 hover-lift h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Smartphone className="h-8 w-8 text-primary" />
                    <h3 className="text-xl md:text-2xl font-bold text-white">Mobile App Development</h3>
                  </div>
                  <p className="text-white/80 mb-4">
                    Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences and business functionality.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">React Native & Flutter apps</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Native iOS & Android development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">App store submission & optimization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Enterprise mobile solutions</span>
                    </li>
                  </ul>
                  <a href="https://wa.me/919028541383?text=Hi%20CybaemTech%2C%20I%20am%20interested%20in%20Mobile%20App%20Development" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-accent hover:bg-accent/90">Get Quote</Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* ERP Development */}
            <div id="erp-development" className="scroll-mt-24">
              <Card className="bg-card/10 backdrop-blur-sm border-white/20 hover-lift h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="h-8 w-8 text-primary" />
                    <h3 className="text-xl md:text-2xl font-bold text-white">ERP Development</h3>
                  </div>
                  <p className="text-white/80 mb-4">
                    Custom ERP solutions that streamline your business operations, from inventory management to financial reporting and resource planning.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Custom ERP development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Inventory & supply chain management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Financial & accounting modules</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">HR & payroll systems</span>
                    </li>
                  </ul>
                  <a href="https://wa.me/919028541383?text=Hi%20CybaemTech%2C%20I%20am%20interested%20in%20ERP%20Development" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-accent hover:bg-accent/90">Get Quote</Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* CRM Development */}
            <div id="crm-development" className="scroll-mt-24">
              <Card className="bg-card/10 backdrop-blur-sm border-white/20 hover-lift h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Code2 className="h-8 w-8 text-primary" />
                    <h3 className="text-xl md:text-2xl font-bold text-white">CRM Development</h3>
                  </div>
                  <p className="text-white/80 mb-4">
                    Custom CRM solutions to manage customer relationships, sales pipelines, and marketing campaigns effectively.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Sales & lead management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Customer service & support portals</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Marketing automation integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Analytics & reporting dashboards</span>
                    </li>
                  </ul>
                  <a href="https://wa.me/919028541383?text=Hi%20CybaemTech%2C%20I%20am%20interested%20in%20CRM%20Development" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-accent hover:bg-accent/90">Get Quote</Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* UI/UX Design */}
            <div id="ui-ux-design" className="scroll-mt-24">
              <Card className="bg-card/10 backdrop-blur-sm border-white/20 hover-lift h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Palette className="h-8 w-8 text-primary" />
                    <h3 className="text-xl md:text-2xl font-bold text-white">UI/UX Design</h3>
                  </div>
                  <p className="text-white/80 mb-4">
                    User-centered design services that create intuitive, visually appealing interfaces that enhance user engagement and conversion rates.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">User research & persona development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Wireframing & prototyping</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Visual design & branding</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Usability testing & optimization</span>
                    </li>
                  </ul>
                  <a href="https://wa.me/919028541383?text=Hi%20CybaemTech%2C%20I%20am%20interested%20in%20UI%2FUX%20Design%20services" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-accent hover:bg-accent/90">Get Quote</Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* API Integrations */}
            <div id="api-integrations" className="scroll-mt-24">
              <Card className="bg-card/10 backdrop-blur-sm border-white/20 hover-lift h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <LinkIcon className="h-8 w-8 text-primary" />
                    <h3 className="text-xl md:text-2xl font-bold text-white">API Integrations</h3>
                  </div>
                  <p className="text-white/80 mb-4">
                    Seamless API integration services to connect your applications with third-party services, payment gateways, and enterprise systems.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">RESTful & GraphQL API development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Payment gateway integrations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Third-party service connections</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Legacy system integration</span>
                    </li>
                  </ul>
                  <a href="https://wa.me/919028541383?text=Hi%20CybaemTech%2C%20I%20am%20interested%20in%20API%20Integration%20services" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-accent hover:bg-accent/90">Get Quote</Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Website Maintenance */}
            <div id="website-maintenance" className="scroll-mt-24">
              <Card className="bg-card/10 backdrop-blur-sm border-white/20 hover-lift h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Wrench className="h-8 w-8 text-primary" />
                    <h3 className="text-xl md:text-2xl font-bold text-white">Website Maintenance</h3>
                  </div>
                  <p className="text-white/80 mb-4">
                    Comprehensive website maintenance and support services to keep your digital assets secure, updated, and performing optimally.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Regular updates & security patches</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Performance monitoring & optimization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">Content updates & management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white/70">24/7 technical support</span>
                    </li>
                  </ul>
                  <a href="https://wa.me/919028541383?text=Hi%20CybaemTech%2C%20I%20am%20interested%20in%20Website%20Maintenance%20services" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-accent hover:bg-accent/90">Get Quote</Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 md:py-16 px-4 md:px-6 animate-fade-in overflow-hidden" id="services">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 md:mb-6 text-white px-4">
            Comprehensive Digital Marketing Solutions for Growing Businesses
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-center mb-8 md:mb-12 max-w-4xl mx-auto text-white/80 px-4">
            From custom software development to enterprise automation, we help SMEs leverage technology for competitive advantage and operational excellence.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center mb-8 md:mb-12">
            <div className="animate-slide-up">
              <img
                src={customSoftwareDev}
                alt="Custom software development laboratory"
                className="w-full h-auto rounded-xl md:rounded-2xl shadow-2xl hover-lift"
              />
            </div>
            <div className="animate-slide-up animate-delay-200">
              <Card className="bg-card/10 backdrop-blur-sm border-white/20 hover-lift card-interactive">
                <CardContent className="p-5 md:p-6 lg:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">Custom Software Development for SMEs</h3>
                  <p className="text-sm md:text-base text-white/80 mb-4 md:mb-6">
                    Tailor-made software solutions designed specifically for small and medium enterprises. Our agile software development methodology ensures rapid delivery without compromising quality.
                  </p>
                  <ul className="space-y-2 mb-4 md:mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-white/70">Cloud native application development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-white/70">Mobile app development for healthcare</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-white/70">API integration services</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-white/70">DevOps consulting services</span>
                    </li>
                  </ul>
                  <a
                    href="https://wa.me/919028541383?text=Hi%20CybaemTech%2C%20I%20would%20like%20to%20get%20a%20custom%20quote%20for%20Custom%20Software%20Development%20for%20SMEs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-accent hover:bg-accent/90 hover-glow text-sm md:text-base">
                      Get Custom Quote
                    </Button>
                  </a>

                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="animate-slide-up">
              <Card className="bg-card/10 backdrop-blur-sm border-white/20 hover-lift card-interactive">
                <CardContent className="p-5 md:p-6 lg:p-8">

                  <h3 id="erp" className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">ERP CRM Solutions Small Business</h3>
                  <p className="text-sm md:text-base text-white/80 mb-4 md:mb-6">
                    Integrated enterprise resource planning and customer relationship management systems that grow with your business. Perfect for businesses seeking affordable automation tools.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-white/70">Sales Cloud with lead management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-white/70">Service Cloud for customer support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-white/70">Marketing automation tools</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-white/70">Real-time analytics and reporting</span>
                    </li>
                  </ul>
                  <a
                    href="https://wa.me/919028541383?text=Hi%20CybaemTech%2C%20I%20would%20like%20to%20request%20a%20demo%20for%20your%20ERP%20CRM%20Solutions%20Small%20Business"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-accent hover:bg-accent/90 hover-glow">
                      Request ERP/CRM Demo
                    </Button>
                  </a>

                </CardContent>
              </Card>
            </div>
            <div className="animate-slide-up animate-delay-200">
              <img
                src={aiAutomationProcess}
                alt="AI business process automation"
                className="w-full h-auto rounded-xl md:rounded-2xl shadow-2xl hover-lift"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <img
                src={aiAutomationProcess}
                alt="AI automation and intelligent systems"
                className="w-full h-auto rounded-2xl shadow-2xl hover-lift"
              />
            </div>
            <div className="animate-slide-up animate-delay-200">
              <Card className="bg-card/10 backdrop-blur-sm border-white/20 hover-lift card-interactive">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-white">AI Business Process Automation</h3>
                  <p className="text-white/80 mb-6">
                    Harness the power of artificial intelligence to automate workflows, reduce manual processes, and optimize business operations for maximum efficiency.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-white/70">Intelligent workflow automation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-white/70">Machine learning integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-white/70">Data analytics and insights</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-white/70">Low code development platform</span>
                    </li>
                  </ul>
                  <a
                    href="https://wa.me/919028541383?text=Hi%2C%20I%20am%20interested%20in%20starting%20an%20AI%20Business%20Process%20Automation.%20Please%20share%20more%20details."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-accent hover:bg-accent/90 hover-glow">
                      Start AI Transformation
                    </Button>
                  </a>

                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-12 md:py-16 px-4 md:px-6 animate-fade-in overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-white px-4">
            Industry-Specific Solutions for Maximum Impact
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card className="bg-card/10 backdrop-blur-sm border-white/20 hover-lift animate-slide-up animate-delay-100">
              <CardContent className="p-4 md:p-5 lg:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white">Manufacturing Digital Transformation</h3>
                <p className="text-sm md:text-base text-white/80">
                  Streamline production processes, implement IoT solutions, and optimize supply chain management with our manufacturing-focused digital transformation strategy.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/10 backdrop-blur-sm border-white/20 hover-lift animate-slide-up animate-delay-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">Healthcare Practice Management Software</h3>
                <p className="text-sm md:text-base text-white/80">
                  HIPAA-compliant healthcare solutions including patient management systems, appointment scheduling, and electronic health records integration.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/10 backdrop-blur-sm border-white/20 hover-lift animate-slide-up animate-delay-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">Enterprise Software Consulting</h3>
                <p className="text-sm md:text-base text-white/80">
                  Strategic technology consulting to help businesses choose the right software architecture and implementation approach for long-term success.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/10 backdrop-blur-sm border-white/20 hover-lift animate-slide-up animate-delay-400">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">Product Development Team Outsourcing</h3>
                <p className="text-sm md:text-base text-white/80">
                  Access to skilled developers and architects through our flexible outsourcing model, perfect for startups and growing businesses.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-4 animate-fade-in">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 text-white">
            Cutting-Edge Technologies We Master
          </h2>
          <p className="text-lg text-center mb-12 text-white/80">
            Our expert development team leverages the latest technologies to build robust, scalable solutions
          </p>

          <div className="space-y-12">
            <div className="animate-slide-up animate-delay-100">
              <h3 className="text-2xl font-bold mb-6 text-white">Frontend Technologies</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {['React', 'Angular', 'Vue.js', 'Next.js'].map((tech) => (
                  <span key={tech} className="px-6 py-3 bg-card/10 backdrop-blur-sm border border-white/20 rounded-full font-medium text-white hover-lift">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="animate-slide-up animate-delay-200">
              <h3 className="text-2xl font-bold mb-6 text-white">Backend & Cloud Technologies</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {['Node.js', 'Python', 'Java', '.NET', 'AWS', 'Azure', 'Google Cloud'].map((tech) => (
                  <span key={tech} className="px-6 py-3 bg-card/10 backdrop-blur-sm border border-white/20 rounded-full font-medium text-white hover-lift">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="animate-slide-up animate-delay-300">
              <h3 className="text-2xl font-bold mb-6 text-white">Mobile & Database</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {['React Native', 'Flutter', 'PostgreSQL', 'MongoDB', 'MySQL'].map((tech) => (
                  <span key={tech} className="px-6 py-3 bg-card/10 backdrop-blur-sm border border-white/20 rounded-full font-medium text-white hover-lift">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 animate-fade-in">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 text-white">
            Our Proven Development Process
          </h2>
          <p className="text-lg text-center mb-12 text-white/80">
            A systematic approach ensuring successful project delivery and client satisfaction
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Discovery & Analysis',
                description: 'Understanding your business requirements, objectives, and technical constraints to design the perfect solution.'
              },
              {
                step: 2,
                title: 'Strategic Planning',
                description: 'Detailed project planning, architecture design, and technology selection aligned with your business goals.'
              },
              {
                step: 3,
                title: 'Agile Development',
                description: 'Iterative development with regular updates, feedback incorporation, and continuous quality assurance.'
              },
              {
                step: 4,
                title: 'Deployment & Support',
                description: 'Seamless deployment, comprehensive testing, training, and ongoing technical support for optimal performance.'
              }
            ].map((process, index) => (
              <div key={process.step} className={`text-center animate-slide-up animate-delay-${(index + 1) * 100}`}>
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 hover-glow">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{process.title}</h3>
                <p className="text-sm md:text-base text-white/80">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 animate-fade-in">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-white">
            Trusted by Growing Businesses Worldwide
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '200+', label: 'Successful Projects Delivered' },
              { number: '95%', label: 'Client Satisfaction Rate' },
              { number: '5+', label: 'Countries Served' },
              { number: '50+', label: 'Expert Developers' }
            ].map((stat, index) => (
              <div key={index} className={`p-6 animate-scale-in animate-delay-${(index + 1) * 100}`}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <p className="text-sm md:text-base text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 animate-fade-in">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-white">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card/10 backdrop-blur-sm border-white/20 hover-lift animate-slide-up animate-delay-100">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg italic mb-6 text-white/80">
                  "Cybaem Tech transformed our manufacturing operations with their AI-powered automation solution. We saw a 40% reduction in manual processes and significant cost savings within the first quarter."
                </p>
                <div className="font-medium text-white">
                  <div className="font-bold">Sarah Johnson</div>
                  <div className="text-sm text-white/60">Operations Director, TechManufacturing Inc.</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/10 backdrop-blur-sm border-white/20 hover-lift animate-slide-up animate-delay-200">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg italic mb-6 text-white/80">
                  "Their ERP solution perfectly fits our healthcare practice needs. The HIPAA compliance and patient management features have streamlined our operations significantly."
                </p>
                <div className="font-medium text-white">
                  <div className="font-bold">Dr. Michael Chen</div>
                  <div className="text-sm text-white/60">Practice Manager, HealthCare Solutions</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 animate-fade-in">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-white">
            Why SMEs Choose Cybaem Tech
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'SME-Focused Approach',
                description: 'Unlike enterprise-focused competitors, we specialize in scalable solutions designed specifically for small and medium businesses.'
              },
              {
                title: 'Cost-Effective Solutions',
                description: 'Maximum value for your investment with transparent pricing and flexible engagement models that fit your budget.'
              },
              {
                title: 'Global Delivery Excellence',
                description: 'Serving clients across USA, UK, UAE, Australia, and India with 24/7 support and consistent quality delivery.'
              },
              {
                title: 'Rapid Time-to-Market',
                description: 'Agile methodology and DevOps practices ensure faster delivery without compromising on security or quality.'
              }
            ].map((feature, index) => (
              <Card key={index} className={`bg-card/10 backdrop-blur-sm border-white/20 hover-lift animate-slide-up animate-delay-${(index + 1) * 100}`}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-sm md:text-base text-white/80">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-card/10 backdrop-blur-sm text-white animate-fade-in" id="contact">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Business with Custom Software Solutions?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/80">
            Join hundreds of SMEs who have successfully digitized their operations with our expert development team. Get started with a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 px-8 py-4 text-lg hover-glow">
                Schedule Your Free Consultation
              </Button>
            </Link>
            <a
              href="https://wa.me/919028541383?text=Hi%20CybaemTech%2C%20I%20would%20like%20to%20get%20a%20custom%20quote%20for%20your%20Custom%20Software%20Solutions%3F"

              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-black px-8 py-4 text-lg hover-glow"
              >
                Get Your Custom Quote Today
              </Button>
            </a>

          </div>
          <p className="text-lg font-medium text-white/80">
            <strong className="text-white">Free consultation • No obligation • Custom quote within 24 hours</strong>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EnterpriseSolutions;
