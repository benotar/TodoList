import {FC} from "react";
import {Outlet} from "react-router-dom";


const Content: FC = () => {
    return (
        <main className="min-h-0 h-full overflow-auto col-span-12 md:col-span-8 lg:col-span-6
                         flex items-center flex-col justify-center w-full max-w-lg mx-auto p-4 md:p-6">
            <Outlet/>
        </main>
    );
};

export default Content;