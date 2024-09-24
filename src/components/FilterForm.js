"use client";

import React, { useState, useEffect } from 'react';

export default function FilterForm({ onFilter, filterOptions = {} }) {
  console.log("FilterForm: Component rendered with filterOptions:", JSON.stringify(filterOptions, null, 2));

  const [filters, setFilters] = useState({
    hmo_name: [],
    plan_price_range: [],
    plan_type: [],
    plan_name: []
  });

  useEffect(() => {
    console.log("FilterForm: filterOptions prop updated:", JSON.stringify(filterOptions, null, 2));
  }, [filterOptions]);

  const handleChange = (e) => {
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
    const newFilters = {};
    Object.keys(filters).forEach(key => {
      if (filters[key].length > 0) {
        newFilters[key] = filters[key];
      }
    });
    console.log("FilterForm - Submitting filters:", JSON.stringify(newFilters, null, 2));
    onFilter(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      hmo_name: [],
      plan_price_range: [],
      plan_type: [],
      plan_name: []
    });
    onFilter({});
  };

  const renderCheckboxGroup = (name, options, label) => {
    if (!options || options.length === 0) {
      return null;
    }
    return (
      <div>
        <h2 className="font-semibold mb-2">{label}</h2>
        <div className="checkbox-group h-40 overflow-y-auto">
          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`${name}-${index}`}
                name={name}
                value={option}
                checked={filters[name].includes(option)}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor={`${name}-${index}`} className="text-sm">{option}</label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="filter-form">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {renderCheckboxGroup('hmo_name', filterOptions.hmos, 'HMO Name')}
        {renderCheckboxGroup('plan_price_range', filterOptions.priceRanges, 'Plan Price Range')}
        {renderCheckboxGroup('plan_type', filterOptions.planTypes, 'Plan Type')}
        {renderCheckboxGroup('plan_name', filterOptions.planNames, 'Plan Name')}
      </div>
      <div className="flex justify-center space-x-4">
        <button type="submit" className="bg-[#008751] text-white px-4 py-2 rounded hover:bg-[#006741] transition-colors">
          Compare Plans
        </button>
        <button type="button" onClick={clearFilters} className="border border-[#008751] text-[#008751] px-4 py-2 rounded hover:bg-[#008751] hover:text-white transition-colors">
          Clear Filters
        </button>
      </div>
    </form>
  );
}