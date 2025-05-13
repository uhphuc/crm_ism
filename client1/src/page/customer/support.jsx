import { getUserById, getCustomerByEmail } from "../../api/customer";
import { useEffect, useState } from "react";
import { useAuth } from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEnvelope, FaPhone, FaUserTie } from "react-icons/fa";

const Support = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [salesRep, setSalesRep] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [activeTab, setActiveTab] = useState("contact");

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

                if (customerData?.assignedTo) {
                    const repData = await getUserById(customerData.assignedTo);
                    setSalesRep(repData);
                }
            } catch (err) {
                setError(err.message || "Failed to load support information");
                toast.error("Failed to load support information");
                console.error("Error fetching support data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user, navigate]);


    if (error) {
        return (
            <div className="flex-1 p-6">
                <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
                    <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Support</h2>
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
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Customer Support</h1>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab("contact")}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === "contact" ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                Contact Information
                            </button>
                            <button
                                onClick={() => setActiveTab("faq")}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === "faq" ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                FAQ
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === "contact" && (
                            <div>
                                {salesRep ? (
                                    <div className="space-y-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="bg-blue-100 text-blue-600 rounded-full p-3">
                                                    <FaUserTie className="h-6 w-6" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">Your Dedicated Sales Representative</h3>
                                                <p className="text-gray-600 mt-1">{salesRep.firstName + ' ' + salesRep.lastName}</p>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 pt-4">
                                            <h4 className="text-md font-medium text-gray-900 mb-3">Contact Options</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-center space-x-3">
                                                    <FaEnvelope className="h-5 w-5 text-gray-500" />
                                                    <a 
                                                        href={`mailto:${salesRep.email}`} 
                                                        className="text-blue-600 hover:text-blue-800 hover:underline"
                                                    >
                                                        {salesRep.email}
                                                    </a>
                                                </div>
                                                
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 pt-4">
                                            <h4 className="text-md font-medium text-gray-900 mb-3">General Support</h4>
                                            <p className="text-gray-600 mb-4">
                                                For immediate assistance, please contact our general support team.
                                            </p>
                                            <button
                                                onClick={() => window.location.href = `mailto:${salesRep.email}`}
                                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                            >
                                                Email Support Team
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Sales Representative Assigned</h3>
                                        <p className="text-gray-600 mb-4">
                                            Please contact our general support team for assistance.
                                        </p>
                                        <button
                                            onClick={() => window.location.href = "mailto:manager1@gmail.com"}
                                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                        >
                                            Contact Support
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "faq" && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h3>
                                <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                                    {[
                                        {
                                            question: "How do I update my billing information?",
                                            answer: "You can update your billing information in the 'Billing' section of your account settings."
                                        },
                                        {
                                            question: "What are your business hours?",
                                            answer: "Our support team is available Monday through Friday, 9am to 5pm EST."
                                        },
                                        {
                                            question: "How do I reset my password?",
                                            answer: "Click on 'Forgot Password' on the login page and follow the instructions sent to your email."
                                        }
                                    ].map((faq, index) => (
                                        <div key={index} className="p-4">
                                            <h4 className="font-medium text-gray-900">{faq.question}</h4>
                                            <p className="mt-1 text-gray-600">{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;