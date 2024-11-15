import {FC, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {useAuthAction} from "@/common/hooks/useAuthAction.ts";
import {useAuthState} from "@/common/hooks/useAuthState.ts";
import {toast} from "sonner";
import {useAuthStore} from "@/store/authStore.ts";

const LogoutPage: FC = () => {

    const {logout} = useAuthAction();
    const {isAuth} = useAuthState();
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    useEffect(() => {
        const handleLogout = async (): Promise<void> => {
            try {

                await logout();

                const currentErrorMessage = useAuthStore.getState().errorMessage;

                if (currentErrorMessage) {
                    toast.error(currentErrorMessage || "Unexpected error.");
                    return;
                }

                toast.success("You have successfully logged out.");

                setIsLoggedOut(true);
            } catch (error: unknown) {
                console.log('Error catch: ', error);

                toast.error('An error occurred on the server.');
            }
        }

        if (isAuth && !isLoggedOut) {
            void handleLogout();
        }
    }, [isAuth, logout, isLoggedOut]);

    return (
        <Navigate to={"/"}/>
    );
};

export default LogoutPage;