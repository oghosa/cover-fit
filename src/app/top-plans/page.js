"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TopPlansPage() {
  const [topPlans, setTopPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.replace("/sign-in");
    } else if (isLoaded && userId) {
      fetchTopPlans();
    }
  }, [isLoaded, userId, router]);

  const fetchTopPlans = async () => {
    try {
      const response = await fetch('/api/top-plans');
      if (!response.ok) {
        throw new Error('Failed to fetch top plans');
      }
      const data = await response.json();
      setTopPlans(data.plans);
    } catch (error) {
      console.error('Error fetching top plans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded || (isLoaded && !userId)) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>Loading top plans...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col">
      <header className="bg-[#008751] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-gray-200">CoverFit</Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#008751]">Our Top 5 HMO Plans</h1>
          <Award size={32} className="text-[#008751]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topPlans.map((plan, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gray-100">
                <CardTitle className="text-[#008751]">{plan.plan_name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-lg font-semibold mb-4 text-gray-800">{plan.hmo_name}</p>
                <p className="text-sm text-gray-600 mb-2">Type: {plan.plan_type}</p>
                <p className="text-xl font-bold mb-4 text-[#008751]">₦{plan.plan_annual_cost_naira.toLocaleString()}</p>
                <Button className="w-full bg-[#008751] text-white hover:bg-[#006741]" asChild>
                  <a href={plan.plan_link} target="_blank" rel="noopener noreferrer">
                    View Plan Details
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}