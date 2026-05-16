import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, User, Mail, Edit, Trash2, Save } from 'lucide-react';
import { useJob, useUpdateJob, useDeleteJob } from '../hooks/useJobs';
import { JobStatus } from '../types';
import { formatDate } from '../utils/helpers';
import { StatusBadge, CategoryBadge } from '../components/ui/StatusBadge';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { EmptyState } from '../components/ui/EmptyState';
import { ConfirmationModal } from '../components/ui/ConfirmationModal';
import { useToast } from '../components/ui/Toast';

export const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const navigate = useNavigate();
  const { job, loading, error } = useJob(id || '');
  const { updateJob, loading: updating } = useUpdateJob();
  const { deleteJob, loading: deleting } = useDeleteJob();
  const toast = useToast();
  

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");;

  const statuses = ['Open', 'In Progress', 'Closed'];

  const handleStatusUpdate = async () => {
  if (!selectedStatus || !job) return;

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/jobs/${job._id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: selectedStatus,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      toast.success("Job status updated successfully");
      window.location.reload();
    } else {
      toast.error(data.message || "Failed to update status");
    }
  } catch (error) {
    toast.error("Server Error");
  }
};

const handleDelete = async () => {
  if (!job) return;

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/jobs/${job._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      toast.success("Job deleted successfully");
      navigate("/");
    } else {
      toast.error("Failed to delete job");
    }

    setShowDeleteModal(false);
  } catch (error) {
    toast.error("Server Error");
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen">
        <EmptyState
          title="Job not found"
          description="The job you're looking for doesn't exist or has been removed."
        />
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </Link>

        {/* Job Details Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">{job.title}</h1>
            <div className="flex flex-wrap gap-3">
              <CategoryBadge category={job.category} size="md" />
              <StatusBadge status={job.status} size="md" />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {job.description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="font-medium text-gray-900">{job.location}</p>
                </div>
              </div>

              {/* Created Date */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Posted</p>
                  <p className="font-medium text-gray-900">{formatDate(job.createdAt)}</p>
                </div>
              </div>

              {/* Contact Name */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Contact Name</p>
                  <p className="font-medium text-gray-900">{job.contactName}</p>
                </div>
              </div>

              {/* Contact Email */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Contact Email</p>
                  <a
                    href={`mailto:${job.contactEmail}`}
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    {job.contactEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Status Update Section */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as JobStatus)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select new status</option>
                    {statuses.map((status) => (
                    <option
                      key={status}
                      value={status}
                      disabled={status === job.status}
                    >
                      {status} {status === job.status && "(current)"}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleStatusUpdate}
                  disabled={!selectedStatus || updating}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updating ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Update Status
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
              <Link
                to={`/jobs/${job._id}/edit`}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit Job
              </Link>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Job
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Job"
        message={`Are you sure you want to delete "${job.title}"? This action cannot be undone.`}
        confirmText={deleting ? 'Deleting...' : 'Delete'}
        cancelText="Cancel"
        type="danger"
        loading={deleting}
      />
    </div>
  );
};

export default JobDetailPage;
