import {FC} from 'react';
import {Label} from "@/components/ui/label.tsx";

const MyFooter: FC = () => {
    return (
        <footer className="bg-footer flex justify-center items-center py-5">
            <Label>&copy;2024 All rights reserved.</Label>
        </footer>
    );
}


export default MyFooter;
