import {FC} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

type BackButtonProps = {
    label: string;
    link: string;
}

const BackButton: FC<BackButtonProps> = ({label, link}: BackButtonProps) => {
    return (
        <Button variant="link" className="font-normal w-full" size="default" asChild>
            <Link to={link}>
                {label}
            </Link>
        </Button>
    );
};

export default BackButton;