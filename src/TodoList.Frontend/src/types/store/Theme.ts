import {ReactNode} from "react";

export type Theme = 'dark' | 'light' | 'system';

export type ThemeState = {
    theme: Theme;
};

export type ThemeActions = {
    setTheme(theme: Theme): void;
}

export type ThemeSlice = ThemeActions & ThemeState;

export type ThemeProviderProps = {
    children: ReactNode;
    defaultTheme?: Theme;
};
