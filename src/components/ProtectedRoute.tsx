
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Simply render children without any authentication checks
  return <>{children}</>;
};

export default ProtectedRoute;
