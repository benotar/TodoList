import {FC} from "react";
import HomeCardWrapper from "@/components/home/HomeCardWrapper.tsx";
import LinkButton from "@/components/shared/LinkButton.tsx";

const UnauthorizedHomePage: FC = () => {
    return (
       <HomeCardWrapper
           title="Welcome to Your Personal Todos Manager!"
           description="Easily organize your tasks, ideas, and todo lists with our intuitive system. Begin managing your todos today!"
       >
           <div className="flex flex-col justify-center items-center gap-y-5">
               <LinkButton label={"Already have an account? Login here."} link={"/login"}/>
               <LinkButton label={"Don't have an account? Register here."} link={"/register"}/>
           </div>
       </HomeCardWrapper>
    );
};

export default UnauthorizedHomePage