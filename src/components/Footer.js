import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <p>&copy; 2024 CoverFit. All rights reserved.</p>
        <div className="flex items-center space-x-4">
          <a href="mailto:info@usecoverfit.com" className="hover:text-[#008751] transition-colors duration-300">
            info@usecoverfit.com
          </a>
          <a 
            href="https://x.com/usecoverfit" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#008751] transition-colors duration-300"
          >
            Follow us on X
          </a>
        </div>
      </div>
    </footer>
  );
}