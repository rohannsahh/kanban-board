import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode}  from 'jwt-decode';

const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    const decoded = jwtDecode<{ id: string }>(token); // Decode the token
    return decoded.id; // Get userId from token
  };

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/auth/login');
    } else {
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, [router]);

  return { isAuthenticated, loading ,userId: getUserIdFromToken()};
};
