import {FC} from "react";
import {Link} from "react-router-dom";
import ThemeToggle from "@/components/theme/ThemeToggle.tsx";
import BasicPermission from "@/components/nav-routing/BasicPermission.tsx";
import Unauthorized from "@/components/nav-routing/Unauthorized.tsx";
import {Permission} from "@/types/store/Auth.ts";
import AdvancedPermission from "@/components/nav-routing/AdvancedPermission.tsx";
import {useAuthState} from "@/common/hooks/useAuthState.ts";

import {EllipsisVertical} from 'lucide-react';

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import {Label} from "@/components/ui/label.tsx";


const MyHeader: FC = () => {

    const {isAuth, permission} = useAuthState();

    return (
        <header className="bg-header flex justify-between items-center px-6 py-4">

            <Link to='/'><Label className="cursor-pointer">Todo List</Label></Link>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <EllipsisVertical/>
                            <span className="sr-only">Burger menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-header">
                        {
                            !isAuth
                                ? <Unauthorized/>
                                : permission === Permission.Advanced
                                    ? <AdvancedPermission/>
                                    : <BasicPermission/>
                        }
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            <ThemeToggle/>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );

};

export default MyHeader;