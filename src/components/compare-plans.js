'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FileSearch, UserCircle } from 'lucide-react'

const hmoOptions = [
  "A&M Healthcare Trust Limited",
  "Aiico-Multishield HMO",
  "Anchor HMO International Company Limited",
  "Ashmed Integrated Health Services",
  "Avon Healthcare Limited"
]

const priceRangeOptions = [
  "20 - 50k",
  ">100 - 500k",
  ">1M",
  ">50 - 100k",
  ">500k - 1M",
  "REQUEST QUOTE"
]

const planTypeOptions = [
  "Corporate",
  "Other",
  "Retail"
]

const planNameOptions = [
  "Avon A.C.E Boss",
  "Avon A.C.E Executive Boss",
  "Avon ACE Global",
  "Avon Revive",
  "Avon Secure",
  "Avon Secure Lite"
]

const mockPlans = [
  { hmo: "A&M Healthcare Trust Limited", type: "Retail", name: "Individual Plan", cost: 85000 },
  { hmo: "A&M Healthcare Trust Limited", type: "Retail", name: "Family Plan", cost: 119000 },
  { hmo: "A&M Healthcare Trust Limited", type: "Retail", name: "Couple Plan", cost: 153000 },
  { hmo: "A&M Healthcare Trust Limited", type: "Corporate", name: "Small Groups Plan", cost: 153000 },
  { hmo: "A&M Healthcare Trust Limited", type: "Corporate", name: "Companies & Large Groups", cost: 153000 },
  { hmo: "A&M Healthcare Trust Limited", type: "Other", name: "National Coverage", cost: 153000 },
  { hmo: "A&M Healthcare Trust Limited", type: "Other", name: "International Coverage", cost: 153000 },
  { hmo: "Aiico-Multishield HMO", type: "Retail", name: "Standard", cost: 64680 },
  { hmo: "Aiico-Multishield HMO", type: "Retail", name: "Executive", cost: 109610 },
  { hmo: "Aiico-Multishield HMO", type: "Retail", name: "Super Executive", cost: 153667 },
]

export function ComparePlansJs() {
  const [filteredPlans, setFilteredPlans] = useState(mockPlans)
  const [currentPage, setCurrentPage] = useState(1)
  const plansPerPage = 10

  const indexOfLastPlan = currentPage * plansPerPage
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage
  const currentPlans = filteredPlans.slice(indexOfFirstPlan, indexOfLastPlan)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    (<div className="min-h-screen bg-[#F7F7F7]">
      <header className="bg-[#008751] text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold">CoverFit</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">John Doe</span>
          <UserCircle size={32} />
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#008751]">Compare Health Insurance Plans</h1>
          <FileSearch size={32} className="text-[#008751]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div>
            <h2 className="font-semibold mb-2">HMO Name</h2>
            {hmoOptions.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <Checkbox id={`hmo-${index}`} />
                <label htmlFor={`hmo-${index}`} className="ml-2 text-sm">{option}</label>
              </div>
            ))}
          </div>
          <div>
            <h2 className="font-semibold mb-2">Plan Price Range</h2>
            {priceRangeOptions.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <Checkbox id={`price-${index}`} />
                <label htmlFor={`price-${index}`} className="ml-2 text-sm">{option}</label>
              </div>
            ))}
          </div>
          <div>
            <h2 className="font-semibold mb-2">Plan Type</h2>
            {planTypeOptions.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <Checkbox id={`type-${index}`} />
                <label htmlFor={`type-${index}`} className="ml-2 text-sm">{option}</label>
              </div>
            ))}
          </div>
          <div>
            <h2 className="font-semibold mb-2">Plan Name</h2>
            {planNameOptions.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <Checkbox id={`plan-${index}`} />
                <label htmlFor={`plan-${index}`} className="ml-2 text-sm">{option}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center space-x-4 mb-8">
          <Button className="bg-[#008751] text-white hover:bg-[#006741]">Compare Plans</Button>
          <Button
            variant="outline"
            className="border-[#008751] text-[#008751] hover:bg-[#008751] hover:text-white">Clear Filters</Button>
        </div>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#008751] text-white">
            <tr>
              <th className="py-3 px-4 text-left">HMO NAME</th>
              <th className="py-3 px-4 text-left">PLAN TYPE</th>
              <th className="py-3 px-4 text-left">PLAN NAME</th>
              <th className="py-3 px-4 text-left">ANNUAL COST (NAIRA)</th>
              <th className="py-3 px-4 text-left">PLAN LINK</th>
            </tr>
          </thead>
          <tbody>
            {currentPlans.map((plan, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-3 px-4">{plan.hmo}</td>
                <td className="py-3 px-4">{plan.type}</td>
                <td className="py-3 px-4">{plan.name}</td>
                <td className="py-3 px-4">{plan.cost.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <Button variant="link" className="text-[#008751] hover:text-[#006741] p-0">View Plan</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300">
            Previous
          </Button>
          <span>Page {currentPage} of {Math.ceil(filteredPlans.length / plansPerPage)}</span>
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredPlans.length / plansPerPage)}
            className="bg-[#008751] text-white hover:bg-[#006741]">
            Next
          </Button>
        </div>
      </main>
    </div>)
  );
}