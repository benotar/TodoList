import {FC} from "react";
import {Label} from "@/components/ui/label.tsx";
import {useTheme} from "@/common/hooks/useTheme.ts";
import {EnumTheme, Theme} from "@/types/store/Theme.ts";
import {Toggle} from "@/components/ui/toggle"
import {Moon, Sun} from "lucide-react"

const ThemeToggle: FC = () => {

    const {setTheme, theme} = useTheme();

    const handlePressedChange = (): void => {

        const newTheme: Theme = theme === EnumTheme.dark ? EnumTheme.light : EnumTheme.dark;
        setTheme(newTheme);
    }


    return (
        <div className="flex items-center space-x-2">
            <Label>Toggle Theme</Label>
            <Toggle
                onPressedChange={handlePressedChange}
                variant="outline"
                size="sm"
            >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Toggle>
        </div>
    );
};

export default ThemeToggle;