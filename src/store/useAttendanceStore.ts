import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AttendanceRecord, WorkHoursSummary } from '../types/attendance';
import { differenceInHours, parseISO, format } from 'date-fns';

interface AttendanceState {
  records: AttendanceRecord[];
  addRecord: (record: AttendanceRecord) => void;
  updateRecord: (id: string, checkOut: Date) => void;
  getActiveRecords: () => AttendanceRecord[];
  getUserRecords: (userId: string) => AttendanceRecord[];
  getLocationRecords: (locationId: string) => AttendanceRecord[];
  calculateWorkHours: (userId: string) => WorkHoursSummary;
}

export const useAttendanceStore = create<AttendanceState>()(
  persist(
    (set, get) => ({
      records: [],
      addRecord: (record) =>
        set((state) => ({
          records: [...state.records, record],
        })),
      updateRecord: (id, checkOut) =>
        set((state) => ({
          records: state.records.map((record) =>
            record.id === id
              ? {
                  ...record,
                  checkOut,
                  workedHours: differenceInHours(checkOut, record.checkIn),
                }
              : record
          ),
        })),
      getActiveRecords: () => {
        return get().records.filter((record) => record.checkOut === null);
      },
      getUserRecords: (userId) => {
        return get().records.filter((record) => record.userId === userId);
      },
      getLocationRecords: (locationId) => {
        return get().records.filter((record) => record.locationId === locationId);
      },
      calculateWorkHours: (userId) => {
        const userRecords = get().records.filter(
          (record) => record.userId === userId && record.checkOut !== null
        );

        const dailyHours: { [key: string]: { hours: number; location: string } } = {};
        let totalHours = 0;

        userRecords.forEach((record) => {
          const hours = record.workedHours || 0;
          const date = format(record.checkIn, 'yyyy-MM-dd');
          
          if (!dailyHours[date]) {
            dailyHours[date] = { hours: 0, location: record.locationId };
          }
          dailyHours[date].hours += hours;
          totalHours += hours;
        });

        return {
          totalHours,
          dailyHours: Object.entries(dailyHours).map(([date, data]) => ({
            date,
            hours: data.hours,
            location: data.location,
          })),
        };
      },
    }),
    {
      name: 'attendance-storage',
    }
  )
);