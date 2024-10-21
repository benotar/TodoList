import {create} from "zustand";
import {persist, createJSONStorage} from 'zustand/middleware';
import {ThemeState, Theme, ThemeSlice} from "@/types/store/Theme.ts";

const initialThemeState: ThemeState = {
    theme: 'system',
};

export const useThemeSlice = create<ThemeSlice>()(
    persist(
        (set) => ({
            ...initialThemeState,
            setTheme: (theme: Theme) => {
                set({theme});
            }
        }), {
            name: 'theme-storage',
            storage: createJSONStorage(() => sessionStorage)
        }));