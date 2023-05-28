import React from "react";
import user from "../../request/service/User";
import {Navigate} from "react-router-dom";


export default function Logout() {
    const [success, setSuccess] = React.useState('pending');
    user.logout().then((value) => {
        setSuccess(value);
    });
    if (success === 'pending') {
        return <div>loading...</div>
    }
    if (success === true) {
        return <Navigate to={'/'} state={{logout: "success"}} replace/>
    } else {
        return <Navigate to={'/'} replace/>
    }

}
