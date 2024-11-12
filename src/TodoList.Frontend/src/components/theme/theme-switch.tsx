import {FC, useState} from "react";
import {Switch} from "@/components/ui/switch.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useTheme} from "@/common/hooks/useTheme.ts";
import {EnumTheme, Theme} from "@/types/store/Theme.ts";

const ThemeSwitch: FC = () => {

    const {setTheme, theme} = useTheme();
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(theme === EnumTheme.dark);

    const switchTheme = (checked: boolean): void => {

        const newTheme: Theme = checked ? EnumTheme.light : EnumTheme.dark;
        setTheme(newTheme);
        setIsDarkTheme(newTheme === EnumTheme.dark);
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