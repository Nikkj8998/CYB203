import { useEffect, useState } from "react";
import React from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Send, Globe, Building, ChevronDown } from "lucide-react";
import { SocialIcons } from "@/components/SocialIcons";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThankYouPage from "@/components/ThankYou";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Shield, Users, Award, HeadphonesIcon } from "lucide-react";
import AlphabeticCaptcha from "@/components/AlphabeticCaptcha";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required").regex(/^[^a-zA-Z]+$/, "Phone number cannot contain letters"),
  country: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
  sourcePage: z.string().optional(),
  selectedPlan: z.string().optional(),
  captchaValid: z.boolean().refine((val) => val === true, {
    message: "Please complete the captcha verification",
  }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const whyChooseReasons = [
  {
    icon: CheckCircle,
    title: "Free 30-minute strategy session",
    description: "Get expert consultation at no cost to understand your business needs.",
  },
  {
    icon: Shield,
    title: "Certified experts & consultants",
    description: "Work with industry-certified professionals with proven track records.",
  },
  {
    icon: Users,
    title: "Flexible scheduling worldwide",
    description: "Book consultations at your convenience across different time zones.",
  },
  {
    icon: Award,
    title: "Customized solution roadmap",
    description: "Receive tailored recommendations specific to your business requirements.",
  },
];

const faqs = [
  {
    question: "How quickly will you respond?",
    answer: "We typically respond to all inquiries within 2-4 business hours. For urgent matters, please call us directly at +91 90 2854 1383.",
  },
  {
    question: "Do you offer a free initial consultation?",
    answer: "Yes, we provide a complimentary 30-minute consultation to understand your requirements and discuss how our services can benefit your business.",
  },
  {
    question: "Can you sign an NDA before we share details?",
    answer: "Absolutely. We understand the importance of confidentiality and are happy to sign a Non-Disclosure Agreement before discussing your project details.",
  },
  {
    question: "What engagement models do you support?",
    answer: "We offer flexible engagement models including project-based, dedicated team, staff augmentation, and managed services to suit your specific needs and budget.",
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer: "Yes, we offer comprehensive post-deployment support including maintenance, updates, monitoring, and technical assistance based on agreed SLAs.",
  },
  {
    question: "What industries do you specialize in?",
    answer: "We serve various industries including healthcare, finance, e-commerce, manufacturing, education, and government sectors with tailored technology solutions.",
  },
];

const whereWeServeIndia = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad"];
const whereWeServeGlobal = ["USA", "UK", "Canada", "Australia", "UAE"];

const contactFormRightInfo = [
  {
    icon: MapPin,
    label: "Office Address",
    value: "Suratwala Mark Plazzo, Hinjawadi, Pune, Maharashtra 411057",
  },
  {
    icon: Phone,
    label: "Call Us for Business",
    value: "+91-9028541383",
    link: "tel:+919028541383",
  },
  {
    icon: Phone,
    label: "Call us for Career and Support",
    value: "+91 8484815905",
    link: "tel:+918484815905",
  },
  {
    icon: Mail,
    label: "Email",
    value: "sales@cybaemtech.com",
    link: "mailto:sales@cybaemtech.com",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "24/7",
  },
];



const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];

const Contact = () => {
  const [sourcePage, setSourcePage] = useState<string>("");
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const [countrySearch, setCountrySearch] = useState<string>("");
  const [showCountryDropdown, setShowCountryDropdown] = useState<boolean>(false);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const [captchaValid, setCaptchaValid] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      company: "",
      service: "",
      message: "",
      sourcePage: "",
      selectedPlan: "",
      captchaValid: false,
    },
  });

  useEffect(() => {
    // Capture source page information
    const referrer = document.referrer || "Direct";
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("source") || referrer;
    const planFromUrl = urlParams.get("plan") || "";

    // Check for saved plan in sessionStorage
    const savedPlan = sessionStorage.getItem("selectedPlan") || "";

    // Priority: URL parameter > sessionStorage
    const finalPlan = planFromUrl || savedPlan;

    // If plan exists in URL, save it to sessionStorage
    if (planFromUrl) {
      sessionStorage.setItem("selectedPlan", planFromUrl);
    }

    setSourcePage(source);
    form.setValue("sourcePage", source);
    form.setValue("selectedPlan", finalPlan);
  }, [form]);

  // Filter countries based on search
  useEffect(() => {
    if (countrySearch) {
      const filtered = countries.filter(country =>
        country.toLowerCase().includes(countrySearch.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  }, [countrySearch]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    if (!data.captchaValid) {
      alert("Please complete the captcha verification.");
      return;
    }

    try {
      console.log("Form submitted:", data);

      const response = await fetch("https://www.cybaemtech.com/cybaem_contact/contact_v2.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          captchaValid: undefined,
        }),
      });

      if (response.ok) {
        sessionStorage.removeItem("selectedPlan");
        setShowThankYou(true);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      } else {
        alert("Something went wrong. Please try again.");
      }

    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleBackToForm = () => {
    setShowThankYou(false);
    form.reset();
    sessionStorage.removeItem("selectedPlan");
    setCaptchaValid(false);
  };

  // Show thank you page if form was successfully submitted
  if (showThankYou) {
    return <ThankYouPage onBack={handleBackToForm} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a0f1c]">


      <Header />

      {/* Contact Information Cards Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              <span className="text-white">Get in </span>
              <span className="text-primary">Touch</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              We're here to help transform your business with cutting-edge technology solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {contactFormRightInfo.filter(info => info.label !== "Business Hours").map((info, idx) => (
              <Card
                key={idx}
                className="bg-gray-900/50 border-gray-800 hover:border-primary/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-primary/20 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-white font-semibold mb-3 text-base">{info.label}</h3>
                  {info.link ? (
                    <a href={info.link} className="text-gray-400 hover:text-primary transition-colors text-sm block">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-gray-400 text-sm">{info.value}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Social Media Links */}
          <div className="mt-12 text-center">
            <h3 className="text-white font-semibold mb-4 text-lg">Connect With Us</h3>
            <SocialIcons variant="contact" className="justify-center" iconSize={24} />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 md:py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              <span className="text-white">Quick Contact </span>
              <span className="text-primary">Form</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Fill out the form and our experts will reach out within 24 hours
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {/* Contact Form - Full Width Horizontal Layout */}
            <div className="relative rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-5 md:p-6 lg:p-8 overflow-hidden shadow-2xl border border-gray-700/50">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItMnptMCAydjJoMnYtMmgtMnptLTIgMGgtMnYyaDJ2LTJ6bTAtMnYyaDJ2LTJoLTJ6bTItMmgydi0yaC0ydjJ6bTAtMnYtMmgtMnYyaDJ6bTIgMGgydjJoLTJ2LTJ6bTAgMnYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>

              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative z-10">
                <div className="mb-4 md:mb-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Send className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">Request a Free Consultation</h3>
                  </div>
                </div>
                <div className="pb-4">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-semibold text-sm">Full Name *</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 h-11"
                                  placeholder="Enter your name"
                                  autoComplete="name"
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
                              <FormLabel className="text-white font-semibold text-sm">Email Address *</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 h-11"
                                  placeholder="your.email@company.com"
                                  autoComplete="email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-semibold text-sm">Phone Number *</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  onChange={(e) => {
                                    const value = e.target.value.replace(/[a-zA-Z]/g, '');
                                    field.onChange(value);
                                  }}
                                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 h-11"
                                  placeholder="Enter your Mobile Number"
                                  autoComplete="tel"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-semibold text-sm">Country</FormLabel>
                              <FormControl>
                                <div className="relative" ref={countryDropdownRef}>
                                  <Input
                                    value={countrySearch || field.value}
                                    onChange={(e) => {
                                      setCountrySearch(e.target.value);
                                      field.onChange(e.target.value);
                                      setShowCountryDropdown(true);
                                    }}
                                    onFocus={() => {
                                      if (countrySearch) setShowCountryDropdown(true);
                                    }}
                                    className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 h-11"
                                    placeholder="Type to search country..."
                                    autoComplete="off"
                                  />
                                  {showCountryDropdown && filteredCountries.length > 0 && (
                                    <div className="absolute z-50 w-full mt-1 max-h-60 overflow-auto bg-gray-800 border border-gray-600 rounded-lg shadow-2xl">
                                      {filteredCountries.map((country, index) => (
                                        <div
                                          key={index}
                                          onClick={() => {
                                            field.onChange(country);
                                            setCountrySearch(country);
                                            setShowCountryDropdown(false);
                                          }}
                                          className="px-4 py-2.5 text-white hover:bg-primary/20 cursor-pointer transition-colors duration-150 flex items-center justify-between"
                                        >
                                          <span>{country}</span>
                                          <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-semibold text-sm">Message</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 h-11"
                                  placeholder="Describe your requirements..."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="captchaValid"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white flex items-center gap-2">
                              <Shield className="w-4 h-4 text-primary" />
                              Security Verification *
                            </FormLabel>
                            <FormControl>
                              <AlphabeticCaptcha
                                onChange={(isValid) => {
                                  field.onChange(isValid);
                                  setCaptchaValid(isValid);
                                }}
                                onReset={() => {
                                  field.onChange(false);
                                  setCaptchaValid(false);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-white font-bold py-3 text-base rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-primary/20"
                      >
                        Get My Free Consultation
                        <Send className="w-5 h-5 ml-2" />
                      </Button>
                      <div className="flex flex-wrap justify-center gap-6 md:gap-8 pt-3 border-t border-gray-700/50">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-300 text-sm font-medium">💬 We'll respond Quickly.</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-300 text-sm font-medium">🔒 Your information is 100% secure.</span>
                        </div>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              <span className="text-white">Visit Our </span>
              <span className="text-primary">Office</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Find us on the map and visit our office in Pune, India
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <Card className="bg-gray-900/80 border-gray-700 overflow-hidden">
              <CardContent className="p-0">
                <div className="w-full h-96 md:h-[500px] relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.635261367137!2d73.74575887496471!3d18.59047548251667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b71e64b665df%3A0xf2de2df843c281ce!2sCybaem%20Tech!5e0!3m2!1sen!2sin!4v1758686264653!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      filter: 'invert(90%) hue-rotate(180deg) saturate(1.2) brightness(0.9) contrast(1.1)'
                    }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="CybaemTech Pune Office Location"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
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
            <Card className="bg-gray-900/50 border-gray-800 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-6 h-6 text-primary" />
                  <h3 className="text-xl md:text-2xl font-bold text-white">India</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {whereWeServeIndia.map((city) => (
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
            <Card className="bg-gray-900/50 border-gray-800 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-6 h-6 text-primary" />
                  <h3 className="text-xl md:text-2xl font-bold text-white">Global</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {whereWeServeGlobal.map((country) => (
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

      {/* Why teams choose Cybaem Tech */}
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
            {[
              {
                icon: CheckCircle,
                title: "Customer-driven delivery with exceptional tech",
                description: "We prioritize your business needs while delivering cutting-edge technology solutions.",
              },
              {
                icon: Shield,
                title: "Transparent value security teams rely on",
                description: "Our security practices are transparent, reliable, and trusted by enterprise teams worldwide.",
              },
              {
                icon: Award,
                title: "Certified Cloud Profiles and security experts",
                description: "Our team holds industry certifications and deep expertise in cloud and security domains.",
              },
              {
                icon: Users,
                title: "Specialized practice and deep communications",
                description: "We maintain clear communication channels and specialized teams for each technology domain.",
              },
              {
                icon: HeadphonesIcon,
                title: "24/7 availability options for defined SLA",
                description: "Round-the-clock support with clearly defined service level agreements for peace of mind.",
              },
            ].map((reason, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-primary/50 transition-all duration-300 group">
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

      {/* Ready When You Are CTA - Updated with brand colors */}
      <section className="py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto mobile-padding">
          <Card className="bg-gray-800/50 border-gray-700 hover:border-primary/30 transition-all duration-300">
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
                  document.querySelector("form")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
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