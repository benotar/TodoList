import {FC} from "react";
import HomeCardWrapper from "@/components/home/HomeCardWrapper.tsx";
import LinkButton from "@/components/shared/LinkButton.tsx";

const UnauthorizedHomePage: FC = () => {
    return (
        <HomeCardWrapper
            title="Welcome to Your Personal Todos Manager!"
            description="Begin managing your todos today!"
        >
            <div className="flex gap-x-5">
                <LinkButton label={"Login"} link={"/login"}/>
                <LinkButton label={"Register"} link={"/register"}/>
            </div>
        </HomeCardWrapper>
    );
};

export default UnauthorizedHomePage