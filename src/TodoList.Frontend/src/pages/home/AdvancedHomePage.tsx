import {FC} from "react";
import LinkButton from "@/components/shared/LinkButton.tsx";
import HomeCardWrapper from "@/components/home/HomeCardWrapper.tsx";

const AdvancedHomePage: FC =  () => {
    return (
        <HomeCardWrapper
            title="Admin Dashboard"
            description="Manage users and todos. Keep track of all activities and maintain a well-organized todo environment for your team."
        >
            <div className="flex flex-col justify-center items-center gap-y-5">
                <LinkButton label={"View Admin Management"} link={"/admin"}/>
                <LinkButton label={"Manage todos"} link={"/todo"}/>
            </div>
        </HomeCardWrapper>
    );
};

export default AdvancedHomePage