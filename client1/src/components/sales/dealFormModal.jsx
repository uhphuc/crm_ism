import { useState } from 'react';
import { createDeal } from '../../api/sales';


const DealFormModal = ({ selectedCustomer, setShowDealForm, setDeals }) => {
  const [formData, setFormData] = useState({
    title: '',
    customerId: '',
    value: '',
    expectedCloseDate: '',
    currency: 'USD',
    stage: 'lead',
    probability: 30
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newDeal = await createDeal({
        ...formData,
        customerId: selectedCustomer.id,
        value: Number(formData.value),
        probability: Number(formData.probability),
        salesRepId: selectedCustomer.assignedTo
      });
      setDeals(prev => [...prev, newDeal]);
      setShowDealForm(false);
    } catch (error) {
      console.error('Error creating deal:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          New Deal for {selectedCustomer.firstName} {selectedCustomer.lastName}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Deal Name</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
            <input
              type="number"
              value={formData.value}
              onChange={(e) => setFormData({...formData, value: e.target.value})}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Currency</label>
            <select
              value={formData.currency}
              onChange={(e) => setFormData({...formData, currency: e.target.value})}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
              <option value="AUD">AUD</option>
              <option value="VND">VND</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Expected Close Date</label>
            <input
              type="date"
              value={formData.expectedCloseDate}
              onChange={(e) => setFormData({...formData, expectedCloseDate: e.target.value})}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stage</label>
            <select
              value={formData.stage}
              onChange={(e) => setFormData({...formData, stage: e.target.value})}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="lead">Lead</option>
              <option value="qualified">Qualified</option>
              <option value="proposal">Proposal</option>
              <option value="negotiation">Negotiation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Probability (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.probability}
              onChange={(e) => setFormData({...formData, probability: e.target.value})}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowDealForm(false)}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating...' : 'Create Deal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DealFormModal;