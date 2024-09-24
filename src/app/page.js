"use client";

import { useState, useEffect } from 'react';
import FilterForm from '../components/FilterForm';
import PlansTable from '../components/PlansTable';
import Pagination from '../components/Pagination';
import { UserCircle, FileSearch } from 'lucide-react';

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
    return <div className="flex items-center justify-center min-h-screen">Loading Filter options...</div>;
  }

  console.log("Home: isLoading is false, rendering content");
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
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
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <FilterForm onFilter={setFilters} filterOptions={filterOptions} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <PlansTable plans={plans} />
          <div className="mt-4 text-center text-gray-600">
            Total Results: {totalCount}
          </div>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </main>
    </div>
  );
}
