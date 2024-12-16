import { create } from 'zustand';

export interface Department {
  id: string;
  name: string;
  description: string;
  managerId?: string;
}

interface DepartmentState {
  departments: Department[];
  addDepartment: (department: Department) => void;
  updateDepartment: (id: string, department: Partial<Department>) => void;
  deleteDepartment: (id: string) => void;
}

export const useDepartmentStore = create<DepartmentState>((set) => ({
  departments: [],
  addDepartment: (department) =>
    set((state) => ({
      departments: [...state.departments, department],
    })),
  updateDepartment: (id, updatedDepartment) =>
    set((state) => ({
      departments: state.departments.map((dept) =>
        dept.id === id ? { ...dept, ...updatedDepartment } : dept
      ),
    })),
  deleteDepartment: (id) =>
    set((state) => ({
      departments: state.departments.filter((dept) => dept.id !== id),
    })),
}));