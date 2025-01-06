import { GuestRoutes } from './guestRoutes';
import { AuthenticatedRoutes } from './authenticatedRoutes';
import { useAuth } from '../hooks/useAuth';

export function AppRoutes() {
  const { user } = useAuth();
  return user ? <AuthenticatedRoutes /> : <GuestRoutes />;
}
