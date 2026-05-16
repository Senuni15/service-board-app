import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { Job, CreateJobRequest, UpdateJobRequest, ApiResponse } from '../types';

// Get API URL from environment variable
const API_URL = import.meta.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API Functions
export const jobService = {
  // Get all jobs
  getJobs: async (): Promise<ApiResponse<Job[]>> => {
    try {
      const response = await api.get<Job[]>('/api/jobs');
      return { success: true, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        success: false,
        error: axiosError.message || 'Failed to fetch jobs',
      };
    }
  },

  // Get single job by ID
  getJobById: async (id: string): Promise<ApiResponse<Job>> => {
    try {
      const response = await api.get<Job>(`/api/jobs/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        success: false,
        error: axiosError.message || 'Failed to fetch job',
      };
    }
  },

  // Create new job
  createJob: async (jobData: CreateJobRequest): Promise<ApiResponse<Job>> => {
    try {
      const response = await api.post<Job>('/api/jobs', jobData);
      return { success: true, data: response.data, message: 'Job created successfully' };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        success: false,
        error: axiosError.message || 'Failed to create job',
      };
    }
  },

  // Update job
updateJob: async (id: string, jobData: UpdateJobRequest): Promise<ApiResponse<Job>> => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.put<Job>(
      `/api/jobs/${id}`,
      jobData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      data: response.data,
      message: "Job updated successfully",
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    return {
      success: false,
      error: axiosError.message || "Failed to update job",
    };
  }
},

  // Delete job
  deleteJob: async (id: string): Promise<ApiResponse<void>> => {
    try {
      await api.delete(`/api/jobs/${id}`);
      return { success: true, message: 'Job deleted successfully' };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        success: false,
        error: axiosError.message || 'Failed to delete job',
      };
    }
  },
};

export default api;
