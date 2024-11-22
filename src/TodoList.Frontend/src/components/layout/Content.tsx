import {FC} from "react";
import {Outlet} from "react-router-dom";


const Content: FC = () => {


    return (
        <main className="flex flex-auto items-center justify-center">
            <Outlet/>
        </main>
    );
};

export default Content;