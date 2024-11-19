import {FC} from "react";
import MyHeader from "@/components/layout/MyHeader.tsx";
import Content from "@/components/layout/Content.tsx";
import MyFooter from "@/components/layout/MyFooter.tsx";
import {useAuthState} from "@/common/hooks/useAuthState.ts";
import Loader from "@/components/shared/Loader.tsx";

const LayoutPage: FC = () => {

    const {isLoading} = useAuthState();

    if (isLoading) {
        return <Loader/>
    }

    return (
            <div className="flex flex-col h-screen items-center justify-center">
                <MyHeader/>
                <Content/>
                <MyFooter/>
            </div>
    );
};

export default LayoutPage;