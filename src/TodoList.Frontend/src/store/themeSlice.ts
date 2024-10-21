import {create} from "zustand";
import {persist, createJSONStorage} from 'zustand/middleware';
import {State, Theme, ThemeSlice} from "@/types/store/Theme.ts";

const initialState: State = {
    theme: 'system',
};

export const useThemeSlice = create<ThemeSlice>()(persist((set) => ({
    ...initialState,
    setTheme: (theme: Theme) => {
        set({theme});
    }
}),{
    name: 'todo-list-storage',
    storage: createJSONStorage(() => sessionStorage)
}));