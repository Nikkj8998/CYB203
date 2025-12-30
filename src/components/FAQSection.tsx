import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What services does Cybaem Tech provide?",
    answer: "Cybaem Tech is a one-stop IT, Networking, and Digital Marketing company in India. We specialize in Digital Marketing Services (SEO, SMM, PPC, Branding), IT Infrastructure Management, Server Implementation & Support (Windows & Linux), Microsoft 365 Services, Cloud Hosting Solutions, Website Development, and Cybersecurity Services. Our goal is to empower businesses with end-to-end technology and marketing solutions that deliver measurable growth.",
  },
  {
    question: "How does Cybaem Tech help businesses grow digitally?",
    answer: "We build data-driven digital marketing strategies focused on ROI and brand visibility. Our services include SEO (Search Engine Optimization), Social Media Marketing & Management, Google Ads (PPC), App Store Optimization, Content Marketing, and Email Campaigns. We help you attract, engage, and convert more leads while improving online reputation and organic reach.",
  },
  {
    question: "What IT infrastructure and networking services does Cybaem Tech offer?",
    answer: "Our IT infrastructure services cover Server Deployment, Virtualization (VMware, Hyper-V), Network Configuration & Monitoring, Remote IT Support, and Data Security Audits. We ensure 99.9% uptime, secure connectivity, and ITSM-based support for businesses of all sizes.",
  },
  {
    question: "Does Cybaem Tech provide Microsoft 365 and cloud migration services?",
    answer: "Yes. We are experts in Microsoft 365 setup, migration, and administration, including Exchange, SharePoint, Teams, and OneDrive. We also help businesses move securely to the cloud—AWS, Azure, or Google Cloud—offering data migration, backup, and disaster recovery solutions.",
  },
  {
    question: "How does Cybaem Tech ensure cybersecurity and data protection?",
    answer: "We follow ISO-27001 and GDPR compliance standards, providing firewall management, endpoint protection, vulnerability assessments, and security patching. Our cybersecurity team ensures your IT environment stays safe from data breaches, ransomware, and phishing threats.",
  },
  {
    question: "Can Cybaem Tech design and develop websites or software applications?",
    answer: "Absolutely. We create responsive websites, custom web applications, and mobile apps optimized for performance, SEO, and user experience. Our development process covers UI/UX design, backend architecture, CMS integration, and eCommerce solutions, ensuring your digital presence stands out.",
  },
  {
    question: "Why choose Cybaem Tech as your IT and digital partner?",
    answer: "Cybaem Tech combines technical expertise with marketing intelligence to deliver real business impact. We provide end-to-end IT support, scalable digital marketing, and reliable cloud & security solutions under one roof — helping you save time, reduce costs, and grow faster. Trusted by 100+ clients across industries, we are your preferred technology partner in India.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-12 md:py-16 bg-black">
      <div className="container mx-auto mobile-padding">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Get answers to common questions about our services and solutions.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gray-900/50 border border-gray-800 rounded-lg px-6 hover:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-white hover:text-primary text-left py-4 md:py-6">
                  <span className="text-base md:text-lg font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-sm md:text-base leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
