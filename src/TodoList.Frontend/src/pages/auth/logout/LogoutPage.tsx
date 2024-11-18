import {FC, useEffect} from "react";
import {Navigate} from "react-router-dom";
import {useAuthAction} from "@/common/hooks/useAuthAction.ts";
import {useAuthState} from "@/common/hooks/useAuthState.ts";
import {toast} from "sonner";
import {useAuthStore} from "@/store/authStore.ts";
import {ErrorCode} from "@/types/models/response/AuthResponse.ts";

const LogoutPage: FC = () => {

    const {logout} = useAuthAction();
    const {isAuth} = useAuthState();

    useEffect(() => {

        const handleLogout = async (): Promise<void> => {

            await logout();

            const currentErrorMessage = useAuthStore.getState().errorMessage;

            if (currentErrorMessage) {

                toast.error(currentErrorMessage || ErrorCode.UnknownError);

                return;
            }

            toast.success("You have successfully logged out.");
        }

        if (isAuth) {
            void handleLogout();
        }

    }, [isAuth, logout]);

    return (
        <Navigate to={"/"}/>
    );
};

export default LogoutPage;