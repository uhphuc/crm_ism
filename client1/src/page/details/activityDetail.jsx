import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { getActivityById  } from '../../api/detail';
import { useEffect, useState } from 'react';
import { 
  FiCalendar, 
  FiUser, 
  FiBriefcase, 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiArrowLeft,
  FiEdit,
  FiSave,
  FiType,
  FiFileText,
  FiTrendingUp
} from 'react-icons/fi';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedActivity, setEditedActivity] = useState({});

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await getActivityById(id);
        setActivity(response);
        setEditedActivity(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActivity();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedActivity(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Here you would call your API to save the edited activity
      // await updateActivityById(id, editedActivity);
      setActivity(editedActivity);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const statusBadge = (status) => {
    const statusClasses = {
      planned: 'bg-blue-100 text-blue-800 border-blue-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
      postponed: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    const statusIcons = {
      planned: <FiClock className="mr-1" />,
      completed: <FiCheckCircle className="mr-1" />,
      cancelled: <FiXCircle className="mr-1" />,
      postponed: <FiClock className="mr-1" />
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center ${statusClasses[status]}`}>
        {statusIcons[status]}
        {status.toUpperCase()}
      </span>
    );
  };

  const typeBadge = (type) => {
    const typeClasses = {
      meeting: 'bg-purple-100 text-purple-800 border-purple-200',
      call: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      email: 'bg-blue-100 text-blue-800 border-blue-200',
      task: 'bg-amber-100 text-amber-800 border-amber-200'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${typeClasses[type]}`}>
        {type.toUpperCase()}
      </span>
    );
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  if (!activity) return <div className="text-center p-4">Activity not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <FiArrowLeft className="mr-2" /> Back to Activities
      </button>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {typeBadge(activity.type)}
              {statusBadge(activity.status)}
            </div>
            {editMode ? (
              <input
                type="text"
                name="title"
                value={editedActivity.title || ''}
                onChange={handleInputChange}
                className="text-2xl font-bold bg-transparent border-b border-blue-300 focus:outline-none w-full"
              />
            ) : (
              <h1 className="text-2xl font-bold text-gray-800">{activity.title}</h1>
            )}
          </div>
          
          {!editMode ? (
            // <button 
            //   onClick={() => setEditMode(true)}
            //   className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 shadow-sm"
            // >
            //   <FiEdit size={16} /> Edit
            // </button>
            <>
            </>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setEditMode(false);
                  setEditedActivity(activity);
                }}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md"
              >
                <FiSave size={16} /> Save
              </button>
            </div>
          )}
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Activity Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FiFileText className="text-gray-500" /> Description
              </h3>
              {editMode ? (
                <textarea
                  name="description"
                  value={editedActivity.description || ''}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-700 whitespace-pre-line">
                  {activity.description || 'No description provided'}
                </p>
              )}
            </div>

            {/* Timeline */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiClock className="text-gray-500" /> Timeline
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Start Date & Time</label>
                  {editMode ? (
                    <input
                      type="datetime-local"
                      name="startDate"
                      value={format(new Date(editedActivity.startDate), "yyyy-MM-dd'T'HH:mm")}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="font-medium text-gray-800">
                      {format(new Date(activity.startDate), 'PPPpp')}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">End Date & Time</label>
                  {editMode ? (
                    <input
                      type="datetime-local"
                      name="endDate"
                      value={format(new Date(editedActivity.endDate), "yyyy-MM-dd'T'HH:mm")}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="font-medium text-gray-800">
                      {format(new Date(activity.endDate), 'PPPpp')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Information */}
          <div className="space-y-6">
            {/* Customer Card */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FiUser className="text-gray-500" /> Customer
              </h3>
              
              <div className="space-y-2">
                <h4 className="font-bold text-gray-800">{activity.customer.companyName}</h4>
                <p className="text-gray-700">{activity.customer.firstName} {activity.customer.lastName}</p>
                
                <div className="mt-3 space-y-1">
                  <p className="text-gray-700 flex items-center">
                    <FiMail className="mr-2 text-gray-500" /> {activity.customer.email}
                  </p>
                  <p className="text-gray-700 flex items-center">
                    <FiPhone className="mr-2 text-gray-500" /> {activity.customer.phone}
                  </p>
                  <p className="text-gray-700 flex items-start">
                    <FiMapPin className="mr-2 mt-0.5 flex-shrink-0 text-gray-500" />
                    <span>
                      {activity.customer.address}<br />
                      {activity.customer.city}, {activity.customer.state}<br />
                      {activity.customer.postalCode}, {activity.customer.country}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Assigned User Card */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FiBriefcase className="text-gray-500" /> Assigned To
              </h3>
              
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                  {activity.user.firstName.charAt(0)}{activity.user.lastName.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{activity.user.firstName} {activity.user.lastName}</p>
                  <p className="text-gray-600">{activity.user.email}</p>
                  <p className="text-sm text-gray-500 capitalize">{activity.user.role}</p>
                </div>
              </div>
            </div>

            {/* Outcome Section */}
            {activity.outcome && (
              <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FiTrendingUp className="text-gray-500" /> Outcome
                </h3>
                <p className="text-gray-700">{activity.outcome}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;