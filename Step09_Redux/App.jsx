import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Child from "./components/Child";

function App(){

    // redux store 에서 관리되는 state 는 useSelector() 라는 hook 을 이용하면 된다.

    const isLogin = useSelector((state)=>state.isLogin); //이 함수에는 store 에서 관리되는 state 가 전달된다.
    const inputName = useRef();
    // action 을 발행할 때 사용하는 hook
    const dispatch = useDispatch();

    const userName = useSelector((state)=>state.userName);

    // isLogin 상수값이 변경되는 이유는? dispatch 를 이용해 상태값을 변경하면 다시 렌더링링
    return (
        <div className="container">
            <h1>Index Page.</h1>
            { isLogin ? 
                <p>
                    <strong>{userName}</strong> 님 로그인중...
                    <button onClick={()=>{
                        // userName = "", isLoging = false 로 변경
                        const action = {type:"LOGIN_STATUS", payload:false};
                        dispatch(action);
                    }}>로그아웃</button>
                </p>
            :
                <>
                    <input ref={inputName} type="text" placeholder="사용자명..."/>
                    <button onClick={()=>{
                        // 입력한 userName 
                        const userName = inputName.current.value;
                        // userName 을 변경하는 action
                        const action1 = {type:"USER_NAME", payload:userName};
                        // 로그인 상태를 변경하는 action
                        const action2 = {type:"LOGIN_STATUS", payload:true};
                        // action 발행하기
                        dispatch(action1);
                        dispatch(action2);
                        console.log("hi")
                    }}>로그인</button>
                </>
            }

            <Child/>

        </div>
    )
}

export default App;