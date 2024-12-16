import React, { useState } from 'react';
import { LocationSelector } from './LocationSelector';
import { useAttendance } from '../../hooks/useAttendance';
import { AlertCircle } from 'lucide-react';

interface AttendanceFormProps {
  onSuccess: () => void;
}

export const AttendanceForm: React.FC<AttendanceFormProps> = ({ onSuccess }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const { loading, error, checkIn } = useAttendance();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLocation) return;

    const record = await checkIn(selectedLocation);
    if (record) {
      onSuccess();
      setSelectedLocation('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      <LocationSelector
        value={selectedLocation}
        onChange={setSelectedLocation}
        className="w-full"
      />

      <button
        type="submit"
        disabled={loading || !selectedLocation}
        className={`w-full py-2 px-4 rounded-md ${
          loading || !selectedLocation
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {loading ? 'Processing...' : 'Check In'}
      </button>
    </form>
  );
};