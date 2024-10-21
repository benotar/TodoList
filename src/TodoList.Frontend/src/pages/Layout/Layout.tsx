import React, {FC} from "react";
import MyHeader from "@/components/MyHeader/MyHeader.tsx";
import Content from "@/components/Content/Content.tsx";
import MyFooter from "@/components/MyFooter/MyFooter.tsx";

const Layout: FC = () => {

    return (
        <div className="grid grid-rows-[auto_1fr_auto] grid-cols-12 gap-4 w-full h-screen">
            <MyHeader/>
            <Content/>
            <MyFooter/>
        </div>
    );
};

export default Layout;