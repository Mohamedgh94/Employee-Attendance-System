import React from 'react';
import { AttendanceReport } from '../../types/attendance';

interface AttendanceReportTableProps {
  reports: AttendanceReport[];
}

export const AttendanceReportTable: React.FC<AttendanceReportTableProps> = ({ reports }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Check In
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Check Out
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hours Worked
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reports.map((report, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{report.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{report.employeeName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{report.location}</td>
              <td className="px-6 py-4 whitespace-nowrap">{report.checkIn}</td>
              <td className="px-6 py-4 whitespace-nowrap">{report.checkOut}</td>
              <td className="px-6 py-4 whitespace-nowrap">{report.workedHours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};