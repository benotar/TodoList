import {FC} from "react";
import {Link} from "react-router-dom";

const Unauthorized: FC = () => {
    return (
        <>
            <Link to='/login' className="mr-5"><span>Log in</span></Link>
            <Link to='/register' className="mr-5"><span>Register</span></Link>
        </>
    );

};

export default Unauthorized;