import React from 'react';
import { Link } from 'react-router-dom';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-2xl font-bold">Admin Panel</div>
        <nav>
          <Link to="/admin" className="block p-4 hover:bg-gray-700">
            Dashboard
          </Link>
        </nav>
      </div>
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
