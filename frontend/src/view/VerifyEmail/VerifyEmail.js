import {Navigate, useParams} from "react-router-dom";
import user from "../../request/service/User";
import React from "react";


async function verifyEmail(token) {
    return await user.verifyEmail(token)
}

export default function VerifyEmail() {
    const params = useParams();
    const [success, setSuccess] = React.useState('pending');
    verifyEmail(params.token).then((value) => {
        setSuccess(value);
    });

    if (success === 'pending') {
        return <div>loading...</div>
    } else if (success === true) {
        return <Navigate to={'/'} state={{verified: "success"}} replace/>
    } else {
        return <Navigate to={'/'} state={{verified: "error"}} replace/>
    }
}
