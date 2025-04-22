"use client"
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useRouter } from "next/navigation";

type TestGiven = {
  testId: {
    _id: string;
    title: string;
  };
  score: number;
  totalMarks: number;
  timeTaken: string;
};

type SeriesJoined = {
  seriesId: {
    _id: string;
    name: string;
  };
};

type User = {
  _id: string;
  fullName: string;
  phone: string;
  goal?: string;
  referralCode?: string;
  totalTestsGiven: number;
  totalSeriesJoined: number;
  totalMarksObtained: number;
  testsGiven: TestGiven[];
  seriesJoined: SeriesJoined[];
};

export default function UserProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!token || !userId) {
          router.push("/login");
          return;
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  // Ensure user is not null before rendering the profile page
  if (!user) {
    return <div className="p-6">User data not found. Please try again later.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Welcome, {user?.fullName}</h2>
            <Button onClick={() => router.push("/edit-profile")}>Edit Profile</Button>
          </div>
          <p className="text-muted-foreground">Phone: {user.phone}</p>
          <p>Goal: {user.goal || "N/A"}</p>
          <p>Referral Code: {user.referralCode || "N/A"}</p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Card className="bg-muted">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Total Tests Given</p>
                <h3 className="text-lg font-semibold">{user.totalTestsGiven}</h3>
              </CardContent>
            </Card>
            <Card className="bg-muted">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Total Series Joined</p>
                <h3 className="text-lg font-semibold">{user.totalSeriesJoined}</h3>
              </CardContent>
            </Card>
            <Card className="bg-muted col-span-2">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Total Marks Obtained</p>
                <h3 className="text-lg font-semibold">{user.totalMarksObtained}</h3>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-semibold mb-2">Tests Given</h3>
        <div className="space-y-2">
          {user.testsGiven.map((test) => (
            <Card key={test.testId._id}>
              <CardContent className="p-4">
                <h4 className="font-bold">{test.testId.title}</h4>
                <p>Score: {test.score} / {test.totalMarks}</p>
                <p>Time Taken: {test.timeTaken}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Series Joined</h3>
        <ul className="list-disc ml-6 space-y-1">
          {user.seriesJoined.map((series) => (
            <li key={series.seriesId._id}>{series.seriesId.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
