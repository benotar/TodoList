import {FC} from "react";
import {Link} from "react-router-dom";
import ThemeSwitch from "@/components/theme/theme-switch.tsx";
import BasicPermission from "@/components/nav-routing/BasicPermission.tsx";
import Unauthorized from "@/components/nav-routing/Unauthorized.tsx";
import {useAuth} from "@/common/hooks/useAuth.ts";
import {Permission} from "@/types/store/Auth.ts";
import AdvancedPermission from "@/components/nav-routing/AdvancedPermission.tsx";

const MyHeader: FC = () => {

    const {isAuth, permission} = useAuth();

    return (

        <header className="bg-header text-header-foreground flex justify-between p-4">
            <Link to='/'><span>Todo List</span></Link>
            <div className="flex justify-between px-4 items-center">
                {isAuth ?
                    permission === Permission.Advanced ?
                        <AdvancedPermission/>
                        : <BasicPermission/>
                    : <Unauthorized/>}
                <ThemeSwitch/>
            </div>
        </header>
    );

};

export default MyHeader;