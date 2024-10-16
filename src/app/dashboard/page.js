"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserDashboard from '@/components/UserDashboard';
import Link from 'next/link';

export default function DashboardPage() {
  const { isLoaded, userId, user } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    if (isLoaded && !userId) {
      router.replace("/sign-in");
    } else if (isLoaded && user) {
      setUserName(user.firstName || user.username || 'User');
    }
  }, [isLoaded, userId, user, router]);

  if (!isLoaded || !userId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col">
      <UserDashboard />
    </div>
  );
}