"use client";

import { useState, useEffect } from 'react';
import FilterForm from '../components/FilterForm';
import PlansTable from '../components/PlansTable';
import Pagination from '../components/Pagination';

export default function Home() {
  const [plans, setPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchPlans();
  }, [currentPage, filters]);

  const fetchPlans = async () => {
    console.log("Fetching plans with filters:", filters);
    const queryParams = new URLSearchParams({
      page: currentPage.toString(),
      limit: '10',
      ...filters
    });
    const url = `/api/plans?${queryParams}`;
    console.log("Requesting URL:", url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Received data:", JSON.stringify(data, null, 2));
      setPlans(data.plans);
      setTotalPages(data.totalPages);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const handleFilter = (newFilters) => {
    console.log("Applying new filters:", newFilters);
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when applying new filters
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Health Insurance Plans</h1>
      <FilterForm onFilter={handleFilter} />
      <PlansTable plans={plans} />
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
      <div className="mt-4 text-center text-gray-600">
        Total results: {totalCount}
      </div>
    </div>
  );
}
