import {FC, ReactNode} from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card.tsx" ;
import AuthHeader from "@/components/auth/auth-header.tsx";
import BackButton from "@/components/auth/back-button.tsx";

type CardWrapperProps = {
    label: string;
    title: string;
    backButtonLink: string;
    backButtonLabel: string;
    children: ReactNode;
}

const CardWrapper: FC<CardWrapperProps> = ({
                                               label,
                                               title,
                                               backButtonLink,
                                               backButtonLabel,
                                               children
                                           }: CardWrapperProps) => {
    return (
        <Card className="w-full max-w-lg shadow-md">
            <CardHeader>
                <AuthHeader label={label} title={title}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <BackButton label={backButtonLabel} link={backButtonLink}/>
            </CardFooter>
        </Card>
    );
};

export default CardWrapper;