"use client";

import Link from 'next/link';
import { UserButton } from "@clerk/nextjs";
import { useEffect } from 'react';

export default function HomeContent() {
  useEffect(() => {
    // Function to remove sign-in and sign-up buttons
    const removeAuthButtons = () => {
      const signInButton = document.querySelector('a[href="/sign-in"]');
      const signUpButton = document.querySelector('a[href="/sign-up"]');
      if (signInButton) signInButton.remove();
      if (signUpButton) signUpButton.remove();
    };

    // Call the function immediately
    removeAuthButtons();

    // Set up a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver(removeAuthButtons);
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup function to disconnect the observer when the component unmounts
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col">
      <header className="bg-[#008751] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-gray-200">CoverFit</Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-[#008751] mb-4">
          Compare Health Insurance Plans Across Nigeria
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          Easily compare multiple HMOs, view top-rated plans, and make informed decisions about your health insurance coverage.
        </p>

        <Link href="/compare-plans" className="bg-[#008751] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#006741] transition-colors">
          Compare Plans
        </Link>
      </main>

    </div>
  );
}