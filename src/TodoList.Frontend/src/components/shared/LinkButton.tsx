import {FC} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";


type LinkButtonProps = {
    label: string;
    link: string;
}

const LinkButton: FC<LinkButtonProps> = ({label, link}: LinkButtonProps) => {
    return (
        <Button variant="ghost" className="text-base w-full max-w-xs"  size="default" asChild>
            <Link to={link} >
                {label}
            </Link>
        </Button>
    );
}

export default LinkButton;