import User from "../../request/service/User";
import {Navigate, Outlet} from "react-router-dom";


export default () => {
    const user = User.get();

    if (!user) {
        return <Navigate to={'/login'} replace />;
    }

    return  <Outlet />;
};

