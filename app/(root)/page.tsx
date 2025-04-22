"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpenCheck, Flame, CheckCircle, TrendingUp, Brain, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface TestSeries {
  title: string;
  description: string;
  difficulty: string;
  icon: LucideIcon;
  color: string;
  students: string;
  features: string[];
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const testSeries: TestSeries[] = [
  {
    title: "JEE Mains 2025 Full Test Series",
    description: "Full syllabus mock tests with detailed analysis. Covers all topics and provides personalized feedback for improvement.",
    difficulty: "Advanced",
    icon: Brain,
    color: "bg-indigo-100 text-indigo-700",
    students: "12,450+",
    features: ["100+ Full Tests", "Topic Analysis", "Personalized Feedback"],
  },
  {
    title: "NEET Crash Course Series",
    description: "Revise and test key topics before NEET 2025. Focus on high-yield concepts and previous year patterns.",
    difficulty: "Intermediate",
    icon: TrendingUp,
    color: "bg-emerald-100 text-emerald-700",
    students: "8,320+",
    features: ["50+ Mock Tests", "Subject-wise Analysis", "Weak Area Focus"],
  },
  {
    title: "SSC CGL Tier-I Test Series",
    description: "Topic-wise and full mocks for SSC CGL. Comprehensive coverage of all sections with detailed solutions.",
    difficulty: "Beginner",
    icon: CheckCircle,
    color: "bg-amber-100 text-amber-700",
    students: "15,780+",
    features: ["75+ Practice Tests", "Section-wise Tests", "Performance Tracking"],
  },
];

const popularExams: string[] = [
  "JEE Main", "NEET", "UPSC", "SSC", "Banking", "GATE", "CAT", "CLAT"
];

// Simple counter animation hook
const useCounter = (end: number, duration: number = 2000): number => {
  const [count, setCount] = useState<number>(0);
  
  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number): void => {
      if (!startTime) startTime = timestamp;
      const progress: number = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(animate);
      }
    };
    
    window.requestAnimationFrame(animate);
  }, [end, duration]);
  
  return count;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center text-center"
  >
    <div className="bg-indigo-50 p-3 rounded-full mb-4">
      <Icon className="h-6 w-6 text-indigo-600" />
    </div>
    <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </motion.div>
);

export default function LandingPage() {
  const studentsCount: number = useCounter(100000);
  const successRate: number = useCounter(92);
  const testsCount: number = useCounter(5000);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 px-3 py-1 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors">
              Trusted by {studentsCount.toLocaleString()}+ Students
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-900 mb-6 leading-tight">
              Crack Your Exams with <span className="text-indigo-600">Confidence</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Personalized test series that adapt to your learning pace. Practice, analyze, and achieve your dream results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/Testseries">
              <Button className="text-white bg-indigo-600 hover:bg-indigo-700 px-8 py-6 rounded-xl text-lg font-medium">
                Find Your Test Series
              </Button>
              </Link>
             <Link href="/demotest">
             <Button variant="outline" className="border-indigo-300 text-indigo-700 hover:bg-indigo-50 px-8 py-6 rounded-xl text-lg font-medium">
                Free Demo Test
              </Button>
             </Link>
              
            </div>
          </motion.div>
          
          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 mb-16"
          >
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-xl text-center">
              <h3 className="text-4xl font-bold text-indigo-600 mb-2">{studentsCount.toLocaleString()}+</h3>
              <p className="text-gray-600">Active Students</p>
            </div>
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-xl text-center">
              <h3 className="text-4xl font-bold text-indigo-600 mb-2">{successRate}%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-xl text-center">
              <h3 className="text-4xl font-bold text-indigo-600 mb-2">{testsCount}+</h3>
              <p className="text-gray-600">Practice Tests</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Popular Exams */}
      <section className="py-12 px-6 bg-white bg-opacity-70">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">Popular Exam Preparations</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {popularExams.map((exam, index) => (
              <motion.div 
                key={exam}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Button variant="outline" className="rounded-full bg-white hover:bg-indigo-50 border-gray-200 text-gray-700 hover:text-indigo-600 transition-all">
                  {exam}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Test Series */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Test Series</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our most popular test series designed by top educators and exam experts
            </p>
          </div>
          
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {testSeries.map((test, index) => {
              const Icon = test.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <Card className="bg-white border-0 rounded-2xl shadow-lg h-full overflow-hidden">
                    <div className={`h-2 w-full ${test.color.split(" ")[0]}`}></div>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg ${test.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">{test.title}</h2>
                      </div>
                      <p className="text-gray-600 mb-6">{test.description}</p>
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="outline" className={`font-medium ${test.color}`}>
                          <Flame className="h-3 w-3 mr-1" />
                          {test.difficulty}
                        </Badge>
                        <Badge variant="outline" className="font-medium bg-gray-50 text-gray-600">
                          {test.students} Students
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        {test.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                        Start Now
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Test Series</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine technology with expert guidance to deliver the best preparation experience
            </p>
          </div>
          
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard 
              icon={Brain}
              title="AI-Powered Analysis"
              description="Get detailed insights into your performance with our AI-powered analytics"
            />
            <FeatureCard 
              icon={TrendingUp}
              title="Performance Tracking"
              description="Track your progress over time and identify areas for improvement"
            />
            <FeatureCard 
              icon={CheckCircle}
              title="Exam-Like Experience"
              description="Practice in conditions similar to actual exams to build confidence"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-6 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Preparation Journey?</h2>
            <p className="text-indigo-100 mb-8 text-lg">
              Join thousands of successful students who have achieved their goals with our test series
            </p>
            <Button className="bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-6 rounded-xl text-lg font-medium">
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}