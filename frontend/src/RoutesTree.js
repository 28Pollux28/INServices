import React from "react";
import {Route, Routes} from "react-router-dom";

import Home from "./view/Home/Home";
import {NotFound} from "./view/Error/Error";

const RoutesTree = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default RoutesTree;
