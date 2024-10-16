"use client";

import { useState } from 'react';
import { HmoDetailsPopup } from './hmo-details-popup';
import {
  Dialog,
  DialogContent,
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
                  <DialogContent className="p-0 border-none max-w-2xl bg-transparent shadow-none" closeButton={false}>
                    <HmoDetailsPopup
                      hmo={{
                        name: hmo.hmo_name,
                        category: hmo.hmo_category,
                        email: hmo.hmo_email,
                        phone: hmo.hmo_phone_number,
                        address: hmo.hmo_address,
                        providersLink: hmo.hmo_providers_link,
                        providerCount: hmo.hmo_provider_count_estimate,
                        lastUpdated: hmo.hmo_last_updated
                      }}
                    />
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
