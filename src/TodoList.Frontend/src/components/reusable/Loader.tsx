import {FC} from "react";
import {LoaderPinwheel} from "lucide-react";

const Loader: FC = () => {
    return (
        <div className="flex flex-col h-screen items-center justify-center space-y-1">
            <LoaderPinwheel size="40" className="animate-spin [animation-duration:1.6s]"/>
            <div className="text-lg font-semibold animate-pulse [animation-duration:0.8s]">
                Loading...
            </div>
        </div>
    )
};

export default Loader;