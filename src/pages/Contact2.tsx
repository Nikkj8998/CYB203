import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, MapPin, Clock, Send, Building, Globe, CheckCircle, Shield, Users, Zap, Award, HeadphonesIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  sourcePage: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [sourcePage, setSourcePage] = useState<string>("");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
      sourcePage: "",
    },
  });

  useEffect(() => {
    // Capture source page information
    const referrer = document.referrer || "Direct";
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("source") || referrer;
    setSourcePage(source);
    form.setValue("sourcePage", source);
  }, [form]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("https://www.cybaemtech.com/cybaem_contact/contact_v2.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Thank you for your message! We'll get back to you soon. A confirmation email has been sent.");
        form.reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const contactInfo = [
    {
      icon: Building,
      title: "Headquarters",
      details: ["CybaemTech Solutions", "Pune, Maharashtra", "India"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["Call Us for Business: +91-9028541383", "Call us for Career and Support: +91 8484815905"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@cybaemtech.com", "sales@cybaemtech.com"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["24*7"],
    },
    {
      icon: HeadphonesIcon,
      title: "Existing Customer Support",
      details: ["support@cybaemtech.com"],
    },
  ];

  const offices = [
    {
      name: "Pune Office",
      address: "Suratwala Mark Plazzo, Hinjawadi, Pune, Maharashtra 411057",
      phone: ["+91-8530171515 | ", "+91-9028541383"],
      email: "info@cybaemtech.com",
    },
  ];

  const whyChooseReasons = [
    {
      icon: CheckCircle,
      title: "Customer-driven delivery with exceptional tech",
      description: "We prioritize your business needs while delivering cutting-edge technology solutions."
    },
    {
      icon: Shield,
      title: "Transparent value security teams rely on",
      description: "Our security practices are transparent, reliable, and trusted by enterprise teams worldwide."
    },
    {
      icon: Award,
      title: "Certified Cloud Profiles and security experts",
      description: "Our team holds industry certifications and deep expertise in cloud and security domains."
    },
    {
      icon: Users,
      title: "Specialized practice and deep communications",
      description: "We maintain clear communication channels and specialized teams for each technology domain."
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 availability options for defined SLA",
      description: "Round-the-clock support with clearly defined service level agreements for peace of mind."
    }
  ];

  const faqs = [
    {
      question: "How quickly will you respond?",
      answer: "We typically respond to all inquiries within 2-4 business hours. For urgent matters, please call us directly at +91 90 2854 1383."
    },
    {
      question: "Do you offer a free initial consultation?",
      answer: "Yes, we provide a complimentary 30-minute consultation to understand your requirements and discuss how our services can benefit your business."
    },
    {
      question: "Can you sign an NDA before we share details?",
      answer: "Absolutely. We understand the importance of confidentiality and are happy to sign a Non-Disclosure Agreement before discussing your project details."
    },
    {
      question: "What engagement models do you support?",
      answer: "We offer flexible engagement models including project-based, dedicated team, staff augmentation, and managed services to suit your specific needs and budget."
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer: "Yes, we offer comprehensive post-deployment support including maintenance, updates, monitoring, and technical assistance based on agreed SLAs."
    },
    {
      question: "What industries do you specialize in?",
      answer: "We serve various industries including healthcare, finance, e-commerce, manufacturing, education, and government sectors with tailored technology solutions."
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>Contact Cybaem Tech | IT, Cloud, Managed Services & Security</title>
        <meta name="description" content="Contact Cybaem Tech for IT, Cloud, AI & Cybersecurity. Address: Suratwala Mark Plazzo, Hinjawadi, Pune 411057. Email: sales@cybaemtech.com. Call: +91 9028541383." />
        <link rel="canonical" href="https://www.cybaemtech.com/contact" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Cybaem Tech | IT, Cloud, Managed Services & Security" />
        <meta property="og:description" content="Address: Suratwala Mark Plazzo, Hinjawadi, Pune 411057. Email: sales@cybaemtech.com. Call: +91 9028541383." />
        <meta property="og:url" content="https://www.cybaemtech.com/contact" />
        <meta property="og:site_name" content="Cybaem Tech" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Cybaem Tech | IT, Cloud, Managed Services & Security" />
        <meta name="twitter:description" content="Address: Suratwala Mark Plazzo, Hinjawadi, Pune 411057. Email: sales@cybaemtech.com. Call: +91 9028541383." />
      </Helmet>

      <Header />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-secondary/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 border border-primary/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 border border-accent/30 animate-pulse"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container mx-auto mobile-padding text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="mobile-hero-text md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6">
              Get In <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Ready to transform your business with cutting-edge technology? Let's discuss your next project.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto mobile-padding">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-12 md:mb-16">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-800 hover:border-primary/50 transition-all duration-300 md:hover:transform md:hover:scale-105 hover:shadow-xl md:hover:shadow-2xl hover:shadow-primary/20 group touch-card"
              >
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="mb-3 md:mb-4 flex justify-center">
                    <div className="p-2 md:p-3 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
                      <info.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-white font-semibold mb-2 md:mb-3 text-sm md:text-base">{info.title}</h3>
                  {info.details.map((detail, idx) => {
                    if (info.title === "Call Us") {
                      return (
                        <a 
                          key={idx} 
                          href={`tel:${detail.replace(/[^\d+]/g, '')}`}
                          className="text-gray-400 text-xs md:text-sm mb-1 hover:text-primary transition-colors cursor-pointer block"
                        >
                          {detail}
                        </a>
                      );
                    }
                    if (info.title === "Email Us" || info.title === "Existing Customer Support") {
                      return (
                        <a 
                          key={idx} 
                          href={`mailto:${detail}`}
                          className="text-gray-400 text-xs md:text-sm mb-1 hover:text-primary transition-colors cursor-pointer block"
                        >
                          {detail}
                        </a>
                      );
                    }
                    return (
                      <p key={idx} className="text-gray-400 text-xs md:text-sm mb-1">
                        {detail}
                      </p>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Office Locations */}
      <section id="contact-form" className="py-12 md:py-16">
        <div className="container mx-auto mobile-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <Card className="bg-gray-900/50 border-gray-800 hover:border-primary/30 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Send className="w-6 h-6 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Name *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-gray-800 border-gray-700 text-white focus:border-primary/50 focus:ring-primary/20 touch-target"
                                placeholder="Your full name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                className="bg-gray-800 border-gray-700 text-white focus:border-primary/50 focus:ring-primary/20 touch-target"
                                placeholder="your.email@company.com"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Phone *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-gray-800 border-gray-700 text-white focus:border-primary/50 focus:ring-primary/20 touch-target"
                                placeholder="+91 98765 43210"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Company</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-gray-800 border-gray-700 text-white focus:border-primary/50 focus:ring-primary/20 touch-target"
                                placeholder="Your company name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Service Interest *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-primary/50 touch-target">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gray-800 border-gray-700">
                              <SelectItem value="cloud-solutions" className="text-white">Cloud Solutions</SelectItem>
                              <SelectItem value="cybersecurity" className="text-white">Cybersecurity Services</SelectItem>
                              <SelectItem value="enterprise-solutions" className="text-white">Enterprise Solutions</SelectItem>
                              <SelectItem value="digital-marketing" className="text-white">Digital Marketing</SelectItem>
                              <SelectItem value="ai-data-analytics" className="text-white">AI & Data Analytics</SelectItem>
                              <SelectItem value="managed-services" className="text-white">Managed Services</SelectItem>
                              <SelectItem value="other" className="text-white">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className="bg-gray-800 border-gray-700 text-white focus:border-primary/50 focus:ring-primary/20 min-h-[100px] md:min-h-[120px] touch-target"
                              placeholder="Tell us about your project requirements..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 md:py-4 transition-all duration-300 md:hover:scale-105 hover:shadow-lg hover:shadow-primary/30 touch-target"
                    >
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Office Locations */}
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 mb-4 md:mb-6">
                <Globe className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                Our Offices
              </h3>
              {offices.map((office, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-primary/50 transition-all duration-300 md:hover:transform md:hover:translateX-2 hover:shadow-xl hover:shadow-primary/20 touch-card">
                  <CardContent className="p-4 md:p-6">
                    <h4 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">{office.name}</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 md:gap-3">
                        <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <p className="text-gray-400 text-xs md:text-sm">{office.address}</p>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <Phone className="w-4 h-4 text-primary" />
                        <div className="text-gray-400 text-xs md:text-sm">
                          {office.phone.map((phone, phoneIdx) => (
                            <a 
                              key={phoneIdx}
                              href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                              className="hover:text-primary transition-colors cursor-pointer"
                            >
                              {phone}
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <Mail className="w-4 h-4 text-primary" />
                        <a 
                          href={`mailto:${office.email}`}
                          className="text-gray-400 text-xs md:text-sm hover:text-primary transition-colors cursor-pointer"
                        >
                          {office.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Map Section */}
              <div className="mt-8">
                <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  Find Us on Map
                </h3>
                <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden border border-gray-800 shadow-lg shadow-primary/20">
                  <iframe
                    src="https://www.google.com/maps?q=CybaemTech+Pvt+Ltd,+Office+No.304,+3rd+floor,+Suratwala+Mark+Plazzo,+Hinjewadi+Phase+1,+Pune+-+411057&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Teams Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto mobile-padding">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              Why teams choose <span className="text-primary">Cybaem Tech</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              We deliver exceptional value through proven expertise, transparent practices, and unwavering commitment to your success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {whyChooseReasons.map((reason, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-primary/50 transition-all duration-300 md:hover:transform md:hover:scale-105 hover:shadow-xl hover:shadow-primary/20 group">
                <CardContent className="p-6 md:p-8">
                  <div className="mb-4">
                    <div className="p-3 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors w-fit">
                      <reason.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-3">{reason.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto mobile-padding">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Get answers to common questions about our services and processes.
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
                  <AccordionContent className="text-gray-400 pb-4 md:pb-6 text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Where We Serve Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto mobile-padding">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              Where We <span className="text-primary">Serve</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              We're here, prepared to serve businesspeople for most business services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* India Section */}
            <Card className="bg-gray-900/50 border-gray-800 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-6 h-6 text-primary" />
                  <h3 className="text-xl md:text-2xl font-bold text-white">India</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad'].map((city) => (
                    <span 
                      key={city}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium hover:bg-primary/30 transition-colors"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Global Section */}
            <Card className="bg-gray-900/50 border-gray-800 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-6 h-6 text-primary" />
                  <h3 className="text-xl md:text-2xl font-bold text-white">Global</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['USA', 'UK', 'Canada', 'Australia', 'UAE'].map((country) => (
                    <span 
                      key={country}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium hover:bg-primary/30 transition-colors"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ready When You Are CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto mobile-padding">
          <Card className="bg-gray-900/50 border-gray-800 hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Ready when you are
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto">
                Start your journey with us today and experience why over 100+ companies trust us with their digital transformation.
              </p>
              <Button 
                size="lg" 
                onClick={() => {
                  document.getElementById('contact-form')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
              >
                Start Your Project
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;