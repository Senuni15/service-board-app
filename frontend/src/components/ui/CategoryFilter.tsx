import React from 'react';
import { JobCategory, JobStatus, CATEGORY_LABELS, STATUS_LABELS } from '../../types';
import { ChevronDown } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: JobCategory | '';
  onChange: (category: JobCategory | '') => void;
  categories?: JobCategory[];
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onChange,
  categories = ['plumbing', 'electrical', 'painting', 'joinery', 'cleaning', 'gardening', 'other'],
}) => {
  return (
    <div className="relative">
      <select
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value as JobCategory | '')}
        className="appearance-none w-full px-4 py-2.5 pr-10 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {CATEGORY_LABELS[cat]}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
};

interface StatusFilterProps {
  selectedStatus: JobStatus | '';
  onChange: (status: JobStatus | '') => void;
  statuses?: JobStatus[];
}

export const StatusFilter: React.FC<StatusFilterProps> = ({
  selectedStatus,
  onChange,
  statuses = ['pending', 'in_progress', 'completed', 'cancelled'],
}) => {
  return (
    <div className="relative">
      <select
        value={selectedStatus}
        onChange={(e) => onChange(e.target.value as JobStatus | '')}
        className="appearance-none w-full px-4 py-2.5 pr-10 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
      >
        <option value="">All Statuses</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {STATUS_LABELS[status]}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default CategoryFilter;
