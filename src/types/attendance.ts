import { User, Location } from './index';

export interface AttendanceRecord {
  id: string;
  userId: string;
  locationId: string;
  checkIn: Date;
  checkOut: Date | null;
  workedHours?: number;
}

export interface AttendanceReport {
  date: string;
  employeeName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  workedHours: number;
}

export interface WorkHoursSummary {
  totalHours: number;
  dailyHours: {
    date: string;
    hours: number;
    location: string;
  }[];
}