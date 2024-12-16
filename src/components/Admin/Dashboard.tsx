import React from 'react';
import { Users, Building2, Clock } from 'lucide-react';
import { DepartmentManagement } from './DepartmentManagement';
import { EmployeeManagement } from './EmployeeManagement';
import { DataExport } from './DataExport';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { useDepartmentStore } from '../../store/useDepartmentStore';
import { useAttendanceStore } from '../../store/useAttendanceStore';

export const Dashboard: React.FC = () => {
  const { employees } = useEmployeeStore();
  const { departments } = useDepartmentStore();
  const { getActiveRecords } = useAttendanceStore();

  const stats = {
    totalEmployees: employees.length,
    totalDepartments: departments.length,
    activeCheckIns: getActiveRecords().length,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="w-12 h-12 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Total Employees</h3>
              <p className="text-3xl font-bold text-gray-700">{stats.totalEmployees}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Building2 className="w-12 h-12 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Departments</h3>
              <p className="text-3xl font-bold text-gray-700">{stats.totalDepartments}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Clock className="w-12 h-12 text-purple-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Active Check-ins</h3>
              <p className="text-3xl font-bold text-gray-700">{stats.activeCheckIns}</p>
            </div>
          </div>
        </div>
      </div>

      <EmployeeManagement />
      <DepartmentManagement />
      <DataExport />
    </div>
  );
};