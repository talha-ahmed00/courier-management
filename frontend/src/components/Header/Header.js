import React from 'react'
import {Container,Button, Form, FormControl, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'
const header = () => {
  return (
      <Navbar bg="primary" expand="lg" variant="dark">
  <Container>
    <Navbar.Brand >
        <Link to='/'>
        Courier Management
        </Link></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link >
            <Link to="/events">
            Events
            </Link>
            </Nav.Link>
        <NavDropdown title="User" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default header
