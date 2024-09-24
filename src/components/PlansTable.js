import React from 'react';

export default function PlansTable({ plans }) {
  console.log("Rendering plans:", plans.map(plan => ({
    hmo_name: plan.hmo_name,
    plan_name_full: plan.plan_name_full,
    plan_type: plan.plan_type
  })));
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              HMO Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Plan Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Annual Cost (Naira)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Plan Link
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {plans.map((plan, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                {plan.hmo_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {plan.plan_name_full}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {plan.plan_annual_cost_naira}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <a 
                  href={plan.plan_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  View Plan
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right text-gray-600">
        Total results: {plans.length}
      </div>
    </div>
  );
}
