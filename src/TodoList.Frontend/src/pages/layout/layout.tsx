import {FC} from "react";
import MyHeader from "@/components/layout/my-header.tsx";
import Content from "@/components/layout/content.tsx";
import MyFooter from "@/components/layout/my-footer.tsx";

const Layout: FC = () => {

    return (
        <div className="grid grid-rows-[auto_1fr_auto] grid-cols-12 gap-4 w-full h-screen">
            <div className="col-span-12">
                <MyHeader/>
            </div>
            <div className="col-span-12">
                <Content/>
            </div>
            <div className="col-span-12">
                <MyFooter/>
            </div>
        </div>
    );
};

export default Layout;