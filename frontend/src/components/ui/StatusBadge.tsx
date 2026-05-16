import React from 'react';
import { JobCategory, JobStatus, CATEGORY_LABELS, STATUS_LABELS, CATEGORY_COLORS, STATUS_COLORS } from '../../types';

interface StatusBadgeProps {
  status: JobStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeClasses} ${STATUS_COLORS[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
};

interface CategoryBadgeProps {
  category: JobCategory;
  size?: 'sm' | 'md';
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, size = 'sm' }) => {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeClasses} ${CATEGORY_COLORS[category]}`}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
};

export default StatusBadge;
