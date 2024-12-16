import React from 'react';
import { LogOut, UserCircle } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Employee Attendance System
          </h1>
          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <UserCircle className="w-6 h-6 text-gray-600" />
                <span className="text-gray-700">
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};