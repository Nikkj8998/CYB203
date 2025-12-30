import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "scope", title: "Scope and Application" },
    { id: "data-controller", title: "Data Controller and Grievance Officer" },
    { id: "personal-data", title: "Personal Data We Collect" },
    { id: "lawful-basis", title: "Lawful Basis and Purpose of Data Processing" },
    { id: "consent", title: "Consent Management" },
    { id: "data-minimization", title: "Data Minimization and Accuracy" },
    { id: "data-retention", title: "Data Retention and Deletion" },
    { id: "security", title: "Data Security Measures" },
    { id: "data-sharing", title: "Data Sharing and Disclosure" },
    { id: "cross-border", title: "Cross-Border Data Transfers" },
    { id: "cookies", title: "Cookies and Tracking Technologies" },
    { id: "user-rights", title: "Your Data Protection Rights" },
    { id: "automated-processing", title: "Automated Decision-Making and Profiling" },
    { id: "data-breach", title: "Data Breach Notification and Response" },
    { id: "children-privacy", title: "Children's Privacy" },
    { id: "marketing", title: "Marketing Communications" },
    { id: "third-party", title: "Third-Party Links and Services" },
    { id: "updates", title: "Changes to Privacy Policy" },
    { id: "data-transfer", title: "Data Transfer Outside India" },
    { id: "retention-schedule", title: "Detailed Data Retention Schedule" },
    { id: "contact", title: "Contact Information and Grievance Redressal" },
    { id: "acknowledgment", title: "Acknowledgment and Consent" },
    { id: "appendix", title: "Appendix: Legal References" },
    { id: "definitions", title: "Definitions" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a0f1c]">
      <Helmet>
        <title>Privacy Policy - CybaemTech</title>
        <meta
          name="description"
          content="CybaemTech Privacy Policy. Learn how we collect, use, and protect your personal data in compliance with Indian data protection laws."
        />
        <link rel="canonical" href="https://www.cybaemtech.com/privacy-policy" />
      </Helmet>

      <Header />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy – <span className="text-primary">Cybaem<span className="text-white">Tech</span></span>
            </h1>
            <div className="space-y-2">
              <p className="text-gray-400 text-lg">
                <strong>Effective Date:</strong> June 15, 2025
              </p>
              <p className="text-gray-400 text-lg">
                <strong>Jurisdiction:</strong> India
              </p>
              <p className="text-gray-400 text-lg">
                <strong>Website:</strong> <a href="https://www.cybaemtech.com" className="text-primary hover:underline">www.cybaemtech.com</a>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <Card className="bg-gray-900/50 border-gray-700 sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">On this page</h3>
                  <nav className="max-h-[calc(100vh-12rem)] overflow-y-auto invisible-scrollbar">
                    <ul className="space-y-2 pr-2">
                      {sections.map((section, index) => (
                        <li key={section.id}>
                          <button
                            onClick={() => scrollToSection(section.id)}
                            className="text-sm text-gray-400 hover:text-primary transition-colors text-left w-full"
                          >
                            {index + 1}. {section.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </CardContent>
              </Card>
            </aside>

            <div className="lg:col-span-3">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-6 md:p-8">
                  <div className="prose prose-invert max-w-none">
                    
                    <section id="introduction" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        CybaemTech Private Limited ("we", "our", "us", "Company") is committed to protecting and respecting the privacy and security of individuals whose personal data we process. This Privacy Policy outlines our comprehensive approach to collecting, using, storing, sharing, and protecting your personal information when you interact with our website, services, and business operations.
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-2">This policy is designed to comply with:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>The Digital Personal Data Protection Act, 2023 (DPDP Act)</li>
                        <li>The Information Technology Act, 2000 (IT Act)</li>
                        <li>The Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (SPDI Rules)</li>
                      </ul>
                      <p className="text-gray-300 leading-relaxed">
                        We are committed to transparency, accountability, and upholding your data protection rights under Indian law.
                      </p>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="scope" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">2. Scope and Application</h2>
                      <p className="text-gray-300 leading-relaxed mb-2">This Privacy Policy applies to:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>All users and visitors accessing our website (www.cybaemtech.com)</li>
                        <li>Customers, clients, and business partners engaging with our services</li>
                        <li>Any individual whose personal data we collect, process, or store in India</li>
                        <li>All digital and non-digital processing of personal data by CybaemTech</li>
                      </ul>
                      <p className="text-gray-300 leading-relaxed">
                        This policy covers personal data collected through our website, mobile applications, forms, email communications, customer interactions, and any other touchpoints with our organization.
                      </p>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="data-controller" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">3. Data Controller and Grievance Officer</h2>
                      <p className="text-gray-300 leading-relaxed mb-4"><strong>Data Controller:</strong> CybaemTech Private Limited</p>
                      
                      <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
                        <p className="text-white mb-2"><strong>Grievance Officer:</strong></p>
                        <p className="text-gray-300"><strong>Name:</strong> Rohan Bhosale</p>
                        <p className="text-gray-300"><strong>Email:</strong> <a href="mailto:rohan@cybaemtech.com" className="text-primary hover:underline">rohan@cybaemtech.com</a></p>
                        <p className="text-gray-300"><strong>Phone:</strong> <a href="tel:+918530171515" className="text-primary hover:underline">+91 85301 71515</a></p>
                        <p className="text-gray-300"><strong>Address:</strong> 304, Suratwala Mark Plazzo, Hinjawadi, Pune, Maharashtra 411057</p>
                      </div>

                      <p className="text-gray-300 leading-relaxed">
                        The Grievance Officer is responsible for addressing all data protection queries, complaints, and rights requests. We are committed to responding to all grievances within 30 days of receipt, as required under applicable law.
                      </p>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="personal-data" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">4. Personal Data We Collect</h2>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        We may collect and process the following categories of personal data:
                      </p>
                      
                      <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.1 Personal Information</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li><strong>Identity Information:</strong> Name, gender, date of birth, age</li>
                        <li><strong>Contact Information:</strong> Postal address, email address, telephone number, mobile number</li>
                        <li><strong>Account Credentials:</strong> Username, password, security questions and answers</li>
                        <li><strong>Professional Information:</strong> Company name, job title, business contact details</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.2 Sensitive Personal Data or Information (SPDI)</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">Sensitive personal data is collected only with explicit consent and includes:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Financial information (bank account, credit/debit card details, payment instrument details)</li>
                        <li>Biometric information (if applicable for authentication purposes)</li>
                        <li>Health information (if relevant to service provision)</li>
                        <li>Sexual orientation (only if explicitly provided)</li>
                        <li>Medical records and history (only if relevant to services)</li>
                        <li>Password and financial information</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.3 Technical and Usage Data</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>IP address, browser type and version, device identifiers</li>
                        <li>Operating system, time zone settings, browser plug-in types and versions</li>
                        <li>Website usage patterns, navigation paths, page response times</li>
                        <li>Download errors, visit duration, page interaction information</li>
                        <li>Methods used to browse away from the page</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.4 Communication Data</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Correspondence records, email communications</li>
                        <li>Support tickets, feedback, queries, and complaints</li>
                        <li>Chat logs and customer service interactions</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.5 Voluntary Information</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>Information provided through forms, surveys, feedback mechanisms</li>
                        <li>Information shared during webinars, events, or consultations</li>
                        <li>Any other information voluntarily submitted to CybaemTech</li>
                      </ul>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="lawful-basis" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">5. Lawful Basis and Purpose of Data Processing</h2>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        We process personal data only when we have a valid legal basis, which includes:
                      </p>
                      
                      <h3 className="text-xl font-semibold text-white mb-3">5.1 Legal Basis</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li><strong>Consent:</strong> With your clear, specific, informed, and freely given consent</li>
                        <li><strong>Contractual Necessity:</strong> To perform our contractual obligations to you</li>
                        <li><strong>Legal Obligation:</strong> To comply with applicable laws, regulations, and legal processes</li>
                        <li><strong>Legitimate Interests:</strong> For our legitimate business purposes, provided they do not override your fundamental rights and freedoms</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3 mt-6">5.2 Purpose of Processing</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">We collect and use your personal data for the following specific purposes:</p>
                      
                      <div className="space-y-4 mt-4">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Service Delivery:</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                            <li>Creating and managing user accounts</li>
                            <li>Providing requested services and products</li>
                            <li>Processing transactions and payments</li>
                            <li>Delivering customer support and technical assistance</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Business Operations:</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                            <li>Internal record keeping and administration</li>
                            <li>Business development and strategic planning</li>
                            <li>Quality assurance and service improvement</li>
                            <li>Research and analytics to enhance our offerings</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Communication:</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                            <li>Responding to inquiries, requests, and complaints</li>
                            <li>Sending service-related notifications and updates</li>
                            <li>Providing information about our services (with consent)</li>
                            <li>Sending promotional communications and marketing materials (with explicit opt-in consent only)</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Legal and Security:</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                            <li>Fraud prevention and detection</li>
                            <li>Security monitoring and incident response</li>
                            <li>Compliance with legal obligations and regulatory requirements</li>
                            <li>Establishing, exercising, or defending legal claims</li>
                            <li>Protecting our rights, property, and safety, and that of our users</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Analytics and Improvement:</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                            <li>Understanding user behavior and preferences</li>
                            <li>Website performance monitoring and optimization</li>
                            <li>Developing new features and services</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="consent" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">6. Consent Management</h2>
                      
                      <h3 className="text-xl font-semibold text-white mb-3">6.1 Obtaining Consent</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">We obtain your consent before collecting personal data through:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Clear and conspicuous notice on our website and forms</li>
                        <li>Opt-in checkboxes for specific purposes (pre-ticked boxes are never used)</li>
                        <li>Explicit consent requests for sensitive personal data</li>
                        <li>Separate consent for marketing communications</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3 mt-6">6.2 Characteristics of Valid Consent</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">Your consent is:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li><strong>Free:</strong> Given voluntarily without coercion</li>
                        <li><strong>Specific:</strong> Related to particular purposes</li>
                        <li><strong>Informed:</strong> Provided after clear disclosure of data usage</li>
                        <li><strong>Unambiguous:</strong> Indicated through affirmative action</li>
                        <li><strong>Granular:</strong> Separate consent for different purposes</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3 mt-6">6.3 Withdrawal of Consent</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">You have the right to withdraw your consent at any time by:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Contacting our Grievance Officer</li>
                        <li>Using the unsubscribe link in marketing emails</li>
                        <li>Adjusting settings in your account dashboard</li>
                        <li>Sending a written request to our registered address</li>
                      </ul>
                      <p className="text-gray-300 leading-relaxed mb-2">Please note that withdrawal of consent:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>Does not affect the lawfulness of processing before withdrawal</li>
                        <li>May limit your access to certain services requiring that data</li>
                        <li>Will be processed promptly, typically within 7 business days</li>
                      </ul>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="data-minimization" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">7. Data Minimization and Accuracy</h2>
                      <p className="text-gray-300 leading-relaxed mb-2">We adhere to the principle of data minimization by:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Collecting only data that is necessary, relevant, and adequate for stated purposes</li>
                        <li>Avoiding collection of excessive or irrelevant information</li>
                        <li>Regularly reviewing data collection practices</li>
                        <li>Implementing purpose limitation to prevent data reuse for incompatible purposes</li>
                      </ul>
                      <p className="text-gray-300 leading-relaxed mb-2">We take reasonable steps to ensure personal data is:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>Accurate and up-to-date</li>
                        <li>Corrected or deleted when found to be inaccurate</li>
                        <li>Verified periodically for accuracy</li>
                      </ul>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="data-retention" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">8. Data Retention and Deletion</h2>
                      
                      <h3 className="text-xl font-semibold text-white mb-3">8.1 Retention Period</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">
                        Personal data is retained only for as long as necessary to fulfill the purposes for which it was collected, or as required by law. Specific retention periods include:
                      </p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li><strong>Account Data:</strong> Retained while your account is active and for 3 years after account closure</li>
                        <li><strong>Transaction Records:</strong> Retained for 7 years as per Indian tax and accounting laws</li>
                        <li><strong>Communication Records:</strong> Retained for 2 years for legal and business purposes</li>
                        <li><strong>Marketing Data:</strong> Retained until consent is withdrawn or for 2 years of inactivity</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3 mt-6">8.2 Deletion and Anonymization</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">Once the retention period expires or the purpose is fulfilled:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Personal data is securely deleted or destroyed</li>
                        <li>Data may be anonymized for statistical or research purposes</li>
                        <li>Deletion is irreversible and permanent</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3 mt-6">8.3 Legal Retention Requirements</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">Some data may be retained longer when:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>Required by Indian law or regulation</li>
                        <li>Necessary for establishment, exercise, or defense of legal claims</li>
                        <li>Needed for compliance with statutory audit or investigation requirements</li>
                      </ul>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="security" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">9. Data Security Measures</h2>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        We implement robust technical and organizational security measures to protect your personal data against unauthorized access, loss, misuse, alteration, or destruction.
                      </p>

                      <h3 className="text-xl font-semibold text-white mb-3">9.1 Technical Safeguards</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li><strong>Encryption:</strong> Data encryption in transit (SSL/TLS) and at rest</li>
                        <li><strong>Access Controls:</strong> Role-based access restrictions and authentication mechanisms</li>
                        <li><strong>Firewalls and Network Security:</strong> Advanced firewall protection and intrusion detection systems</li>
                        <li><strong>Regular Security Audits:</strong> Periodic vulnerability assessments and penetration testing</li>
                        <li><strong>Secure Infrastructure:</strong> Use of secure servers and cloud infrastructure with industry-standard certifications</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3 mt-6">9.2 Organizational Safeguards</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li><strong>Confidentiality Agreements:</strong> All employees and contractors sign confidentiality agreements</li>
                        <li><strong>Security Training:</strong> Regular data protection and security awareness training for staff</li>
                        <li><strong>Limited Access:</strong> Personal data accessible only to authorized personnel on a need-to-know basis</li>
                        <li><strong>Vendor Management:</strong> Third-party service providers undergo security assessments</li>
                        <li><strong>Incident Response Plan:</strong> Documented procedures for detecting and responding to security incidents</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3 mt-6">9.3 Physical Safeguards</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Secure office premises with access control systems</li>
                        <li>Locked storage for physical documents containing personal data</li>
                        <li>Secure disposal procedures for physical records</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3 mt-6">9.4 Certifications and Compliance Standards</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        CybaemTech maintains industry-recognized security certifications, demonstrating our commitment to the highest standards of information security and data protection:
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-800/50 p-4 rounded-lg">
                          <h4 className="text-white font-semibold mb-2">ISO 27001:2013 - Information Security Management System</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                            <li>Demonstrates our systematic approach to managing sensitive information</li>
                            <li>Ensures confidentiality, integrity, and availability of data</li>
                          </ul>
                        </div>

                        <div className="bg-gray-800/50 p-4 rounded-lg">
                          <h4 className="text-white font-semibold mb-2">ISO 27017:2015 - Cloud Security Controls</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                            <li>Validates our cloud security practices and controls</li>
                            <li>Ensures secure cloud service provision and data processing</li>
                          </ul>
                        </div>

                        <div className="bg-gray-800/50 p-4 rounded-lg">
                          <h4 className="text-white font-semibold mb-2">MSME Registered - UDYAM-MH-26-0207684</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                            <li>Ministry of MSME, Government of India</li>
                            <li>Reflects our commitment to quality standards and regulatory compliance</li>
                          </ul>
                        </div>
                      </div>

                      <p className="text-gray-300 leading-relaxed mt-4">
                        These certifications are maintained through regular audits, continuous monitoring, staff training, and adherence to international best practices, providing independent verification of our data protection and security capabilities.
                      </p>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="data-sharing" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">10. Data Sharing and Disclosure</h2>
                      
                      <h3 className="text-xl font-semibold text-white mb-3">10.1 No Sale of Personal Data</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        We do not sell, rent, or trade your personal data to third parties for their marketing purposes.
                      </p>

                      <h3 className="text-xl font-semibold text-white mb-3">10.2 Permitted Sharing</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">
                        We may share your personal data with the following categories of recipients, only as necessary and with appropriate safeguards:
                      </p>

                      <div className="space-y-4 mt-4">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Service Providers and Processors:</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                            <li>IT service providers, cloud hosting providers, and infrastructure partners</li>
                            <li>Payment processors and financial institutions</li>
                            <li>Customer support and communication service providers</li>
                            <li>Analytics and performance monitoring services</li>
                            <li>Marketing and advertising platforms (only with your consent)</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Business Partners:</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                            <li>Strategic partners for joint service delivery (with your knowledge)</li>
                            <li>Consultants and professional advisors (under confidentiality obligations)</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Legal and Regulatory Authorities:</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                            <li>Law enforcement agencies, courts, and tribunals (when legally required)</li>
                            <li>Regulatory bodies and government authorities (for compliance purposes)</li>
                            <li>Tax authorities and statutory auditors</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Corporate Transactions:</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                            <li>In connection with mergers, acquisitions, or sale of business assets (with appropriate data protection commitments)</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-3 mt-6">10.3 Third-Party Obligations</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">All third parties receiving personal data are contractually bound to:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>Process data only for specified purposes</li>
                        <li>Implement appropriate security measures</li>
                        <li>Maintain confidentiality</li>
                        <li>Notify us of any data breaches or security incidents</li>
                        <li>Delete or return data upon completion of services</li>
                      </ul>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="cross-border" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">11. Cross-Border Data Transfers</h2>
                      
                      <h3 className="text-xl font-semibold text-white mb-3">11.1 International Transfers</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">
                        Personal data may be transferred outside India to countries where our service providers, partners, or group companies are located. Such transfers are made only when:
                      </p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>The destination country is approved by the Indian Government</li>
                        <li>The destination country is not on the government's blacklist</li>
                        <li>Adequate safeguards are in place to protect your data</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3 mt-6">11.2 Transfer Safeguards</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">When transferring data internationally, we ensure:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Use of Standard Contractual Clauses (SCCs) or approved model contracts</li>
                        <li>Verification that recipients maintain adequate data protection standards</li>
                        <li>Implementation of additional security measures for sensitive data</li>
                        <li>Transparency about transfer destinations (available upon request)</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3 mt-6">11.3 User Rights Regarding Transfers</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">You have the right to:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>Request information about countries to which your data is transferred</li>
                        <li>Object to transfers that do not meet adequate protection standards</li>
                        <li>Withdraw consent for transfers based solely on consent</li>
                      </ul>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="cookies" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">12. Cookies and Tracking Technologies</h2>
                      
                      <h3 className="text-xl font-semibold text-white mb-3">12.1 What Are Cookies?</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Cookies are small text files placed on your device when you visit our website. They help us remember your preferences, enable site functionality, and analyze website usage.
                      </p>

                      <h3 className="text-xl font-semibold text-white mb-3">12.2 Types of Cookies We Use</h3>
                      
                      <div className="space-y-4 mt-4">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Strictly Necessary Cookies (No Consent Required):</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                            <li>Essential for website operation and security</li>
                            <li>Enable basic functions like page navigation and access to secure areas</li>
                            <li>Cannot be disabled in our systems</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Functional Cookies (Consent Required):</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                            <li>Remember your choices and preferences</li>
                            <li>Enhance website usability and personalization</li>
                            <li>Store language preferences and accessibility settings</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Analytics and Performance Cookies (Consent Required):</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                            <li>Collect anonymous data on website usage and performance</li>
                            <li>Help us understand user behavior and improve our services</li>
                            <li>Measure website traffic and engagement metrics</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Marketing and Advertising Cookies (Explicit Consent Required):</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                            <li>Track user behavior across websites for targeted advertising</li>
                            <li>Measure effectiveness of marketing campaigns</li>
                            <li>Deliver personalized advertisements based on your interests</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-3 mt-6">12.3 Cookie Consent and Control</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>We obtain explicit opt-in consent before placing non-essential cookies</li>
                        <li>You can manage cookie preferences through our cookie banner</li>
                        <li>Consent is granular—you can accept some categories while rejecting others</li>
                        <li>You can withdraw consent or modify preferences at any time</li>
                        <li>Cookie consent records are maintained for audit purposes</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3 mt-6">12.4 Third-Party Cookies</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">Our website may include cookies from third parties such as:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Google Analytics (for website analytics)</li>
                        <li>Social media platforms (for sharing functionality)</li>
                        <li>Advertising networks (only with your consent)</li>
                      </ul>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        We recommend reviewing third-party cookie policies for detailed information about their practices.
                      </p>

                      <h3 className="text-xl font-semibold text-white mb-3">12.5 Managing Cookies</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">You can control and delete cookies through your browser settings:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>Most browsers allow you to refuse or accept cookies</li>
                        <li>You can delete cookies already stored on your device</li>
                        <li>Disabling cookies may affect website functionality</li>
                        <li>Instructions for cookie management vary by browser</li>
                      </ul>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="user-rights" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">13. Your Data Protection Rights</h2>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Under the Digital Personal Data Protection Act, 2023, and applicable Indian laws, you have the following rights:
                      </p>

                      <h3 className="text-xl font-semibold text-white mb-3">13.1 Right to Access</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Obtain confirmation of whether we are processing your personal data</li>
                        <li>Receive a copy of your personal data in a commonly used electronic format</li>
                        <li>Request information about data processing purposes, categories, and recipients</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3">13.2 Right to Correction</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Request correction of inaccurate or incomplete personal data</li>
                        <li>Update your information to ensure it remains current and accurate</li>
                        <li>Provide supplementary information where necessary</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3">13.3 Right to Erasure (Right to be Forgotten)</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">Request deletion of your personal data when:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>The data is no longer necessary for the purpose collected</li>
                        <li>You withdraw consent and there is no other legal basis for processing</li>
                        <li>You object to processing and there are no overriding legitimate grounds</li>
                        <li>The data has been unlawfully processed</li>
                        <li>Legal obligations require deletion</li>
                      </ul>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        <strong>Exceptions:</strong> We may refuse erasure when retention is necessary for legal obligations, legal claims, or public interest.
                      </p>

                      <h3 className="text-xl font-semibold text-white mb-3">13.4 Right to Restriction of Processing</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">Request temporary restriction of processing when:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>You contest the accuracy of personal data (pending verification)</li>
                        <li>Processing is unlawful but you prefer restriction over deletion</li>
                        <li>We no longer need the data, but you require it for legal claims</li>
                        <li>You have objected to processing (pending verification of legitimate grounds)</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3">13.5 Right to Data Portability</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Receive your personal data in a structured, commonly used, machine-readable format</li>
                        <li>Transmit your data to another data controller (where technically feasible)</li>
                        <li>Request direct transmission between controllers (where technically feasible)</li>
                      </ul>
                      <p className="text-gray-300 leading-relaxed mb-2">This right applies when:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Processing is based on consent or contractual necessity</li>
                        <li>Processing is carried out by automated means</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3">13.6 Right to Object</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">Object to processing based on:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Legitimate interests (including profiling)</li>
                        <li>Direct marketing purposes (including profiling for marketing)</li>
                      </ul>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        We will cease processing unless we demonstrate compelling legitimate grounds that override your interests, rights, and freedoms, or for legal claims.
                      </p>

                      <h3 className="text-xl font-semibold text-white mb-3">13.7 Right to Withdraw Consent</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Withdraw consent at any time for processing based solely on consent</li>
                        <li>Withdrawal does not affect lawfulness of processing before withdrawal</li>
                        <li>Process is simple, clear, and as easy as giving consent</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3">13.8 Right to Nominate</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">Under the DPDP Act, you have the right to:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Nominate another individual to exercise your rights in case of death or incapacity</li>
                        <li>Change or cancel such nomination at any time</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3">13.9 Right to Grievance Redressal</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Lodge a complaint with our Grievance Officer</li>
                        <li>Escalate to the Data Protection Board of India if unsatisfied with our response</li>
                        <li>Seek judicial remedy for violations of data protection rights</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3">13.10 Exercising Your Rights</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">To exercise any of these rights:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>Contact our Grievance Officer (details in Section 3)</li>
                        <li>Submit a written request with proof of identity</li>
                        <li>We will respond within 30 days of receiving a valid request</li>
                        <li>No fee is charged for requests unless they are manifestly unfounded or excessive</li>
                        <li>We may request additional information to verify your identity</li>
                      </ul>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="automated-processing" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">14. Automated Decision-Making and Profiling</h2>
                      
                      <h3 className="text-xl font-semibold text-white mb-3">14.1 Use of Automation</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">We may use automated processing and profiling for:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Fraud detection and prevention</li>
                        <li>Service personalization and recommendations</li>
                        <li>Risk assessment for business purposes</li>
                        <li>Marketing segmentation (only with consent)</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3">14.2 Your Rights</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">
                        When we make decisions based solely on automated processing that have legal or similarly significant effects, you have the right to:
                      </p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Receive meaningful information about the logic involved</li>
                        <li>Contest the decision and express your point of view</li>
                        <li>Obtain human intervention and explanation</li>
                        <li>Request manual review of automated decisions</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3">14.3 Safeguards</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">We implement appropriate safeguards to ensure:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>Fairness, accuracy, and non-discrimination</li>
                        <li>Transparency about automated decision-making processes</li>
                        <li>Regular audits of automated systems</li>
                        <li>Human oversight of significant automated decisions</li>
                      </ul>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="data-breach" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">15. Data Breach Notification and Response</h2>
                      
                      <h3 className="text-xl font-semibold text-white mb-3">15.1 Prevention and Preparedness</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">We maintain:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Strong technical security controls (encryption, firewalls, monitoring)</li>
                        <li>Regular security assessments and vulnerability testing</li>
                        <li>Employee training on data security and breach response</li>
                        <li>Documented incident response procedures</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3">15.2 Detection and Containment</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Automated threat detection systems monitor for suspicious activity</li>
                        <li>Rapid response protocols to contain and isolate affected systems</li>
                        <li>Immediate investigation to assess scope and impact of breach</li>
                        <li>Measures to prevent further unauthorized access</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3">15.3 Notification Obligations</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">
                        In the event of a data breach that poses risk to your rights and freedoms:
                      </p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-2">
                        <li>We will notify affected individuals without undue delay</li>
                        <li>Notification will be made to the Data Protection Board of India as required by law</li>
                      </ul>
                      <p className="text-gray-300 leading-relaxed mb-2 mt-4">Notification will include:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Nature and scope of the breach</li>
                        <li>Categories and approximate number of individuals affected</li>
                        <li>Categories and approximate number of records affected</li>
                        <li>Likely consequences of the breach</li>
                        <li>Measures taken or proposed to address the breach</li>
                        <li>Contact details for further information</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3">15.4 User Guidance</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">We will provide affected individuals with:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Clear information about the breach and its impact</li>
                        <li>Practical steps to protect themselves (e.g., password changes, fraud monitoring)</li>
                        <li>Contact information for questions and support</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3">15.5 Post-Incident Review</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>All breaches are documented and investigated thoroughly</li>
                        <li>Root cause analysis to identify vulnerabilities</li>
                        <li>Implementation of corrective measures</li>
                        <li>Updates to security protocols and staff training</li>
                        <li>Regular review and testing of breach response procedures</li>
                      </ul>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="children-privacy" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">16. Children's Privacy</h2>
                      
                      <h3 className="text-xl font-semibold text-white mb-3">16.1 Age Restrictions</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Our services are not directed to children under the age of 18 years. We do not knowingly collect personal data from children without verifiable parental consent.
                      </p>

                      <h3 className="text-xl font-semibold text-white mb-3">16.2 Parental Consent</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">Under the DPDP Act, 2023:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Collection of children's data requires verifiable parental or legal guardian consent</li>
                        <li>Parents have the right to review, correct, or request deletion of their child's data</li>
                        <li>Parents can withdraw consent at any time</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3">16.3 Accidental Collection</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">
                        If we become aware that we have collected personal data from a child without proper consent:
                      </p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>We will take immediate steps to delete such information</li>
                        <li>We will terminate the child's account if applicable</li>
                      </ul>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="marketing" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">17. Marketing Communications</h2>
                      
                      <h3 className="text-xl font-semibold text-white mb-3">17.1 Consent for Marketing</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">
                        We send marketing communications only to individuals who have:
                      </p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Provided explicit opt-in consent</li>
                        <li>Not opted out of such communications</li>
                        <li>Maintained an active relationship with us (existing customer exemption where applicable)</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3">17.2 Content of Marketing Communications</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">Marketing communications may include:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Information about our new services and features</li>
                        <li>Special offers, promotions, and discounts</li>
                        <li>Invitations to webinars, events, and workshops</li>
                        <li>Industry insights and thought leadership content</li>
                        <li>Customer success stories and case studies</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white mb-3">17.3 Opting Out</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">You can opt out of marketing communications at any time by:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>Clicking the "unsubscribe" link in any marketing email</li>
                        <li>Contacting our Grievance Officer</li>
                        <li>Updating your communication preferences in your account settings</li>
                        <li>Replying "STOP" to SMS marketing messages</li>
                      </ul>
                      <p className="text-gray-300 leading-relaxed mb-2">Please note:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>Opting out of marketing does not affect transactional or service-related communications</li>
                        <li>We will process opt-out requests within 7 business days</li>
                      </ul>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="third-party" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">18. Third-Party Links and Services</h2>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Our website may contain links to third-party websites, services, or applications. This Privacy Policy applies only to our website and services. We are not responsible for the privacy practices of third-party sites.
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-2">We recommend that you:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>Review the privacy policies of any third-party sites you visit</li>
                        <li>Understand their data collection and usage practices</li>
                        <li>Exercise caution when providing personal information to third parties</li>
                        <li>Contact third parties directly with questions about their privacy practices</li>
                      </ul>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="updates" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">19. Changes to Privacy Policy</h2>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-2">When we make material changes:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                        <li>We will update the "Effective Date" at the beginning of this policy</li>
                        <li>We will notify you by email (if you have provided your email address)</li>
                        <li>We will display a prominent notice on our website</li>
                        <li>We may request your renewed consent if required by law</li>
                      </ul>
                      <p className="text-gray-300 leading-relaxed">
                        Your continued use of our services after the effective date of changes constitutes acceptance of the updated policy. If you do not agree to the changes, please discontinue use of our services.
                      </p>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="data-transfer" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">20. Data Transfer Outside India</h2>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        As a technology service provider, we may transfer personal data to countries outside India where our service providers, cloud infrastructure, or business partners are located.
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-2">We ensure that such transfers comply with applicable law through:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>Obtaining your explicit consent for international transfers</li>
                        <li>Ensuring the destination country provides adequate data protection</li>
                        <li>Implementing contractual safeguards with recipients</li>
                        <li>Conducting due diligence on third-party data protection practices</li>
                        <li>Maintaining transparency about transfer destinations</li>
                      </ul>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="retention-schedule" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">21. Detailed Data Retention Schedule</h2>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-gray-300">
                          <thead className="bg-gray-800">
                            <tr>
                              <th className="px-4 py-2 text-left">Data Category</th>
                              <th className="px-4 py-2 text-left">Retention Period</th>
                              <th className="px-4 py-2 text-left">Legal Basis</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-700">
                              <td className="px-4 py-2">Customer Account Data</td>
                              <td className="px-4 py-2">Active + 3 years</td>
                              <td className="px-4 py-2">Business necessity</td>
                            </tr>
                            <tr className="border-b border-gray-700">
                              <td className="px-4 py-2">Transaction Records</td>
                              <td className="px-4 py-2">7 years</td>
                              <td className="px-4 py-2">Tax & accounting laws</td>
                            </tr>
                            <tr className="border-b border-gray-700">
                              <td className="px-4 py-2">Communication Records</td>
                              <td className="px-4 py-2">2 years</td>
                              <td className="px-4 py-2">Legal compliance</td>
                            </tr>
                            <tr className="border-b border-gray-700">
                              <td className="px-4 py-2">Marketing Consent</td>
                              <td className="px-4 py-2">Until withdrawal or 2 years inactivity</td>
                              <td className="px-4 py-2">Consent management</td>
                            </tr>
                            <tr className="border-b border-gray-700">
                              <td className="px-4 py-2">Website Analytics</td>
                              <td className="px-4 py-2">24 months</td>
                              <td className="px-4 py-2">Legitimate interest</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2">Legal Claims Data</td>
                              <td className="px-4 py-2">Duration of claim + 6 years</td>
                              <td className="px-4 py-2">Legal defense</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="contact" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">22. Contact Information and Grievance Redressal</h2>
                      
                      <h3 className="text-xl font-semibold text-white mb-3">22.1 General Inquiries</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        For any questions, concerns, or requests regarding this Privacy Policy or our data practices:
                      </p>
                      <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
                        <p className="text-gray-300"><strong>Email:</strong> <a href="mailto:rohan@cybaemtech.com" className="text-primary hover:underline">rohan@cybaemtech.com</a></p>
                        <p className="text-gray-300"><strong>Phone:</strong> <a href="tel:+918530171515" className="text-primary hover:underline">+91 85301 71515</a></p>
                        <p className="text-gray-300"><strong>Website:</strong> <a href="https://www.cybaemtech.com" className="text-primary hover:underline">www.cybaemtech.com</a></p>
                        <p className="text-gray-300"><strong>Address:</strong> 304, Suratwala Mark Plazzo, Hinjawadi, Pune, Maharashtra 411057</p>
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-3">22.2 Grievance Officer</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        For data protection complaints, rights requests, or grievances:
                      </p>
                      <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
                        <p className="text-gray-300"><strong>Name:</strong> Rohan Bhosale</p>
                        <p className="text-gray-300"><strong>Designation:</strong> Data Protection & Compliance Officer</p>
                        <p className="text-gray-300"><strong>Email:</strong> <a href="mailto:rohan@cybaemtech.com" className="text-primary hover:underline">rohan@cybaemtech.com</a></p>
                        <p className="text-gray-300"><strong>Phone:</strong> <a href="tel:+918530171515" className="text-primary hover:underline">+91 85301 71515</a></p>
                        <p className="text-gray-300"><strong>Address:</strong> 304, Suratwala Mark Plazzo, Hinjawadi, Pune, Maharashtra 411057</p>
                        <p className="text-gray-300"><strong>Response Time:</strong> Within 30 days of receipt</p>
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-3">22.3 Data Protection Board of India</h3>
                      <p className="text-gray-300 leading-relaxed mb-2">
                        If you are unsatisfied with our response, you may lodge a complaint with:
                      </p>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <p className="text-gray-300"><strong>Data Protection Board of India</strong></p>
                        <p className="text-gray-300 text-sm">[Address and contact details to be updated once board is established]</p>
                      </div>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="acknowledgment" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">23. Acknowledgment and Consent</h2>
                      <p className="text-gray-300 leading-relaxed mb-2">
                        By using our website and services, you acknowledge that you have:
                      </p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>Read and understood this Privacy Policy</li>
                        <li>Understood how we collect, use, and protect your personal data</li>
                        <li>Provided informed consent for processing as described herein</li>
                        <li>Been informed of your rights and how to exercise them</li>
                        <li>Had the opportunity to ask questions and seek clarification</li>
                      </ul>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="appendix" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">24. Appendix: Legal References</h2>
                      <p className="text-gray-300 leading-relaxed mb-2">
                        This Privacy Policy is designed to comply with:
                      </p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li>Digital Personal Data Protection Act, 2023 (DPDP Act)</li>
                        <li>Information Technology Act, 2000 (IT Act)</li>
                        <li>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</li>
                        <li>Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021</li>
                        <li>Relevant notifications, circulars, and guidance from the Ministry of Electronics and Information Technology (MeitY)</li>
                        <li>Guidelines issued by the Data Protection Board of India (once established)</li>
                      </ul>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <section id="definitions" className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">25. Definitions</h2>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        For the purposes of this Privacy Policy:
                      </p>
                      <ul className="space-y-3">
                        <li className="text-gray-300">
                          <strong>"Personal Data"</strong> means data about an individual who is identifiable by or in relation to such data
                        </li>
                        <li className="text-gray-300">
                          <strong>"Sensitive Personal Data or Information"</strong> includes passwords, financial information, health information, sexual orientation, biometric information, and other data specified under SPDI Rules
                        </li>
                        <li className="text-gray-300">
                          <strong>"Data Principal"</strong> means the individual to whom personal data relates
                        </li>
                        <li className="text-gray-300">
                          <strong>"Data Fiduciary"</strong> means CybaemTech, the entity determining the purpose and means of processing personal data
                        </li>
                        <li className="text-gray-300">
                          <strong>"Data Processor"</strong> means any person who processes personal data on behalf of the Data Fiduciary
                        </li>
                        <li className="text-gray-300">
                          <strong>"Processing"</strong> means collection, recording, organization, structuring, storage, adaptation, retrieval, use, disclosure, erasure, or destruction of personal data
                        </li>
                        <li className="text-gray-300">
                          <strong>"Consent"</strong> means a freely given, specific, informed, and unambiguous indication of the data principal's wishes
                        </li>
                      </ul>
                    </section>

                    <Separator className="bg-gray-700 my-8" />

                    <div className="text-center py-8">
                      <p className="text-gray-400 text-lg mb-4"><strong>Last Updated:</strong> June 15, 2025</p>
                      <p className="text-gray-400 mb-2">© 2025 CybaemTech Private Limited. All rights reserved.</p>
                      <p className="text-gray-300 text-sm"><strong>Company Registration:</strong> U62099PN2025PTC237404</p>
                      <p className="text-gray-300 text-sm"><strong>Registered Office:</strong> RoC-Pune</p>
                      <p className="text-gray-300 text-sm"><strong>Website:</strong> <a href="https://www.cybaemtech.com" className="text-primary hover:underline">www.cybaemtech.com</a></p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
