"use client";

import { useState, useEffect } from 'react';
import HMOsTable from './HMOsTable';
import Pagination from './Pagination';
import { Building2 } from 'lucide-react';
import HMOFilterForm from './HMOFilterForm';

export function CompareHMOs() {
  const [hmos, setHMOs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch('/api/hmo-filter-options');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFilterOptions(data);
    } catch (error) {
      console.error("Error fetching HMO filter options:", error);
    }
  };

  const fetchHMOs = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...filters
      });
      const url = `/api/hmos?${queryParams}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setHMOs(data.hmos);
      setTotalPages(data.totalPages);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error("Error fetching HMOs:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchFilterOptions();
      await fetchHMOs();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchHMOs();
  }, [currentPage, filters]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading HMO data...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <main className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#008751]">Compare Health Maintenance Organizations</h1>
          <Building2 size={32} className="text-[#008751]" />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <HMOFilterForm onFilter={setFilters} filterOptions={filterOptions} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <HMOsTable hmos={hmos} />
          <div className="mt-4 text-center text-gray-600">
            Total Results: {totalCount}
          </div>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </main>
    </div>
  );
}