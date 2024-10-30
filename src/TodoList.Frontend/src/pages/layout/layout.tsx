import {FC} from "react";
import MyHeader from "@/components/layout/my-header.tsx";
import Content from "@/components/layout/content.tsx";
import MyFooter from "@/components/layout/my-footer.tsx";

const Layout: FC = () => {

    return (
        <div className="flex flex-col h-screen">
            <MyHeader/>
            <Content/>
            <MyFooter/>
        </div>
    );
};

export default Layout;