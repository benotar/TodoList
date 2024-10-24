import {create} from "zustand";
import {persist} from 'zustand/middleware';
import {Theme, ThemeSlice} from "@/types/store/Theme.ts";

const initialThemeState: ThemeSlice = {
    theme: 'system',
    setTheme: () => {}
};

export const useThemeSlice = create<ThemeSlice>()(
    persist(
        (set) => ({
            ...initialThemeState,
            setTheme: (theme: Theme): void => {
                set({theme});
            }
        }), {
            name: 'theme-storage',
            partialize: (state) => ({theme: state.theme}),
        }
    ),
);