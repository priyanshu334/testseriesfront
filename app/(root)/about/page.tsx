'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const AboutPage = () => {
  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll('.parallax-element');
      scrollElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.05;
        const yPos = -window.scrollY * 2;
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-64 h-64 bg-blue-200/20 dark:bg-blue-700/10 rounded-full blur-3xl parallax-element" data-speed="0.03"></div>
        <div className="absolute top-80 right-20 w-80 h-80 bg-orange-200/30 dark:bg-orange-700/10 rounded-full blur-3xl parallax-element" data-speed="0.05"></div>
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-purple-200/20 dark:bg-purple-700/10 rounded-full blur-3xl parallax-element" data-speed="0.04"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24 relative z-10 space-y-16">
        {/* Hero Section */}
        <motion.section 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block mb-2">
            <Badge variant="outline" className="text-sm px-3 py-1 uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800">
              Est. 2018
            </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Samagra CS</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Empowering aspirants to achieve their dreams through structured, quality education for competitive exams.
          </p>
        </motion.section>

        <Separator className="max-w-md mx-auto opacity-50" />

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="overflow-hidden border-none shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-1/4 flex justify-center">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-6 flex items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="48" 
                      height="48" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-blue-600 dark:text-blue-400"
                    >
                      <path d="M20 20v-8a2 2 0 0 0-2-2h-1"></path>
                      <path d="M4 10V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2"></path>
                      <polyline points="8 16 12 12 16 16"></polyline>
                      <line x1="12" y1="12" x2="12" y2="21"></line>
                    </svg>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Mission</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    At <strong className="text-blue-600 dark:text-blue-400">Samagra CS</strong>, our mission is to provide comprehensive, accessible, and high-quality coaching
                    to students preparing for competitive exams like UPSC, State PSCs, SSC, Banking, and more. We believe in
                    fostering a learning environment that is inclusive, disciplined, and growth-oriented.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* What We Offer Section */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden border-none shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">What We Offer</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Expert-Led Classes", description: "Live and recorded sessions by industry experts", icon: "video" },
                  { title: "Structured Learning", description: "Organized syllabus with dedicated doubt-clearing", icon: "book-open" },
                  { title: "Performance Analysis", description: "Regular tests and comprehensive feedback", icon: "bar-chart-2" },
                  { title: "Curated Resources", description: "Exam-focused study materials and guides", icon: "file-text" },
                  { title: "Support Community", description: "Connect with peers and mentors", icon: "users" }
                ].map((offer, index) => (
                  <motion.div 
                    key={index} 
                    variants={item}
                    className="flex gap-4 items-start bg-blue-50/50 dark:bg-blue-900/20 p-4 rounded-xl"
                  >
                    <div className="p-3 bg-blue-100 dark:bg-blue-800/40 rounded-lg">
                      {offer.icon === "video" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                          <polygon points="23 7 16 12 23 17 23 7"></polygon>
                          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                        </svg>
                      )}
                      {offer.icon === "book-open" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                      )}
                      {offer.icon === "bar-chart-2" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                          <line x1="18" y1="20" x2="18" y2="10"></line>
                          <line x1="12" y1="20" x2="12" y2="4"></line>
                          <line x1="6" y1="20" x2="6" y2="14"></line>
                        </svg>
                      )}
                      {offer.icon === "file-text" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      )}
                      {offer.icon === "users" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{offer.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{offer.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 backdrop-blur-sm">
            <CardContent className="p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Why Choose Us?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Expert Faculty</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 pl-12">
                    Learn from experienced educators with deep subject expertise and proven track records in helping students succeed.
                  </p>
                </div>
                
                <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Student-Centric</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 pl-12">
                    We personalize learning paths and provide dedicated support for each student's unique journey and goals.
                  </p>
                </div>
                
                <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Continuous Evaluation</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 pl-12">
                    Regular mock tests with detailed performance analytics help identify strengths and areas for improvement.
                  </p>
                </div>
                
                <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                        <path d="M12 1v22"></path>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Affordable & Accessible</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 pl-12">
                    Quality education accessible to everyone with flexible learning options and reasonable pricing plans.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Join Us Section */}
        <motion.div 
          className="text-center pt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block relative">
            <Badge variant="outline" className="text-md px-8 py-3 rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">
              Let's build your future — together at Samagra CS.
            </Badge>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 animate-pulse"></div>
          </div>
          
          <div className="mt-10 flex justify-center gap-4">
            <a href="/contact" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-medium">
              Contact Us
            </a>
            <a href="/courses" className="px-6 py-3 bg-white hover:bg-gray-50 text-blue-600 border border-blue-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-medium">
              Explore Courses
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;