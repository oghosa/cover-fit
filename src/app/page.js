"use client";

import { useState, useEffect } from 'react';
import FilterForm from '../components/FilterForm';
import PlansTable from '../components/PlansTable';

export default function Home() {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await fetch('/api/plans');
      const data = await response.json();
      setPlans(data);
      setFilteredPlans(data);
    };
    fetchPlans();
  }, []);

  const handleFilter = (filters) => {
    const filtered = plans.filter(plan => {
      return (
        (filters.hmo_name.length === 0 || filters.hmo_name.includes(plan.hmo_name)) &&
        (filters.plan_price_range.length === 0 || filters.plan_price_range.includes(plan.plan_price_range)) &&
        (filters.plan_type.length === 0 || filters.plan_type.includes(plan.plan_type)) &&
        (filters.plan_name_full.length === 0 || filters.plan_name_full.includes(plan.plan_name_full))
      );
    });
    setFilteredPlans(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Health Insurance Plans</h1>
      <FilterForm onFilter={handleFilter} />
      <PlansTable plans={filteredPlans} />
    </div>
  );
}
