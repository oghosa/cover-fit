import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function UserDashboard({ userName }) {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-[#008751] mb-8">Welcome, {userName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/compare-plans" passHref>
          <Button className="w-full h-32 text-xl bg-[#008751] hover:bg-[#006741]">
            Compare Plans
          </Button>
        </Link>
        <Link href="/top-plans" passHref>
          <Button className="w-full h-32 text-xl bg-[#008751] hover:bg-[#006741]">
            View Top HMO Plans
          </Button>
        </Link>
        <Link href="#" passHref>
          <Button className="w-full h-32 text-xl bg-[#008751] hover:bg-[#006741]">
            Compare HMOs
          </Button>
        </Link>
      </div>
    </div>
  );
}