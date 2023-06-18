import React from 'react';
import './App.css';
import RoutesTree from "./RoutesTree";
import {ConditionalFunction} from "./component/Header/Header";
import Footer from './component/Footer/Footer';

function App() {
    const [updateNavBar, setUpdateNavBar] = React.useState();
    return (
        <div className="App">
            <ConditionalFunction updateNavBar={updateNavBar} />
            <RoutesTree setUpdateNavBar={setUpdateNavBar} />
            <Footer/>
        </div>
    );
}

export default App;
