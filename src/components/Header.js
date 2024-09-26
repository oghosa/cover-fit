import { useState } from 'react';
import Link from 'next/link';
import { UserButton, useAuth } from "@clerk/nextjs";
import { ChevronDown } from 'lucide-react';

export default function Header() {
  const { isLoaded, userId } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isLoaded) {
    return null;
  }

  return (
    <header className="bg-[#008751] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold hover:text-gray-200 mr-4">CoverFit</Link>
          {userId && (
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-white hover:text-gray-200"
              >
                Menu <ChevronDown className="ml-1" size={20} />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Dashboard
                  </Link>
                  <div className="px-4 py-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {!userId && (
          <div>
            <Link href="/sign-in" className="text-white hover:text-gray-200 mr-4">Sign In</Link>
            <Link href="/sign-up" className="bg-white text-[#008751] px-4 py-2 rounded-lg hover:bg-opacity-90">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
}