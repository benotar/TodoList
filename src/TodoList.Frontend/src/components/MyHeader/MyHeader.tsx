import {FC} from "react";
import {Link} from "react-router-dom";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch.tsx";

const MyHeader: FC = () => {
    return (

        <header
            className="col-span-12 md:col-span-12 h-[3.75rem] bg-primary text-primary-foreground px-4 flex items-center justify-between sticky top-0 z-10">
            <Link to='/'><span>Todo List</span></Link>
            <Link to='/login'><span>Log in</span></Link>
            <ThemeSwitch/>
        </header>
    );

};

export default MyHeader;