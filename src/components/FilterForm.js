"use client";

import React, { useState, useEffect } from 'react';

export default function FilterForm({ onFilter }) {
  const [filterOptions, setFilterOptions] = useState({
    hmos: [],
    priceRanges: [],
    planTypes: [],
    planNames: []
  });

  const [filters, setFilters] = useState({
    hmo_name: [],
    plan_price_range: [],
    plan_type: [],
    plan_name_full: []
  });

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch('/api/filter-options');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFilterOptions(data);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked 
        ? [...prevFilters[name], value]
        : prevFilters[name].filter(item => item !== value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const clearFilters = () => {
    setFilters({
      hmo_name: [],
      plan_price_range: [],
      plan_type: [],
      plan_name_full: []
    });
    onFilter({
      hmo_name: [],
      plan_price_range: [],
      plan_type: [],
      plan_name_full: []
    });
  };

  const renderCheckboxGroup = (name, options, label) => (
    <div>
      <label className="block mb-2">{label}</label>
      <div className="max-h-40 overflow-y-auto border rounded p-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              id={`${name}-${index}`}
              name={name}
              value={option}
              checked={filters[name].includes(option)}
              onChange={handleFilterChange}
              className="mr-2"
            />
            <label htmlFor={`${name}-${index}`}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {renderCheckboxGroup('hmo_name', filterOptions.hmos, 'HMO Name')}
        {renderCheckboxGroup('plan_price_range', filterOptions.priceRanges, 'Price Range')}
        {renderCheckboxGroup('plan_type', filterOptions.planTypes, 'Plan Type')}
        {renderCheckboxGroup('plan_name_full', filterOptions.planNames, 'Plan Name')}
      </div>
      <div className="mt-4 flex justify-center"> {/* Center align buttons */}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">
          Compare Plans
        </button>
        <button type="button" onClick={clearFilters} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
          Clear Filters
        </button>
      </div>
    </form>
  );
}