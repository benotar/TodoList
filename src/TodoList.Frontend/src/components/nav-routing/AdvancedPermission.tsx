import {FC} from "react";
import {Link} from "react-router-dom";
import {Label} from "@/components/ui/label.tsx";
import {DropdownMenuItem, DropdownMenuSeparator} from "@/components/ui/dropdown-menu.tsx";
import BasicPermission from "@/components/nav-routing/BasicPermission.tsx";

const AdvancedPermission: FC = () => {
    return (
        <>
            <DropdownMenuItem>
                <Link to='/admin'><Label className="cursor-pointer">Admin</Label></Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <BasicPermission/>
        </>
    );

};

export default AdvancedPermission;