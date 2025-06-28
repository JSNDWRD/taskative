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
  information: { message: string; type: "Error" | "Success" | "Info" } | null;
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
  setInformation: (
    information: { message: string; type: "Error" | "Success" | "Info" } | null
  ) => void;

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

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useAuthStore = create<AuthState>()(
  persist(
    (set, _get) => ({
      session: null,
      user: null,
      isLoading: false,
      information: null,
      setSession: (session) => set({ session }),
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ isLoading: loading }),
      setInformation: (information) => set({ information }),
      login: async (email, password) => {
        set({ isLoading: true, information: null });
        try {
          if (!email || !password) {
            set({
              information: {
                message: "Fill all the required fields.",
                type: "Error",
              },
            });
            return;
          }
          const request = await fetch(`${backendUrl}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });
          const data = await request.json();
          if (!request.ok) throw new Error(data.error || "Login failed.");
          set({
            session: data.session,
            user: data.user,
            information: { message: "Login success.", type: "Success" },
          });
        } catch (error: any) {
          set({ information: { message: error.message, type: "Error" } });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({
          user: null,
          session: null,
          information: { message: "Signed out", type: "Success" },
        });
      },

      signup: async (email, password, firstName, lastName, age) => {
        set({ isLoading: true, information: null });
        try {
          if (!email || !password || !firstName || !lastName || !age) {
            set({
              information: {
                message: "Fill all the required fields.",
                type: "Error",
              },
            });
            return;
          }
          var passRgx = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

          if (!passRgx.test(password)) {
            set({
              information: {
                message:
                  "Password must be a minimum 8 characters in length with at least one english letter, one digit, and one special character.",
                type: "Error",
              },
            });
            return;
          }

          const request = await fetch(`${backendUrl}/signup`, {
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
          });
          const data = await request.json();
          if (!request.ok) throw new Error(data.error || "Signup failed");
          set({
            information: { message: "Sign up success.", type: "Success" },
          });
        } catch (error: any) {
          set({ information: { message: error.message, type: "Error" } });
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
