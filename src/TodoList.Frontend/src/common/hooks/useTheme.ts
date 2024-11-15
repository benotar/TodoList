import {useThemeStore} from "@/store/themeStore.ts";
import {useShallow} from "zustand/shallow";

export const useTheme = () => {
    const {theme, setTheme} = useThemeStore(useShallow((state) => ({
        theme: state.theme,
        setTheme: state.setTheme
    })));

    return {theme, setTheme};
};