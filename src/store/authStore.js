import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: localStorage.getItem("token") || null,
    error: null,

    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),

    login: (userData, token) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        set({ user: userData, token, error: null });
    },

    logout: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        set({ user: null, token: null });
    }
}));

export default useAuthStore;
