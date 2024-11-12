import {useThemeSlice} from "@/store/themeSlice.ts";
import {useShallow} from "zustand/shallow";

export const useTheme = () => {
    const {theme, setTheme} = useThemeSlice(useShallow((state) => ({
        theme: state.theme,
        setTheme: state.setTheme
    })));

    return {theme, setTheme};
};