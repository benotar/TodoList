import {FC} from "react";
import MyHeader from "@/components/layout/MyHeader.tsx";
import Content from "@/components/layout/Content.tsx";
import MyFooter from "@/components/layout/MyFooter.tsx";

const LayoutPage: FC = () => {

    return (
            <div className="flex flex-col h-screen items-center justify-center">
                <MyHeader/>
                <Content/>
                <MyFooter/>
            </div>
    );
};

export default LayoutPage;