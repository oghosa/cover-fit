"use client";

import { useEffect } from 'react';
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import TopPlans from '@/components/TopPlans';

export default function TopPlansPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.replace("/sign-in");
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || !userId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col">
        <TopPlans />
    </div>
  );
}