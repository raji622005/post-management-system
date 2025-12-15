import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container, Nav } from 'react-bootstrap';

function Header() {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>✍️ Post Manager</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/">
                                <Nav.Link>Post List</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/posts/new">
                                <Nav.Link>Create New Post</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;