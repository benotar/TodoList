import {FC, ReactElement} from "react";
import {useAuthState} from "@/common/hooks/useAuthState.ts";
import {Navigate} from "react-router-dom";
import Loader from "@/components/shared/Loader.tsx";

type ProtectedRouteProps = {
    element: ReactElement;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({element}: ProtectedRouteProps) => {

    const {isAuth, isLoading} = useAuthState();

    if (isLoading) {
        return <Loader/>
    }

    if (!isAuth) {
        return <Navigate to="/login" replace/>
    }

    return element;
}

export default ProtectedRoute;