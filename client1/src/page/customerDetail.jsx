import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCustomerById, editCustomerById, getDealsByCustomerId, getInvoiceByCustomerId } from '../api/detail';
import { FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase, FiEdit, FiSave, FiArrowLeftCircle } from 'react-icons/fi';

const CustomerDetail = () => {
  const { id } = useParams();
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
        setEditedCustomer(response); // Initialize editedCustomer with fetched data
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
    setEditedCustomer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const upperFirstCharacter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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

  if (isLoading) return <div>Loading customer details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!customer) return <div>Customer not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 bg-gray-50 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiUser /> Customer Details
          </h2>
          {!editMode ? (
            <button 
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              <FiEdit /> Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setEditMode(false);
                  setEditedCustomer(customer); // Reset changes
                }}
                className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-green-400"
              >
                <FiSave /> {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          )}
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              {editMode ? (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={editedCustomer.firstName || ''}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={editedCustomer.lastName || ''}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      name="companyName"
                      value={editedCustomer.companyName || ''}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-gray-900">{customer.firstName} {customer.lastName}</h3>
                  <p className="text-gray-500">{customer.companyName}</p>
                </>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FiMail className="text-gray-400" />
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={editedCustomer.email || ''}
                    onChange={handleInputChange}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                  />
                ) : (
                  <span>{customer.email}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="text-gray-400" />
                {editMode ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editedCustomer.phone || ''}
                    onChange={handleInputChange}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                  />
                ) : (
                  <span>{customer.phone || 'Not provided'}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
  <FiMapPin className="text-gray-400" />
  {editMode ? (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
      <input
        type="text"
        name="address"
        placeholder="Street address"
        value={editedCustomer.address || ''}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-md px-3 py-2"
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={editedCustomer.city || ''}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-md px-3 py-2"
      />
      <input
        type="text"
        name="state"
        placeholder="State/Province"
        value={editedCustomer.state || ''}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-md px-3 py-2"
      />
    </div>
  ) : (
    <span>
      {customer.address ? `${customer.address}, ${customer.city}, ${customer.state}` : 'No address'}
    </span>
  )}
</div>
              {(customer.status || editMode) && (
                <div className="flex items-center gap-2">
                  <FiUser className="text-gray-400" />
                  {editMode ? (
                    <select 
                        name="status"
                        value={editedCustomer.status || ''}
                        onChange={handleInputChange}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                    >
                        <option value="prospect">Prospect</option>
                        <option value="customer">Customer</option>
                        <option value="lead">Lead</option>
                        <option value="inactive">Inactive</option>
                    </select>
                  ) : (
                    <span>{upperFirstCharacter(customer.status)}</span>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-2">Deals</h4>
                {deals && deals.length > 0 ? (
                    <ul className="space-y-2">
                    {deals.slice(0, 3).map(deal => (
                        <li key={deal.id} className="text-sm">
                        {deal.title} - ${deal.value}
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-sm">No deals</p>
                )}
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-2">Recent Invoices</h4>
                {invoices && invoices.length > 0 ? (
                    <ul className="space-y-2">
                    {invoices.slice(0, 3).map(invoice => (
                        <li key={invoice.id} className="text-sm">
                          <span className='font-semibold'>
                            #{invoice.invoiceNumber} 
                          </span>
                            <span className='text-gray-500'> Amount: ${invoice.totalAmount}</span>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-sm">No invoices</p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;