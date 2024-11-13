import {FC, useEffect} from "react";
import {ThemeProviderProps} from "@/types/store/Theme.ts";
import {useTheme} from "@/common/hooks/useTheme.ts";

const ThemeProvider: FC<ThemeProviderProps> = ({children}) => {

    const {theme} = useTheme();

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        if (theme === "system") {

            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches ? "dark" : "light";

            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);

    return (
        <>
            {children}
        </>
    );
};

export default ThemeProvider;