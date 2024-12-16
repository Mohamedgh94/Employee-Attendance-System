import React, { useState } from 'react';
import { Clock, Calendar, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { QRCodeDisplay } from '../Attendance/QRCode';
import { LocationSelector } from '../Attendance/LocationSelector';
import { useAuthStore } from '../../store/useAuthStore';
import { useAttendanceStore } from '../../store/useAttendanceStore';
import { useLocationStore } from '../../store/useLocationStore';
import { format } from 'date-fns';

export const EmployeeDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { calculateWorkHours, getActiveRecords, addRecord, updateRecord } = useAttendanceStore();
  const { getLocation } = useLocationStore();
  const [selectedLocation, setSelectedLocation] = useState(user?.defaultLocation || '');

  if (!user) return null;

  const workSummary = calculateWorkHours(user.id);
  const activeRecord = getActiveRecords().find(
    (record) => record.userId === user.id
  );
  const currentLocation = selectedLocation
    ? getLocation(selectedLocation)
    : null;

  const handleCheckIn = () => {
    if (!selectedLocation) {
      alert('Please select a location before checking in');
      return;
    }
    
    addRecord({
      id: Date.now().toString(),
      userId: user.id,
      locationId: selectedLocation,
      checkIn: new Date(),
      checkOut: null,
    });
  };

  const handleCheckOut = () => {
    if (!activeRecord) return;
    updateRecord(activeRecord.id, new Date());
  };

  return (
    <div className="space-y-6">
      {/* ... (keep existing stats cards) ... */}

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Attendance Actions</h2>
        <div className="space-y-4">
          <LocationSelector
            value={selectedLocation}
            onChange={setSelectedLocation}
          />
          <div className="flex space-x-4">
            <button
              onClick={handleCheckIn}
              disabled={!!activeRecord}
              className={`flex items-center px-6 py-3 rounded-md ${
                activeRecord
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Check In
            </button>
            <button
              onClick={handleCheckOut}
              disabled={!activeRecord}
              className={`flex items-center px-6 py-3 rounded-md ${
                !activeRecord
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              <XCircle className="w-5 h-5 mr-2" />
              Check Out
            </button>
          </div>
        </div>
      </div>

      {/* ... (keep existing QR code and recent activity sections) ... */}
    </div>
  );
};