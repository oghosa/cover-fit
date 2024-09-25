"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ComparePlans } from '@/components/compare-plans';

export default function ComparePlansPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.replace("/sign-in");
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!userId) {
    return <div>Redirecting to sign in...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col">
      <header className="bg-[#008751] text-white p-4 flex justify-between items-center">
        <span className="text-2xl font-bold">CoverFit</span>
        <UserButton afterSignOutUrl="/" />
      </header>
      <main className="flex-grow">
        <ComparePlans />
      </main>
    </div>
  );
}
