
import './App.css'
import SignIn from './page/signIn.jsx'
import MainLayout from './layouts/main'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from './page/homePage.jsx';
import AdminDashboard from './page/adminDashboard.jsx';
import SalesDashboard from './page/salesDashboard.jsx';
import ProtectedRoute from './routes/protectedRoute.jsx';
import { useAuth } from './hook/useAuth.jsx';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


function App() {
  const { user } = useAuth()

  const isAdmin = user && (user.role === 'admin' || user.role === 'manager');
  const isSalesOrSupport = user && (user.role === 'sales' || user.role === 'support');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute isAllowed={isSalesOrSupport}><MainLayout /></ProtectedRoute>}>
          <Route index element={<SalesDashboard/>} />
          {/* Add more routes here */}
        </Route>
        <Route path='login' element={<SignIn />} />

        <Route path="/admin" element={<ProtectedRoute isAllowed={isAdmin}><MainLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
        </Route>

        
      </Routes>
    </Router>
  )
}

export default App
