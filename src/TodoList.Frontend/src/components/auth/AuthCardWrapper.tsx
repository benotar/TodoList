import {FC, ReactNode} from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card.tsx" ;
import AuthCardHeader from "@/components/auth/AuthCardHeader.tsx";
import AuthBackButton from "@/components/auth/AuthBackButton.tsx";

type AuthCardWrapperProps = {
    label: string;
    title: string;
    backButtonLink: string;
    backButtonLabel: string;
    children: ReactNode;
}

const AuthCardWrapper: FC<AuthCardWrapperProps> = ({
                                               label,
                                               title,
                                               backButtonLink,
                                               backButtonLabel,
                                               children
                                           }: AuthCardWrapperProps) => {
    return (
        <Card className="w-[85%] sm:w-[47%] lg:w-[35.2%] lgx:w-[25%] 2xl:w-[25%] 2k:w-[15%]">
            <CardHeader>
                <AuthCardHeader title={title} description={label}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter className="flex justify-center items-center">
                <AuthBackButton label={backButtonLabel} link={backButtonLink}/>
            </CardFooter>
        </Card>
    );
};

export default AuthCardWrapper;