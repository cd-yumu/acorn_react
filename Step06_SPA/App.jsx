import { NavLink, useNavigate, useOutlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"
import { Container, Nav, Navbar } from "react-bootstrap";

function App(){
    // 현재 route 된 정보를 출력해주는 hook
    const currentOutlet = useOutlet();

    // JavaScript 로 route 이동을 하게 하는 hook
    const navigate = useNavigate();

    /* 
    react-router-dom 은 링크 이동할 수 있는 기능
    Nav.Link는모두 a 요소로 바뀌고 nav 기능을 할 수 있도록 as 를 사용한다.
    "as 요소"
    */
    return (
        <>
        <Navbar expand="md" className="bg-warning">
                <Container>
                    <Navbar.Toggle aria-controls="one"/>
                    <Navbar.Brand as={NavLink}>Acorn</Navbar.Brand>
                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/game">Game</Nav.Link>
                            <Nav.Link as={NavLink} to="/study">Study</Nav.Link>
                            <Nav.Link as={NavLink} to="/posts">Post</Nav.Link>
                        </Nav>
                    </Navbar.Collapse> 
                </Container>    
        </Navbar>
        
        <div className="container">
            <div>{currentOutlet}</div>
        </div>
        </>
    )
}

export default App;