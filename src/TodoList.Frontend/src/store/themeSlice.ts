import {create} from "zustand";
import {persist} from 'zustand/middleware';
import {Theme, EnumTheme, ThemeSlice} from "@/types/store/Theme.ts";

const initialThemeState: ThemeSlice = {
    theme: EnumTheme.system,
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
            name: "ui-theme",
            partialize: (state) => ({theme: state.theme})
        }
    )
);