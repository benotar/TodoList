import {FC} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

type BackButtonProps = {
    label: string;
    link: string;
}

const AuthBackButton: FC<BackButtonProps> = ({label, link}: BackButtonProps) => {
    return (
        <Button
            className="font-normal text-wrap text-center"
            variant="link"
            size="sm"
            asChild
        >
            <Link
                to={link}
            >
                {label}
            </Link>
        </Button>
    );
};

export default AuthBackButton;