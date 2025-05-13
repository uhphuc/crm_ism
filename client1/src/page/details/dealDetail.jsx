import React from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { getDealById } from '../../api/detail';
import { useEffect, useState } from 'react';
import { 
  FiDollarSign, 
  FiCalendar, 
  FiRefreshCw, 
  FiUser, 
  FiBriefcase, 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiTrendingUp,
  FiInfo,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi';

const DealDetailPage = () => {
  const { id } = useParams();
  const [deal, setDeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const response = await getDealById(id);
        setDeal(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDeal();
  }, [id]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'PPPpp');
  };

  const stageStyles = {
    proposal: 'bg-blue-100 text-blue-800 border-blue-300',
    qualified: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    negotiation: 'bg-purple-100 text-purple-800 border-purple-300',
    lead: 'bg-pink-100 text-pink-800 border-pink-300',
    closed_won: 'bg-green-100 text-green-800 border-green-300',
    closed_lost: 'bg-red-100 text-red-800 border-red-300'
  };

  const statusIcons = {
    lead: <FiTrendingUp className="mr-1" />,
    prospect: <FiInfo className="mr-1" />,
    negotiation: <FiRefreshCw className="mr-1" />,
    closed_won: <FiCheckCircle className="mr-1" />,
    closed_lost: <FiXCircle className="mr-1" />
  };

  if (isLoading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  if (!deal) return <div className="text-center p-4">No deal found</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{deal.title}</h1>
              <p className="text-gray-600 flex items-center">
                <span className="bg-gray-200 px-2 py-1 rounded-md text-xs mr-2">ID: {deal.id}</span>
                <span className="text-sm">Created: {formatDate(deal.createdAt)}</span>
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center ${stageStyles[deal.stage] || 'bg-gray-100 text-gray-800 border-gray-300'}`}>
              {statusIcons[deal.stage]}
              {deal.stage.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6 p-6">
          {/* Deal Information */}
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3 text-blue-600">
                    <FiDollarSign size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700">Deal Value</h3>
                </div>
                <p className="text-3xl font-bold text-gray-800">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: deal.currency
                  }).format(deal.value)}
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-5 rounded-xl border border-green-100">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-green-100 rounded-lg mr-3 text-green-600">
                    <FiTrendingUp size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700">Probability</h3>
                </div>
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${deal.probability > 70 ? 'bg-green-500' : deal.probability > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                      style={{ width: `${deal.probability}%` }}
                    ></div>
                  </div>
                  <p className="text-right font-bold text-gray-700">{deal.probability}% chance to win</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-5 rounded-xl border border-purple-100">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3 text-purple-600">
                    <FiCalendar size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700">Expected Close Date</h3>
                </div>
                <p className="text-lg font-medium text-gray-800">{formatDate(deal.expectedCloseDate)}</p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-100">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-amber-100 rounded-lg mr-3 text-amber-600">
                    <FiRefreshCw size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700">Last Updated</h3>
                </div>
                <p className="text-lg font-medium text-gray-800">{formatDate(deal.updatedAt)}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-sky-50 p-5 rounded-xl border border-cyan-100">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-cyan-100 rounded-lg mr-3 text-cyan-600">
                  <FiUser size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-700">Sales Representative</h3>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {deal.user.firstName.charAt(0)}{deal.user.lastName.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{deal.user.firstName} {deal.user.lastName}</p>
                  <p className="text-gray-600 flex items-center">
                    <FiMail className="mr-1" size={14} /> {deal.user.email}
                  </p>
                  <p className="text-sm text-gray-500 capitalize flex items-center">
                    <FiBriefcase className="mr-1" size={14} /> {deal.user.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl border border-emerald-100">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg mr-3 text-emerald-600">
                  <FiBriefcase size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-700">Customer Information</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{deal.customer.companyName}</h4>
                  <p className="text-gray-700">{deal.customer.firstName} {deal.customer.lastName}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Contact</h4>
                  <p className="text-gray-700 flex items-center">
                    <FiMail className="mr-2 text-gray-500" /> {deal.customer.email}
                  </p>
                  <p className="text-gray-700 flex items-center">
                    <FiPhone className="mr-2 text-gray-500" /> {deal.customer.phone}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Address</h4>
                  <p className="text-gray-700 flex items-start">
                    <FiMapPin className="mr-2 mt-0.5 flex-shrink-0 text-gray-500" />
                    <span>
                      {deal.customer.address}<br />
                      {deal.customer.city}, {deal.customer.state}<br />
                      {deal.customer.postalCode}, {deal.customer.country}
                    </span>
                  </p>
                </div>

                <div>
                  <span className={`px-3 py-1.5 text-xs rounded-full font-medium inline-flex items-center ${deal.customer.status === 'customer' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-yellow-100 text-yellow-800 border border-yellow-200'}`}>
                    {deal.customer.status === 'customer' ? <FiCheckCircle className="mr-1" /> : <FiInfo className="mr-1" />}
                    {deal.customer.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDetailPage;