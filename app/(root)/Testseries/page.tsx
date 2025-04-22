"use client"

import { useEffect, useState, ChangeEvent, MouseEvent } from "react";
import axios, { AxiosError } from "axios";
import { Search, CalendarIcon, AlertCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TestType {
  _id: string;
  title: string;
  // Add other test properties as needed
}

interface UserType {
  _id: string;
  name: string;
  // Add other user properties as needed
}

interface SeriesType {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  startDate: string;
  endDate: string;
  tests: TestType[];
  createdBy: UserType;
}

type TabType = "ongoing" | "upcoming" | "completed";

type CategorizedSeriesType = {
  [key in TabType]: SeriesType[];
};

export default function SeriesPage() {
  const [series, setSeries] = useState<SeriesType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<TabType>("ongoing");
  
  useEffect(() => {
    const fetchSeries = async (): Promise<void> => {
      setLoading(true);
      try {
        const res = await axios.get<SeriesType[]>("https://backend.nurdcells.com/api/series", {
          params: {
            populate: "tests,createdBy" // Ensure we populate the related fields
          }
        });
        setSeries(res.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching series:", error);
        const axiosError = error as AxiosError;
        setError(`Failed to load test series: ${axiosError.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchSeries();
  }, []);

  const today = new Date();
  
  const filteredSeries = series.filter((s: SeriesType) => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.createdBy.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categorized: CategorizedSeriesType = {
    ongoing: filteredSeries.filter((s: SeriesType) => new Date(s.startDate) <= today && new Date(s.endDate) >= today),
    upcoming: filteredSeries.filter((s: SeriesType) => new Date(s.startDate) > today),
    completed: filteredSeries.filter((s: SeriesType) => new Date(s.endDate) < today),
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getTimeLeft = (endDate: string): string => {
    const end = new Date(endDate);
    const diff = end.getTime() - today.getTime();
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''} left`;
    } else {
      return "Ending today";
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (value: string): void => {
    setActiveTab(value as TabType);
  };

  const handleEnrollClick = async (seriesId: string, e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    try {
      // Here you would typically call your enrollment API
      // For example:
      // await axios.post(`/api/series/${seriesId}/enroll`, { userId });
      console.log(`Enrolling in series: ${seriesId}`);
      // Show success message or redirect
    } catch (error) {
      console.error("Error enrolling in series:", error);
      setError("Failed to enroll in series. Please try again.");
    }
  };

  const LoadingSkeleton = () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i: number) => (
        <Card key={i} className="rounded-2xl shadow-md overflow-hidden">
          <Skeleton className="w-full h-48" />
          <CardContent className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <AlertCircle className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">No test series found</h3>
      <p className="text-gray-500">
        {searchQuery ? "Try adjusting your search query" : "There are no test series in this category yet"}
      </p>
    </div>
  );

  const renderSeriesCards = (data: SeriesType[]) => {
    if (data.length === 0) {
      return <EmptyState />;
    }
    
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((s: SeriesType) => (
          <Card key={s._id} className="rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={s.image || "/api/placeholder/400/240"} 
                alt={s.title} 
                className="w-full h-48 object-cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement>): void => {
                  e.currentTarget.src = "/api/placeholder/400/240";
                }}
              />
              {activeTab === "ongoing" && (
                <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                  {getTimeLeft(s.endDate)}
                </Badge>
              )}
              <Badge className="absolute bottom-3 left-3 bg-blue-500 text-white">
                {s.tests.length} {s.tests.length === 1 ? 'Test' : 'Tests'}
              </Badge>
            </div>
            <CardContent className="p-5">
              <h2 className="text-xl font-semibold mb-2 line-clamp-1">{s.title}</h2>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{s.description}</p>
              <div className="flex justify-between items-center mb-3">
                <p className="text-lg font-bold text-green-600">₹{s.price}</p>
                {s.price === 0 && <Badge className="bg-green-100 text-green-800">Free</Badge>}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center text-xs text-gray-500">
                  <CalendarIcon className="h-3 w-3" />
                  <span>
                    {formatDate(s.startDate)} - {formatDate(s.endDate)}
                  </span>
                </div>
                <span className="text-xs text-gray-500">By {s.createdBy.name}</span>
              </div>
            </CardContent>
            <CardFooter className="px-5 pt-0 pb-5">
              <Button 
                className="w-full"
                onClick={(e: MouseEvent<HTMLButtonElement>) => handleEnrollClick(s._id, e)}
              >
                {activeTab === "ongoing" ? "Continue Series" : 
                 activeTab === "upcoming" ? "Enroll Now" : "View Results"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Test Series</h1>
          <p className="text-gray-500">Prepare effectively with our comprehensive test series</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search test series..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="ongoing" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="ongoing">
            Ongoing
            {categorized.ongoing.length > 0 && (
              <Badge className="ml-2 bg-blue-100 text-blue-800">{categorized.ongoing.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            Upcoming
            {categorized.upcoming.length > 0 && (
              <Badge className="ml-2 bg-purple-100 text-purple-800">{categorized.upcoming.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
            {categorized.completed.length > 0 && (
              <Badge className="ml-2 bg-gray-100 text-gray-800">{categorized.completed.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <TabsContent value="ongoing">
              {renderSeriesCards(categorized.ongoing)}
            </TabsContent>
            
            <TabsContent value="upcoming">
              {renderSeriesCards(categorized.upcoming)}
            </TabsContent>
            
            <TabsContent value="completed">
              {renderSeriesCards(categorized.completed)}
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}