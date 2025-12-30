import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { usePostHog } from "@/hooks/usePostHog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Shield, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ThankYouPage from "@/components/ThankYou";
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

const contactFormRightInfo = [
  {
    icon: MapPin,
    label: "Office Address",
    value: "Suratwala Mark Plazzo, Hinjawadi, Pune, Maharashtra 411057",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91-9028541383",
    link: "tel:+919028541383",
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

const ContactSection = () => {
  const [sourcePage, setSourcePage] = useState<string>("");
  const [countrySearch, setCountrySearch] = useState<string>("");
  const [showCountryDropdown, setShowCountryDropdown] = useState<boolean>(false);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const [captchaValid, setCaptchaValid] = useState(false);
  const navigate = useNavigate();
  const { trackEvent } = usePostHog();

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
      toast.error("Please complete the captcha verification.");
      trackEvent('contact_form_validation_error', { error: 'missing_captcha' });
      return;
    }
    try {
      console.log('Submitting form data:', data);
      const response = await fetch("https://www.cybaemtech.com/cybaem_contact/contact_v2.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, captchaValid: undefined }),
      });

      console.log('Form submission response:', response.status, response.statusText);

      trackEvent('contact_form_submitted', {
        source: data.sourcePage,
        country: data.country,
        selected_plan: data.selectedPlan,
      });

      sessionStorage.removeItem("selectedPlan");
      form.reset();
      setCaptchaValid(false);
      navigate("/thankyou", { replace: true });
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    } catch (error) {
      console.error('Form submission error:', error);

      trackEvent('contact_form_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
        source: data.sourcePage,
      });

      toast.error("Failed to submit form. Please try again or contact support.");

      sessionStorage.removeItem("selectedPlan");
      form.reset();
      setCaptchaValid(false);

      navigate("/thankyou", { replace: true });
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  };

  return (
    <section id="contact-form" className="relative py-10 md:py-14 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Quick Contact <span className="text-primary">Form</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Fill out the form and our experts will reach out within 24 hours.
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
  );
};

export default ContactSection;