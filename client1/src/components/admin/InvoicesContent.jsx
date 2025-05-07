import { FiFileText, FiDownload, FiPrinter, FiMail, FiSearch, FiFilter } from 'react-icons/fi';

const InvoicesContent = () => {
  const invoices = [
    { id: 'INV-001', customer: 'John Smith', date: 'May 15, 2023', dueDate: 'Jun 15, 2023', amount: '$1,250', status: 'Paid' },
    { id: 'INV-002', customer: 'Sarah Johnson', date: 'May 18, 2023', dueDate: 'Jun 18, 2023', amount: '$2,500', status: 'Pending' },
    { id: 'INV-003', customer: 'Michael Brown', date: 'May 20, 2023', dueDate: 'Jun 20, 2023', amount: '$3,750', status: 'Overdue' },
    { id: 'INV-004', customer: 'Emily Davis', date: 'May 25, 2023', dueDate: 'Jun 25, 2023', amount: '$1,800', status: 'Pending' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Invoices</h2>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <FiFileText /> Create Invoice
          </button>
          <div className="relative flex-1 md:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="flex items-center gap-2 border px-3 py-2 rounded-lg hover:bg-gray-50">
            <FiFilter /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{invoice.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{invoice.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{invoice.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{invoice.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{invoice.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                        <FiDownload size={16} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                        <FiPrinter size={16} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                        <FiMail size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> results
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded text-sm">Previous</button>
            <button className="px-3 py-1 border rounded bg-indigo-600 text-white text-sm">1</button>
            <button className="px-3 py-1 border rounded text-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicesContent;