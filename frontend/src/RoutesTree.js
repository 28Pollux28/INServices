import React from "react";
import {Route, Routes} from "react-router-dom";

import Home from "./view/Home/Home";
import {NotFound} from "./view/Error/Error";
import Login from "./view/Login/Login";
import Register from "./view/Register/Register";
import VerifyEmail from "./view/VerifyEmail/VerifyEmail";
import Logout from "./view/Logout/Logout";
import Classement from "./view/Classement/Classement"
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import MesDemandes from "./view/MesDemandes/MesDemandes";
import CreateAnnoncePage from "./view/CreateAnnonce/CreateAnnoncePage";
import ProfileSetting from "./view/Profil/Profil"


const RoutesTree = ({setUpdateNavBar}) => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify/:token" element={<VerifyEmail />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/classement" element={<Classement />} />
            <Route path="*" element={<NotFound />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/createAnnonce" element={<CreateAnnoncePage />} />
                <Route path="/myoffers" element={<MesDemandes />}/>
                <Route path="/profile" element={<ProfileSetting setUpdateNavBar={setUpdateNavBar} />} />
            </Route>
        </Routes>
    );
}

export default RoutesTree;
