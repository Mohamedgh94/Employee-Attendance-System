import { create } from 'zustand';
import { Location } from '../types';

interface LocationState {
  locations: Location[];
  addLocation: (location: Location) => void;
  updateLocation: (id: string, location: Partial<Location>) => void;
  deleteLocation: (id: string) => void;
  updateCapacity: (id: string, change: number) => void;
  getLocation: (id: string) => Location | undefined;
}

export const useLocationStore = create<LocationState>((set, get) => ({
  locations: [],
  addLocation: (location) =>
    set((state) => ({
      locations: [...state.locations, location],
    })),
  updateLocation: (id, updatedLocation) =>
    set((state) => ({
      locations: state.locations.map((loc) =>
        loc.id === id ? { ...loc, ...updatedLocation } : loc
      ),
    })),
  deleteLocation: (id) =>
    set((state) => ({
      locations: state.locations.filter((loc) => loc.id !== id),
    })),
  updateCapacity: (id, change) =>
    set((state) => ({
      locations: state.locations.map((loc) =>
        loc.id === id
          ? { ...loc, currentCapacity: loc.currentCapacity + change }
          : loc
      ),
    })),
  getLocation: (id) => get().locations.find((loc) => loc.id === id),
}));