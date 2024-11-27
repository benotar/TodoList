import {FC} from "react";
import LinkButton from "@/components/reusable/LinkButton.tsx";
import HomeCardWrapper from "@/components/home/HomeCardWrapper.tsx";

const BasicHomePage: FC =  () => {
    return (
        <HomeCardWrapper
            title="Welcome back!"
            description="Manage your todos"
        >
            <div className="flex justify-center items-center">
                <LinkButton label={"Manage todos"} link={"/todo"}/>
            </div>
        </HomeCardWrapper>
    );
};

export default BasicHomePage