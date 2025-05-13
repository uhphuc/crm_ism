import { Link, Outlet, useLocation } from "react-router-dom";
import { FaHome, FaProjectDiagram, FaUserEdit, FaHeadset, FaChartLine } from "react-icons/fa";
import { FiDollarSign, FiFileText } from "react-icons/fi";

const HomeContent = ({ customer, setCustomer }) => {
  const location = useLocation();
  
  // Check which route is active for styling and functionality
  const activePath = location.pathname.split('/').slice(0, 4).join('/');
  const isActive = (path) => {
    return activePath === path;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-indigo-500 to-purple-300 text-white shadow-lg">
        <div className="p-4 border-b bg-indigo-500">
          <h2 className="text-xl font-semibold">{customer.firstName + ' ' + customer.lastName}</h2>
          <p className="text-sm text-blue-200">{customer.email}</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/customer/home/deals"
                className={`flex items-center p-3 rounded-md transition-colors ${isActive('/customer/home/deals') ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              >
                <FiDollarSign className="mr-3" />
                Deals
              </Link>
            </li>
            <li>
              <Link
                to="/customer/home/invoices"
                className={`flex items-center p-3 rounded-md transition-colors ${isActive('/customer/home/invoices') ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              >
                <FiFileText className="mr-3" />
                Invoices
              </Link>
            </li>
            <li>
              <Link
                to="/customer/home/activities"
                className={`flex items-center p-3 rounded-md transition-colors ${isActive('/customer/home/activities') ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              >
                <FaChartLine className="mr-3" />
                Activities
              </Link>
            </li>
            <li>
              <Link
                to="/customer/home/edit"
                className={`flex items-center p-3 rounded-md transition-colors ${isActive('/customer/home/edit') ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              >
                <FaUserEdit className="mr-3" />
                Profile Settings
              </Link>
            </li>
            <li>
              <Link
                to="/customer/home/support"
                className={`flex items-center p-3 rounded-md transition-colors ${isActive('/customer/home/support') ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              >
                <FaHeadset className="mr-3" />
                Support
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet /> {/* This will render the child routes */}
        </div>
      </div>
    </div>
  );
};

export default HomeContent;