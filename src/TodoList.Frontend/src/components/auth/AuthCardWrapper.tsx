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
        <Card className="w-2/3 sm:w-[43%] lg:w-[35%] lgx:w-[24%] 2xl:w-3/12 2k:w-[13%]">
            <CardHeader>
                <AuthCardHeader title={title} description={label}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <AuthBackButton label={backButtonLabel} link={backButtonLink}/>
            </CardFooter>
        </Card>
    );
};

export default AuthCardWrapper;