import {FC} from "react";
import {Outlet} from "react-router-dom";


const Content: FC = () => {
    return (
        <main className="flex-auto flex justify-center items-center flex-col w-full max-w-screen-xl mx-auto px-10">
            <Outlet/>
        </main>
    );
};

export default Content;