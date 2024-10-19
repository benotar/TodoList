import {FC} from "react";
import {Outlet} from "react-router-dom";
import MyHeader from "@/components/MyHeader/MyHeader.tsx";
import classes from '@/pages/Layout/Layout.module.css';

const Layout: FC = () => {

    return(
        <div className={classes.layout}>
            <MyHeader/>
            <main>
                <Outlet/>
            </main>
            <footer>I'm footer</footer>
        </div>
    );
};

export default Layout;