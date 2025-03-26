import { create } from 'zustand';

const useMainStore = create((set) => ({
    error: null,
    setError: (newError) => set((state) => {
        if (state.error !== newError) {
            return { error: newError };
        }
        return {};  // Nekeisti state, jei klaida nepasikeitė
    }),
    clearError: () => set({ error: null }),
}));

export default useMainStore;
