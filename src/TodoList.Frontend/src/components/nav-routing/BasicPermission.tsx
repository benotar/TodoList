import {FC} from "react";
import {Link} from "react-router-dom";
import {Label} from "@/components/ui/label.tsx";
import {DropdownMenuItem, DropdownMenuSeparator} from "@/components/ui/dropdown-menu.tsx";

const BasicPermission: FC = () => {
    return (
        <>
            <DropdownMenuItem >
                <Link to="/todo"><Label className="cursor-pointer">Todo</Label></Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem >
                <Link to="/logout"><Label className="cursor-pointer">Log out</Label></Link>
            </DropdownMenuItem>
        </>
    );

};

export default BasicPermission;