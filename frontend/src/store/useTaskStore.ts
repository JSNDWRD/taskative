import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
// import useAuthStore from "./useAuthStore";

export interface Task {
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
  getTask: (authorId: number) => Promise<Task[] | void>;
  postTask: (task: Task) => Promise<void>;
  putTask: (task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

// const setInformation = useAuthStore((state) => state.setInformation);
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useTaskStore = create<TaskState>()(
  persist(
    (set, _get) => ({
      tasks: null,
      isLoading: false,
      setTasks: (tasks) => set({ tasks }),
      setLoading: (isLoading) => set({ isLoading }),
      getTask: async (authorId) => {
        set({ isLoading: true });
        try {
          const response = await fetch(`${backendUrl}/task/${authorId}`, {
            method: "GET",
          });
          const data: Task[] = await response.json();
          set({ tasks: data });
          return data;
        } catch (error: any) {
          // setInformation({ message: error.message, type: "Error" });
        } finally {
          set({ isLoading: false });
        }
      },
      postTask: async (task) => {
        set({ isLoading: true });
        try {
          await fetch(`${backendUrl}/task`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
          });
        } catch (error: any) {
          // setInformation({ message: error.message, type: "Error" });
        } finally {
          set({ isLoading: false });
        }
      },
      putTask: async (task) => {
        set({ isLoading: true });
        try {
          await fetch(`${backendUrl}/task/${task.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
          });
          // setInformation({
          //   message: "Task deleted successfully.",
          //   type: "Success",
          // });
        } catch (error: any) {
          // setInformation({ message: error.message, type: "Error" });
        } finally {
          set({ isLoading: false });
        }
      },
      deleteTask: async (id) => {
        set({ isLoading: true });
        try {
          await fetch(`${backendUrl}/task/${id}`, { method: "DELETE" });
          // setInformation({
          //   message: "Task deleted successfully.",
          //   type: "Success",
          // });
        } catch (error: any) {
          // setInformation({ message: error.message, type: "Error" });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "task-storage", // unique name for your storage
      storage: createJSONStorage(() => localStorage), // (optional) by default it uses localStorage
      // only store the session and user, not isLoading or error
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);

export default useTaskStore;
