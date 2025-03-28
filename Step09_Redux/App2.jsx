// src/App2.jsx
import axios from 'axios';
import { decodeToken } from 'jsontokens';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function App2(props) {

    const isLogin = useSelector((state)=>state.isLogin);
    const userName = useSelector((state)=>state.userName);
    const dispatch = useDispatch();

    // 입력한 userName 과 password 를 상태값으로 관리
    const [state, setState] = useState({
        userName : "",
        password :""
    }); 

    const handleChange = (e)=>{
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    };

    const [tiemoutID, setTimeoutId] = useState(null);

    // 컴포넌트가 활성화 되는 시점에 한 번 호출되는 함수 등록
    useEffect(()=>{
        // 만일 localStorage 에 저장된 token 이 있다면
        if(localStorage.token){
            // 토큰을 디코딩 (앞에 7자리를 제거한, Bearer_ 를 제거한 문자열을 디코딩)
            const result = decodeToken(localStorage.token.substring(7));
            // 토큰에 담긴 정보가 object 에 들어있다.
            console.log(result);

            // expire 되는 시간이 초 단위로 저장되어 있으므로 1000 을 곱해서 ms 초 단위로 만든다.
            const expTime = result.payload.exp*1000;
            // 현재 시간 ms 초 단위로 얻어내기
            const now = new Date().getTime();

            // 만일 유효기간이 만료되지 않았다면
            if(expTime > now){
                dispatch({type:"LOGIN_STATUS", payload:true});
                dispatch({type:"USER_NAME", payload:result.payload.sub})
                
                // 만료까지 남은 시간?
                const remainTime = expTime - now;
                // 남은 시간이 경과하면 실행할 함수
                const id = setTimeout(()=>{
                    // 이 함수가 호출되면 token 이 expire 된 것이다.
                    alert("로그아웃 되었습니다.");
                    dispatch({type:"LOGIN_STATUS", payload:false});
                    delete localStorage.token;
                },remainTime);
                setTimeoutId(id);
            } else {
                // 유효기간이 만료된 token 은 삭제
                delete localStorage.token;  // Object 의 특정 방을 삭제하는 방법
            }  
        } 
    }, [])

    return (
        <div>
            <h1>Index Page.(2)</h1>
            { isLogin ?
                <p>
                    <strong>{userName}</strong> 님 로그인중...
                    <button onClick={()=>{
                        alert("로그아웃 되었습니다.");
                        dispatch({type:"LOGIN_STATUS", payload:false});
                        delete localStorage.token;
                        if(tiemoutID){
                            clearTimeout(tiemoutID);
                            setTimeoutId(null);
                        }
                    }}>로그아웃</button>                
                    <button onClick={()=>{
                        // 요청의 header 에 유효한 token 을 같이 보내야 응답받을 수 있다.
                        axios.get("/api/ping",{
                            headers : {
                                Authorization : localStorage.token
                            }
                        })
                        .then(res=>{
                            console.log(res.data);
                        })
                        .catch(err=>{console.log(err)});
                    }}>Ping요청</button>
                </p>
            :
                <>
                <input onChange={handleChange} type="text" name="userName" placeholder="사용자명..."/>
                <br />
                <input onChange={handleChange} type="password" name="password" placeholder="비밀번호..."/>
                <br />
                <button onClick={()=>{
                    // state object 를 넣어주면 json 문자열이 body 에 포함되어서 전송된다.
                    axios.post("/api/auth",state)
                    .then(res=>{    // 200 번 응답
                        console.log(res.data);
                        // 발급 받은 token 을 locaStorage 에 저장하기
                        // localStorage 는 해당 웹 브라우저에 영구저장되는 object 라고 생각하면 된다.
                        // 단, 문자열만 저장할 수 있는 object 
                        localStorage.token = res.data;  // token 이라는 방에 res.data 를 저장
                        dispatch({type:"USER_NAME", payload:state.userName});
                        dispatch({type:"LOGIN_STATUS", payload:true});
                    })
                    .catch(err=>console.log(err));  // 500 번 응답
                }}>로그인</button>
                </>
            }
        </div>
    );
}

export default App2;