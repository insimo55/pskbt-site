'use client';

import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  activePage: string;
  onPageChange: (page: string) => void;
}

const pages = [
  { id: 'products', label: 'Продукты', icon: '📦' },
  { id: 'technologies', label: 'Технологии', icon: '⚙️' },
  { id: 'news', label: 'Новости', icon: '📰' },
];

export default function AdminLayout({
  children,
  onLogout,
  activePage,
  onPageChange,
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white shadow-lg transform transition-transform z-40 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold">Admin</h1>
          <p className="text-slate-400 text-sm">ПСК "Буртехнологии"</p>
        </div>

        <nav className="p-4 space-y-2">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => {
                onPageChange(page.id);
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center space-x-3 ${
                activePage === page.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="text-xl">{page.icon}</span>
              <span>{page.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <button
            onClick={onLogout}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center justify-center space-x-2"
          >
            <FiLogOut />
            <span>Выход</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition"
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <h2 className="text-lg font-semibold text-slate-800 ml-2">
              {pages.find((p) => p.id === activePage)?.label || 'Dashboard'}
            </h2>
            <div className="w-8" />
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
