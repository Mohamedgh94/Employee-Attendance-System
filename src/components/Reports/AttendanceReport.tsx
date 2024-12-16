import React, { useState, useEffect } from 'react';
import { Download, Search } from 'lucide-react';
import { useAttendance } from '../../hooks/useAttendance';
import { AttendanceReportTable } from './AttendanceReportTable';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import * as XLSX from 'xlsx';

export const AttendanceReport: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [records, setRecords] = useState([]);
  const { loading, error, getUserRecords } = useAttendance();
  const { employees } = useEmployeeStore();

  useEffect(() => {
    if (selectedEmployee) {
      loadRecords();
    }
  }, [selectedEmployee]);

  const loadRecords = async () => {
    const data = await getUserRecords(selectedEmployee);
    setRecords(data);
  };

  const handleExport = () => {
    if (!records.length) return;

    const employee = employees.find(emp => emp.id === selectedEmployee);
    const filename = `attendance_${employee?.firstName}_${employee?.lastName}_${new Date().toISOString().split('T')[0]}.xlsx`;

    const ws = XLSX.utils.json_to_sheet(records);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
    XLSX.writeFile(wb, filename);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="w-64">
          <label className="block text-sm font-medium text-gray-700">
            Select Employee
          </label>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Choose an employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </select>
        </div>

        {records.length > 0 && (
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : error ? (
        <div className="text-red-600 text-center py-4">{error}</div>
      ) : records.length > 0 ? (
        <AttendanceReportTable reports={records} />
      ) : (
        <div className="text-center py-4 text-gray-500">
          Select an employee to view their attendance records
        </div>
      )}
    </div>
  );
};