import {FC} from "react";
import {Outlet} from "react-router-dom";


const Content: FC = () => {


    return (
        <main className="container flex-auto flex justify-center items-center flex-col mx-auto px-10">
            <Outlet/>
        </main>
    );
};

export default Content;