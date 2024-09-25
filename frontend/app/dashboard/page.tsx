
'use client';

import { useAuth } from '@/hooks/useAuth';

const DashboardPage = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
      return <div>Loading...</div>; 
    }
  
    if (!isAuthenticated) {
      return null; 
    }
  
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
       <h2>hello</h2>
    </div>
  );
}

export default DashboardPage;

