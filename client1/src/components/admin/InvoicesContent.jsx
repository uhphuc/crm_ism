import { FiFileText, FiDownload, FiPrinter, FiMail, FiSearch, FiFilter, FiChevronUp, FiChevronDown, FiEye } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { getAllInvoices, updateInvoiceStatus } from '../../api/admin';
import { useNavigate } from 'react-router';

const InvoicesContent = () => {
  const [invoices, setInvoices] = useState([]);
  const [originalInvoices, setOriginalInvoices] = useState([]); // Store original data
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Sorting
  const [sortConfig, setSortConfig] = useState({ key: 'issueDate', direction: 'desc' });

  // Filtering
  const [statusFilter, setStatusFilter] = useState('all');
  const [customerFilter, setCustomerFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setIsLoading(true);
        const response = await getAllInvoices();
        setInvoices(response);
        setOriginalInvoices(response); // Store original data
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  // Apply sorting, filtering, and search
  useEffect(() => {
    let result = [...originalInvoices];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(invoice => 
        invoice.invoiceNumber.toLowerCase().includes(query) ||
        `${invoice.customer.firstName} ${invoice.customer.lastName}`.toLowerCase().includes(query) ||
        invoice.status.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(invoice => invoice.status === statusFilter);
    }

    // Apply customer filter (if implemented)
    if (customerFilter !== 'all') {
      result = result.filter(invoice => Number(invoice.customer.id) === customerFilter);
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        // Handle date sorting
        if (sortConfig.key.includes('Date')) {
          const dateA = new Date(a[sortConfig.key]);
          const dateB = new Date(b[sortConfig.key]);
          return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
        }
        // Handle numeric sorting
        if (sortConfig.key === 'amount') {
          return sortConfig.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
        }
        // Handle string sorting
        const valueA = a[sortConfig.key].toString().toLowerCase();
        const valueB = b[sortConfig.key].toString().toLowerCase();
        if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setInvoices(result);
  }, [originalInvoices, searchQuery, statusFilter, customerFilter, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? 
      <FiChevronUp className="ml-1 inline" /> : 
      <FiChevronDown className="ml-1 inline" />;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormattedDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  // Get unique statuses for filter dropdown
  const statusOptions = [...new Set(originalInvoices.map(invoice => invoice.status))];
  // Get unique customers for filter dropdown
  const customerOptions = [...new Map(
    originalInvoices.map(invoice => [
      invoice.customer.id, 
      `${invoice.customer.firstName} ${invoice.customer.lastName}`
    ])
  ).entries()];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Invoices</h2>
        <div className="flex gap-3 w-full md:w-auto">
        
          <div className="relative flex-1 md:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 border px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            <FiFilter /> Filter
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Statuses</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
              <select
                value={customerFilter}
                onChange={(e) => setCustomerFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Customers</option>
                {customerOptions.map(([id, name]) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </div> */}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('invoiceNumber')}
                >
                  Invoice # {getSortIcon('invoiceNumber')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Customer 
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('issueDate')}
                >
                  Date {getSortIcon('issueDate')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('dueDate')}
                >
                  Due Date {getSortIcon('dueDate')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('amount')}
                >
                  Amount {getSortIcon('amount')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('status')}
                >
                  Status {getSortIcon('status')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-red-500">{error}</td>
                </tr>
              ) : invoices.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No invoices found</td>
                </tr>
              ) : (
                invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{invoice.invoiceNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {invoice.customer.firstName + ' ' + invoice.customer.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {getFormattedDate(invoice.issueDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {getFormattedDate(invoice.dueDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      ${invoice.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* can change the status to db with the enum ('draft','sent','paid','overdue','cancelled') here and prevent the change if the status is paid */}
                      {
                        invoice.status !== 'paid' ? (
                          <select
                            value={invoice.status}
                            onChange={(e) => updateInvoiceStatus(invoice.id, e.target.value)}
                            className={`px-2 py-1 rounded-full ${getStatusColor(invoice.status)}`}
                          >
                            {['draft', 'sent', 'paid', 'overdue', 'cancelled'].map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className={`px-2 py-1 rounded-full ${getStatusColor(invoice.status)}`}>
                            {invoice.status}
                          </span>
                        )
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-center gap-2">
                        <button
                        onClick={
                          () => navigate(`/admin/invoices/${invoice.id}`)
                        }
                        className='text-gray-500 hover:text-gray-700'>
                          <FiEye className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination would go here */}
      </div>
    </div>
  );
};

export default InvoicesContent;