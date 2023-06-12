import logo from './logo.svg';
import './App.css';
import Button from './Button';
import RoutesTree from "./RoutesTree";
import ResponsiveAppBar from "./component/Header/Header";
import {NavBarConnected,NavBarNotConnected,ConditionalFunction} from "./component/Header/Header";
import Footer from './component/Footer/Footer';
function App() {
    return (
        <div className="App">
            <ConditionalFunction/>
            <RoutesTree/>
            <Footer/>
        </div>
    );
}

export default App;
