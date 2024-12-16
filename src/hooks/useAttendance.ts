import { useState, useCallback } from 'react';
import { attendanceApi } from '../services/api';
import { AttendanceRecord } from '../types/attendance';

export const useAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkIn = useCallback(async (locationId: string) => {
    setLoading(true);
    setError(null);
    try {
      const record = await attendanceApi.checkIn(locationId);
      return record;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to check in');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkOut = useCallback(async (recordId: string) => {
    setLoading(true);
    setError(null);
    try {
      const record = await attendanceApi.checkOut(recordId);
      return record;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to check out');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserRecords = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const records = await attendanceApi.getUserRecords(userId);
      return records;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch records');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    checkIn,
    checkOut,
    getUserRecords,
  };
};