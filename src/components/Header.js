"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { UserButton, useAuth } from "@clerk/nextjs";
import { ChevronDown } from 'lucide-react';

export default function Header() {
  const { isLoaded, userId, user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#008751] text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold hover:text-gray-200">CoverFit</Link>
      <div className="relative" ref={dropdownRef}>
        {isLoaded && userId ? (
          <div className="flex items-center">
            <span className="mr-2">{user?.firstName || user?.username || 'User'}</span>
            <UserButton />
            <button onClick={toggleDropdown} className="ml-2">
              <ChevronDown size={24} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10 top-full">
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-200">Dashboard</Link>
              </div>
            )}
          </div>
        ) : (
          <Link href="/sign-in" className="bg-white text-[#008751] px-4 py-2 rounded-lg hover:bg-gray-200">Sign In</Link>
        )}
      </div>
    </header>
  );
}