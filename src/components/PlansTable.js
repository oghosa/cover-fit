import React from 'react';
import { Button } from "@/components/ui/button";

export default function PlansTable({ plans }) {
  console.log("PlansTable: Received plans:", JSON.stringify(plans, null, 2));

  if (!plans || plans.length === 0) {
    return <div className="text-center mt-4 text-gray-600">No plans available</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-[#008751] text-white">
          <tr>
            <th className="py-3 px-4 text-left font-bold">HMO NAME</th>
            <th className="py-3 px-4 text-left font-bold">PLAN TYPE</th>
            <th className="py-3 px-4 text-left font-bold">PLAN NAME</th>
            <th className="py-3 px-4 text-left font-bold">ANNUAL COST (NAIRA)</th>
            <th className="py-3 px-4 text-left font-bold">PLAN LINK</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-3 px-4">{plan.hmo_name}</td>
              <td className="py-3 px-4">{plan.plan_type}</td>
              <td className="py-3 px-4">{plan.plan_name}</td>
              <td className="py-3 px-4">{plan.plan_annual_cost_naira}</td>
              <td className="py-3 px-4">
                <a 
                  href={plan.plan_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#008751] hover:text-[#006741] font-medium"
                >
                  View Plan
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
