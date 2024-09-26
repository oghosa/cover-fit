import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CoverFit | Compare Health Insurance Plans in Nigeria',
  description: 'Compare health insurance plans from multiple HMOs across Nigeria. Find the best coverage for your needs with CoverFit.',
  keywords: 'health insurance, Nigeria, HMO, compare plans, medical coverage, top plans',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex flex-col min-h-screen">
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-gray-100 py-4 text-center text-gray-600">
            <div className="container mx-auto">
              © 2024 CoverFit. All rights reserved. | Contact: <a href="mailto:info@usecoverfit.com" className="text-[#008751] hover:underline">info@usecoverfit.com</a>
            </div>
          </footer>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}

// Add this catch-all route
export const dynamic = 'force-dynamic';
export const revalidate = 0;
