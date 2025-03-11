// src/components/MyCounter.jsx

import React, { useReducer } from 'react';

// 리듀서 함수 (차원을 감소 시켜서 새로운 상태값을 리턴하는 함수)
const reducer = (state, action) => {
    // 상태값과 동작을 저달하면 새로운 상태값을 리턴하는 함수 만들어보기
    // 새로운 상태값을 담을 변수를 미리 만들고
    let newState;
    // action 값에 따라 분기해서서
    if(action === "minus"){
        newState={
        ...state,
        count:state.count-1
        }
    } else if(action === "plus"){
        newState={
            ...state,
            count:state.count+1
        } 
    } else {
        newState = state;
    }

    return newState;
}

function MyCounter(props) {
    // const [상태값, 상태값을 변경할 때 사용할 함수] = useReducer(리듀서 함수, 초기값)
    const [state, dispatch] = useReducer(reducer, {
        count:0,
        userName:"김구라", 
        email:"aaa@naver.com"
    })  // useReducer 라는 훅을 사용

    // 이와 같은 구조는 상태값을 중앙에서 관리되어 사용한다. 
    
    return (
        <div>
            <p>userName: <strong>{state.userName}</strong></p>
            <p>email: <strong>{state.email}</strong></p>
            <button onClick={()=>{
                // action(동작) 발행행
                dispatch("minus")
            }}>-</button>
            <strong>{state.count}</strong>
            <button onClick={()=>{
                dispatch("plus")
            }}>+</button>
        </div>
    );
}

export default MyCounter;