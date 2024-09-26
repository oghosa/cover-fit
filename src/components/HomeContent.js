"use client";

import Link from 'next/link';
import { UserButton, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function HomeContent() {
  const { isLoaded, userId, isSignedIn } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      setIsAuthenticated(!!userId);
      if (userId) {
        router.push('/');
      }
    }
  }, [isLoaded, userId, isSignedIn, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-[#008751] mb-4">
          Compare Health Insurance Plans Across Nigeria
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          Easily compare multiple HMOs, view top-rated plans, and make informed decisions about your health insurance coverage.
        </p>
        <div className="flex space-x-4">
          <Link href="/dashboard" className="bg-[#008751] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#006741] transition-colors">
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
}