import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Job } from '../../types';
import { StatusBadge, CategoryBadge } from './StatusBadge';
import { formatDate, truncateText } from '../../utils/helpers';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 overflow-hidden group">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {job.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {truncateText(job.description, 120)}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <CategoryBadge category={job.category} />
          <StatusBadge status={job.status} />
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(job.createdAt)}</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/jobs/${job._id}`}
          className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-gray-50 hover:bg-blue-600 text-gray-700 hover:text-white font-medium rounded-lg transition-all duration-200 group/btn"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
