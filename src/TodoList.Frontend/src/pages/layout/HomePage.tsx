import {FC} from "react";
import {useAuthState} from "@/common/hooks/useAuthState.ts";


const HomePage: FC = () => {

    const {isAuth, permission} = useAuthState();

    return (
        <>
            Home Page
        </>
    );
};

export default HomePage;