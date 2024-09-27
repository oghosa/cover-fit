import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import Footer from '@/components/Footer';
import Script from 'next/script';

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
        <head>
          <Script
            src="https://sak.userreport.com/coverfit/launcher.js"
            strategy="afterInteractive"
            id="userreport-launcher-script"
          />
        </head>
        <body className="flex flex-col min-h-screen">
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}

// Add this catch-all route
export const dynamic = 'force-dynamic';
export const revalidate = 0;
