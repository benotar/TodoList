import {FC} from "react";

type MyCardHeaderProps = {
    title: string;
    description: string; }

const AuthCardHeader: FC<MyCardHeaderProps> = ({title, description}:MyCardHeaderProps) => {
    return(
        <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-base font-semibold">{title}</h1>
            <p className="text-sm">{description}</p>
        </div>
    );
};


export default AuthCardHeader;