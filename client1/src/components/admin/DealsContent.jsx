import { FiPlus, FiTrendingUp, FiClock, FiCheck, FiX } from 'react-icons/fi';

const DealsContent = () => {
  const deals = [
    { id: 1, name: 'Enterprise Software', value: '$25,000', stage: 'Proposal', probability: '70%', expectedClose: 'Jun 15, 2023' },
    { id: 2, name: 'Marketing Campaign', value: '$12,500', stage: 'Negotiation', probability: '50%', expectedClose: 'May 30, 2023' },
    { id: 3, name: 'Website Redesign', value: '$8,000', stage: 'Qualification', probability: '30%', expectedClose: 'Jul 10, 2023' },
    { id: 4, name: 'Consulting Services', value: '$15,000', stage: 'Closed Won', probability: '100%', expectedClose: 'May 5, 2023' },
  ];

  const getStageColor = (stage) => {
    switch(stage) {
      case 'Proposal': return 'bg-blue-100 text-blue-800';
      case 'Negotiation': return 'bg-purple-100 text-purple-800';
      case 'Qualification': return 'bg-yellow-100 text-yellow-800';
      case 'Closed Won': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Deals Pipeline</h2>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          <FiPlus /> Add Deal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-700">Total Value</h3>
            <FiTrendingUp className="text-green-500" />
          </div>
          <p className="text-2xl font-bold">$60,500</p>
          <p className="text-sm text-green-600">+12% from last month</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-700">Open Deals</h3>
            <FiClock className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold">3</p>
          <p className="text-sm text-gray-500">In progress</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-700">Won Deals</h3>
            <FiCheck className="text-green-500" />
          </div>
          <p className="text-2xl font-bold">1</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-700">Lost Deals</h3>
            <FiX className="text-red-500" />
          </div>
          <p className="text-2xl font-bold">0</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Close</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deals.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{deal.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{deal.value}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStageColor(deal.stage)}`}>
                      {deal.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{deal.probability}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{deal.expectedClose}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                    <button className="text-gray-600 hover:text-gray-900">Edit</button>
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