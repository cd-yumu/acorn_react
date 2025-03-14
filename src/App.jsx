import { useOutlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'       // bootstrap css
import BsNavBar from "./components/BsNavBar";
import LoginModal from "./components/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { decodeToken } from "jsontokens";
import axios from "axios";


function App(){

    const currentOutlet = useOutlet();

    // 로그인 모달의 상태값 redux store 로 부터 얻어낸다.
    const loginModal = useSelector(state => state.loginModal);
    const dispatch = useDispatch();

    // App Component 가 활성화 되는 시점에 token 관련 처리
    useEffect(()=>{
        const token = localStorage.token;
        // 만일 토큰이 존재 한다면 
        if(token){
            axios.get("/ping", {
                headers : {Authorization : token}
            })
            // 토큰이 유효한 경우 then 이 실행
            .then(res => {
                console.log(res);
                // axios 의 요청 헤더에 자동으로 토큰이 포함되도록 한다.
                axios.defaults.headers.common["Authorization"] = token;
                // 토큰을 디코딩해서 userName 을 얻어온다.
                const decoded = decodeToken(token.substring(7));
                // 발생할 action
                const action = {type : "USER_INFO", payload : {
                    userName :  decoded.payload.sub,
                    role : decoded.payload.role
                }};
                // 액션 발행하기
                dispatch(action);
            })
            // 토큰이 만료된 경우 catch 가 실행 (요청에 대해 오류가 전달되기 때문)
            .catch(err => {
                delete localStorage.token;
            });
        }
    },[]);

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