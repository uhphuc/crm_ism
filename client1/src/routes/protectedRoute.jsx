import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAllowed, children, redirectTo = '/login' }) => {
  return isAllowed ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;