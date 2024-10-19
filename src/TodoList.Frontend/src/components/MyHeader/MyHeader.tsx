import {FC} from "react";
import {useThemeSlice} from "@/store/themeSlice.ts";
import classes from '@/components/MyHeader/MyHeader.module.css';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import { Moon, Sun } from "lucide-react"
import {Button} from "@/components/ui/button.tsx";
// import {Link} from "react-router-dom";

const MyHeader: FC = () => {

    const {setTheme} = useThemeSlice();


    return (
        <header className={`flex justify-between items-center p-4 ${classes.myHeader}`}>
            <h1 className="text-xl font-bold">Todo List</h1>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};

export default MyHeader;