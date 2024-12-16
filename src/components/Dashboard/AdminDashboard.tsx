import React, { useState } from 'react';
import { Users, Building2, MapPin, Clock } from 'lucide-react';
import { LocationManagement } from '../Admin/LocationManagement';
import { DepartmentManagement } from '../Admin/DepartmentManagement';
import { EmployeeManagement } from '../Admin/EmployeeManagement';
import { DataExport } from '../Admin/DataExport';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { useDepartmentStore } from '../../store/useDepartmentStore';
import { useLocationStore } from '../../store/useLocationStore';
import { useAttendanceStore } from '../../store/useAttendanceStore';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { employees } = useEmployeeStore();
  const { departments } = useDepartmentStore();
  const { locations } = useLocationStore();
  const { getActiveRecords } = useAttendanceStore();

  const stats = {
    totalEmployees: employees.length,
    totalLocations: locations.length,
    totalDepartments: departments.length,
    activeCheckIns: getActiveRecords().length,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="w-12 h-12 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Employees</h3>
              <p className="text-3xl font-bold text-gray-700">{stats.totalEmployees}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <MapPin className="w-12 h-12 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Locations</h3>
              <p className="text-3xl font-bold text-gray-700">{stats.totalLocations}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Building2 className="w-12 h-12 text-purple-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Departments</h3>
              <p className="text-3xl font-bold text-gray-700">{stats.totalDepartments}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Clock className="w-12 h-12 text-orange-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Active Check-ins</h3>
              <p className="text-3xl font-bold text-gray-700">{stats.activeCheckIns}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('locations')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'locations'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Locations
            </button>
            <button
              onClick={() => setActiveTab('departments')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'departments'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Departments
            </button>
            <button
              onClick={() => setActiveTab('employees')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'employees'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Employees
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'reports'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Reports
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'locations' && <LocationManagement />}
          {activeTab === 'departments' && <DepartmentManagement />}
          {activeTab === 'employees' && <EmployeeManagement />}
          {activeTab === 'reports' && <DataExport />}
        </div>
      </div>
    </div>
  );
};