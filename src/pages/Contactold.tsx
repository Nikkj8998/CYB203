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
import { Mail, Phone, MapPin, Clock, Send, Building, Globe } from "lucide-react";
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
      details: ["+91 85 3017 1515", "+91 90 2854 1383"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@cybaemtech.com", "sales@cybaemtech.com"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
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
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-400 text-xs md:text-sm mb-1">
                      {detail}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Office Locations */}
      <section className="py-12 md:py-16">
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
                        <p className="text-gray-400 text-xs md:text-sm">{office.phone}</p>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <Mail className="w-4 h-4 text-primary" />
                        <p className="text-gray-400 text-xs md:text-sm">{office.email}</p>
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
      <Footer />
    </div>
  );
};

export default Contact;