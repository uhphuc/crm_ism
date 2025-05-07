import { useState, useEffect } from 'react';
import { updateDealStage, getDealByUserId } from '../../api/sales';
import { useAuth } from '../../hook/useAuth';

const DealList = ({ deals, setDeals, setShowDealNotes, setSelectedDeal }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        if (!user?.id) {
          throw new Error('User ID not available');
        }
        const response = await getDealByUserId(user.id);
        setDeals(response);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchDeals();
  }, [user?.id, setDeals]);

  const handleUpdateDealStage = async (dealId, newStage) => {
    try {
      await updateDealStage(dealId, newStage);
      setDeals(deals.map(deal => 
        deal.id === dealId ? { ...deal, stage: newStage } : deal
      ));
    } catch (error) {
      console.error('Error updating deal:', error);
    }
  };

  if (loading) return <div>Loading deals...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">My Deals Pipeline</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deals.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>
                      {deal.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {deal.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {deal.customer?.firstName} {deal.customer?.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${deal.value?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={deal.stage}
                      onChange={(e) => handleUpdateDealStage(deal.id, e.target.value)}
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="lead">Lead</option>
                      <option value="qualified">Qualified</option>
                      <option value="proposal">Proposal</option>
                      <option value="negotiation">Negotiation</option>
                      <option value="closed_won">Closed Won</option>
                      <option value="closed_lost">Closed Lost</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-indigo-600 h-2.5 rounded-full"
                        style={{ width: `${deal.probability}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{deal.probability}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedDeal(deal);
                        setShowDealNotes(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Notes
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deal Stage Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {['lead', 'qualified', 'proposal', 'negotiation', 'closed_won'].map((stage) => (
          <div key={stage} className="bg-white shadow rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 capitalize">{stage.replace('_', ' ')}</h3>
            <p className="text-2xl font-semibold mt-1">
              {deals.filter(d => d.stage === stage).length}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              ${deals
                .filter(d => d.stage === stage)
                .reduce((sum, deal) => sum + (Number(deal.value) || 0), 0)
                .toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealList;