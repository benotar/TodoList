import {FC} from "react";
import {useAuthState} from "@/common/hooks/useAuthState.ts";
import {Permission} from "@/types/store/Auth.ts";
import BasicHomePage from "@/pages/home/BasicHomePage.tsx";
import UnauthorizedHomePage from "@/pages/home/UnauthorizedHomePage.tsx";
import AdvancedHomePage from "@/pages/home/AdvancedHomePage.tsx";


const HomePage: FC = () => {

    const {isAuth, permission} = useAuthState();

    return (
        <div>
            {
                !isAuth
                    ? <UnauthorizedHomePage/>
                    : permission === Permission.Advanced
                        ? <AdvancedHomePage/>
                        : <BasicHomePage/>
            }
        </div>
    );
};

export default HomePage;