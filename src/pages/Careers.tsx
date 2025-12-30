import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { toast } from "@/components/ui/use-toast";
import { Search, MapPin, Clock, Users, Code, Brain, Shield, Briefcase, Award, Play, ArrowRight, Plus, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "@/config/api";

const Careers = () => {
  const [allJobs, setAllJobs] = useState<any[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/jobs.php?status=active`, {
          credentials: 'include',
          headers: { "Cache-Control": "no-cache" }
        });

        // If unauthorized, try without credentials (public access)
        if (res.status === 401) {
          console.log('Not authenticated, loading public jobs');
          const publicRes = await fetch(`${API_BASE_URL}/jobs.php?status=active`, {
            credentials: 'omit',
            headers: { "Cache-Control": "no-cache" }
          });

          if (publicRes.ok) {
            const data = await publicRes.json();
            if (data.success && Array.isArray(data.data)) {
              const transformedJobs = data.data.map((job: any) => ({
                id: job.id,
                title: job.title,
                department: job.department || 'General',
                salary: job.salary || 'Competitive',
                location: job.location,
                type: job.type || 'Full-time',
                experience: job.experience || '0-2 years',
                description: job.description,
                skills: job.requirements ? job.requirements.split('\n').filter(Boolean) : [],
                responsibilities: job.responsibilities ? job.responsibilities.split('\n').filter(Boolean) : []
              }));
              setAllJobs(transformedJobs);
              return;
            }
          }
        }

        // If we get here, either we're authenticated or the first request worked
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.data)) {
            const transformedJobs = data.data.map((job: any) => ({
              id: job.id,
              title: job.title,
              department: job.department || 'General',
              salary: job.salary || 'Competitive',
              location: job.location,
              type: job.type || 'Full-time',
              experience: job.experience || '0-2 years',
              description: job.description,
              skills: job.requirements ? job.requirements.split('\n').filter(Boolean) : [],
              responsibilities: job.responsibilities ? job.responsibilities.split('\n').filter(Boolean) : []
            }));
            setAllJobs(transformedJobs);
          } else {
            setAllJobs([]);
          }
        } else {
          throw new Error(`HTTP error: ${res.status}`);
        }
      } catch (e) {
        console.error("Failed to load jobs from API", e);
        // Set empty array instead of showing error for public users
        setAllJobs([]);
        toast({
          title: "Notice",
          description: "Job listings are currently unavailable. Please check back later.",
          variant: "default"
        });
      } finally {
        setLoadingJobs(false);
      }
    };
    load();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [selectedExperienceRanges, setSelectedExperienceRanges] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<"Newest" | "Oldest" | "Relevance">("Newest");
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(filteredJobs.length / pageSize);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Helpers for filters
  const toggleType = (type: string) => {
    setSelectedTypes(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type); else next.add(type);
      return next;
    });
  };
  const toggleExperience = (range: string) => {
    setSelectedExperienceRanges(prev => {
      const next = new Set(prev);
      if (next.has(range)) next.delete(range); else next.add(range);
      return next;
    });
  };
  const parseExperienceYears = (exp: string) => {
    const match = exp.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const clearFilters = () => {
    setSelectedDepartment("All");
    setLocationQuery("");
    setSelectedTypes(new Set());
    setSelectedExperienceRanges(new Set());
    setSearchTerm("");
    setSortBy("Newest");
  };

  // Compute filtered jobs on every change
  useEffect(() => {
    let result = allJobs.filter(job => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        !search ||
        job.title.toLowerCase().includes(search) ||
        job.description.toLowerCase().includes(search) ||
        job.skills.some((s: string) => s.toLowerCase().includes(search));

      const matchesDepartment = selectedDepartment === "All" || job.department === selectedDepartment;

      const matchesLocation = !locationQuery || job.location.toLowerCase().includes(locationQuery.toLowerCase());

      const matchesType = selectedTypes.size === 0 || selectedTypes.has(job.type);

      const years = parseExperienceYears(job.experience);
      const matchesExperience =
        selectedExperienceRanges.size === 0 ||
        Array.from(selectedExperienceRanges).some(range => {
          switch (range) {
            case "0-2 years":
              return years <= 2;
            case "2-5 years":
              return years >= 2 && years <= 5;
            case "5-10 years":
              return years >= 5 && years <= 10;
            case "10+ years":
              return years >= 10;
            default:
              return true;
          }
        });

      return matchesSearch && matchesDepartment && matchesLocation && matchesType && matchesExperience;
    });

    if (sortBy === "Newest") result.sort((a, b) => b.id - a.id);
    if (sortBy === "Oldest") result.sort((a, b) => a.id - b.id);

    setFilteredJobs(result);
  }, [allJobs, searchTerm, selectedDepartment, locationQuery, selectedTypes, selectedExperienceRanges, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDepartment, locationQuery, selectedTypes, selectedExperienceRanges, sortBy]);

  // Application dialog state
  const [applyOpen, setApplyOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const teamTestimonials = [
    {
      name: "Sarah Chen",
      role: "Senior AI Engineer",
      quote: "The freedom to innovate and work on cutting-edge projects is incredible. Every day brings new challenges and opportunities to grow.",
      image: "/uploads/5c70f72d-844c-4444-931d-c70721750d75.png",
      years: "3 years with CybaemTech"
    },
    {
      name: "Michael Rodriguez",
      role: "Cloud Solutions Architect",
      quote: "The collaborative environment and support from leadership makes this the best place I've worked. We truly make an impact.",
      image: "/uploads/77cb2418-56bd-44ad-8bfd-3651e3cdb2c0.png",
      years: "5 years with CybaemTech"
    },
    {
      name: "Emily Johnson",
      role: "Cybersecurity Consultant",
      quote: "Working here has accelerated my career beyond what I thought possible. The learning opportunities are endless.",
      image: "/uploads/b8079874-8ce3-4eb4-b9de-d8455fa88779.png",
      years: "2 years with CybaemTech"
    }
  ];

  const handleOpenApply = (job: any) => {
    setSelectedJob(job);
    setApplyOpen(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    if (!applicantName || !applicantEmail || !resumeFile) {
      toast({
        title: "Missing fields",
        description: "Name, email and resume are required.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicantEmail)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (resumeFile.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Max file size is 10MB.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('job_id', selectedJob.id.toString());
      formData.append('job_title', selectedJob.title);
      formData.append('applicant_name', applicantName);
      formData.append('applicant_email', applicantEmail);
      formData.append('applicant_phone', applicantPhone || '');
      formData.append('source_url', window.location.href);
      formData.append('resume', resumeFile);

      const response = await fetch(`${API_BASE_URL}/job-application.php`, {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", response.status);

      const responseText = await response.text();
      console.log("Response text:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse JSON response:", parseError, "Raw response:", responseText);
        throw new Error("Invalid server response format");
      }

      if (data.success) {
        toast({
          title: "Application Submitted!",
          description: "Thank you for applying. We'll review your application and get back to you soon.",
        });
        setApplyOpen(false);
        setApplicantName("");
        setApplicantEmail("");
        setApplicantPhone("");
        setResumeFile(null);
      } else {
        console.error("Application submission failed:", data);
        toast({
          title: "Submission Failed",
          description: data.error || "Failed to submit application. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Network Error",
        description: "Failed to send application. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Reset form when dialog closes
  useEffect(() => {
    if (!applyOpen) {
      setApplicantName("");
      setApplicantEmail("");
      setApplicantPhone("");
      setResumeFile(null);
    }
  }, [applyOpen]);

  return (
    <div className="min-h-screen bg-black text-white">


      <Header />

      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-primary/40 rounded-full blur-xl animate-spin" style={{
            animationDuration: '20s'
          }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-accent/25 rounded-full blur-2xl animate-bounce" style={{
            animationDuration: '15s'
          }}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-primary/30 rounded-full blur-xl animate-pulse" style={{
            animationDuration: '25s'
          }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-accent/35 rounded-full blur-2xl animate-spin" style={{
            animationDuration: '30s',
            animationDirection: 'reverse'
          }}></div>

          {/* Geometric shapes */}
          <div className="absolute top-1/5 right-1/5 w-32 h-32 border-2 border-accent/40 rotate-45 animate-spin" style={{
            animationDuration: '40s'
          }}></div>
          <div className="absolute bottom-1/5 left-1/5 w-24 h-24 border-2 border-primary/40 rotate-12 animate-pulse" style={{
            animationDuration: '18s'
          }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 text-white leading-tight">
                JOIN OUR
                <br />
                <span className="text-accent">REVOLUTION</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
                Build the future of technology with a team that values innovation, excellence, and your personal growth. Shape tomorrow's solutions today.
              </p>
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold hover-lift group border-2 border-accent animate-slide-up"
                onClick={() => document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Opportunities
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 animate-fade-in">

        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-black via-primary/5 to-black">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 sm:mb-10 md:mb-12 animate-fade-in">Our Application Process</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {[{
                step: 1,
                title: "Apply Online",
                desc: "Submit your application through our careers portal"
              }, {
                step: 2,
                title: "Initial Review",
                desc: "Our team reviews your application and qualifications"
              }, {
                step: 3,
                title: "Interview Process",
                desc: "Technical and cultural fit interviews with our team"
              }, {
                step: 4,
                title: "Welcome Aboard",
                desc: "Join our team and start your journey with us"
              }].map((item, index) => <div key={index} className="text-center animate-slide-up" style={{
                animationDelay: `${index * 0.1}s`
              }}>
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-accent to-primary rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center hover-lift">
                  <span className="text-2xl sm:text-3xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">{item.desc}</p>
              </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Positions Section - Clean Style */}
      <section id="explore-section" className="py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            {/* Simple Heading */}
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Ready To Explore?
            </h2>

            {/* Simple Subtitle */}
            <p className="text-lg text-gray-400 mb-8">
              Find your next opportunity
            </p>

            {/* Simple Search Bar */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for your perfect job..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 h-14 bg-gray-900 border border-gray-700 text-white placeholder:text-gray-500 rounded-lg focus:border-gray-600 focus:ring-0"
                />
              </div>
            </div>
          </div>

          {/* Results Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <Card className="bg-card/10 backdrop-blur-sm border-primary/20 sticky top-24">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">Filters</h3>
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground hover:text-white">
                      Clear
                    </Button>
                  </div>

                  {/* Location Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium text-white mb-3">Location</h4>
                    <div className="space-y-2">
                      <Input
                        placeholder="Search locations"
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                        className="h-10 bg-card/10 border-primary/20 text-white placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  {/* Area of Interest Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium text-white mb-3">Area of Interest</h4>
                    <div className="space-y-2">
                      {["All", "Technology", "Consulting", "Security", "Sales", "AI & Data", "Operations"].map((filter) => (
                        <label key={filter} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="area"
                            checked={selectedDepartment === filter}
                            onChange={() => setSelectedDepartment(filter)}
                            className="w-4 h-4 text-primary"
                          />
                          <span className="text-sm text-muted-foreground hover:text-white transition-colors">
                            {filter}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Job Type Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium text-white mb-3">Job Type</h4>
                    <div className="space-y-2">
                      {["Full-time", "Part-time", "Contract", "Remote"].map((type) => (
                        <label key={type} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedTypes.has(type)}
                            onChange={() => toggleType(type)}
                            className="w-4 h-4 text-primary"
                          />
                          <span className="text-sm text-muted-foreground hover:text-white transition-colors">
                            {type}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Experience Filter */}
                  <div>
                    <h4 className="font-medium text-white mb-3">Experience</h4>
                    <div className="space-y-2">
                      {["0-2 years", "2-5 years", "5-10 years", "10+ years"].map((exp) => (
                        <label key={exp} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedExperienceRanges.has(exp)}
                            onChange={() => toggleExperience(exp)}
                            className="w-4 h-4 text-primary"
                          />
                          <span className="text-sm text-muted-foreground hover:text-white transition-colors">
                            {exp}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Job Listings */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                <div className="text-white flex items-center gap-4">
                  <div>
                    <span className="text-xl sm:text-2xl font-bold">{filteredJobs.length}</span>
                    <span className="text-muted-foreground ml-2 text-sm sm:text-base">Results</span>
                  </div>
                  {/* Mobile Filters Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden bg-card/10 border-primary/20 text-white hover:bg-card/20">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[350px] bg-black border-primary/20 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle className="text-white">Filters</SheetTitle>
                        <SheetDescription className="text-muted-foreground">
                          Refine your job search
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6">
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full text-muted-foreground hover:text-white mb-4">
                          Clear all filters
                        </Button>

                        {/* Location Filter */}
                        <div className="mb-6">
                          <h4 className="font-medium text-white mb-3">Location</h4>
                          <Input
                            placeholder="Search locations"
                            value={locationQuery}
                            onChange={(e) => setLocationQuery(e.target.value)}
                            className="h-10 bg-card/10 border-primary/20 text-white placeholder:text-muted-foreground"
                          />
                        </div>

                        {/* Area of Interest Filter */}
                        <div className="mb-6">
                          <h4 className="font-medium text-white mb-3">Area of Interest</h4>
                          <div className="space-y-2">
                            {["All", "Technology", "Consulting", "Security", "Sales", "AI & Data", "Operations"].map((filter) => (
                              <label key={filter} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="area-mobile"
                                  checked={selectedDepartment === filter}
                                  onChange={() => setSelectedDepartment(filter)}
                                  className="w-4 h-4 text-primary"
                                />
                                <span className="text-sm text-muted-foreground hover:text-white transition-colors">
                                  {filter}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Job Type Filter */}
                        <div className="mb-6">
                          <h4 className="font-medium text-white mb-3">Job Type</h4>
                          <div className="space-y-2">
                            {["Full-time", "Part-time", "Contract", "Remote"].map((type) => (
                              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={selectedTypes.has(type)}
                                  onChange={() => toggleType(type)}
                                  className="w-4 h-4 text-primary"
                                />
                                <span className="text-sm text-muted-foreground hover:text-white transition-colors">
                                  {type}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Experience Filter */}
                        <div>
                          <h4 className="font-medium text-white mb-3">Experience</h4>
                          <div className="space-y-2">
                            {["0-2 years", "2-5 years", "5-10 years", "10+ years"].map((exp) => (
                              <label key={exp} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={selectedExperienceRanges.has(exp)}
                                  onChange={() => toggleExperience(exp)}
                                  className="w-4 h-4 text-primary"
                                />
                                <span className="text-sm text-muted-foreground hover:text-white transition-colors">
                                  {exp}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground text-sm sm:text-base">
                  <span className="hidden sm:inline">Sort by</span>
                  <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                    <SelectTrigger className="w-[120px] sm:w-[140px] bg-black border-primary/20 text-white hover:bg-card/10 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-primary/20">
                      <SelectItem value="Newest" className="text-white hover:bg-card/20 focus:bg-card/20 focus:text-white cursor-pointer">Newest</SelectItem>
                      <SelectItem value="Oldest" className="text-white hover:bg-card/20 focus:bg-card/20 focus:text-white cursor-pointer">Oldest</SelectItem>
                      <SelectItem value="Relevance" className="text-white hover:bg-card/20 focus:bg-card/20 focus:text-white cursor-pointer">Relevance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Job Cards */}
              {loadingJobs ? (
                <div className="text-center py-12">
                  <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-white/80">Loading job listings...</p>
                </div>
              ) : paginatedJobs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-white/80">No jobs found matching your criteria.</p>
                  <Button onClick={clearFilters} className="mt-4">
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <Accordion type="single" collapsible className="space-y-4">
                  {paginatedJobs.map((job) => (
                    <AccordionItem
                      key={job.id}
                      value={`job-${job.id}`}
                      className="card-interactive bg-card/10 backdrop-blur-sm border-primary/20 hover-lift transition-all duration-300 hover:bg-card/20 rounded-md"
                    >
                      <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 [&>svg]:hidden no-underline hover:no-underline">
                        <div className="w-full flex items-start justify-between gap-3">
                          <div className="flex-1 text-left">
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-white hover:text-primary transition-colors no-underline">
                              {job.title}
                            </h3>
                            <div className="flex flex-wrap items-center text-muted-foreground text-xs sm:text-sm gap-x-2 gap-y-1 mb-2 sm:mb-3">
                              <span className="flex items-center">
                                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                {job.location}
                              </span>
                              <span className="hidden sm:inline">|</span>
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                {job.type}
                              </span>
                              <span className="hidden sm:inline">|</span>
                              <span className="hidden sm:inline">Experience: {job.experience}</span>
                              <span className="sm:hidden">{job.experience}</span>
                            </div>
                            <p className="text-muted-foreground text-sm sm:text-base line-clamp-2">{job.description}</p>
                          </div>
                          <div className="ml-2 sm:ml-6 flex-shrink-0">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-md border border-primary/40 flex items-center justify-center text-primary">
                              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-white/90 space-y-3 sm:space-y-4">
                          <div>
                            <h4 className="font-semibold text-sm sm:text-base">About the role</h4>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{job.description}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm sm:text-base">Key skills</h4>
                            <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
                              {job.skills.map((s: string) => (
                                <span key={s} className="text-xs px-2 py-1 rounded border border-primary/30 text-primary/90">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground flex flex-col sm:flex-row gap-1 sm:gap-4">
                            <span>Salary: {job.salary}</span>
                            <span>Department: {job.department}</span>
                          </div>
                          <div className="pt-2">
                            <Button onClick={() => handleOpenApply(job)} className="w-full sm:w-auto">
                              Apply
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}

              {/* Pagination */}
              {!loadingJobs && filteredJobs.length > 0 && (
                <div className="mt-8 sm:mt-12">
                  <Pagination>
                    <PaginationContent className="gap-1 sm:gap-2">
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage((p) => Math.max(1, p - 1));
                          }}
                          className={`bg-transparent text-white border border-white text-xs sm:text-sm px-2 sm:px-3 ${currentPage === 1 || totalPages === 0 ? "pointer-events-none opacity-50" : ""}`}
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(page => {
                          // On mobile, show fewer pages
                          if (totalPages <= 5) return true;
                          return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                        })
                        .map((page, idx, arr) => {
                          // Add ellipsis between non-consecutive pages
                          const showEllipsis = idx > 0 && page - arr[idx - 1] > 1;
                          return (
                            <React.Fragment key={page}>
                              {showEllipsis && (
                                <PaginationItem key={`ellipsis-${page}`}>
                                  <span className="px-2 text-white">...</span>
                                </PaginationItem>
                              )}
                              <PaginationItem>
                                <PaginationLink
                                  href="#"
                                  size="default"
                                  isActive={page === currentPage}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(page);
                                  }}
                                  className={`bg-transparent text-white border border-white text-xs sm:text-sm w-8 h-8 sm:w-10 sm:h-10 ${page === currentPage ? "bg-white/10" : ""}`}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            </React.Fragment>
                          );
                        })}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage((p) => Math.min(totalPages || 1, p + 1));
                          }}
                          className={`bg-transparent text-white border border-white text-xs sm:text-sm px-2 sm:px-3 ${currentPage === totalPages || totalPages === 0 ? "pointer-events-none opacity-50" : ""}`}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}

              {/* Application Dialog - Executive Style */}
              <Dialog open={applyOpen} onOpenChange={setApplyOpen}>
                <DialogContent className="max-w-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-accent/30 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-primary/5 to-accent/5 rounded-lg pointer-events-none"></div>

                  <DialogHeader className="relative space-y-4 pb-6 border-b border-accent/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-white via-accent/90 to-white bg-clip-text text-transparent">
                          Apply for {selectedJob?.title}
                        </DialogTitle>
                        <DialogDescription className="text-gray-400 mt-1">
                          Submit your details and upload your resume. We'll route it to our HR team.
                        </DialogDescription>
                      </div>
                    </div>
                  </DialogHeader>

                  <form onSubmit={handleSubmitApplication} className="space-y-6 relative mt-6">
                    <div className="space-y-5">
                      <div>
                        <Label htmlFor="applicant-name" className="text-white font-medium mb-2 flex items-center gap-2">
                          <Users className="h-4 w-4 text-accent" />
                          Full name
                        </Label>
                        <Input
                          id="applicant-name"
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          required
                          className="h-12 bg-gray-900/50 border-accent/30 text-white placeholder:text-gray-500 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <Label htmlFor="applicant-email" className="text-white font-medium mb-2 block">
                            Email
                          </Label>
                          <Input
                            type="email"
                            id="applicant-email"
                            value={applicantEmail}
                            onChange={(e) => setApplicantEmail(e.target.value)}
                            required
                            className="h-12 bg-gray-900/50 border-accent/30 text-white placeholder:text-gray-500 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                            placeholder="your.email@example.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="applicant-phone" className="text-white font-medium mb-2 block">
                            Phone
                          </Label>
                          <Input
                            type="tel"
                            id="applicant-phone"
                            value={applicantPhone}
                            onChange={(e) => setApplicantPhone(e.target.value)}
                            className="h-12 bg-gray-900/50 border-accent/30 text-white placeholder:text-gray-500 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="resume" className="text-white font-medium mb-2 flex items-center gap-2">
                          <Award className="h-4 w-4 text-accent" />
                          Resume (PDF/DOC/DOCX, max 10MB)
                        </Label>
                        <div className="relative">
                          <Input
                            id="resume"
                            type="file"
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                            required
                            className="h-12 bg-gray-900/50 border-accent/30 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent/90 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all cursor-pointer"
                          />
                        </div>
                        {resumeFile && (
                          <p className="text-sm text-accent mt-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-accent rounded-full"></span>
                            Selected: {resumeFile.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <DialogFooter className="gap-3 pt-6 border-t border-accent/20">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setApplyOpen(false)}
                        disabled={submitting}
                        className="h-12 px-6 bg-transparent border-2 border-gray-700 text-white hover:bg-gray-800 hover:border-gray-600 transition-all"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="h-12 px-8 bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white font-semibold shadow-lg shadow-accent/20 transition-all hover:shadow-accent/30 hover:scale-105"
                      >
                        {submitting ? (
                          <span className="flex items-center gap-2">
                            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                            Submitting...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            Submit Application
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* Company Culture Video Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 animate-fade-in">Life at CybaemTech</h2>
            <div className="relative bg-black/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10 animate-slide-up">
              <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <div className="text-center px-4">
                  <Play className="h-12 w-12 sm:h-16 sm:w-16 text-white mx-auto mb-3 sm:mb-4" />
                  <p className="text-white text-base sm:text-lg">Company Culture Video</p>
                  <p className="text-white/70 text-sm sm:text-base">Coming Soon</p>
                </div>
              </div>
              <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed px-2">
                Discover what makes CybaemTech a great place to work - from our collaborative culture to our commitment to innovation and employee growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;