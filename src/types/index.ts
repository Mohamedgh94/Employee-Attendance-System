export type Role = 'employee' | 'admin';

export interface Location {
  id: string;
  name: string;
  address: string;
  type: string; // e.g., 'warehouse', 'office', etc.
  workingHours: {
    start: string; // Format: "HH:mm"
    end: string; // Format: "HH:mm"
  };
  maxCapacity: number;
  currentCapacity: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  role: Role;
  qrCode: string;
  defaultLocation: string; // Reference to Location id
}

export interface Department {
  id: string;
  name: string;
  description: string;
  locationId: string; // Reference to Location id
  managerId?: string; // Reference to User id
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  locationId: string;
  checkIn: Date;
  checkOut: Date | null;
}

export interface WorkHoursSummary {
  totalHours: number;
  dailyHours: {
    date: string;
    hours: number;
  }[];
}