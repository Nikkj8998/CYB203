import React, { useState, useEffect } from 'react';
import { ArrowRight, Search, Book, FileText, Video, Lightbulb, TrendingUp, Zap } from 'lucide-react';

interface ResourcesHeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
}

export default function ResourcesHero({ searchTerm, setSearchTerm, selectedType, setSelectedType }: ResourcesHeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeWord, setActiveWord] = useState(0);

  const floatingWords = [
    { text: 'INSIGHTS', color: 'text-emerald-400', delay: 0 },
    { text: 'CASE STUDIES', color: 'text-green-400', delay: 0.2 },
    { text: 'WHITE PAPERS', color: 'text-cyan-400', delay: 0.4 },
    { text: 'E-PAPERS', color: 'text-pink-500', delay: 0.6 },
    { text: 'BLOGS', color: 'text-orange-400', delay: 0.8 },
    { text: 'VIDEOS', color: 'text-purple-400', delay: 1.0 },
    { text: 'EMPOWER', color: 'text-fuchsia-400', delay: 1.2 },
    { text: 'GROWTH', color: 'text-blue-400', delay: 1.4 },
    { text: 'KNOWLEDGE HUB', color: 'text-indigo-400', delay: 1.6 },
    { text: 'TRUSTED', color: 'text-blue-300', delay: 1.8 },
    { text: 'COMPREHENSIVE', color: 'text-sky-400', delay: 2.0 },
    { text: 'WEEKLY', color: 'text-cyan-300', delay: 2.2 }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % floatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"
          style={{
            top: '10%',
            left: '20%',
            animation: 'float 8s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
          style={{
            top: '60%',
            right: '10%',
            animation: 'float 10s ease-in-out infinite reverse'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl"
          style={{
            bottom: '20%',
            left: '50%',
            animation: 'float 12s ease-in-out infinite'
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Floating words background */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingWords.map((word, i) => (
          <div
            key={i}
            className={`absolute text-xs md:text-sm font-bold ${word.color} opacity-20 transition-all duration-1000`}
            style={{
              left: `${(i * 23) % 90}%`,
              top: `${(i * 17) % 80}%`,
              transform: `translateY(${Math.sin(Date.now() / 1000 + word.delay * 1000) * 20}px)`,
              animation: `fadeSlide 3s ease-in-out infinite ${word.delay}s`
            }}
          >
            {word.text}
          </div>
        ))}
      </div>

      {/* Parallax mouse effect */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`
        }}
      >
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 pt-12 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header section */}
          <div className="text-center mb-16 space-y-8">
            <div className="inline-block">
              <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold mb-4 animate-pulse">
                <Zap className="w-4 h-4" />
                <span>COMPREHENSIVE KNOWLEDGE HUB</span>
              </div>
            </div>

            {/* Main heading with staggered animation */}
            <div className="space-y-4">
              <h1 className="text-white font-bold leading-tight pb-6">
                <span className="block text-5xl md:text-7xl mb-4 animate-fadeInUp">
                  Resources That
                </span>
                <span className="block text-6xl md:text-8xl bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-fadeInUp pb-2" style={{ animationDelay: '0.2s' }}>
                  Empower Growth
                </span>
              </h1>
              
              <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                Access cutting-edge insights, comprehensive case studies, and expert knowledge. 
                Your complete resource center for strategic success.
              </p>
            </div>

            {/* Search bar */}
            <div className="max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-hover:text-blue-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>

            {/* Filter tags */}
            <div className="flex flex-wrap justify-center gap-3 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
              {[
                { name: 'All', icon: Book },
                { name: 'Case Study', icon: FileText },
                { name: 'Blog', icon: Lightbulb },
                { name: 'ePaper', icon: FileText }
              ].map((filter, idx) => {
                const Icon = filter.icon;
                const isActive = selectedType === filter.name;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedType(filter.name)}
                    className={`group px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50 scale-105'
                        : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? '' : 'group-hover:rotate-12 transition-transform'}`} />
                    {filter.name}
                  </button>
                );
              })}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-8 animate-fadeInUp" style={{ animationDelay: '1.2s' }}>
              {[
                { icon: TrendingUp, text: 'Trusted by 100+ clients', value: '100+' },
                { icon: Zap, text: 'Updated weekly', value: 'Weekly' },
                { icon: Book, text: 'Resource categories', value: '6+' }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 text-slate-300 group cursor-pointer">
                    <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 group-hover:border-blue-500 group-hover:bg-slate-800 transition-all">
                      <Icon className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-left">
                      <div className="text-xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm">{stat.text}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes fadeSlide {
          0%, 100% { opacity: 0.1; transform: translateY(0); }
          50% { opacity: 0.3; transform: translateY(-10px); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
