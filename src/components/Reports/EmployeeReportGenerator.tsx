import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { useAttendanceStore } from '../../store/useAttendanceStore';
import { useLocationStore } from '../../store/useLocationStore';
import { AttendanceReportTable } from './AttendanceReportTable';
import { formatAttendanceRecord } from '../../utils/attendance';
import * as XLSX from 'xlsx';

export const EmployeeReportGenerator: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const { employees } = useEmployeeStore();
  const { getUserRecords } = useAttendanceStore();
  const { getLocation } = useLocationStore();

  const generateReport = () => {
    if (!selectedEmployee) return [];

    const records = getUserRecords(selectedEmployee);
    const employee = employees.find(emp => emp.id === selectedEmployee);
    
    if (!employee) return [];

    return records.map(record => {
      const location = getLocation(record.locationId);
      return formatAttendanceRecord(record, employee, location?.name || 'Unknown');
    });
  };

  const reports = generateReport();

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(reports);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance Report');
    
    // Generate filename with employee name and date range
    const employee = employees.find(emp => emp.id === selectedEmployee);
    const filename = `attendance_report_${employee?.firstName}_${employee?.lastName}_${new Date().toISOString().split('T')[0]}.xlsx`;
    
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
        
        {reports.length > 0 && (
          <button
            onClick={downloadExcel}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </button>
        )}
      </div>

      {reports.length > 0 ? (
        <AttendanceReportTable reports={reports} />
      ) : (
        <p className="text-center text-gray-500">
          Select an employee to generate their attendance report
        </p>
      )}
    </div>
  );
};