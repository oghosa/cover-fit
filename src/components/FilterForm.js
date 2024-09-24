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
      <div className="filter-group" style={{ flex: '1 1 200px', minWidth: '200px', marginBottom: '20px' }}>
        <label className="block text-gray-700 font-bold mb-2">{label}</label>
        <div className="checkbox-group" style={{ maxHeight: '150px', overflowY: 'auto', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-1" style={{ marginRight: '2px', marginBottom: '-1px' }}>
              <input
                type="checkbox"
                name={name}
                value={option}
                checked={filters[name].includes(option)}
                onChange={handleChange}
                className="mr-2"
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="filter-form" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="filter-options" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {renderCheckboxGroup('hmo_name', filterOptions.hmos, 'HMO Name')}
          {renderCheckboxGroup('plan_price_range', filterOptions.priceRanges, 'Plan Price Range')}
          {renderCheckboxGroup('plan_type', filterOptions.planTypes, 'Plan Type')}
          {renderCheckboxGroup('plan_name', filterOptions.planNames, 'Plan Name')}
        </div>
        <div className="mt-4 flex justify-center" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <button type="submit" className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">Compare Plans</button>
          <button type="button" onClick={clearFilters} className="px-4 py-2 bg-gray-500 text-white rounded">Clear Filters</button>
        </div>
      </form>
    </div>
  );
}