import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useLocationStore } from '../../store/useLocationStore';
import type { Location } from '../../types';

export const LocationManagement: React.FC = () => {
  const { locations, addLocation, updateLocation, deleteLocation } = useLocationStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Location>>({
    name: '',
    address: '',
    type: '',
    workingHours: {
      start: '09:00',
      end: '17:00',
    },
    maxCapacity: 100,
    currentCapacity: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateLocation(editingId, formData);
      setEditingId(null);
    } else {
      addLocation({
        id: Date.now().toString(),
        name: formData.name!,
        address: formData.address!,
        type: formData.type!,
        workingHours: formData.workingHours!,
        maxCapacity: formData.maxCapacity!,
        currentCapacity: 0,
      });
      setIsAdding(false);
    }
    setFormData({
      name: '',
      address: '',
      type: '',
      workingHours: {
        start: '09:00',
        end: '17:00',
      },
      maxCapacity: 100,
      currentCapacity: 0,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Location Management</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Location
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select Type</option>
                <option value="office">Office</option>
                <option value="warehouse">Warehouse</option>
                <option value="retail">Retail</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Working Hours Start</label>
              <input
                type="time"
                value={formData.workingHours?.start}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workingHours: { ...formData.workingHours!, start: e.target.value },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Working Hours End</label>
              <input
                type="time"
                value={formData.workingHours?.end}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workingHours: { ...formData.workingHours!, end: e.target.value },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Max Capacity</label>
              <input
                type="number"
                value={formData.maxCapacity}
                onChange={(e) =>
                  setFormData({ ...formData, maxCapacity: parseInt(e.target.value) })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                min="1"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingId ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setFormData({
                  name: '',
                  address: '',
                  type: '',
                  workingHours: {
                    start: '09:00',
                    end: '17:00',
                  },
                  maxCapacity: 100,
                  currentCapacity: 0,
                });
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Working Hours
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {locations.map((location) => (
              <tr key={location.id}>
                <td className="px-6 py-4 whitespace-nowrap">{location.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{location.type}</td>
                <td className="px-6 py-4">{location.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {location.workingHours.start} - {location.workingHours.end}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {location.currentCapacity} / {location.maxCapacity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingId(location.id);
                        setFormData(location);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteLocation(location.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};