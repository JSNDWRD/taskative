import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  session: { id: string; user: Object } | null;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    age: number;
  } | null;
  isLoading: boolean;
  error: string | null;
  setSession: (session: { id: string; user: Object } | null) => void;
  setUser: (
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      age: number;
    } | null
  ) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    age: number
  ) => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, _get) => ({
      session: null,
      user: null,
      isLoading: false,
      error: null,
      setSession: (session) => set({ session }),
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          if (!email || !password) {
            set({ error: "Fill all the required fields." });
            return;
          }
          const request = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
              }),
            }
          );
          const data = await request.json();
          console.log(data);
          if (!request.ok) throw new Error(data.error || "Login failed");
          set({ session: data.session, user: data.user });
        } catch (error: any) {
          set({ error: error.message });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ user: null, session: null });
      },

      signup: async (email, password, firstName, lastName, age) => {
        set({ isLoading: true, error: null });
        try {
          if (!email || !password || !firstName || !lastName || !age) {
            set({ error: "Fill all the required fields." });
            return;
          }
          const request = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/signup`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
                firstName,
                lastName,
                age,
              }),
            }
          );
          const data = await request.json();
          if (!request.ok) throw new Error(data.error || "Signup failed");
        } catch (error: any) {
          set({ error: error.message });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage", // unique name for your storage
      storage: createJSONStorage(() => localStorage), // (optional) by default it uses localStorage
      // only store the session and user, not isLoading or error
      partialize: (state) => ({ session: state.session, user: state.user }),
    }
  )
);

export default useAuthStore;
