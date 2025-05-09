import { FiPlus, FiTrendingUp, FiClock, FiCheck, FiX, FiFileText, FiFilter, FiChevronUp, FiChevronDown, FiArrowUpCircle, FiCloud } from 'react-icons/fi';
import { getAllDeals, createInvoice } from '../../api/admin';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DealsContent = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [stageFilter, setStageFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    status: 'sent',
    amount: 0,
    customerId: null,
    dueDate: new Date().toISOString().split('T')[0],
    currency: 'USD',
    dealId: null,
  });
  const [showInvoiceVerify, setShowInvoiceVerify] = useState(false);

  const handleNavigateTo = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await getAllDeals();
        setDeals(response);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const setCurrencySign = (value) => {
    switch (value) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'VND': return '₫';
      case 'JPY': return '¥';
      case 'GBP': return '£';
      default: return '$';
    }
  };

  const getFormattedDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const getStageColor = (stage) => {
    switch(stage) {
      case 'lead': return 'bg-pink-100 text-pink-800';
      case 'proposal': return 'bg-blue-100 text-blue-800';
      case 'negotiation': return 'bg-purple-100 text-purple-800';
      case 'qualified': return 'bg-yellow-100 text-yellow-800';
      case 'closed_won': return 'bg-green-100 text-green-800';
      default: return 'bg-red-100 text-gray-800';
    }
  };

  const getStageIcon = (stage) => {
    switch(stage) {
      case 'lead': return <FiArrowUpCircle className="text-pink-500" />;
      case 'proposal': return <FiFileText className="text-blue-500" />;
      case 'negotiation': return <FiCloud className="text-purple-500" />;
      case 'qualified': return <FiClock className="text-yellow-500" />;
      case 'closed_won': return <FiCheck className="text-green-500" />;
      default: return <FiX className="text-gray-500" />;
    }
  };

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

  const sortedAndFilteredDeals = () => {
    let filtered = [...deals];
    
    // Apply stage filter
    if (stageFilter !== 'all') {
      filtered = filtered.filter(deal => deal.stage === stageFilter);
    }
    
    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filtered;
  };

  const allStages = [...new Set(deals.map(deal => deal.stage))];

  const handleCreateInvoice = async ( formData) => {
    try {
      const response = await createInvoice( formData);
      console.log('Invoice created:', response);
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Deals Pipeline</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <FiFilter /> Filters
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Stages</option>
                {allStages.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}


      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-700">Total Value</h3>
            <FiTrendingUp className="text-green-500" />
          </div>
          <p className="text-2xl font-bold">
            {setCurrencySign(deals[0]?.currency) + deals.reduce((acc, deal) => acc + Number(deal.value), 0).toLocaleString()}
          </p>
          <p className="text-sm text-green-600">
            
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-700">Open Deals</h3>
            <FiClock className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold">
            {deals.filter(deal => deal.stage !== ('closed_won' || 'closed_lost')).length}
          </p>
          <p className="text-sm text-gray-500">In progress</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-700">Won Deals</h3>
            <FiCheck className="text-green-500" />
          </div>
          <p className="text-2xl font-bold">
            {deals.filter(deal => deal.stage === 'closed_won').length}
          </p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-700">Lost Deals</h3>
            <FiX className="text-red-500" />
          </div>
          <p className="text-2xl font-bold">
            {deals.filter(deal => deal.stage === 'closed_lost').length}
          </p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
      </div>

      {
        showInvoiceVerify && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-semibold mb-4">Create Invoice</h3>
              <p>Are you sure you want to create an invoice for this deal?</p>
              <div className="flex justify-end mt-4">
                <button 
                  onClick={() => setShowInvoiceVerify(false)} 
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    handleCreateInvoice(formData);
                    setFormData({
                      status: 'sent',
                      customerId: null,
                      amount: 0,
                      dueDate: new Date().toISOString().split('T')[0],
                      currency: 'USD',
                      dealId: null,
                    });
                    setShowInvoiceVerify(false);
                  }} 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )
      }


      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal Name</th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('value')}
                >
                  Value {getSortIcon('value')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('probability')}
                >
                  Probability {getSortIcon('probability')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Close</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedAndFilteredDeals().map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{deal.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{setCurrencySign(deal.currency) + deal.value}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStageColor(deal.stage)}`}>
                        {deal.stage}
                      </span>
                      {getStageIcon(deal.stage)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{deal.probability + '%'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{getFormattedDate(deal.expectedCloseDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                    onClick={() => handleNavigateTo(`/admin/deals/${deal.id}`)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                    {deal.invoices.length === 0 ? (
                      <button
                      onClick={async () => {
                        setFormData({
                          status: 'sent',
                          customerId: deal.customer.id, 
                          amount: deal.value, 
                          dueDate: deal.expectedCloseDate, 
                          currency: deal.currency,
                          dealId: deal.id,
                        });
                        setShowInvoiceVerify(true);
                      }}
                    className="text-gray-600 hover:text-gray-900">Invoice</button>
                  ) : (
                    <button className="text-gray-600 hover:text-gray-900">View Invoice</button>
                  )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DealsContent;