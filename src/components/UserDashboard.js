import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Award, FileSearch, ChevronRight } from 'lucide-react';

export default function UserDashboard() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-[#008751] mb-8">Welcome</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-[#008751] border-2 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[#008751] text-xl font-bold">Compare HMOs</CardTitle>
            <BarChart2 size={24} className="text-[#008751]" />
          </CardHeader>
          <CardContent className="flex flex-col flex-grow">
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              Compare different Health Maintenance Organizations
            </p>
            <Link href="/wip" passHref>
              <Button className="w-full bg-[#008751] text-white hover:bg-[#006741] mt-auto">
                Go to Comparison
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="bg-white border-[#008751] border-2 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[#008751] text-xl font-bold">View Our Top HMO Plans</CardTitle>
            <Award size={24} className="text-[#008751]" />
          </CardHeader>
          <CardContent className="flex flex-col flex-grow">
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              See CoverFit's top 5 HMO plans
            </p>
            <Link href="/top-plans" passHref>
              <Button className="w-full bg-[#008751] text-white hover:bg-[#006741] mt-auto">
                View Top Plans
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="bg-white border-[#008751] border-2 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[#008751] text-xl font-bold">Compare Plans</CardTitle>
            <FileSearch size={24} className="text-[#008751]" />
          </CardHeader>
          <CardContent className="flex flex-col flex-grow">
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              Compare different health insurance plans
            </p>
            <Link href="/compare-plans" passHref>
              <Button className="w-full bg-[#008751] text-white hover:bg-[#006741] mt-auto">
                Start Comparison
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}