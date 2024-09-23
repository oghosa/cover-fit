"use client"; // Add this line at the top

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://lovxcvixhaqguvngxbpr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxvdnhjdml4aGFxZ3V2bmd4YnByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxMTMxMDYsImV4cCI6MjA0MjY4OTEwNn0.sLq8hj3GT2iJZ_qN_x99gGkd2AFzfb4nZlr61EPSbxo');

export default function FilterForm({ onFilter }) {
  const [filters, setFilters] = useState({
    hmo: '',
    priceRange: '',
    planType: '',
    planName: '',
  });

  const [hmoOptions, setHmoOptions] = useState([]);
  const [priceRangeOptions, setPriceRangeOptions] = useState([]);
  const [planTypeOptions, setPlanTypeOptions] = useState([]);
  const [planNameOptions, setPlanNameOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      console.log('Fetching filter options...');
      
      // Check if the 'plans' table exists and has data
      const { data: tableInfo, error: tableError } = await supabase
        .from('plans')
        .select('count(*)', { count: 'exact' });

      if (tableError) {
        console.error('Error checking table:', tableError);
      } else {
        console.log('Table info:', tableInfo);
      }

      const { data: hmoData, error: hmoError } = await supabase
        .from('plans')
        .select('HMO_Name', { count: 'exact' });

      const { data: priceRangeData, error: priceRangeError } = await supabase
        .from('plans')
        .select('Plan_Price_Range', { count: 'exact' });

      const { data: planTypeData, error: planTypeError } = await supabase
        .from('plans')
        .select('Plan_Type', { count: 'exact' });

      const { data: planNameData, error: planNameError } = await supabase
        .from('plans')
        .select('Plan_Name', { count: 'exact' });

      if (hmoError || priceRangeError || planTypeError || planNameError) {
        console.error('Error fetching options:', hmoError || priceRangeError || planTypeError || planNameError);
      } else {
        console.log('HMO Data:', hmoData);
        console.log('Price Range Data:', priceRangeData);
        console.log('Plan Type Data:', planTypeData);
        console.log('Plan Name Data:', planNameData);
        
        setHmoOptions([...new Set(hmoData.map(item => item.HMO_Name))]);
        setPriceRangeOptions([...new Set(priceRangeData.map(item => item.Plan_Price_Range))]);
        setPlanTypeOptions([...new Set(planTypeData.map(item => item.Plan_Type))]);
        setPlanNameOptions([...new Set(planNameData.map(item => item.Plan_Name))]);
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    console.log('Filter options updated:');
    console.log('HMO Options:', hmoOptions);
    console.log('Price Range Options:', priceRangeOptions);
    console.log('Plan Type Options:', planTypeOptions);
    console.log('Plan Name Options:', planNameOptions);
  }, [hmoOptions, priceRangeOptions, planTypeOptions, planNameOptions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <select
        name="hmo"
        value={filters.hmo}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value="">Select HMO</option>
        {hmoOptions.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <select
        name="priceRange"
        value={filters.priceRange}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value="">Select Price Range</option>
        {priceRangeOptions.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <select
        name="planType"
        value={filters.planType}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value="">Select Plan Type</option>
        {planTypeOptions.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <select
        name="planName"
        value={filters.planName}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value="">Select Plan Name</option>
        {planNameOptions.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Compare
      </button>
    </form>
  );
}
