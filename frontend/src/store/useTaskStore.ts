import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Task {
  id: number;
  authorId: number;
  title: string;
  startAt: Date;
  endAt: Date;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  priority: "NOT_SET" | "LOW" | "MEDIUM" | "HIGH";
  createdAt: Date;
  updatedAt: Date;
}

interface TaskState {
  tasks: Task[] | null;
  isLoading: boolean;
  setTasks: (tasks: Task[] | null) => void;
  setLoading: (isLoading: boolean) => void;
  getTask: (authorId: number) => Promise<void>;
  postTask: (task: Task) => Promise<void>;
  putTask: (task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

const useTaskStore = create<TaskState>()((set, get) => ({
  tasks: null,
  isLoading: false,
  setTasks: (tasks) => set({ tasks }),
  setLoading: (isLoading) => set({ isLoading }),
  getTask: async (authorId) => {
    set({ isLoading: true });
    try {
    } catch (error: any) {
    } finally {
      set({ isLoading: false });
    }
  },
  postTask: async (task) => {
    set({ isLoading: true });
    try {
    } catch (error: any) {
    } finally {
      set({ isLoading: false });
    }
  },
  putTask: async (task) => {
    set({ isLoading: true });
    try {
    } catch (error: any) {
    } finally {
      set({ isLoading: false });
    }
  },
  deleteTask: async (id) => {
    set({ isLoading: true });
    try {
    } catch (error: any) {
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useTaskStore;
