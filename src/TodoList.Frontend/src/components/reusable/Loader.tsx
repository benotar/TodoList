import {FC} from "react";
import {LoaderPinwheel} from 'lucide-react';


const Loader: FC = () => {
    return (
        <div className="flex flex-col h-screen items-center justify-center gap-2">
            <LoaderPinwheel size="40" className="animate-spin"/>
            <div className="text-lg font-semibold animate-pulse">Loading...</div>
        </div>
    )
};

export default Loader;