'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Question {
  _id: string;
  questionText: string;
  options?: string[];
  correctAnswer?: string;
}

interface Series {
  _id: string;
  name: string;
}

interface Test {
  _id: string;
  title: string;
  description: string;
  instructions: string[];
  questions: Question[];
  isExample: boolean;
  price: number;
  series: Series;
  duration?: number; // in minutes
  passingScore?: number;
}

const DemoTestsPage = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDemoTests = async () => {
      try {
        // Option 1: Fetch all tests and filter client-side
        // const res = await axios.get<Test[]>('https://backend.nurdcells.com/api/tests');
        // const exampleTests = res.data.filter(test => test.isExample);
        
        // Option 2: Fetch only demo tests from the backend
        const res = await axios.get<Test[]>('https://backend.nurdcells.com/api/tests/demo', {
          params: {
            populate: 'questions,series' // Ensure related data is populated
          }
        });
        
        setTests(res.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch demo tests:', err);
        setError('Failed to load demo tests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDemoTests();
  }, []);

  const handleStartTest = (testId: string) => {
    // Implement navigation to test page
    console.log(`Starting demo test: ${testId}`);
    // Example: router.push(`/demo-tests/${testId}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">🎯 Demo Tests</h1>
        <p className="text-center text-gray-600 mb-8">
          Try our free demo tests to experience our platform before purchasing full tests.
        </p>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="space-y-4">
                <Skeleton className="h-40 w-full rounded-xl" />
                <CardContent className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : tests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No demo tests available at the moment.</p>
            <p className="text-gray-500 mt-2">Please check back later or explore our paid tests.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tests.map((test) => (
              <Card key={test._id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
                <img
                  src={`https://source.unsplash.com/random/400x200?exam,test,education&sig=${test._id}`}
                  alt={test.title}
                  className="w-full h-40 object-cover rounded-t-xl"
                />
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-xl font-semibold">{test.title}</CardTitle>
                  {test.series && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                      {test.series.name}
                    </span>
                  )}
                  <CardDescription className="line-clamp-2 text-sm text-gray-600 mt-2">
                    {test.description}
                  </CardDescription>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium mr-2">Questions:</span>
                      <span>{test.questions.length}</span>
                    </div>
                    {test.duration && (
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium mr-2">Duration:</span>
                        <span>{test.duration} mins</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <div className="p-4 pt-0">
                  <Button 
                    className="w-full"
                    onClick={() => handleStartTest(test._id)}
                  >
                    Start Demo Test
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoTestsPage;