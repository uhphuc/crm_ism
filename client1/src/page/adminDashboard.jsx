import { useState } from 'react';
import {
  FiHome,
  FiUsers,
  FiDollarSign,
  FiFileText,
  FiCalendar,
  FiClipboard,
  FiSettings,
  FiMenu,
  FiBell,
  FiUser,
  FiSearch,
  FiChevronDown
} from 'react-icons/fi';
import DashboardContent from '../components/admin/DashboardContent';
import CustomersContent from '../components/admin/CustomersContent';
import DealsContent from '../components/admin/DealsContent';
import InvoicesContent from '../components/admin/InvoicesContent';
import ActivitiesContent from '../components/admin/ActivitiesContent';
import NotesContent from '../components/admin/NotesContent';
import SettingsContent from '../components/admin/SettingsContent';

import { useAuth } from '../hook/useAuth';


const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState('dashboard');
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-indigo-800 text-white ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">CRM Admin</h1>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-indigo-700"
          >
            <FiMenu size={20} />
          </button>
        </div>
        
        <nav className="mt-8">
          <NavItem 
            icon={<FiHome size={20} />} 
            text="Dashboard" 
            active={activeNav === 'dashboard'}
            onClick={() => setActiveNav('dashboard')}
            expanded={sidebarOpen}
          />
          <NavItem 
            icon={<FiUsers size={20} />} 
            text="Customers" 
            active={activeNav === 'customers'}
            onClick={() => setActiveNav('customers')}
            expanded={sidebarOpen}
          />
          <NavItem 
            icon={<FiDollarSign size={20} />} 
            text="Deals" 
            active={activeNav === 'deals'}
            onClick={() => setActiveNav('deals')}
            expanded={sidebarOpen}
          />
          <NavItem 
            icon={<FiFileText size={20} />} 
            text="Invoices" 
            active={activeNav === 'invoices'}
            onClick={() => setActiveNav('invoices')}
            expanded={sidebarOpen}
          />
          <NavItem 
            icon={<FiCalendar size={20} />} 
            text="Activities" 
            active={activeNav === 'activities'}
            onClick={() => setActiveNav('activities')}
            expanded={sidebarOpen}
          />
          <NavItem 
            icon={<FiClipboard size={20} />} 
            text="Notes" 
            active={activeNav === 'notes'}
            onClick={() => setActiveNav('notes')}
            expanded={sidebarOpen}
          />
          <div className="mt-8">
            <NavItem 
              icon={<FiSettings size={20} />} 
              text="Settings" 
              active={activeNav === 'settings'}
              onClick={() => setActiveNav('settings')}
              expanded={sidebarOpen}
            />
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <header className="bg-indigo-800 shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-white">
              {activeNav.charAt(0).toUpperCase() + activeNav.slice(1)}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <FiUser className="text-indigo-600" />
              </div>
              {sidebarOpen && (
                <div className="flex items-center text-white space-x-2">
                  <span className="text-sm font-medium">{user.firstName + " " + user.lastName}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeNav === 'dashboard' && <DashboardContent />}
          {activeNav === 'customers' && <CustomersContent />}
          {activeNav === 'deals' && <DealsContent />}
          {activeNav === 'invoices' && <InvoicesContent />}
          {activeNav === 'activities' && <ActivitiesContent />}
          {activeNav === 'notes' && <NotesContent />}
          {activeNav === 'settings' && <SettingsContent />}
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, active, onClick, expanded }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full p-4 ${active ? 'bg-indigo-700' : 'hover:bg-indigo-700'} transition-colors duration-200`}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      {expanded && (
        <span className="ml-3">
          {text}
        </span>
      )}
    </button>
  );
};

export default AdminDashboard;