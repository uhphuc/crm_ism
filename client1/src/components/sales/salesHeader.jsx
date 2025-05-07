import { FiCalendar, FiUser } from 'react-icons/fi';
import { useAuth } from '../../hook/useAuth';

const SalesHeader = () => {
  const { user } = useAuth();
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900">Sales Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
            <FiCalendar size={20} />
          </button>
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <FiUser className="text-indigo-600" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{user.firstName + " " + user.lastName}</span>
            </div>

        </div>
      </div>
    </header>
  );
};

export default SalesHeader;