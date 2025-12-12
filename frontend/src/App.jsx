import { AuthProvider } from './routes/AuthRoutes.routes';
import { ProtectedRoute } from './routes/AuthRoutes.routes';

import './App.css'

export default function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    </AuthProvider>
  );
}