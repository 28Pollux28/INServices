import React from "react";
import {Route, Routes} from "react-router-dom";

import Home from "./view/Home/Home";
import {NotFound} from "./view/Error/Error";
import Login from "./view/Login/Login";
import Register from "./view/Register/Register";
import VerifyEmail from "./view/VerifyEmail/VerifyEmail";
import Logout from "./view/Logout/Logout";

const RoutesTree = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify/:token" element={<VerifyEmail />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default RoutesTree;
