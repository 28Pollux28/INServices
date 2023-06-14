import './App.css';
import RoutesTree from "./RoutesTree";
import {ConditionalFunction} from "./component/Header/Header";
import Footer from './component/Footer/Footer';

function App() {
    return (
        <div className="App">
            <ConditionalFunction />
            <RoutesTree />
            <Footer/>
        </div>
    );
}

export default App;
