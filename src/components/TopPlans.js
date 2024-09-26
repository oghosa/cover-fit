import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Award } from 'lucide-react';

export default function TopPlans() {
  const [topPlans, setTopPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopPlans();
  }, []);

  const fetchTopPlans = async () => {
    try {
      const response = await fetch('/api/top-plans');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTopPlans(data.plans);
    } catch (error) {
      console.error('Error fetching top plans:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading top plans...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (topPlans.length === 0) {
    return <div>No top plans available.</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#008751]">Our Top 5 HMO Plans</h1>
        <Award size={32} className="text-[#008751]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topPlans.map((plan, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="bg-gray-100 p-4">
              <h2 className="text-xl font-bold text-gray-800">{plan.plan_name}</h2>
            </div>
            <div className="p-6">
              <p className="text-lg mb-2 text-gray-700">{plan.hmo_name}</p>
              <p className="text-sm text-gray-600 mb-2">Type: {plan.plan_type}</p>
              <p className="text-2xl font-bold mb-4 text-[#008751]">
                ₦{plan.plan_annual_cost_naira}
              </p>
              <Button 
                className="w-full bg-[#008751] text-white hover:bg-[#006741] transition-colors duration-300" 
                onClick={() => window.open(plan.plan_link, '_blank')}
              >
                View Plan Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}