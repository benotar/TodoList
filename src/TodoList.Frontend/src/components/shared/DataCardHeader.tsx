import {FC} from "react";

type DataCardHeaderProps = {
    title: string;
}

const DataCardHeader: FC<DataCardHeaderProps> = ({title}: DataCardHeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className="text-2xl font-semibold">{title}</h1>
        </div>
    );
};


export default DataCardHeader;