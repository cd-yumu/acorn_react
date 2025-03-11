// src/component/Friends.jsx

import React, { useReducer, useRef } from 'react';
import {v4 as uuid} from "uuid";

const reducer = (state, action)=>{
    let newState;
    if(action.type === "add"){
        // 원래 상태값 state 를 펼쳐놓고 friends 만 변화
        newState = {
            ...state,
            friends:[...state.friends, {id: uuid(), name: action.payload}]
        };
    } else if(action.type === "reset") {
        newState = {
            ...state,
            friends:[]
        }
    } else if(action.type === "remove"){
        newState = {
            ...state,
            friends: state.friends.filter(item => item.id !== action.payload) 
        }
    } else {
        newState = state;
    }
    return newState;
};

// 초기 상태값
const initState = {
    userName : "kimgura", 
    friends : []
};

function Friends(props) {
    // useReducer(리듀서 함수, 초기상태값)
    const [state, dispatch] = useReducer(reducer, initState);

    // 특정 요소의 참조값을 관리하기 위한 hook
    const inputName = useRef();

    return (
        <div>
            <p>Logined UserName: <strong>{state.userName}</strong></p>
            <input ref={inputName} type="text" placeholder="Friend's Name"/> 
            <button onClick={()=>{
                // 입력한 이름을 추가하는 action 을 dispatch 한다. (동작을 발행)
                // inputName.current 라는 방에 참조값 (input 요소) 이 들어있다.
                const name = inputName.current.value;
                // 발생할 action 을 object 로 만든다.
                const action = {type:"add", payload:name};
                // action 발행하기
                dispatch(action);
            }}>Add</button>  
            <button onClick={()=>{
                const action = {type:"reset"};
                dispatch(action);
            }}>Reset</button>
            <ul>
                {state.friends.map(item=>
                    <li key={item.id}>
                        {item.name}<button onClick={()=>{
                            const action = {type:"remove", payload: item.id};
                            dispatch(action);
                        }}>X</button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Friends; 