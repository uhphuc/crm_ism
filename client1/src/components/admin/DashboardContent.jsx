import { FiTrendingUp, FiUsers, FiDollarSign, FiActivity, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import { Bar, Pie } from 'react-chartjs-2';
import { getAllCustomers, getAllDeals, getAllActivities, getAllInvoices } from '../../api/admin';
import { useEffect, useState } from 'react';
import ActivityList from './ActivityList';

const DashboardContent = () => {
  // Chart data
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [12000, 19000, 15000, 20000, 18000, 24000],
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
    ],
  };

  const dealStageData = {
    labels: ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won'],
    datasets: [
      {
        data: [12, 8, 6, 4, 3],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(234, 179, 8, 0.7)',
          'rgba(249, 115, 22, 0.7)',
          'rgba(16, 185, 129, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const [stats, setStats] = useState({
    totalRevenue: 0,
    newCustomers: 0,
    activeDeals: 0,
    todayActivities: 0,
    revenueChange: 0,
    customerChange: 0,
    dealsChange: 0,
    activitiesChange: 0
  });

  const [customers, setCustomers] = useState([]);
  const [deals, setDeals] = useState([]);
  const [activities, setActivities] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customers = await getAllCustomers();
        const deals = await getAllDeals();
        const activities = await getAllActivities();
        const invoices = await getAllInvoices();
        setCustomers(customers);
        setDeals(deals);
        const sortedInvoices = invoices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const sortedActivities = activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setActivities(sortedActivities);
        setInvoices(sortedInvoices);
        console.log(customers, deals);
        const totalRevenue = deals.reduce((sum, deal) => sum + (Number(deal.value) || 0), 0);        
        const newCustomers = customers.filter(customer => new Date(customer.createdAt) >= new Date(new Date() - 30 * 24 * 60 * 60 * 1000)).length;
        const activeDeals = deals.filter(deal => (deal.stage !== 'closed_won' || deal.stage !== 'closed_lost' )).length;
        const todayActivities = activities.filter(activity => new Date(activity.createdAt) >= new Date(new Date().setHours(0, 0, 0, 0))).length;
        const revenueChange = ((totalRevenue - stats.totalRevenue) / stats.totalRevenue) * 100 || 0;
        const customerChange = ((newCustomers - stats.newCustomers) / stats.newCustomers) * 100 || 0;
        const dealsChange = ((activeDeals - stats.activeDeals) / stats.activeDeals) * 100 || 0;
        const activitiesChange = ((todayActivities - stats.todayActivities) / stats.todayActivities) * 100 || 0;
        setStats({
          totalRevenue,
          newCustomers,
          activeDeals,
          todayActivities,
          revenueChange,
          customerChange,
          dealsChange,
          activitiesChange
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome back, Admin!</h1>
        <p className="opacity-90">Here's what's happening with your CRM today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${parseInt(stats.totalRevenue).toLocaleString()}`}
          change={`${stats.revenueChange.toFixed(2)}%`}
          isPositive={stats.revenueChange > 0}
          icon={<FiDollarSign className="text-green-500" size={24} />}
        />

        <StatCard 
          title="New Customers" 
          value={`${stats.newCustomers}`}
          change={`${stats.customerChange.toFixed(2)}%`}
          isPositive={true} 
          icon={<FiUsers className="text-blue-500" size={24} />}
        />
        <StatCard 
          title="Active Deals" 
          value={`${stats.activeDeals}`} 
          change={`${stats.dealsChange.toFixed(2)}%`}
          isPositive={false} 
          icon={<FiTrendingUp className="text-yellow-500" size={24} />}
        />
        <StatCard
          title="Today's Activities" 
          value={`${stats.todayActivities}`} 
          change={`${stats.activitiesChange.toFixed(2)}%`}
          isPositive={true} 
          icon={<FiActivity className="text-red-500" size={24} />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Sales Performance</h3>
            <select className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64">
            <Bar 
              data={salesData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return '$' + value.toLocaleString();
                      }
                    }
                  }
                }
              }} 
            />
          </div>
        </div>

        {/* Deal Pipeline */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Deal Pipeline</h3>
          <div className="h-64">
            <Pie 
              data={dealStageData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Activities - Replaced with ActivityList */}
        <div className="bg-white rounded-lg shadow">
          <ActivityList />
        </div>

        {/*List 3 Invoices */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3>
            <span className="text-lg font-semibold mb-4">Recent Invoices</span>
          </h3>
          <div className="space-y-4">
            {
              invoices.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No invoices found. Create one to get started!
                </div>
              ) : (
                invoices.slice(0, 3).map((invoice) => (
                  <InvoiceItem key={invoice.id} invoice={invoice} />
                ))
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components (keep these the same as before)
const StatCard = ({ title, value, change, isPositive, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          <p className={`text-sm mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {change} {isPositive ? '↑' : '↓'}
          </p>
        </div>
        <div className="h-12 w-12 rounded-full bg-opacity-20 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
};

const InvoiceItem = ({ invoice }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-500';
      case 'sent':
        return 'bg-blue-100 text-blue-500';
      case 'overdue':
        return 'bg-yellow-100 text-yellow-500';
      case 'cancelled':
        return 'bg-red-100 text-red-500';
      default:
        return 'text-gray-500';
    }
  };
  const getFormattedDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      case 'VND': 
        return '₫';
      case 'JPY':
        return '¥';
      default:
        return currency;
    }
  }

  return (
    <div className="flex justify-between items-center border-b py-4">
      <div>
        <p className="text-sm font-medium">{invoice.invoiceNumber}</p>
        <p className="text-xs text-gray-500">{invoice.deal.title}</p>
        <p className="text-xs text-gray-500 font-semibold">{invoice.customer.firstName + ' ' + invoice.customer.lastName}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(invoice.status)}`}>{invoice.status}</span>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold">
          {getCurrencySymbol(invoice.currency)+parseInt(invoice.amount).toLocaleString()}</p>
        <p className="text-xs text-gray-500">
          Due: {getFormattedDate(invoice.dueDate)}
        </p>
      </div>
    </div>
  );
}


export default DashboardContent;