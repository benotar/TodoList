import {FC} from "react";

type DataCardHeaderProps = {
    title: string;
    description: string;
}

const DataCardHeader: FC<DataCardHeaderProps> = ({title, description}: DataCardHeaderProps) => {
    return (
        <div className="flex flex-col gap-y-4 items-start ml-2 mb-2">
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground">
                {description}
            </p>
        </div>
    );
};


export default DataCardHeader;