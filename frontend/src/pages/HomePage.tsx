import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { useJobs } from '../hooks/useJobs';
import { JobCard } from '../components/ui/JobCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { EmptyState } from '../components/ui/EmptyState';
import { CategoryFilter, StatusFilter } from '../components/ui/CategoryFilter';
import { JobCategory, JobStatus, JobFilters } from '../types';

export const HomePage: React.FC = () => {
  const [filters, setFilters] = useState<JobFilters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { jobs, loading, refetch } = useJobs(filters);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchQuery }));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleCategoryChange = (category: JobCategory | '') => {
    setFilters((prev) => ({ ...prev, category: category || undefined }));
  };

  const handleStatusChange = (status: JobStatus | '') => {
    setFilters((prev) => ({ ...prev, status: status || undefined }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const hasActiveFilters = filters.category || filters.status || filters.search;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Trusted Service Professionals
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Connect with skilled tradespeople for plumbing, electrical, painting, 
              and more. Post your job and get help from verified professionals.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <CategoryFilter
                  selectedCategory={filters.category || ''}
                  onChange={handleCategoryChange}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <StatusFilter
                  selectedStatus={filters.status || ''}
                  onChange={handleStatusChange}
                />
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Jobs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Service Requests
          </h2>
          <span className="text-gray-500">
            {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found
          </span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Empty State */}
        {!loading && jobs.length === 0 && (
          <EmptyState
            title="No jobs found"
            description={
              hasActiveFilters
                ? "No jobs match your current filters. Try adjusting your search criteria."
                : "No service requests available at the moment. Be the first to post a job!"
            }
          />
        )}

        {/* Jobs Grid */}
        {!loading && jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
