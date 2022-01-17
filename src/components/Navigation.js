import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = () => {
    return (
        <Navbar collapseOnSelect sticky='top' expand='sm' bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand className="brand">Grant Cawley</Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse className='justify-content-end' id='responsive-navbar-nav'>
                    <Nav>
                        <Nav.Link href='/'>About</Nav.Link>
                        <Nav.Link href='/entry'>Entry</Nav.Link>
                        <Nav.Link href='/search'>Search</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    
        );
}

export default Navigation
