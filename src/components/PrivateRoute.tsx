import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return null;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
