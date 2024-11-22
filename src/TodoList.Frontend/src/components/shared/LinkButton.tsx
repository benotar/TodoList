import {FC} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";


type LinkButtonProps = {
    label: string;
    link: string;
}

const LinkButton: FC<LinkButtonProps> = ({label, link}: LinkButtonProps) => {
    return (
        <Button
            variant="ghost"
            className="w-10/12"
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
}

export default LinkButton;