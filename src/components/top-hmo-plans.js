'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, UserCircle } from 'lucide-react'

const topPlans = [
  { hmo: "HMO A", type: "Comprehensive", name: "Premium Health", cost: 75000 },
  { hmo: "HMO B", type: "Basic", name: "Essential Care", cost: 45000 },
  { hmo: "HMO C", type: "Family", name: "Family Shield", cost: 120000 },
  { hmo: "HMO D", type: "Corporate", name: "Business Health", cost: 100000 },
  { hmo: "HMO E", type: "Individual", name: "Personal Plus", cost: 60000 },
]

export function TopHmoPlansJs() {
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
          <h1 className="text-3xl font-bold text-[#008751]">Top 5 HMO Plans</h1>
          <Award size={32} className="text-[#008751]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topPlans.map((plan, index) => (
            <Card key={index} className="bg-white border-[#008751] border-2">
              <CardHeader className="bg-[#008751]">
                <CardTitle className="text-white">{plan.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold mb-2 text-[#008751]">{plan.hmo}</p>
                <p className="text-sm text-gray-600 mb-2">Type: {plan.type}</p>
                <p className="text-xl font-bold mb-4 text-[#008751]">₦{plan.cost.toLocaleString()}</p>
                <Button className="w-full bg-[#008751] text-white hover:bg-[#006741]">View Plan Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>)
  );
}