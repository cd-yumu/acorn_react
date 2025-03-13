import { useOutlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'       // bootstrap css
import BsNavBar from "./components/BsNavBar";
import LoginModal from "./components/LoginModal";
import { useSelector } from "react-redux";


function App(){

    const currentOutlet = useOutlet();

    // 로그인 모달의 상태값 redux store 로 부터 얻어낸다.
    const loginModal = useSelector(state => state.loginModal);

    return (
        <>
            <BsNavBar/>
            <div className="container" style={{marginTop:"60px"}}>
                <div>{currentOutlet}</div> 
            </div>
            <LoginModal show={loginModal.show}/>
        </>
    )
}

export default App;