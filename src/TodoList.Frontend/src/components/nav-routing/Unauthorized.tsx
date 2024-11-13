import {FC} from "react";
import {Link} from "react-router-dom";
import {DropdownMenuItem, DropdownMenuSeparator} from "@/components/ui/dropdown-menu.tsx";
import {Label} from "@/components/ui/label.tsx";

const Unauthorized: FC = () => {
    return (
        <>
            <DropdownMenuItem>
                <Link to="/login"><Label className="cursor-pointer">Log in</Label></Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>
                <Link to="/register"><Label className="cursor-pointer">Register</Label></Link>
            </DropdownMenuItem>
        </>
    );

};

export default Unauthorized;