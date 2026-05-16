// Job Categories
export type JobCategory = 'plumbing' | 'electrical' | 'painting' | 'joinery' | 'cleaning' | 'gardening' | 'other';

// Job Status
export type JobStatus = 'Open' | 'In Progress' | 'Closed';

// Job Interface
export interface Job {
  _id: string;
  title: string;
  description: string;
  category: JobCategory;
  location: string;
  contactName: string;
  contactEmail: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
}

// Create Job Request
export interface CreateJobRequest {
  title: string;
  description: string;
  category: JobCategory;
  location: string;
  contactName: string;
  contactEmail: string;
}

// Update Job Request
export interface UpdateJobRequest {
  title?: string;
  description?: string;
  category?: JobCategory;
  location?: string;
  contactName?: string;
  contactEmail?: string;
  status?: JobStatus;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Filter Options
export interface JobFilters {
  category?: JobCategory;
  status?: JobStatus;
  search?: string;
}

// Category Label Mapping
export const CATEGORY_LABELS: Record<JobCategory, string> = {
  plumbing: 'Plumbing',
  electrical: 'Electrical',
  painting: 'Painting',
  joinery: 'Joinery',
  cleaning: 'Cleaning',
  gardening: 'Gardening',
  other: 'Other',
};

// Status Label Mapping
export const STATUS_LABELS: Record<JobStatus, string> = {
  Open: 'Open',
  'In Progress': 'In Progress',
  Closed: 'Closed',
};

// Category Colors
export const CATEGORY_COLORS: Record<JobCategory, string> = {
  plumbing: 'bg-blue-100 text-blue-800',
  electrical: 'bg-yellow-100 text-yellow-800',
  painting: 'bg-purple-100 text-purple-800',
  joinery: 'bg-amber-100 text-amber-800',
  cleaning: 'bg-teal-100 text-teal-800',
  gardening: 'bg-green-100 text-green-800',
  other: 'bg-gray-100 text-gray-800',
};

// Status Colors
export const STATUS_COLORS: Record<JobStatus, string> = {
  Open: 'bg-orange-100 text-orange-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Closed: 'bg-green-100 text-green-800',
};