import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap'

const Navigation = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className='mb-3'>
      <Container>
        <Navbar.Brand href="/">Recipe Book</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/search">
              <Nav.Link>Search</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/entry">
              <Nav.Link>Entry</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/viewall">
              <Nav.Link>View All</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/myrecipes">
              <Nav.Link>My Recipes</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation
