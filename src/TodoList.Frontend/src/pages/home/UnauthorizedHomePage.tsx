import {FC} from "react";
import {Button} from "@/components/ui/button.tsx";

const UnauthorizedHomePage: FC =  () => {
    return (
        <div>
           <h1>Welcome!</h1>
            <Button>Log in</Button>
            <Button>Create account</Button>
        </div>
    );
};

export default UnauthorizedHomePage