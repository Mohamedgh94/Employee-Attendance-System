import { differenceInHours, format } from 'date-fns';
import { AttendanceRecord, AttendanceReport } from '../types/attendance';
import { User } from '../types';

export const calculateWorkedHours = (checkIn: Date, checkOut: Date): number => {
  return differenceInHours(checkOut, checkIn);
};

export const formatAttendanceRecord = (
  record: AttendanceRecord,
  user: User,
  locationName: string
): AttendanceReport => {
  const workedHours = record.checkOut 
    ? calculateWorkedHours(record.checkIn, record.checkOut)
    : 0;

  return {
    date: format(record.checkIn, 'yyyy-MM-dd'),
    employeeName: `${user.firstName} ${user.lastName}`,
    location: locationName,
    checkIn: format(record.checkIn, 'HH:mm'),
    checkOut: record.checkOut ? format(record.checkOut, 'HH:mm') : '-',
    workedHours,
  };
};