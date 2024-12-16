import React from 'react';
import { useLocationStore } from '../../store/useLocationStore';

interface LocationSelectorProps {
  value: string;
  onChange: (locationId: string) => void;
  className?: string;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  value,
  onChange,
  className = '',
}) => {
  const { locations } = useLocationStore();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Select Location
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${className}`}
        required
      >
        <option value="">Choose a location</option>
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
    </div>
  );
};