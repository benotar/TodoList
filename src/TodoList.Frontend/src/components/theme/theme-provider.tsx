import {useThemeSlice} from "@/store/themeSlice.ts";
import {FC, useEffect} from "react";
import {ThemeProviderProps} from "@/types/store/Theme.ts";

const ThemeProvider: FC<ThemeProviderProps> = ({children, defaultTheme = 'system'}) => {

    const {theme, setTheme} = useThemeSlice();

    useEffect(() => {
        if (theme === 'system') {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? 'dark'
                : 'light';

            setTheme(systemTheme);
        }

        const root = window.document.documentElement;

        root.classList.remove('light', 'dark');

        root.classList.add(theme);
    }, [theme, defaultTheme, setTheme]);

    return (
        <>
            {children}
        </>
    );
};

export default ThemeProvider;