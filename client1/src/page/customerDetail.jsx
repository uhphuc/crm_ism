import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase, 
  FiEdit, FiSave, FiArrowLeft, FiDollarSign, 
  FiFileText, FiCheckCircle, FiTrendingUp, FiClock
} from 'react-icons/fi';
import { format } from 'date-fns';
import {
  getCustomerById,
  editCustomerById,
  getDealsByCustomerId,
  getInvoiceByCustomerId
} from '../api/detail'; // Adjust the import path as necessary

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [deals, setDeals] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await getCustomerById(id);
        const dealsResponse = await getDealsByCustomerId(id);
        const invoicesResponse = await getInvoiceByCustomerId(id);
        setDeals(dealsResponse);
        setInvoices(invoicesResponse);
        setCustomer(response);
        setEditedCustomer(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const updatedCustomer = await editCustomerById(id, editedCustomer);
      setCustomer(updatedCustomer);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const statusBadge = (status) => {
    const statusClasses = {
      customer: 'bg-green-100 text-green-800',
      prospect: 'bg-blue-100 text-blue-800',
      lead: 'bg-yellow-100 text-yellow-800',
      inactive: 'bg-gray-100 text-gray-800'
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const invoiceStatusBadge = (status) => {
    const statusClasses = {
      paid: 'bg-green-100 text-green-800',
      sent: 'bg-blue-100 text-blue-800',
      draft: 'bg-gray-100 text-gray-800',
      overdue: 'bg-red-100 text-red-800'
    };
    const statusIcons = {
      paid: <FiCheckCircle className="mr-1" size={14} />,
      sent: <FiFileText className="mr-1" size={14} />,
      draft: <FiFileText className="mr-1" size={14} />,
      overdue: <FiClock className="mr-1" size={14} />
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center ${statusClasses[status]}`}>
        {statusIcons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const dealStageBadge = (stage) => {
    const stageClasses = {
      closed_won: 'bg-green-100 text-green-800',
      closed_lost: 'bg-red-100 text-red-800',
      proposal: 'bg-blue-100 text-blue-800',
      negotiation: 'bg-yellow-100 text-yellow-800',
      lead: 'bg-purple-100 text-purple-800'
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${stageClasses[stage]}`}>
        {stage.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  if (!customer) return <div className="text-center p-4">Customer not found</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="mb-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FiArrowLeft className="mr-2" /> Back to Customers
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <FiUser size={24} />
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="companyName"
                  value={editedCustomer.companyName || ''}
                  onChange={handleInputChange}
                  className="text-2xl font-bold bg-transparent border-b border-blue-300 focus:outline-none"
                />
              ) : (
                <span>{customer.companyName}</span>
              )}
            </h2>
            {!editMode && (
              <p className="text-gray-600 mt-1">
                {customer.firstName} {customer.lastName}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {!editMode ? (
              <>
                {statusBadge(customer.status)}
                <button 
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 shadow-sm"
                >
                  <FiEdit size={16} /> Edit
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setEditMode(false);
                    setEditedCustomer(customer);
                  }}
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 shadow-md"
                >
                  <FiSave size={16} /> {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Customer Info Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Card */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <FiUser size={18} />
                </div>
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">First Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="firstName"
                      value={editedCustomer.firstName || ''}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="font-medium text-gray-800">{customer.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="lastName"
                      value={editedCustomer.lastName || ''}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="font-medium text-gray-800">{customer.lastName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      value={editedCustomer.email || ''}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <FiMail className="text-gray-400" />
                      <p className="font-medium text-gray-800">{customer.email}</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                  {editMode ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editedCustomer.phone || ''}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <FiPhone className="text-gray-400" />
                      <p className="font-medium text-gray-800">{customer.phone || 'Not provided'}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <FiMapPin size={18} />
                </div>
                Address Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Street Address</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="address"
                      value={editedCustomer.address || ''}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="font-medium text-gray-800">{customer.address || 'Not provided'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">City</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="city"
                      value={editedCustomer.city || ''}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="font-medium text-gray-800">{customer.city}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">State/Province</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="state"
                      value={editedCustomer.state || ''}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="font-medium text-gray-800">{customer.state}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Postal Code</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="postalCode"
                      value={editedCustomer.postalCode || ''}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="font-medium text-gray-800">{customer.postalCode}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Country</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="country"
                      value={editedCustomer.country || ''}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="font-medium text-gray-800">{customer.country}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Column */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <FiBriefcase size={18} />
                </div>
                Customer Status
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                {editMode ? (
                  <select
                    name="status"
                    value={editedCustomer.status || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="customer">Customer</option>
                    <option value="prospect">Prospect</option>
                    <option value="lead">Lead</option>
                    <option value="inactive">Inactive</option>
                  </select>
                ) : (
                  <div className="mt-1">{statusBadge(customer.status)}</div>
                )}
              </div>
            </div>

            {/* Deals Card */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-lg text-green-600">
                    <FiTrendingUp size={18} />
                  </div>
                  Recent Deals
                </h3>
                <span className="text-sm text-gray-500">{deals.length} total</span>
              </div>
              
              {deals.length > 0 ? (
                <div className="space-y-3">
                  {deals.slice(0, 3).map(deal => (
                    <div key={deal.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-800">{deal.title}</p>
                          <p className="text-sm text-gray-600">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: deal.currency
                            }).format(deal.value)}
                          </p>
                        </div>
                        <div className="text-right">
                          {dealStageBadge(deal.stage)}
                          <p className="text-xs text-gray-500 mt-1">
                            {format(new Date(deal.expectedCloseDate), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No deals found</p>
              )}
            </div>

            {/* Invoices Card */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                    <FiFileText size={18} />
                  </div>
                  Recent Invoices
                </h3>
                <span className="text-sm text-gray-500">{invoices.length} total</span>
              </div>
              
              {invoices.length > 0 ? (
                <div className="space-y-3">
                  {invoices.slice(0, 3).map(invoice => (
                    <div key={invoice.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-800">#{invoice.invoiceNumber}</p>
                          <p className="text-sm text-gray-600">
                            Issued: {format(new Date(invoice.issueDate), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <div className="text-right">
                          {invoiceStatusBadge(invoice.status)}
                          <p className="text-sm font-medium text-gray-800 mt-1">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: invoice.currency
                            }).format(invoice.totalAmount)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No invoices found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;