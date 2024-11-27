import {FC} from "react";
import HomeCardWrapper from "@/components/home/HomeCardWrapper.tsx";
import LinkButton from "@/components/reusable/LinkButton.tsx";

const UnauthorizedHomePage: FC = () => {
    return (
        <HomeCardWrapper
            title="Welcome to Todos Manager!"
            description="Begin managing your todos!"
        >
            <div className="flex justify-center items-center gap-x-5">
                <LinkButton label={"Login"} link={"/login"}/>
                <LinkButton label={"Register"} link={"/register"}/>
            </div>
        </HomeCardWrapper>
    );
};

export default UnauthorizedHomePage