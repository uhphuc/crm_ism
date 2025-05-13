import { getCustomerByEmail, getActivityByCustomerId } from "../../api/customer";
import { useEffect, useState } from "react";
import { useAuth } from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { format, formatDistanceToNow } from "date-fns";


const ActivityList = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activities, setActivities] = useState([]);
    const [customer, setCustomer] = useState(null);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        if (!user || user.role !== "customer") {
            navigate("/sign-in");
            return;
        }

        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const customerData = await getCustomerByEmail(user.email);
                setCustomer(customerData);

                if (customerData?.id) {
                    const activitiesData = await getActivityByCustomerId(customerData.id);
                    setActivities(activitiesData);
                }
            } catch (err) {
                setError(err.message || "Failed to load activities");
                console.error("Error fetching activities:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user, navigate]);

    const filteredActivities = activities.filter(activity => {
        if (filter === "all") return true;
        return activity.status === filter;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'in_progress': return 'bg-yellow-100 text-yellow-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            case 'planned': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'meeting': return '👥';
            case 'task': return '✅';
            case 'call': return '📞';
            case 'email': return '✉️';
            default: return '📝';
        }
    };

    if (isLoading) {
        return null; // Optionally, you can return a loading spinner or skeleton here
    }

    if (error) {
        return (
            <div className="flex-1 p-6">
                <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
                    <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Activities</h2>
                    <p className="text-gray-700 mb-6">{error}</p>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={() => navigate("/customer/dashboard")}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Your Activities</h1>
                    
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Filter:</span>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                        >
                            <option value="all">All Activities</option>
                            <option value="planned">Planned</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                {filteredActivities.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <p className="text-gray-600 mb-4">
                            {filter === "all" 
                                ? "You don't have any activities yet" 
                                : `No ${filter.replace('_', ' ')} activities found`}
                        </p>
                        <button
                            onClick={() => navigate("/customer/dashboard")}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredActivities.map((activity) => (
                            <div 
                                key={activity.id} 
                                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition cursor-pointer"
                                onClick={() => navigate(`/customer/activities/${activity.id}`)}
                            >
                                <div className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-3">
                                            <span className="text-xl mt-1">{getTypeIcon(activity.type)}</span>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800">{activity.title}</h3>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    With {activity.user ? `${activity.user.firstName} ${activity.user.lastName}` : 'team member'}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(activity.status)}`}>
                                            {activity.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                    
                                    {activity.description && (
                                        <p className="mt-3 text-gray-700 line-clamp-2">{activity.description}</p>
                                    )}
                                    
                                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                                        <div>
                                            <span className="font-medium">Due:</span>{' '}
                                            {format(new Date(activity.endDate), 'MMM dd, yyyy')}
                                        </div>
                                        <div>
                                            {formatDistanceToNow(new Date(activity.endDate), { addSuffix: true })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityList;