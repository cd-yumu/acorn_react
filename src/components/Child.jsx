// src/components/Child.jsx

import React from 'react';
import { useSelector } from 'react-redux';

// 만약 로그인 중이라면 xxx 님 반갑습니다. 
function Child(props) {

    const isLogin = useSelector((state)=>state.isLogin);
    const userName = useSelector((state)=>state.userName);

    return (
        <div style={{height:"100px", "background-color":"yellow"}}>
            <h2>Child Componenet.</h2>
            {isLogin?<p><strong>{userName}</strong> 님 반갑습니다.</p>:<></>}
            {isLogin && <p><strong>{userName}</strong> 님 반갑습니다.</p>}
        </div>
    );
}

export default Child;