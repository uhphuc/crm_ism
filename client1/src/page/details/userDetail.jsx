import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../api/detail'; // Adjust the import path as necessary
import { FiUser, FiMail, FiPhone, FiCalendar, FiEdit } from 'react-icons/fi';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id);
        setUser(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (isLoading) return <div>Loading user details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 bg-gray-50 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiUser /> User Details
          </h2>
          <button className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800">
            <FiEdit /> Edit
          </button>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{user.firstName} {user.lastName}</h3>
              <p className="text-gray-500">{user.role}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FiMail className="text-gray-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="text-gray-400" />
                <span>{user.phone || 'Not provided'}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="text-gray-400" />
                <span>Joined on {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-2">Recent Activity</h4>
            {/* Activity list would go here */}
            <p className="text-gray-500 text-sm">No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;