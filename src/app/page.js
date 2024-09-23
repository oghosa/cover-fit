"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import FilterForm from '../components/FilterForm';
import PlansTable from '../components/PlansTable';

// Initialize the Supabase client
const supabase = createClient('https://lovxcvixhaqguvngxbpr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxvdnhjdml4aGFxZ3V2bmd4YnByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxMTMxMDYsImV4cCI6MjA0MjY4OTEwNn0.sLq8hj3GT2iJZ_qN_x99gGkd2AFzfb4nZlr61EPSbxo');

export default function Home() {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      console.log('Fetching plans...');
      try {
        const { data, error, status } = await supabase
          .from('plans')
          .select('*');
        
        if (error && status !== 406) throw error;

        if (data) {
          console.log('Fetched Data:', data);
          if (data.length === 0) {
            console.warn('No data returned from Supabase query');
          }
          setPlans(data);
          setFilteredPlans(data);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    console.log('Plans state updated:', plans);
    console.log('Filtered Plans state updated:', filteredPlans);
  }, [plans, filteredPlans]);

  const handleFilter = (filters) => {
    const filtered = plans.filter((plan) => {
      return (
        (filters.hmo === '' || plan.HMO_Name === filters.hmo) &&
        (filters.priceRange === '' || plan.Plan_Price_Range === filters.priceRange) &&
        (filters.planType === '' || plan.Plan_Type === filters.planType) &&
        (filters.planName === '' || plan.Plan_Name === filters.planName)
      );
    });
    setFilteredPlans(filtered);
    console.log('Filtered Plans:', filtered);
  };

  return (
    <div className="p-8">
      <FilterForm onFilter={handleFilter} />
      <PlansTable plans={filteredPlans} />
    </div>
  );
}
