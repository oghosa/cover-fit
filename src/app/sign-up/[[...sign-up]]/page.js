"use client";

import { SignUp, useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && userId) {
      router.replace("/dashboard");
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (userId) {
    return <div>Redirecting to dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col items-center justify-center">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" afterSignUpUrl="/dashboard" />
    </div>
  );
}
