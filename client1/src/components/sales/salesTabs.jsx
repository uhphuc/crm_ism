import { FiUsers, FiDollarSign, FiCalendar } from 'react-icons/fi';

const SalesTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => setActiveTab('customers')}
          className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'customers'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <FiUsers className="inline mr-2" />
          My Customers
        </button>
        <button
          onClick={() => setActiveTab('deals')}
          className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'deals'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <FiDollarSign className="inline mr-2" />
          My Deals
        </button>
        <button
          onClick={() => setActiveTab('activities')}
          className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'activities'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <FiCalendar className="inline mr-2" />
          Activities
        </button>
      </nav>
    </div>
  );
};

export default SalesTabs;