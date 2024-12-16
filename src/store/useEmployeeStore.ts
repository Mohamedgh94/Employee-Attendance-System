import { create } from 'zustand';
import { User } from '../types';

interface EmployeeState {
  employees: User[];
  addEmployee: (employee: User) => void;
  updateEmployee: (id: string, employee: Partial<User>) => void;
  deleteEmployee: (id: string) => void;
  getEmployeesByDepartment: (departmentId: string) => User[];
}

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
  employees: [],
  addEmployee: (employee) =>
    set((state) => ({
      employees: [...state.employees, employee],
    })),
  updateEmployee: (id, updatedEmployee) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? { ...emp, ...updatedEmployee } : emp
      ),
    })),
  deleteEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id),
    })),
  getEmployeesByDepartment: (departmentId) => {
    return get().employees.filter((emp) => emp.department === departmentId);
  },
}));