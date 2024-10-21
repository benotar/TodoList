import {FC} from "react";
import {Outlet} from "react-router-dom";


const Content: FC = () => {
    return (
        <main  className="col-span-12 md:col-span-12 h-[calc(100vh-3.75rem)] p-4 flex items-center flex-col justify-center">
            <Outlet/>
        </main>
    );
};

export default Content;