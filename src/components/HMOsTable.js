"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function HMOsTable({ hmos }) {
  const [selectedHMO, setSelectedHMO] = useState(null);

  if (!hmos || hmos.length === 0) {
    return <div className="text-center mt-4 text-gray-600">No HMOs available</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-[#008751] text-white">
          <tr>
            <th className="py-3 px-4 text-left font-bold">HMO NAME</th>
            <th className="py-3 px-4 text-left font-bold">CATEGORY</th>
            <th className="py-3 px-4 text-left font-bold">NUMBER OF PLANS</th>
            <th className="py-3 px-4 text-left font-bold">AVERAGE PLAN COST</th>
            <th className="py-3 px-4 text-left font-bold">MIN PLAN COST</th>
            <th className="py-3 px-4 text-left font-bold">MORE DETAILS</th>
          </tr>
        </thead>
        <tbody>
          {hmos.map((hmo) => (
            <tr key={hmo.hmo_id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4">
                <a href={hmo.hmo_website} target="_blank" rel="noopener noreferrer" className="text-[#008751] hover:text-[#006741] font-medium">
                  {hmo.hmo_name}
                </a>
              </td>
              <td className="py-3 px-4">{hmo.hmo_category}</td>
              <td className="py-3 px-4">{hmo.hmo_number_of_plans}</td>
              <td className="py-3 px-4">{hmo.hmo_average_plan_cost}</td>
              <td className="py-3 px-4">{hmo.hmo_min_plan_cost}</td>
              <td className="py-3 px-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => setSelectedHMO(hmo)}
                      className="text-[#008751] hover:text-[#006741] font-medium"
                    >
                      View Details
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{selectedHMO?.hmo_name}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <p><strong>Category:</strong> {selectedHMO?.hmo_category}</p>
                      <p><strong>Email:</strong> {selectedHMO?.hmo_email}</p>
                      <p><strong>Phone:</strong> {selectedHMO?.hmo_phone_number}</p>
                      <p><strong>Address:</strong> {selectedHMO?.hmo_address}</p>
                      <p><strong>Providers Link:</strong> <a href={selectedHMO?.hmo_providers_link} target="_blank" rel="noopener noreferrer" className="text-[#008751] hover:text-[#006741] font-medium">View Providers</a></p>
                      <p><strong>Provider Count Estimate:</strong> {selectedHMO?.hmo_provider_count_estimate}</p>
                      <p><strong>Last Updated:</strong> {selectedHMO?.hmo_last_updated}</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          ))}   
        </tbody>
      </table>
    </div>
  );
}