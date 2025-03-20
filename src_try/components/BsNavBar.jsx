import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function BsNavBar(props) {

    // 로그인 사용자 정보 (redux store 에서 관리됨)
    const userInfo = useSelector(state=>state.userInfo);

    // redux store 의 값을 바꿔줄 dispath 생성
    const dispatch = useDispatch();



    return (
        <>
            <Navbar fixed='top' expand='md' className='bg-success mb-2'>
                <Container >
                    <Navbar.Brand as={NavLink} className='text-white'>Try</Navbar.Brand>
                    <Navbar.Toggle aria-controls="one"/>
                    <Navbar.Collapse id="one">
                        {/* 기본 네비바 구성 */}
                        <Nav className='me-auto'>
                            <Nav.Link as={NavLink} to="/" className='text-white'>Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/posts" className='text-white'>Post</Nav.Link>
                        </Nav>

                        {/* 로그인 관련 */}
                        {
                            // userInfo 상태값을 사용해 로그인 사용자의 정보를 저장한다.
                            userInfo ?
                                // 사용자 정보가 있으면 - 정보보기, 로그아웃 제공 
                                <Nav>
                                    
                                </Nav>
                            :
                                // 사용자 정보가 없으면 - 로그인, 회원가입 제공
                                <Nav>
                                    <Button onClick={()=>{
                                        // 로그인 모달창 띄우기
                                        const action = {
                                            type : "LOGIN_MODAL", 
                                            payload : {
                                                title : "Login Form.",
                                                show : "true"
                                            }
                                        };
                                        dispatch(action);       // store 에서 관리되는 로그인 관련 모달창 데이터의 show 값이 true 가 되면서 모달창이 보여진다.
                                        // 모달창은 App.jsx 에 컴포넌트로 구성되어 있는데 평소 false 일 때는 안 보이다가
                                        // 방금 true 값으로 변경한 것에 의해 보이게 된다.
                                    }}>Login</Button>
                                    <Button>Sign-in</Button>
                                </Nav>
                        }

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default BsNavBar;