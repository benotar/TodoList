import {ReactNode} from "react";

export type Theme = 'dark' | 'light' | 'system';

export type State = {
    theme: Theme;
};

export type Actions = {
    setTheme: (theme: Theme) => void;
};

export type ThemeProviderProps = {
    children: ReactNode;
    defaultTheme?: Theme;
};

export type ThemeSlice = State & Actions;