import { FiUserPlus, FiSearch, FiFilter, FiDownload, FiUser } from 'react-icons/fi';
import { addNewCustomer, getAllCustomers, getSalesUsers, assignCustomerToSales } from '../../api/admin';
import { useState, useEffect } from 'react';

const CustomersContent = () => {
    const [customers, setCustomers] = useState([]);
    const [salesUsers, setSalesUsers] = useState([]);
    const [customerList, setCustomerList] = useState(customers);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [assigningCustomer, setAssigningCustomer] = useState(null);
    const [selectedSales, setSelectedSales] = useState('');
    const [formData, setFormData] = useState({ 
        firstName: '', 
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        website: '',
        source: '',
        company: '',
        status: 'customer',
        assignedTo: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [customersResponse, salesResponse] = await Promise.all([
                    getAllCustomers(),
                    getSalesUsers()
                ]);
                setCustomers(customersResponse);
                setCustomerList(customersResponse);
                setSalesUsers(salesResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAddCustomer = async () => {
        setLoading(true);
        try {
            const { firstName, lastName, email, phone, address, city, state, postalCode, 
                    country, website, source, company, status, assignedTo } = formData;
            if (!firstName || !lastName || !email) {
                alert('Please fill in all required fields.');
                return;
            }
            const response = await addNewCustomer({
                firstName, 
                lastName, 
                email, 
                phone, 
                address, 
                city, 
                state, 
                postalCode, 
                country, 
                website, 
                source, 
                companyName: company, 
                status,
                assignedTo: assignedTo || null
            });
            setCustomerList([...customerList, response]);
            setFormData({ 
                firstName: '', 
                lastName: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                state: '',
                postalCode: '',
                country: '',
                website: '',
                source: '',
                company: '',
                status: 'customer',
                assignedTo: ''
            });
            setShowForm(false);
        } catch (error) {
            console.error('Error adding customer:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleAssignCustomer = async () => {
        if (!selectedSales || !assigningCustomer) return;
        
        setLoading(true);
        try {
            await assignCustomerToSales(assigningCustomer.id, Number(selectedSales));
            console.log('assigned customer to sales:', assigningCustomer.id, Number(selectedSales));
            // Update the local state to reflect the change
            const updatedCustomers = customers.map(customer => 
                customer.id === assigningCustomer.id 
                    ? { ...customer, assignedTo: selectedSales } 
                    : customer
            );
            setCustomers(updatedCustomers);
            setCustomerList(updatedCustomers);
            setAssigningCustomer(null);
            setSelectedSales('');
        } catch (error) {
            console.error('Error assigning customer:', error);
        } finally {
            setLoading(false);
        }
    }

    const getSalesUserName = (salesId) => {
        if (!salesId) return 'Unassigned';
        const salesUser = salesUsers.find(user => user.id === salesId);
        return salesUser ? `${salesUser.firstName} ${salesUser.lastName}` : 'Unknown';
    }

    return (
        <div className="space-y-6">
            {/* Assign Customer Modal */}
            {assigningCustomer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">
                            Assign {assigningCustomer.firstName} {assigningCustomer.lastName} to Sales
                        </h3>
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Select Sales Person</label>
                                <select
                                    value={selectedSales}
                                    onChange={(e) => setSelectedSales(e.target.value)}
                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Select Sales Person</option>
                                    {salesUsers.map(user => (
                                        
                                        <option key={user.id} value={user.id}>
                                            {user.firstName} {user.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    onClick={() => {
                                        setAssigningCustomer(null);
                                        setSelectedSales('');
                                    }}
                                    className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAssignCustomer}
                                    disabled={!selectedSales || loading}
                                    className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ${
                                        !selectedSales || loading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {loading ? 'Assigning...' : 'Assign'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Customers</h2>
                <div className="flex gap-3 w-full md:w-auto">
                <button onClick={
                    () => setShowForm(!showForm)
                } className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    <FiUserPlus /> Add Customer
                </button>
                <div className="relative flex-1 md:w-64">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                    type="text"
                    placeholder="Search customers..."
                    className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <button className="flex items-center gap-2 border px-3 py-2 rounded-lg hover:bg-gray-50">
                    <FiFilter /> Filter
                </button>
                </div>
            </div>

            {/* Rest of the component remains the same until the form */}
            {/* ... (previous code remains unchanged until the form) ... */}

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-lg font-semibold mb-4">Add New Customer</h3>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleAddCustomer();
                    }} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">State</label>
                                <input
                                    type="text"
                                    value={formData.state}
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Postal Code</label>
                                <input
                                    type="text"
                                    value={formData.postalCode}
                                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Country</label>
                                <input
                                    type="text"
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Website</label>
                                <input
                                    type="text"
                                    value={formData.website}
                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Source</label>
                                <input
                                    type="text"
                                    value={formData.source}
                                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Company</label>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                >
                                    <option value="customer">Customer</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="lead">Lead</option>
                                    <option value="prospect">Prospect</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Assign To</label>
                                <select
                                    value={formData.assignedTo}
                                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Unassigned</option>
                                    {salesUsers.map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user.firstName} {user.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                type="submit"
                                className={`bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors ${
                                    loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                Add Customer
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Update the table to show assigned sales and add assign button */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                        {customer.firstName} {customer.lastName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{customer.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {customer.companyName || "No company"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {getSalesUserName(customer.assignedTo)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            customer.status === 'customer' ? 'bg-green-100 text-green-800' :
                                            customer.status === 'inactive' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {new Date(customer.updatedAt).toLocaleDateString('en-US', { 
                                            year: 'numeric', 
                                            month: 'short', 
                                            day: '2-digit' 
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button 
                                            onClick={() => {
                                                setAssigningCustomer(customer);
                                                setSelectedSales(customer.assignedTo || '');
                                            }}
                                            className="flex items-center text-indigo-600 hover:text-indigo-900 mr-3"
                                        >
                                            <FiUser className="mr-1" /> Assign
                                        </button>
                                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                                        <button className="text-gray-600 hover:text-gray-900">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">{customers.length}</span> of{' '}
                        <span className="font-medium">{customers.length}</span> results
                    </div>
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                        <FiDownload /> Export
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomersContent;