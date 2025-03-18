import { useOutlet } from "react-router-dom";
import BsNavBar from "./components/BsNavBar";

function App(){

    const currentOutlet = useOutlet();

    return (
        <>
            <BsNavBar/>
            <div className="container">
                <div>{currentOutlet}</div>
            </div>
        </>
    )
}

export default App;