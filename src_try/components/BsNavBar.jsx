import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function BsNavBar(props) {

    return (
        <>
            <Navbar fixed='top' expand='md' className='bg-warning mb-2'>
                <Container>
                    <Navbar.Brand as={NavLink}>Try</Navbar.Brand>
                    <Navbar.Toggle aria-controls="one"/>
                    <Navbar.Collapse id="one">
                        <Nav className='me-auto'>
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/posts">Post</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default BsNavBar;