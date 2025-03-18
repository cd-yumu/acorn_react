// src/component/PostForm.jsx

import React, { useEffect, useRef, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { initEditor } from '../editor/SmartEditor';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AlertModal from './AlertModal';

function PostForm(props) {

    // SmartEditor에 작성한 내용을 textarea 의 value 로 넣어줄 때 필요한 함수가 editorTool 이다.
    const [editorTool, setEditorTool] = useState();

    useEffect(()=>{
        // initEditor 함수가 호출하면서 SmartEditor 로 변환할 textarea 의 id 를 전달하면
        // textarea 가 SmartEditor 로 변경되면서 에디터 tool 객체가 리턴된다.
        setEditorTool(initEditor("content"));   // initEditor() 함수를 호출해야 SmartEditor 가 초기화 된다.
    },[]);

    // 입력한 내용을 얻어오기 위한 useRef()
    const inputTitle = useRef();
    const inputContent = useRef();
    
    // 경로 이동을 할 함수
    const navigate = useNavigate();

    // 알림 모달을 띄울지 말지 state 로 관리
    const [modalShow, setModalShow] = useState(false);
    
    return (
        <>
            <AlertModal show={modalShow} message="Saved New Post" onYes={()=>{
                navigate("/posts");
                setModalShow(false);
            }}/>
            <h1>Create New Post</h1>
            <Form>
                <FloatingLabel label="Title" className="mb-3" controlId="title">
                    <Form.Control ref={inputTitle} type="text" placeholder="Title..."/>
                </FloatingLabel>

                <Form.Group className="mb-3"  controlId="content">
                    <Form.Label>Content</Form.Label>
                    {/* 아래 코드는 <textarea> 요소로 변화되고 id="content 가 된다." */}
                    <Form.Control ref={inputContent} as="textarea" rows="10"/>
                </Form.Group> 
                <Button type="submit" onClick={(e)=>{
                    // 기본 폼 제출 막기
                    e.preventDefault();
                    // 에디터 tool 을 이용해서 SmartEditor 에 입력한 내용을 textarea 의 value 값으로 변환
                    editorTool.exec();  // 이 코드를 실행해야지만 smart editor 에 입력한 내용이 textarea 에 입력한 내용처럼 바뀜
                    // 입력한 제목과 내용을 읽어와서
                    const title = inputTitle.current.value;
                    const content = inputContent.current.value;    
                    axios.post("/posts",{title, content})
                    .then(res=>{
                        //alert("Saved!");
                        // 글 목록 보기로 이동
                        //navigate("/posts");
                        setModalShow(true);
                    })
                    .catch(err=>console.log(err));
                }}>저장</Button>
            </Form>
        </>
    );
}

export default PostForm;