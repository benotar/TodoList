import {FC} from "react";
import LinkButton from "@/components/shared/LinkButton.tsx";
import HomeCardWrapper from "@/components/home/HomeCardWrapper.tsx";

const BasicHomePage: FC =  () => {
    return (
        <HomeCardWrapper
            title="Basic Dashboard"
            description="Manage your todos. Keep track of all activities and maintain a well-organized todo environment for your team."
        >
            <div className="flex flex-col justify-center items-center gap-y-5">
                <LinkButton label={"Manage todos"} link={"/todo"}/>
            </div>
        </HomeCardWrapper>
    );
};

export default BasicHomePage