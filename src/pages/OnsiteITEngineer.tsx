import { ArrowRight, Monitor, Network, Server, Shield, Cloud, Database, Users, Clock, CheckCircle, Wrench, Building2, HeadphonesIcon, UserCheck, FileText, Settings } from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function OnsiteITEngineer() {
  const serviceCategories = [
    {
      icon: <Monitor className="text-blue-400 w-8 h-8" />,
      title: "Desktop & Hardware Support",
      points: [
        "Desktop/laptop troubleshooting",
        "Printer, scanner & hardware support",
        "OS installation and updates",
        "Email & application setup"
      ]
    },
    {
      icon: <Network className="text-green-400 w-8 h-8" />,
      title: "Network Support",
      points: [
        "LAN/WAN management",
        "Switch & router configuration",
        "WiFi setup and optimization",
        "Network monitoring and performance checks"
      ]
    },
    {
      icon: <Server className="text-purple-400 w-8 h-8" />,
      title: "Server Management",
      points: [
        "Windows & Linux server monitoring",
        "Active Directory, DNS, DHCP",
        "File/print server support",
        "Patch updates and performance tuning"
      ]
    },
    {
      icon: <Shield className="text-red-400 w-8 h-8" />,
      title: "Firewall & Security",
      points: [
        "Firewall monitoring & rule updates",
        "VPN configuration",
        "Security policy implementation",
        "Threat monitoring & basic incident handling"
      ]
    },
    {
      icon: <Cloud className="text-cyan-400 w-8 h-8" />,
      title: "Cloud Support",
      points: [
        "Office 365 management",
        "Google Workspace support",
        "Cloud backup setup",
        "User management & access control"
      ]
    },
    {
      icon: <Database className="text-yellow-300 w-8 h-8" />,
      title: "Backup & Recovery",
      points: [
        "Daily/weekly backup monitoring",
        "Backup verification",
        "Restore testing",
        "Data protection planning"
      ]
    }
  ];

  const engineerLevels = [
    {
      level: "L1",
      title: "Basic User & Hardware Support",
      description: "Ideal for daily IT operations, user issues, hardware fixes, installations, and basic network checks.",
      color: "bg-blue-500"
    },
    {
      level: "L2",
      title: "Network, Server & Security Support",
      description: "Handles advanced troubleshooting, network devices, server monitoring, cloud platforms, backups, and firewall operations.",
      color: "bg-green-500"
    },
    {
      level: "L3",
      title: "Expert for Complex Environments",
      description: "For advanced server, network, cloud, and security requirements including architecture, migrations, firewall policies, and escalated incidents.",
      color: "bg-purple-500"
    }
  ];

  const whyChooseUs = [
    { icon: <UserCheck className="w-6 h-6" />, text: "Dedicated on-site engineer at your office" },
    { icon: <Users className="w-6 h-6" />, text: "Backup engineer supplied during leave or emergency" },
    { icon: <Settings className="w-6 h-6" />, text: "Skill-based deployment (L1/L2/L3)" },
    { icon: <Monitor className="w-6 h-6" />, text: "Coverage for desktop, network, server, firewall & cloud" },
    { icon: <Clock className="w-6 h-6" />, text: "Faster issue resolution & reduced downtime" },
    { icon: <FileText className="w-6 h-6" />, text: "Reporting: Daily, weekly, or monthly" },
    { icon: <CheckCircle className="w-6 h-6" />, text: "Easy monthly / yearly contracts" },
    { icon: <Wrench className="w-6 h-6" />, text: "No HR or training headaches" }
  ];

  const industries = [
    "Manufacturing",
    "IT & Software",
    "Healthcare",
    "Logistics",
    "Finance",
    "Retail",
    "Education",
    "E-commerce",
    "Startups",
    "Corporate Offices"
  ];

  const pricingModels = [
    "Full-Time L1 Engineer",
    "Full-Time L2 Engineer",
    "Full-Time L3 Engineer",
    "Weekly Visit Engineer",
    "Part-Time Engineer",
    "Backup Engineer (Included)"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[100vh] px-6 text-center rounded-b-xl shadow-lg overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750")',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black"></div>
        <div className="relative z-10 flex flex-col justify-center items-center min-h-[100vh]">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
            Pune & PCMC
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-white">
            On-Site IT Engineer Outsourcing
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-blue-400 font-semibold">
            L1 / L2 / L3 Engineers
          </p>
          <p className="max-w-4xl mx-auto text-lg mb-10 text-gray-300">
            Dedicated on-site engineers for Desktop, Network, Server, Firewall, Cybersecurity, Cloud, and Backup Support. We also provide backup engineers so your business never faces downtime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.open("https://wa.me/919028541383?text=Hello! I'm interested in On-Site IT Engineer Outsourcing services.", "_blank")}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 inline-flex items-center justify-center"
            >
              Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <Link to="/contact">
              <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 h-auto">
                Request a Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What Our Engineers Manage */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-6">What Our On-Site Engineers Manage</h2>
          <p className="text-lg text-center text-gray-300 mb-16 max-w-3xl mx-auto">
            Our engineers work full-time from your location and handle all your IT operations
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {serviceCategories.map((item, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition p-6 backdrop-blur-md hover:bg-gray-800 hover:border-gray-700">
                <div className="flex items-center justify-center w-14 h-14 mb-4 mx-auto rounded-full bg-gray-800">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-center text-white mb-3">{item.title}</h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineer Levels */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-6">Engineer Levels We Provide</h2>
          <p className="text-lg text-center text-gray-300 mb-16 max-w-3xl mx-auto">
            Choose the right level of expertise based on your IT requirements
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {engineerLevels.map((level, index) => (
              <div key={index} className="relative group">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-16 ${level.color} text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300`}>
                    <span className="text-2xl font-bold">{level.level}</span>
                  </div>
                  <h3 className="mt-10 text-2xl font-semibold text-white mb-4 text-center">{level.title}</h3>
                  <p className="text-gray-300 text-center leading-relaxed">{level.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Cybaem Tech */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-6">Why Choose Cybaem Tech?</h2>
          <p className="text-lg text-center text-gray-300 mb-16 max-w-3xl mx-auto">
            Partner with us for reliable, skilled IT support that keeps your business running smoothly
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                  {item.icon}
                </div>
                <p className="text-gray-300 text-base leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Support */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-center text-white mb-6">Industries We Support</h2>
          <p className="text-lg text-gray-300 mb-16 max-w-3xl mx-auto">
            We serve diverse industries with tailored IT support solutions
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, idx) => (
              <div key={idx} className="px-6 py-3 bg-gray-900 border border-gray-700 rounded-full text-white font-medium hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300 cursor-default">
                <Building2 className="w-4 h-4 inline-block mr-2 text-blue-400" />
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flexible Pricing Models */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-6">Flexible Pricing Models</h2>
          <p className="text-lg text-center text-gray-300 mb-16 max-w-3xl mx-auto">
            Choose from our flexible engagement models tailored to your needs
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingModels.map((model, index) => (
              <div key={index} className="flex items-center gap-4 p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-green-500/50 transition-all duration-300">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-white font-medium">{model}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 mt-8 text-sm">(Exact pricing shared on request)</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <HeadphonesIcon className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Get a Dedicated On-Site Engineer for Your Office
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Ensure smooth, secure, and reliable IT operations with our trained on-site engineers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open("https://wa.me/919028541383?text=Hello! I'm interested in On-Site IT Engineer Outsourcing services for my office.", "_blank")}
              className="bg-white text-blue-800 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 inline-flex items-center justify-center"
            >
              WhatsApp Us <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <Link to="/contact">
              <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 h-auto">
                Request Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default OnsiteITEngineer;
