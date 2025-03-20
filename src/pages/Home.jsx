// src/pages/Home.jsx

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import Markdown from 'react-markdown';

function Home(props) {
    
    return (
        <div>
            <h1>인덱스 페이지 입니다.</h1>
            <button onClick={()=>{
                axios.get("/ping")
                .then(res=>{
                    alert(res.data);
                })
                .catch(error=>{
                    alert("응답하지 않음");
                });
            }}>Ping 요청 해보기</button>

            <Quiz />

        </div>
    );
}

function Quiz(){
    let quiz = "콘솔창에 1~10 까지 순서대로 출력하는 code를 javascript 로 작성해 보세요";
    
    // 대답 입력란 참조값
    const inputAnswer = useRef();

    // 문제 관련 정보가 들어있는 저장소
    const [state, setState] = useState({
        isAnswered:false
    });


    // 제출 버튼을 누르면 호출
    const handleSubmit = ()=>{
        //질문과 입력한 답을 json 으로 전송한다.
        axios.post("/gemini/quiz", {
            quiz,
            answer:inputAnswer.current.value
        })
        .then(res=>{
            // res.data 는 이런 모양의 object 이다. {isCorrect: true or false, comment:"markdown"}
            // 채점결과와 설명을 저장
            console.log(res.data);
            setState({
                ...state,
                ...res.data,
                isAnswered:true
            });
        })
        .catch(error=>console.log(error));
    }


    // 다시 시도 버튼을 눌렀을 때 동작
    const handleRetry = (e)=>{
        
        // 대답 여부와 제출된 답을 초기화
        setState({
            ...state,
            isAnswered:false
        });
    }

    return (
        <>
            { state.isAnswered?
            // 대답 후
            <div>
                <h3>제출된 답</h3>
                <Form.Group className='mb-3'>
                    <Form.Label>{quiz}</Form.Label>
                    <Form.Control as="textarea" rows="10">{inputAnswer.current.value}</Form.Control>
                </Form.Group>

                
                <h3>체점 결과</h3>
                {/* <p>{JSON.stringify(state.isCorrect)}</p> */}
                { state.isCorrect?
                    <Alert variant='success'>정답 입니다</Alert>
                    :
                    <Alert variant='danger'>오답 입니다</Alert>
                }
                <div><Markdown>{state.comment}</Markdown></div>

                <Button variant='success' className='me-3' onClick={handleRetry}>&larr;이전 문제</Button>
                <Button variant='warning' className='me-3' onClick={handleRetry}>다시 풀기</Button>
                <Button variant='success' onClick={handleRetry}>다음 문제&rarr;</Button>
            </div>
            :
            // 대답 전
            <div>
                <Form.Group className='mb-3'>
                    <Form.Label>{quiz}</Form.Label>
                    <Form.Control ref={inputAnswer} as="textarea" rows="10"></Form.Control>
                </Form.Group>
                <Button onClick={handleSubmit}>제출</Button>
            </div>
            }



        </>
    )
}

export default Home;