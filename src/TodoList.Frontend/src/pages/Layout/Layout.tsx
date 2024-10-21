import {FC} from "react";
import {Outlet} from "react-router-dom";
import MyHeader from "@/components/MyHeader/MyHeader.tsx";

const Layout: FC = () => {

    return(
        <div >
            <MyHeader/>
            <main>
                <Outlet/>
            </main>
            <footer>I'm footer</footer>
        </div>
    );
};

export default Layout;