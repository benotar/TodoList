import {FC, useEffect, useState} from "react";
import {Switch} from "@/components/ui/switch.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useThemeSlice} from "@/store/themeSlice.ts";

const ThemeSwitch: FC = () => {

    const {theme, setTheme} = useThemeSlice();

    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(theme === 'dark');

    useEffect(() => {
        setIsDarkTheme(theme === 'dark');
    }, [theme]);

    const switchTheme = (checked: boolean): void => {

        setTheme(checked ? 'light' : 'dark');
    }

    return (
        <div className="flex items-center space-x-2">
            <Switch
                checked={isDarkTheme}
                onCheckedChange={() => switchTheme(isDarkTheme)}
            />
            <Label>Dark theme</Label>
        </div>
    );
};

export default ThemeSwitch;