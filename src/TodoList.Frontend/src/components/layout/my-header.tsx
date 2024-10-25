import {FC} from "react";
import {Link} from "react-router-dom";
import ThemeSwitch from "@/components/theme/theme-switch.tsx";

const MyHeader: FC = () => {
    return (

        <header
            className="col-span-12 md:col-span-12 h-[3.75rem] bg-primary text-primary-foreground px-4 flex items-center justify-between sticky top-0 z-10">
            <Link to='/'><span>Todo List</span></Link>
            <div className="flex justify-between px-4 items-center">
                <Link to='/login' className="mr-5"><span>Log in</span></Link>
                <Link to='/register' className="mr-5"><span>Register</span></Link>
                <ThemeSwitch/>
            </div>
        </header>
    );

};

export default MyHeader;