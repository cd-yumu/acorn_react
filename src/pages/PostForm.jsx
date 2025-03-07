// pages/PostForm.jsx

import axios from 'axios';
import React from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



function PostForm(props) {

    // javaScript 로 
    const navigate = useNavigate();

    // Form.Control 은 그냥 input 요소다다
    return (
        <>
            <h1>New Post Form</h1>
            <Form action="/posts" method='post' onSubmit={(e)=>{
                e.preventDefault();
                const url = e.target.action;
                // 폼에 입력한 내용을 이용해서 FormData 객체 생성
                const formData = new FormData(e.target);
                // 폼에 입력한 내용이 object 에 담긴다.
                const obj = Object.fromEntries(formData);
                // input 의 name 속성에 따라 Object 가 만들어진다. {name:"xxx", author:"xxx"}
                // axios 를 이용해서 post 방식으로 전송한다.
                axios.post(url,obj)
                .then(res=>{
                    // 저장된 글 정보가 응답된다.
                    console.log(res.data);
                    alert(res.data.id+"번 글로 저장되었습니다.");
                    // "/posts" 로 위치 변경
                    navigate("/posts")
                })
                .catch(err=>console.log(err));

            }}>
                <FloatingLabel label="제목" className='mb-3' controlId='title'>
                    <Form.Control type='text' name='title'/>
                </FloatingLabel>
                <FloatingLabel label="작성자" className='mb-3' controlId='author'>
                    <Form.Control type='text' name='author'/>    
                </FloatingLabel>
                <Button type='submit' variant='success' > Save</Button>
            </Form>
        </>
    );
}

export default PostForm;