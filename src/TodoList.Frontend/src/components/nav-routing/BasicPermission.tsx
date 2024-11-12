import {FC} from "react";
import {Link} from "react-router-dom";

const BasicPermission: FC = () => {
    return (
        <>
            <Link to='/todo' className="mr-5"><span>Todo</span></Link>
            <Link to='/logout' className="mr-5"><span>Logout</span></Link>

        </>
    );

};

export default BasicPermission;