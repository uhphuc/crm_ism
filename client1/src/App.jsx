
import './App.css'
import SignIn from './page/signIn.jsx'
import MainLayout from './layouts/main'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from './page/homePage.jsx';
import AdminDashboard from './page/adminDashboard.jsx';
import SalesDashboard from './page/salesDashboard.jsx';
import CustomerDetail from './page/details/customerDetail.jsx';
import DealDetailPage from './page/details/dealDetail.jsx';
import InvoiceDetailPage from './page/details/invoiceDetail.jsx';
import ActivityDetail from './page/details/activityDetail.jsx';
import CustomerHomePage from './page/customer/customerHomePage.jsx';
import CustomerEdit from './page/customer/editCustomer.jsx';
import DealList from './page/customer/dealList.jsx';
import ActivityList from './page/customer/activityList.jsx';
import Support from './page/customer/support.jsx';
import InvoiceList from './page/customer/invoiceList.jsx';
import Register from './page/signUp.jsx';
import ProtectedRoute from './routes/protectedRoute.jsx';

import { useAuth } from './hook/useAuth.jsx';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


function App() {
  const { user } = useAuth()

  const isAdmin = user && (user.role === 'admin' || user.role === 'manager');
  const isSalesOrSupport = user && (user.role === 'sales');
  const isCustomer = user && (user.role === 'customer');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute isAllowed={isSalesOrSupport}><MainLayout /></ProtectedRoute>}>
          <Route index element={<SalesDashboard/>} />
          <Route path="customers/:id" element={<CustomerDetail />} />
          <Route path="deals/:id" element={<DealDetailPage />} />
          <Route path="activities/:id" element={<ActivityDetail />} />
          {/* Add more routes here */}
        </Route>

        <Route path='/' element={<MainLayout />}>
          <Route path="login" element={<SignIn />} />
          <Route path="signup" element={<Register />} />
        </Route>

        <Route path="/admin" element={<ProtectedRoute isAllowed={isAdmin}><MainLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="customers/:id" element={<CustomerDetail />} />
          <Route path="deals/:id" element={<DealDetailPage />} />
          <Route path="invoices/:id" element={<InvoiceDetailPage />} />
          <Route path="activities/:id" element={<ActivityDetail />} />
          {/* Add more routes here */}
        </Route>

        <Route path="/customer" element={<ProtectedRoute isAllowed={isCustomer}><MainLayout /></ProtectedRoute>}>
          <Route index element={<CustomerHomePage />} />
          <Route path="edit" element={<CustomerEdit />} />
          <Route path="home" element={<CustomerHomePage />} >
            <Route path="deals" element={<DealList />} />
            <Route path="deals/:id" element={<DealDetailPage />} />
            <Route path="invoices" element={<InvoiceList />} />
            <Route path="invoices/:id" element={<InvoiceDetailPage />} />
            <Route path="activities" element={<ActivityList />} />
            <Route path="edit" element={<CustomerEdit />} />
            <Route path="support" element={<Support />} />
          </Route>
        </Route>

        
      </Routes>
    </Router>
  )
}

export default App
