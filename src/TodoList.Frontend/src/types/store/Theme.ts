import {ReactNode} from "react";

export enum EnumTheme {
    dark = "dark",
    light = "light",
    system = "system"
}

export type Theme = EnumTheme.dark | EnumTheme.light | EnumTheme.system;

export type ThemeProviderProps = {
    children: ReactNode;
};

export type ThemeState = {
    theme: Theme;
};

export type ThemeActions = {
    setTheme: (theme: Theme) => void;
}

export type ThemeSlice = ThemeActions & ThemeState;

