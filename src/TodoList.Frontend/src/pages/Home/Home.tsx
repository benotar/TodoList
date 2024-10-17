import {FC} from "react";
import {Button} from "@/components/ui/button.tsx";

const Home: FC = () => {
    return (
        <>
            <h1>I'm Home Page</h1>
            <Button
                size="lg"
            >
                Click me
            </Button>
        </>
    );
};

export default Home;