import { FiCalendar, FiPlus, FiCheck, FiClock, FiX, FiSearch } from 'react-icons/fi';

const ActivitiesContent = () => {
  const activities = [
    { id: 1, type: 'Meeting', title: 'Client presentation', date: 'Today, 2:00 PM', with: 'John Smith', status: 'Scheduled' },
    { id: 2, type: 'Call', title: 'Follow-up call', date: 'Today, 4:30 PM', with: 'Sarah Johnson', status: 'Scheduled' },
    { id: 3, type: 'Email', title: 'Proposal sent', date: 'Yesterday', with: 'Michael Brown', status: 'Completed' },
    { id: 4, type: 'Task', title: 'Prepare contract', date: 'May 18, 2023', with: 'Emily Davis', status: 'Overdue' },
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Completed': return <FiCheck className="text-green-500" />;
      case 'Scheduled': return <FiClock className="text-blue-500" />;
      case 'Overdue': return <FiX className="text-red-500" />;
      default: return <FiClock className="text-gray-500" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Meeting': return 'bg-purple-100 text-purple-800';
      case 'Call': return 'bg-blue-100 text-blue-800';
      case 'Email': return 'bg-green-100 text-green-800';
      case 'Task': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Activities</h2>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <FiPlus /> Add Activity
          </button>
          <div className="relative flex-1 md:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FiCalendar size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Upcoming</h3>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FiCheck size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Completed</h3>
              <p className="text-2xl font-bold">1</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <FiX size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Overdue</h3>
              <p className="text-2xl font-bold">1</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">With</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(activity.type)}`}>
                      {activity.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{activity.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{activity.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{activity.with}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(activity.status)}
                      <span>{activity.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                    <button className="text-gray-600 hover:text-gray-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesContent;