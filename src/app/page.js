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
  const [filterOptions, setFilterOptions] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchFilterOptions = async () => {
    try {
      console.log("Home: Fetching filter options...");
      const response = await fetch('/api/filter-options');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Home: Received filter options:", JSON.stringify(data, null, 2));
      setFilterOptions(data);
    } catch (error) {
      console.error("Home: Error fetching filter options:", error);
    }
  };

  const fetchPlans = async () => {
    try {
      console.log("Home: Fetching plans with filters:", JSON.stringify(filters, null, 2));
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...filters
      });
      const url = `/api/plans?${queryParams}`;
      console.log("Home: Fetching plans with URL:", url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Home: Received plans data:", JSON.stringify(data, null, 2));
      setPlans(data.plans);
      setTotalPages(data.totalPages);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error("Home: Error fetching plans:", error);
    }
  };

  useEffect(() => {
    console.log("Home: Component mounted, fetching filter options and plans...");
    const fetchData = async () => {
      await fetchFilterOptions();
      await fetchPlans();
      console.log("Home: Setting isLoading to false");
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Home: Fetching plans due to page or filter change");
    fetchPlans();
  }, [currentPage, filters]);

  if (isLoading) {
    console.log("Home: isLoading is true, rendering loading message");
    return <div>Loading Filter options...</div>;
  }

  console.log("Home: isLoading is false, rendering content");
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Compare Health Insurance Plans</h1>
      <FilterForm onFilter={setFilters} filterOptions={filterOptions} />
      <PlansTable plans={plans} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      <div className="text-center mb-4">Total Results: {totalCount}</div>
    </div>
  );
}
