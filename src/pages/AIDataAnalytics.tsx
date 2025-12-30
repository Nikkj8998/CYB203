import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Brain, BarChart3, Zap, Shield, Globe, Cpu, Eye, Bot, Network, Wrench, Building } from "lucide-react";
import aiHeroImage from "@/assets/ai-data-analytics-hero.jpg";
import mlNetworkImage from "@/assets/machine-learning-network.jpg";
import dataVisualizationImage from "@/assets/data-visualization-dashboard.jpg";
import edgeComputingImage from "@/assets/edge-computing-iot.jpg";
import { Link, useLocation } from "react-router-dom";

const AIDataAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);
  const services = [
    {
      id: "machine-learning-ai-development",
      icon: Brain,
      title: "Machine Learning & AI Development",
      description: "Custom AI models, neural networks, and intelligent automation solutions",
      features: ["Deep Learning Models", "Natural Language Processing", "Computer Vision", "Predictive Analytics"]
    },
    {
      id: "business-intelligence-analytics",
      icon: BarChart3,
      title: "Business Intelligence & Analytics",
      description: "Transform raw data into actionable insights with advanced analytics platforms",
      features: ["Interactive Dashboards", "Real-time Reporting", "Data Mining", "Statistical Analysis"]
    },
    {
      id: "real-time-data-processing",
      icon: Zap,
      title: "Real-Time Data Processing",
      description: "Stream processing and instant analytics for immediate decision making",
      features: ["Stream Analytics", "Real-time Dashboards", "Event Processing", "IoT Data Streams"]
    },
    {
      id: "intelligent-automation",
      icon: Bot,
      title: "Intelligent Automation",
      description: "RPA with AI capabilities for smart process automation",
      features: ["Process Mining", "Intelligent Bots", "Workflow Automation", "Decision Trees"]
    },
    {
      id: "data-engineering-pipelines",
      icon: Network,
      title: "Data Engineering & Pipelines",
      description: "Robust data infrastructure for scalable analytics solutions",
      features: ["ETL/ELT Pipelines", "Data Lakes", "Cloud Data Platforms", "Data Governance"]
    },
    {
      id: "computer-vision-nlp",
      icon: Eye,
      title: "Computer Vision & NLP",
      description: "Advanced AI for image recognition and language understanding",
      features: ["Image Recognition", "Text Analytics", "Speech Processing", "Document AI"]
    }
  ];

  const trends = [
    {
      icon: Brain,
      title: "Smarter and More Scalable AI",
      description: "Deeper AI/ML Integration",
      details: "Advanced machine learning models are becoming embedded within analytics platforms, enabling not just data insight, but also automation of complex data processing and routine analysis."
    },
    {
      icon: BarChart3,
      title: "Predictive and Prescriptive Analytics",
      description: "Forecasting and Recommendations",
      details: "Organizations are leveraging advanced analytics to forecast future trends, recommend optimal strategies, and personalize user experiences."
    },
    {
      icon: Zap,
      title: "Real-Time Data Processing and Analytics",
      description: "Immediate Insights",
      details: "With the proliferation of IoT and interconnected devices, real-time analytics is critical. Streaming data platforms and cloud-based analytics deliver instant insights for rapid response."
    },
    {
      icon: Eye,
      title: "Enhanced Data Visualization Capabilities",
      description: "AI-Driven Visuals",
      details: "Visualization tools use AI and ML to highlight the most relevant trends and insights, turning complex datasets into accessible visuals for better decision-making."
    },
    {
      icon: Shield,
      title: "Data Privacy and Security",
      description: "Stricter Regulations",
      details: "Data governance is paramount as regulations evolve. Companies must implement advanced security protocols to safeguard sensitive information and maintain trust."
    },
    {
      icon: Cpu,
      title: "Edge Computing and Edge AI",
      description: "Processing at Source",
      details: "Edge computing allows data to be analyzed closer to where it is generated, decreasing latency and bandwidth needs—vital for manufacturing, healthcare, transportation, and smart cities."
    },
    {
      icon: Globe,
      title: "AI Democratization",
      description: "Low-Code/No-Code Solutions",
      details: "Non-technical users can now build and deploy AI models using intuitive interfaces, empowering a broader range of employees to extract insights from data."
    },
    {
      icon: Wrench,
      title: "Explainable AI (XAI) and Responsible AI",
      description: "Transparent AI",
      details: "As AI becomes more integral, explaining how it arrives at decisions, especially in sectors like finance and healthcare, is crucial to build trust and accountability."
    },
    {
      icon: Bot,
      title: "Integration of Generative AI Apps",
      description: "Content Generation",
      details: "Generative AI technologies are speeding up content creation, document summarization, language translation, and more within enterprise applications."
    },
    {
      icon: Network,
      title: "Advanced Multimodal AI",
      description: "Beyond Text",
      details: "New models process text, images, audio, video, sensor data, and more—expanding the range of tasks AI can perform while requiring less human involvement."
    },
    {
      icon: Building,
      title: "AI-Driven Robotics and Automation",
      description: "Collaborative Robots",
      details: "AI-powered cobots enhance productivity, support human workers, and improve workplace safety."
    },
    {
      icon: Globe,
      title: "Open Source and Composable Data Platforms",
      description: "Flexibility and Control",
      details: "Open platforms let organizations combine best-in-breed solutions, reduce vendor lock-in, and optimize infrastructure for both analytics and AI workloads."
    }
  ];

  return (
    <div className="min-h-screen bg-black">

      <Header />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animate-delay-200"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animate-delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-primary/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 border border-blue-500/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated AI Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-black">
            {/* Floating AI particles */}
            <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-70"></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-60 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-80" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-blue-300 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute bottom-60 left-1/2 w-1 h-1 bg-purple-300 rounded-full animate-pulse opacity-70" style={{ animationDelay: '2s' }}></div>
            
            {/* Neural network lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1920 1080">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path d="M100,200 Q400,100 800,300 T1500,250" stroke="url(#lineGradient)" strokeWidth="2" fill="none" className="animate-pulse" />
              <path d="M200,600 Q600,400 1000,700 T1800,600" stroke="url(#lineGradient)" strokeWidth="1.5" fill="none" className="animate-pulse" style={{ animationDelay: '1s' }} />
              <path d="M0,400 Q300,200 700,500 T1400,400" stroke="url(#lineGradient)" strokeWidth="1" fill="none" className="animate-pulse" style={{ animationDelay: '2s' }} />
            </svg>
            
            {/* Matrix-like code rain effect */}
            <div className="absolute inset-0 opacity-50">
              <div className="absolute top-0 left-20 text-green-400 text-xs font-mono animate-pulse">01001001</div>
              <div className="absolute top-20 left-40 text-blue-400 text-xs font-mono animate-pulse" style={{ animationDelay: '0.5s' }}>AI_NEURAL</div>
              <div className="absolute top-40 left-60 text-purple-400 text-xs font-mono animate-pulse" style={{ animationDelay: '1s' }}>DEEP_LEARN</div>
              <div className="absolute top-60 left-80 text-cyan-400 text-xs font-mono animate-pulse" style={{ animationDelay: '1.5s' }}>ML_PROCESS</div>
              <div className="absolute top-80 left-100 text-green-400 text-xs font-mono animate-pulse" style={{ animationDelay: '2s' }}>DATA_FLOW</div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/80"></div>
        </div>
        
        <div className="relative container mx-auto px-6 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
              AI & Data
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Analytics</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Unlock the power of artificial intelligence and advanced analytics to transform your business operations, 
              drive innovation, and make data-driven decisions with confidence
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg hover-lift">
                  Start Your AI Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our AI & Analytics Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive AI and data analytics solutions designed to accelerate your digital marketing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card id={service.id} key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover-lift card-interactive animate-slide-up scroll-mt-24" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-gray-400 flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Cutting-Edge Technologies
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Leveraging the latest in AI and data science to deliver transformative solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover-lift animate-slide-up">
              <CardContent className="p-6">
                <img 
                  src={mlNetworkImage} 
                  alt="Machine Learning Network" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-white mb-2">Machine Learning</h3>
                <p className="text-gray-300">Advanced ML algorithms and neural networks for intelligent automation</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover-lift animate-slide-up animate-delay-200">
              <CardContent className="p-6">
                <img 
                  src={dataVisualizationImage} 
                  alt="Data Visualization" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-white mb-2">Data Visualization</h3>
                <p className="text-gray-300">Interactive dashboards and real-time analytics for better insights</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover-lift animate-slide-up animate-delay-400">
              <CardContent className="p-6">
                <img 
                  src={edgeComputingImage} 
                  alt="Edge Computing" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-white mb-2">Edge AI</h3>
                <p className="text-gray-300">Real-time processing at the edge for instant decision making</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Trends 2025 Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Top AI and Data Analytics Trends Expected in 2025
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Artificial Intelligence (AI) and data analytics are now powerful drivers of digital transformation across industries. 
              As we move into 2025, the field is seeing groundbreaking advancements that empower organizations to innovate, 
              become more resilient, and achieve better business outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trends.map((trend, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover-lift card-interactive animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <trend.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-white text-lg">{trend.title}</CardTitle>
                  <CardDescription className="text-blue-400 font-medium">
                    {trend.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {trend.details}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center animate-fade-in">
            <Card className="bg-gradient-to-r from-blue to-purple border-blue-500/30 backdrop-blur-sm max-w-4xl mx-auto card-interactive animate-slide-up" style={{ animationDelay: `200ms` }}>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Embracing the Future</h3>
                <p className="text-gray-300 leading-relaxed">
                  2025 will redefine how data is collected, processed, visualized, and acted upon. By staying ahead of these trends, 
                  organizations can harness the full potential of AI and data analytics to drive innovation, improve efficiency, and achieve growth.
                </p>
                <Link to="/contact">
                  <Button className="mt-6 bg-primary hover:bg-primary/90 text-white hover-glow">
                    Partner with Us for AI Innovation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Let our AI experts help you unlock the full potential of your data and drive intelligent automation across your organization
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg hover-lift">
                  Schedule AI Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              {/* <Button variant="outline" size="lg" className="border-white text-black hover:bg-blue hover:text-blue px-8 py-4 text-lg hover-lift">
                Download AI Strategy Guide
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIDataAnalytics;