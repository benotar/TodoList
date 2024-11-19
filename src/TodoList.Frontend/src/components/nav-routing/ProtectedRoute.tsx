import {FC, ReactElement} from "react";
import {useAuthState} from "@/common/hooks/useAuthState.ts";
import {Navigate} from "react-router-dom";

type ProtectedRouteProps = {
    element: ReactElement;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({element}: ProtectedRouteProps) => {

    const {isAuth, isLoading} = useAuthState();

    if(isLoading) {
        return <>Temp Loading...</>
    }

    if(!isAuth) {
        return <Navigate to="/login" replace/>
    }

    return element;
}

export default ProtectedRoute;