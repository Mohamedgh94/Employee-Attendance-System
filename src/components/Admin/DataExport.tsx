import React from 'react';
import { Download } from 'lucide-react';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import { useAuthStore } from '../../store/useAuthStore';

export const DataExport: React.FC = () => {
  const { user } = useAuthStore();

  const exportToExcel = (data: any[], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
  };

  const handleExportAttendance = () => {
    // Mock data - replace with actual attendance data
    const mockAttendanceData = [
      {
        employeeId: '1',
        name: 'John Doe',
        date: '2024-03-15',
        checkIn: '09:00',
        checkOut: '17:00',
      },
    ];
    exportToExcel(mockAttendanceData, 'attendance_report');
  };

  const handleExportDepartments = () => {
    // Mock data - replace with actual department data
    const mockDepartmentData = [
      {
        id: '1',
        name: 'IT Department',
        employeeCount: 10,
        manager: 'Jane Smith',
      },
    ];
    exportToExcel(mockDepartmentData, 'department_report');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Export Data</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Attendance Report</h3>
            <p className="text-sm text-gray-500">Export complete attendance records</p>
          </div>
          <button
            onClick={handleExportAttendance}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Department Report</h3>
            <p className="text-sm text-gray-500">Export department statistics</p>
          </div>
          <button
            onClick={handleExportDepartments}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
};