import { getInvoiceByCustomerId } from "../../api/detail";
import { getCustomerByEmail } from "../../api/customer";
import { useEffect, useState } from "react";
import { useAuth } from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const InvoiceList = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [invoices, setInvoices] = useState([]);
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
                
                const customerData = await getCustomerByEmail(user.email);
                setCustomer(customerData);
                
                if (customerData?.id) {
                    const invoicesData = await getInvoiceByCustomerId(customerData.id);
                    setInvoices(invoicesData);
                }
            } catch (err) {
                setError(err.message || "Failed to load invoices");
                console.error("Error fetching invoices:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user, navigate]);

    if (isLoading){
        return null
    }

    if (error) {
        return (
            <div className="flex-1 p-6">
                <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
                    <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Invoices</h2>
                    <p className="text-gray-700 mb-6">{error}</p>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Retry
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

    if (!customer) {
        return (
            <div className="flex-1 p-6">
                <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto text-center">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Not Found</h2>
                    <p className="text-gray-600 mb-6">We couldn't find your customer information.</p>
                    <button
                        onClick={() => navigate("/customer/edit")}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Complete Your Profile
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Your Invoices</h1>
                    <span className="text-sm text-gray-500">
                        {invoices.length} invoice{invoices.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {invoices.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <p className="text-gray-600 mb-4">You don't have any invoices yet</p>
                        <button
                            onClick={() => navigate("/customer/dashboard")}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Invoice #
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {invoices.map((invoice) => (
                                    <tr key={invoice.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {invoice.invoiceNumber || `INV-${invoice.id}`}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {format(new Date(invoice.issueDate), 'MMM dd, yyyy')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ${invoice.totalAmount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 
                                                invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                                                invoice.status === 'draft' ? 'bg-blue-100 text-blue-800' :
                                                invoice.status === 'canceled' ? 'bg-gray-100 text-gray-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button
                                                onClick={() => navigate(`/customer/home/invoices/${invoice.id}`)}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                View
                                            </button>
                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InvoiceList;