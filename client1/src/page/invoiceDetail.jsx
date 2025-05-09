import React from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { getInvoiceById } from '../api/detail'; // Adjust the import path as necessary
import { useEffect, useState } from 'react';
import { 
  FiDollarSign, 
  FiCalendar, 
  FiFileText, 
  FiUser, 
  FiBriefcase, 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiSend,
  FiPrinter,
  FiDownload
} from 'react-icons/fi';

const InvoiceDetailPage = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await getInvoiceById(id);
        setInvoice(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const formatDateTime = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy hh:mm a');
  };

  const statusStyles = {
    draft: 'bg-gray-100 text-gray-800 border-gray-300',
    sent: 'bg-blue-100 text-blue-800 border-blue-300',
    paid: 'bg-green-100 text-green-800 border-green-300',
    overdue: 'bg-red-100 text-red-800 border-red-300',
    cancelled: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  };

  const statusIcons = {
    draft: <FiFileText className="mr-1" />,
    sent: <FiSend className="mr-1" />,
    paid: <FiCheckCircle className="mr-1" />,
    overdue: <FiClock className="mr-1" />,
    cancelled: <FiXCircle className="mr-1" />
  };

  if (isLoading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  if (!invoice) return <div className="text-center p-4">No invoice found</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Invoice #{invoice.invoiceNumber}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center ${statusStyles[invoice.status]}`}>
                  {statusIcons[invoice.status]}
                  {invoice.status.toUpperCase()}
                </span>
                <span className="text-gray-600 text-sm">
                  Created: {formatDateTime(invoice.createdAt)}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
                <FiPrinter className="mr-2" /> Print
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                <FiDownload className="mr-2" /> Download
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6 p-6">
          {/* Invoice Information */}
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                <h3 className="text-md font-semibold text-gray-700 mb-2 flex items-center">
                  <FiDollarSign className="mr-2" /> Amount
                </h3>
                <p className="text-2xl font-bold text-gray-800">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: invoice.currency
                  }).format(invoice.amount)}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-100">
                <h3 className="text-md font-semibold text-gray-700 mb-2 flex items-center">
                  <FiFileText className="mr-2" /> Tax
                </h3>
                <p className="text-2xl font-bold text-gray-800">
                  {Number(invoice.tax) * 100}%
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-xl border border-green-100">
                <h3 className="text-md font-semibold text-gray-700 mb-2 flex items-center">
                  <FiDollarSign className="mr-2" /> Total
                </h3>
                <p className="text-2xl font-bold text-gray-800">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: invoice.currency
                  }).format(invoice.totalAmount)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                  <FiCalendar className="mr-2" /> Issue Date
                </h3>
                <p className="text-lg font-medium text-gray-800">
                  {formatDate(invoice.issueDate)}
                </p>
              </div>

              <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-5 rounded-xl border border-rose-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                  <FiCalendar className="mr-2" /> Due Date
                </h3>
                <p className="text-lg font-medium text-gray-800">
                  {formatDate(invoice.dueDate)}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-sky-50 p-5 rounded-xl border border-cyan-100">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                <FiBriefcase className="mr-2" /> Related Deal
              </h3>
              <div className="space-y-2">
                <h4 className="font-bold text-gray-800">{invoice.deal.title}</h4>
                <p className="text-gray-700">
                  Value: {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: invoice.deal.currency
                  }).format(invoice.deal.value)}
                </p>
                <p className="text-gray-700">
                  Stage: <span className="capitalize">{invoice.deal.stage}</span>
                </p>
                <p className="text-gray-700">
                  Expected Close: {formatDate(invoice.deal.expectedCloseDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl border border-emerald-100">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <FiUser className="mr-2" /> Billed To
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{invoice.customer.companyName}</h4>
                  <p className="text-gray-700">{invoice.customer.firstName} {invoice.customer.lastName}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Contact</h4>
                  <p className="text-gray-700 flex items-center">
                    <FiMail className="mr-2 text-gray-500" /> {invoice.customer.email}
                  </p>
                  <p className="text-gray-700 flex items-center">
                    <FiPhone className="mr-2 text-gray-500" /> {invoice.customer.phone}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Address</h4>
                  <p className="text-gray-700 flex items-start">
                    <FiMapPin className="mr-2 mt-0.5 flex-shrink-0 text-gray-500" />
                    <span>
                      {invoice.customer.address}<br />
                      {invoice.customer.city}, {invoice.customer.state}<br />
                      {invoice.customer.postalCode}, {invoice.customer.country}
                    </span>
                  </p>
                </div>

                <div>
                  <span className={`px-3 py-1.5 text-xs rounded-full font-medium inline-flex items-center ${invoice.customer.status === 'customer' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-yellow-100 text-yellow-800 border border-yellow-200'}`}>
                    {invoice.customer.status === 'customer' ? <FiCheckCircle className="mr-1" /> : <FiClock className="mr-1" />}
                    {invoice.customer.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            {
                invoice.paymentDate && (
                    <div className="bg-gradient-to-br from-lime-50 to-green-50 p-5 rounded-xl border border-lime-100">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                        <FiCheckCircle className="mr-2" /> Payment Received
                        </h3>
                        <p className="text-gray-700">
                        Payment Date: {formatDate(invoice.paymentDate)}
                        </p>
                        <p className="text-gray-700">
                        Amount: {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: invoice.currency
                        }).format(invoice.totalAmount)}
                        </p>
                        <p className="text-gray-700">
                            Payment Note: {invoice.note ? invoice.note : 'No note provided by the customer'}
                        </p>
                    </div>
                )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailPage;