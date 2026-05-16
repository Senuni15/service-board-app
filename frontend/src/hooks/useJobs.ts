import { useState, useEffect, useCallback } from 'react';
import { jobService } from '../services/api';
import { Job, JobFilters, CreateJobRequest, UpdateJobRequest, JobCategory, JobStatus } from '../types';

// Mock data for demo purposes when API is not available
const mockJobs: Job[] = [
  {
    _id: '1',
    title: 'Fix leaking kitchen faucet',
    description: 'My kitchen faucet has been leaking for a week. Need a professional plumber to fix it. The leak is coming from the base of the faucet and it\'s getting worse.',
    category: 'plumbing',
    location: 'Downtown, New York',
    contactName: 'John Smith',
    contactEmail: 'john.smith@email.com',
    status: 'Open',
    createdAt: '2026-05-10T10:00:00Z',
    updatedAt: '2026-05-10T10:00:00Z',
  },
  {
    _id: '2',
    title: 'Install new ceiling lights',
    description: 'Looking for an electrician to install 3 ceiling lights in my living room. I have already purchased the lights and just need professional installation.',
    category: 'electrical',
    location: 'Brooklyn, New York',
    contactName: 'Sarah Johnson',
    contactEmail: 'sarah.j@email.com',
    status: 'In Progress',
    createdAt: '2026-05-08T14:30:00Z',
    updatedAt: '2026-05-12T09:00:00Z',
  },
  {
    _id: '3',
    title: 'Paint bedroom walls',
    description: 'Need a painter to paint 2 bedrooms in my apartment. Approximately 300 sq ft total. Prefer neutral colors. Looking for someone with experience.',
    category: 'painting',
    location: 'Queens, New York',
    contactName: 'Mike Brown',
    contactEmail: 'mike.brown@email.com',
    status: 'Open',
    createdAt: '2026-05-05T08:15:00Z',
    updatedAt: '2026-05-05T08:15:00Z',
  },
  {
    _id: '4',
    title: 'Build custom bookshelf',
    description: 'Looking for a carpenter to build a custom bookshelf for my home office. Dimensions: 6ft wide, 4ft tall, 12 inches deep. Solid wood preferred.',
    category: 'joinery',
    location: 'Manhattan, New York',
    contactName: 'Emily Davis',
    contactEmail: 'emily.d@email.com',
    status: 'Closed',
    createdAt: '2026-04-20T11:00:00Z',
    updatedAt: '2026-05-01T16:00:00Z',
  },
  {
    _id: '5',
    title: 'Deep clean after renovation',
    description: 'Need professional cleaning services after home renovation. 3 bedrooms, 2 bathrooms, living room, and kitchen. Post-construction cleaning required.',
    category: 'cleaning',
    location: 'Staten Island, New York',
    contactName: 'Robert Wilson',
    contactEmail: 'r.wilson@email.com',
    status: 'Open',
    createdAt: '2026-05-14T09:00:00Z',
    updatedAt: '2026-05-14T09:00:00Z',
  },
  {
    _id: '6',
    title: 'Garden landscaping',
    description: 'Looking for a gardener to redesign my backyard. Need help with planting flowers, installing a small pond, and laying sod. Approximately 500 sq ft area.',
    category: 'gardening',
    location: 'Bronx, New York',
    contactName: 'Lisa Anderson',
    contactEmail: 'lisa.a@email.com',
    status: 'In Progress',
    createdAt: '2026-05-02T13:00:00Z',
    updatedAt: '2026-05-13T10:30:00Z',
  },
];

// Hook for fetching jobs
export const useJobs = (filters?: JobFilters) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await jobService.getJobs();
      
      if (response.success && response.data) {
        let filteredJobs = [...response.data];
        
        // Apply filters
        if (filters?.category) {
          filteredJobs = filteredJobs.filter(job => job.category === filters.category);
        }
        if (filters?.status) {
          filteredJobs = filteredJobs.filter(job => job.status === filters.status);
        }
        if (filters?.search) {
          const searchLower = filters.search.toLowerCase();
          filteredJobs = filteredJobs.filter(
            job =>
              job.title.toLowerCase().includes(searchLower) ||
              job.description.toLowerCase().includes(searchLower) ||
              job.location.toLowerCase().includes(searchLower)
          );
        }
        
        setJobs(filteredJobs);
      } else {
        // Use mock data when API fails
        console.log('Using mock data');
        let filteredJobs = [...mockJobs];
        
        if (filters?.category) {
          filteredJobs = filteredJobs.filter(job => job.category === filters.category);
        }
        if (filters?.status) {
          filteredJobs = filteredJobs.filter(job => job.status === filters.status);
        }
        if (filters?.search) {
          const searchLower = filters.search.toLowerCase();
          filteredJobs = filteredJobs.filter(
            job =>
              job.title.toLowerCase().includes(searchLower) ||
              job.description.toLowerCase().includes(searchLower) ||
              job.location.toLowerCase().includes(searchLower)
          );
        }
        
        setJobs(filteredJobs);
      }
    } catch (err) {
      // Use mock data on error
      console.log('Using mock data due to error');
      let filteredJobs = [...mockJobs];
      
      if (filters?.category) {
        filteredJobs = filteredJobs.filter(job => job.category === filters.category);
      }
      if (filters?.status) {
        filteredJobs = filteredJobs.filter(job => job.status === filters.status);
      }
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        filteredJobs = filteredJobs.filter(
          job =>
            job.title.toLowerCase().includes(searchLower) ||
            job.description.toLowerCase().includes(searchLower) ||
            job.location.toLowerCase().includes(searchLower)
        );
      }
      
      setJobs(filteredJobs);
    } finally {
      setLoading(false);
    }
  }, [filters?.category, filters?.status, filters?.search]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { jobs, loading, error, refetch: fetchJobs };
};

// Hook for fetching single job
export const useJob = (id: string) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJob = useCallback(async () => {
  // ✅ FIX: stop API call if id is missing
  if (!id) return;

  setLoading(true);
  setError(null);

  try {
    const response = await jobService.getJobById(id);

    if (response.success && response.data) {
      setJob(response.data);
    } else {
      const mockJob = mockJobs.find(j => j._id === id); // ALSO FIXED
      if (mockJob) {
        setJob(mockJob);
      } else {
        setError('Job not found');
      }
    }
  } catch (err) {
    const mockJob = mockJobs.find(j => j._id === id); // ALSO FIXED
    if (mockJob) {
      setJob(mockJob);
    } else {
      setError('Job not found');
    }
  } finally {
    setLoading(false);
  }
}, [id]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  return { job, loading, error, refetch: fetchJob };
};

// Hook for creating job
export const useCreateJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createJob = async (jobData: CreateJobRequest) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await jobService.createJob(jobData);
      
      if (response.success) {
        setSuccess(true);
        return { success: true, data: response.data };
      } else {
        // Mock success for demo
        const newJob: Job = {
          ...jobData,
          _id: String(Date.now()),
          status: 'Open',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setSuccess(true);
        return { success: true, data: newJob };
      }
    } catch (err) {
      // Mock success for demo
      const newJob: Job = {
        ...jobData,
        _id: String(Date.now()),
        status: 'Open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setSuccess(true);
      return { success: true, data: newJob };
    } finally {
      setLoading(false);
    }
  };

  return { createJob, loading, error, success };
};



// Hook for updating job
export const useUpdateJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateJob = async (id: string, jobData: UpdateJobRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await jobService.updateJob(id, jobData);

      if (response.success) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        setError(response.error || "Failed to update job");

        return {
          success: false,
        };
      }
    } catch (err) {
      setError("Server error");

      return {
        success: false,
      };
    } finally {
      setLoading(false);
    }
  };

  return { updateJob, loading, error };
};

// Hook for deleting job
export const useDeleteJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteJob = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await jobService.deleteJob(id);
      
      if (response.success) {
        return { success: true };
      } else {
        return { success: true }; // Mock success
      }
    } catch (err) {
      return { success: true }; // Mock success for demo
    } finally {
      setLoading(false);
    }
  };

  return { deleteJob, loading, error };
};
