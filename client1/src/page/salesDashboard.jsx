import { useState, useEffect } from 'react';
import SalesHeader from '../components/sales/salesHeader';
import SalesTabs from '../components/sales/salesTabs';
import CustomerList from '../components/sales/customerList';
import DealList from '../components/sales/DealList';
import ActivityList from '../components/sales/activityList';
import CustomerFormModal from '../components/sales/customerFormModal';
import DealFormModal from '../components/sales/dealFormModal';
import DealNotesSidebar from '../components/sales/customerNotesSidebar'; // Changed to DealNotesSidebar
import { useAuth } from '../hook/useAuth';
import { getMyCustomers, getDealsByCustomerId } from '../api/sales';

const SalesDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [deals, setDeals] = useState([]);
  const [activeTab, setActiveTab] = useState('customers');
  const [loading, setLoading] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showDealNotes, setShowDealNotes] = useState(false); // Changed from showCustomerNotes
  const [showDealForm, setShowDealForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const { user } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (!user?.id) {
          throw new Error('User ID not available');
        }
        
        const data = await getMyCustomers(user.id);
        setCustomers(data);
        
        // Fetch deals for all customers
        const allDeals = [];
        for (const customer of data) {
          const customerDeals = await getDealsByCustomerId(customer.id);
          allDeals.push(...customerDeals);
        }
        setDeals(allDeals);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <SalesHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <SalesTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === 'customers' && (
          <CustomerList 
            customers={customers} 
            loading={loading}
            setShowCustomerForm={setShowCustomerForm}
            setSelectedCustomer={setSelectedCustomer}
            setShowDealForm={setShowDealForm}
          />
        )}
        
        {activeTab === 'deals' && (
          <DealList 
            deals={deals} 
            customers={customers}
            setDeals={setDeals}
            setSelectedDeal={setSelectedDeal}
            setShowDealNotes={setShowDealNotes}
          />
        )}
        
        {activeTab === 'activities' && <ActivityList />}
      </main>

      {showCustomerForm && (
        <CustomerFormModal 
          setShowCustomerForm={setShowCustomerForm}
          setCustomers={setCustomers}
        />
      )}

      {showDealForm && selectedCustomer && (
        <DealFormModal 
          selectedCustomer={selectedCustomer}
          setShowDealForm={setShowDealForm}
          setDeals={setDeals}
        />
      )}

      {showDealNotes && selectedDeal && (
        <DealNotesSidebar 
          selectedDeal={selectedDeal}
          setShowDealNotes={setShowDealNotes}
          setSelectedDeal={setSelectedDeal}
        />
      )}
    </div>
  );
};

export default SalesDashboard;