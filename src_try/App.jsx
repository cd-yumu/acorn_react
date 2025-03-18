import { useOutlet } from "react-router-dom";
import BsNavBar from "./components/BsNavBar";
import 'bootstrap/dist/css/bootstrap.css'       // bootstrap css
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";

function App(){

    const currentOutlet = useOutlet();
    const dispatch = useDispatch();

    useEffect(()=>{
        // localStroage 에 token 존재 시 header 에 token 을 포함해 ping 요청을 보내보고
        // 유효한 토큰으로 정상 응답 될 경우, 모든 axios 요청의 header 에 토큰을 포함시키기
        const token = localStorage.token;
        if(token){
            axios.get("/ping",{
                headers:{Authorization:token}
            })
            .then(res=>{
                console.log(res);
                axios.defaults.headers.common["Authorization"]=token;
                // 토큰을 해독하여 로그인된 사용자 정보(userName, role) 을 redux store 에 저장
                // const decoded = jwtDecode(token.substring(7));
                // const action = {type:"USER_INFO", payload:{
                //     userName:decoded.sub,
                //     role:decoded.role
                // }};
                // dispatch(action);
            })
            .catch(err=>console.log(err));
        }
    },[])

    return (
        <>
            <BsNavBar/>
            <div className='container' style={{marginTop:'60px'}}>
                <div>{currentOutlet}</div> 
            </div>
        </>
    )
}

export default App;