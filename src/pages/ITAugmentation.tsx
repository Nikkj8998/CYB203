import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, BugPlay, CalendarCheck, CloudCog, Code2, Globe, GlobeIcon, LayoutDashboard, Mail, MonitorSmartphone, QuoteIcon, ShieldCheck, Timer, UserCheck, Users2, Workflow, Building, Laptop, Headphones, Network, FileText } from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { CreditCard, Heart, ShoppingCart, Truck, Monitor, Settings } from 'lucide-react';
import { FaCode, FaCloud, FaHeadset, FaShieldAlt, FaCheckCircle, FaUser } from 'react-icons/fa';

function ITAugmentation({ onBack }: { onBack?: () => void }) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.hash]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in').forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[100vh] px-6 text-center rounded-b-xl shadow-lg overflow-hidden bg-black">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600")',
          }}
        ></div>
        {/* Gradient Overlay (lighter, not solid black) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center min-h-[100vh]">
          <h1 className="text-5xl font-bold leading-tight mb-4 animate__animated animate__fadeIn animate__delay-1s text-white">
            IT Staff Augmentation Services
          </h1>
          <p className="text-xl mb-6 animate__animated animate__fadeIn animate__delay-2s text-gray-300">
            Scale Your Tech Teams with Global Talent
          </p>
          <p className="max-w-4xl mx-auto text-lg mb-10 text-opacity-80 animate__animated animate__fadeIn animate__delay-3s text-gray-300">
            Cybaem Tech provides end-to-end IT staff augmentation services with pre-screened, skilled IT professionals ready to integrate into your team seamlessly.
          </p>
          <button
            onClick={() => window.open("https://wa.me/9028541383?text=Hello! I'm interested in learning more.", "_blank")}
            className="bg-white text-blue-800 px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 inline-flex items-center justify-center"
          >
            Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* IT Staff Augmentation Services */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-6">Our IT Staff Augmentation Services</h2>
          <p className="text-lg text-center text-gray-300 mb-16 max-w-3xl mx-auto">
            Choose from our comprehensive range of staffing solutions designed to meet your unique business needs.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dedicated Onsite IT Engineers */}
            <div id="dedicated-onsite-it-engineers" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-blue-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-blue-900/50">
                <Building className="text-blue-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">Dedicated Onsite IT Engineers</h3>
              <p className="text-gray-300 text-center mb-4">
                Get experienced IT professionals working directly at your office, fully integrated with your team culture and workflows.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>Full-time onsite presence</li>
                <li>Seamless team integration</li>
                <li>Direct communication & collaboration</li>
                <li>Immediate issue resolution</li>
              </ul>
            </div>

            {/* Remote IT Specialists */}
            <div id="remote-it-specialists" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-green-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-green-900/50">
                <Laptop className="text-green-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">Remote IT Specialists</h3>
              <p className="text-gray-300 text-center mb-4">
                Access top-tier IT talent from anywhere in the world, working remotely but fully committed to your projects.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>Global talent pool access</li>
                <li>Cost-effective solutions</li>
                <li>Flexible working hours</li>
                <li>Scalable team size</li>
              </ul>
            </div>

            {/* Project-Based Staffing */}
            <div id="project-based-staffing" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-orange-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-orange-900/50">
                <LayoutDashboard className="text-orange-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">Project-Based Staffing</h3>
              <p className="text-gray-300 text-center mb-4">
                Hire skilled professionals for specific projects with defined scope, timeline, and deliverables.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>Clear project milestones</li>
                <li>Fixed budget control</li>
                <li>Specialized expertise</li>
                <li>End-to-end delivery</li>
              </ul>
            </div>

            {/* Helpdesk Outsourcing */}
            <div id="helpdesk-outsourcing" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-yellow-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-yellow-900/50">
                <Headphones className="text-yellow-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">Helpdesk Outsourcing</h3>
              <p className="text-gray-300 text-center mb-4">
                24/7 IT support desk services to handle user queries, technical issues, and maintain service levels.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>L1/L2/L3 support tiers</li>
                <li>Ticketing & SLA management</li>
                <li>Multi-channel support</li>
                <li>Knowledge base maintenance</li>
              </ul>
            </div>

            {/* Network & System Admins */}
            <div id="network-system-admins" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-purple-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-purple-900/50">
                <Network className="text-purple-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">Network & System Admins</h3>
              <p className="text-gray-300 text-center mb-4">
                Expert administrators to manage, monitor, and optimize your network infrastructure and systems.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>Server & network management</li>
                <li>Security & patch updates</li>
                <li>Performance monitoring</li>
                <li>Disaster recovery planning</li>
              </ul>
            </div>

            {/* Contract / Long-Term Hiring */}
            <div id="contract-long-term-hiring" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-red-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-red-900/50">
                <FileText className="text-red-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">Contract / Long-Term Hiring</h3>
              <p className="text-gray-300 text-center mb-4">
                Flexible contract arrangements for extended engagements, from 6 months to multi-year commitments.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>Long-term stability</li>
                <li>Contract-to-hire options</li>
                <li>Competitive rates</li>
                <li>Easy contract renewals</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-6">Our Resource Categories</h2>
          <p className="text-lg text-center text-gray-300 mb-16 max-w-3xl mx-auto">
            Handpicked IT professionals aligned with your goals, tech stack & project timelines.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: <FaCode className="text-indigo-400 w-8 h-8" />,
                title: "Software & Web Developers",
                points: [
                  "Full Stack (MEAN, MERN, LAMP)",
                  "React, Angular, Vue.js",
                  "Java, .NET, Node.js",
                  "Flutter, iOS/Android",
                ],
              },
              {
                icon: <FaCloud className="text-blue-400 w-8 h-8" />,
                title: "Cloud & DevOps Engineers",
                points: [
                  "AWS, Azure, GCP",
                  "Jenkins, GitHub Actions",
                  "Terraform, Ansible",
                  "Docker, Kubernetes",
                ],
              },
              {
                icon: <FaHeadset className="text-yellow-300 w-8 h-8" />,
                title: "IT Support & Infrastructure",
                points: [
                  "L1–L3 Support",
                  "SysAdmins (Win/Linux)",
                  "Cisco, Fortinet",
                  "Helpdesk, SLA",
                ],
              },
              {
                icon: <FaShieldAlt className="text-red-400 w-8 h-8" />,
                title: "Cybersecurity & Compliance",
                points: [
                  "SOC, Incident Response",
                  "SIEM, IAM, MFA",
                  "Splunk, QRadar",
                  "Firewall: Fortinet, Palo Alto",
                ],
              },
              {
                icon: <FaCheckCircle className="text-green-400 w-8 h-8" />,
                title: "QA & Testing Engineers",
                points: [
                  "Manual & Automation",
                  "Selenium, Cypress",
                  "JMeter, LoadRunner",
                  "Test Strategies",
                ],
              },
              {
                icon: <FaUser className="text-purple-400 w-8 h-8" />,
                title: "IT Recruiters & Coordinators",
                points: [
                  "Tech Hiring",
                  "Screening & Validation",
                  "Onboarding",
                  "HR Compliance",
                ],
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition p-6 backdrop-blur-md hover:bg-gray-800">
                <div className="flex items-center justify-center w-14 h-14 mb-4 mx-auto rounded-full bg-gray-800">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-center text-white mb-3">{item.title}</h3>
                <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-center text-white mb-4">Industries We Serve</h2>
          <p className="text-lg text-gray-300 mb-16 max-w-3xl mx-auto">
            We empower diverse industries by delivering specialized solutions and unmatched expertise.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { title: "Banking & Financial Services (BFSI)", icon: <CreditCard className="w-16 h-16 text-blue-400 stroke-[1.5]" /> },
              { title: "Healthcare & Pharma", icon: <Heart className="w-16 h-16 text-green-400 stroke-[1.5]" /> },
              { title: "Retail & E-Commerce", icon: <ShoppingCart className="w-16 h-16 text-pink-400 stroke-[1.5]" /> },
              { title: "Logistics & Transportation", icon: <Truck className="w-16 h-16 text-yellow-300 stroke-[1.5]" /> },
              { title: "Enterprise IT & Tech Startups", icon: <LayoutDashboard className="w-16 h-16 text-indigo-400 stroke-[1.5]" /> },
              { title: "Manufacturing & Engineering", icon: <Settings className="w-16 h-16 text-purple-400 stroke-[1.5]" /> },
            ].map((industry, idx) => (
              <div key={idx} className="relative group p-8 bg-gray-900 rounded-xl shadow-xl transition-transform transform hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-indigo-900 opacity-20 group-hover:opacity-40 transition-all"></div>
                <div className="z-10 mb-6 flex justify-center">{industry.icon}</div>
                <h4 className="text-xl font-semibold text-white leading-tight transition-all duration-300 group-hover:text-indigo-400">
                  {industry.title}
                </h4>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-indigo-900 opacity-10 group-hover:opacity-40 transition-all rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-center text-white mb-4">Engagement Models</h2>
          <p className="text-lg text-gray-300 mb-16 max-w-2xl mx-auto">
            Choose from flexible hiring structures tailored to your unique project and budget requirements.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-12">
            {/* Hourly */}
            <div className="group relative p-8 bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-[1.03]">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-blue-400 text-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition duration-300">
                <Timer className="w-6 h-6" />
              </div>
              <h3 className="mt-10 text-2xl font-semibold text-white mb-3">Hourly</h3>
              <p className="text-gray-300 text-base leading-relaxed">
                Ideal for agile teams and short-term assignments. Gain full flexibility and pay-as-you-go advantages.
              </p>
            </div>
            {/* Monthly */}
            <div className="group relative p-8 bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-[1.03]">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-green-400 text-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition duration-300">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="mt-10 text-2xl font-semibold text-white mb-3">Monthly (Dedicated)</h3>
              <p className="text-gray-300 text-base leading-relaxed">
                Get fully dedicated engineers every month, embedded into your team and focused on consistent delivery.
              </p>
            </div>
            {/* Project-Based */}
            <div className="group relative p-8 bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-[1.03]">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-orange-400 text-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition duration-300">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <h3 className="mt-10 text-2xl font-semibold text-white mb-3">Project-Based</h3>
              <p className="text-gray-300 text-base leading-relaxed">
                End-to-end project delivery with clear timelines and scope. Best for defined deliverables and milestones.
              </p>
            </div>
            {/* Hybrid */}
            <div className="group relative p-8 bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-[1.03]">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-purple-400 text-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition duration-300">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="mt-10 text-2xl font-semibold text-white mb-3">Onsite + Offshore Hybrid</h3>
              <p className="text-gray-300 text-base leading-relaxed">
                Leverage the perfect mix of in-person collaboration and offshore scalability to maximize ROI.
              </p>
            </div>
          </div>
          <p className="mt-16 text-lg text-gray-300 max-w-3xl mx-auto">
            Need stealth-mode developers? We also offer <span className="font-semibold text-white">white-labeled staffing</span>—our team works under your brand and communicates directly with your clients.
          </p>
        </div>
      </section>

      {/* Our Hiring Process */}
      <section className="py-28 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Header with Icon */}
          <div className="flex items-center justify-center gap-4 mb-14">
            <Workflow className="w-12 h-12 text-blue-400 animate-pulse" />
            <h2 className="text-4xl font-bold text-center text-white mb-4">Our Hiring Journey</h2>
          </div>
          {/* Subtitle */}
          <p className="text-lg text-gray-300">
            A meticulously crafted 4-step process to ensure a smooth and seamless talent acquisition experience.
          </p>
          <br /><br />
          {/* Hiring Flow */}
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-16 px-6">
            {/* Step 1 */}
            <div className="relative p-10 bg-gray-900 rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
                <span className="text-3xl font-semibold">1</span>
              </div>
              <h3 className="text-3xl font-semibold text-white mt-16 mb-4">
                Requirement Understanding
              </h3>
              <p className="text-lg text-gray-300">
                We engage with you to understand project goals, tech stack, and talent expectations.
              </p>
            </div>
            {/* Step 2 */}
            <div className="relative p-10 bg-gray-900 rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
                <span className="text-3xl font-semibold">2</span>
              </div>
              <h3 className="text-3xl font-semibold text-white mt-16 mb-4">
                Candidate Screening
              </h3>
              <p className="text-lg text-gray-300">
                Receive matched, verified profiles of top-tier candidates within 24-48 hours.
              </p>
            </div>
            {/* Step 3 */}
            <div className="relative p-10 bg-gray-900 rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-300 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
                <span className="text-3xl font-semibold">3</span>
              </div>
              <h3 className="text-3xl font-semibold text-white mt-16 mb-4">
                Interview & Selection
              </h3>
              <p className="text-lg text-gray-300">
                Conduct direct interviews and technical assessments to ensure the best fit.
              </p>
            </div>
            {/* Step 4 */}
            <div className="relative p-10 bg-gray-900 rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
                <span className="text-3xl font-semibold">4</span>
              </div>
              <h3 className="text-3xl font-semibold text-white mt-16 mb-4">
                Onboarding & Support
              </h3>
              <p className="text-lg text-gray-300">
                We handle all HR, compliance, NDAs, infrastructure, and ongoing support.
              </p>
            </div>
            {/* Arrow connecting steps */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-blue-400 animate-bounce">
                <path d="M12 5v14m7-7l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Why Cybaem Tech */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-center text-white mb-4">Why CybaemTech?</h2>
            <p className="text-lg text-gray-300">
              Partnering with us means working with a team that's structured, strategic, and focused on delivery excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2L20 7L12 12L4 7L12 2Z" />
                  <path d="M20 17L12 22L4 17" />
                  <path d="M20 12L12 17L4 12" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-1">NDA & Compliance Ready</h4>
                <p className="text-gray-300 text-base">
                  We strictly adhere to non-disclosure agreements and legal compliance at every stage.
                </p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8 17l4 4 4-4m0-5l-4-4-4 4" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-1">Agile & Remote Collaboration</h4>
                <p className="text-gray-300 text-base">
                  Agile teams that integrate smoothly with your workflow — remote-ready and responsive.
                </p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M16 7a4 4 0 01-8 0" />
                  <path d="M4 15a4 4 0 018 0 4 4 0 018 0" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-1">Dedicated Account Manager</h4>
                <p className="text-gray-300 text-base">
                  A single point of contact ensures aligned goals and personalized support.
                </p>
              </div>
            </div>
            {/* Feature 4 */}
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13 2H6a2 2 0 00-2 2v7" />
                  <path d="M8 16h8m4 0v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-1">24/7 Resource Availability</h4>
                <p className="text-gray-300 text-base">
                  Choose round-the-clock engagement models to never miss a milestone.
                </p>
              </div>
            </div>
            {/* Feature 5 */}
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 17v-6a4 4 0 118 0v6" />
                  <path d="M4 21h16" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-1">Work Tracking Tools</h4>
                <p className="text-gray-300 text-base">
                  Integrated tools like Jira, Trello, and Asana keep progress transparent and measurable.
                </p>
              </div>
            </div>
            {/* Feature 6 */}
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-1">Monthly Performance Reviews</h4>
                <p className="text-gray-300 text-base">
                  Transparent metrics and reviews to assess team performance and ensure accountability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proven Global Delivery */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
        {/* Remove overlay image or set opacity lower */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&q=80&w=2000')] opacity-5 bg-cover bg-center"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="inline-flex items-center gap-2">
                <GlobeIcon className="w-8 h-8 text-blue-400" />
                Proven Global Delivery
              </span>
            </h2>
            <p className="text-lg text-gray-300">
              Trusted by enterprises across continents and industries.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { flagUrl: 'https://flagcdn.com/us.svg', title: 'USA', sectors: 'SaaS, Healthcare IT, Managed Services' },
              { flagUrl: 'https://flagcdn.com/gb.svg', title: 'UK', sectors: 'Fintech, eCommerce, Cloud Startups' },
              { flagUrl: 'https://flagcdn.com/ae.svg', title: 'UAE', sectors: 'Government, Oil & Gas, Construction Tech' },
              { flagUrl: 'https://flagcdn.com/au.svg', title: 'Australia', sectors: 'EdTech, Agencies, Remote Infrastructure' },
              { flagUrl: 'https://flagcdn.com/ca.svg', title: 'Canada & Europe', sectors: 'AI, Cybersecurity, Logistics' },
            ].map((region, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-2xl p-6 text-center hover:shadow-lg transition duration-300">
                <img
                  src={region.flagUrl}
                  alt={`${region.title} Flag`}
                  className="w-16 h-10 mx-auto mb-4 rounded border-2 border-white shadow-lg"
                />
                <h4 className="text-xl font-semibold text-white mb-2">{region.title}</h4>
                <p className="text-gray-300 text-sm">{region.sectors}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-14">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-gray-900 shadow-xl rounded-2xl p-8 border border-gray-800 hover:shadow-2xl transition-shadow duration-300">
              <QuoteIcon className="w-8 h-8 text-blue-400 mb-4" />
              <p className="text-lg text-gray-300 italic mb-6">
                “Cybaem Tech helped us scale quickly with a dedicated DevOps team.
                Reliable, fast onboarding, and quality delivery!”
              </p>
            </div>
            <div className="bg-gray-900 shadow-xl rounded-2xl p-8 border border-gray-800 hover:shadow-2xl transition-shadow duration-300">
              <QuoteIcon className="w-8 h-8 text-blue-400 mb-4" />
              <p className="text-lg text-gray-300 italic mb-6">
                “Their IT support engineers work as an extension of our team.
                Exceptional response time and professionalism.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 flex justify-center items-center gap-3">
            <Mail className="w-8 h-8 text-white" />
            Ready to Hire Top IT Talent?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed text-gray-300">
            Cybaem Tech is your trusted global partner for flexible, scalable IT staff augmentation.
            Let’s build your dream team — faster, smarter, and within budget.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:sales@cybaemtech.com"
              className="bg-white text-blue-800 font-semibold px-6 py-3 rounded-full hover:bg-blue-100 transition-all duration-300 shadow inline-flex items-center gap-2"
            >
              <Mail className="w-5 h-5" /> Email Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ITAugmentation;