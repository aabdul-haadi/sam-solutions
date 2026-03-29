import React from 'react';

const AdminLayout: React.FC = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Sam Solutions</h1>
          <p className="text-sm text-gray-500">Admin Panel</p>
        </div>
        <nav className="mt-10">
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 bg-gray-200">
            <span className="mx-3">Dashboard</span>
          </a>
          {/* Add other navigation links here */}
        </nav>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-blue-600">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          </div>
          <div className="flex items-center">
            <button className="flex items-center text-gray-600 focus:outline-none">
              <span className="mx-3">Logout</span>
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
