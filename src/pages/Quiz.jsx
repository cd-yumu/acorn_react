import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import Markdown from 'react-markdown';

function Quiz(){
    let quizs = [
        "콘솔창에 1~10 까지 순서대로 출력하는 code를 javascript 로 작성해 보세요",
        "myName 이라는 변수를 만들고 본인의 이름을 대입해 보세요",
        "object 에 name 이라는 키값으로 본인의 이름을 넣고 addr 이라는 키값으로 주소를 넣어보세요"
    ];

    
    // 대답 입력란 참조값
    const inputAnswer = useRef();

    // 문제 관련 정보가 들어있는 저장소
    const [state, setState] = useState({
        isAnswered:false,
        isCorrect:false,
        inputCode:"",   // 입력한 code 를 state 로 관리리
        index:0         // 문제의 index 값 state 로 관리
    });


    // 제출 버튼을 누르면 호출
    const handleSubmit = ()=>{
        //질문과 입력한 답을 json 으로 전송한다.
        axios.post("/gemini/quiz", {
            quiz: quizs[state.index],
            answer:state.inputCode  // state 에 있는 내용을 전송한다.
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


    // 다시 풀기기 버튼을 눌렀을 때 동작
    const handleRetry = (e)=>{
        setState({
            ...state,
            isAnswered:false
        });
    }

    const hadlenext = ()=>{
        // index 1 증가, isAnswered:false, inputCode:""
        setState({
            ...state,
            index: state.index+1,
            isAnswered: false,
            inputCode:""
        })
    }

    // 답을 입력할 때 동작
    const handleChange = (e)=>{
        // 입력한 내용을 바로 바로 state 에 반영하기
        setState({
            ...state,
            inputCode:e.target.value
        });
    }

    return (
        <>
            <h1>JavaScript Quiz.</h1>
            { state.isAnswered?
            // 대답 후
            <div>
                <h3>제출된 답</h3>
                <Form.Group className='mb-3'>
                    <Form.Label><strong>{`[${state.index+1}]`}</strong> {quizs[state.index]}</Form.Label>
                    <Form.Control as="textarea" rows="10">{state.inputCode}</Form.Control>
                </Form.Group>

                
                <h3>체점 결과</h3>
                {/* <p>{JSON.stringify(state.isCorrect)}</p> */}
                { state.isCorrect?
                    <Alert variant='success'>정답 입니다</Alert>
                    :
                    <Alert variant='danger'>오답 입니다</Alert>
                }
                <div><Markdown>{state.comment}</Markdown></div>

                <Button variant='success' className='me-3' onClick={hadlenext}>&larr;이전 문제</Button>
                <Button variant='warning' className='me-3' onClick={handleRetry}>다시 풀기</Button>
                <Button variant='success' onClick={hadlenext}>다음 문제&rarr;</Button>
            </div>
            :
            // 대답 전
            <div>
                <Form.Group className='mb-3'>
                    <Form.Label><strong>{`[${state.index+1}]`}</strong> {quizs[state.index]}</Form.Label>
                    <Form.Control onChange={handleChange} value={state.inputCode} as="textarea" rows="10"></Form.Control>
                </Form.Group>
                <Button onClick={handleSubmit}>제출</Button>
            </div>
            }
        </>
    )
}


export default Quiz;