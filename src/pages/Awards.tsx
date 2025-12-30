import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Star, Trophy, Users, Shield, Globe } from "lucide-react";

const Awards = () => {
  const recentAwards = [
    {
      year: "2024",
      title: "Technology Innovation Award",
      organization: "Global Tech Excellence",
      description: "Recognized for groundbreaking AI solutions in enterprise digital transformation",
      category: "Technology"
    },
    {
      year: "2024",
      title: "Best Workplace Culture",
      organization: "Corporate Excellence Institute",
      description: "Honored for creating an inclusive and innovative workplace environment",
      category: "Workplace"
    },
    {
      year: "2023",
      title: "Cybersecurity Excellence Award",
      organization: "Security Industry Association",
      description: "Acknowledged for exceptional cybersecurity solutions and threat mitigation",
      category: "Security"
    },
    {
      year: "2023",
      title: "Digital Transformation Leader",
      organization: "Business Technology Awards",
      description: "Recognized as a leading provider of digital transformation services",
      category: "Business"
    }
  ];

  const industryAwards = [
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      title: "Top Technology Consulting Firm",
      description: "Ranked among the top 10 technology consulting firms globally",
      year: "2024"
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "Customer Excellence Award",
      description: "Recognized for outstanding client satisfaction and service delivery",
      year: "2024"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Security Solutions Provider of the Year",
      description: "Awarded for innovative cybersecurity solutions and implementations",
      year: "2023"
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Global Impact Award",
      description: "Honored for positive impact across international markets",
      year: "2023"
    }
  ];

  const certifications = [
    {
      name: "ISO 27017:2015",
      description: "Information Security Management System",
      category: "Security"
    },
    {
      name: "ISO 27001:2022",
      description: "Quality Management System",
      category: "Quality"
    },
    {
      name: "CMMI Level 5",
      description: "Capability Maturity Model Integration",
      category: "Process"
    },
    {
      name: "SOC 2 Type II",
      description: "Service Organization Control 2",
      category: "Compliance"
    },
    {
      name: "AWS Partner",
      description: "Amazon Web Services Advanced Consulting Partner",
      category: "Cloud"
    },
    {
      name: "Microsoft Gold Partner",
      description: "Microsoft Gold Certified Partner",
      category: "Technology"
    }
  ];

  const mediaFeatures = [
    {
      publication: "TechCrunch",
      title: "CybaemTech: Pioneering the Future of Enterprise AI",
      date: "March 2024",
      type: "Feature Article"
    },
    {
      publication: "Forbes",
      title: "The Rise of Ethical AI in Business Transformation",
      date: "February 2024",
      type: "Industry Analysis"
    },
    {
      publication: "Harvard Business Review",
      title: "Digital Leadership in the Post-Pandemic World",
      date: "January 2024",
      type: "Case Study"
    },
    {
      publication: "Wired",
      title: "The Security-First Approach to Cloud Migration",
      date: "December 2023",
      type: "Expert Opinion"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Awards & Recognition</h1>
            <p className="text-xl mb-8 opacity-90">
              Celebrating excellence in technology, innovation, and client service across the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Awards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Recent Awards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentAwards.map((award, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{award.title}</CardTitle>
                          <Badge variant="secondary">{award.year}</Badge>
                        </div>
                        <CardDescription className="text-primary font-medium">
                          {award.organization}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{award.description}</p>
                    <Badge variant="outline">{award.category}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry Recognition */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Industry Recognition</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industryAwards.map((award, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                        {award.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{award.title}</CardTitle>
                        <CardDescription className="text-primary font-medium">
                          {award.year}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{award.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Certifications & Partnerships</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{cert.name}</CardTitle>
                    <CardDescription>{cert.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline">{cert.category}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Media Coverage</h2>
            <div className="space-y-6">
              {mediaFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <CardDescription className="text-primary font-medium">
                          {feature.publication}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{feature.type}</Badge>
                        <p className="text-sm text-muted-foreground mt-1">{feature.date}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Awards;