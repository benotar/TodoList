import {FC} from "react";
import LinkButton from "@/components/reusable/LinkButton.tsx";
import HomeCardWrapper from "@/components/home/HomeCardWrapper.tsx";

const AdvancedHomePage: FC =  () => {
    return (
        <HomeCardWrapper
            title="Admin Dashboard"
            description="Manage users and todos"
        >
            <div className="flex justify-center items-center gap-x-5">
                <LinkButton label={"Admin "} link={"/admin"}/>
                <LinkButton label={"Todos"} link={"/todo"}/>
            </div>
        </HomeCardWrapper>
    );
};

export default AdvancedHomePage