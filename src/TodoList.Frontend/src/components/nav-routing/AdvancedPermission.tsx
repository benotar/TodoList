import {FC} from "react";
import {Link} from "react-router-dom";
import BasicPermission from "@/components/nav-routing/BasicPermission.tsx";

const AdvancedPermission: FC = () => {
    return (
        <>
            <Link to='/admin' className="mr-5"><span>Admin</span></Link>
            <BasicPermission/>
        </>
    );

};

export default AdvancedPermission;