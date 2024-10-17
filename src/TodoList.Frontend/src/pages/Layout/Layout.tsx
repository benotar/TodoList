import {FC} from "react";
import {Outlet} from "react-router-dom";

const Layout: FC = () => {
    return(
        <>
            <header>I'm header</header>
            <main>
                <Outlet/>
            </main>
            <footer>I'm footer</footer>
        </>
    );
};

export default Layout;