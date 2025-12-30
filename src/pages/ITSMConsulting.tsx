import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, Mail, CheckCircle, Shield, Settings, FileText, BarChart3, Target, Lightbulb, Scale, ClipboardCheck, Users, Headphones, BookOpen, TrendingUp, Cloud, DollarSign, Lock, Search, Award, Briefcase } from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

function ITSMConsulting() {
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
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200")',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-center items-center min-h-[100vh]">
          <h1 className="text-5xl font-bold leading-tight mb-4 text-white">
            ITSM, Compliance & Consulting
          </h1>
          <p className="text-xl mb-6 text-gray-300">
            Streamline Operations, Ensure Compliance, Drive Transformation
          </p>
          <p className="max-w-4xl mx-auto text-lg mb-10 text-gray-300">
            Cybaem Tech delivers comprehensive IT Service Management, strategic consulting, and compliance solutions to help your organization achieve operational excellence and regulatory adherence.
          </p>
          <button
            onClick={() => window.open("https://wa.me/9028541383?text=Hello! I'm interested in ITSM & Consulting services.", "_blank")}
            className="bg-white text-blue-800 px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 inline-flex items-center justify-center"
          >
            Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* ITSM Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">ITSM (IT Service Management)</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Implement industry-standard IT service management practices to optimize your IT operations and deliver exceptional service quality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ITIL Process Implementation */}
            <div id="itil-process-implementation" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-blue-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-blue-900/50">
                <Settings className="text-blue-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">ITIL Process Implementation</h3>
              <p className="text-gray-300 text-center mb-4">
                Adopt ITIL best practices to standardize and optimize your IT service delivery processes.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>ITIL v4 framework adoption</li>
                <li>Process design & documentation</li>
                <li>Service catalog development</li>
                <li>Continuous improvement programs</li>
              </ul>
            </div>

            {/* Incident/Change/Problem Management */}
            <div id="incident-change-problem-management" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-green-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-green-900/50">
                <ClipboardCheck className="text-green-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">Incident/Change/Problem Management</h3>
              <p className="text-gray-300 text-center mb-4">
                Structured processes to handle incidents, implement changes, and resolve problems efficiently.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>Incident prioritization & resolution</li>
                <li>Change advisory board setup</li>
                <li>Root cause analysis</li>
                <li>Problem trending & prevention</li>
              </ul>
            </div>

            {/* Service Desk Setup */}
            <div id="service-desk-setup" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-purple-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-purple-900/50">
                <Headphones className="text-purple-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">Service Desk Setup</h3>
              <p className="text-gray-300 text-center mb-4">
                Establish a centralized service desk for efficient IT support and user satisfaction.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>Multi-channel support setup</li>
                <li>Ticketing system implementation</li>
                <li>First-call resolution optimization</li>
                <li>User satisfaction surveys</li>
              </ul>
            </div>

            {/* SLA Reporting */}
            <div id="sla-reporting" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-yellow-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-yellow-900/50">
                <BarChart3 className="text-yellow-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">SLA Reporting</h3>
              <p className="text-gray-300 text-center mb-4">
                Comprehensive SLA monitoring and reporting to ensure service commitments are met.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>SLA definition & tracking</li>
                <li>Real-time dashboards</li>
                <li>Performance metrics</li>
                <li>Breach notifications & escalation</li>
              </ul>
            </div>

            {/* Asset & Configuration Management */}
            <div id="asset-configuration-management" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-orange-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-orange-900/50">
                <FileText className="text-orange-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">Asset & Configuration Management</h3>
              <p className="text-gray-300 text-center mb-4">
                Track and manage all IT assets and configurations throughout their lifecycle.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>CMDB implementation</li>
                <li>Asset discovery & inventory</li>
                <li>Lifecycle management</li>
                <li>License optimization</li>
              </ul>
            </div>

            {/* Knowledge Base Setup */}
            <div id="knowledge-base-setup" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-red-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-red-900/50">
                <BookOpen className="text-red-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">Knowledge Base Setup</h3>
              <p className="text-gray-300 text-center mb-4">
                Build a comprehensive knowledge repository for faster issue resolution and self-service.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>Knowledge article creation</li>
                <li>Self-service portal</li>
                <li>Search optimization</li>
                <li>Knowledge lifecycle management</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* IT Consulting & Advisory Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">IT Consulting & Advisory</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Strategic guidance to align your IT investments with business goals and drive digital transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* IT Strategy & Roadmap */}
            <div id="it-strategy-roadmap" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-blue-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-blue-900/50">
                <Target className="text-blue-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">IT Strategy & Roadmap</h3>
              <p className="text-gray-300 text-center mb-4">
                Develop a comprehensive IT strategy aligned with your business objectives.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>Current state assessment</li>
                <li>Future state planning</li>
                <li>Technology roadmap</li>
                <li>Investment prioritization</li>
              </ul>
            </div>

            {/* Technology Gap Analysis */}
            <div id="technology-gap-analysis" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-green-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-green-900/50">
                <Search className="text-green-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">Technology Gap Analysis</h3>
              <p className="text-gray-300 text-center mb-4">
                Identify gaps between current capabilities and desired technology state.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>Capability assessment</li>
                <li>Gap identification</li>
                <li>Remediation planning</li>
                <li>Vendor evaluation</li>
              </ul>
            </div>

            {/* Digital Transformation */}
            <div id="digital-transformation" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-purple-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-purple-900/50">
                <Lightbulb className="text-purple-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">Digital Transformation</h3>
              <p className="text-gray-300 text-center mb-4">
                Transform your business with innovative digital solutions and modern technologies.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>Process digitization</li>
                <li>Automation initiatives</li>
                <li>Customer experience enhancement</li>
                <li>Change management</li>
              </ul>
            </div>

            {/* Cloud Adoption Strategy */}
            <div id="cloud-adoption-strategy" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-cyan-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-cyan-900/50">
                <Cloud className="text-cyan-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">Cloud Adoption Strategy</h3>
              <p className="text-gray-300 text-center mb-4">
                Plan and execute your journey to the cloud with a structured approach.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>Cloud readiness assessment</li>
                <li>Migration strategy</li>
                <li>Multi-cloud planning</li>
                <li>Cost optimization</li>
              </ul>
            </div>

            {/* ROI & Cost Optimization */}
            <div id="roi-cost-optimization" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-emerald-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-emerald-900/50">
                <DollarSign className="text-emerald-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">ROI & Cost Optimization</h3>
              <p className="text-gray-300 text-center mb-4">
                Maximize the value of your IT investments while reducing unnecessary costs.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>IT spending analysis</li>
                <li>Vendor consolidation</li>
                <li>License optimization</li>
                <li>TCO reduction strategies</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* IT Compliance & Audits Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">IT Compliance & Audits</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Ensure your organization meets regulatory requirements and industry standards with comprehensive compliance solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* IT Policy & Governance */}
            <div id="it-policy-governance" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-blue-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-blue-900/50">
                <Scale className="text-blue-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">IT Policy & Governance</h3>
              <p className="text-gray-300 text-center mb-4">
                Establish robust IT governance frameworks and policies for effective oversight.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>Policy framework development</li>
                <li>Governance structure setup</li>
                <li>Standards & procedures</li>
                <li>Policy enforcement</li>
              </ul>
            </div>

            {/* Risk Management Audits */}
            <div id="risk-management-audits" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-red-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-red-900/50">
                <Shield className="text-red-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">Risk Management Audits</h3>
              <p className="text-gray-300 text-center mb-4">
                Identify, assess, and mitigate IT risks to protect your organization.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>Risk assessment</li>
                <li>Control evaluation</li>
                <li>Remediation planning</li>
                <li>Continuous monitoring</li>
              </ul>
            </div>

            {/* License & Asset Compliance */}
            <div id="license-asset-compliance" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-yellow-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-yellow-900/50">
                <FileText className="text-yellow-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">License & Asset Compliance</h3>
              <p className="text-gray-300 text-center mb-4">
                Ensure software licensing compliance and optimize asset management.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>License audit preparation</li>
                <li>Compliance gap analysis</li>
                <li>True-up management</li>
                <li>Optimization recommendations</li>
              </ul>
            </div>

            {/* Cybersecurity Assessments */}
            <div id="cybersecurity-assessments" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-purple-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-purple-900/50">
                <Lock className="text-purple-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">Cybersecurity Assessments</h3>
              <p className="text-gray-300 text-center mb-4">
                Evaluate your security posture and identify vulnerabilities before they are exploited.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>Security posture assessment</li>
                <li>Penetration testing</li>
                <li>Vulnerability scanning</li>
                <li>Security gap remediation</li>
              </ul>
            </div>

            {/* Regulatory Compliance */}
            <div id="regulatory-compliance" className="scroll-mt-24 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-green-500 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-full bg-green-900/50">
                <Award className="text-green-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-4">Regulatory Compliance (PCI-DSS, SOC 2, etc.)</h3>
              <p className="text-gray-300 text-center mb-4">
                Achieve and maintain compliance with industry-specific regulations and standards.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>PCI-DSS compliance</li>
                <li>SOC 2 Type I & II</li>
                <li>ISO 27001 certification</li>
                <li>GDPR & HIPAA readiness</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose CybaemTech?</h2>
            <p className="text-lg text-gray-300">
              Partner with experts who understand your challenges and deliver measurable results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-1">Industry Expertise</h4>
                <p className="text-gray-300 text-base">
                  Deep experience across multiple industries with proven methodologies.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center">
                <Users className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-1">Certified Professionals</h4>
                <p className="text-gray-300 text-base">
                  ITIL, CISSP, CISA, and other certified experts on our team.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-1">Measurable Outcomes</h4>
                <p className="text-gray-300 text-base">
                  Focus on delivering tangible results and business value.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-1">Tailored Solutions</h4>
                <p className="text-gray-300 text-base">
                  Custom approaches designed for your specific needs and goals.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center">
                <Shield className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-1">Compliance First</h4>
                <p className="text-gray-300 text-base">
                  Built-in compliance considerations in every recommendation.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center">
                <Headphones className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-1">Ongoing Support</h4>
                <p className="text-gray-300 text-base">
                  Continuous engagement and support beyond project delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 flex justify-center items-center gap-3">
            <Mail className="w-8 h-8 text-white" />
            Ready to Transform Your IT Operations?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed text-gray-300">
            Let Cybaem Tech help you streamline operations, ensure compliance, and drive strategic transformation.
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

export default ITSMConsulting;