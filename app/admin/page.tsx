'use client';

import { useState, useEffect } from 'react';
import LoginPage from '@/components/admin/LoginPage';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductsManager from '@/components/admin/ProductsManager';
import NewsManager from '@/components/admin/NewsManager';
import TechnologiesManager from '@/components/admin/TechnologiesManager';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState('products');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/admin/api/auth');
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/admin/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <AdminLayout
      activePage={activePage}
      onPageChange={setActivePage}
      onLogout={handleLogout}
    >
      {activePage === 'products' && <ProductsManager />}
      {activePage === 'technologies' && <TechnologiesManager />}
      {activePage === 'news' && <NewsManager />}
    </AdminLayout>
  );
}
