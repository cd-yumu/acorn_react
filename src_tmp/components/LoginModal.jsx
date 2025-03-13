// src/components/LoginModal.jsx

import axios from 'axios';
import { decodeToken } from 'jsontokens';
import React, { useState } from 'react';
import { Alert, Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function LoginModal(props) {
    const dispatch = useDispatch();
    // store 로부터 loginModal 의 상태값을 읽어온다.
    const loginModal = useSelector(state=>state.loginModal);

    // 입력한 내용을 상태값으로 관리
    const [state, setState] = useState({});
    // userName 과 password 를 입력했을 때 실행할 함수
    const handleChange = (e)=>{
        setState({
            ...state,
            [e.target.name] : e.target.value
        });
    };
    // 에러 메시지를 상태값으로 관리
    const [errMsg, setErrMsg] = useState(null);
    // 로그인 버튼을 눌렀을 때 실행할 함수
    const handleLogin = ()=>{
        axios.post("/auth", state)
        .then(res=>{
            console.log(res.data);
            // 토큰을 localStorage 에 저장
            localStorage.token = res.data;
            // 토큰을 디코딩해서 userName 을 얻어온다.
            const decoded = decodeToken(res.data.substring(7));
            console.log(decoded);
            // 발생할 action
            const action = {type : "USER_INFO", payload : {
                userName :  decoded.payload.sub,
                role : decoded.payload.role
            }};
            // 액션 발행하기
            dispatch(action);
            // 로그인 모달 숨기기
            dispatch({type:"LOGIN_MODAL", payload : {show : false}})
            // 에러 메시지 없애기
            setErrMsg(null);
        })
        .catch(err => {
            console.log(err);
            // 에러 메시지를 상태값으로 관리한다. 
            setErrMsg(err.response.data);
        });
    };

    return (
        // show={props.show} or {...props}
        <Modal {...props} size='lg' centered>
            <Modal.Header closeButton>
                <Modal.Title>{loginModal.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel controlId='userName' label='User Name' className='mb-3'>
                    {/* Form.Control = input */}
                    <Form.Control onChange={handleChange} name='userName' type='text'/>
                </FloatingLabel>
                <FloatingLabel controlId='password' label='Password' className='mb-3'>
                    <Form.Control onChange={handleChange} name='password' type='password'/>
                </FloatingLabel>
                {errMsg && <Alert variant='danger'>{errMsg}</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleLogin}>Login</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;