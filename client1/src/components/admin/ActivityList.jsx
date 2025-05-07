import { FiPlus, FiCalendar, FiFileText, FiPhone, FiMail, FiCheckCircle, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useState, useEffect, use } from 'react';
import axios from 'axios';
import { getAllActivities } from '../../api/admin';
// import ActivityModal from './ActivityModal';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'today', 'upcoming'

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
        setIsLoading(true);
        const response = await getAllActivities(filter);
        setActivities(response);
        setIsLoading(false);
    } catch (err) {
        setError(err.message);
        setIsLoading(false);
    }
    };


    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        fetchActivities(e.target.value);
    };


  const handleCreateActivity = async (activityData) => {
    try {
      await axios.post('/api/activities', activityData);
      fetchActivities();
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateActivity = async (id, activityData) => {
    try {
      await axios.put(`/api/activities/${id}`, activityData);
      fetchActivities();
      setIsModalOpen(false);
      setCurrentActivity(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteActivity = async (id) => {
    try {
      await axios.delete(`/api/activities/${id}`);
      fetchActivities();
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) return (
    <div className="p-6 flex justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Upcoming Activities</h2>
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Activities</option>
            <option value="today">Today</option>
            <option value="upcoming">Upcoming</option>
          </select>
          <button
            onClick={() => {
              setCurrentActivity(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700"
          >
            <FiPlus size={16} /> New
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No activities found. Create one to get started!
            </div>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start group">
                <div className={`flex-shrink-0 h-10 w-10 rounded-full ${getActivityBgColor(activity.type)} flex items-center justify-center mr-3`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setCurrentActivity(activity);
                          setIsModalOpen(true);
                        }}
                        className="text-gray-500 hover:text-indigo-600"
                        title="Edit"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteActivity(activity.id)}
                        className="text-gray-500 hover:text-red-600"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {activity.customer && `With ${activity.customer.firstName} ${activity.customer.lastName}`}
                    {activity.description && ` - ${activity.description}`}
                  </p>
                  <div className="flex items-center mt-1 space-x-3">
                    <p className="text-xs text-gray-500">
                      {formatDate(activity.startDate)}
                      {activity.endDate && ` - ${formatDate(activity.endDate)}`}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(activity.status)}`}>
                      {activity.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Activity Modal */}
      {/* <ActivityModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentActivity(null);
        }}
        onSubmit={currentActivity ? 
          (data) => handleUpdateActivity(currentActivity.id, data) : 
          handleCreateActivity
        }
        activity={currentActivity}
      /> */}
    </div>
  );
};

export default ActivityList;