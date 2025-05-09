import { FiPlus, FiCalendar, FiFileText, FiPhone, FiMail, FiCheckCircle } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { getActivitiesByUserId, createActivity, updateActivityStatus } from '../../api/sales';
import ActivityModal from './activityModal';
import { useAuth } from '../../hook/useAuth';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchActivities(user.id);
  }, [user.id]);

  const fetchActivities = async (userId) => {
    try {
      setIsLoading(true);
      const response = await getActivitiesByUserId(userId);
      setActivities(response);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleCreateActivity = async (activityData) => {
    try {
      setIsLoading(true);
      const newActivity = await createActivity(activityData, user.id);
      setActivities((prevActivities) => [...prevActivities, newActivity]);
      setIsModalOpen(false);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (activityId, newStatus) => {
    try {
      await updateActivityStatus(activityId, newStatus);
      await fetchActivities(user.id); // Refresh the activity list
    } catch (err) {
      setError(err.message);
    }
  };


  const getActivityIcon = (type) => {
    switch (type) {
      case 'meeting':
        return <FiCalendar className="text-blue-600" />;
      case 'call':
        return <FiPhone className="text-purple-600" />;
      case 'email':
        return <FiMail className="text-green-600" />;
      case 'task':
        return <FiCheckCircle className="text-yellow-600" />;
      default:
        return <FiFileText className="text-gray-600" />;
    }
  };

  const getActivityBgColor = (type) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100';
      case 'call':
        return 'bg-purple-100';
      case 'email':
        return 'bg-green-100';
      case 'task':
        return 'bg-yellow-100';
      default:
        return 'bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) return <div className="p-6">Loading activities...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Upcoming Activities</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-gray-500">No activities scheduled</p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className={`flex-shrink-0 h-10 w-10 rounded-full ${getActivityBgColor(activity.type)} flex items-center justify-center mr-3`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.title}</span>
                    {activity.customer && ` with ${activity.customer.firstName + ' ' + activity.customer.lastName}`}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(activity.startDate)}
                    {activity.endDate && ` - ${formatDate(activity.endDate)}`}
                  </p>
                  {activity.description && (
                    <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
                  )}
                </div>
                {
                  activity.status && (
                    <select
                      value={activity.status}
                      onChange={(e) => handleStatusChange(activity.id, e.target.value)}
                      className="ml-3 bg-gray-50 border border-gray-300 rounded-md p-1 text-sm"
                    >
                      {['planned', 'completed', 'cancelled', 'in_progress'].map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  ) 
                }
              </div>
            ))
          )}
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="mt-6 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          <FiPlus /> Schedule Activity
        </button>
      </div>

      {/* Activity Creation Modal */}
      <ActivityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateActivity}
      />
    </div>
  );
};

export default ActivityList;