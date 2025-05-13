import { getDealsByCustomerId } from "../../api/detail";
import { getCustomerByEmail } from "../../api/customer";
import { useEffect, useState } from "react";
import { useAuth } from "../../hook/useAuth";
import { Link, useNavigate } from "react-router-dom";

const DealList = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deals, setDeals] = useState([]);
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        if (!user || user.role !== "customer") {
            navigate("/sign-in");
            return;
        }

        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                // Fetch customer data
                const customerData = await getCustomerByEmail(user.email);
                setCustomer(customerData);
                
                // Fetch deals if customer exists
                if (customerData?.id) {
                    const dealsData = await getDealsByCustomerId(customerData.id);
                    setDeals(dealsData);
                }
            } catch (err) {
                setError(err.message || "Failed to load deals");
                console.error("Error fetching data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user, navigate]);

    if (isLoading){
        return null;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-blue-500">
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                    <h2 className="text-xl font-bold text-red-500 mb-4">Error</h2>
                    <p className="text-gray-700 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Your Deals</h1>
                    <span className="text-sm text-gray-500">
                        {deals.length} deal{deals.length !== 1 ? 's' : ''} found
                    </span>
                </div>

                {deals.length === 0 ? (
                    <div className="bg-white p-6 rounded-lg shadow text-center">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">No Deals Found</h2>
                        <p className="text-gray-600 mb-4">You currently have no deals. Please contact the sales to make a deal</p>
                        <Link
                            to="/customer/home/support"
                            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
                        >
                            Go to Support 
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {deals.map(deal => (
                            <div 
                                key={deal.id} 
                                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
                                onClick={() => navigate(`/customer/home/deals/${deal.id}`)}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-lg font-semibold text-gray-800">{deal.title}</h2>
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        deal.stage === 'closed' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-blue-100 text-blue-800'
                                    }`}>
                                        {deal.stage.charAt(0).toUpperCase() + deal.stage.slice(1)}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-3 line-clamp-2">{deal.description}</p>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>${deal.value?.toLocaleString() || '0'}</span>
                                    <span>{new Date(deal.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DealList;